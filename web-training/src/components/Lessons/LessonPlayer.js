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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
  Link
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
  PlayCircle
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import apiService from '../../services/apiService';

const MotionCard = motion(Card);

const LessonPlayer = ({ moduleId, lessonId, onComplete, onNext, onPrevious }) => {
  const [lesson, setLesson] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [labCode, setLabCode] = useState('');
  const [labResults, setLabResults] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);

  // Graduate-level cybersecurity lesson content
  const graduateLessonContent = {
    'advanced-threat-modeling': {
      title: 'Advanced Threat Modeling and Risk Assessment',
      type: 'theory',
      difficulty: 'Graduate',
      estimatedTime: 45,
      content: {
        theory: `
# Advanced Threat Modeling Methodologies

## STRIDE-LM (Location and Motivation) Framework

Traditional STRIDE focuses on technical threats, but STRIDE-LM incorporates:
- **Location**: Physical and logical attack vectors
- **Motivation**: Economic, political, and personal drivers

### Mathematical Risk Modeling

Risk = Threat × Vulnerability × Impact × Likelihood

Where each component is weighted using Bayesian inference:

\`\`\`
P(Risk|Evidence) = P(Evidence|Risk) × P(Risk) / P(Evidence)
\`\`\`

## Advanced Attack Trees

Binary decision trees where:
- Each leaf represents a basic attack
- Each node represents a sub-goal
- Edge weights represent attack costs/probabilities

### Game Theory Applications

Modeling attacker-defender interactions using:
- Nash equilibrium analysis
- Zero-sum game theory
- Evolutionary stable strategies
        `,
        vulnerableCode: `
// Vulnerable authentication bypass
public class AuthService {
    public boolean authenticate(String token) {
        if (token.length() > 10) { // Weak validation
            return true;
        }
        return false;
    }
    
    // SQL injection vulnerability
    public User getUser(String username) {
        String query = "SELECT * FROM users WHERE username = '" + username + "'";
        return database.execute(query);
    }
}
        `,
        secureCode: `
// Secure authentication implementation
public class SecureAuthService {
    private final JwtValidator validator;
    private final AuditLogger auditLogger;
    
    public AuthResult authenticate(String token) {
        try {
            // Multi-factor validation
            Claims claims = validator.validateToken(token);
            
            if (!isTokenStillValid(claims)) {
                auditLogger.logFailedAuth(claims.getSubject(), "EXPIRED_TOKEN");
                return AuthResult.FAILED;
            }
            
            // Rate limiting check
            if (rateLimiter.isExceeded(claims.getSubject())) {
                auditLogger.logFailedAuth(claims.getSubject(), "RATE_LIMITED");
                return AuthResult.RATE_LIMITED;
            }
            
            return AuthResult.SUCCESS;
            
        } catch (JwtException e) {
            auditLogger.logFailedAuth("unknown", "INVALID_TOKEN");
            return AuthResult.FAILED;
        }
    }
    
    // Parameterized query preventing SQL injection
    public User getUser(String username) {
        PreparedStatement stmt = connection.prepareStatement(
            "SELECT * FROM users WHERE username = ? AND active = true"
        );
        stmt.setString(1, username);
        return stmt.executeQuery();
    }
}
        `
      },
      quiz: {
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'In advanced threat modeling, what does the STRIDE-LM framework add to traditional STRIDE?',
            options: [
              'Load balancing and monitoring capabilities',
              'Location and motivation analysis',
              'Linear mathematics and machine learning',
              'Legacy system and migration planning'
            ],
            correct: 1,
            explanation: 'STRIDE-LM extends traditional STRIDE by incorporating Location (physical/logical attack vectors) and Motivation (economic, political, personal drivers) to provide a more comprehensive threat analysis.'
          },
          {
            id: 2,
            type: 'multiple-select',
            question: 'Which mathematical concepts are commonly used in advanced risk modeling? (Select all that apply)',
            options: [
              'Bayesian inference',
              'Game theory',
              'Monte Carlo simulation',
              'Linear regression only'
            ],
            correct: [0, 1, 2],
            explanation: 'Advanced risk modeling employs Bayesian inference for probability updating, game theory for attacker-defender interactions, and Monte Carlo simulation for uncertainty quantification. Linear regression alone is insufficient for complex security modeling.'
          },
          {
            id: 3,
            type: 'coding',
            question: 'Identify the security vulnerabilities in the provided code and explain how the secure version addresses them.',
            expectedElements: [
              'JWT validation',
              'Rate limiting',
              'Audit logging',
              'Parameterized queries',
              'Exception handling'
            ],
            explanation: 'The secure version implements proper JWT validation, rate limiting to prevent brute force attacks, comprehensive audit logging, parameterized queries to prevent SQL injection, and proper exception handling for security events.'
          }
        ]
      },
      lab: {
        title: 'Implement STRIDE-LM Threat Model',
        description: 'Create a comprehensive threat model for a banking application using the STRIDE-LM methodology.',
        initialCode: `
// Banking Application Threat Model Template
class ThreatModel {
    constructor(applicationName) {
        this.name = applicationName;
        this.assets = [];
        this.threats = [];
        this.mitigations = [];
    }
    
    // TODO: Implement STRIDE-LM analysis
    analyzeSTRIDELM(component) {
        // Your implementation here
    }
    
    // TODO: Calculate risk score
    calculateRisk(threat, vulnerability, impact) {
        // Your implementation here
    }
    
    // TODO: Generate attack tree
    generateAttackTree(rootGoal) {
        // Your implementation here
    }
}

// Test your implementation
const bankingApp = new ThreatModel("SecureBank Mobile App");
// Add your threat analysis here
        `,
        hints: [
          'Consider both technical and business assets (data, reputation, compliance)',
          'Use the STRIDE categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege',
          'Add Location factors: mobile device, network, backend servers',
          'Add Motivation factors: financial gain, insider threat, nation-state'
        ],
        testCases: [
          {
            name: 'Should identify Spoofing threats',
            test: 'threats.some(t => t.category === "Spoofing")'
          },
          {
            name: 'Should include Location analysis',
            test: 'threats.some(t => t.location)'
          },
          {
            name: 'Should include Motivation analysis', 
            test: 'threats.some(t => t.motivation)'
          }
        ]
      }
    },
    'quantum-cryptography': {
      title: 'Post-Quantum Cryptography and Quantum-Safe Algorithms',
      type: 'theory',
      difficulty: 'Graduate',
      estimatedTime: 60,
      content: {
        theory: `
# Post-Quantum Cryptography

## Quantum Computing Threat to Current Cryptography

Shor's algorithm can factor large integers and compute discrete logarithms in polynomial time on a quantum computer, breaking:
- RSA encryption
- Elliptic Curve Cryptography (ECC)
- Diffie-Hellman key exchange

## NIST Post-Quantum Standardization

### Lattice-Based Cryptography
- **CRYSTALS-Kyber**: Key encapsulation mechanism
- **CRYSTALS-Dilithium**: Digital signatures
- Based on Learning With Errors (LWE) problem

### Code-Based Cryptography
- **Classic McEliece**: Based on error-correcting codes
- Security relies on syndrome decoding problem

### Multivariate Cryptography
- **RAINBOW**: Digital signatures (now broken)
- **GeMSS**: Alternative multivariate scheme

### Hash-Based Signatures
- **SPHINCS+**: Stateless hash-based signatures
- **XMSS/LMS**: Stateful hash-based signatures

## Implementation Considerations

### Hybrid Approaches
Combining classical and post-quantum algorithms during transition:

\`\`\`
ciphertext = Encrypt_Classical(message) || Encrypt_PQ(message)
signature = Sign_Classical(message) || Sign_PQ(message)
\`\`\`

### Performance Trade-offs
- Larger key sizes (10x-100x increase)
- Slower operations
- Higher bandwidth requirements
        `,
        practicalExample: `
// Example: Implementing hybrid key exchange
class HybridKeyExchange {
    generateKeyPair() {
        return {
            classical: this.generateECDHKeyPair(),
            postQuantum: this.generateKyberKeyPair()
        };
    }
    
    deriveSharedSecret(privateKey, publicKey) {
        const classicalSecret = ecdh.computeSecret(
            privateKey.classical, 
            publicKey.classical
        );
        const pqSecret = kyber.decapsulate(
            privateKey.postQuantum, 
            publicKey.postQuantum
        );
        
        // Combine using KDF
        return kdf(classicalSecret + pqSecret);
    }
}
        `
      },
      quiz: {
        questions: [
          {
            id: 1,
            type: 'multiple-choice',
            question: 'Which quantum algorithm poses the greatest threat to current public-key cryptography?',
            options: [
              "Grover's algorithm",
              "Shor's algorithm", 
              "Deutsch-Jozsa algorithm",
              "Simon's algorithm"
            ],
            correct: 1,
            explanation: "Shor's algorithm can efficiently factor large integers and compute discrete logarithms on quantum computers, directly breaking RSA, ECC, and Diffie-Hellman cryptosystems."
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: 'What is the primary mathematical problem underlying CRYSTALS-Kyber?',
            options: [
              'Integer factorization',
              'Discrete logarithm',
              'Learning With Errors (LWE)',
              'Graph isomorphism'
            ],
            correct: 2,
            explanation: 'CRYSTALS-Kyber is based on the Learning With Errors (LWE) problem over polynomial rings, which is believed to be hard even for quantum computers.'
          }
        ]
      }
    }
  };

  useEffect(() => {
    // Load lesson content
    const loadLesson = () => {
      setLoading(true);
      
      // Simulate API call or use mock data
      setTimeout(() => {
        const lessonContent = graduateLessonContent[lessonId] || graduateLessonContent['advanced-threat-modeling'];
        setLesson(lessonContent);
        setLoading(false);
      }, 1000);
    };

    loadLesson();
  }, [lessonId]);

  useEffect(() => {
    // Track time spent
    const interval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleQuizSubmit = () => {
    if (!lesson?.quiz) return;

    const results = lesson.quiz.questions.map((question, index) => {
      const userAnswer = userAnswers[question.id];
      let isCorrect = false;

      if (question.type === 'multiple-choice') {
        isCorrect = userAnswer === question.correct;
      } else if (question.type === 'multiple-select') {
        isCorrect = Array.isArray(userAnswer) && 
          userAnswer.length === question.correct.length &&
          userAnswer.every(answer => question.correct.includes(answer));
      } else if (question.type === 'coding') {
        // Simple keyword checking for coding questions
        isCorrect = question.expectedElements.some(element => 
          userAnswer?.toLowerCase().includes(element.toLowerCase())
        );
      }

      return {
        questionId: question.id,
        isCorrect,
        userAnswer,
        correctAnswer: question.correct,
        explanation: question.explanation
      };
    });

    const score = Math.round((results.filter(r => r.isCorrect).length / results.length) * 100);
    setQuizResults({ results, score });
  };

  const handleLabSubmit = () => {
    // Simulate lab evaluation
    const score = Math.floor(Math.random() * 40) + 60; // 60-100%
    setLabResults({
      score,
      feedback: score > 80 ? 'Excellent implementation!' : 'Good work, but consider the hints for improvement.',
      testsPass: Math.floor((score / 100) * 3)
    });
  };

  const handleComplete = () => {
    const finalScore = quizResults?.score || labResults?.score || 0;
    
    // Save progress to backend
    apiService.post('/progress/lesson', {
      moduleId,
      lessonId,
      completed: true,
      score: finalScore,
      timeSpent: timeSpent / 60, // Convert to minutes
      answers: userAnswers
    }).then(() => {
      onComplete?.(finalScore, timeSpent);
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <LinearProgress sx={{ width: '100%' }} />
      </Box>
    );
  }

  if (!lesson) {
    return (
      <Alert severity="error">
        Lesson content could not be loaded.
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: 2 }}>
      {/* Lesson Header */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{ mb: 3 }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {lesson.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={lesson.difficulty} color="primary" />
                <Chip label={`${lesson.estimatedTime} min`} variant="outlined" />
                <Chip label={lesson.type} color="secondary" />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" color="text.secondary">
                Time spent: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </Typography>
            </Box>
          </Box>

          {/* Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Lesson Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={((activeTab + 1) / 3) * 100} 
              sx={{ borderRadius: 1, height: 8 }}
            />
          </Box>
        </CardContent>
      </MotionCard>

      {/* Lesson Content Tabs */}
      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab icon={<Science />} label="Theory" />
            <Tab icon={<Quiz />} label="Quiz" />
            <Tab icon={<Code />} label="Hands-on Lab" />
          </Tabs>
        </Box>

        {/* Theory Tab */}
        {activeTab === 0 && (
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Science color="primary" />
              Theoretical Foundation
            </Typography>
            
            {/* Theory Content */}
            <Box sx={{ mb: 4 }}>
              <SyntaxHighlighter
                language="markdown"
                style={atomOneDark}
                customStyle={{
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                {lesson.content.theory}
              </SyntaxHighlighter>
            </Box>

            {/* Code Examples */}
            {lesson.content.vulnerableCode && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Warning color="error" />
                    Vulnerable Code Example
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SyntaxHighlighter
                    language="java"
                    style={atomOneDark}
                    customStyle={{ borderRadius: '8px' }}
                  >
                    {lesson.content.vulnerableCode}
                  </SyntaxHighlighter>
                </AccordionDetails>
              </Accordion>
            )}

            {lesson.content.secureCode && (
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle color="success" />
                    Secure Implementation
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SyntaxHighlighter
                    language="java"
                    style={atomOneDark}
                    customStyle={{ borderRadius: '8px' }}
                  >
                    {lesson.content.secureCode}
                  </SyntaxHighlighter>
                </AccordionDetails>
              </Accordion>
            )}
          </CardContent>
        )}

        {/* Quiz Tab */}
        {activeTab === 1 && lesson.quiz && (
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Quiz color="primary" />
              Knowledge Assessment
            </Typography>

            {lesson.quiz.questions.map((question, index) => (
              <Paper key={question.id} sx={{ p: 3, mb: 3, border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom>
                  Question {index + 1}: {question.question}
                </Typography>

                {question.type === 'multiple-choice' && (
                  <RadioGroup
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => setUserAnswers(prev => ({
                      ...prev,
                      [question.id]: parseInt(e.target.value)
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
                            checked={(userAnswers[question.id] || []).includes(optionIndex)}
                            onChange={(e) => {
                              const currentAnswers = userAnswers[question.id] || [];
                              if (e.target.checked) {
                                setUserAnswers(prev => ({
                                  ...prev,
                                  [question.id]: [...currentAnswers, optionIndex]
                                }));
                              } else {
                                setUserAnswers(prev => ({
                                  ...prev,
                                  [question.id]: currentAnswers.filter(a => a !== optionIndex)
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

                {question.type === 'coding' && (
                  <TextField
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Enter your analysis here..."
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => setUserAnswers(prev => ({
                      ...prev,
                      [question.id]: e.target.value
                    }))}
                    sx={{ mt: 2 }}
                  />
                )}

                {/* Show results after quiz submission */}
                {quizResults && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    {quizResults.results.find(r => r.questionId === question.id)?.isCorrect ? (
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

            {!quizResults && (
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
              <Alert severity={quizResults.score >= 70 ? 'success' : 'warning'} sx={{ mt: 2 }}>
                <Typography variant="h6">
                  Quiz Score: {quizResults.score}%
                </Typography>
                <Typography>
                  {quizResults.score >= 70 
                    ? 'Excellent work! You can proceed to the lab.' 
                    : 'Consider reviewing the theory section before proceeding.'}
                </Typography>
              </Alert>
            )}
          </CardContent>
        )}

        {/* Lab Tab */}
        {activeTab === 2 && lesson.lab && (
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Code color="primary" />
              Hands-on Laboratory
            </Typography>

            <Typography variant="h6" gutterBottom>
              {lesson.lab.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {lesson.lab.description}
            </Typography>

            {/* Hints */}
            <Accordion sx={{ mb: 3 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Lightbulb color="warning" />
                  Hints
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {lesson.lab.hints.map((hint, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                    • {hint}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

            {/* Code Editor */}
            <Typography variant="h6" gutterBottom>
              Your Implementation:
            </Typography>
            <TextField
              multiline
              rows={15}
              fullWidth
              value={labCode || lesson.lab.initialCode}
              onChange={(e) => setLabCode(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiInputBase-input': {
                  fontFamily: 'Monaco, monospace',
                  fontSize: '14px'
                }
              }}
            />

            <Button
              variant="contained"
              size="large"
              onClick={handleLabSubmit}
              startIcon={<Code />}
              sx={{ mr: 2 }}
            >
              Run Tests
            </Button>

            {/* Lab Results */}
            {labResults && (
              <Box sx={{ mt: 3 }}>
                <Alert severity={labResults.score >= 70 ? 'success' : 'warning'}>
                  <Typography variant="h6">
                    Lab Score: {labResults.score}%
                  </Typography>
                  <Typography>
                    Tests Passed: {labResults.testsPass}/3
                  </Typography>
                  <Typography sx={{ mt: 1 }}>
                    {labResults.feedback}
                  </Typography>
                </Alert>
              </Box>
            )}
          </CardContent>
        )}

        {/* Navigation Controls */}
        <Box sx={{ p: 3, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<SkipPrevious />}
            onClick={onPrevious}
            disabled={!onPrevious}
          >
            Previous
          </Button>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {(quizResults?.score >= 70 || labResults?.score >= 70) && (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircle />}
                onClick={handleComplete}
              >
                Complete Lesson
              </Button>
            )}
            
            <Button
              endIcon={<SkipNext />}
              onClick={onNext}
              disabled={!onNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default LessonPlayer;
