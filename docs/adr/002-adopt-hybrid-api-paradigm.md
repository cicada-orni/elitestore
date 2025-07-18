# ADR-002: Adopt a Hybrid API Paradigm (REST & GraphQL)

**Date:** 2025-07-17
**Status:** Accepted

## Context

The EliteStore application requires a robust and performant strategy for client-server communication. The frontend needs to fetch data for various scenarios, from simple, single-resource requests (like getting user profile data) to complex, multi-resource data aggregation for rich UI components (like a product detail page that includes the product, its variants, its reviews, and the seller's information).

Choosing a single API paradigm (either REST or GraphQL) for the entire application would force us into trade-offs that are not optimal for all use cases.

- A pure **REST** approach would lead to **under-fetching** and the "N+1 problem" for our complex UI pages, requiring multiple network round trips and increasing perceived latency.
- A pure **GraphQL** approach might introduce unnecessary complexity and boilerplate for simple CRUD (Create, Read, Update, Delete) operations that are already handled cleanly and efficiently by Next.js Server Actions, which follow RESTful principles.

The core architectural problem is to select an API strategy that provides maximum performance and developer efficiency for each specific part of our application, without being dogmatic.

## Decision

We will adopt a **hybrid API paradigm**. This is a deliberate choice to use the right tool for the right job, leveraging the strengths of both REST-like patterns and GraphQL within the same application.

1.  **REST-like Server Actions for Mutations:** For all data mutation operations (Create, Update, Delete), we will use **Next.js Server Actions**. Server Actions provide a simple, secure, and co-located RPC (Remote Procedure Call) mechanism that follows the principles of REST. They are ideal for straightforward tasks like logging in, updating a user profile, or submitting a form.

2.  **GraphQL for Complex Queries:** For complex, read-heavy data requirements, we will implement a dedicated **GraphQL API**. This API will be the primary interface for fetching nested data for our rich UI components, such as the Product Detail Page, category listings, and the main dashboard. This allows the client to request exactly the data it needs in a single network call, eliminating under-fetching and dramatically improving frontend performance.

This hybrid model gives us the transactional simplicity and security of Server Actions for our writes, and the unparalleled query efficiency and flexibility of GraphQL for our reads.

## Consequences

### Positive:

- **Optimal Performance:** Each part of the application uses the most performant data-fetching mechanism for its specific needs. Complex views load faster due to GraphQL, while simple actions remain lightweight.
- **Improved Developer Experience:** Frontend developers can use GraphQL to query for the exact data they need without waiting for backend changes. Backend development for mutations remains simple and secure with Server Actions.
- **Architectural Clarity:** This decision establishes a clear rule: use GraphQL for complex reads (`Queries`) and Server Actions for writes (`Mutations`). This clarity prevents confusion and ensures consistency as the application grows.
- **Future-Proofing:** This hybrid approach is highly extensible. If a new, complex data-reading feature is needed, it can be added to the GraphQL schema. If a new simple form is needed, it can be implemented with a Server Action without touching the GraphQL layer.

### Negative:

- **Increased Initial Complexity:** We will need to maintain the infrastructure and tooling for two API paradigms (the GraphQL server and the set of Server Actions). This includes schema definition, resolvers, and potentially different client-side libraries.
- **Learning Curve:** Developers on the team will need to be proficient in both RESTful principles (for Server Actions) and GraphQL.
- **Potential for Inconsistency:** There is a minor risk that business logic could be duplicated or become inconsistent between the two paradigms if not managed with discipline. This will be mitigated by using shared utility functions and a clear separation of concerns.
