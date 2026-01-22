#!/bin/bash

###############################################################################
#                       OLLAMA MODEL INITIALIZATION SCRIPT
###############################################################################
#
# DESCRIPTION:
#   This script initializes the Ollama service for the ScamAware Jersey
#   anti-scam awareness portal. It waits for the Ollama API to become
#   available and then pulls the required AI model used for scam detection
#   and analysis features.
#
# WHAT THIS SCRIPT DOES:
#   1. Checks if Ollama service is running and accessible
#   2. Waits (with timeout) for the service to become ready
#   3. Pulls the qwen2.5:7b-instruct-q4_K_M model if not already present
#   4. Verifies the model was pulled successfully
#
# WHEN TO RUN:
#   - After starting the Ollama service for the first time
#   - As part of Docker Compose startup (via entrypoint)
#   - After reinstalling or updating Ollama
#   - When setting up a new development environment
#   - This script is idempotent - safe to run multiple times
#
# PREREQUISITES:
#   - Ollama service must be installed (but doesn't need to be running yet)
#   - curl must be available on the system
#   - Network access to pull the model (first run only)
#   - Sufficient disk space for the model (~4GB for qwen2.5:7b-instruct-q4_K_M)
#
# ENVIRONMENT VARIABLES:
#   OLLAMA_HOST - Base URL for Ollama API (default: http://localhost:11434)
#
# EXIT CODES:
#   0 - Success: Ollama is ready and model is available
#   1 - Failure: Timeout waiting for Ollama or model pull failed
#
# USAGE:
#   ./init-ollama.sh
#   OLLAMA_HOST=http://ollama:11434 ./init-ollama.sh
#
# AUTHOR: ScamAware Jersey Development Team
# VERSION: 1.0.0
#
###############################################################################

# ==============================================================================
# CONFIGURATION
# ==============================================================================

# The AI model to pull - qwen2.5:7b-instruct is a capable instruction-following
# model. The q4_K_M quantization provides good quality with reduced memory usage.
readonly MODEL_NAME="qwen2.5:7b-instruct-q4_K_M"

# Default Ollama API host - can be overridden via OLLAMA_HOST environment variable
# This allows flexibility for both local development and Docker deployments
readonly DEFAULT_OLLAMA_HOST="http://localhost:11434"

# Maximum time (in seconds) to wait for Ollama service to become ready
# 5 minutes should be sufficient even for slow container startups
readonly MAX_WAIT_SECONDS=300

# Interval (in seconds) between health check attempts
readonly POLL_INTERVAL=2

# ==============================================================================
# GLOBAL VARIABLES
# ==============================================================================

# Use OLLAMA_HOST from environment if set, otherwise use default
OLLAMA_HOST="${OLLAMA_HOST:-$DEFAULT_OLLAMA_HOST}"

# ==============================================================================
# UTILITY FUNCTIONS
# ==============================================================================

# ------------------------------------------------------------------------------
# print_header - Displays a formatted header message
# Arguments:
#   $1 - The message to display
# ------------------------------------------------------------------------------
print_header() {
    echo ""
    echo "============================================================"
    echo "  $1"
    echo "============================================================"
    echo ""
}

# ------------------------------------------------------------------------------
# print_info - Displays an informational message with timestamp
# Arguments:
#   $1 - The message to display
# ------------------------------------------------------------------------------
print_info() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] INFO: $1"
}

# ------------------------------------------------------------------------------
# print_success - Displays a success message with timestamp
# Arguments:
#   $1 - The message to display
# ------------------------------------------------------------------------------
print_success() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] SUCCESS: $1"
}

# ------------------------------------------------------------------------------
# print_error - Displays an error message with timestamp to stderr
# Arguments:
#   $1 - The message to display
# ------------------------------------------------------------------------------
print_error() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: $1" >&2
}

# ------------------------------------------------------------------------------
# print_warning - Displays a warning message with timestamp
# Arguments:
#   $1 - The message to display
# ------------------------------------------------------------------------------
print_warning() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] WARNING: $1"
}

# ------------------------------------------------------------------------------
# show_spinner - Displays a simple progress spinner
# Arguments:
#   $1 - Process ID to wait for (optional, for background processes)
# Note: Call this in a loop while waiting for operations
# ------------------------------------------------------------------------------
show_spinner() {
    local spin_chars='|/-\'
    local char_index=$((SECONDS % 4))
    printf "\r[%c] Waiting..." "${spin_chars:$char_index:1}"
}

# ==============================================================================
# CORE FUNCTIONS
# ==============================================================================

# ------------------------------------------------------------------------------
# check_ollama_health - Checks if Ollama API is responding
# Returns:
#   0 - Ollama is healthy and responding
#   1 - Ollama is not responding or returned an error
# Description:
#   Makes a GET request to the /api/tags endpoint which lists available models.
#   This endpoint is lightweight and ideal for health checks.
# ------------------------------------------------------------------------------
check_ollama_health() {
    # Use curl with:
    #   -s: silent mode (no progress meter)
    #   -f: fail silently on HTTP errors (returns non-zero exit code)
    #   -o /dev/null: discard response body
    #   --max-time 5: timeout after 5 seconds per request
    curl -sf -o /dev/null --max-time 5 "${OLLAMA_HOST}/api/tags" 2>/dev/null
    return $?
}

# ------------------------------------------------------------------------------
# wait_for_ollama - Waits for Ollama service to become ready
# Returns:
#   0 - Ollama became ready within timeout
#   1 - Timeout reached before Ollama was ready
# Description:
#   Polls the Ollama health endpoint at regular intervals until either:
#   - Ollama responds successfully, or
#   - The maximum wait time is exceeded
# ------------------------------------------------------------------------------
wait_for_ollama() {
    print_info "Waiting for Ollama service at: ${OLLAMA_HOST}"
    print_info "Maximum wait time: ${MAX_WAIT_SECONDS} seconds"

    local elapsed=0
    local start_time=$SECONDS

    while [ $elapsed -lt $MAX_WAIT_SECONDS ]; do
        # Check if Ollama is responding
        if check_ollama_health; then
            printf "\r"  # Clear the spinner line
            print_success "Ollama service is ready!"
            return 0
        fi

        # Update elapsed time
        elapsed=$((SECONDS - start_time))

        # Calculate remaining time for display
        local remaining=$((MAX_WAIT_SECONDS - elapsed))

        # Show progress with spinner and countdown
        printf "\r[|/-\\] Waiting for Ollama... (${elapsed}s elapsed, ${remaining}s remaining)  "

        # Wait before next attempt
        sleep $POLL_INTERVAL
    done

    # If we get here, we timed out
    printf "\r"  # Clear the spinner line
    print_error "Timeout: Ollama service did not become ready within ${MAX_WAIT_SECONDS} seconds"
    print_error "Please ensure Ollama is installed and running"
    print_error "You can start Ollama with: ollama serve"
    return 1
}

# ------------------------------------------------------------------------------
# check_model_exists - Checks if a model is already pulled
# Arguments:
#   $1 - Model name to check
# Returns:
#   0 - Model exists locally
#   1 - Model does not exist or error checking
# Description:
#   Queries the /api/tags endpoint and checks if the specified model
#   is in the list of available models.
# ------------------------------------------------------------------------------
check_model_exists() {
    local model_to_check="$1"

    # Query the tags endpoint and search for our model
    # The response is JSON with a "models" array containing model objects
    # Each model object has a "name" field
    local response
    response=$(curl -sf --max-time 10 "${OLLAMA_HOST}/api/tags" 2>/dev/null)

    if [ $? -ne 0 ]; then
        print_warning "Could not query model list"
        return 1
    fi

    # Check if the model name appears in the response
    # We use grep for simple substring matching
    # The model name in the response includes the tag (e.g., "qwen2.5:7b-instruct-q4_K_M")
    if echo "$response" | grep -q "\"name\":\"${model_to_check}\""; then
        return 0
    fi

    # Also check without quotes in case of different JSON formatting
    if echo "$response" | grep -q "${model_to_check}"; then
        return 0
    fi

    return 1
}

# ------------------------------------------------------------------------------
# pull_model - Pulls (downloads) a model from Ollama registry
# Arguments:
#   $1 - Model name to pull
# Returns:
#   0 - Model pulled successfully
#   1 - Error pulling model
# Description:
#   Uses the Ollama /api/pull endpoint to download the specified model.
#   This may take several minutes depending on network speed and model size.
#   Progress is displayed as it's received from the API.
# ------------------------------------------------------------------------------
pull_model() {
    local model_to_pull="$1"

    print_info "Pulling model: ${model_to_pull}"
    print_info "This may take several minutes depending on your network speed..."
    print_info "Model size is approximately 4GB"
    echo ""

    # Use curl to POST to the pull endpoint
    # The --no-buffer flag ensures we see progress in real-time
    # The response is a stream of JSON objects with progress information
    local pull_result
    pull_result=$(curl -sf --no-buffer --max-time 3600 \
        -X POST "${OLLAMA_HOST}/api/pull" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"${model_to_pull}\"}" 2>&1)

    local curl_exit_code=$?

    echo ""  # New line after progress output

    if [ $curl_exit_code -ne 0 ]; then
        print_error "Failed to pull model (curl exit code: ${curl_exit_code})"
        print_error "Response: ${pull_result}"
        return 1
    fi

    # Check if the response contains an error
    if echo "$pull_result" | grep -qi "error"; then
        print_error "Error in pull response: ${pull_result}"
        return 1
    fi

    # Verify the model was actually pulled by checking if it exists now
    if check_model_exists "$model_to_pull"; then
        print_success "Model ${model_to_pull} pulled successfully!"
        return 0
    else
        print_error "Model pull appeared to complete but model not found"
        return 1
    fi
}

# ------------------------------------------------------------------------------
# ensure_model_available - Ensures the required model is available
# Returns:
#   0 - Model is available (either existed or was pulled successfully)
#   1 - Failed to ensure model availability
# Description:
#   This is the main idempotent function. It checks if the model exists
#   and only pulls it if necessary.
# ------------------------------------------------------------------------------
ensure_model_available() {
    print_info "Checking for model: ${MODEL_NAME}"

    # First, check if model already exists (idempotent check)
    if check_model_exists "$MODEL_NAME"; then
        print_success "Model ${MODEL_NAME} is already available"
        print_info "Skipping pull (already exists)"
        return 0
    fi

    print_info "Model not found locally, initiating pull..."

    # Model doesn't exist, need to pull it
    if pull_model "$MODEL_NAME"; then
        return 0
    else
        print_error "Failed to pull model ${MODEL_NAME}"
        return 1
    fi
}

# ==============================================================================
# MAIN SCRIPT EXECUTION
# ==============================================================================

# ------------------------------------------------------------------------------
# main - Main entry point for the script
# Returns:
#   0 - All operations completed successfully
#   1 - One or more operations failed
# ------------------------------------------------------------------------------
main() {
    print_header "ScamAware Jersey - Ollama Initialization"

    print_info "Starting Ollama initialization..."
    print_info "Target host: ${OLLAMA_HOST}"
    print_info "Target model: ${MODEL_NAME}"
    echo ""

    # Step 1: Wait for Ollama service to be ready
    print_header "Step 1/2: Waiting for Ollama Service"
    if ! wait_for_ollama; then
        print_error "Initialization failed: Ollama service not available"
        exit 1
    fi

    # Step 2: Ensure the required model is available
    print_header "Step 2/2: Ensuring Model Availability"
    if ! ensure_model_available; then
        print_error "Initialization failed: Could not ensure model availability"
        exit 1
    fi

    # All done!
    print_header "Initialization Complete"
    print_success "Ollama is ready with model: ${MODEL_NAME}"
    print_success "ScamAware Jersey AI features are now available"
    echo ""

    exit 0
}

# Run main function
# This pattern allows the script to be sourced for testing individual functions
# without automatically executing main
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
