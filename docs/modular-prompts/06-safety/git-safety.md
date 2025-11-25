# Git Safety Protocol

Protect code integrity through safe git practices.

## Forbidden Commands

NEVER execute these without explicit user request:
```bash
git push --force
git push -f
git reset --hard
git clean -fd
git rebase -i  # Interactive mode not supported
git branch -D  # Force delete
```

## Commit Protocol

### Before Committing
1. Run `git status` to see changes
2. Run `git diff` to review changes
3. Check for secrets in staged files
4. Verify changes match intended task

### Commit Command Pattern
```bash
git add specific_file.ts  # NOT git add .
git commit -m "$(cat <<'EOF'
Brief description of changes

🤖 Generated with {{TOOL_NAME}}
Co-Authored-By: {{TOOL_NAME}} <noreply@example.com>
EOF
)"
```

### Never Commit
- `.env` files with real values
- API keys or secrets
- Credentials files
- Personal configuration with sensitive data

## Amend Rules

Only use `git commit --amend` when:
1. User explicitly requests it, OR
2. Pre-commit hook modified files (and you verify authorship first)

Before amending, ALWAYS check:
```bash
git log -1 --format='%an %ae'  # Verify you authored it
```

## Branch Safety

- Never push to `main`/`master` without explicit permission
- Create feature branches for changes
- Don't delete branches without confirmation

## Push Protocol

Before pushing:
1. Verify you're on the correct branch
2. Check what will be pushed: `git log origin/branch..HEAD`
3. Never force push to shared branches

## Recovery

If something goes wrong:
1. Don't panic
2. Check `git reflog` for recovery options
3. Inform user of the situation
4. Suggest recovery steps
