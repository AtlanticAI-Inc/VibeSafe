import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  LinearProgress,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Alert,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  PlayArrow,
  CheckCircle,
  School,
  Code,
  Quiz,
  Assignment,
  NavigateNext,
  NavigateBefore,
  EmojiEvents,
  Security,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MonacoEditor from '@monaco-editor/react';

const MotionCard = motion(Card);

const InteractiveLab = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [userCode, setUserCode] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  // Mock module data based on moduleId
  const moduleData = {
    'owasp-top-10': {
      title: 'OWASP Top 10',
      description: 'Learn about the most critical web application security risks',
      steps: [
        {
          id: 'introduction',
          title: 'Introduction to OWASP Top 10',
          content: `
            <h3>Welcome to OWASP Top 10 Training</h3>
            <p>The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.</p>
            
            <h4>What you'll learn:</h4>
            <ul>
              <li>The 10 most critical web application security risks</li>
              <li>How to identify these vulnerabilities</li>
              <li>Prevention techniques and best practices</li>
              <li>Real-world examples and case studies</li>
            </ul>
            
            <p>This course includes hands-on exercises where you'll identify and fix actual security vulnerabilities.</p>
          `,
          type: 'theory',
          quiz: null,
          code: null,
        },
        {
          id: 'injection',
          title: 'A01: Injection Flaws',
          content: `
            <h3>Injection Flaws</h3>
            <p>Injection flaws, such as SQL injection, occur when untrusted data is sent to an interpreter as part of a command or query.</p>
            
            <h4>Common Types:</h4>
            <ul>
              <li><strong>SQL Injection:</strong> Malicious SQL code inserted into queries</li>
              <li><strong>NoSQL Injection:</strong> Similar attacks on NoSQL databases</li>
              <li><strong>OS Command Injection:</strong> Executing system commands</li>
              <li><strong>LDAP Injection:</strong> Targeting LDAP directories</li>
            </ul>
            
            <h4>Prevention:</h4>
            <ul>
              <li>Use parameterized queries or prepared statements</li>
              <li>Implement proper input validation</li>
              <li>Use least privilege principles for database access</li>
              <li>Regular security testing and code reviews</li>
            </ul>
          `,
          type: 'theory',
          quiz: {
            question: "Which of the following is the most effective way to prevent SQL injection?",
            options: [
              "Input validation only",
              "Parameterized queries/prepared statements",
              "String concatenation with escaping",
              "Stored procedures only"
            ],
            correct: 1,
            explanation: "Parameterized queries ensure that SQL code and data are clearly separated, making injection attacks impossible."
          },
          code: {
            language: 'javascript',
            vulnerable: `// VULNERABLE CODE
const query = "SELECT * FROM users WHERE id = " + userId;
database.query(query);`,
            secure: `// SECURE CODE
const query = "SELECT * FROM users WHERE id = ?";
database.query(query, [userId]);`
          }
        },
        {
          id: 'broken-auth',
          title: 'A02: Broken Authentication',
          content: `
            <h3>Broken Authentication</h3>
            <p>Authentication and session management functions are often implemented incorrectly, allowing attackers to compromise passwords, keys, or session tokens.</p>
            
            <h4>Common Vulnerabilities:</h4>
            <ul>
              <li>Weak password requirements</li>
              <li>Credential stuffing attacks</li>
              <li>Session fixation</li>
              <li>Weak session management</li>
              <li>Missing multi-factor authentication</li>
            </ul>
            
            <h4>Prevention:</h4>
            <ul>
              <li>Implement strong password policies</li>
              <li>Use multi-factor authentication</li>
              <li>Secure session management</li>
              <li>Rate limiting and account lockout</li>
              <li>Proper logout and session invalidation</li>
            </ul>
          `,
          type: 'hands-on',
          quiz: {
            question: "What is session fixation?",
            options: [
              "Using the same session ID for multiple users",
              "An attacker setting a user's session ID to a known value",
              "Sessions that never expire",
              "Sharing session data between applications"
            ],
            correct: 1,
            explanation: "Session fixation occurs when an attacker can set or fix a user's session ID, then hijack the session once the user authenticates."
          },
          code: {
            language: 'javascript',
            vulnerable: `// VULNERABLE: No session regeneration after login
app.post('/login', (req, res) => {
  if (authenticate(req.body.username, req.body.password)) {
    req.session.authenticated = true;
    req.session.userId = getUserId(req.body.username);
    res.redirect('/dashboard');
  }
});`,
            secure: `// SECURE: Regenerate session after login
app.post('/login', (req, res) => {
  if (authenticate(req.body.username, req.body.password)) {
    req.session.regenerate((err) => {
      req.session.authenticated = true;
      req.session.userId = getUserId(req.body.username);
      res.redirect('/dashboard');
    });
  }
});`
          }
        },
        {
          id: 'sensitive-data',
          title: 'A03: Sensitive Data Exposure',
          content: `
            <h3>Sensitive Data Exposure</h3>
            <p>Applications frequently do not adequately protect sensitive data such as financial information, healthcare records, or personal data.</p>
            
            <h4>Common Issues:</h4>
            <ul>
              <li>Data transmitted in clear text</li>
              <li>Weak or outdated cryptographic algorithms</li>
              <li>Default or weak encryption keys</li>
              <li>Missing HTTPS enforcement</li>
              <li>Improper certificate validation</li>
            </ul>
            
            <h4>Prevention:</h4>
            <ul>
              <li>Use HTTPS everywhere</li>
              <li>Encrypt sensitive data at rest</li>
              <li>Use strong, up-to-date cryptographic algorithms</li>
              <li>Proper key management</li>
              <li>Data classification and handling procedures</li>
            </ul>
          `,
          type: 'practical',
          quiz: {
            question: "Which encryption algorithm should you avoid for new applications?",
            options: [
              "AES-256",
              "ChaCha20-Poly1305",
              "DES",
              "RSA-2048"
            ],
            correct: 2,
            explanation: "DES (Data Encryption Standard) is outdated and vulnerable due to its small key size (56 bits). Modern applications should use AES or other current standards."
          },
          code: {
            language: 'javascript',
            vulnerable: `// VULNERABLE: Storing passwords in plain text
const user = {
  username: 'john',
  password: 'mypassword123'
};
database.save(user);`,
            secure: `// SECURE: Hashing passwords with salt
const bcrypt = require('bcrypt');
const saltRounds = 12;

const hashedPassword = await bcrypt.hash(password, saltRounds);
const user = {
  username: 'john',
  password: hashedPassword
};
database.save(user);`
          }
        },
        {
          id: 'final-assessment',
          title: 'Final Assessment',
          content: `
            <h3>Complete Your Learning</h3>
            <p>Congratulations! You've completed the OWASP Top 10 training module.</p>
            
            <h4>What You've Learned:</h4>
            <ul>
              <li>The most critical web application security risks</li>
              <li>How to identify injection vulnerabilities</li>
              <li>Authentication and session security best practices</li>
              <li>Protecting sensitive data with proper encryption</li>
            </ul>
            
            <p>Complete the final assessment to earn your certificate and unlock the next module.</p>
          `,
          type: 'assessment',
          quiz: {
            question: "You've completed all lessons! Which statement best describes the OWASP Top 10?",
            options: [
              "A list of the most expensive security tools",
              "The ten most critical web application security risks",
              "A programming language specification",
              "A list of the best security companies"
            ],
            correct: 1,
            explanation: "The OWASP Top 10 is indeed a list of the most critical web application security risks, updated regularly to reflect current threats."
          },
          code: null
        }
      ]
    }
  };

  const currentModule = moduleData[moduleId] || moduleData['owasp-top-10'];
  const currentStep = currentModule.steps[activeStep];
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  useEffect(() => {
    // Set initial code for code exercises
    if (currentStep.code) {
      setUserCode(currentStep.code.vulnerable);
    }
  }, [activeStep, currentStep]);

  const handleNext = () => {
    if (activeStep < currentModule.steps.length - 1) {
      setCompletedSteps(prev => new Set([...prev, activeStep]));
      setActiveStep(prev => prev + 1);
      setQuizAnswer(null);
      setShowQuizResult(false);
      setActiveTab(0);
    } else {
      // Module completed
      setShowCertificate(true);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(prev => prev - 1);
      setQuizAnswer(null);
      setShowQuizResult(false);
      setActiveTab(0);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswer !== null) {
      setShowQuizResult(true);
    }
  };

  const handleCodeRun = () => {
    // Simulate code execution
    alert('Code executed successfully! In a real environment, this would run your code and show the results.');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const progress = ((activeStep + (completedSteps.has(activeStep) ? 1 : 0)) / currentModule.steps.length) * 100;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🎯 {currentModule.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            {currentModule.description}
          </Typography>

          {/* Progress */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Progress: {Math.round(progress)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Step {activeStep + 1} of {currentModule.steps.length}
                </Typography>
              </Box>
              <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 1 }} />
            </Box>
            <Chip
              icon={<School />}
              label={`${completedSteps.size} completed`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <CardContent>
              {/* Step Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {currentStep.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      size="small"
                      label={currentStep.type}
                      color={
                        currentStep.type === 'theory' ? 'info' :
                        currentStep.type === 'hands-on' ? 'warning' :
                        currentStep.type === 'practical' ? 'success' : 'secondary'
                      }
                      variant="outlined"
                    />
                    {completedSteps.has(activeStep) && (
                      <Chip
                        size="small"
                        icon={<CheckCircle />}
                        label="Completed"
                        color="success"
                      />
                    )}
                  </Box>
                </Box>
              </Box>

              {/* Tabs */}
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={activeTab} onChange={handleTabChange}>
                  <Tab label="Content" icon={<Assignment />} />
                  {currentStep.quiz && <Tab label="Quiz" icon={<Quiz />} />}
                  {currentStep.code && <Tab label="Code Lab" icon={<Code />} />}
                </Tabs>
              </Box>

              {/* Content Tab */}
              {activeTab === 0 && (
                <Box sx={{ mb: 4 }}>
                  <div 
                    dangerouslySetInnerHTML={{ __html: currentStep.content }}
                    style={{
                      lineHeight: 1.6,
                      '& h3': { color: '#00bcd4', marginTop: '1.5rem', marginBottom: '1rem' },
                      '& h4': { color: '#4dd0e1', marginTop: '1rem', marginBottom: '0.5rem' },
                      '& ul': { marginLeft: '1.5rem' },
                      '& li': { marginBottom: '0.5rem' },
                    }}
                  />
                </Box>
              )}

              {/* Quiz Tab */}
              {activeTab === 1 && currentStep.quiz && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Knowledge Check
                  </Typography>
                  
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {currentStep.quiz.question}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    {currentStep.quiz.options.map((option, index) => (
                      <Button
                        key={index}
                        fullWidth
                        variant={quizAnswer === index ? 'contained' : 'outlined'}
                        color={
                          showQuizResult
                            ? index === currentStep.quiz.correct
                              ? 'success'
                              : quizAnswer === index
                              ? 'error'
                              : 'inherit'
                            : 'primary'
                        }
                        onClick={() => !showQuizResult && setQuizAnswer(index)}
                        sx={{ mb: 1, justifyContent: 'flex-start', textAlign: 'left' }}
                        disabled={showQuizResult}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </Button>
                    ))}
                  </Box>

                  {!showQuizResult && (
                    <Button
                      variant="contained"
                      onClick={handleQuizSubmit}
                      disabled={quizAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  )}

                  {showQuizResult && (
                    <Alert 
                      severity={quizAnswer === currentStep.quiz.correct ? 'success' : 'info'}
                      sx={{ mt: 2 }}
                    >
                      <Typography variant="body2">
                        <strong>
                          {quizAnswer === currentStep.quiz.correct ? 'Correct!' : 'Not quite right.'}
                        </strong> {currentStep.quiz.explanation}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              )}

              {/* Code Lab Tab */}
              {activeTab === 2 && currentStep.code && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Interactive Code Lab
                  </Typography>

                  <Grid container spacing={2}>
                    {/* Vulnerable Code Example */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 1, color: 'error.main' }}>
                        ❌ Vulnerable Code
                      </Typography>
                      <SyntaxHighlighter
                        language={currentStep.code.language}
                        style={atomDark}
                        customStyle={{ fontSize: '0.9rem', borderRadius: '8px' }}
                      >
                        {currentStep.code.vulnerable}
                      </SyntaxHighlighter>
                    </Grid>

                    {/* Secure Code Example */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" sx={{ mb: 1, color: 'success.main' }}>
                        ✅ Secure Code
                      </Typography>
                      <SyntaxHighlighter
                        language={currentStep.code.language}
                        style={atomDark}
                        customStyle={{ fontSize: '0.9rem', borderRadius: '8px' }}
                      >
                        {currentStep.code.secure}
                      </SyntaxHighlighter>
                    </Grid>

                    {/* Interactive Editor */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        🛠️ Try It Yourself
                      </Typography>
                      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mb: 2 }}>
                        <MonacoEditor
                          height="200px"
                          language={currentStep.code.language}
                          value={userCode}
                          onChange={setUserCode}
                          theme="vs-dark"
                          options={{
                            minimap: { enabled: false },
                            scrollBeyondLastLine: false,
                            fontSize: 14,
                          }}
                        />
                      </Box>
                      <Button
                        variant="contained"
                        startIcon={<PlayArrow />}
                        onClick={handleCodeRun}
                      >
                        Run Code
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  startIcon={<NavigateBefore />}
                  onClick={handlePrevious}
                  disabled={activeStep === 0}
                  variant="outlined"
                >
                  Previous
                </Button>

                <Button
                  endIcon={activeStep === currentModule.steps.length - 1 ? <EmojiEvents /> : <NavigateNext />}
                  onClick={handleNext}
                  variant="contained"
                  disabled={currentStep.quiz && !showQuizResult}
                >
                  {activeStep === currentModule.steps.length - 1 ? 'Complete Module' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Progress Stepper */}
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            sx={{ mb: 3 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Module Progress
              </Typography>
              
              <Stepper activeStep={activeStep} orientation="vertical">
                {currentModule.steps.map((step, index) => (
                  <Step key={step.id} completed={completedSteps.has(index)}>
                    <StepLabel
                      StepIconComponent={({ active, completed }) => (
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: completed ? 'success.main' : active ? 'primary.main' : 'grey.300',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                          }}
                        >
                          {completed ? <CheckCircle sx={{ fontSize: 16 }} /> : index + 1}
                        </Box>
                      )}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: activeStep === index ? 600 : 400,
                          color: activeStep === index ? 'primary.main' : 'text.secondary'
                        }}
                      >
                        {step.title}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </MotionCard>

          {/* Module Info */}
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                Module Information
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Steps:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {currentModule.steps.length}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Completed:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {completedSteps.size}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Current Step:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {currentStep.type}
                </Typography>
              </Box>

              <LinearProgress 
                variant="determinate" 
                value={progress} 
                sx={{ mt: 2, borderRadius: 1 }} 
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {Math.round(progress)}% Complete
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>

      {/* Certificate Dialog */}
      <Dialog
        open={showCertificate}
        onClose={() => setShowCertificate(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <EmojiEvents sx={{ fontSize: '3rem', color: 'primary.main', mb: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Congratulations! 🎉
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            You have successfully completed the {currentModule.title} module!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You've mastered the fundamental concepts of web application security and are ready to apply this knowledge in real-world scenarios.
          </Typography>
          <Box sx={{ 
            border: 2, 
            borderColor: 'primary.main', 
            borderRadius: 2, 
            p: 3, 
            mb: 3,
            background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(77, 208, 225, 0.1))'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              Certificate of Completion
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This certificate validates your understanding of {currentModule.title} security principles
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/modules')}
          >
            Back to Modules
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setShowCertificate(false);
              navigate('/modules');
            }}
          >
            Continue Learning
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InteractiveLab;
