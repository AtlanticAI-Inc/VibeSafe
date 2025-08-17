import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Alert,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Link,
  Fab
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Quiz,
  Code,
  Science,
  ExpandMore,
  CheckCircle,
  Cancel,
  Lightbulb,
  Security,
  Warning,
  Info,
  MenuBook,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Assignment,
  Link as LinkIcon,
  School,
  PlayCircle,
  BookmarkBorder,
  NavigateNext,
  NavigateBefore
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import apiService from '../../services/apiService';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const EnhancedLessonPlayer = ({ moduleId, onComplete, onNext, onPrevious }) => {
  const [moduleData, setModuleData] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [quizAttempts, setQuizAttempts] = useState(0);
  const [labCode, setLabCode] = useState('');
  const [labResults, setLabResults] = useState(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarkedPages, setBookmarkedPages] = useState([]);

  // Load module data
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        setLoading(true);
        
        if (moduleId) {
          // Fetch from API
          const response = await apiService.get(`/modules/${moduleId}`);
          setModuleData(response.data);
          
          // Initialize lab code if available
          if (response.data.labExercises?.length > 0) {
            setLabCode(response.data.labExercises[0].solution || '');
          }
        } else {
          // Use demo data for development
          setModuleData(getDemoModuleData());
        }
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load module');
      } finally {
        setLoading(false);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  // Track time spent
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // Demo data for development
  const getDemoModuleData = () => ({
    id: 'demo-xss-module',
    title: 'Cross-Site Scripting (XSS) Fundamentals',
    description: 'Comprehensive guide to understanding and preventing XSS attacks',
    difficulty: 'beginner',
    duration: 90,
    pages: [
      {
        pageNumber: 1,
        title: 'Introduction to XSS',
        type: 'introduction',
        content: `# Cross-Site Scripting (XSS) Overview

Cross-Site Scripting (XSS) is one of the most common web application vulnerabilities, consistently ranking in the OWASP Top 10.

## What is XSS?

XSS occurs when an application includes untrusted data in a web page without proper validation or escaping, allowing attackers to execute malicious scripts in victims' browsers.

## Types of XSS Attacks

1. **Reflected XSS** - Script is reflected off the web server
2. **Stored XSS** - Script is permanently stored on the server  
3. **DOM-based XSS** - Vulnerability exists in client-side code

## Why XSS is Dangerous

- **Session Hijacking**: Stealing authentication cookies
- **Credential Theft**: Capturing login information
- **Data Exfiltration**: Accessing sensitive information
- **Malware Distribution**: Redirecting to malicious sites`,
        keyPoints: [
          'XSS allows execution of malicious scripts in user browsers',
          'Three main types: Reflected, Stored, and DOM-based',
          'Can lead to session hijacking and data theft',
          'Prevention requires proper input validation and output encoding'
        ]
      },
      {
        pageNumber: 2,
        title: 'Reflected XSS Attacks',
        type: 'theory',
        content: `# Reflected XSS in Detail

Reflected XSS occurs when user input is immediately returned by a web application in an error message, search result, or any other response that includes some or all of the input sent to the server.

## How Reflected XSS Works

1. Attacker crafts malicious URL with XSS payload
2. Victim clicks the malicious link
3. Browser sends request to vulnerable server
4. Server reflects the payload in the response
5. Browser executes the malicious script

## Common Attack Vectors

- Search functionality
- Error messages
- Form submissions
- URL parameters

## Example Attack Scenario

A vulnerable search function might display: "No results found for: [user input]"

If the input isn't properly escaped, an attacker could inject:
\`<script>alert('XSS')</script>\``,
        keyPoints: [
          'Reflected XSS requires user interaction (clicking malicious links)',
          'Payload is not stored on the server',
          'Often used for phishing and social engineering',
          'Can be mitigated with proper output encoding'
        ]
      },
      {
        pageNumber: 3,
        title: 'Stored XSS Attacks', 
        type: 'theory',
        content: `# Stored XSS (Persistent XSS)

Stored XSS occurs when user input is stored on the server (in databases, files, or other storage) and later displayed to users without proper sanitization.

## How Stored XSS Works

1. Attacker submits malicious script through web form
2. Application stores the malicious data
3. When other users view the content, the script executes
4. Script runs in context of the trusted website

## High-Risk Areas

- **Comment systems** - User comments on blogs, forums
- **User profiles** - Bio sections, personal information
- **Message boards** - Discussion forums
- **Review systems** - Product or service reviews

## Why Stored XSS is More Dangerous

- **Persistent threat** - Affects all users who view the content
- **No user interaction required** - Executes automatically
- **Wider impact** - Can affect many users simultaneously
- **Harder to detect** - May not trigger immediately`,
        keyPoints: [
          'Stored XSS persists on the server until cleaned up',
          'Affects all users who view the malicious content',
          'More dangerous than reflected XSS due to persistence',
          'Common in user-generated content areas'
        ]
      },
      {
        pageNumber: 4,
        title: 'DOM-based XSS',
        type: 'theory',
        content: `# DOM-based XSS

DOM-based XSS occurs when JavaScript code modifies the DOM based on user input without proper sanitization, and the malicious payload never reaches the server.

## How DOM-based XSS Works

1. Malicious payload is included in URL fragment (#)
2. JavaScript reads the fragment using \`location.hash\`
3. Code unsafely writes to DOM using \`innerHTML\`
4. Browser executes the malicious script

## Dangerous JavaScript Functions

- \`innerHTML\`
- \`outerHTML\`
- \`document.write()\`
- \`eval()\`
- \`setTimeout()\` and \`setInterval()\` with strings

## Safe Alternatives

- Use \`textContent\` instead of \`innerHTML\`
- Use \`createElement()\` and \`appendChild()\`
- Validate and sanitize all user inputs
- Avoid \`eval()\` and similar functions`,
        keyPoints: [
          'DOM-based XSS occurs entirely on the client side',
          'Payload may never reach the server',
          'Common in single-page applications (SPAs)',
          'Prevention requires secure JavaScript coding practices'
        ],
        codeExamples: [
          {
            language: 'javascript',
            code: `// Vulnerable code
function displayWelcome() {
  const name = location.hash.substring(1);
  document.getElementById('welcome').innerHTML = 'Hello ' + name;
}

// Safe version
function displayWelcomeSafe() {
  const name = location.hash.substring(1);
  document.getElementById('welcome').textContent = 'Hello ' + name;
}`,
            description: 'Example of vulnerable vs safe DOM manipulation'
          }
        ]
      },
      {
        pageNumber: 5,
        title: 'XSS Prevention Techniques',
        type: 'theory',
        content: `# Preventing XSS Attacks

Effective XSS prevention requires multiple layers of defense working together.

## 1. Input Validation

- **Validate on the server side** - Never trust client-side validation alone
- **Use whitelist approach** - Define what is allowed, reject everything else
- **Validate data type, length, format, and range**
- **Sanitize user input** before processing

## 2. Output Encoding/Escaping

Context-aware encoding is crucial:

- **HTML Context**: Encode \`<\`, \`>\`, \`&\`, \`"\`, \`'\`
- **JavaScript Context**: Use JavaScript encoding
- **URL Context**: Use URL encoding
- **CSS Context**: Use CSS encoding

## 3. Content Security Policy (CSP)

CSP provides an additional layer of defense:

- Control which resources can be loaded
- Block inline scripts and styles
- Report policy violations
- Gradually implement strict policies

## 4. Use Security Libraries

- **OWASP Java Encoder** - For Java applications
- **Microsoft AntiXSS** - For .NET applications  
- **DOMPurify** - For client-side HTML sanitization`,
        keyPoints: [
          'Defense in depth requires multiple prevention techniques',
          'Context-aware encoding is essential',
          'CSP provides additional protection layer',
          'Use established security libraries when possible'
        ],
        codeExamples: [
          {
            language: 'javascript',
            code: `// HTML encoding function
function htmlEncode(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Using DOMPurify library (recommended)
const cleanHTML = DOMPurify.sanitize(userInput);`,
            description: 'Example encoding and sanitization techniques'
          }
        ]
      },
      {
        pageNumber: 6,
        title: 'Content Security Policy',
        type: 'example',
        content: `# Content Security Policy (CSP) Implementation

CSP is a security feature that helps prevent XSS attacks by controlling which resources can be loaded and executed.

## Basic CSP Directives

- **default-src** - Default policy for all resource types
- **script-src** - Controls JavaScript execution
- **style-src** - Controls CSS loading
- **img-src** - Controls image loading
- **connect-src** - Controls XHR, WebSocket, EventSource

## CSP Implementation Approaches

### 1. HTTP Header
\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'
\`\`\`

### 2. Meta Tag
\`\`\`html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'">
\`\`\`

## CSP Reporting

Monitor violations with the \`report-uri\` directive:
\`\`\`
Content-Security-Policy: default-src 'self'; report-uri /csp-violations
\`\`\``,
        keyPoints: [
          'CSP provides defense-in-depth protection',
          'Start with report-only mode to test policies',
          'Gradually tighten policies based on violation reports',
          'Combine with other XSS prevention techniques'
        ],
        codeExamples: [
          {
            language: 'http',
            code: `// Progressive CSP implementation

// Step 1: Report-only mode
Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' 'unsafe-inline'; report-uri /csp-report

// Step 2: Enforcement with relaxed policy  
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'

// Step 3: Strict policy (goal)
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'`,
            description: 'Progressive CSP implementation strategy'
          }
        ]
      },
      {
        pageNumber: 7,
        title: 'Testing for XSS Vulnerabilities',
        type: 'hands-on',
        content: `# Testing for XSS Vulnerabilities

Effective testing combines automated tools with manual testing techniques.

## Manual Testing Techniques

### Basic Payloads
- \`<script>alert('XSS')</script>\`
- \`'"><script>alert('XSS')</script>\`
- \`javascript:alert('XSS')\`

### Event Handler Payloads
- \`<img src=x onerror=alert('XSS')>\`
- \`<body onload=alert('XSS')>\`
- \`<svg onload=alert('XSS')>\`

### Encoding Bypass Attempts
- \`%3Cscript%3Ealert('XSS')%3C/script%3E\` (URL encoding)
- \`&lt;script&gt;alert('XSS')&lt;/script&gt;\` (HTML encoding)

## Automated Testing Tools

1. **Burp Suite** - Professional web security testing
2. **OWASP ZAP** - Free security testing proxy
3. **XSStrike** - Advanced XSS detection tool
4. **Xenotix XSS Exploit Framework** - XSS payload generator

## Testing Methodology

1. **Identify input points** - Forms, URL parameters, headers
2. **Test each input** with various payloads
3. **Analyze responses** for script execution
4. **Verify exploitability** with proof-of-concept
5. **Document findings** with impact assessment`,
        keyPoints: [
          'Combine manual and automated testing approaches',
          'Test all possible input vectors thoroughly',
          'Use encoding bypass techniques',
          'Document findings with clear impact assessment'
        ]
      },
      {
        pageNumber: 8,
        title: 'Real-World XSS Examples',
        type: 'case-study',
        content: `# Real-World XSS Attack Examples

Learning from actual security incidents helps understand XSS impact and prevention.

## Case Study 1: Twitter XSS Worm (2010)

**The Attack:**
- Stored XSS vulnerability in Twitter's tweet display
- Malicious payload in user's bio section
- Self-propagating worm that retweeted itself

**Impact:**
- Thousands of users infected within minutes
- Service disruption and user trust damage
- Demonstrated rapid XSS worm propagation

**Lessons Learned:**
- User-generated content requires strict filtering
- XSS can enable self-propagating attacks
- Social media platforms are high-value targets

## Case Study 2: MySpace Samy Worm (2005)

**The Attack:**
- CSS-based XSS bypassing script filters
- Added attacker as friend to every profile visited
- Spread to over 1 million users in 20 hours

**Technical Details:**
- Used CSS expressions to execute JavaScript
- Bypassed keyword filters with creative encoding
- Self-replicating through social connections

**Prevention:**
- Comprehensive input filtering beyond just \`<script>\` tags
- CSS input validation and sanitization
- Rate limiting for automated actions`,
        keyPoints: [
          'XSS can enable worm-like self-propagating attacks',
          'Social media platforms amplify XSS impact',
          'Creative bypass techniques can circumvent basic filters',
          'Comprehensive security measures are essential'
        ]
      },
      {
        pageNumber: 9,
        title: 'XSS in Modern Web Applications',
        type: 'theory',
        content: `# XSS in Single Page Applications (SPAs)

Modern web applications using frameworks like React, Angular, and Vue.js have different XSS considerations.

## Framework-Specific Protections

### React
- JSX automatically escapes content by default
- \`dangerouslySetInnerHTML\` requires explicit opt-in
- Server-side rendering considerations

### Angular
- Built-in sanitization for template bindings
- Trusted values must be explicitly marked
- Injectable sanitization service

### Vue.js
- Template interpolation is escaped by default
- \`v-html\` directive bypasses escaping (use carefully)
- Component-based architecture isolation

## Modern XSS Vectors

### Client-Side Template Injection
- Angular/Vue template syntax in user input
- \`{{constructor.constructor('alert(1)')()}}\`
- Server-side template engines vulnerable too

### PostMessage XSS
- Cross-frame communication vulnerabilities
- Untrusted message origins
- Improper data handling in message listeners

### WebSocket XSS
- Real-time data without proper validation
- Binary data containing malicious payloads
- Event-driven XSS through WebSocket messages`,
        keyPoints: [
          'Modern frameworks provide built-in XSS protections',
          'Developer awareness still crucial for security',
          'New attack vectors emerge with new technologies',
          'Defense in depth remains important'
        ]
      },
      {
        pageNumber: 10,
        title: 'Summary and Best Practices',
        type: 'summary',
        content: `# XSS Prevention Summary

## Key Takeaways

1. **XSS Types**: Reflected, Stored, and DOM-based XSS each require specific prevention techniques
2. **Input Validation**: Server-side validation using whitelist approach
3. **Output Encoding**: Context-aware encoding for HTML, JavaScript, URL, and CSS contexts
4. **Content Security Policy**: Additional layer of defense against script injection
5. **Modern Frameworks**: Leverage built-in protections while understanding their limitations

## XSS Prevention Checklist

### Development Phase
- ✅ Implement server-side input validation
- ✅ Use context-appropriate output encoding
- ✅ Deploy Content Security Policy
- ✅ Leverage framework security features
- ✅ Avoid dangerous JavaScript functions

### Testing Phase  
- ✅ Manual testing with various payloads
- ✅ Automated security scanning
- ✅ Code review focusing on user input handling
- ✅ Test encoding bypass techniques
- ✅ Verify CSP effectiveness

### Deployment Phase
- ✅ Monitor CSP violation reports
- ✅ Regular security assessments
- ✅ Keep frameworks and libraries updated
- ✅ Security awareness training for team
- ✅ Incident response plan for XSS discoveries

## Remember: Defense in Depth

No single technique provides complete protection. Combine multiple layers:
- Input validation + Output encoding + CSP + Framework protections = Robust XSS defense`,
        keyPoints: [
          'Multiple XSS types require different prevention strategies',
          'Defense in depth provides the strongest protection',
          'Regular testing and monitoring are essential',
          'Keep security knowledge current with evolving threats'
        ]
      }
    ],
    quiz: {
      questions: [
        {
          question: 'Which type of XSS attack persists on the server and affects all users who view the content?',
          type: 'multiple-choice',
          options: ['Reflected XSS', 'Stored XSS', 'DOM-based XSS', 'Template XSS'],
          correctAnswer: 1,
          explanation: 'Stored XSS (also called Persistent XSS) is stored on the server and affects all users who view the malicious content, making it more dangerous than other types.',
          difficulty: 'easy',
          points: 1
        },
        {
          question: 'Which JavaScript methods are considered dangerous for XSS vulnerabilities? (Select all that apply)',
          type: 'multiple-select',
          options: ['innerHTML', 'textContent', 'eval()', 'appendChild()'],
          correctAnswers: [0, 2],
          explanation: 'innerHTML and eval() can execute malicious scripts. textContent and appendChild() are safer alternatives that don\'t interpret HTML or execute code.',
          difficulty: 'medium',
          points: 2
        },
        {
          question: 'What is the primary purpose of Content Security Policy (CSP)?',
          type: 'multiple-choice',
          options: [
            'To encrypt data in transit',
            'To control which resources can be loaded and executed',
            'To validate user input on the server',
            'To authenticate users'
          ],
          correctAnswer: 1,
          explanation: 'CSP is a security feature that helps prevent XSS attacks by controlling which resources (scripts, styles, images, etc.) can be loaded and executed by the browser.',
          difficulty: 'medium',
          points: 2
        }
      ],
      passingScore: 70,
      timeLimit: 15,
      maxAttempts: 3
    },
    labExercises: [
      {
        title: 'XSS Vulnerability Assessment',
        description: 'Identify and analyze XSS vulnerabilities in the provided code samples.',
        instructions: [
          'Review the vulnerable code examples',
          'Identify the specific XSS vulnerability types',
          'Propose secure coding solutions',
          'Test your understanding with sample payloads'
        ],
        hints: [
          'Look for unsanitized user input being output to the page',
          'Check for dangerous JavaScript functions like innerHTML',
          'Consider both client-side and server-side vulnerabilities',
          'Think about context-specific encoding requirements'
        ]
      }
    ]
  });

  const handlePageNavigation = (direction) => {
    const totalPages = moduleData.pages.length;
    if (direction === 'next' && currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleQuizSubmit = async () => {
    if (!moduleData?.quiz || quizAttempts >= moduleData.quiz.maxAttempts) return;

    const results = moduleData.quiz.questions.map(question => {
      const userAnswer = quizAnswers[question.id] || quizAnswers[question.question];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correctAnswer;
      } else if (question.type === 'multiple-select') {
        isCorrect = Array.isArray(userAnswer) && 
          userAnswer.length === question.correctAnswers.length &&
          userAnswer.every(answer => question.correctAnswers.includes(answer));
      }

      return {
        questionId: question.id || question.question,
        isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer || question.correctAnswers,
        explanation: question.explanation
      };
    });

    const score = Math.round((results.filter(r => r.isCorrect).length / results.length) * 100);
    setQuizResults({ results, score, attempt: quizAttempts + 1 });
    setQuizAttempts(prev => prev + 1);

    // Save progress
    try {
      await apiService.post('/progress/quiz', {
        moduleId,
        score,
        answers: quizAnswers,
        timeSpent: timeSpent / 60
      });
    } catch (error) {
      console.error('Failed to save quiz progress:', error);
    }
  };

  const handleComplete = async () => {
    const finalScore = quizResults?.score || 0;
    
    try {
      await apiService.post('/progress/module', {
        moduleId,
        completed: true,
        score: finalScore,
        totalTimeSpent: timeSpent / 60,
        pagesViewed: currentPageIndex + 1
      });
      
      onComplete?.(finalScore, timeSpent);
    } catch (error) {
      console.error('Failed to save completion progress:', error);
    }
  };

  const toggleBookmark = (pageIndex) => {
    setBookmarkedPages(prev => 
      prev.includes(pageIndex) 
        ? prev.filter(p => p !== pageIndex)
        : [...prev, pageIndex]
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <LinearProgress sx={{ width: '300px' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!moduleData) {
    return (
      <Alert severity="warning" sx={{ m: 2 }}>
        No module content available.
      </Alert>
    );
  }

  const currentPage = moduleData.pages[currentPageIndex];
  const progress = ((currentPageIndex + 1) / moduleData.pages.length) * 100;

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
      {/* Module Header */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {moduleData.title}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
                {moduleData.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip label={moduleData.difficulty} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip label={`${moduleData.duration} min`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <Chip label={`${moduleData.pages.length} pages`} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
              Progress: {currentPageIndex + 1} of {moduleData.pages.length} pages
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,0.3)',
                '& .MuiLinearProgress-bar': {
                  bgcolor: 'white'
                }
              }}
            />
          </Box>
        </CardContent>
      </MotionCard>

      {/* Page Content */}
      <MotionBox
        key={currentPageIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card sx={{ mb: 3, minHeight: '600px' }}>
          <CardContent sx={{ p: 4 }}>
            {/* Page Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {currentPage.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Chip 
                    label={currentPage.type}
                    size="small"
                    color={currentPage.type === 'theory' ? 'primary' : 
                           currentPage.type === 'example' ? 'secondary' :
                           currentPage.type === 'hands-on' ? 'success' : 'default'}
                  />
                  <Typography variant="body2" color="text.secondary">
                    Page {currentPage.pageNumber} of {moduleData.pages.length}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                onClick={() => toggleBookmark(currentPageIndex)}
                color={bookmarkedPages.includes(currentPageIndex) ? 'primary' : 'default'}
              >
                <BookmarkBorder />
              </IconButton>
            </Box>

            {/* Page Content */}
            <Box sx={{ mb: 4, '& p': { lineHeight: 1.7 }, '& h1, & h2, & h3': { color: 'primary.main', mt: 3, mb: 2 } }}>
              <ReactMarkdown>{currentPage.content}</ReactMarkdown>
            </Box>

            {/* Code Examples */}
            {currentPage.codeExamples && currentPage.codeExamples.map((example, index) => (
              <Accordion key={index} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Code color="primary" />
                    {example.description}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SyntaxHighlighter
                    language={example.language}
                    style={atomOneDark}
                    customStyle={{ borderRadius: '8px', fontSize: '14px' }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </AccordionDetails>
              </Accordion>
            ))}

            {/* Key Points */}
            {currentPage.keyPoints && (
              <Paper sx={{ p: 3, mt: 3, bgcolor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Lightbulb color="warning" />
                  Key Points
                </Typography>
                <List dense>
                  {currentPage.keyPoints.map((point, index) => (
                    <ListItem key={index}>
                      <ListItemIcon sx={{ minWidth: 24 }}>
                        <CheckCircle color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={point} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}

            {/* Additional Resources */}
            {currentPage.additionalResources && (
              <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.50' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LinkIcon color="info" />
                  Additional Resources
                </Typography>
                <List>
                  {currentPage.additionalResources.map((resource, index) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <LinkIcon fontSize="small" />
                        {resource.title}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </CardContent>

          {/* Page Navigation */}
          <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              startIcon={<NavigateBefore />}
              onClick={() => handlePageNavigation('prev')}
              disabled={currentPageIndex === 0}
            >
              Previous Page
            </Button>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Page navigation:
              </Typography>
              {moduleData.pages.map((_, index) => (
                <Button
                  key={index}
                  size="small"
                  variant={index === currentPageIndex ? 'contained' : 'outlined'}
                  onClick={() => setCurrentPageIndex(index)}
                  sx={{ minWidth: 36, height: 36 }}
                >
                  {index + 1}
                </Button>
              ))}
            </Box>

            <Button
              endIcon={<NavigateNext />}
              onClick={() => handlePageNavigation('next')}
              disabled={currentPageIndex === moduleData.pages.length - 1}
            >
              Next Page
            </Button>
          </Box>
        </Card>
      </MotionBox>

      {/* Quiz Section */}
      {moduleData.quiz && currentPageIndex === moduleData.pages.length - 1 && (
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Quiz color="primary" />
              Knowledge Assessment
            </Typography>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              Complete this quiz to test your understanding. You have {moduleData.quiz.maxAttempts} attempts.
              {quizAttempts > 0 && ` (Attempt ${quizAttempts + 1}/${moduleData.quiz.maxAttempts})`}
            </Alert>

            {moduleData.quiz.questions.map((question, index) => (
              <Paper key={index} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom>
                  Question {index + 1}: {question.question}
                </Typography>
                
                {question.type === 'multiple-choice' && (
                  <RadioGroup
                    value={quizAnswers[question.question] || ''}
                    onChange={(e) => setQuizAnswers(prev => ({
                      ...prev,
                      [question.question]: parseInt(e.target.value)
                    }))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={optionIndex}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                )}

                {question.type === 'multiple-select' && (
                  <Box>
                    {question.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        control={
                          <Checkbox
                            checked={(quizAnswers[question.question] || []).includes(optionIndex)}
                            onChange={(e) => {
                              const current = quizAnswers[question.question] || [];
                              if (e.target.checked) {
                                setQuizAnswers(prev => ({
                                  ...prev,
                                  [question.question]: [...current, optionIndex]
                                }));
                              } else {
                                setQuizAnswers(prev => ({
                                  ...prev,
                                  [question.question]: current.filter(a => a !== optionIndex)
                                }));
                              }
                            }}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </Box>
                )}

                {/* Show results after quiz submission */}
                {quizResults && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    {quizResults.results.find(r => r.questionId === question.question)?.isCorrect ? (
                      <Alert severity="success" sx={{ mb: 1 }}>
                        Correct! 
                      </Alert>
                    ) : (
                      <Alert severity="error" sx={{ mb: 1 }}>
                        Incorrect
                      </Alert>
                    )}
                    <Typography variant="body2">
                      <strong>Explanation:</strong> {question.explanation}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ))}

            {!quizResults && quizAttempts < moduleData.quiz.maxAttempts && (
              <Button
                variant="contained"
                size="large"
                onClick={handleQuizSubmit}
                startIcon={<Quiz />}
                sx={{ mt: 2 }}
              >
                Submit Quiz
              </Button>
            )}

            {quizResults && (
              <Alert severity={quizResults.score >= moduleData.quiz.passingScore ? 'success' : 'warning'} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Quiz Score: {quizResults.score}% (Attempt {quizResults.attempt})
                </Typography>
                <Typography>
                  {quizResults.score >= moduleData.quiz.passingScore
                    ? 'Congratulations! You passed the assessment.'
                    : `You need ${moduleData.quiz.passingScore}% to pass. ${quizAttempts < moduleData.quiz.maxAttempts ? 'You can try again.' : 'No more attempts remaining.'}`}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Module Navigation */}
      <Card>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            startIcon={<SkipPrevious />}
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            Previous Module
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {quizResults?.score >= moduleData.quiz?.passingScore && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                onClick={handleComplete}
              >
                Complete Module
              </Button>
            )}
            
            <Button
              endIcon={<SkipNext />}
              onClick={onNext}
              disabled={!onNext || (moduleData.quiz && (!quizResults || quizResults.score < moduleData.quiz.passingScore))}
            >
              Next Module
            </Button>
          </Box>
        </Box>
      </Card>

      {/* Floating Action Button for Progress */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
        onClick={() => setCurrentPageIndex(moduleData.pages.length - 1)}
      >
        <Quiz />
      </Fab>
    </Box>
  );
};

export default EnhancedLessonPlayer;
