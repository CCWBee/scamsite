#!/bin/bash
#
# ============================================================================
# ScamAware Jersey - Development Environment Script
# ============================================================================
#
# DESCRIPTION:
#   Starts the development environment using Docker Compose. This script
#   manages all services required for local development including the
#   frontend, guardrails API, and any supporting services.
#
# USAGE:
#   ./dev.sh [OPTIONS]
#
# OPTIONS:
#   --help, -h      Show this help message and exit
#   --build, -b     Rebuild Docker images before starting
#   --detach, -d    Run containers in background (detached mode)
#
# EXAMPLES:
#   ./dev.sh                  # Start services with live logs
#   ./dev.sh --build          # Rebuild images and start services
#   ./dev.sh --detach         # Start services in background
#   ./dev.sh --build --detach # Rebuild and run in background
#
# NOTES:
#   - Press Ctrl+C to gracefully stop all services (when not detached)
#   - Logs are displayed in follow mode by default
#   - Services are defined in docker-compose.yml at project root
#
# ============================================================================

set -e

# ============================================================================
# Configuration
# ============================================================================

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Default options
BUILD=false
DETACH=false

# ============================================================================
# Color Definitions
# ============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# ============================================================================
# Helper Functions
# ============================================================================

print_header() {
    echo -e "${CYAN}${BOLD}"
    echo "============================================================"
    echo "  ScamAware Jersey - Development Environment"
    echo "============================================================"
    echo -e "${NC}"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    # Extract and display the header comments as help text
    sed -n '3,31p' "$0" | sed 's/^# //' | sed 's/^#//'
    exit 0
}

check_requirements() {
    local missing=()

    if ! command -v docker &> /dev/null; then
        missing+=("docker")
    fi

    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null 2>&1; then
        missing+=("docker-compose")
    fi

    if [ ${#missing[@]} -ne 0 ]; then
        print_error "Missing required tools: ${missing[*]}"
        echo "Please install the missing tools and try again."
        exit 1
    fi

    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running. Please start Docker and try again."
        exit 1
    fi
}

# Determine docker-compose command (v1 vs v2)
get_compose_cmd() {
    if docker compose version &> /dev/null 2>&1; then
        echo "docker compose"
    else
        echo "docker-compose"
    fi
}

cleanup() {
    echo ""
    print_warning "Received interrupt signal. Stopping services..."
    local compose_cmd=$(get_compose_cmd)
    cd "$PROJECT_ROOT"
    $compose_cmd down
    print_success "Services stopped gracefully."
    exit 0
}

# ============================================================================
# Parse Arguments
# ============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            ;;
        --build|-b)
            BUILD=true
            shift
            ;;
        --detach|-d)
            DETACH=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            echo "Use --help for usage information."
            exit 1
            ;;
    esac
done

# ============================================================================
# Main Script
# ============================================================================

print_header

# Check for required tools
print_info "Checking requirements..."
check_requirements
print_success "All requirements met."

# Change to project root
cd "$PROJECT_ROOT"
print_info "Working directory: $PROJECT_ROOT"

# Get compose command
COMPOSE_CMD=$(get_compose_cmd)
print_info "Using compose command: $COMPOSE_CMD"

# Build images if requested
if [ "$BUILD" = true ]; then
    echo ""
    print_info "Building Docker images..."
    $COMPOSE_CMD build
    print_success "Images built successfully."
fi

# Set up trap for graceful shutdown (only if not detached)
if [ "$DETACH" = false ]; then
    trap cleanup SIGINT SIGTERM
fi

# Start services
echo ""
if [ "$DETACH" = true ]; then
    print_info "Starting services in detached mode..."
    $COMPOSE_CMD up -d
    print_success "Services started in background."
    echo ""
    print_info "View logs with: $COMPOSE_CMD logs -f"
    print_info "Stop services with: $COMPOSE_CMD down"
else
    print_info "Starting services with live logs..."
    print_info "Press Ctrl+C to stop all services."
    echo ""
    $COMPOSE_CMD up
fi
