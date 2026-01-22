"""
ScamAware Jersey Guardrails API - Health Check Routes
=====================================================

This module provides comprehensive health check endpoints for monitoring and
orchestration systems (Kubernetes, Docker Swarm, load balancers, etc.).

Health Check Patterns Explained
-------------------------------

Modern microservices typically implement three types of health checks:

1. **Liveness Probe** (`/health/live`):
   - Answers: "Is the process alive and running?"
   - Should ALWAYS return 200 if the service can respond
   - Used by orchestrators to detect crashed/hung processes
   - If this fails, the container is typically restarted
   - Should NOT check external dependencies

2. **Readiness Probe** (`/health/ready`):
   - Answers: "Is the service ready to accept traffic?"
   - Returns 200 only if all critical dependencies are available
   - Used by load balancers to route traffic only to healthy instances
   - If this fails, traffic is diverted but the container is NOT restarted
   - SHOULD check external dependencies (databases, AI models, etc.)

3. **Detailed Health** (`/health`):
   - Provides comprehensive status information for debugging
   - Includes dependency statuses, latencies, and version information
   - Useful for dashboards, monitoring tools, and debugging
   - Always returns 200 (service is running) but body indicates component health

Why This Matters for ScamAware Jersey
-------------------------------------

The Guardrails service depends on Ollama for AI-based content moderation.
However, we design our health checks to be resilient:

- The service can still provide basic validation even if Ollama is down
- We report Ollama status but don't fail liveness checks
- Readiness checks help load balancers avoid unhealthy instances
- Detailed health provides ops visibility into the full system state

Usage Examples
--------------

    # Simple liveness check (for Kubernetes livenessProbe)
    curl http://localhost:8000/health/live

    # Readiness check (for Kubernetes readinessProbe)
    curl http://localhost:8000/health/ready

    # Detailed health status (for monitoring dashboards)
    curl http://localhost:8000/health
"""

import os
import time
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

import httpx
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field


# =============================================================================
# Configuration
# =============================================================================

# Ollama connection settings with sensible defaults
# These can be overridden via environment variables
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_HEALTH_TIMEOUT = float(os.getenv("OLLAMA_HEALTH_TIMEOUT", "5.0"))

# Service metadata
SERVICE_NAME = "scamaware-guardrails"
SERVICE_VERSION = "0.1.0"


# =============================================================================
# Enums and Models
# =============================================================================


class HealthStatus(str, Enum):
    """
    Enumeration of possible health statuses for services and components.

    Using an enum ensures consistency in status reporting across all
    health check endpoints and makes it easier to parse programmatically.
    """
    OK = "ok"
    DEGRADED = "degraded"
    ERROR = "error"


class DependencyHealth(BaseModel):
    """
    Health status information for a single dependency.

    This model captures the current state of an external service that
    the Guardrails API depends on (e.g., Ollama, databases, caches).

    Attributes:
        status: Current health status of the dependency
        latency_ms: Response time in milliseconds (None if check failed)
        message: Optional human-readable status message or error description
    """
    status: HealthStatus = Field(
        ...,
        description="Current health status of the dependency"
    )
    latency_ms: Optional[float] = Field(
        None,
        description="Response time in milliseconds, null if unavailable"
    )
    message: Optional[str] = Field(
        None,
        description="Optional status message or error description"
    )


class HealthChecks(BaseModel):
    """
    Collection of dependency health check results.

    This model groups all external dependency checks together,
    making it easy to extend as new dependencies are added.
    """
    ollama: DependencyHealth = Field(
        ...,
        description="Health status of the Ollama AI service"
    )


class HealthResponse(BaseModel):
    """
    Comprehensive health response model.

    This model provides a complete picture of the service health,
    including overall status, timestamps, version information,
    and detailed dependency checks.

    The response format is designed to be compatible with common
    monitoring tools and follows industry best practices.

    Example Response:
        {
            "status": "ok",
            "timestamp": "2024-01-23T12:00:00Z",
            "service": "scamaware-guardrails",
            "version": "0.1.0",
            "checks": {
                "ollama": {
                    "status": "ok",
                    "latency_ms": 45.2,
                    "message": null
                }
            }
        }
    """
    status: HealthStatus = Field(
        ...,
        description="Overall service health status"
    )
    timestamp: str = Field(
        ...,
        description="ISO 8601 timestamp of the health check"
    )
    service: str = Field(
        ...,
        description="Name of the service"
    )
    version: str = Field(
        ...,
        description="Version of the service"
    )
    checks: HealthChecks = Field(
        ...,
        description="Individual dependency health checks"
    )


class LivenessResponse(BaseModel):
    """
    Simple liveness response for basic health probes.

    This minimal response is used for lightweight liveness checks
    that only need to verify the service is running.

    Example Response:
        {
            "status": "ok"
        }
    """
    status: HealthStatus = Field(
        ...,
        description="Service liveness status"
    )


class ReadinessResponse(BaseModel):
    """
    Readiness response indicating if the service can accept traffic.

    This response includes a ready flag and details about which
    dependencies are available.

    Example Response:
        {
            "status": "ok",
            "ready": true,
            "details": {
                "ollama": "ok"
            }
        }
    """
    status: HealthStatus = Field(
        ...,
        description="Overall readiness status"
    )
    ready: bool = Field(
        ...,
        description="Whether the service is ready to accept traffic"
    )
    details: dict[str, str] = Field(
        default_factory=dict,
        description="Individual dependency readiness statuses"
    )


# =============================================================================
# Health Check Functions
# =============================================================================


async def check_ollama_health() -> DependencyHealth:
    """
    Check the health of the Ollama AI service.

    This function attempts to connect to the Ollama API endpoint
    and measures the response time. It gracefully handles failures
    and timeouts without raising exceptions.

    The Ollama service exposes a simple root endpoint that returns
    "Ollama is running" when healthy. We use this for health checks
    rather than making actual inference requests to minimize load.

    Returns:
        DependencyHealth: Status information including latency and any error messages

    Note:
        This function never raises exceptions - all errors are captured
        in the returned DependencyHealth object for graceful degradation.
    """
    start_time = time.perf_counter()

    try:
        # Use an async HTTP client with a reasonable timeout
        # The timeout prevents health checks from hanging if Ollama is unresponsive
        async with httpx.AsyncClient(timeout=OLLAMA_HEALTH_TIMEOUT) as client:
            response = await client.get(f"{OLLAMA_HOST}/")

            # Calculate latency in milliseconds
            latency_ms = (time.perf_counter() - start_time) * 1000

            # Ollama returns "Ollama is running" on success
            if response.status_code == 200:
                return DependencyHealth(
                    status=HealthStatus.OK,
                    latency_ms=round(latency_ms, 2),
                    message=None
                )
            else:
                # Ollama is reachable but returned an unexpected status
                return DependencyHealth(
                    status=HealthStatus.ERROR,
                    latency_ms=round(latency_ms, 2),
                    message=f"Unexpected status code: {response.status_code}"
                )

    except httpx.ConnectError:
        # Ollama is not reachable (service not running or wrong address)
        return DependencyHealth(
            status=HealthStatus.ERROR,
            latency_ms=None,
            message=f"Connection failed to {OLLAMA_HOST}"
        )

    except httpx.TimeoutException:
        # Ollama is too slow to respond (possibly overloaded)
        return DependencyHealth(
            status=HealthStatus.ERROR,
            latency_ms=None,
            message=f"Connection timed out after {OLLAMA_HEALTH_TIMEOUT}s"
        )

    except Exception as e:
        # Catch any other unexpected errors
        return DependencyHealth(
            status=HealthStatus.ERROR,
            latency_ms=None,
            message=f"Unexpected error: {str(e)}"
        )


# =============================================================================
# Router Definition
# =============================================================================

router = APIRouter(
    prefix="/health",
    tags=["Health"],
    responses={
        200: {"description": "Health check successful"},
    },
)


# =============================================================================
# Health Check Endpoints
# =============================================================================


@router.get(
    "",
    response_model=HealthResponse,
    summary="Detailed Health Status",
    description="""
    Returns comprehensive health status including all dependency checks.

    This endpoint always returns HTTP 200 if the service is running,
    even if some dependencies are unhealthy. Check the response body
    for detailed status information.

    Use this endpoint for:
    - Monitoring dashboards
    - Debugging connectivity issues
    - Understanding system state
    """,
)
async def detailed_health() -> HealthResponse:
    """
    Detailed health check endpoint providing comprehensive system status.

    This endpoint performs health checks on all dependencies and returns
    a complete status report. It always returns HTTP 200 because the
    service itself is running - the response body contains the actual
    health information.

    Returns:
        HealthResponse: Complete health status with dependency checks

    Example:
        GET /health

        Response (200 OK):
        {
            "status": "ok",
            "timestamp": "2024-01-23T12:00:00Z",
            "service": "scamaware-guardrails",
            "version": "0.1.0",
            "checks": {
                "ollama": {
                    "status": "ok",
                    "latency_ms": 45.2,
                    "message": null
                }
            }
        }
    """
    # Get current timestamp in ISO 8601 format with UTC timezone
    timestamp = datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")

    # Check Ollama health
    ollama_health = await check_ollama_health()

    # Determine overall status based on dependency checks
    # Service is "ok" if all dependencies are healthy
    # Service is "degraded" if some non-critical dependencies are unhealthy
    # For now, Ollama being down makes the service "degraded" (not "error")
    # because basic validation can still work without AI
    if ollama_health.status == HealthStatus.OK:
        overall_status = HealthStatus.OK
    else:
        overall_status = HealthStatus.DEGRADED

    return HealthResponse(
        status=overall_status,
        timestamp=timestamp,
        service=SERVICE_NAME,
        version=SERVICE_VERSION,
        checks=HealthChecks(
            ollama=ollama_health
        )
    )


@router.get(
    "/live",
    response_model=LivenessResponse,
    summary="Liveness Probe",
    description="""
    Simple liveness check that always returns 200 if the service is running.

    This endpoint does NOT check external dependencies. It only verifies
    that the application process is alive and can handle HTTP requests.

    Use this for:
    - Kubernetes livenessProbe
    - Docker HEALTHCHECK
    - Load balancer basic health checks

    If this endpoint fails, the service should be restarted.
    """,
)
async def liveness() -> LivenessResponse:
    """
    Liveness probe endpoint for basic service health verification.

    This endpoint always returns 200 OK as long as the service process
    is running and can handle requests. It does NOT check any external
    dependencies because liveness should only indicate if the process
    itself is healthy.

    If this endpoint fails to respond, orchestrators (like Kubernetes)
    should restart the container because the process is likely hung
    or crashed.

    Returns:
        LivenessResponse: Simple status indicating the service is alive

    Example:
        GET /health/live

        Response (200 OK):
        {
            "status": "ok"
        }
    """
    return LivenessResponse(status=HealthStatus.OK)


@router.get(
    "/ready",
    response_model=ReadinessResponse,
    summary="Readiness Probe",
    description="""
    Readiness check that verifies the service can accept traffic.

    This endpoint checks all critical dependencies and returns:
    - HTTP 200 with ready=true if all dependencies are healthy
    - HTTP 503 with ready=false if any critical dependency is unhealthy

    Use this for:
    - Kubernetes readinessProbe
    - Load balancer traffic routing decisions

    If this endpoint returns 503, traffic should be routed elsewhere
    but the service should NOT be restarted (it may recover).
    """,
    responses={
        200: {"description": "Service is ready to accept traffic"},
        503: {"description": "Service is not ready (dependencies unavailable)"},
    },
)
async def readiness() -> JSONResponse:
    """
    Readiness probe endpoint for traffic routing decisions.

    This endpoint checks all critical dependencies (currently just Ollama)
    and returns an appropriate status. If any critical dependency is
    unhealthy, it returns HTTP 503 Service Unavailable.

    Unlike the liveness probe, failing this check does NOT mean the
    service should be restarted. It means traffic should be routed
    to other healthy instances until the dependencies recover.

    Returns:
        JSONResponse: Readiness status with appropriate HTTP status code

    Example (ready):
        GET /health/ready

        Response (200 OK):
        {
            "status": "ok",
            "ready": true,
            "details": {
                "ollama": "ok"
            }
        }

    Example (not ready):
        GET /health/ready

        Response (503 Service Unavailable):
        {
            "status": "error",
            "ready": false,
            "details": {
                "ollama": "error"
            }
        }
    """
    # Check all dependencies
    ollama_health = await check_ollama_health()

    # Determine if all critical dependencies are healthy
    # Currently, Ollama is our only critical dependency
    is_ready = ollama_health.status == HealthStatus.OK

    response_data = ReadinessResponse(
        status=HealthStatus.OK if is_ready else HealthStatus.ERROR,
        ready=is_ready,
        details={
            "ollama": ollama_health.status.value
        }
    )

    # Return appropriate HTTP status code
    # 200 = ready to receive traffic
    # 503 = not ready, route traffic elsewhere
    http_status = status.HTTP_200_OK if is_ready else status.HTTP_503_SERVICE_UNAVAILABLE

    return JSONResponse(
        content=response_data.model_dump(),
        status_code=http_status
    )
