# When to Mock

## Mock at System Boundaries Only

- External APIs (payment, email, etc.)
- Databases (sometimes - prefer test DB)
- Time/randomness
- File system (sometimes)

**Never** mock your own classes, internal collaborators, or anything under your control.

## Designing for Mockability

### 1. Use Dependency Injection

Pass external dependencies in rather than creating them internally:

```typescript
// Testable - accepts dependency
function processPayment(order, paymentClient) {}

// Hard to test - creates dependency internally
function processPayment(order) {
  const client = new StripeClient();
}
```

### 2. Prefer SDK-Style Interfaces

Rather than generic fetchers with conditional logic, create specific functions for each external operation:

```typescript
// Good - specific methods, easy to mock individually
const api = {
  getUser(id) {},
  getOrders(userId) {},
  createOrder(data) {},
};

// Bad - generic fetch with conditional logic
function apiFetch(endpoint, options) {}
```

Benefits:
- Individual mocks return one specific data shape
- Test setup avoids conditional logic
- Tests clearly show which endpoints they exercise
- Each endpoint gains type safety
