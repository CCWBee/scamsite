#!/bin/bash
#
# ============================================================================
# ScamAware Jersey - Docker Image Build Script
# ============================================================================
#
# DESCRIPTION:
#   Builds all Docker images for the ScamAware Jersey project. This includes
#   the frontend application and the guardrails API service.
#
# USAGE:
#   ./build.sh [OPTIONS]
#
# OPTIONS:
#   --help, -h      Show this help message and exit
#   --no-cache      Build images without using cache (clean build)
#
# EXAMPLES:
#   ./build.sh              # Build all images with cache
#   ./build.sh --no-cache   # Clean build without cache
#
# IMAGES BUILT:
#   - frontend    : React/Next.js frontend application
#   - guardrails  : Python guardrails API service
#
# NOTES:
#   - Build progress is displayed for each image
#   - Summary shows success/failure status for each image
#   - Exit code is non-zero if any build fails
#
# ============================================================================

set -e

# ============================================================================
# Configuration
# ============================================================================

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Images to build (service names from docker-compose.yml)
IMAGES=("frontend" "guardrails")

# Build options
NO_CACHE=false

# Track build results
declare -A BUILD_RESULTS

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
    echo "  ScamAware Jersey - Docker Image Builder"
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

print_building() {
    echo -e "${YELLOW}[BUILDING]${NC} $1"
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

build_image() {
    local service=$1
    local compose_cmd=$(get_compose_cmd)
    local build_args=""

    if [ "$NO_CACHE" = true ]; then
        build_args="--no-cache"
    fi

    echo ""
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
    print_building "Building image: $service"
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"

    cd "$PROJECT_ROOT"

    if $compose_cmd build $build_args "$service"; then
        BUILD_RESULTS[$service]="success"
        print_success "Image '$service' built successfully."
        return 0
    else
        BUILD_RESULTS[$service]="failed"
        print_error "Image '$service' build failed."
        return 1
    fi
}

print_summary() {
    local total=${#IMAGES[@]}
    local success=0
    local failed=0

    echo ""
    echo -e "${CYAN}${BOLD}"
    echo "============================================================"
    echo "  Build Summary"
    echo "============================================================"
    echo -e "${NC}"

    for image in "${IMAGES[@]}"; do
        local result=${BUILD_RESULTS[$image]:-"skipped"}
        if [ "$result" = "success" ]; then
            echo -e "  ${GREEN}[PASS]${NC} $image"
            ((success++))
        elif [ "$result" = "failed" ]; then
            echo -e "  ${RED}[FAIL]${NC} $image"
            ((failed++))
        else
            echo -e "  ${YELLOW}[SKIP]${NC} $image"
        fi
    done

    echo ""
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
    echo -e "  Total: $total | ${GREEN}Passed: $success${NC} | ${RED}Failed: $failed${NC}"
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"

    if [ $failed -gt 0 ]; then
        return 1
    fi
    return 0
}

# ============================================================================
# Parse Arguments
# ============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            ;;
        --no-cache)
            NO_CACHE=true
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

# Show build configuration
print_info "Working directory: $PROJECT_ROOT"
if [ "$NO_CACHE" = true ]; then
    print_info "Build mode: Clean build (no cache)"
else
    print_info "Build mode: Using cache"
fi

# Track overall success
BUILD_FAILED=false

# Build each image
for image in "${IMAGES[@]}"; do
    if ! build_image "$image"; then
        BUILD_FAILED=true
        # Continue building other images even if one fails
    fi
done

# Print summary
if ! print_summary; then
    echo ""
    print_error "Some builds failed. Check the output above for details."
    exit 1
fi

echo ""
print_success "All images built successfully!"
