import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
  Chip,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Terminal,
  Security,
  PlayArrow,
  Stop,
  Download,
  Upload,
  Settings,
  History,
  BugReport,
  CheckCircle,
  Warning,
  Error,
  Info,
  ExpandMore,
  ContentCopy,
  Refresh,
  Save,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MotionCard = motion(Card);

const VibeSafeIntegration = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    { 
      type: 'info', 
      text: 'VibeSafe CLI v1.2.0 initialized', 
      timestamp: new Date().toLocaleTimeString() 
    },
    { 
      type: 'info', 
      text: 'Ready for commands...', 
      timestamp: new Date().toLocaleTimeString() 
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [scanHistory, setScanHistory] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:30:22',
      duration: '2m 34s',
      issues: { critical: 2, high: 5, medium: 8, low: 3 },
      status: 'completed',
      command: 'vibesafe scan --severity high --format json'
    },
    {
      id: 2,
      timestamp: '2024-01-15 12:15:10',
      duration: '1m 45s',
      issues: { critical: 0, high: 2, medium: 4, low: 1 },
      status: 'completed',
      command: 'vibesafe scan --quick'
    },
    {
      id: 3,
      timestamp: '2024-01-15 09:22:33',
      duration: '3m 12s',
      issues: { critical: 1, high: 3, medium: 12, low: 7 },
      status: 'completed',
      command: 'vibesafe scan --comprehensive'
    }
  ]);
  const [currentScan, setCurrentScan] = useState(null);
  const terminalRef = useRef(null);

  const commonCommands = [
    {
      command: 'vibesafe scan',
      description: 'Run a basic security scan',
      example: 'vibesafe scan --path ./src --severity medium'
    },
    {
      command: 'vibesafe scan --quick',
      description: 'Quick scan for critical issues only',
      example: 'vibesafe scan --quick --format json'
    },
    {
      command: 'vibesafe scan --comprehensive',
      description: 'Deep scan with all security checks',
      example: 'vibesafe scan --comprehensive --output report.json'
    },
    {
      command: 'vibesafe config',
      description: 'Configure VibeSafe settings',
      example: 'vibesafe config --set api-key YOUR_KEY'
    },
    {
      command: 'vibesafe history',
      description: 'View scan history and reports',
      example: 'vibesafe history --last 10'
    },
    {
      command: 'vibesafe fix',
      description: 'Get automated fixes for issues',
      example: 'vibesafe fix --issue-id CVE-2024-001'
    }
  ];

  const mockScanResults = {
    summary: {
      totalFiles: 147,
      scannedFiles: 143,
      issues: { critical: 2, high: 5, medium: 8, low: 3 },
      duration: '2m 34s',
      status: 'completed'
    },
    vulnerabilities: [
      {
        id: 'VS-001',
        severity: 'critical',
        title: 'SQL Injection Vulnerability',
        description: 'Potential SQL injection in user input handling',
        file: 'src/api/users.js',
        line: 45,
        cwe: 'CWE-89',
        owasp: 'A03:2021',
        recommendation: 'Use parameterized queries or prepared statements'
      },
      {
        id: 'VS-002',
        severity: 'high',
        title: 'Cross-Site Scripting (XSS)',
        description: 'Unescaped user input in template rendering',
        file: 'src/components/UserProfile.js',
        line: 23,
        cwe: 'CWE-79',
        owasp: 'A03:2021',
        recommendation: 'Implement proper input sanitization and output encoding'
      },
      {
        id: 'VS-003',
        severity: 'medium',
        title: 'Insecure Random Number Generation',
        description: 'Using Math.random() for security-sensitive operations',
        file: 'src/utils/auth.js',
        line: 67,
        cwe: 'CWE-338',
        owasp: 'A02:2021',
        recommendation: 'Use cryptographically secure random number generator'
      }
    ]
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const addToTerminal = (type, text) => {
    setTerminalOutput(prev => [
      ...prev,
      { type, text, timestamp: new Date().toLocaleTimeString() }
    ]);
  };

  const executeCommand = async (command) => {
    if (!command.trim()) return;

    addToTerminal('command', `$ ${command}`);
    setCurrentCommand('');

    // Simulate command execution
    if (command.includes('scan')) {
      setIsScanning(true);
      addToTerminal('info', 'Starting VibeSafe security scan...');
      addToTerminal('info', 'Analyzing files and dependencies...');
      
      // Simulate scan progress
      setTimeout(() => {
        addToTerminal('success', 'Scan completed successfully!');
        addToTerminal('info', `Found ${mockScanResults.summary.issues.critical + mockScanResults.summary.issues.high + mockScanResults.summary.issues.medium + mockScanResults.summary.issues.low} total issues`);
        setCurrentScan(mockScanResults);
        setIsScanning(false);
        
        // Add to history
        setScanHistory(prev => [{
          id: Date.now(),
          timestamp: new Date().toLocaleString(),
          duration: mockScanResults.summary.duration,
          issues: mockScanResults.summary.issues,
          status: 'completed',
          command: command
        }, ...prev.slice(0, 9)]);
      }, 3000);
    } else if (command.includes('config')) {
      addToTerminal('info', 'Configuration updated successfully');
    } else if (command.includes('history')) {
      addToTerminal('info', `Showing last ${scanHistory.length} scans`);
      scanHistory.forEach((scan, index) => {
        addToTerminal('info', `${index + 1}. ${scan.timestamp} - ${scan.issues.critical + scan.issues.high + scan.issues.medium + scan.issues.low} issues`);
      });
    } else if (command.includes('help')) {
      addToTerminal('info', 'Available commands:');
      commonCommands.forEach(cmd => {
        addToTerminal('info', `  ${cmd.command} - ${cmd.description}`);
      });
    } else {
      addToTerminal('error', `Command not recognized: ${command}`);
      addToTerminal('info', 'Type "help" for available commands');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#ffeb3b';
      case 'low': return '#4caf50';
      default: return '#9e9e9e';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <Error sx={{ color: getSeverityColor(severity) }} />;
      case 'high': return <Warning sx={{ color: getSeverityColor(severity) }} />;
      case 'medium': return <Info sx={{ color: getSeverityColor(severity) }} />;
      case 'low': return <CheckCircle sx={{ color: getSeverityColor(severity) }} />;
      default: return <Info />;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    addToTerminal('info', 'Command copied to clipboard');
  };

  const clearTerminal = () => {
    setTerminalOutput([
      { type: 'info', text: 'VibeSafe CLI v1.2.0 initialized', timestamp: new Date().toLocaleTimeString() },
      { type: 'info', text: 'Terminal cleared. Ready for commands...', timestamp: new Date().toLocaleTimeString() }
    ]);
  };

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
            🛡️ VibeSafe CLI Integration
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Interactive security scanning and vulnerability analysis
          </Typography>
        </Box>
      </motion.div>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Terminal and Controls */}
        <Grid item xs={12} lg={8}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ height: 'fit-content' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Terminal sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  VibeSafe Terminal
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={clearTerminal}
                    title="Clear Terminal"
                  >
                    <Refresh />
                  </IconButton>
                  {isScanning && (
                    <IconButton
                      size="small"
                      onClick={() => setIsScanning(false)}
                      title="Stop Scan"
                      color="error"
                    >
                      <Stop />
                    </IconButton>
                  )}
                </Box>
              </Box>

              {/* Terminal Output */}
              <Paper
                ref={terminalRef}
                sx={{
                  backgroundColor: '#0a0a0a',
                  color: '#00ff00',
                  fontFamily: '"Fira Code", monospace',
                  fontSize: '0.9rem',
                  p: 2,
                  height: 300,
                  overflow: 'auto',
                  border: '1px solid #333',
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                {terminalOutput.map((output, index) => (
                  <Box key={index} sx={{ mb: 0.5 }}>
                    <span style={{ color: '#666', fontSize: '0.8rem' }}>
                      [{output.timestamp}]
                    </span>{' '}
                    <span
                      style={{
                        color: output.type === 'error' ? '#ff4444' :
                               output.type === 'success' ? '#44ff44' :
                               output.type === 'warning' ? '#ffaa00' :
                               output.type === 'command' ? '#4dd0e1' : '#00ff00'
                      }}
                    >
                      {output.text}
                    </span>
                  </Box>
                ))}
                {isScanning && (
                  <Box sx={{ display: 'flex', alignItems: 'center', color: '#4dd0e1' }}>
                    <CircularProgress size={16} sx={{ mr: 1, color: 'inherit' }} />
                    Scanning...
                  </Box>
                )}
              </Paper>

              {/* Command Input */}
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter VibeSafe command..."
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isScanning}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1, color: 'primary.main', fontFamily: 'monospace' }}>$</Typography>,
                  sx: {
                    fontFamily: '"Fira Code", monospace',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                }}
              />

              {/* Quick Actions */}
              <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => executeCommand('vibesafe scan --quick')}
                  disabled={isScanning}
                >
                  Quick Scan
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => executeCommand('vibesafe scan --comprehensive')}
                  disabled={isScanning}
                >
                  Deep Scan
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => executeCommand('vibesafe history')}
                >
                  View History
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => executeCommand('help')}
                >
                  Help
                </Button>
              </Box>
            </CardContent>
          </MotionCard>

          {/* Scan Results */}
          {currentScan && (
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              sx={{ mt: 3 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  <BugReport sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Latest Scan Results
                </Typography>

                {/* Summary */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {Object.entries(currentScan.summary.issues).map(([severity, count]) => (
                    <Grid item xs={6} sm={3} key={severity}>
                      <Paper sx={{ p: 2, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                          {getSeverityIcon(severity)}
                          <Typography variant="h6" sx={{ ml: 1, fontWeight: 600 }}>
                            {count}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {severity}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>

                {/* Vulnerabilities */}
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Detected Vulnerabilities
                </Typography>
                {currentScan.vulnerabilities.map((vuln, index) => (
                  <Accordion key={vuln.id} sx={{ mb: 1 }}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        {getSeverityIcon(vuln.severity)}
                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>{vuln.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {vuln.file}:{vuln.line}
                          </Typography>
                        </Box>
                        <Chip
                          label={vuln.severity.toUpperCase()}
                          size="small"
                          sx={{
                            backgroundColor: getSeverityColor(vuln.severity),
                            color: 'white',
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {vuln.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip label={`CWE: ${vuln.cwe}`} size="small" variant="outlined" />
                        <Chip label={`OWASP: ${vuln.owasp}`} size="small" variant="outlined" />
                      </Box>
                      <Alert severity="info">
                        <strong>Recommendation:</strong> {vuln.recommendation}
                      </Alert>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </MotionCard>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Command Reference */}
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            sx={{ mb: 3 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Settings sx={{ mr: 1, verticalAlign: 'middle' }} />
                Command Reference
              </Typography>
              
              {commonCommands.map((cmd, index) => (
                <Box key={index} sx={{ mb: 2, p: 1, borderRadius: 1, backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.8rem',
                        flexGrow: 1,
                      }}
                    >
                      {cmd.command}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyToClipboard(cmd.example)}
                      title="Copy example"
                    >
                      <ContentCopy sx={{ fontSize: '1rem' }} />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {cmd.description}
                  </Typography>
                  <SyntaxHighlighter
                    language="bash"
                    style={atomDark}
                    customStyle={{
                      fontSize: '0.75rem',
                      padding: '8px',
                      margin: 0,
                      borderRadius: '4px',
                    }}
                  >
                    {cmd.example}
                  </SyntaxHighlighter>
                </Box>
              ))}
            </CardContent>
          </MotionCard>

          {/* Scan History */}
          <MotionCard
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <History sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Scans
              </Typography>
              
              <List dense>
                {scanHistory.slice(0, 5).map((scan) => (
                  <ListItem
                    key={scan.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <ListItemIcon>
                      <Security color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {scan.timestamp.split(' ')[1]}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {scan.duration}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5 }}>
                          {Object.entries(scan.issues).map(([severity, count]) => (
                            count > 0 && (
                              <Chip
                                key={severity}
                                label={`${count} ${severity}`}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 18,
                                  backgroundColor: getSeverityColor(severity),
                                  color: 'white',
                                }}
                              />
                            )
                          ))}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default VibeSafeIntegration;
