---
name: sunny:architecture
description: Apply Sunny Kolattukudy's architecture principles to design, review, or evaluate systems. Use this skill when Sunny asks "how should I structure X", "design a new module for Y", "review this architecture", "should this be a service?", "what's the right project structure for Z", "is this the right pattern?", or any question about system design, module boundaries, project layout, cloud hosting choices, or technology selection in .NET, Blazor, or Azure/AWS. Also trigger when Sunny shares a design and wants an opinionated read, or when code review feedback touches architectural decisions.
---

<!--
allowed-tools: Read, Bash, Glob, Grep
-->

Apply Sunny's architecture principles to design systems, review proposals, and make technology choices — opinionated, grounded in the actual stack.

## Step 1: Understand the problem first

Before proposing anything, ask:
- **What problem is this solving?** (The why shapes the boundary.)
- **Who owns this?** (If the team boundary doesn't match the system boundary, flag it — but don't use the term "Conway's law".)
- **What's the deployment + test independence story?** (Can this be deployed and tested without touching everything else?)

If the request is a review of an existing design, read it first, then apply the principles below.

## Step 2: Apply the architecture principles

See `references/principles.md` for the full reference. The non-negotiables:

- **Modular monolith first.** Extract to services only when scale demands it independently or team ownership requires it. Late is right.
- **Feature folders over layer folders.** `Features/LicenseSources/` with `Pages/`, `Components/`, `Services/` inside beats a flat `Pages/`, `Components/`, `Services/` structure at the root.
- **State in services, not components.** Singleton services with private state (or `IMemoryCache` for larger cases). No Fluxor, no cascading params.
- **API interfaces between modules.** Direct HTTP API calls between modules/services. Direct DB access only for internal tools and as a last resort. For background work: Azure Storage Queue → Azure Function (single consumer). For fan-out to multiple consumers: Azure Event Grid or Azure Event Hub. No in-process eventing (no MediatR notifications, no domain events dispatched in-process) — queues and event services are simpler, more obvious, and independently observable.
- **No repository pattern over EF Core.** `IQueryable<TEntity>` extension methods that project to `IQueryable<TModel>`, composed in controllers. No DAL abstraction layer.
- **No mediator / Command pattern.** No MediatR, no `IRequest`/`IHandler`, no `-Command` suffix. Direct controller → service calls only.
- **No `-Dto` suffix.** Use `Model` (e.g. `ProviderModel`, `CredentialSummaryModel`).
- **NuGet: Microsoft-first.** Write it yourself before pulling in a third-party package. Prefer `System.Text.Json`, `HttpClient`, `Microsoft.Extensions.*`. If a third-party package has a significant feature advantage, offer it as an option with a license check.

## Step 3: Output format

Use this structure. Keep it concise — link to docs rather than reproducing them. Use generic `Company.App.*` names in examples — never real client names.

```
## Architecture: [Feature / System Name]

### Problem
[One sentence: what this solves and for whom.]

### Recommendation
[Direct recommendation — what to build, how to structure it, where it lives.]

### Solution structure
[Project layout, folder structure, key files.]

### Alternatives considered
1. [Option] — [Why not recommended in one line]
2. [Option] — [Why not recommended in one line]

### Ownership check
[Who owns this? Does the team boundary match? Flag mismatches plainly — no jargon.]

### Deployment & test independence
[How does this get deployed independently? How do you test it in isolation?]

### Docs
- [Relevant Microsoft docs link]
```

For reviews (not proposals), swap "Recommendation" for "Assessment" and add a "Concerns" section before Alternatives.

## Naming conventions

**Solution / project naming:**
- Structured company: `CompanyName.RepositoryName.ComponentName` — e.g. `Acme.Portal.Api`
- Complex repo name: `CompanyName.AppName.ComponentName` — e.g. `Acme.App.Api`
- Standard components: `Api`, `Ui`, `Domain`, `Core`, `Functions`, `Cli`, `Data.<Schema>`
- Tests: `Tests.PreDeployment`, `Tests.PostDeployment`

**Project structure (Blazor WASM + API):**
```
Company.App.Api          → ASP.NET Core API (Container Apps)
Company.App.Ui           → Blazor WASM client
Company.App.Ui.Web       → Blazor WASM host (serves the client)
Company.App.Domain       → POCOs shared between server and client (no server deps)
Company.App.Core         → Shared backend utilities (not sent to client, not a service layer)
Company.App.Data.<Name>  → EF Core project, one per database schema
Company.App.Functions    → Azure Functions (one app, many functions)
Company.App.Cli          → CLI tooling
Tests.PreDeployment      → xunit only (runs before deploy)
Tests.PostDeployment     → Reqnroll + Playwright E2E (runs after deploy)
```

No additional class libraries unless producing a distributable package (minimizing package surface is the reason, not convenience).

**Blazor feature folder structure (inside `.Ui`):**
```
Features/
  FeatureName/
    Pages/          → @page components
    Components/     → sub-components used by this feature
    Services/       → IFeatureService + implementation (HttpClient-based)
Services/           → cross-cutting services (auth, local storage, etc.)
Layout/             → app shell, nav, sidebars
```

**API feature folder structure (inside `.Api`):**
```
Features/
  FeatureName/
    FeatureNameController.cs   → primary controller
    SubResourceController.cs   → e.g. PermissionsController alongside RolesController
    Services/
      IFeatureNameService.cs
      FeatureNameService.cs
```

When a feature has natural sub-resources (e.g. Roles → Permissions), include both controllers in the same feature folder. Don't collapse them into one controller.

## Mapping pattern

No AutoMapper, no Mapster. Write it directly:

- **Entity → Model:** extension method on `IQueryable<TEntity>` that projects to `IQueryable<TModel>` (for EF Core queries), or a static `.ToModel()` extension for in-memory mapping
- **Model → Entity (updates):** `CopyFrom(model)` method on the entity itself

```csharp
// Entity → Model (EF Core projection)
public static IQueryable<ProviderModel> ProjectToModel(this IQueryable<Provider> query) =>
    query.Select(p => new ProviderModel { Id = p.Id, Name = p.Name, ... });

// Entity update
public void CopyFrom(ProviderUpdateModel model)
{
    Name = model.Name;
    // ...
}
```

Don't suggest unit testing pure mapping methods — there's no business logic to test.

## Cloud & hosting defaults

**Azure (preferred):**
- APIs → Azure Container Apps
- Background / queue processing → Azure Functions (one Function App, many functions)
- Very small APIs → Functions-only is acceptable
- Queues → Azure Storage Queues
- IaC → Bicep

**AWS (secondary):**
- Queues → SQS
- IaC → Terraform

When recommending hosting, state the reason — scale, cost, team familiarity, or existing infra.

## Testing stack

Always recommend this stack — don't suggest alternatives unless asked:

- **xunit** — unit and integration tests (`Tests.PreDeployment`)
- **Reqnroll + Playwright (.NET)** — BDD E2E tests (`Tests.PostDeployment`). Feature files describe business scenarios; Step Definitions use Page Model abstraction. Extension methods for common UI interactions (MudBlazor/Telerik).
- **Impostor** — mocking in unit tests (explicit third-party exception)

Project naming: `Tests.PreDeployment` (xunit only) and `Tests.PostDeployment` (Reqnroll + Playwright). Never `UnitTests` or `IntegrationTests` as top-level names.

Third-party test packages (xunit, Reqnroll, Playwright, Impostor) are the explicit exception to the Microsoft-first NuGet rule.

## Data seeding

Two distinct seeding patterns — always use both.

### Reference data seeding (static, idempotent)

For lookup tables, roles, permissions, enum values — data that must exist in every environment.

- Static class `ReferenceDataSeeder` in the `.Data` project
- Seeds in FK-dependency order using `SyncReferenceDataAsync<TEntity, TId>()` — idempotent upsert (add new, update changed, delete orphans)
- Entity implements `IReferenceDataEntity<TSelf, TId>` and provides its own `GetSeedData()`
- Invoked via CLI: `seed-reference` command — runs locally and in CI/CD pipelines after migrations

### Test data seeding (deterministic random)

For local dev and staging environments.

- **Bogus** (NuGet — explicit third-party exception, no Microsoft equivalent)
- `DataSeeder.cs` orchestrates in dependency order; individual entity seeders (e.g. `ProviderSeeder.cs`) — one per aggregate root
- Fixed seed value for determinism: `new Faker(seed: 12345)`
- Invoked via CLI: `seed-test` command — runs locally and in pull request / staging pipelines

```
Company.App.Data.Schema/
  Seeding/
    DataSeeder.cs
    ProviderSeeder.cs
```

## CLI tooling

Every repo includes a CLI project (`Company.App.Cli`) for dev operations, seeding, migrations, and tooling.

- **`System.CommandLine`** — command routing (Microsoft-supplied)
- **`Spectre.Console`** — output formatting, prompts, progress (explicit third-party exception)

Structure commands as feature folders matching the domain: `Commands/Db/Deploy/`, `Commands/Storage/Seed/`, etc.

## Local repo setup

Every new repository should include:

- **`.claude/`** — Claude Code skills and context. Add a `CLAUDE.md` at the repo root with project-specific context (stack, conventions, key file paths).
- **Git hooks** — pre-commit hook for linting/formatting, commit-msg hook for conventional commit format. Wire via `.githooks/` with `git config core.hooksPath .githooks` in onboarding steps.

## Ownership & boundaries

When reviewing or designing any module boundary, ask: does the team that owns this code match the boundary being drawn? Flag when:
- A single team is being asked to own something that crosses a natural domain seam
- A boundary is drawn for technical reasons when the org doesn't reflect it
- Ownership is ambiguous — call it out before designing further

Don't use jargon to describe this — just say plainly who owns what and whether it makes sense.
