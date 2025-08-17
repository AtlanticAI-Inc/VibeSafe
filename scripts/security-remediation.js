#!/usr/bin/env node

/**
 * VibeSafe Security Remediation Tool
 * Automatically fixes security issues identified by VibeSafe CLI
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SecurityRemediator {
  constructor(resultsFile = 'vibesafe-results.json') {
    this.resultsFile = resultsFile;
    this.results = null;
    this.fixLog = [];
    this.backupDir = '.security-backups';
  }

  async init() {
    console.log('🛠️  VibeSafe Security Remediation Tool');
    console.log('=====================================\n');

    if (!fs.existsSync(this.resultsFile)) {
      console.error(`❌ Results file not found: ${this.resultsFile}`);
      console.log('Run VibeSafe scan first: vibesafe scan -o vibesafe-results.json');
      process.exit(1);
    }

    try {
      this.results = JSON.parse(fs.readFileSync(this.resultsFile, 'utf8'));
      console.log('✅ Loaded VibeSafe results successfully\n');
    } catch (error) {
      console.error('❌ Failed to parse results file:', error.message);
      process.exit(1);
    }

    // Create backup directory
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir);
    }
  }

  createBackup(filePath) {
    if (fs.existsSync(filePath)) {
      const backupPath = path.join(this.backupDir, `${path.basename(filePath)}.backup.${Date.now()}`);
      fs.copyFileSync(filePath, backupPath);
      console.log(`📋 Backed up: ${filePath} → ${backupPath}`);
      return backupPath;
    }
    return null;
  }

  // Fix gitignore warnings
  fixGitignoreIssues() {
    const issues = this.results.gitignoreWarnings || [];
    if (issues.length === 0) return;

    console.log('🔧 Fixing .gitignore issues...');
    
    const gitignorePath = '.gitignore';
    let gitignoreContent = '';
    
    if (fs.existsSync(gitignorePath)) {
      this.createBackup(gitignorePath);
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    let modified = false;
    const additionalPatterns = [];

    issues.forEach(issue => {
      if (issue.message && issue.message.includes('*.env')) {
        if (!gitignoreContent.includes('*.env') && !gitignoreContent.includes('.env*')) {
          additionalPatterns.push('# Environment files', '*.env', '.env*', '!/.env.example');
          modified = true;
        }
      }
      
      if (issue.message && issue.message.includes('*.log')) {
        if (!gitignoreContent.includes('*.log')) {
          additionalPatterns.push('# Log files', '*.log', 'logs/', 'npm-debug.log*');
          modified = true;
        }
      }

      if (issue.message && issue.message.includes('node_modules')) {
        if (!gitignoreContent.includes('node_modules/')) {
          additionalPatterns.push('# Dependencies', 'node_modules/');
          modified = true;
        }
      }
    });

    if (modified) {
      const newContent = gitignoreContent + '\n\n# Added by VibeSafe Security Remediation\n' + additionalPatterns.join('\n') + '\n';
      fs.writeFileSync(gitignorePath, newContent);
      this.fixLog.push(`✅ Updated .gitignore with ${additionalPatterns.length} new patterns`);
      console.log('✅ Fixed .gitignore security patterns');
    }
  }

  // Fix configuration issues
  fixConfigurationIssues() {
    const issues = this.results.configuration || [];
    if (issues.length === 0) return;

    console.log('🔧 Fixing configuration issues...');

    issues.forEach(issue => {
      // Fix CORS issues
      if (issue.message && issue.message.includes('CORS')) {
        this.fixCORSIssues(issue);
      }

      // Fix debug mode issues
      if (issue.message && issue.message.includes('debug')) {
        this.fixDebugModeIssues(issue);
      }
    });
  }

  fixCORSIssues(issue) {
    const commonConfigFiles = [
      'src/server.js', 'src/app.js', 'server.js', 'app.js',
      'src/index.js', 'index.js', 'src/server.ts', 'src/app.ts'
    ];

    commonConfigFiles.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace permissive CORS with more secure options
        if (content.includes("'*'") || content.includes('"*"')) {
          this.createBackup(filePath);
          
          // Replace wildcard CORS with environment-based configuration
          content = content.replace(
            /origin:\s*['"][*]['"]/, 
            'origin: process.env.ALLOWED_ORIGINS?.split(\',\') || [\'http://localhost:3000\']'
          );
          
          fs.writeFileSync(filePath, content);
          this.fixLog.push(`✅ Fixed CORS configuration in ${filePath}`);
          console.log(`✅ Fixed CORS wildcard in ${filePath}`);
        }
      }
    });
  }

  fixDebugModeIssues(issue) {
    const packageJsonPath = 'package.json';
    if (fs.existsSync(packageJsonPath)) {
      this.createBackup(packageJsonPath);
      
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Add production-safe scripts
      if (!pkg.scripts) pkg.scripts = {};
      
      if (!pkg.scripts['start:prod']) {
        pkg.scripts['start:prod'] = 'NODE_ENV=production node src/index.js';
      }
      
      // Add security-focused dependencies
      if (!pkg.dependencies) pkg.dependencies = {};
      if (!pkg.dependencies.helmet) {
        pkg.dependencies.helmet = '^7.0.0';
      }
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
      this.fixLog.push('✅ Added production scripts and security dependencies');
      console.log('✅ Updated package.json with production configurations');
    }
  }

  // Create security environment template
  createSecurityEnvironmentTemplate() {
    const envExamplePath = '.env.example';
    const issues = this.results.info || [];
    
    let hasEnvIssues = issues.some(issue => 
      issue.message && issue.message.includes('Environment') || 
      issue.message && issue.message.includes('.env')
    );

    if (hasEnvIssues || this.results.secrets?.length > 0) {
      console.log('🔧 Creating secure environment template...');
      
      const envTemplate = `# VibeSafe Security Environment Template
# Copy this file to .env and configure with your actual values

# Application
NODE_ENV=development
PORT=3000

# Security
ALLOWED_ORIGINS=http://localhost:3000
SESSION_SECRET=your-session-secret-here
JWT_SECRET=your-jwt-secret-here

# Database (if applicable)
# DATABASE_URL=your-database-url-here

# API Keys (if applicable)
# API_KEY=your-api-key-here

# Note: Never commit .env files to version control
# Always use environment variables in production
`;

      fs.writeFileSync(envExamplePath, envTemplate);
      this.fixLog.push('✅ Created .env.example template with security best practices');
      console.log('✅ Created secure environment template');
    }
  }

  // Generate security documentation
  generateSecurityFixDocumentation() {
    console.log('📝 Generating security remediation documentation...');
    
    const secretsCount = this.results.secrets?.length || 0;
    const configCount = this.results.configuration?.length || 0;
    
    const documentation = `# Security Remediation Report

Generated: ${new Date().toISOString()}
VibeSafe Results File: ${this.resultsFile}

## Summary

Total Issues Found: ${secretsCount + configCount + (this.results.info?.length || 0) + (this.results.gitignoreWarnings?.length || 0)}
- 🔐 Secrets: ${secretsCount}
- ⚙️ Configuration: ${configCount}
- ℹ️ Information: ${this.results.info?.length || 0}
- ⚠️ Gitignore: ${this.results.gitignoreWarnings?.length || 0}

## Automated Fixes Applied

${this.fixLog.map(fix => `- ${fix}`).join('\n')}

## Manual Remediation Required

### Secrets (${secretsCount} found)
${secretsCount > 0 ? `
**Action Required:**
1. Review all detected secrets in the VibeSafe report
2. Remove hardcoded secrets from source code
3. Replace with environment variables
4. Rotate any exposed credentials
5. Use the provided .env.example template

**Commands to help:**
\`\`\`bash
# Find and review secrets
grep -r "password\\|secret\\|key" src/ --exclude-dir=node_modules
# Use environment variables instead
echo "API_KEY=\${API_KEY}" >> .env
\`\`\`
` : '✅ No secrets detected'}

### Configuration Issues
${configCount > 0 ? `
**Remaining Actions:**
1. Review CORS policies for production
2. Ensure debug modes are disabled in production
3. Implement proper error handling
4. Add security headers (helmet.js)
` : '✅ No configuration issues detected'}

## Security Best Practices

1. **Environment Variables**: Use .env files for secrets (never commit them)
2. **CORS Policy**: Restrict origins to known domains
3. **Security Headers**: Implement helmet.js or equivalent
4. **Input Validation**: Validate all user inputs
5. **Dependencies**: Keep dependencies updated
6. **Monitoring**: Set up security monitoring

## Next Steps

1. Run \`npm install\` if package.json was modified
2. Review and test all automated changes
3. Address manual remediation items
4. Run VibeSafe scan again to verify fixes
5. Consider implementing additional security measures

## Useful Commands

\`\`\`bash
# Re-scan after fixes
vibesafe scan -o vibesafe-results-after-fix.json

# Install new security dependencies
npm install

# Check for updated vulnerabilities
npm audit

# Start in production mode
npm run start:prod
\`\`\`
`;

    fs.writeFileSync('SECURITY-REMEDIATION-REPORT.md', documentation);
    console.log('✅ Generated detailed remediation documentation');
    return documentation;
  }

  async runRemediation() {
    await this.init();

    console.log('🔍 Analyzing security issues for automatic remediation...\n');

    // Count issues
    const totalIssues = Object.keys(this.results).reduce((sum, key) => {
      return sum + (Array.isArray(this.results[key]) ? this.results[key].length : 0);
    }, 0);

    console.log(`Found ${totalIssues} total security issues to address\n`);

    // Apply fixes
    this.fixGitignoreIssues();
    this.fixConfigurationIssues();
    this.createSecurityEnvironmentTemplate();

    // Generate documentation
    const report = this.generateSecurityFixDocumentation();

    console.log('\n🎉 Security Remediation Complete!');
    console.log('===============================');
    console.log(`✅ Applied ${this.fixLog.length} automated fixes`);
    console.log(`📝 Generated remediation report: SECURITY-REMEDIATION-REPORT.md`);
    console.log(`📋 Backups stored in: ${this.backupDir}/`);
    
    if (this.results.secrets?.length > 0) {
      console.log('\n⚠️  MANUAL ACTION REQUIRED:');
      console.log(`   ${this.results.secrets.length} secrets detected - review and remove manually`);
      console.log('   Check SECURITY-REMEDIATION-REPORT.md for detailed instructions');
    }

    console.log('\n🔄 Run VibeSafe scan again to verify fixes:');
    console.log('   vibesafe scan -o vibesafe-results-after-fix.json\n');
  }
}

// CLI execution
if (require.main === module) {
  const resultsFile = process.argv[2] || 'vibesafe-results.json';
  const remediator = new SecurityRemediator(resultsFile);
  
  remediator.runRemediation().catch(error => {
    console.error('❌ Remediation failed:', error.message);
    process.exit(1);
  });
}

module.exports = SecurityRemediator;
