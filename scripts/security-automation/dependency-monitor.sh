#!/bin/bash
# VibeSafe Dependency Security Monitor
# Monitors dependencies for security vulnerabilities and outdated packages

set -e

# Configuration
PROJECTS_DIR="${1:-$(pwd)}"
REPORTS_DIR="${HOME}/vibesafe-reports/dependency-reports"
DATE=$(date +%Y%m%d-%H%M%S)
SECURITY_REPORT="$REPORTS_DIR/dependency-security-$DATE.md"
SLACK_WEBHOOK="${SLACK_SECURITY_WEBHOOK:-}" # Set this environment variable for Slack notifications

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔍 VibeSafe Dependency Security Monitor${NC}"
echo -e "${BLUE}=======================================${NC}"

# Create reports directory
mkdir -p "$REPORTS_DIR"

# Initialize report
cat > "$SECURITY_REPORT" << EOF
# VibeSafe Dependency Security Report - $(date)

## Executive Summary

Generated: $(date)  
Scanned Directory: $PROJECTS_DIR  
Scanner: VibeSafe Dependency Monitor + Multiple Tools  

## Security Analysis

EOF

total_vulnerabilities=0
total_outdated=0
critical_vulns=0
high_vulns=0
projects_scanned=0

# Function to check Python dependencies
check_python_deps() {
    local project_dir="$1"
    local project_name="$2"
    
    echo -e "${BLUE}🐍 Checking Python dependencies for $project_name${NC}"
    
    if [[ -f "$project_dir/pyproject.toml" ]] || [[ -f "$project_dir/requirements.txt" ]] || [[ -f "$project_dir/poetry.lock" ]]; then
        cd "$project_dir"
        
        # Use safety for vulnerability scanning
        if command -v safety >/dev/null 2>&1; then
            echo "  Running safety security scan..."
            if safety check --json > safety_report.json 2>/dev/null; then
                vulns=$(jq length safety_report.json 2>/dev/null || echo "0")
                if [[ $vulns -gt 0 ]]; then
                    echo -e "  ${RED}⚠️ Found $vulns vulnerabilities${NC}"
                    total_vulnerabilities=$((total_vulnerabilities + vulns))
                    
                    # Count critical/high severity
                    critical=$(jq '[.[] | select(.vulnerability_id | test("critical"; "i"))] | length' safety_report.json 2>/dev/null || echo "0")
                    high=$(jq '[.[] | select(.vulnerability_id | test("high"; "i"))] | length' safety_report.json 2>/dev/null || echo "0")
                    critical_vulns=$((critical_vulns + critical))
                    high_vulns=$((high_vulns + high))
                    
                    # Add to report
                    cat >> "$SECURITY_REPORT" << EOF
### 🐍 $project_name (Python)
- **Vulnerabilities Found**: $vulns
- **Critical**: $critical
- **High**: $high
- **Details**: See safety_report.json
- **Status**: ❌ Action Required

EOF
                else
                    echo -e "  ${GREEN}✅ No vulnerabilities found${NC}"
                    cat >> "$SECURITY_REPORT" << EOF
### 🐍 $project_name (Python)
- **Vulnerabilities Found**: 0
- **Status**: ✅ Secure

EOF
                fi
                rm -f safety_report.json
            fi
        else
            echo -e "  ${YELLOW}⚠️ Safety not installed. Install with: pip install safety${NC}"
            cat >> "$SECURITY_REPORT" << EOF
### 🐍 $project_name (Python)
- **Status**: ⚠️ Could not scan (safety not installed)
- **Recommendation**: Install safety: \`pip install safety\`

EOF
        fi
        
        # Check for outdated packages
        if command -v pip >/dev/null 2>&1; then
            echo "  Checking for outdated packages..."
            outdated_count=$(pip list --outdated --format=json 2>/dev/null | jq length || echo "0")
            total_outdated=$((total_outdated + outdated_count))
            if [[ $outdated_count -gt 0 ]]; then
                echo -e "  ${YELLOW}📦 $outdated_count packages are outdated${NC}"
            fi
        fi
    fi
}

# Function to check Node.js dependencies
check_nodejs_deps() {
    local project_dir="$1"
    local project_name="$2"
    
    echo -e "${BLUE}📦 Checking Node.js dependencies for $project_name${NC}"
    
    if [[ -f "$project_dir/package.json" ]]; then
        cd "$project_dir"
        
        # Use npm audit
        echo "  Running npm audit..."
        if npm audit --audit-level=moderate --json > npm_audit.json 2>/dev/null; then
            vulns=$(jq -r '.metadata.vulnerabilities.total // 0' npm_audit.json 2>/dev/null || echo "0")
            critical=$(jq -r '.metadata.vulnerabilities.critical // 0' npm_audit.json 2>/dev/null || echo "0")
            high=$(jq -r '.metadata.vulnerabilities.high // 0' npm_audit.json 2>/dev/null || echo "0")
            
            total_vulnerabilities=$((total_vulnerabilities + vulns))
            critical_vulns=$((critical_vulns + critical))
            high_vulns=$((high_vulns + high))
            
            if [[ $vulns -gt 0 ]]; then
                echo -e "  ${RED}⚠️ Found $vulns npm vulnerabilities${NC}"
                cat >> "$SECURITY_REPORT" << EOF
### 📦 $project_name (Node.js)
- **Vulnerabilities Found**: $vulns
- **Critical**: $critical
- **High**: $high
- **Status**: ❌ Action Required
- **Fix Command**: \`npm audit fix\`

EOF
            else
                echo -e "  ${GREEN}✅ No npm vulnerabilities found${NC}"
                cat >> "$SECURITY_REPORT" << EOF
### 📦 $project_name (Node.js)
- **Vulnerabilities Found**: 0
- **Status**: ✅ Secure

EOF
            fi
            rm -f npm_audit.json
        fi
        
        # Check for outdated packages
        echo "  Checking for outdated packages..."
        if npm outdated --json > outdated.json 2>/dev/null; then
            outdated_count=$(jq -r 'keys | length' outdated.json 2>/dev/null || echo "0")
            total_outdated=$((total_outdated + outdated_count))
            if [[ $outdated_count -gt 0 ]]; then
                echo -e "  ${YELLOW}📦 $outdated_count npm packages are outdated${NC}"
            fi
            rm -f outdated.json
        fi
        
        # Run VibeSafe as additional security check
        echo "  Running VibeSafe security scan..."
        if command -v vibesafe >/dev/null 2>&1; then
            if vibesafe scan --high-only > /dev/null 2>&1; then
                echo -e "  ${GREEN}✅ VibeSafe scan passed${NC}"
            else
                echo -e "  ${YELLOW}⚠️ VibeSafe found security issues${NC}"
                cat >> "$SECURITY_REPORT" << EOF
- **Additional**: VibeSafe detected security issues
- **Recommendation**: Run \`vibesafe scan -r report.md\` for details

EOF
            fi
        else
            echo -e "  ${YELLOW}⚠️ VibeSafe not installed. Install with: npm install -g vibesafe${NC}"
        fi
    fi
}

# Scan each project
echo -e "${YELLOW}📁 Scanning projects in: $PROJECTS_DIR${NC}"
echo ""

for project_dir in "$PROJECTS_DIR"*/; do
    if [ -d "$project_dir" ]; then
        project_name=$(basename "$project_dir")
        projects_scanned=$((projects_scanned + 1))
        
        echo -e "${BLUE}🔍 Scanning: $project_name${NC}"
        
        # Skip hidden and non-project directories
        if [[ "$project_name" == .* ]] || [[ "$project_name" == "node_modules" ]]; then
            continue
        fi
        
        # Check Python dependencies
        if [[ -f "$project_dir/pyproject.toml" ]] || [[ -f "$project_dir/requirements.txt" ]] || [[ -f "$project_dir/poetry.lock" ]]; then
            check_python_deps "$project_dir" "$project_name"
        fi
        
        # Check Node.js dependencies
        if [[ -f "$project_dir/package.json" ]]; then
            check_nodejs_deps "$project_dir" "$project_name"
        fi
        
        echo ""
    fi
done

# Add summary to report
cat >> "$SECURITY_REPORT" << EOF

## Summary Statistics

- **Projects Scanned**: $projects_scanned
- **Total Vulnerabilities**: $total_vulnerabilities
- **Critical Vulnerabilities**: $critical_vulns
- **High Vulnerabilities**: $high_vulns
- **Total Outdated Packages**: $total_outdated

## Risk Assessment

EOF

if [[ $critical_vulns -gt 0 ]]; then
    risk_level="🔴 CRITICAL"
    cat >> "$SECURITY_REPORT" << EOF
**Risk Level**: $risk_level

**Immediate Actions Required**:
1. Address all critical vulnerabilities within 24 hours
2. Review and update security patches immediately
3. Consider emergency deployment if fixes are available
EOF
elif [[ $high_vulns -gt 0 ]]; then
    risk_level="🟠 HIGH"
    cat >> "$SECURITY_REPORT" << EOF
**Risk Level**: $risk_level

**Actions Required**:
1. Address high vulnerabilities within 1 week
2. Schedule dependency updates
3. Review security patches and test updates
EOF
elif [[ $total_vulnerabilities -gt 0 ]]; then
    risk_level="🟡 MEDIUM"
    cat >> "$SECURITY_REPORT" << EOF
**Risk Level**: $risk_level

**Actions Required**:
1. Address vulnerabilities within 2 weeks
2. Regular dependency maintenance required
3. Monitor for security updates
EOF
else
    risk_level="🟢 LOW"
    cat >> "$SECURITY_REPORT" << EOF
**Risk Level**: $risk_level

**Status**: All scanned dependencies appear secure
**Recommendation**: Continue regular monitoring and updates
EOF
fi

# Print summary
echo -e "${BLUE}📊 VibeSafe Dependency Security Summary${NC}"
echo -e "${BLUE}=======================================${NC}"
echo -e "Projects scanned: ${YELLOW}$projects_scanned${NC}"
echo -e "Total vulnerabilities: ${RED}$total_vulnerabilities${NC}"
echo -e "Critical vulnerabilities: ${RED}$critical_vulns${NC}"
echo -e "High vulnerabilities: ${RED}$high_vulns${NC}"
echo -e "Outdated packages: ${YELLOW}$total_outdated${NC}"
echo -e "Risk Level: $risk_level"
echo ""
echo -e "${GREEN}📄 Security report saved: $SECURITY_REPORT${NC}"

# Send Slack notification if webhook is configured
if [[ -n "$SLACK_WEBHOOK" ]] && [[ $total_vulnerabilities -gt 0 ]]; then
    curl -X POST -H 'Content-type: application/json' \
        --data "{\"text\":\"🚨 VibeSafe Security Alert: Found $total_vulnerabilities vulnerabilities ($critical_vulns critical, $high_vulns high) across $projects_scanned projects. Risk Level: $risk_level\"}" \
        "$SLACK_WEBHOOK" || echo "Failed to send Slack notification"
fi

# Open report if on macOS
if [[ "$OSTYPE" == "darwin"* ]] && command -v open >/dev/null 2>&1; then
    echo -e "${BLUE}Opening security report...${NC}"
    open "$SECURITY_REPORT"
fi

# Exit with appropriate code
if [[ $critical_vulns -gt 0 ]]; then
    echo -e "${RED}❌ Critical vulnerabilities found!${NC}"
    exit 2
elif [[ $total_vulnerabilities -gt 0 ]]; then
    echo -e "${YELLOW}⚠️ Vulnerabilities found!${NC}"
    exit 1
else
    echo -e "${GREEN}✅ No vulnerabilities detected!${NC}"
    exit 0
fi
