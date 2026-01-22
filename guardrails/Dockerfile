# =============================================================================
# ScamAware Jersey Guardrails Service - Production Dockerfile
# =============================================================================
#
# This Dockerfile creates a production-ready container for the Guardrails API
# service. It uses a multi-stage build pattern to minimize the final image size
# and follows security best practices.
#
# Build command:
#   docker build -t scamaware-guardrails ./guardrails
#
# Run command:
#   docker run -p 8000:8000 scamaware-guardrails
#
# =============================================================================

# =============================================================================
# STAGE 1: Builder
# =============================================================================
# This stage installs all dependencies and prepares them for the production
# stage. Using a separate builder stage keeps build tools and cache out of
# the final image, reducing its size and attack surface.
# =============================================================================

FROM python:3.11-slim AS builder

# ---------------------------------------------------------------------------
# Set environment variables for Python optimization
# ---------------------------------------------------------------------------
# PYTHONDONTWRITEBYTECODE=1: Prevents Python from writing .pyc bytecode files
#   to disk. These files are unnecessary in a container environment and would
#   only increase image size.
#
# PYTHONUNBUFFERED=1: Forces Python to run in unbuffered mode, ensuring that
#   logs are immediately flushed to stdout/stderr. This is critical for
#   containerized applications to ensure logs are visible in real-time.
# ---------------------------------------------------------------------------
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# ---------------------------------------------------------------------------
# Set working directory for the build stage
# ---------------------------------------------------------------------------
# All subsequent commands will be executed from this directory.
# Using /app as a standard convention for application code.
# ---------------------------------------------------------------------------
WORKDIR /app

# ---------------------------------------------------------------------------
# Install build dependencies
# ---------------------------------------------------------------------------
# Some Python packages require compilation. We install only the minimal
# required packages for building Python wheels. These won't be included
# in the final image since we're using a multi-stage build.
#
# --no-install-recommends: Only install essential packages, not recommended
#   extras, keeping the build environment minimal.
#
# rm -rf /var/lib/apt/lists/*: Clean up apt cache to reduce layer size.
# ---------------------------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# ---------------------------------------------------------------------------
# Copy only the requirements file first
# ---------------------------------------------------------------------------
# Docker caches layers, so by copying requirements.txt separately before
# the rest of the code, we can leverage caching. Dependencies only need
# to be reinstalled when requirements.txt changes, not when application
# code changes. This significantly speeds up rebuilds during development.
# ---------------------------------------------------------------------------
COPY requirements.txt .

# ---------------------------------------------------------------------------
# Install Python dependencies
# ---------------------------------------------------------------------------
# Using pip cache mount (--mount=type=cache) allows pip to cache downloaded
# packages between builds. This dramatically speeds up rebuilds when
# dependencies haven't changed or only partially changed.
#
# --no-cache-dir: Don't store pip's HTTP cache in the image (we use the
#   mount cache instead)
#
# --target=/app/dependencies: Install packages to a specific directory
#   that we can cleanly copy to the production stage. This avoids copying
#   unnecessary files from the default site-packages location.
#
# Note: We only install production dependencies from requirements.txt,
# not development dependencies (testing, linting tools, etc.)
# ---------------------------------------------------------------------------
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --no-cache-dir --target=/app/dependencies -r requirements.txt


# =============================================================================
# STAGE 2: Runner (Production)
# =============================================================================
# This is the final production image. It contains only the runtime
# dependencies and application code, without build tools or source control
# files. This reduces the attack surface and keeps the image small.
# =============================================================================

FROM python:3.11-slim AS runner

# ---------------------------------------------------------------------------
# Set environment variables for production
# ---------------------------------------------------------------------------
# PYTHONDONTWRITEBYTECODE=1: Don't write .pyc files (same as builder stage)
#
# PYTHONUNBUFFERED=1: Unbuffered output for real-time logging
#
# PYTHONPATH=/app/dependencies: Tell Python where to find installed packages.
#   This allows us to use packages installed in the custom directory from
#   the builder stage.
# ---------------------------------------------------------------------------
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app/dependencies

# ---------------------------------------------------------------------------
# Set working directory for the application
# ---------------------------------------------------------------------------
WORKDIR /app

# ---------------------------------------------------------------------------
# Create non-root user for security
# ---------------------------------------------------------------------------
# SECURITY: Running containers as root is a significant security risk.
# If an attacker exploits a vulnerability in the application, they would
# have root access to the container and potentially escape to the host.
#
# By creating and using a non-privileged user (appuser), we limit the
# damage an attacker can do even if they compromise the application.
#
# --system: Create a system user (no home directory, no login shell)
# --group: Create a group with the same name
# --no-log-init: Don't create lastlog/faillog entries (smaller image)
#
# We also create the /app directory with proper ownership before copying
# files, ensuring the non-root user can access the application files.
# ---------------------------------------------------------------------------
RUN groupadd --system appgroup && \
    useradd --system --gid appgroup --no-log-init appuser && \
    chown appuser:appgroup /app

# ---------------------------------------------------------------------------
# Copy installed dependencies from builder stage
# ---------------------------------------------------------------------------
# Multi-stage builds allow us to copy only the necessary artifacts from
# previous stages. Here we copy the installed Python packages without
# the build tools, source files, or pip cache.
#
# --from=builder: Reference the builder stage
# --chown=appuser:appgroup: Set ownership to our non-root user
# ---------------------------------------------------------------------------
COPY --from=builder --chown=appuser:appgroup /app/dependencies /app/dependencies

# ---------------------------------------------------------------------------
# Copy application source code
# ---------------------------------------------------------------------------
# Copy only the necessary application files. The .dockerignore file
# should exclude unnecessary files like:
# - .git directory and source control files
# - __pycache__ and .pyc files
# - Test files and development configuration
# - Documentation and README files
# - IDE configuration files
#
# --chown=appuser:appgroup: Ensure the non-root user owns these files
#
# We copy the main application file and supporting Python modules:
# - main.py: FastAPI application entry point
# - pyproject.toml: Project metadata (used for version info)
# - core/: Core utilities (logging, configuration)
# - routes/: API route handlers (health checks, validation endpoints)
# ---------------------------------------------------------------------------
COPY --chown=appuser:appgroup main.py .
COPY --chown=appuser:appgroup pyproject.toml .
COPY --chown=appuser:appgroup core/ ./core/
COPY --chown=appuser:appgroup routes/ ./routes/

# ---------------------------------------------------------------------------
# Switch to non-root user
# ---------------------------------------------------------------------------
# From this point forward, all commands (including the CMD) will run as
# appuser instead of root. This is a critical security measure.
# ---------------------------------------------------------------------------
USER appuser

# ---------------------------------------------------------------------------
# Expose the application port
# ---------------------------------------------------------------------------
# EXPOSE documents which port the container listens on. This is primarily
# for documentation purposes - it doesn't actually publish the port.
# The port must still be mapped when running the container with -p flag.
#
# Port 8000 is the standard port for uvicorn/FastAPI applications.
# ---------------------------------------------------------------------------
EXPOSE 8000

# ---------------------------------------------------------------------------
# Health check configuration
# ---------------------------------------------------------------------------
# HEALTHCHECK tells Docker how to verify the container is working correctly.
# This is used by orchestrators (Docker Swarm, Kubernetes) for:
# - Determining when a container is ready to receive traffic
# - Detecting when a container has become unhealthy and needs restart
#
# --interval=30s: Check health every 30 seconds
# --timeout=10s: Wait up to 10 seconds for a response
# --start-period=5s: Give the app 5 seconds to start before checking
# --retries=3: Mark unhealthy after 3 consecutive failures
#
# We use Python with urllib to avoid adding curl/wget to the image.
# This keeps the image smaller and reduces potential attack vectors.
# The health check calls our /health endpoint which returns {"status": "healthy"}
# ---------------------------------------------------------------------------
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/health')" || exit 1

# ---------------------------------------------------------------------------
# Define the command to run the application
# ---------------------------------------------------------------------------
# CMD specifies the default command to run when the container starts.
# Using JSON array format (exec form) is preferred over shell form because:
# - The process receives signals directly (important for graceful shutdown)
# - No shell overhead
# - More predictable behavior
#
# uvicorn options:
# --host 0.0.0.0: Listen on all network interfaces (required for containers)
# --port 8000: Port to listen on (matches EXPOSE)
# --workers 1: Number of worker processes (adjust based on CPU cores)
#              In production with orchestration, prefer multiple containers
#              over multiple workers for better isolation and scaling.
# --no-access-log: Disable access logging (optional, remove if needed for debugging)
#
# Note: For production, you may want to add:
# --proxy-headers: Trust proxy headers for correct client IP
# --forwarded-allow-ips: Specify trusted proxies
# ---------------------------------------------------------------------------
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
