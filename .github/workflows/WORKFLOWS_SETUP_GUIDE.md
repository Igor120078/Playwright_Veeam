# GitHub Actions Playwright Workflows - Setup Guide

## Overview

This repository contains two GitHub Actions workflows for running Playwright tests:

1. **playwright-same-repo.yml** - For tests in the same repository as the application
2. **playwright-different-repos.yml** - For tests in a different repository from the application

## Required GitHub Secrets

### Common Secrets (Both Workflows)

Navigate to your repository: **Settings → Secrets and variables → Actions → New repository secret**

#### Application URLs

- `BASE_URL` - Base URL of your application (e.g., `https://app.example.com`)
- `API_URL` - API endpoint URL (e.g., `https://api.example.com`)

#### Authentication Credentials

- `TEST_USERNAME` - Regular test user username
- `TEST_PASSWORD` - Regular test user password
- `ADMIN_USERNAME` - Admin test user username (if needed)
- `ADMIN_PASSWORD` - Admin test user password (if needed)

#### API Credentials

- `API_KEY` - API key for authenticated requests
- `API_SECRET` - API secret token
- `AUTH_TOKEN` - Bearer token or similar

#### Notifications

- `SLACK_WEBHOOK` - Slack webhook URL for notifications (optional)
- `SENDGRID_API_KEY` - SendGrid API key for email notifications (optional)
- `NOTIFICATION_EMAIL` - Email address for test failure notifications (optional)

### Additional Secrets for Different Repos Workflow

#### Repository Access

- `GH_PAT_TOKEN` - Personal Access Token with `repo` scope to access the application repository
  - Create at: https://github.com/settings/tokens
  - Required scopes: `repo`, `workflow`
- `APP_REPO_OWNER` - GitHub username/organization that owns the application repo
- `APP_REPO_NAME` - Name of the application repository

#### Application Infrastructure

- `DATABASE_URL` - Database connection string (if app needs it)
- `REDIS_URL` - Redis connection string (if app needs it)
- `JWT_SECRET` - JWT secret for the application
- `DB_CONNECTION_STRING` - Direct database access for tests (if needed)
- `API_ENDPOINT` - Backend API endpoint

## Environment Variables in Workflows

Both workflows use environment variables that can be customized:

```yaml
env:
  BASE_URL: ${{ secrets.BASE_URL }}
  TEST_USERNAME: ${{ secrets.TEST_USERNAME }}
  ENVIRONMENT: "dev" # or 'staging', 'prod'
  CI: true
  HEADLESS: true
```

## Setting Up Secrets - Step by Step

### 1. For Same Repository Workflow

```bash
# Minimum required secrets:
- BASE_URL
- TEST_USERNAME
- TEST_PASSWORD
- API_KEY
```

### 2. For Different Repositories Workflow

```bash
# All secrets from same-repo workflow, PLUS:
- GH_PAT_TOKEN
- APP_REPO_OWNER
- APP_REPO_NAME
- DATABASE_URL (if application requires it)
```

## Creating GitHub Personal Access Token (PAT)

For the different repos workflow, you need a PAT:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a descriptive name: "Playwright Tests Access"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)
7. Add it to your test repository as `GH_PAT_TOKEN` secret

## Using Environment-Specific Secrets

If you have different environments (dev, staging, prod), you can use GitHub Environments:

1. Go to **Settings → Environments**
2. Create environments: `dev`, `staging`, `prod`
3. Add environment-specific secrets to each

Update your workflow to use environments:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    environment: ${{ github.event.inputs.environment || 'dev' }}
    steps:
      # Your steps here
```

## Triggering Workflows

### Same Repository Workflow

- **Automatic**: Triggers on push/PR to `main` or `develop` branches
- **Manual**: Go to Actions → Playwright Tests - Same Repo → Run workflow

### Different Repositories Workflow

- **Automatic**: Scheduled daily at 2 AM UTC
- **Repository Dispatch**: Triggered from application repo after deployment
- **Manual**: Go to Actions → Playwright Tests - Different Repos → Run workflow

### Triggering from Application Repo

Add this to your application's deployment workflow:

```yaml
- name: Trigger E2E Tests
  run: |
    curl -X POST \
      -H "Accept: application/vnd.github.v3+json" \
      -H "Authorization: token ${{ secrets.GH_PAT_TOKEN }}" \
      https://api.github.com/repos/YOUR_ORG/YOUR_TEST_REPO/dispatches \
      -d '{"event_type":"deployment-completed","client_payload":{"environment":"staging"}}'
```

## Viewing Test Results

After a workflow run:

1. Go to **Actions** tab
2. Click on the workflow run
3. Download artifacts:
   - `playwright-report-*` - HTML test reports
   - `test-results-*` - Raw test results
   - `traces-*` - Playwright traces (on failure)

## Best Practices

1. **Never commit secrets** - Always use GitHub Secrets
2. **Use environment protection rules** for production
3. **Rotate credentials regularly**
4. **Use least-privilege tokens** - Only grant necessary permissions
5. **Enable branch protection** for main/production branches
6. **Review test reports** regularly
7. **Set up notifications** for test failures

## Troubleshooting

### Tests can't access secrets

- Verify secrets are set in the correct repository
- Check secret names match exactly (case-sensitive)
- Ensure workflow has permission to access secrets

### Different repos workflow fails to checkout application

- Verify `GH_PAT_TOKEN` has correct permissions
- Check `APP_REPO_OWNER` and `APP_REPO_NAME` are correct
- Ensure PAT hasn't expired

### Tests fail with "BASE_URL undefined"

- Verify `BASE_URL` secret is set
- Check the secret value is a valid URL with protocol (http:// or https://)

## Example Playwright Config for CI

Update your `playwright.config.ts`:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["html"], ["github"]] : "html",

  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Documentation](https://playwright.dev/docs/ci)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
