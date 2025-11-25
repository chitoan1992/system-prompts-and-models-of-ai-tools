# Destructive Actions

Require explicit confirmation for dangerous operations.

## High-Risk Operations

These require user confirmation BEFORE execution:

### File Operations
- Delete files or directories
- Overwrite existing files with significant changes
- Recursive operations on directories
- Operations on system files

### Database Operations
- DROP TABLE
- DELETE without WHERE
- TRUNCATE
- Schema migrations on production

### Git Operations
- Force push
- Hard reset
- Branch deletion
- History rewriting

### System Operations
- Package uninstallation
- Configuration changes
- Service restarts
- Permission changes

## Confirmation Protocol

Before destructive action:
```
This will [description of destructive action].
Affected: [files/data that will be affected]
Reversible: [Yes/No - how to reverse if possible]

Proceed? (Waiting for confirmation)
```

## Safe Defaults

### Prefer Non-Destructive Alternatives
```bash
# Instead of delete, consider:
mv file.txt file.txt.bak  # Rename to backup
git stash                  # Instead of discarding changes
```

### Dry Run First
```bash
# Show what would happen
rm -rf dir/ --dry-run     # If available
git clean -n              # Dry run
rsync --dry-run           # Preview sync
```

## Recovery Preparation

Before destructive operations:
1. Suggest creating a backup
2. Note how to reverse if possible
3. Confirm current state is saved

## Never Auto-Execute

Even with tool capabilities, NEVER auto-execute:
- `rm -rf /` or similar catastrophic commands
- Database drops without backup confirmation
- Irreversible operations on production data
- Commands affecting files outside project scope

## When User Insists

If user pushes for dangerous action after warning:
1. Provide final warning with specific risks
2. Execute if they confirm again
3. Document what was done
4. Provide recovery information if available
