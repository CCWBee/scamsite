# ScamAware Jersey

An anti-scam awareness portal helping Jersey residents identify, report, and protect themselves from scams through AI-powered education and interactive tools.

[![CI Status](https://github.com/scamaware-jersey/scamsite/actions/workflows/ci.yml/badge.svg)](https://github.com/scamaware-jersey/scamsite/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Overview

ScamAware Jersey is a comprehensive web application designed to educate Jersey residents about common scams and provide tools to help them stay safe online. The platform combines modern web technologies with AI-powered features to deliver an engaging and informative experience.

### Key Features

- **AI Chatbot**: Interactive assistant powered by Ollama that answers questions about scams and provides personalized guidance
- **Scam Education**: Detailed information about common scam types targeting Jersey residents
- **Safety Resources**: Practical tips and checklists for staying safe online
- **Reporting Tools**: Easy-to-use forms for reporting suspected scams
- **Content Guardrails**: AI safety layer ensuring appropriate and helpful responses

### Target Audience

This portal is designed specifically for Jersey residents of all ages and technical backgrounds, with a focus on accessibility and clear communication.

---

## Architecture

```
                                    +------------------+
                                    |                  |
                                    |      Nginx       |
                                    |   (Reverse Proxy)|
                                    |     Port 80      |
                                    +--------+---------+
                                             |
                         +-------------------+-------------------+
                         |                                       |
                         v                                       v
              +----------+----------+                 +----------+----------+
              |                     |                 |                     |
              |      Frontend       |                 |     Guardrails      |
              |    (Next.js App)    |                 |   (FastAPI Service) |
              |      Port 3000      |                 |      Port 8000      |
              +---------------------+                 +----------+----------+
                                                                 |
                                                                 v
                                                      +----------+----------+
                                                      |                     |
                                                      |       Ollama        |
                                                      |    (LLM Service)    |
                                                      |      Port 11434     |
                                                      +---------------------+
```

### Services

| Service | Description | Technology | Port |
|---------|-------------|------------|------|
| **frontend** | Web application UI | Next.js 14, React, TypeScript | 3000 |
| **guardrails** | AI safety and content moderation | FastAPI, Python, NeMo Guardrails | 8000 |
| **ollama** | Local LLM inference | Ollama, Llama 2 | 11434 |
| **nginx** | Reverse proxy and static file serving | Nginx | 80 |

### Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11, NeMo Guardrails
- **AI/ML**: Ollama, Llama 2
- **Infrastructure**: Docker, Docker Compose, Nginx
- **Testing**: Jest, Pytest, Playwright

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Docker** (version 24.0+)
  ```bash
  docker --version
  ```

- **Docker Compose** (version 2.20+)
  ```bash
  docker compose version
  ```

### For Local Development

- **Node.js** (version 20.0+)
  ```bash
  node --version
  ```

- **Python** (version 3.11+)
  ```bash
  python --version
  ```

- **pnpm** (recommended) or npm
  ```bash
  pnpm --version
  ```

### Optional

- **NVIDIA GPU with CUDA** (for accelerated Ollama inference)
  - CUDA Toolkit 11.8+
  - NVIDIA Container Toolkit

---

## Quick Start

Get up and running in minutes with Docker:

### 1. Clone the Repository

```bash
git clone https://github.com/scamaware-jersey/scamsite.git
cd scamsite
```

### 2. Configure Environment Variables

```bash
# Copy example environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp guardrails/.env.example guardrails/.env
```

### 3. Start All Services

```bash
# Start in detached mode
docker compose up -d

# Or start with logs visible
docker compose up
```

### 4. Access the Application

- **Web Application**: http://localhost
- **Frontend (direct)**: http://localhost:3000
- **Guardrails API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

### 5. Stop Services

```bash
docker compose down
```

---

## Development Setup

For active development with hot reload and debugging capabilities.

### Frontend Development

```bash
cd frontend

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env.local

# Start development server with hot reload
pnpm dev
```

The frontend will be available at http://localhost:3000 with automatic hot reload on file changes.

#### Frontend Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run Jest tests
pnpm test:e2e     # Run Playwright E2E tests
```

### Guardrails Development

```bash
cd guardrails

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Copy environment file
cp .env.example .env

# Start development server with hot reload
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000 with automatic reload on file changes.

#### Guardrails Commands

```bash
pytest                    # Run all tests
pytest --cov=app          # Run tests with coverage
black app/                # Format code
ruff check app/           # Lint code
mypy app/                 # Type checking
```

### Running Services Individually

You can run specific services using Docker Compose:

```bash
# Run only Ollama
docker compose up ollama

# Run frontend and guardrails (for local development with Docker Ollama)
docker compose up ollama nginx
```

### Hot Reload Configuration

Both frontend and guardrails support hot reload in development mode:

| Service | Method | Watch Directory |
|---------|--------|-----------------|
| Frontend | Next.js Fast Refresh | `frontend/src/` |
| Guardrails | Uvicorn --reload | `guardrails/app/` |

---

## Project Structure

```
scamsite/
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflow definitions
│       └── ci.yml              # Main CI pipeline
├── frontend/                   # Next.js web application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   ├── components/         # React components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   └── styles/             # Global styles
│   ├── tests/                  # Test files
│   ├── .env.example            # Example environment variables
│   ├── Dockerfile              # Container configuration
│   ├── package.json            # Node.js dependencies
│   └── tsconfig.json           # TypeScript configuration
├── guardrails/                 # FastAPI backend service
│   ├── app/
│   │   ├── api/                # API route handlers
│   │   ├── core/               # Core configuration
│   │   ├── models/             # Pydantic models
│   │   ├── services/           # Business logic
│   │   └── main.py             # Application entry point
│   ├── config/                 # Guardrails configuration
│   ├── tests/                  # Test files
│   ├── .env.example            # Example environment variables
│   ├── Dockerfile              # Container configuration
│   └── requirements.txt        # Python dependencies
├── nginx/                      # Nginx configuration
│   └── nginx.conf              # Reverse proxy configuration
├── scripts/                    # Utility scripts
│   ├── dev.sh                  # Development startup script
│   ├── build.sh                # Production build script
│   ├── clean.sh                # Cleanup script
│   └── test.sh                 # Test runner script
├── docker-compose.yml          # Docker Compose configuration
├── docker-compose.override.yml # Development overrides
├── .env.example                # Root environment variables
└── README.md                   # This file
```

---

## Available Scripts

Utility scripts are located in the `scripts/` directory:

### dev.sh

Start all services in development mode with hot reload enabled.

```bash
./scripts/dev.sh

# Options:
./scripts/dev.sh --no-ollama    # Start without Ollama (use mock)
./scripts/dev.sh --rebuild      # Rebuild containers before starting
```

### build.sh

Build production Docker images for all services.

```bash
./scripts/build.sh

# Options:
./scripts/build.sh --push       # Push images to registry
./scripts/build.sh --tag v1.0   # Tag images with version
```

### clean.sh

Remove containers, volumes, and cached data.

```bash
./scripts/clean.sh

# Options:
./scripts/clean.sh --all        # Remove everything including images
./scripts/clean.sh --volumes    # Remove only volumes
```

### test.sh

Run tests for all services.

```bash
./scripts/test.sh

# Options:
./scripts/test.sh --frontend    # Run only frontend tests
./scripts/test.sh --guardrails  # Run only guardrails tests
./scripts/test.sh --e2e         # Run E2E tests
./scripts/test.sh --coverage    # Generate coverage reports
```

---

## Configuration

### Environment Variables

The application uses environment variables for configuration. Example files are provided for each service.

#### Root Configuration (`.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `COMPOSE_PROJECT_NAME` | Docker Compose project name | `scamsite` |
| `ENVIRONMENT` | Deployment environment | `development` |

#### Frontend (`frontend/.env.local`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Guardrails API URL | `http://localhost:8000` |
| `NEXT_PUBLIC_SITE_NAME` | Site display name | `ScamAware Jersey` |

#### Guardrails (`guardrails/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_BASE_URL` | Ollama service URL | `http://ollama:11434` |
| `OLLAMA_MODEL` | LLM model to use | `llama2` |
| `LOG_LEVEL` | Logging verbosity | `INFO` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |

For complete configuration options, see the `.env.example` files in each service directory.

---

## Contributing

We welcome contributions from the community! Here's how to get started.

### Code Style

This project uses automated code formatting and linting:

- **Frontend**: ESLint, Prettier
- **Backend**: Black, Ruff, MyPy

Pre-commit hooks are configured to run automatically:

```bash
# Install pre-commit hooks
pip install pre-commit
pre-commit install

# Run manually on all files
pre-commit run --all-files
```

### Pull Request Process

1. **Fork the repository** and create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the code style guidelines

3. **Write tests** for new functionality
   ```bash
   ./scripts/test.sh
   ```

4. **Ensure all tests pass** and linting is clean
   ```bash
   pre-commit run --all-files
   ```

5. **Commit your changes** with a descriptive message
   ```bash
   git commit -m "feat: add new scam detection feature"
   ```

6. **Push to your fork** and open a Pull Request

7. **Describe your changes** in the PR description

### Testing Requirements

All PRs must meet these testing requirements:

- Unit tests for new functions and components
- Integration tests for API endpoints
- E2E tests for new user-facing features
- Minimum 80% code coverage for new code

---

## Troubleshooting

### Common Issues

#### Docker containers won't start

```bash
# Check container logs
docker compose logs -f

# Ensure ports aren't in use
netstat -an | findstr "3000 8000 11434 80"

# Rebuild containers
docker compose down
docker compose build --no-cache
docker compose up
```

#### Ollama model download fails

```bash
# Check Ollama logs
docker compose logs ollama

# Manually pull the model
docker compose exec ollama ollama pull llama2

# Verify model is available
docker compose exec ollama ollama list
```

#### Frontend can't connect to API

1. Verify guardrails service is running:
   ```bash
   docker compose ps
   ```

2. Check environment variables in `frontend/.env.local`

3. Ensure CORS is configured correctly in guardrails

#### Hot reload not working

- **Frontend**: Ensure you're running `pnpm dev`, not `pnpm start`
- **Guardrails**: Ensure you're running with `--reload` flag
- **Docker**: Check volume mounts in `docker-compose.override.yml`

#### Out of memory errors

Ollama requires significant memory. Try these solutions:

1. Reduce model size:
   ```bash
   # Use a smaller model
   OLLAMA_MODEL=llama2:7b docker compose up
   ```

2. Increase Docker memory allocation in Docker Desktop settings

3. Run Ollama on GPU if available

### Getting Help

If you encounter issues not covered here:

1. **Search existing issues**: https://github.com/scamaware-jersey/scamsite/issues

2. **Check discussions**: https://github.com/scamaware-jersey/scamsite/discussions

3. **Open a new issue** with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Docker version, etc.)
   - Relevant logs

4. **Join our community chat** for real-time help

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- Built for the residents of Jersey
- Powered by open-source AI technology
- Developed with community safety in mind

---

<p align="center">
  <strong>Stay safe. Stay informed. Stay ScamAware.</strong>
</p>
