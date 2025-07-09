# ADR 001: Adopt a Normalized Product Variant and Promotions Schema

**Date**: 2025-07-08
**Status**: Accepted

## Context

The EliteStore e-commerce application requires the ability to manage products that have multiple variations (e.g., different sizes, colors) and to support complex, rule-based promotional campaigns. A simplistic, flat schema would lead to significant data duplication, making inventory management difficult and promotion logic extremely complex and error-prone. This would hinder future scalability and maintainability.

## Decision

We will implement a normalized relational database schema. This decision involves creating several distinct but related tables to manage this complexity effectively:

- A `products` table for core, shared product information.
- A `product_variants` table, linked to `products` via a foreign key, to store the unique data for each variation (SKU, attributes, stock).
- A `promotions` table to define marketing campaigns.
- A `promotion_rules` table to declaratively define the specific conditions under which each promotion applies.
- An `ENUM` type `discount_type` to ensure the integrity of promotion data.

## Consequences

### Positive

- **Data Integrity**: Normalization eliminates data redundancy and reduces the risk of inconsistencies. For example, updating a product's name only needs to happen in one place.
- **Extensibility & Maintainability**: The architecture is highly extensible. New product variants can be added without altering existing data. New promotion types can be introduced by adding new rows to the rules table, requiring no changes to application code.
- **Query Flexibility**: The structured schema makes complex queries (e.g., "find all medium-sized red shirts currently in stock") straightforward and performant.

### Negative

- **Increased Schema Complexity**: The initial setup involves more tables and relationships compared to a flat structure, requiring a deeper understanding of the domain.
- **Join Operations Required**: Fetching complete product information will require `JOIN` operations across multiple tables, which adds a minor layer of complexity to some data-fetching queries. This will be mitigated by creating database views or using an API layer to simplify data access for the client.
