/**
 * Health Check API Endpoint
 *
 * This endpoint is used for container health checks and monitoring systems.
 * It provides a simple way to verify that the Next.js frontend service is
 * running and responsive.
 *
 * Use cases:
 * - Docker/Kubernetes health probes (liveness and readiness checks)
 * - Load balancer health checks
 * - Monitoring and alerting systems (e.g., Prometheus, Datadog)
 * - CI/CD deployment verification
 *
 * @example
 * curl http://localhost:3000/api/health
 * // Returns: { "status": "ok", "timestamp": 1706000000000, "service": "scamaware-frontend", "version": "0.1.0" }
 */

import { NextResponse } from "next/server";

/**
 * Response shape for the health check endpoint
 */
interface HealthCheckResponse {
  /** Service health status - "ok" indicates the service is healthy */
  status: "ok";
  /** Unix timestamp in milliseconds when the health check was performed */
  timestamp: number;
  /** Service identifier for distinguishing between multiple services */
  service: string;
  /** Application version from package.json */
  version: string;
}

/**
 * GET /api/health
 *
 * Returns the current health status of the ScamAware frontend service.
 * This endpoint should always return quickly and not perform expensive operations
 * to ensure accurate health check results.
 *
 * Response codes:
 * - 200: Service is healthy and operational
 *
 * Cache behavior:
 * - no-store: Prevents caching to ensure fresh health status on each request
 * - no-cache: Requires revalidation with origin server
 *
 * @returns {Promise<NextResponse<HealthCheckResponse>>} JSON response with health status
 */
export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  const response: HealthCheckResponse = {
    status: "ok",
    timestamp: Date.now(),
    service: "scamaware-frontend",
    version: "0.1.0",
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      // Prevent caching of health check responses to ensure accurate status
      // This is critical for monitoring systems that need real-time health data
      "Cache-Control": "no-store, no-cache, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
