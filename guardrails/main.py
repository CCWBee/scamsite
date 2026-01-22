"""
ScamAware Jersey Guardrails API
===============================

This FastAPI service provides input validation and output filtering capabilities
for the ScamAware Jersey chatbot. It acts as a safety layer to ensure that:

1. User inputs are validated and sanitized before processing
2. AI-generated responses are filtered for appropriate content
3. Potential prompt injection attacks are detected and blocked
4. Responses stay on-topic (scam awareness and prevention)

The service is designed to be called by the main chatbot application before
and after interacting with the AI model, providing a consistent safety layer.

Usage:
    uvicorn main:app --host 0.0.0.0 --port 8000

For development with auto-reload:
    uvicorn main:app --host 0.0.0.0 --port 8000 --reload
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.logging import (
    configure_logging,
    get_logger,
    create_request_context_middleware,
)

# =============================================================================
# Logging Configuration
# =============================================================================

# Initialize structured logging before anything else
# This must be done early to capture all log messages
configure_logging()

# Get logger for this module
logger = get_logger(__name__)

# =============================================================================
# Application Configuration
# =============================================================================

# API metadata for OpenAPI documentation
API_TITLE = "ScamAware Jersey Guardrails API"
API_DESCRIPTION = """
## Overview

The Guardrails API provides input validation and output filtering services
for the ScamAware Jersey chatbot system.

### Key Features

- **Input Validation**: Sanitize and validate user messages before AI processing
- **Output Filtering**: Ensure AI responses are appropriate and on-topic
- **Prompt Injection Detection**: Identify and block potential attack patterns
- **Content Moderation**: Filter harmful or inappropriate content

### Integration

This service is designed to be called by the chatbot backend:

1. **Pre-processing**: Validate user input before sending to AI model
2. **Post-processing**: Filter AI response before returning to user

### Health & Monitoring

- `GET /` - Welcome message and service status
- `GET /health` - Detailed health status with dependency checks
- `GET /health/live` - Simple liveness probe for orchestrators
- `GET /health/ready` - Readiness probe (checks all dependencies)
"""
API_VERSION = "0.1.0"


# =============================================================================
# Application Lifespan (Startup/Shutdown)
# =============================================================================


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifespan context manager for startup and shutdown events.

    This handles:
    - Startup: Log application start, initialize resources
    - Shutdown: Log application stop, cleanup resources

    The lifespan pattern is the modern replacement for on_event decorators
    in FastAPI, providing better resource management and testing support.
    """
    # -------------------------------------------------------------------------
    # Startup
    # -------------------------------------------------------------------------
    logger.info(
        "Application starting",
        extra={
            "version": API_VERSION,
            "event": "startup",
        }
    )

    yield  # Application runs here

    # -------------------------------------------------------------------------
    # Shutdown
    # -------------------------------------------------------------------------
    logger.info(
        "Application shutting down",
        extra={
            "event": "shutdown",
        }
    )


# =============================================================================
# FastAPI Application Instance
# =============================================================================

app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
    lifespan=lifespan,  # Use the lifespan context manager
    docs_url="/docs",  # Swagger UI available at /docs
    redoc_url="/redoc",  # ReDoc available at /redoc
)

# =============================================================================
# Middleware Configuration
# =============================================================================

# CORS middleware to allow cross-origin requests from the chatbot frontend
# Note: In production, restrict origins to specific allowed domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Restrict to specific origins in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID middleware for request tracing and structured logging
# This injects a unique request ID into each request context, enabling:
# - Correlation of all log messages for a single request
# - Distributed tracing across services
# - Debugging and troubleshooting request flows
app.middleware("http")(create_request_context_middleware())

# =============================================================================
# Route Imports
# =============================================================================

# Import route modules for the API endpoints
# Each router handles a specific domain of functionality
from routes.health import router as health_router

# Future route imports will be added here:
# from routes import validation, filtering
# app.include_router(validation.router, prefix="/validate", tags=["Validation"])
# app.include_router(filtering.router, prefix="/filter", tags=["Filtering"])

# Include the health check router for monitoring and orchestration
# This provides /health, /health/live, and /health/ready endpoints
app.include_router(health_router)

# =============================================================================
# Root Endpoint
# =============================================================================


@app.get("/", tags=["Root"])
async def root() -> dict[str, str]:
    """
    Root endpoint returning a welcome message.

    This endpoint serves as a basic connectivity check and provides
    information about the service.

    Returns:
        dict: A welcome message with service name and version.

    Example Response:
        {
            "message": "Welcome to ScamAware Jersey Guardrails API",
            "service": "guardrails",
            "version": "0.1.0"
        }
    """
    return {
        "message": "Welcome to ScamAware Jersey Guardrails API",
        "service": "guardrails",
        "version": API_VERSION,
    }


# =============================================================================
# Health Check Endpoints
# =============================================================================
# Health check routes are now provided by the health router module.
# See routes/health.py for the following endpoints:
#   - GET /health       - Detailed health status with dependency checks
#   - GET /health/live  - Simple liveness probe (always returns 200)
#   - GET /health/ready - Readiness probe (checks dependencies)


# =============================================================================
# Application Entry Point
# =============================================================================

if __name__ == "__main__":
    import uvicorn

    # Run the application directly for development purposes
    # In production, use: uvicorn main:app --host 0.0.0.0 --port 8000
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,  # Enable auto-reload for development
    )
