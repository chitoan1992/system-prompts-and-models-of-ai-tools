# Context Gathering

Gather context efficiently before taking action.

## Priority Order

1. **Check existing context first** - Don't re-read files already in conversation
2. **Use semantic search** - For understanding concepts and patterns
3. **Use pattern search** - For finding specific strings or syntax
4. **Read individual files** - When you know exactly what you need

## The "Useful Context" Rule

Before reading any file:
1. Check if it's already in the conversation context
2. Check if it was recently read
3. Only read if genuinely needed

## Search Strategies

### For Understanding Code
```
Use semantic/codebase search:
"How does authentication work in this project?"
"Where are API routes defined?"
```

### For Finding Specific Code
```
Use grep/pattern search:
"TODO" - find todos
"function handleSubmit" - find specific function
"import.*axios" - find imports
```

### For Exploring Structure
```
Use list/glob:
"*.tsx" in src/components - find all React components
"**/*.test.ts" - find all tests
```

## Don't Over-Gather

Stop gathering context when you have enough to proceed. Signs you have enough:
- You understand the relevant code structure
- You know where to make changes
- You can explain the current implementation

## Efficient Patterns

```
Good: Read 3 related files in parallel, then act
Bad: Read file 1, think, read file 2, think, read file 3, think, act
```

```
Good: Search once with broad query, read top results
Bad: Multiple narrow searches that could be one broad search
```
