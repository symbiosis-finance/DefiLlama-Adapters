# Escalation Report — Vulnerabilities Without Clean Fix Paths

**Date:** 2026-05-21

The following packages cannot be patched by bumping a manifest entry alone.
Overrides would mechanically resolve them but were NOT applied automatically.
Review each item and decide whether to apply the suggested override.

---

## Item 1 — ws (MODERATE)

| Field | Value |
|-------|-------|
| Package | `ws@8.18.0` |
| Severity | MODERATE |
| Advisory IDs | GHSA-58qx-3vcg-4xpx |
| Dep path | unknown |
| Why no clean fix | Could not trace to a direct manifest ancestor |
| Override recipe | `overrides.ws = "8.20.1"` |

- **GHSA-58qx-3vcg-4xpx**: ws: Uninitialized memory disclosure

---

## Decision Required

For the items above, the only mechanical fix is an override.
Reply with package names or advisory IDs to override, or 'none' to leave them unresolved.
