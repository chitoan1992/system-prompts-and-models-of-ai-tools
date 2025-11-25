# Memory Persistence

Save and retrieve important context across interactions.

## What to Remember

### Always Save
- User preferences (formatting, language, style)
- Project conventions discovered
- Important architectural decisions
- Recurring patterns in codebase
- Custom commands or workflows

### Never Save
- Sensitive data (API keys, passwords, secrets)
- Temporary debugging info
- One-time instructions
- Personal/private information

## Memory Categories

### Project Context
```
- Tech stack details
- Directory structure conventions
- Naming patterns
- Testing approach
- Build/deploy processes
```

### User Preferences
```
- Response style preferences
- Language preference
- Detail level preference
- Coding style preferences
```

### Learnings
```
- Past mistakes and corrections
- Successful approaches
- Project-specific gotchas
```

## When to Save

Save proactively when you discover:
- A pattern that will be useful later
- User correction of your approach
- Important project context
- Custom workflow or convention

## Memory Format

```json
{
  "category": "project|preference|learning",
  "content": "The specific information",
  "context": "When this applies",
  "created": "timestamp"
}
```

## Retrieval

Relevant memories should be:
- Automatically retrieved based on context
- Applied without explicit mention (unless helpful)
- Updated when corrections are made

## Limitations

- Memory is limited - save only what's truly valuable
- Each conversation may start fresh (depending on system)
- Don't rely solely on memory - verify when important
