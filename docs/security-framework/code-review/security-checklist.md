# Security Code Review Checklist

## Overview
This checklist should be used for all code reviews involving security-sensitive changes or new features. Print this out or keep it open during code reviews.

---

## 🔐 **Authentication & Authorization**

### ✅ Authentication
- [ ] Are credentials properly validated?
- [ ] Is password hashing using strong algorithms (bcrypt, Argon2, PBKDF2)?
- [ ] Are session tokens generated securely and with sufficient entropy?
- [ ] Is multi-factor authentication implemented where appropriate?
- [ ] Are login attempts properly rate-limited?
- [ ] Is account lockout implemented after failed attempts?
- [ ] Are passwords never stored in plaintext or logs?

### ✅ Authorization
- [ ] Is proper authorization checked for each endpoint/function?
- [ ] Are authorization checks performed on the server side?
- [ ] Is the principle of least privilege followed?
- [ ] Are role-based access controls properly implemented?
- [ ] Is authorization checked before any data access or modification?
- [ ] Are admin/privileged functions properly protected?

---

## 🛡️ **Input Validation & Sanitization**

### ✅ Input Validation
- [ ] Are all inputs validated on both client and server side?
- [ ] Is input validation performed using allowlists rather than denylists?
- [ ] Are file uploads properly validated (type, size, content)?
- [ ] Is user input properly escaped for the output context (HTML, SQL, etc.)?
- [ ] Are APIs protected against mass assignment vulnerabilities?
- [ ] Is input length validated to prevent buffer overflows?

### ✅ SQL Injection Prevention
- [ ] Are parameterized queries/prepared statements used?
- [ ] Is dynamic SQL construction avoided?
- [ ] Are stored procedures using parameters correctly?
- [ ] Is input properly escaped for database context?

### ✅ Cross-Site Scripting (XSS) Prevention
- [ ] Is user output properly escaped for HTML context?
- [ ] Are Content Security Policy (CSP) headers implemented?
- [ ] Is innerHTML usage avoided or properly sanitized?
- [ ] Are user-controlled URLs validated?

---

## 🔒 **Data Protection**

### ✅ Sensitive Data Handling
- [ ] Is sensitive data encrypted at rest?
- [ ] Is sensitive data encrypted in transit (HTTPS/TLS)?
- [ ] Are database connections encrypted?
- [ ] Is sensitive data never logged or exposed in error messages?
- [ ] Are API keys and secrets stored securely (not hardcoded)?
- [ ] Is Personal Identifiable Information (PII) properly handled?

### ✅ Cryptography
- [ ] Are strong cryptographic algorithms used (AES-256, RSA-2048+)?
- [ ] Are cryptographic keys generated with sufficient randomness?
- [ ] Are keys properly rotated and managed?
- [ ] Is deprecated/weak cryptography avoided (MD5, SHA1, RC4)?
- [ ] Are salts used for password hashing?

---

## 🌐 **Network Security**

### ✅ HTTPS/TLS
- [ ] Is HTTPS enforced for all communications?
- [ ] Are HTTP redirects to HTTPS implemented?
- [ ] Is HSTS (HTTP Strict Transport Security) enabled?
- [ ] Are secure cipher suites configured?
- [ ] Is certificate pinning implemented where appropriate?

### ✅ API Security
- [ ] Is proper authentication required for API access?
- [ ] Are API endpoints protected against enumeration attacks?
- [ ] Is rate limiting implemented on APIs?
- [ ] Are API responses free of sensitive information leakage?
- [ ] Is CORS properly configured (not wildcard '*' in production)?

---

## ⚙️ **Configuration & Dependencies**

### ✅ Security Configuration
- [ ] Are debug modes disabled in production?
- [ ] Are default credentials changed?
- [ ] Are unnecessary services/features disabled?
- [ ] Are security headers properly configured?
- [ ] Is logging configured to capture security events?
- [ ] Are error messages generic (not revealing internal details)?

### ✅ Dependencies
- [ ] Are all dependencies up to date?
- [ ] Are known vulnerable dependencies avoided?
- [ ] Is dependency scanning performed regularly?
- [ ] Are only necessary dependencies included?

---

## 🔍 **Code Quality & Logic**

### ✅ Error Handling
- [ ] Are errors handled gracefully without exposing sensitive information?
- [ ] Are exceptions caught and handled appropriately?
- [ ] Is error logging implemented without exposing sensitive data?
- [ ] Are user-facing error messages generic and helpful?

### ✅ Business Logic
- [ ] Are business rules properly enforced on the server side?
- [ ] Is the application logic resistant to race conditions?
- [ ] Are financial calculations and transactions properly validated?
- [ ] Is workflow integrity maintained?

### ✅ Session Management
- [ ] Are session IDs generated with sufficient randomness?
- [ ] Is session data stored securely?
- [ ] Do sessions expire appropriately?
- [ ] Is logout functionality properly implemented?
- [ ] Are concurrent sessions handled correctly?

---

## 🏗️ **Infrastructure & Deployment**

### ✅ Container Security (if applicable)
- [ ] Are container images scanned for vulnerabilities?
- [ ] Are containers running as non-root users?
- [ ] Are secrets properly managed (not in container images)?
- [ ] Are resource limits properly configured?

### ✅ Cloud Security (if applicable)
- [ ] Are IAM permissions following least privilege?
- [ ] Are cloud storage buckets properly secured?
- [ ] Are network security groups properly configured?
- [ ] Is data residency and compliance considered?

---

## 📝 **Documentation & Testing**

### ✅ Security Testing
- [ ] Are unit tests covering security scenarios?
- [ ] Is penetration testing performed for critical changes?
- [ ] Are security test cases documented?
- [ ] Is automated security scanning integrated?

### ✅ Documentation
- [ ] Are security considerations documented?
- [ ] Is the threat model updated if necessary?
- [ ] Are deployment security requirements documented?
- [ ] Is incident response updated for new components?

---

## ⚠️ **Red Flags to Watch For**

### 🚨 Immediate Review Required
- [ ] Direct SQL query construction with user input
- [ ] Hardcoded passwords, API keys, or secrets
- [ ] Use of eval() or similar dynamic code execution
- [ ] Disabled security features or validations
- [ ] Execution of user-provided code/scripts
- [ ] Administrative functions without proper authorization
- [ ] Cryptographic operations with weak algorithms
- [ ] File system access with user-controlled paths
- [ ] Network requests to user-controlled URLs
- [ ] Serialization/deserialization of untrusted data

---

## 📋 **Review Sign-off**

**Reviewer:** _________________  
**Date:** _________________  
**Security Risk Level:** 🟢 Low / 🟡 Medium / 🟠 High / 🔴 Critical  

**Additional Security Notes:**
_____________________________________________________________________
_____________________________________________________________________
_____________________________________________________________________

**Security Approval:** ✅ Approved / ❌ Needs Changes / ⚠️ Conditional Approval

---

## 🛠️ **Automated Tools Checklist**

Before manual review, ensure these automated tools have been run:

- [ ] Static Application Security Testing (SAST) - CodeQL, SonarQube, etc.
- [ ] Dependency vulnerability scanning - npm audit, safety, etc.
- [ ] VibeSafe security scan
- [ ] Container vulnerability scanning (if applicable)
- [ ] Infrastructure as Code security scanning (if applicable)
- [ ] Secrets scanning - GitGuardian, TruffleHog, etc.

**Tool Results:** All passed ✅ / Issues found (see details) ⚠️

---

*This checklist should be customized based on your specific technology stack and security requirements.*
