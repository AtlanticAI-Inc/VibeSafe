import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  IconButton,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  Security,
  TrendingUp,
  Warning,
  CheckCircle,
  School,
  Code,
  BugReport,
  Refresh,
  PlayArrow,
  Analytics,
  Timeline,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { useTraining } from '../context/TrainingContext';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const Dashboard = () => {
  const { user, saveProgress } = useTraining();
  const [scanData, setScanData] = useState({
    lastScan: '2 hours ago',
    totalIssues: 23,
    critical: 2,
    high: 7,
    medium: 10,
    low: 4,
    resolved: 18,
    scanning: false,
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'scan',
      title: 'VibeSafe Security Scan Completed',
      description: '2 critical vulnerabilities detected',
      timestamp: '2 hours ago',
      severity: 'error',
    },
    {
      id: 2,
      type: 'training',
      title: 'OWASP Top 10 Module Completed',
      description: 'Scored 95% on the final assessment',
      timestamp: '1 day ago',
      severity: 'success',
    },
    {
      id: 3,
      type: 'code',
      title: 'Code Review Security Check',
      description: 'Pull request #127 flagged for review',
      timestamp: '2 days ago',
      severity: 'warning',
    },
    {
      id: 4,
      type: 'training',
      title: 'Cryptography Fundamentals Started',
      description: 'Progress: 25%',
      timestamp: '3 days ago',
      severity: 'info',
    },
  ]);

  // Chart configurations
  const securityTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Critical Issues',
        data: [8, 6, 4, 3, 2, 2],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
      },
      {
        label: 'High Issues',
        data: [15, 12, 10, 9, 8, 7],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Medium Issues',
        data: [25, 22, 18, 15, 12, 10],
        borderColor: '#ffeb3b',
        backgroundColor: 'rgba(255, 235, 59, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const vulnerabilityTypeData = {
    labels: ['SQL Injection', 'XSS', 'CSRF', 'Auth Issues', 'Config', 'Other'],
    datasets: [
      {
        data: [8, 6, 4, 3, 2, 2],
        backgroundColor: [
          '#f44336',
          '#ff9800',
          '#ffeb3b',
          '#4caf50',
          '#2196f3',
          '#9c27b0',
        ],
        borderWidth: 0,
      },
    ],
  };

  const trainingProgressData = {
    labels: ['OWASP Top 10', 'Secure Coding', 'Cryptography', 'Auth & Access', 'API Security'],
    datasets: [
      {
        label: 'Completion %',
        data: [100, 85, 25, 60, 0],
        backgroundColor: 'rgba(0, 188, 212, 0.6)',
        borderColor: '#00bcd4',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: {
            family: '"Roboto Mono", monospace',
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      y: {
        ticks: { color: '#ffffff' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#ffffff',
          font: {
            family: '"Roboto Mono", monospace',
          },
        },
      },
    },
  };

  const handleStartScan = async () => {
    setScanData(prev => ({ ...prev, scanning: true }));
    
    // Simulate scan process
    setTimeout(() => {
      setScanData(prev => ({
        ...prev,
        scanning: false,
        lastScan: 'Just now',
        totalIssues: Math.floor(Math.random() * 30) + 10,
      }));
      
      // Add scan activity
      setRecentActivity(prev => [
        {
          id: Date.now(),
          type: 'scan',
          title: 'VibeSafe Security Scan Completed',
          description: `${scanData.totalIssues} total issues found`,
          timestamp: 'Just now',
          severity: scanData.critical > 0 ? 'error' : 'success',
        },
        ...prev.slice(0, 3),
      ]);
    }, 5000);
  };

  const getActivityIcon = (type, severity) => {
    const iconProps = {
      sx: {
        color: severity === 'error' ? 'error.main' :
               severity === 'warning' ? 'warning.main' :
               severity === 'success' ? 'success.main' : 'info.main',
      },
    };

    switch (type) {
      case 'scan': return <Security {...iconProps} />;
      case 'training': return <School {...iconProps} />;
      case 'code': return <Code {...iconProps} />;
      default: return <Analytics {...iconProps} />;
    }
  };

  const getSeverityColor = (level) => {
    switch (level) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Welcome Header */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ mb: 4 }}
      >
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
          Welcome back, {user.name}! 🛡️
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Your security training dashboard and vulnerability overview
        </Typography>
      </MotionBox>

      <Grid container spacing={3}>
        {/* Security Overview Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Security
                sx={{ fontSize: '3rem', color: 'error.main', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {scanData.critical}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Critical Issues
              </Typography>
              <Chip
                size="small"
                label="Needs Attention"
                color="error"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Warning
                sx={{ fontSize: '3rem', color: 'warning.main', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {scanData.high}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High Severity
              </Typography>
              <Chip
                size="small"
                label="Review Required"
                color="warning"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <CheckCircle
                sx={{ fontSize: '3rem', color: 'success.main', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {scanData.resolved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Issues Resolved
              </Typography>
              <Chip
                size="small"
                label="Good Progress"
                color="success"
                sx={{ mt: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            sx={{ height: '100%' }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <TrendingUp
                sx={{ fontSize: '3rem', color: 'primary.main', mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user.progress}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Training Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={user.progress}
                sx={{ mt: 1, borderRadius: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PlayArrow sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Quick Actions
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  startIcon={scanData.scanning ? <Refresh className="spin" /> : <Security />}
                  onClick={handleStartScan}
                  disabled={scanData.scanning}
                  sx={{ minWidth: 200 }}
                >
                  {scanData.scanning ? 'Scanning...' : 'Run Security Scan'}
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<School />}
                  onClick={() => {/* Navigate to training */}}
                >
                  Continue Training
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Code />}
                  onClick={() => {/* Navigate to VibeSafe */}}
                >
                  VibeSafe CLI
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Analytics />}
                  onClick={() => {/* Navigate to analytics */}}
                >
                  View Analytics
                </Button>
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <Timeline sx={{ mr: 1, verticalAlign: 'middle' }} />
                Security Trends (6 Weeks)
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={securityTrendData} options={chartOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            sx={{ height: '100%' }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <BugReport sx={{ mr: 1, verticalAlign: 'middle' }} />
                Vulnerability Types
              </Typography>
              <Box sx={{ height: 250 }}>
                <Doughnut data={vulnerabilityTypeData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Training Progress Chart */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <School sx={{ mr: 1, verticalAlign: 'middle' }} />
                Training Module Progress
              </Typography>
              <Box sx={{ height: 250 }}>
                <Bar data={trainingProgressData} options={chartOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            sx={{ height: '100%' }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Activity
              </Typography>
              
              <List sx={{ maxHeight: 250, overflow: 'auto' }}>
                {recentActivity.map((activity, index) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    }}
                  >
                    <ListItemIcon>
                      {getActivityIcon(activity.type, activity.severity)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.title}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            {activity.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
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

      {/* CSS for spinning animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Container>
  );
};

export default Dashboard;
