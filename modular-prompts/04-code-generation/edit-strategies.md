# Edit Strategies

Choose the right editing approach based on the scope of changes.

## Three-Tier Edit System

### Tier 1: Micro Edits (str_replace / search_replace)
**Use for**: Small, targeted changes in existing files

```
Scenarios:
- Rename a variable
- Fix a typo
- Change a single value
- Add/remove an import
- Modify one function
```

**Rules**:
- Must read file first to get exact content
- Match whitespace and indentation exactly
- Include enough context for unique match

### Tier 2: Partial Edits (edit with markers)
**Use for**: Adding or modifying sections while preserving structure

```
Scenarios:
- Add a new function to existing file
- Modify a component's render method
- Update a configuration section
```

**Pattern**:
```typescript
// ... existing imports ...

// NEW: Added validation function
function validateInput(data) {
  // new code here
}

// ... existing code ...
```

### Tier 3: Full Write (write_file)
**Use for**: New files or complete rewrites

```
Scenarios:
- Creating new files
- Restructuring entire file
- Changes affect >50% of file
- Boilerplate/template generation
```

## Decision Flowchart

```
Is this a new file?
├── Yes → write_file
└── No → How much changes?
    ├── <10 lines → str_replace
    ├── 10-50% of file → edit with markers
    └── >50% of file → write_file
```

## Critical Rules

1. **Always read before edit** - Never edit a file you haven't read
2. **Preserve unchanged code** - Don't rewrite code that doesn't need changes
3. **Match existing style** - Follow the file's existing formatting conventions
4. **Verify after edit** - Confirm the edit was applied correctly

## Anti-Patterns

- ❌ Rewriting entire file for a one-line change
- ❌ Using diff without reading file first
- ❌ Guessing file contents
- ❌ Ignoring existing code style
