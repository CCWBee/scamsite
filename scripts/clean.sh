#!/bin/bash
#
# ============================================================================
# ScamAware Jersey - Docker Cleanup Script
# ============================================================================
#
# DESCRIPTION:
#   Cleans up Docker resources for the ScamAware Jersey project. This script
#   stops running containers and removes them. Additional options allow for
#   removing volumes and images.
#
# USAGE:
#   ./clean.sh [OPTIONS]
#
# OPTIONS:
#   --help, -h      Show this help message and exit
#   --volumes, -v   Also remove Docker volumes (data will be lost!)
#   --all, -a       Remove everything including images
#   --force, -f     Skip confirmation prompts
#
# EXAMPLES:
#   ./clean.sh              # Stop and remove containers only
#   ./clean.sh --volumes    # Also remove volumes (with confirmation)
#   ./clean.sh --all        # Remove containers, volumes, and images
#   ./clean.sh --all -f     # Remove everything without confirmation
#
# WARNING:
#   Using --volumes or --all will result in DATA LOSS. Database contents
#   and other persistent data will be permanently deleted.
#
# ============================================================================

set -e

# ============================================================================
# Configuration
# ============================================================================

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Options
REMOVE_VOLUMES=false
REMOVE_IMAGES=false
FORCE=false

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
    echo "  ScamAware Jersey - Docker Cleanup"
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

confirm_action() {
    local message=$1

    if [ "$FORCE" = true ]; then
        return 0
    fi

    echo ""
    echo -e "${YELLOW}${BOLD}WARNING:${NC} $message"
    echo ""
    read -p "Are you sure you want to continue? (y/N): " -n 1 -r
    echo ""

    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_info "Operation cancelled by user."
        exit 0
    fi
}

# ============================================================================
# Parse Arguments
# ============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            ;;
        --volumes|-v)
            REMOVE_VOLUMES=true
            shift
            ;;
        --all|-a)
            REMOVE_VOLUMES=true
            REMOVE_IMAGES=true
            shift
            ;;
        --force|-f)
            FORCE=true
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

# Show what will be cleaned
echo ""
print_info "Cleanup plan:"
echo "  - Stop running containers"
echo "  - Remove containers"
if [ "$REMOVE_VOLUMES" = true ]; then
    echo -e "  - ${YELLOW}Remove volumes (DATA LOSS!)${NC}"
fi
if [ "$REMOVE_IMAGES" = true ]; then
    echo -e "  - ${YELLOW}Remove images${NC}"
fi

# Confirm destructive operations
if [ "$REMOVE_VOLUMES" = true ] || [ "$REMOVE_IMAGES" = true ]; then
    confirm_action "This operation will permanently delete data and cannot be undone."
fi

# Stop and remove containers
echo ""
print_info "Stopping containers..."
$COMPOSE_CMD down 2>/dev/null || true
print_success "Containers stopped."

# Remove volumes if requested
if [ "$REMOVE_VOLUMES" = true ]; then
    echo ""
    print_info "Removing volumes..."
    $COMPOSE_CMD down -v 2>/dev/null || true
    print_success "Volumes removed."
fi

# Remove images if requested
if [ "$REMOVE_IMAGES" = true ]; then
    echo ""
    print_info "Removing images..."
    $COMPOSE_CMD down --rmi all 2>/dev/null || true
    print_success "Images removed."
fi

# Additional cleanup - remove orphaned containers
echo ""
print_info "Removing orphaned containers..."
$COMPOSE_CMD down --remove-orphans 2>/dev/null || true
print_success "Orphaned containers removed."

# Show summary
echo ""
echo -e "${CYAN}${BOLD}"
echo "============================================================"
echo "  Cleanup Complete"
echo "============================================================"
echo -e "${NC}"
echo "  Cleaned:"
echo "    - Containers: Removed"
if [ "$REMOVE_VOLUMES" = true ]; then
    echo "    - Volumes: Removed"
else
    echo "    - Volumes: Preserved"
fi
if [ "$REMOVE_IMAGES" = true ]; then
    echo "    - Images: Removed"
else
    echo "    - Images: Preserved"
fi
echo ""
print_success "Docker cleanup completed successfully!"
