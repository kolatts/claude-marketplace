# Architecture Principles Reference

Detailed reference for `sunny:architecture`. Read this when the SKILL.md summary isn't enough.

## Module boundaries

A module boundary is right when:
- It can be deployed independently (even if it isn't yet)
- It can be tested independently
- One team can own it without coordinating on internals with another team
- The domain concept it encapsulates is coherent (not just convenient)

A boundary is wrong when:
- Two teams regularly need to touch the same files
- The module name is a technical layer ("Services", "Repositories") not a domain concept
- The only reason it's separate is historical accident

## Cross-module communication

Preference order:
1. **HTTP API** — clean contract, versioned, independently deployable
2. **Queue / storage** — when decoupling > latency (Azure Storage Queue in Azure, SQS in AWS)
3. **Direct DB access** — only for internal tools or last-resort reporting; never cross-schema writes

Never: shared in-memory state, direct method calls across module boundaries in a way that creates tight coupling, or shared mutable singletons across modules.

## EF Core pattern

No repository pattern. Extension methods on `IQueryable<TEntity>` that project to `IQueryable<TModel>`. Compose in controllers. Defer filtering/sorting to the last moment.

```csharp
// Good
var results = _db.LicenseSources
    .FilterByState(filter.State)
    .ProjectToListModel()
    .Skip(filter.Offset)
    .Take(filter.Count);

// Bad — repository wrapping EF for no reason
var results = _licenseSourceRepository.GetByState(filter.State);
```

## Service-to-microservice transition

Extract a module to a service when:
- It needs to scale independently (load profile is distinct from the rest)
- Conway's law demands it (a separate team now owns it)
- Deployment cadence needs to be independent (e.g. a third-party integration that changes frequently)

Do NOT extract because:
- "It might need to scale someday"
- "It feels like it should be separate"
- The team is small and communication overhead is low

## NuGet policy

1. Can you write it yourself in <100 lines? Do it.
2. Is there a Microsoft-supplied package? Use it (`System.Text.Json`, `HttpClient`, `Microsoft.Extensions.Caching.Memory`, etc.).
3. Is there a significant feature advantage in a third-party package that solves the actual problem? Offer it as an option. Always check the license (MIT / Apache 2.0 preferred; LGPL / GPL flags; commercial licenses require explicit approval).
4. For tests: xunit, Reqnroll, Playwright, Moq/NSubstitute are all acceptable.

## Blazor state management

State lives in services, not components.

- **Simple:** Singleton service with private `List<T>` fields + `IMemoryCache` for cache-aside
- **No Fluxor** — the indirection cost isn't worth it at this scale
- **No cascading parameters** for state — use DI
- Component parameters are fine for display-only data passed from a parent

Example (from `sources-blazor-poc`):
```
Features/LicenseSources/Services/LicenseSourceService.cs
  - private List<ConsoleLicenseSourceModel>? _cachedItems;
  - GetAllLicenseSourcesAsync() returns cached list or fetches+caches
  - Mutation methods null out _cachedItems to invalidate
```

## Testing

- **Pre-deployment:** xunit + Reqnroll (BDD). Feature files drive business scenarios.
- **Post-deployment:** Playwright in .NET. Page Model abstraction above Step Definitions. Extension methods for common UI interactions (MudBlazor/Telerik dropdowns).
- Project names: `Tests.PreDeployment`, `Tests.PostDeployment` (not `UnitTests`, `IntegrationTests`).
- Mocking: **Impostor** (not NSubstitute or Moq).
