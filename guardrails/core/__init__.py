"""
ScamAware Jersey Guardrails - Core Package
==========================================

This package contains core utilities and infrastructure components
for the Guardrails service, including:

- logging: Structured JSON logging with request ID injection
- (future) config: Configuration management
- (future) middleware: Common FastAPI middleware

Usage:
------
    from core.logging import configure_logging, get_logger

    # Initialize logging on application startup
    configure_logging()

    # Get a logger instance
    logger = get_logger(__name__)
    logger.info("Application started")
"""

from core.logging import (
    configure_logging,
    get_logger,
    set_request_id,
    get_request_id,
    clear_request_id,
    hash_sensitive_data,
    create_request_context_middleware,
)

__all__ = [
    # Logging functions
    "configure_logging",
    "get_logger",
    "set_request_id",
    "get_request_id",
    "clear_request_id",
    "hash_sensitive_data",
    "create_request_context_middleware",
]
