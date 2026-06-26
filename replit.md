# Guia CAR

Assistente inteligente que traduz a legislação ambiental brasileira (Código Florestal) em linguagem simples e orientação prática para produtores rurais, com foco no CAR (Cadastro Ambiental Rural).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/car-guia run dev` — run the frontend (port 23533)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `GOOGLE_API_KEY` — Google AI Studio key for the Gemini chat assistant

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + shadcn/ui + Tailwind CSS + wouter
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- AI: Google Gemini 2.5 Flash (chat assistant)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/` — DB schema (chatSessions, chatMessages, guides, diagnoses)
- `artifacts/api-server/src/routes/` — Express route handlers (chat, guides, diagnosis, stats)
- `artifacts/car-guia/src/pages/` — Frontend pages (home, chat, guias, guia-detalhe, diagnostico, diagnostico-resultado)
- `artifacts/car-guia/src/hooks/use-session.ts` — Session management hook

## Architecture decisions

- Sessions stored in localStorage (`car-guia-session-id`), created on demand via API
- AI assistant uses system prompt with deep knowledge of Código Florestal and CAR; gracefully degrades if OPENAI_API_KEY missing
- Diagnosis calculator implements simplified Código Florestal rules server-side (no AI needed)
- Guides seeded with 8 real CAR/Código Florestal articles in Portuguese

## Product

- **Chat**: AI assistant that answers questions about CAR, APP, Reserva Legal etc. in simple Portuguese
- **Guias**: 8 practical guides covering key CAR topics (APP, Reserva Legal, retificação, PRA, biomas, etc.)
- **Diagnóstico**: 3-step form to characterize the property and get a legal requirements diagnosis
- **Home**: Quick access to features + community stats + popular topics

## User preferences

- Target user: "Seu Raimundo" — small/medium rural producer, limited digital literacy, may have poor connectivity
- Language: Portuguese Brazilian, simple and direct
- No emojis in UI
- Mobile-first design

## Gotchas

- Always run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- Run `pnpm --filter @workspace/db run push` after changing DB schema files
- Session is created lazily — chat/diagnosis will wait for sessionId before enabling

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
