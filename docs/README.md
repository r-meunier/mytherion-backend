# Mytherion Documentation

This directory contains project documentation for the Mytherion application.

---

## Performance & Monitoring

### [Performance Monitoring Strategy](./PERFORMANCE_MONITORING.md)

Comprehensive guide to measuring and monitoring API performance:

- Three-tier implementation approach (Logging → Actuator → Full Observability)
- Spring Boot Actuator + Micrometer setup
- Prometheus + Grafana integration
- Custom metrics and alerting
- Production-ready monitoring stack

**Complete strategy for performance visibility from development to production.**

### [Performance Monitoring Quick Start](./PERFORMANCE_MONITORING_QUICKSTART.md)

Get started with API performance monitoring in 30 minutes:

- Step-by-step setup guide
- Immediate metrics visibility
- Common performance queries
- Before/after comparison tools

**Perfect for getting started quickly with minimal setup.**

### [Logging Guide](./LOGGING.md)

Structured logging system documentation:

- Kotlin logging extensions
- Request correlation with MDC
- Execution timing with `measureTime()`
- Best practices and examples

**Foundation for performance measurement through logs.**

---

## Authentication Documentation

### [Future Features](./auth-future-features.md)

Comprehensive list of planned enhancements and features for the authentication system, including:

- Password reset flow
- Email verification
- Rate limiting
- Two-factor authentication
- Social login
- And more...

**Organized by priority with estimated effort for each feature.**

### [Manual Testing Checklist](./auth-manual-testing-checklist.md)

Step-by-step manual testing guide for authentication features:

- 24 test scenarios
- Registration, login, logout flows
- Session persistence
- Security validation
- UI/UX testing

**Use this checklist to verify authentication functionality before deployment.**

---

## Quick Links

### Implementation Documents

- [Implementation Plan](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/implementation_plan.md)
- [Implementation Review](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/implementation_review.md)
- [Walkthrough](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/walkthrough.md)

### Testing Documents

- [Test Plan](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/test_plan.md)
- [Testing Summary](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/testing_summary.md)
- [Task Checklist](file:///C:/Users/gramy/.gemini/antigravity/brain/043d2fb9-ea22-4066-972c-b41d8cfeaa48/task.md)

---

## Document Organization

```
docs/
├── README.md (this file)
├── PERFORMANCE_MONITORING.md
├── PERFORMANCE_MONITORING_QUICKSTART.md
├── LOGGING.md
├── auth-future-features.md
└── auth-manual-testing-checklist.md
```

---

## Contributing

When adding new documentation:

1. Use clear, descriptive filenames
2. Include a summary at the top of each document
3. Update this README with links to new documents
4. Use markdown formatting for consistency
5. Include code examples where relevant

---

## Version History

- **2026-01-20**: Added performance monitoring documentation
  - Performance monitoring strategy
  - Quick start guide
- **2026-01-17**: Initial documentation created
  - Authentication future features
  - Manual testing checklist
