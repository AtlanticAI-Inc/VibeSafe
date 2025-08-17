# 🔒 Security Coding Guidelines

## Overview

These security coding guidelines provide comprehensive rules and best practices for writing secure code across different programming languages and frameworks. Following these guidelines helps prevent common vulnerabilities and builds security into your applications from the ground up.

## 📋 General Security Principles

### 1. Defense in Depth
- Implement multiple layers of security controls
- Don't rely on a single security mechanism
- Plan for component failures

### 2. Principle of Least Privilege
- Grant minimum necessary permissions
- Regularly review and audit access levels
- Use role-based access control where possible

### 3. Fail Securely
- Ensure failures don't expose sensitive information
- Implement secure error handling
- Default to deny access when in doubt

### 4. Input Validation
- Validate all input from untrusted sources
- Use whitelist validation over blacklist
- Sanitize input before processing

### 5. Secure by Default
- Use secure default configurations
- Opt-in to less secure options, not opt-out
- Make the secure choice the easy choice

## 🚫 Critical Security Rules

### Rule 1: Never Trust User Input

**❌ Bad Example:**
```javascript
// Direct SQL query with user input
const query = `SELECT * FROM users WHERE id = ${userId}`;
db.execute(query);

// Dangerous command execution
const command = `ls ${userDirectory}`;
exec(command);
```

**✅ Good Example:**
```javascript
// Parameterized query
const query = 'SELECT * FROM users WHERE id = ?';
db.execute(query, [userId]);

// Input validation and sanitization
const sanitizedDir = path.resolve(userDirectory);
if (!sanitizedDir.startsWith('/safe/directory/')) {
    throw new Error('Invalid directory');
}
```

### Rule 2: Implement Strong Authentication

**❌ Bad Example:**
```javascript
// Weak password hashing
const hashedPassword = md5(password);

// Insecure session management
const sessionId = Math.random().toString();
```

**✅ Good Example:**
```javascript
// Strong password hashing with salt
const bcrypt = require('bcrypt');
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Secure session management
const crypto = require('crypto');
const sessionId = crypto.randomBytes(32).toString('hex');
```

### Rule 3: Protect Sensitive Data

**❌ Bad Example:**
```javascript
// Logging sensitive data
console.log(`User ${username} logged in with password ${password}`);

// Storing secrets in code
const apiKey = 'sk_live_abc123def456';
```

**✅ Good Example:**
```javascript
// Safe logging without sensitive data
console.log(`User ${username} logged in successfully`);

// Environment variable for secrets
const apiKey = process.env.STRIPE_API_KEY;
if (!apiKey) {
    throw new Error('Missing required API key');
}
```

### Rule 4: Validate and Sanitize All Inputs

**❌ Bad Example:**
```python
# Direct insertion without validation
html = f"<div>Hello {user_name}</div>"

# No input validation
age = int(request.form['age'])
```

**✅ Good Example:**
```python
import html
import re

# HTML escaping
html = f"<div>Hello {html.escape(user_name)}</div>"

# Input validation
age_str = request.form.get('age', '')
if not re.match(r'^\d{1,3}$', age_str):
    raise ValueError('Invalid age format')
age = int(age_str)
if age < 0 or age > 150:
    raise ValueError('Age out of valid range')
```

## 🔐 Language-Specific Guidelines

### JavaScript/Node.js Security

#### Dependency Management
```json
{
  "scripts": {
    "audit": "npm audit",
    "audit-fix": "npm audit fix"
  }
}
```

#### Secure HTTP Headers
```javascript
const helmet = require('helmet');
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"]
        }
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }
}));
```

#### Environment Configuration
```javascript
// Use environment variables for configuration
const config = {
    port: process.env.PORT || 3000,
    dbUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    nodeEnv: process.env.NODE_ENV || 'development'
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
});
```

### Python Security

#### Input Validation
```python
import re
from typing import Optional

def validate_email(email: str) -> bool:
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

def sanitize_filename(filename: str) -> Optional[str]:
    # Remove path traversal attempts
    filename = filename.replace('..', '').replace('/', '').replace('\\', '')
    
    # Allow only alphanumeric, dash, underscore, and dot
    if re.match(r'^[a-zA-Z0-9._-]+$', filename):
        return filename
    return None
```

#### Secure Database Operations
```python
import sqlite3
from typing import List, Tuple

def get_user_safely(user_id: int) -> Optional[Tuple]:
    """Secure database query with parameterization"""
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        # Parameterized query prevents SQL injection
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        return cursor.fetchone()

def update_user_email(user_id: int, email: str) -> bool:
    """Secure update with input validation"""
    if not validate_email(email):
        raise ValueError("Invalid email format")
    
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE users SET email = ? WHERE id = ?", 
            (email, user_id)
        )
        conn.commit()
        return cursor.rowcount > 0
```

### Java Security

#### Input Validation and Sanitization
```java
import java.util.regex.Pattern;
import org.apache.commons.validator.routines.EmailValidator;
import org.owasp.encoder.Encode;

public class InputValidator {
    private static final Pattern ALPHANUMERIC_PATTERN = 
        Pattern.compile("^[a-zA-Z0-9]+$");
    
    public static boolean isValidUsername(String username) {
        return username != null && 
               username.length() >= 3 && 
               username.length() <= 50 && 
               ALPHANUMERIC_PATTERN.matcher(username).matches();
    }
    
    public static boolean isValidEmail(String email) {
        return EmailValidator.getInstance().isValid(email);
    }
    
    public static String sanitizeForHtml(String input) {
        return Encode.forHtml(input);
    }
}
```

#### Secure Database Access
```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAO {
    public User getUserById(int userId) throws SQLException {
        String sql = "SELECT id, username, email FROM users WHERE id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new User(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("email")
                    );
                }
            }
        }
        return null;
    }
}
```

## 🔒 Authentication and Authorization

### Strong Password Requirements

```javascript
function validatePassword(password) {
    const requirements = {
        minLength: 12,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        disallowCommonPasswords: true
    };
    
    const errors = [];
    
    if (password.length < requirements.minLength) {
        errors.push(`Password must be at least ${requirements.minLength} characters`);
    }
    
    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requirements.requireNumbers && !/\d/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    
    if (requirements.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    
    // Check against common passwords list
    if (requirements.disallowCommonPasswords && COMMON_PASSWORDS.includes(password.toLowerCase())) {
        errors.push('Password is too common');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
```

### Secure Session Management

```javascript
const session = require('express-session');
const MongoStore = require('connect-mongo');

app.use(session({
    name: 'sessionId', // Don't use default session name
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // HTTPS only in production
        httpOnly: true, // Prevent XSS
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
        sameSite: 'strict' // CSRF protection
    }
}));
```

### JSON Web Token (JWT) Security

```javascript
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function generateTokens(userId) {
    const payload = {
        userId: userId,
        type: 'access'
    };
    
    const accessToken = jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET,
        { 
            expiresIn: '15m',
            issuer: 'your-app-name',
            audience: 'your-app-users'
        }
    );
    
    const refreshToken = crypto.randomBytes(40).toString('hex');
    
    return { accessToken, refreshToken };
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
            issuer: 'your-app-name',
            audience: 'your-app-users'
        });
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}
```

## 🛡️ Data Protection

### Encryption at Rest

```javascript
const crypto = require('crypto');

class DataEncryption {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.key = crypto.scryptSync(process.env.ENCRYPTION_KEY, 'salt', 32);
    }
    
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(this.algorithm, this.key);
        cipher.setAAD(Buffer.from('additional-data'));
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        const authTag = cipher.getAuthTag();
        
        return {
            encrypted,
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex')
        };
    }
    
    decrypt(encryptedData) {
        const decipher = crypto.createDecipher(this.algorithm, this.key);
        decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'));
        decipher.setAAD(Buffer.from('additional-data'));
        
        let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    }
}
```

### Secure File Upload

```javascript
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
    // Allowed file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
    
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type'), false);
    }
    
    // Check file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    if (!allowedExtensions.includes(fileExtension)) {
        return cb(new Error('Invalid file extension'), false);
    }
    
    cb(null, true);
};

const upload = multer({
    dest: './uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 5 // Maximum 5 files
    },
    fileFilter: fileFilter
});
```

## 🔍 Error Handling and Logging

### Secure Error Handling

```javascript
// Global error handler middleware
function errorHandler(err, req, res, next) {
    // Log full error details for debugging
    console.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        url: req.url,
        method: req.method,
        userAgent: req.get('User-Agent'),
        timestamp: new Date().toISOString()
    });
    
    // Don't expose sensitive information to users
    let message = 'An error occurred';
    let statusCode = 500;
    
    if (err.name === 'ValidationError') {
        message = 'Invalid input provided';
        statusCode = 400;
    } else if (err.name === 'UnauthorizedError') {
        message = 'Authentication required';
        statusCode = 401;
    } else if (err.name === 'ForbiddenError') {
        message = 'Access denied';
        statusCode = 403;
    }
    
    res.status(statusCode).json({
        error: {
            message: message,
            code: statusCode
        }
    });
}
```

### Secure Logging Practices

```javascript
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    defaultMeta: { service: 'your-app-name' },
    transports: [
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5
        }),
        new winston.transports.File({ 
            filename: 'combined.log',
            maxsize: 5242880, // 5MB
            maxFiles: 10
        })
    ]
});

// Safe logging function that filters sensitive data
function secureLog(level, message, metadata = {}) {
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    const safeMeta = { ...metadata };
    
    // Remove sensitive fields
    sensitiveFields.forEach(field => {
        if (safeMeta[field]) {
            safeMeta[field] = '[REDACTED]';
        }
    });
    
    logger.log(level, message, safeMeta);
}
```

## 🌐 Web Application Security

### Content Security Policy (CSP)

```javascript
const cspDirectives = {
    defaultSrc: ["'self'"],
    scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Avoid this in production
        "https://cdnjs.cloudflare.com"
    ],
    styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com"
    ],
    fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
    ],
    imgSrc: [
        "'self'",
        "data:",
        "https:"
    ],
    connectSrc: [
        "'self'",
        "https://api.yourservice.com"
    ],
    frameSrc: ["'none'"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    childSrc: ["'none'"]
};
```

### CSRF Protection

```javascript
const csrf = require('csurf');

// CSRF protection middleware
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
});

app.use(csrfProtection);

// Provide CSRF token to frontend
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});
```

### Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

// General rate limiting
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP',
    standardHeaders: true,
    legacyHeaders: false
});

// Strict rate limiting for authentication endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 login attempts per windowMs
    message: 'Too many authentication attempts',
    skipSuccessfulRequests: true
});

app.use(generalLimiter);
app.use('/auth', authLimiter);
```

## 🗄️ Database Security

### SQL Injection Prevention

```sql
-- ❌ BAD: Dynamic SQL construction
DECLARE @sql NVARCHAR(MAX)
SET @sql = 'SELECT * FROM Users WHERE Username = ''' + @Username + ''''
EXEC sp_executesql @sql

-- ✅ GOOD: Parameterized query
SELECT * FROM Users WHERE Username = @Username
```

### Database Connection Security

```javascript
const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('ca-cert.pem'),
        cert: fs.readFileSync('client-cert.pem'),
        key: fs.readFileSync('client-key.pem')
    },
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000
};

const pool = mysql.createPool(dbConfig);
```

## 🔧 Security Testing Integration

### Unit Test Security Helpers

```javascript
const request = require('supertest');

describe('Security Tests', () => {
    test('Should reject SQL injection attempts', async () => {
        const maliciousInput = "'; DROP TABLE users; --";
        
        const response = await request(app)
            .post('/api/users/search')
            .send({ query: maliciousInput })
            .expect(400);
            
        expect(response.body.error).toContain('Invalid input');
    });
    
    test('Should require authentication for protected endpoints', async () => {
        await request(app)
            .get('/api/user/profile')
            .expect(401);
    });
    
    test('Should sanitize HTML input', async () => {
        const xssInput = '<script>alert("xss")</script>';
        
        const response = await request(app)
            .post('/api/comments')
            .send({ content: xssInput })
            .set('Authorization', 'Bearer ' + validToken)
            .expect(200);
            
        expect(response.body.content).not.toContain('<script>');
    });
});
```

## 📋 Security Checklist

### Pre-Development Checklist
- [ ] Security requirements identified and documented
- [ ] Threat model created and reviewed
- [ ] Security architecture design completed
- [ ] Security coding standards established

### During Development Checklist
- [ ] Input validation implemented for all user inputs
- [ ] Output encoding applied where necessary
- [ ] Authentication and authorization mechanisms in place
- [ ] Sensitive data encryption implemented
- [ ] Error handling configured to not leak information
- [ ] Security logging implemented
- [ ] Dependencies regularly updated and audited

### Pre-Deployment Checklist
- [ ] Security code review completed
- [ ] Automated security tests passing
- [ ] Penetration testing performed
- [ ] Security configuration review completed
- [ ] Incident response plan in place
- [ ] Security monitoring configured

### Post-Deployment Checklist
- [ ] Security monitoring alerts configured
- [ ] Regular security assessments scheduled
- [ ] Dependency update process in place
- [ ] Security incident response procedures tested
- [ ] Security training completed for team members

## 🚨 Common Security Anti-Patterns to Avoid

### 1. Security Through Obscurity
```javascript
// ❌ DON'T: Hide security through obscurity
const SECRET_ADMIN_URL = '/x7k9m2p4/admin';

// ✅ DO: Implement proper authentication
app.use('/admin', authenticateUser, authorizeAdmin);
```

### 2. Client-Side Security
```javascript
// ❌ DON'T: Rely on client-side validation only
function clientSideValidation(input) {
    if (input.includes('admin')) {
        return false;
    }
    return true;
}

// ✅ DO: Always validate on the server side
function serverSideValidation(input) {
    if (typeof input !== 'string' || input.length > 100) {
        throw new Error('Invalid input');
    }
    // Additional validation logic
}
```

### 3. Hardcoded Secrets
```javascript
// ❌ DON'T: Hardcode sensitive values
const apiKey = 'sk_live_abc123xyz789';

// ✅ DO: Use environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('Missing required API key');
}
```

## 📚 Additional Resources

### Security Tools and Libraries
- **Input Validation**: joi, express-validator, yup
- **Authentication**: passport.js, jsonwebtoken
- **Security Headers**: helmet.js
- **Rate Limiting**: express-rate-limit
- **CSRF Protection**: csurf
- **Encryption**: bcrypt, crypto

### Security References
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [CWE/SANS Top 25](https://www.sans.org/top25-software-errors/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

**Remember: Security is not a one-time implementation but an ongoing process. Regularly review and update these guidelines as new threats emerge and best practices evolve.**
