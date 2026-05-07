# CLAUDE.md — Mytherion Backend (Spring Boot + Kotlin)

You are working in **Mytherion Backend**, a Spring Boot + Kotlin service for a lightweight worldbuilding / codex-style app.
It provides structured storage for **projects (worlds)** and **entries** (characters, locations, cultures, etc.), and is an early MVP under active development.

## What matters most (guardrails)
- This is **early MVP / active development**: schemas and migrations may change; DB resets are expected.
- **Flyway migrations are source of truth** for schema. Do not “just tweak the DB”.
- Code is organized **by domain**, not by layers. Preserve that structure.
- Keep API design **clear and evolvable**; avoid premature optimization.

## Tech stack (current)
- Kotlin + Spring Boot
- Spring Data JPA (Hibernate)
- Flyway migrations
- PostgreSQL
- Docker / Docker Compose for local infra
- Gradle (Kotlin DSL)

## Local dev quickstart
### Prereqs
- JDK 17 or 21
- Docker + Docker Compose

### Run locally
1) Copy env:
```bash
cp .env.example .env
```

2) Start Postgres:
```bash
docker compose up -d
```

3) Run the app:
```bash
./gradlew bootRun
```

4) Verify:
- `GET http://localhost:8080/api/health`
- Expected:
```json
{ "status": "OK", "app": "Mytherion" }
```

### Reset database (expected during MVP)
This project uses a bind-mounted Postgres data directory. To fully reset:
1) `docker compose down`
2) Delete contents of `data/`
3) `docker compose up -d`

Flyway will re-run migrations on startup.

## Database migrations (Flyway)
- Location: `src/main/resources/db/migration`
- Rules:
  - Migrations run once per database
  - **Do not edit** an already-applied migration
  - New schema change = new migration (`V2__...`, `V3__...`, etc.)
  - In early dev it’s acceptable to wipe local DB

## Code layout (high-level)
Root package:
`src/main/kotlin/io/mytherion`

Common domains/modules:
- `config` — Security, Flyway, app config
- `health` — health check endpoint
- `user` — user domain
- `project` — projects/worlds
- `entry` — codex entries
- `MytherionApplication.kt` — app entrypoint

### When adding a feature
Prefer this flow:
1) Identify the domain (`project`, `entry`, `user`, etc.)
2) Add/extend JPA entity + repository + service + controller inside the same domain package
3) Add a Flyway migration for schema changes
4) Update/extend endpoints under the existing `/api/...` pattern (health is `/api/health`)

## Current vs planned features (context)
Current:
- Postgres schema managed via Flyway
- Project creation/listing
- Entry model groundwork
- Health endpoint
- Dockerized local DB

Planned (don’t implement unless asked):
- Auth (JWT)
- Entry CRUD
- Tagging/search
- Image uploads
- Relationship mapping
- Export (PDF/image)
- AI-assisted structuring tools

## Quality bar / change discipline
- Keep changes small and readable.
- Prefer simple, predictable Spring idioms.
- Avoid introducing new frameworks unless clearly required.
- Any schema change must be accompanied by a Flyway migration.
- Don’t refactor package structure into “controller/service/repository” layers; keep domain-first.

## What to do when unsure
If you’re missing context:
- Re-read `README.md` (setup, conventions, endpoints).
- Check existing domain packages for patterns (how controllers/services/repos are organized).
- If a change touches persistence, inspect existing Flyway migrations first.

## Licensing note
This project is currently **not licensed for redistribution**.
