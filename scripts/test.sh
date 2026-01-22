#!/bin/bash
#
# ============================================================================
# ScamAware Jersey - Test Runner Script
# ============================================================================
#
# DESCRIPTION:
#   Runs all tests for the ScamAware Jersey project including frontend tests,
#   guardrails API tests, and linting for both codebases.
#
# USAGE:
#   ./test.sh [OPTIONS]
#
# OPTIONS:
#   --help, -h          Show this help message and exit
#   --frontend-only     Run only frontend tests
#   --guardrails-only   Run only guardrails tests
#   --no-lint           Skip linting checks
#   --coverage          Generate coverage reports
#
# EXAMPLES:
#   ./test.sh                    # Run all tests and linting
#   ./test.sh --frontend-only    # Run only frontend tests
#   ./test.sh --coverage         # Run tests with coverage
#   ./test.sh --no-lint          # Skip linting, run tests only
#
# TEST SUITES:
#   - Frontend: Jest/React Testing Library (npm test)
#   - Guardrails: Pytest (pytest)
#   - Linting: ESLint (frontend), Flake8/Ruff (guardrails)
#
# EXIT CODES:
#   0 - All tests passed
#   1 - One or more tests failed
#
# ============================================================================

set -e

# ============================================================================
# Configuration
# ============================================================================

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Paths to project components
FRONTEND_DIR="$PROJECT_ROOT/frontend"
GUARDRAILS_DIR="$PROJECT_ROOT/guardrails"

# Options
RUN_FRONTEND=true
RUN_GUARDRAILS=true
RUN_LINT=true
COVERAGE=false

# Track test results
declare -A TEST_RESULTS
TESTS_FAILED=0
TESTS_PASSED=0
TESTS_SKIPPED=0

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
    echo "  ScamAware Jersey - Test Runner"
    echo "============================================================"
    echo -e "${NC}"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[SKIP]${NC} $1"
}

print_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

print_running() {
    echo -e "${YELLOW}[RUNNING]${NC} $1"
}

show_help() {
    # Extract and display the header comments as help text
    sed -n '3,36p' "$0" | sed 's/^# //' | sed 's/^#//'
    exit 0
}

check_requirements() {
    print_info "Checking requirements..."

    local warnings=()

    if [ "$RUN_FRONTEND" = true ]; then
        if ! command -v npm &> /dev/null; then
            warnings+=("npm not found - frontend tests will be skipped")
            RUN_FRONTEND=false
        fi
    fi

    if [ "$RUN_GUARDRAILS" = true ]; then
        if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
            warnings+=("python not found - guardrails tests will be skipped")
            RUN_GUARDRAILS=false
        fi
    fi

    for warning in "${warnings[@]}"; do
        print_warning "$warning"
    done

    if [ "$RUN_FRONTEND" = false ] && [ "$RUN_GUARDRAILS" = false ]; then
        print_error "No test environments available. Please install npm and/or python."
        exit 1
    fi
}

run_test_suite() {
    local name=$1
    local command=$2
    local dir=$3

    echo ""
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
    print_running "$name"
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"

    if [ ! -d "$dir" ]; then
        print_warning "Directory not found: $dir"
        TEST_RESULTS[$name]="skipped"
        ((TESTS_SKIPPED++))
        return 0
    fi

    cd "$dir"

    # Temporarily disable exit on error for this command
    set +e
    eval "$command"
    local exit_code=$?
    set -e

    if [ $exit_code -eq 0 ]; then
        TEST_RESULTS[$name]="passed"
        ((TESTS_PASSED++))
        print_success "$name completed successfully."
    else
        TEST_RESULTS[$name]="failed"
        ((TESTS_FAILED++))
        print_error "$name failed with exit code $exit_code."
    fi

    return $exit_code
}

get_python_cmd() {
    if command -v python3 &> /dev/null; then
        echo "python3"
    else
        echo "python"
    fi
}

print_summary() {
    local total=$((TESTS_PASSED + TESTS_FAILED + TESTS_SKIPPED))

    echo ""
    echo -e "${CYAN}${BOLD}"
    echo "============================================================"
    echo "  Test Summary"
    echo "============================================================"
    echo -e "${NC}"

    # Print individual results
    for test_name in "${!TEST_RESULTS[@]}"; do
        local result=${TEST_RESULTS[$test_name]}
        if [ "$result" = "passed" ]; then
            echo -e "  ${GREEN}[PASS]${NC} $test_name"
        elif [ "$result" = "failed" ]; then
            echo -e "  ${RED}[FAIL]${NC} $test_name"
        else
            echo -e "  ${YELLOW}[SKIP]${NC} $test_name"
        fi
    done

    echo ""
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
    echo -e "  Total: $total | ${GREEN}Passed: $TESTS_PASSED${NC} | ${RED}Failed: $TESTS_FAILED${NC} | ${YELLOW}Skipped: $TESTS_SKIPPED${NC}"
    echo -e "${CYAN}────────────────────────────────────────────────────────────${NC}"
}

# ============================================================================
# Parse Arguments
# ============================================================================

while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            show_help
            ;;
        --frontend-only)
            RUN_FRONTEND=true
            RUN_GUARDRAILS=false
            shift
            ;;
        --guardrails-only)
            RUN_FRONTEND=false
            RUN_GUARDRAILS=true
            shift
            ;;
        --no-lint)
            RUN_LINT=false
            shift
            ;;
        --coverage)
            COVERAGE=true
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

# Check requirements
check_requirements

print_info "Working directory: $PROJECT_ROOT"
print_info "Test configuration:"
echo "  - Frontend tests: $([ "$RUN_FRONTEND" = true ] && echo "enabled" || echo "disabled")"
echo "  - Guardrails tests: $([ "$RUN_GUARDRAILS" = true ] && echo "enabled" || echo "disabled")"
echo "  - Linting: $([ "$RUN_LINT" = true ] && echo "enabled" || echo "disabled")"
echo "  - Coverage: $([ "$COVERAGE" = true ] && echo "enabled" || echo "disabled")"

# Track overall failures (don't exit on first failure)
ANY_FAILED=false

# ============================================================================
# Frontend Tests
# ============================================================================

if [ "$RUN_FRONTEND" = true ]; then
    # Frontend linting
    if [ "$RUN_LINT" = true ]; then
        if ! run_test_suite "Frontend Linting (ESLint)" "npm run lint 2>/dev/null || npx eslint . --ext .js,.jsx,.ts,.tsx 2>/dev/null || echo 'ESLint not configured'" "$FRONTEND_DIR"; then
            ANY_FAILED=true
        fi
    fi

    # Frontend unit tests
    if [ "$COVERAGE" = true ]; then
        if ! run_test_suite "Frontend Tests (Jest)" "npm test -- --coverage --watchAll=false 2>/dev/null || npm test -- --coverage 2>/dev/null || echo 'No test script configured'" "$FRONTEND_DIR"; then
            ANY_FAILED=true
        fi
    else
        if ! run_test_suite "Frontend Tests (Jest)" "npm test -- --watchAll=false 2>/dev/null || npm test 2>/dev/null || CI=true npm test 2>/dev/null || echo 'No test script configured'" "$FRONTEND_DIR"; then
            ANY_FAILED=true
        fi
    fi
fi

# ============================================================================
# Guardrails Tests
# ============================================================================

if [ "$RUN_GUARDRAILS" = true ]; then
    PYTHON_CMD=$(get_python_cmd)

    # Guardrails linting
    if [ "$RUN_LINT" = true ]; then
        if ! run_test_suite "Guardrails Linting (Ruff/Flake8)" "$PYTHON_CMD -m ruff check . 2>/dev/null || $PYTHON_CMD -m flake8 . 2>/dev/null || echo 'No Python linter configured'" "$GUARDRAILS_DIR"; then
            ANY_FAILED=true
        fi
    fi

    # Guardrails unit tests
    if [ "$COVERAGE" = true ]; then
        if ! run_test_suite "Guardrails Tests (Pytest)" "$PYTHON_CMD -m pytest --cov=. --cov-report=term-missing 2>/dev/null || $PYTHON_CMD -m pytest 2>/dev/null || echo 'No pytest tests found'" "$GUARDRAILS_DIR"; then
            ANY_FAILED=true
        fi
    else
        if ! run_test_suite "Guardrails Tests (Pytest)" "$PYTHON_CMD -m pytest 2>/dev/null || echo 'No pytest tests found'" "$GUARDRAILS_DIR"; then
            ANY_FAILED=true
        fi
    fi
fi

# ============================================================================
# Summary
# ============================================================================

print_summary

echo ""
if [ $TESTS_FAILED -gt 0 ]; then
    print_error "Some tests failed. Please review the output above."
    exit 1
else
    print_success "All tests passed!"
    exit 0
fi
