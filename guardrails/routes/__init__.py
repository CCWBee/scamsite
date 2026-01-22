"""
ScamAware Jersey Guardrails API - Routes Package
================================================

This package contains the route modules for the Guardrails API service.
Each module defines a FastAPI router for a specific set of endpoints.

Available Modules:
    - health: Health check endpoints for monitoring and load balancer probes
"""

from routes.health import router as health_router

__all__ = ["health_router"]
