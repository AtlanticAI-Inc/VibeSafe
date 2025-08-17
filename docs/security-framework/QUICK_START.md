# 🚀 VibeSafe Security Framework - Quick Start

This guide helps you quickly deploy the comprehensive security framework in your VibeSafe repository.

## Prerequisites

- GitHub repository with admin access
- VibeSafe CLI available (npm package)
- Basic understanding of GitHub Actions
- Repository with JavaScript/TypeScript, Python, or similar codebase

## 🔧 Quick Setup (5 minutes)

### 1. Enable GitHub Actions Security Features

```bash
# In your repository settings, enable:
# - Dependency Graph
# - Dependabot alerts
# - Dependabot security updates
# - Code scanning alerts
# - Secret scanning alerts
```

### 2. Deploy the Security Workflow

Copy the comprehensive security workflow to your repository:

```bash
# Create .github/workflows directory if it doesn't exist
mkdir -p .github/workflows

# Copy the security workflow
cp examples/github-workflows/comprehensive-security.yml .github/workflows/

# Commit and push
git add .github/workflows/comprehensive-security.yml
git commit -m "feat: Add comprehensive VibeSafe security scanning workflow"
git push
```

### 3. Configure Repository Settings

#### Branch Protection Rules
1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main` (or your default branch)
3. Enable:
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Status checks: Select "VibeSafe Security Scan"
   - ✅ Require review from security team (if available)
   - ✅ Dismiss stale PR approvals when new commits are pushed

#### Repository Security Settings
1. Go to **Settings** → **Code security and analysis**
2. Enable all available security features:
   - ✅ Dependency graph
   - ✅ Dependabot alerts
   - ✅ Dependabot security updates
   - ✅ Code scanning
   - ✅ Secret scanning

### 4. Setup Dependabot (Optional but Recommended)

Create `.github/dependabot.yml`:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
    reviewers:
      - "security-team"
    labels:
      - "dependencies"
      - "security"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 3
```

## ⚡ Immediate Actions After Setup

### 1. Run Your First Security Scan

The workflow runs automatically on:
- Push to `main` or `develop` branches
- Pull requests to `main`
- Daily at 2 AM UTC (scheduled)

To trigger manually:
1. Go to **Actions** tab in GitHub
2. Select "VibeSafe Comprehensive Security Scanning"
3. Click "Run workflow" → "Run workflow"

### 2. Review Security Scan Results

After the first scan completes:
1. Check the **Actions** tab for workflow results
2. Download artifacts to review detailed reports
3. Check **Security** tab for any code scanning alerts
4. Review any Dependabot alerts in **Security** → **Dependabot alerts**

### 3. Setup Team Notifications (Recommended)

Configure Slack/Teams/Email notifications for security alerts:

```yaml
# Add to your workflow for Slack notifications
- name: Notify Security Team
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: "🚨 Security scan failed! High/Critical issues detected."
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

## 🔍 Understanding Your Security Posture

### Scan Results Interpretation

The workflow generates a risk assessment:

- **🟢 LOW RISK**: No significant issues detected
- **🟡 MEDIUM RISK**: Some issues detected, address within 1 week
- **🟠 HIGH RISK**: Significant issues, address within 24 hours
- **🔴 CRITICAL RISK**: Immediate action required

### Key Metrics to Monitor

1. **VibeSafe Scan Results**: Primary security assessment
2. **Dependency Vulnerabilities**: Outdated/vulnerable packages
3. **Secrets Detection**: Accidentally committed secrets
4. **SAST Findings**: Static code analysis issues
5. **Container Vulnerabilities**: Docker image security (if applicable)

## 🛠️ Customization Options

### Adjust Security Scan Frequency

Edit the cron schedule in the workflow:

```yaml
schedule:
  # Run every day at 2 AM
  - cron: '0 2 * * *'
  
  # Or run weekly on Mondays at 9 AM
  # - cron: '0 9 * * 1'
```

### Configure Failure Thresholds

Modify environment variables in the workflow:

```yaml
env:
  SECURITY_SCAN_ENABLED: true
  FAIL_ON_HIGH_SEVERITY: true      # Set to false to allow high-severity issues
  FAIL_ON_CRITICAL_SEVERITY: true # Always recommended to keep as true
```

### Add Custom Security Tools

Extend the workflow with additional tools:

```yaml
- name: Custom Security Tool
  run: |
    # Install your custom tool
    npm install -g your-security-tool
    
    # Run custom scan
    your-security-tool --scan .
```

## 📊 Monitoring & Reporting

### Weekly Security Review Process

1. **Monday Morning**: Review weekend security scan results
2. **Check Metrics**: Total issues, trend analysis, new vulnerabilities
3. **Priority Triage**: Categorize and assign critical/high issues
4. **Team Standup**: Discuss security posture and blockers

### Monthly Security Assessment

1. Generate comprehensive security report from all scans
2. Review dependency update patterns and effectiveness
3. Assess team security training needs
4. Update security policies and procedures as needed

## 🆘 Troubleshooting

### Common Issues

**Workflow fails on first run:**
- Ensure repository has the necessary files (package.json, etc.)
- Check that VibeSafe CLI is properly configured
- Verify all required GitHub permissions are enabled

**Too many false positives:**
- Review and tune VibeSafe configuration
- Add exceptions for known safe patterns
- Adjust severity thresholds in the workflow

**Workflow takes too long:**
- Consider running scans on a schedule rather than every push
- Exclude test files or build artifacts from scanning
- Parallelize scans across multiple runners

### Getting Help

1. **VibeSafe Issues**: Check the [VibeSafe CLI documentation](https://github.com/vibesafe/cli)
2. **Workflow Issues**: Review GitHub Actions logs and this repository's issues
3. **Security Questions**: Consult your organization's security team

## 🎯 Next Steps

Once you have the basic security framework running:

1. **Review the Training Materials**: See `docs/security-framework/training/`
2. **Implement Code Review Guidelines**: Use the security review checklist
3. **Setup Incident Response**: Review the incident response plan template
4. **Advanced Configuration**: Explore the advanced security configuration guides

---

**🛡️ Security is a journey, not a destination. This framework gives you a solid foundation to build upon!**
