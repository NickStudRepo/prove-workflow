# Good and Bad Tests

## Good Tests

Integration-style testing focuses on real interfaces rather than mocking internal components:

```typescript
test("user can checkout with valid cart", async () => {
  const cart = createCart();
  cart.add(product);
  const result = await checkout(cart, paymentMethod);
  expect(result.status).toBe("confirmed");
});
```

Strong tests:
- Test behavior users/callers care about
- Use public API only
- Survive internal refactors
- Describe WHAT, not HOW
- One logical assertion per test

## Bad Tests

Implementation-detail tests create coupling to internal structure:

```typescript
test("checkout calls paymentService.process", async () => {
  const mockPayment = jest.mock(paymentService);
  await checkout(cart, payment);
  expect(mockPayment.process).toHaveBeenCalledWith(cart.total);
});
```

Warning signs:
- Mocking internal collaborators
- Testing private methods
- Asserting on call counts/order
- Test breaks when refactoring without behavior change
- Test names describing implementation rather than outcomes
- Verifying through external means instead of interface

**Poor approach**: Directly querying the database to confirm data persistence
**Better approach**: Using the public interface to retrieve created objects
