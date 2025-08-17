# Security Coding Guidelines

## 🎯 **Overview**

These security coding guidelines provide developers with practical, actionable security practices to follow during software development. They are designed to prevent common security vulnerabilities and promote secure coding habits.

---

## 🛡️ **Input Validation & Sanitization**

### **Rule 1.1: Validate All Input**
```python
# ✅ GOOD: Comprehensive input validation
def process_user_data(user_input):
    # Validate input type
    if not isinstance(user_input, str):
        raise ValueError("Input must be a string")
    
    # Validate input length
    if len(user_input) > 1000:
        raise ValueError("Input too long")
    
    # Validate input format (allowlist approach)
    if not re.match(r'^[a-zA-Z0-9\s\.,!?-]*$', user_input):
        raise ValueError("Invalid characters in input")
    
    return user_input.strip()

# ❌ BAD: No input validation
def process_user_data(user_input):
    return user_input  # Dangerous!
```

### **Rule 1.2: Use Parameterized Queries**
```python
# ✅ GOOD: Parameterized query
def get_user_by_id(user_id):
    cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
    return cursor.fetchone()

# ❌ BAD: String concatenation (SQL injection vulnerable)
def get_user_by_id(user_id):
    query = f"SELECT * FROM users WHERE id = {user_id}"
    cursor.execute(query)
```

### **Rule 1.3: Escape Output Based on Context**
```python
# ✅ GOOD: Context-specific output encoding
from html import escape
import json
import urllib.parse

def render_user_content(content, context):
    if context == 'html':
        return escape(content)
    elif context == 'json':
        return json.dumps(content)
    elif context == 'url':
        return urllib.parse.quote(content)
    else:
        raise ValueError("Unknown context")
```

---

## 🔐 **Authentication & Authorization**

### **Rule 2.1: Secure Password Handling**
```python
# ✅ GOOD: Secure password hashing
import bcrypt
import secrets

def create_user(username, password):
    # Validate password strength
    if len(password) < 12:
        raise ValueError("Password must be at least 12 characters")
    
    # Hash password with salt
    salt = bcrypt.gensalt(rounds=12)
    password_hash = bcrypt.hashpw(password.encode('utf-8'), salt)
    
    # Store username and hash (never store plain password)
    save_user(username, password_hash.decode('utf-8'))

# ❌ BAD: Storing plaintext password
def create_user(username, password):
    save_user(username, password)  # Never do this!
```

### **Rule 2.2: Implement Proper Session Management**
```python
# ✅ GOOD: Secure session management
import secrets
import time

class SessionManager:
    def __init__(self):
        self.sessions = {}
        self.session_timeout = 3600  # 1 hour
    
    def create_session(self, user_id):
        session_token = secrets.token_urlsafe(32)
        self.sessions[session_token] = {
            'user_id': user_id,
            'created_at': time.time(),
            'last_accessed': time.time()
        }
        return session_token
    
    def validate_session(self, session_token):
        if session_token not in self.sessions:
            return None
        
        session = self.sessions[session_token]
        current_time = time.time()
        
        # Check if session expired
        if current_time - session['created_at'] > self.session_timeout:
            self.destroy_session(session_token)
            return None
        
        # Update last accessed time
        session['last_accessed'] = current_time
        return session['user_id']
```

### **Rule 2.3: Implement Authorization Checks**
```python
# ✅ GOOD: Proper authorization checks
from functools import wraps

def require_permission(permission):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            user = get_current_user()
            if not user:
                raise UnauthorizedError("Authentication required")
            
            if not user.has_permission(permission):
                raise ForbiddenError(f"Permission '{permission}' required")
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@require_permission('delete_user')
def delete_user(user_id):
    # Only users with 'delete_user' permission can execute this
    User.objects.filter(id=user_id).delete()
```

---

## 🔒 **Data Protection & Cryptography**

### **Rule 3.1: Encrypt Sensitive Data**
```python
# ✅ GOOD: Proper encryption implementation
from cryptography.fernet import Fernet
import base64

class DataEncryption:
    def __init__(self, key):
        self.cipher = Fernet(key)
    
    def encrypt_pii(self, data):
        """Encrypt personally identifiable information"""
        if not data:
            return None
        
        encrypted_data = self.cipher.encrypt(data.encode('utf-8'))
        return base64.urlsafe_b64encode(encrypted_data).decode('utf-8')
    
    def decrypt_pii(self, encrypted_data):
        """Decrypt personally identifiable information"""
        if not encrypted_data:
            return None
        
        decoded_data = base64.urlsafe_b64decode(encrypted_data.encode('utf-8'))
        return self.cipher.decrypt(decoded_data).decode('utf-8')

# Usage
encryption = DataEncryption(Fernet.generate_key())
encrypted_ssn = encryption.encrypt_pii("123-45-6789")
```

### **Rule 3.2: Secure Random Number Generation**
```python
# ✅ GOOD: Cryptographically secure random generation
import secrets

def generate_api_key():
    return secrets.token_urlsafe(32)

def generate_reset_token():
    return secrets.token_hex(16)

# ❌ BAD: Using weak random number generator
import random
def generate_api_key():
    return str(random.randint(1000000, 9999999))  # Predictable!
```

---

## 🌐 **Web Security**

### **Rule 4.1: Implement Security Headers**
```python
# ✅ GOOD: Security headers implementation
from flask import Flask, Response

app = Flask(__name__)

@app.after_request
def add_security_headers(response):
    # Prevent clickjacking
    response.headers['X-Frame-Options'] = 'DENY'
    
    # Enable XSS protection
    response.headers['X-XSS-Protection'] = '1; mode=block'
    
    # Prevent MIME type sniffing
    response.headers['X-Content-Type-Options'] = 'nosniff'
    
    # Enforce HTTPS
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    
    # Content Security Policy
    response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self' 'unsafe-inline'"
    
    # Referrer Policy
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    
    return response
```

### **Rule 4.2: Validate File Uploads**
```python
# ✅ GOOD: Secure file upload handling
import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16MB

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def upload_file(file):
    # Check if file is present
    if not file or file.filename == '':
        raise ValueError("No file selected")
    
    # Validate file extension
    if not allowed_file(file.filename):
        raise ValueError("File type not allowed")
    
    # Check file size
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise ValueError("File too large")
    
    # Secure filename
    filename = secure_filename(file.filename)
    
    # Generate unique filename to prevent conflicts
    unique_filename = f"{secrets.token_hex(8)}_{filename}"
    
    # Save to secure directory
    safe_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(safe_path)
    
    return unique_filename
```

---

## 📝 **Error Handling & Logging**

### **Rule 5.1: Secure Error Handling**
```python
# ✅ GOOD: Secure error handling
import logging

logger = logging.getLogger(__name__)

def get_user_profile(user_id):
    try:
        user = User.objects.get(id=user_id)
        return {
            'username': user.username,
            'email': user.email,
            'created_at': user.created_at
        }
    except User.DoesNotExist:
        # Log detailed error for debugging
        logger.warning(f"User not found: {user_id}")
        # Return generic error to client
        raise NotFoundError("User not found")
    except Exception as e:
        # Log detailed error for debugging
        logger.error(f"Unexpected error getting user {user_id}: {str(e)}")
        # Return generic error to client
        raise InternalServerError("An error occurred")

# ❌ BAD: Exposing internal details
def get_user_profile(user_id):
    try:
        user = User.objects.get(id=user_id)
        return user
    except Exception as e:
        # Exposing internal details to client
        raise Exception(f"Database error: {str(e)}")
```

### **Rule 5.2: Security-Focused Logging**
```python
# ✅ GOOD: Security-focused logging
import logging
from datetime import datetime

security_logger = logging.getLogger('security')

class SecurityLogger:
    @staticmethod
    def log_authentication_success(username, ip_address):
        security_logger.info(
            f"Authentication successful - User: {username}, IP: {ip_address}, "
            f"Time: {datetime.utcnow().isoformat()}"
        )
    
    @staticmethod
    def log_authentication_failure(username, ip_address, reason):
        security_logger.warning(
            f"Authentication failed - User: {username}, IP: {ip_address}, "
            f"Reason: {reason}, Time: {datetime.utcnow().isoformat()}"
        )
    
    @staticmethod
    def log_authorization_failure(username, resource, action):
        security_logger.warning(
            f"Authorization denied - User: {username}, Resource: {resource}, "
            f"Action: {action}, Time: {datetime.utcnow().isoformat()}"
        )
    
    @staticmethod
    def log_sensitive_data_access(username, data_type):
        # Note: Don't log the actual sensitive data
        security_logger.info(
            f"Sensitive data accessed - User: {username}, Type: {data_type}, "
            f"Time: {datetime.utcnow().isoformat()}"
        )
```

---

## 🔧 **Configuration & Dependencies**

### **Rule 6.1: Secure Configuration Management**
```python
# ✅ GOOD: Secure configuration
import os
from typing import Optional

class Config:
    def __init__(self):
        # Never hardcode secrets
        self.SECRET_KEY = self._get_required_env('SECRET_KEY')
        self.DATABASE_URL = self._get_required_env('DATABASE_URL')
        self.API_KEY = self._get_required_env('API_KEY')
        
        # Set secure defaults
        self.DEBUG = self._get_env_bool('DEBUG', False)
        self.SESSION_TIMEOUT = int(os.environ.get('SESSION_TIMEOUT', '3600'))
        
        # Validate configuration in production
        if not self.DEBUG:
            self._validate_production_config()
    
    def _get_required_env(self, key: str) -> str:
        value = os.environ.get(key)
        if not value:
            raise ValueError(f"Required environment variable {key} not set")
        return value
    
    def _get_env_bool(self, key: str, default: bool) -> bool:
        value = os.environ.get(key, str(default)).lower()
        return value in ('true', '1', 'yes', 'on')
    
    def _validate_production_config(self):
        if len(self.SECRET_KEY) < 32:
            raise ValueError("SECRET_KEY must be at least 32 characters in production")

# ❌ BAD: Hardcoded secrets
class Config:
    SECRET_KEY = "hardcoded-secret-key"  # Never do this!
    DEBUG = True  # Dangerous in production
```

### **Rule 6.2: Dependency Security**
```python
# ✅ GOOD: Secure dependency management practices

# requirements.txt - Pin specific versions
"""
Django==4.2.7
requests==2.31.0
cryptography==41.0.7
"""

# In your code - validate imported modules
def safe_import(module_name, allowed_modules):
    if module_name not in allowed_modules:
        raise ImportError(f"Module {module_name} not in allowlist")
    return __import__(module_name)

# Regular dependency auditing
def audit_dependencies():
    """Run this regularly to check for vulnerabilities"""
    import subprocess
    result = subprocess.run(['safety', 'check'], capture_output=True, text=True)
    if result.returncode != 0:
        logger.warning(f"Security vulnerabilities found: {result.stdout}")
```

---

## 🧪 **Testing & Validation**

### **Rule 7.1: Security Test Cases**
```python
# ✅ GOOD: Security-focused test cases
import unittest
from unittest.mock import patch

class SecurityTestCase(unittest.TestCase):
    def test_sql_injection_prevention(self):
        """Test that SQL injection attempts are blocked"""
        malicious_input = "'; DROP TABLE users; --"
        
        with self.assertRaises(ValueError):
            validate_user_input(malicious_input, 'username')
    
    def test_xss_prevention(self):
        """Test that XSS attempts are escaped"""
        malicious_script = "<script>alert('xss')</script>"
        escaped_output = escape_html_output(malicious_script)
        
        self.assertNotIn("<script>", escaped_output)
        self.assertIn("&lt;script&gt;", escaped_output)
    
    def test_authentication_brute_force_protection(self):
        """Test that brute force attempts are blocked"""
        # Simulate multiple failed login attempts
        for _ in range(5):
            with self.assertRaises(AuthenticationError):
                authenticate_user("admin", "wrong_password")
        
        # Verify account is locked
        with self.assertRaises(AccountLockedError):
            authenticate_user("admin", "correct_password")
    
    def test_authorization_bypass_prevention(self):
        """Test that authorization cannot be bypassed"""
        unauthorized_user = create_test_user(permissions=[])
        
        with self.assertRaises(ForbiddenError):
            delete_user_function(unauthorized_user, target_user_id=123)
```

---

## 📊 **Security Metrics & Monitoring**

### **Rule 8.1: Implement Security Monitoring**
```python
# ✅ GOOD: Security monitoring implementation
import time
from collections import defaultdict

class SecurityMonitor:
    def __init__(self):
        self.failed_attempts = defaultdict(list)
        self.suspicious_activities = []
    
    def track_failed_login(self, username, ip_address):
        current_time = time.time()
        self.failed_attempts[ip_address].append(current_time)
        
        # Check for brute force (5 attempts in 5 minutes)
        recent_attempts = [
            t for t in self.failed_attempts[ip_address]
            if current_time - t < 300  # 5 minutes
        ]
        
        if len(recent_attempts) >= 5:
            self.report_security_incident({
                'type': 'brute_force_attempt',
                'ip_address': ip_address,
                'username': username,
                'attempt_count': len(recent_attempts),
                'timestamp': current_time
            })
    
    def track_privilege_escalation_attempt(self, user_id, requested_permission):
        incident = {
            'type': 'privilege_escalation_attempt',
            'user_id': user_id,
            'requested_permission': requested_permission,
            'timestamp': time.time()
        }
        self.report_security_incident(incident)
    
    def report_security_incident(self, incident):
        # Log to security log
        security_logger.critical(f"Security incident: {incident}")
        
        # Send alert to security team
        self.send_security_alert(incident)
    
    def send_security_alert(self, incident):
        # Implementation depends on your alerting system
        # Could be email, Slack, PagerDuty, etc.
        pass
```

---

## ✅ **Security Checklist for Code Review**

### **Pre-Commit Checklist**
- [ ] No hardcoded secrets or credentials
- [ ] All user inputs validated and sanitized
- [ ] SQL queries use parameterized statements
- [ ] Authentication and authorization checks present
- [ ] Sensitive data is encrypted
- [ ] Error handling doesn't leak information
- [ ] Security headers implemented
- [ ] File uploads properly validated
- [ ] Logging includes security events
- [ ] Dependencies are up to date

### **Deployment Checklist**
- [ ] Debug mode disabled
- [ ] Security configurations validated
- [ ] SSL/TLS properly configured
- [ ] Environment variables used for secrets
- [ ] Security monitoring enabled
- [ ] Backup and recovery procedures tested
- [ ] Incident response plan updated

---

## 🚫 **Common Security Anti-Patterns to Avoid**

### **❌ Never Do These**

```python
# ❌ Hardcoded secrets
API_KEY = "sk-1234567890abcdef"

# ❌ SQL injection vulnerable code
query = f"SELECT * FROM users WHERE name = '{user_input}'"

# ❌ Weak password validation
if len(password) >= 6:  # Too weak!

# ❌ Storing passwords in plaintext
user.password = request.form['password']

# ❌ Using weak random numbers for security
import random
session_token = str(random.randint(1000, 9999))

# ❌ Exposing sensitive information in errors
except Exception as e:
    return f"Database connection failed: {db_password}"

# ❌ No input validation
def delete_file(filename):
    os.remove(filename)  # Path traversal vulnerable!

# ❌ Weak session management
session_id = user_id  # Predictable session IDs

# ❌ No authorization checks
def admin_function():
    # Anyone can call this!
    delete_all_users()

# ❌ Logging sensitive data
logger.info(f"User {username} logged in with password {password}")
```

---

These guidelines should be integrated into your development process and regularly updated based on emerging threats and security best practices.
