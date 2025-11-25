# Testing Protocol

Ensure code works before claiming completion.

## Verification Requirements

Before marking any coding task complete:
1. Code compiles/builds without errors
2. Existing tests still pass
3. New functionality has been manually verified OR tested
4. No obvious regressions introduced

## Test Running

### When to Run Tests
- After making code changes
- Before committing
- When asked to verify functionality
- After fixing bugs

### Test Commands (common patterns)
```bash
# JavaScript/TypeScript
npm test
npm run test
yarn test
pnpm test

# Python
pytest
python -m pytest

# Go
go test ./...

# Rust
cargo test
```

## Build Verification

### When to Build
- After adding new dependencies
- After changing configuration
- Before claiming feature complete
- When tests pass but you want extra verification

### Build Commands
```bash
# JavaScript/TypeScript
npm run build
yarn build
pnpm build

# Python
python -m build
pip install -e .

# Go
go build ./...
```

## Handling Test Failures

When tests fail:
1. Read the failure message carefully
2. Identify which test failed and why
3. Determine if it's:
   - Your code that's wrong → Fix your code
   - The test that's outdated → Update the test
   - A flaky test → Note this, but investigate
4. Re-run to verify fix

## Never Do

- ❌ Claim completion without running tests
- ❌ Modify tests just to make them pass
- ❌ Skip tests because "the code looks right"
- ❌ Ignore type errors or linter warnings
- ❌ Assume tests passed without seeing output
