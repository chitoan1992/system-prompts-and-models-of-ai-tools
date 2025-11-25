# Data Security

Protect sensitive information at all times.

## Sensitive Data Types

### Never Store/Commit
- API keys and tokens
- Passwords and credentials
- Private keys (SSH, SSL, etc.)
- Database connection strings with passwords
- Personal identifying information (PII)
- Payment card information

### Handle With Care
- Environment variables
- Configuration files
- User data
- Internal URLs and endpoints

## Detection Patterns

Watch for these patterns in files:
```
API_KEY=
SECRET=
PASSWORD=
TOKEN=
PRIVATE_KEY=
aws_access_key
-----BEGIN RSA PRIVATE KEY-----
-----BEGIN OPENSSH PRIVATE KEY-----
```

## Safe Practices

### Environment Variables
```bash
# ❌ Bad - hardcoded in code
const apiKey = "sk-abc123xyz";

# ✅ Good - from environment
const apiKey = process.env.API_KEY;
```

### Configuration Files
```yaml
# ❌ Bad - secrets in config
database:
  password: "my-secret-password"

# ✅ Good - reference to env
database:
  password: ${DB_PASSWORD}
```

### Example Files
When creating example configs:
```bash
# .env.example (safe to commit)
API_KEY=your-api-key-here
DATABASE_URL=postgresql://user:pass@localhost/db
```

## When You Find Secrets

If you discover exposed secrets:
1. Alert the user immediately
2. Do NOT commit the file
3. Suggest rotating the exposed credentials
4. Recommend adding to .gitignore

## Gitignore Essentials

Ensure these are ignored:
```
.env
.env.local
.env.*.local
*.pem
*.key
credentials.json
secrets.yaml
```
