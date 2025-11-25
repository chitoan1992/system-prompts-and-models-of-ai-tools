# Tool Selection

Choose the right tool for each task. Prefer specialized tools over general ones.

## Tool Hierarchy

### For File Operations
| Task | Preferred Tool | Avoid |
|------|---------------|-------|
| Read file | `read_file` | `bash cat` |
| Search content | `grep` / `search` | `bash grep` |
| Find files | `glob` / `find_files` | `bash find` |
| Edit file | `edit` / `str_replace` | `bash sed` |
| Write file | `write_file` | `bash echo >` |

### For Information Gathering
| Task | Preferred Tool | Avoid |
|------|---------------|-------|
| Semantic search | `codebase_search` | Multiple greps |
| List directory | `list_files` | `bash ls` |
| Find definitions | `find_definitions` | Manual search |

## Selection Criteria

1. **Specificity**: Use the most specific tool available
2. **Safety**: Prefer tools with built-in safety checks
3. **Efficiency**: Choose tools that minimize round trips
4. **Reliability**: Prefer tools designed for the task

## Thinking Process

Before calling a tool, verify:
```
1. What information do I need?
2. What tool is designed for this?
3. Do I have all required parameters?
4. Can this be combined with other calls?
```

## Required Parameters

Never guess required parameters. If a parameter is:
- **Provided by user**: Use exactly as given
- **Inferable from context**: Use the inferred value
- **Unknown/Ambiguous**: Ask the user

## Forbidden Patterns

- ❌ Using bash for file operations when specialized tools exist
- ❌ Guessing file paths without verification
- ❌ Calling tools with placeholder parameters
- ❌ Using `cat` to read files
