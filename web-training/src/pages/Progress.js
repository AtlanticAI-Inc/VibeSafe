import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  EmojiEvents,
  School,
  Security,
  CheckCircle,
  Schedule,
  Assignment,
  Star,
  Download,
  Share,
  CalendarToday,
  Person,
  Group,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Radar, Doughnut, Bar } from 'react-chartjs-2';
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
  RadialLinearScale,
} from 'chart.js';

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
  BarElement,
  RadialLinearScale
);

const MotionCard = motion(Card);

const Progress = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Mock data
  const userStats = {
    totalModules: 12,
    completedModules: 8,
    inProgressModules: 3,
    notStartedModules: 1,
    totalHours: 45.5,
    certificates: 6,
    currentStreak: 12,
    longestStreak: 28,
    skillLevel: 'Advanced',
    rank: 'Security Expert',
    points: 2840,
    nextLevelPoints: 3000,
  };

  const skillsData = {
    labels: [
      'Web Security',
      'Cryptography',
      'Authentication',
      'API Security',
      'Database Security',
      'Cloud Security',
      'Incident Response',
      'Secure Coding'
    ],
    datasets: [{
      label: 'Skill Level',
      data: [95, 75, 88, 60, 70, 45, 55, 90],
      backgroundColor: 'rgba(0, 188, 212, 0.2)',
      borderColor: '#00bcd4',
      pointBackgroundColor: '#00bcd4',
      pointBorderColor: '#ffffff',
      pointHoverBackgroundColor: '#ffffff',
      pointHoverBorderColor: '#00bcd4',
      borderWidth: 2,
    }]
  };

  const learningProgressData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Hours Studied',
        data: [5, 8, 12, 15, 10, 18, 22, 25, 20, 24, 28, 30],
        borderColor: '#00bcd4',
        backgroundColor: 'rgba(0, 188, 212, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Modules Completed',
        data: [1, 1, 2, 2, 1, 3, 3, 4, 2, 3, 4, 5],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const certificatesData = {
    labels: ['OWASP Top 10', 'Secure Coding', 'Cryptography', 'Authentication', 'Database Security', 'API Security'],
    datasets: [{
      data: [100, 100, 100, 100, 100, 85],
      backgroundColor: [
        '#4caf50',
        '#4caf50', 
        '#4caf50',
        '#4caf50',
        '#4caf50',
        '#ff9800',
      ],
      borderWidth: 0,
    }]
  };

  const weeklyActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Study Hours',
      data: [2, 3, 1, 4, 3, 5, 2],
      backgroundColor: 'rgba(0, 188, 212, 0.6)',
      borderColor: '#00bcd4',
      borderWidth: 1,
    }]
  };

  const achievements = [
    {
      id: 1,
      title: 'Security Expert',
      description: 'Completed 8 security modules',
      icon: '🛡️',
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'Code Warrior',
      description: 'Fixed 50+ vulnerabilities',
      icon: '⚔️',
      earned: true,
      date: '2024-01-05'
    },
    {
      id: 3,
      title: 'Streak Master',
      description: 'Maintained 30-day learning streak',
      icon: '🔥',
      earned: false,
      progress: 40
    },
    {
      id: 4,
      title: 'Mentor',
      description: 'Helped 10 team members',
      icon: '👥',
      earned: false,
      progress: 70
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Completed OWASP Top 10 Module',
      timestamp: '2 hours ago',
      points: 500,
      type: 'completion'
    },
    {
      id: 2,
      action: 'Scored 95% on Security Quiz',
      timestamp: '1 day ago',
      points: 200,
      type: 'achievement'
    },
    {
      id: 3,
      action: 'Fixed SQL Injection Vulnerability',
      timestamp: '2 days ago',
      points: 150,
      type: 'practical'
    },
    {
      id: 4,
      action: 'Started Cryptography Module',
      timestamp: '3 days ago',
      points: 50,
      type: 'start'
    }
  ];

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

  const radarOptions = {
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
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.2)' },
        grid: { color: 'rgba(255, 255, 255, 0.2)' },
        pointLabels: { color: '#ffffff', font: { size: 12 } },
        ticks: { color: '#ffffff', backdropColor: 'transparent' },
        min: 0,
        max: 100,
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'completion': return <CheckCircle sx={{ color: 'success.main' }} />;
      case 'achievement': return <Star sx={{ color: 'warning.main' }} />;
      case 'practical': return <Security sx={{ color: 'primary.main' }} />;
      case 'start': return <School sx={{ color: 'info.main' }} />;
      default: return <Assignment />;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
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
              📊 Learning Progress & Analytics
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Track your security training journey and skill development
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
              >
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" startIcon={<Download />}>
              Export Report
            </Button>
            <Button variant="outlined" startIcon={<Share />}>
              Share Progress
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Overview Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            sx={{ textAlign: 'center', height: '100%' }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <School sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {userStats.completedModules}/{userStats.totalModules}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modules Completed
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(userStats.completedModules / userStats.totalModules) * 100}
                sx={{ mt: 2, borderRadius: 1 }}
              />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            sx={{ textAlign: 'center', height: '100%' }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: 'success.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <EmojiEvents sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {userStats.certificates}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Certificates Earned
              </Typography>
              <Chip label="Security Expert" color="success" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            sx={{ textAlign: 'center', height: '100%' }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: 'warning.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <Schedule sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {userStats.totalHours}h
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Study Time
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                {userStats.currentStreak} day streak 🔥
              </Typography>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            sx={{ textAlign: 'center', height: '100%' }}
          >
            <CardContent>
              <Avatar sx={{ bgcolor: 'info.main', mx: 'auto', mb: 2, width: 56, height: 56 }}>
                <TrendingUp sx={{ fontSize: '2rem' }} />
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {userStats.points}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Points
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  {userStats.nextLevelPoints - userStats.points} to next level
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(userStats.points / userStats.nextLevelPoints) * 100}
                  sx={{ mt: 0.5, borderRadius: 1 }}
                />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Charts Section */}
        <Grid item xs={12} lg={8}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Analytics sx={{ mr: 1, verticalAlign: 'middle' }} />
                Learning Progress Over Time
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={learningProgressData} options={chartOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            sx={{ height: '100%' }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Security sx={{ mr: 1, verticalAlign: 'middle' }} />
                Weekly Activity
              </Typography>
              <Box sx={{ height: 250 }}>
                <Bar data={weeklyActivityData} options={chartOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Skills Radar Chart */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <Star sx={{ mr: 1, verticalAlign: 'middle' }} />
                Skill Assessment
              </Typography>
              <Box sx={{ height: 300 }}>
                <Radar data={skillsData} options={radarOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Certificate Progress */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <EmojiEvents sx={{ mr: 1, verticalAlign: 'middle' }} />
                Certificate Progress
              </Typography>
              <Box sx={{ height: 300 }}>
                <Doughnut data={certificatesData} options={doughnutOptions} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🏆 Achievements & Badges
              </Typography>
              
              <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                {achievements.map((achievement) => (
                  <Box
                    key={achievement.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      mb: 2,
                      borderRadius: 1,
                      backgroundColor: achievement.earned 
                        ? 'rgba(76, 175, 80, 0.1)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      border: achievement.earned 
                        ? '1px solid rgba(76, 175, 80, 0.3)'
                        : '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Box sx={{ fontSize: '2rem', mr: 2, opacity: achievement.earned ? 1 : 0.5 }}>
                      {achievement.icon}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.description}
                      </Typography>
                      {!achievement.earned && achievement.progress && (
                        <Box sx={{ mt: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={achievement.progress}
                            sx={{ borderRadius: 1 }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {achievement.progress}% complete
                          </Typography>
                        </Box>
                      )}
                      {achievement.earned && (
                        <Typography variant="caption" color="success.main">
                          Earned on {achievement.date}
                        </Typography>
                      )}
                    </Box>
                    {achievement.earned && (
                      <CheckCircle sx={{ color: 'success.main', ml: 1 }} />
                    )}
                  </Box>
                ))}
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                <CalendarToday sx={{ mr: 1, verticalAlign: 'middle' }} />
                Recent Activity
              </Typography>
              
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {recentActivity.map((activity) => (
                  <ListItem
                    key={activity.id}
                    sx={{
                      mb: 1,
                      borderRadius: 1,
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <ListItemIcon>
                      {getActivityIcon(activity.type)}
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.action}
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            {activity.timestamp}
                          </Typography>
                          <Chip
                            label={`+${activity.points} pts`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </MotionCard>
        </Grid>

        {/* Detailed Statistics Table */}
        <Grid item xs={12}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📋 Module Performance Summary
              </Typography>
              
              <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Module</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Progress</TableCell>
                      <TableCell align="right">Score</TableCell>
                      <TableCell align="right">Time Spent</TableCell>
                      <TableCell align="right">Certificate</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[
                      { name: 'OWASP Top 10', status: 'Completed', progress: 100, score: 95, time: '4h 30m', cert: true },
                      { name: 'Secure Coding', status: 'Completed', progress: 100, score: 88, time: '6h 15m', cert: true },
                      { name: 'Cryptography', status: 'In Progress', progress: 75, score: 92, time: '5h 45m', cert: false },
                      { name: 'Authentication', status: 'In Progress', progress: 60, score: 85, time: '3h 20m', cert: false },
                      { name: 'API Security', status: 'Not Started', progress: 0, score: 0, time: '0h', cert: false },
                    ].map((module, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Security sx={{ mr: 1, color: 'primary.main' }} />
                            {module.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={module.status}
                            size="small"
                            color={
                              module.status === 'Completed' ? 'success' :
                              module.status === 'In Progress' ? 'warning' : 'default'
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <LinearProgress
                              variant="determinate"
                              value={module.progress}
                              sx={{ width: 60, mr: 1, borderRadius: 1 }}
                            />
                            {module.progress}%
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          {module.score > 0 ? `${module.score}%` : '-'}
                        </TableCell>
                        <TableCell align="right">{module.time}</TableCell>
                        <TableCell align="right">
                          {module.cert ? (
                            <CheckCircle sx={{ color: 'success.main' }} />
                          ) : (
                            '-'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Progress;
