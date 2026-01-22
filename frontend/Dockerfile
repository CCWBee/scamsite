# =============================================================================
# ScamAware Jersey - Frontend Dockerfile
# =============================================================================
# This Dockerfile uses a multi-stage build to create a minimal, secure,
# production-ready Next.js container image.
#
# Multi-stage builds help us:
# 1. Reduce final image size by excluding build-time dependencies
# 2. Improve security by minimizing attack surface
# 3. Leverage Docker layer caching for faster builds
#
# Target image size: Under 500MB (achieved through standalone output + Alpine)
# =============================================================================

# =============================================================================
# STAGE 1: deps
# =============================================================================
# Purpose: Install dependencies in an isolated stage
# Why: Separating dependency installation allows Docker to cache this layer
#      When only source code changes (not package.json), this layer is reused
# =============================================================================
FROM node:20-alpine AS deps

# Alpine Linux requires libc6-compat for certain Node.js native modules
# This package provides glibc compatibility layer needed by some npm packages
RUN apk add --no-cache libc6-compat

# Set working directory for all subsequent commands
# Using /app as a standard convention for containerized applications
WORKDIR /app

# Copy package files first (before source code)
# This ordering is crucial for Docker layer caching:
# - If only source files change, this layer is cached
# - Dependencies are only reinstalled when package.json/package-lock.json change
COPY package.json package-lock.json* ./

# Install dependencies using npm ci for reproducible builds
# npm ci (clean install) is preferred over npm install because:
# - It installs exact versions from package-lock.json
# - It removes existing node_modules first (clean slate)
# - It's faster and more reliable for CI/CD environments
# - It fails if package-lock.json is out of sync with package.json
RUN npm ci

# =============================================================================
# STAGE 2: builder
# =============================================================================
# Purpose: Build the Next.js application for production
# Why: Build artifacts are created here but build tools are not copied to final image
# =============================================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy installed dependencies from the deps stage
# This avoids reinstalling dependencies and uses cached layer
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files needed for the build
# This includes:
# - Source code (src/, app/, pages/, components/, etc.)
# - Configuration files (next.config.ts, tsconfig.json, etc.)
# - Public assets (public/)
COPY . .

# Set NODE_ENV to production for the build process
# This ensures:
# - React runs in production mode (smaller bundle, no dev warnings)
# - Next.js applies production optimizations
# - Dependencies marked as devDependencies behavior is correct
ENV NODE_ENV=production

# Disable Next.js telemetry during build
# Privacy consideration: prevents sending anonymous usage data to Vercel
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
# With output: "standalone" in next.config.ts, this creates:
# - .next/standalone/ - Self-contained Node.js server with minimal dependencies
# - .next/static/ - Static assets (JS, CSS, images)
# - public/ - Public static files
# The standalone output dramatically reduces the final image size
RUN npm run build

# =============================================================================
# STAGE 3: runner
# =============================================================================
# Purpose: Production runtime - minimal image with only what's needed to run
# Why: Security and size - no build tools, source code, or dev dependencies
# =============================================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment variables
# NODE_ENV=production ensures:
# - Express/Node.js runs with production defaults
# - React hydration uses production mode
# - Error messages are appropriate for production
ENV NODE_ENV=production

# Disable Next.js telemetry at runtime
# Consistent with build-time setting for privacy
ENV NEXT_TELEMETRY_DISABLED=1

# Security: Create a non-root user and group for running the application
# Running as non-root is a security best practice because:
# - Limits damage if the application is compromised
# - Prevents accidental or malicious system modifications
# - Follows principle of least privilege
# - Required by many container orchestration platforms (OpenShift, etc.)
#
# We create:
# - Group 'nodejs' (GID 1001) - for file permission management
# - User 'nextjs' (UID 1001) - the actual user running the app
# Using explicit UID/GID ensures consistency across environments
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets from builder stage
# These are static files served directly (favicon, images, etc.)
# Owned by nextjs user for security
COPY --from=builder /app/public ./public

# Create the .next directory and set ownership
# This directory will hold the standalone server output
# Must be owned by nextjs user since the app may need to write cache files
RUN mkdir .next && chown nextjs:nodejs .next

# Copy the standalone server output from builder
# The standalone output includes:
# - Minimal Node.js server (server.js)
# - Only the node_modules actually needed at runtime
# - Compiled application code
# This is the key to achieving a small image size
# --chown ensures the nextjs user owns these files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets generated during build
# These are the compiled JS/CSS bundles and optimized images
# They're served by the Next.js server from /_next/static/
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user for runtime
# From this point, all commands run as 'nextjs' user
USER nextjs

# Expose the port Next.js runs on
# This is documentation and allows Docker to map the port
# Actual binding happens at runtime with -p flag
EXPOSE 3000

# Set the port environment variable
# Next.js standalone server reads this to determine which port to listen on
ENV PORT=3000

# Set hostname to listen on all interfaces
# 0.0.0.0 allows connections from outside the container
# localhost/127.0.0.1 would only allow connections from inside the container
ENV HOSTNAME="0.0.0.0"

# Health check configuration
# Verifies the application is running and responsive
# This enables:
# - Docker health monitoring (docker ps shows health status)
# - Container orchestration health checks (Kubernetes, Docker Swarm)
# - Automatic restart of unhealthy containers
#
# Parameters explained:
# --interval=30s  : Check every 30 seconds
# --timeout=10s   : Wait up to 10 seconds for response
# --start-period=30s : Give container 30 seconds to start before checking
# --retries=3     : Mark unhealthy after 3 consecutive failures
#
# Using wget instead of curl because:
# - curl is not installed in Alpine by default
# - wget is smaller and included in Alpine base image
# - -q (quiet) suppresses output, --spider does HEAD request only
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD wget --quiet --spider http://localhost:3000/api/health || exit 1

# Start the Next.js standalone server
# server.js is the minimal server created by standalone output
# It includes only the dependencies needed to run the application
CMD ["node", "server.js"]
