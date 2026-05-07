# 🏗️ Mytherion CI/CD Pipeline Roadmap

This document outlines the strategy for evolving the current basic testing workflow into a professional-grade Continuous Integration and Continuous Deployment (CI/CD) pipeline.

## 1. Phase 1: Enhanced Integration (CI)
*Goal: Ensure code quality, security, and consistency before any deployment.*

### 🛠️ Code Quality (Linting)
- **Backend**: Integrate `ktlint` to enforce Kotlin coding standards.
- **Frontend**: Enforce `ESLint` and `Prettier` checks to ensure UI code consistency.
- **Action**: Add `lint` jobs to GitHub Actions that fail the build on style violations.

### 🔒 Security & Vulnerabilities
- **Static Analysis**: Integrate `Snyk` or `GitHub Dependency Graph` to scan for vulnerable packages in `package.json` and `build.gradle`.
- **Secret Scanning**: Prevent accidental commits of `.env` files or API keys using GitHub Secret Scanning.

### 📊 Coverage Reporting
- **Backend**: Use `Jacoco` to generate code coverage reports.
- **Frontend**: Use `Jest --coverage` to track UI test coverage.
- **Goal**: Maintain a minimum of 80% coverage on core business logic.

---

## 2. Phase 2: Delivery & Environments (CD)
*Goal: Automate the movement of code from 'develop' to 'production'.*

### 🧪 Staging Environment
- **Trigger**: Every push to the `develop` branch.
- **Action**: Automatically build Docker images and deploy to a `staging.mytherion.com` server.
- **Purpose**: A "Real World" sandbox for integration testing and previewing features before they go live.

### 🚀 Production Environment
- **Trigger**: Every push/merge to the `main` branch.
- **Action**: 
    1. Tag the release (e.g., `v1.0.2`).
    2. Build production-optimized Docker images.
    3. Deploy to the live server (VPS or Cloud).
    4. Run database migrations (`Flyway`).

---

## 3. Infrastructure & Monitoring
*Goal: Ensure the live application is healthy and performant.*

### 🐳 Containerization Strategy
- Use a **Unified Docker Compose** setup for production.
- **Services**: Nginx (Reverse Proxy), Backend (Spring), Frontend (Next.js), PostgreSQL, MinIO.
- **Benefit**: "Write once, run anywhere" portability.

### 📈 Observability
- **Error Tracking**: Integrate `Sentry` to capture runtime exceptions on both frontend and backend.
- **Metrics**: Use `Spring Actuator` + `Prometheus` (already in backend) to monitor server load and response times.
- **Notifications**: Send build status (Success/Failure) to a Discord or Slack webhook.

---

## 4. Current Pipeline Status (MVP)
- [x] Monorepo structure support.
- [x] Basic GitHub Actions workflow.
- [x] Automated Backend Unit Tests (JDK 24).
- [x] Automated Frontend Unit Tests (Node 20).
- [ ] Automated Linting.
- [ ] Docker image building in CI.
- [ ] Auto-deployment to server.
