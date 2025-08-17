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
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Button
} from '@mui/material';
import {
  TrendingUp,
  School,
  Timer,
  EmojiEvents,
  Speed,
  Analytics,
  Leaderboard,
  Refresh,
  Download,
  Share,
  Star,
  CheckCircle,
  PlayCircleOutline,
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import apiService from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const MotionCard = motion(Card);

const ProgressDashboard = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE', '#8884d8'];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [progressResponse, analyticsResponse, leaderboardResponse] = await Promise.all([
        apiService.get('/progress'),
        apiService.get('/progress/analytics'),
        apiService.get('/progress/leaderboard?timeframe=30d')
      ]);

      setProgressData(progressResponse.data);
      setAnalyticsData(analyticsResponse.data);
      setLeaderboard(leaderboardResponse.data.leaderboard);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Loading your progress...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              📊 Learning Progress Dashboard
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Track your cybersecurity learning journey
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={refreshing ? <CircularProgress size={20} /> : <Refresh />}
              onClick={handleRefresh}
              disabled={refreshing}
              variant="outlined"
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button startIcon={<Download />} variant="outlined">
              Export
            </Button>
            <Button startIcon={<Share />} variant="outlined">
              Share
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {analyticsData?.overview?.modulesCompleted || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Modules Completed
                  </Typography>
                </Box>
                <School sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            sx={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {Math.round((analyticsData?.overview?.totalTimeSpent || 0) / 60)}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Hours Studied
                  </Typography>
                </Box>
                <Timer sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {analyticsData?.overview?.averageScore || 0}%
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Average Score
                  </Typography>
                </Box>
                <TrendingUp sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            sx={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    {analyticsData?.overview?.currentStreak || 0}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Day Streak
                  </Typography>
                </Box>
                <EmojiEvents sx={{ fontSize: 40, opacity: 0.8 }} />
              </Box>
            </CardContent>
          </MotionCard>
        </Grid>
      </Grid>

      {/* Tabs for different views */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              fontWeight: 600,
              textTransform: 'none',
            },
          }}
        >
          <Tab icon={<Analytics />} label="Analytics" />
          <Tab icon={<Leaderboard />} label="Leaderboard" />
          <Tab icon={<EmojiEvents />} label="Achievements" />
          <Tab icon={<TimelineIcon />} label="Activity" />
        </Tabs>
      </Card>

      {/* Analytics Tab */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* Category Progress */}
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  📊 Progress by Category
                </Typography>
                
                {analyticsData?.categoryBreakdown?.length > 0 ? (
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData.categoryBreakdown.map(cat => ({
                            name: cat.category,
                            value: cat.completed,
                            total: cat.started
                          }))}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {analyticsData.categoryBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [
                          `${value}/${props.payload.total} completed`, 
                          name
                        ]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Alert severity="info">Start learning to see your progress breakdown!</Alert>
                )}
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Learning Speed */}
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  ⚡ Learning Velocity
                </Typography>
                
                {analyticsData?.categoryBreakdown?.length > 0 ? (
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.categoryBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#4facfe" name="Completed" />
                        <Bar dataKey="started" fill="#00f2fe" name="In Progress" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Alert severity="info">Complete some modules to see your learning velocity!</Alert>
                )}
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Skills Radar */}
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  🎯 Skills Assessment
                </Typography>
                
                {analyticsData?.categoryBreakdown?.length > 0 ? (
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={analyticsData.categoryBreakdown}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={0} domain={[0, 100]} />
                        <Radar
                          name="Average Score"
                          dataKey="averageScore"
                          stroke="#667eea"
                          fill="#667eea"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </Box>
                ) : (
                  <Alert severity="info">Complete quizzes and labs to see your skills assessment!</Alert>
                )}
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Module Progress Details */}
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  📚 Module Progress
                </Typography>
                
                {progressData?.moduleProgress?.length > 0 ? (
                  <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {progressData.moduleProgress.map((module, index) => (
                      <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {module.moduleId?.title || 'Unknown Module'}
                          </Typography>
                          <Chip 
                            label={module.status} 
                            color={module.status === 'completed' ? 'success' : 'primary'} 
                            size="small"
                            icon={module.status === 'completed' ? <CheckCircle /> : <PlayCircleOutline />}
                          />
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress: {module.completedLessons?.filter(l => l.completed).length || 0}/
                            {module.moduleId?.lessons?.length || 0} lessons
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Score: {module.totalScore || 0}
                          </Typography>
                        </Box>
                        
                        <LinearProgress 
                          variant="determinate" 
                          value={module.completionPercentage || 0}
                          sx={{ borderRadius: 1 }}
                        />
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Alert severity="info">Start a module to track your progress here!</Alert>
                )}
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 1 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              🏆 Global Leaderboard (Last 30 Days)
            </Typography>
            
            {leaderboard.length > 0 ? (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Rank</strong></TableCell>
                      <TableCell><strong>User</strong></TableCell>
                      <TableCell align="right"><strong>Score</strong></TableCell>
                      <TableCell align="right"><strong>Modules</strong></TableCell>
                      <TableCell align="right"><strong>Hours</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {leaderboard.map((entry, index) => (
                      <TableRow 
                        key={entry.userId} 
                        sx={{ 
                          backgroundColor: entry.userId === user?.id ? 'action.selected' : 'inherit',
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {entry.rank === 1 && <EmojiEvents sx={{ color: 'gold' }} />}
                            {entry.rank === 2 && <EmojiEvents sx={{ color: 'silver' }} />}
                            {entry.rank === 3 && <EmojiEvents sx={{ color: '#CD7F32' }} />}
                            {entry.rank}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>
                              {entry.name?.charAt(0).toUpperCase()}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: entry.userId === user?.id ? 600 : 400 }}>
                                {entry.name} {entry.userId === user?.id && '(You)'}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {entry.totalScore}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">{entry.modulesCompleted}</TableCell>
                        <TableCell align="right">{Math.round(entry.totalTimeSpent / 60)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Alert severity="info">Complete some modules to appear on the leaderboard!</Alert>
            )}
          </CardContent>
        </MotionCard>
      )}

      {/* Achievements Tab */}
      {activeTab === 2 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              🏅 Your Achievements
            </Typography>
            
            {progressData?.achievements?.length > 0 ? (
              <Grid container spacing={3} sx={{ mt: 1 }}>
                {progressData.achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ 
                      background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', 
                      color: 'white',
                      position: 'relative',
                      overflow: 'visible'
                    }}>
                      <CardContent>
                        <Box sx={{ position: 'absolute', top: -10, right: -10 }}>
                          <EmojiEvents sx={{ fontSize: 40, color: 'gold' }} />
                        </Box>
                        
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          {achievement.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                          {achievement.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label={`${achievement.points} points`}
                            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                          />
                          <Typography variant="caption">
                            {new Date(achievement.earnedAt).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">Complete modules and quizzes to earn achievements!</Alert>
            )}
          </CardContent>
        </MotionCard>
      )}

      {/* Recent Activity Tab */}
      {activeTab === 3 && (
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              📈 Recent Activity
            </Typography>
            
            {analyticsData?.recentActivity?.length > 0 ? (
              <Box sx={{ mt: 2 }}>
                {analyticsData.recentActivity.map((activity, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2, 
                      p: 2, 
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'action.hover' }
                    }}
                  >
                    <Avatar sx={{ 
                      bgcolor: activity.status === 'completed' ? 'success.main' : 'primary.main',
                      width: 40,
                      height: 40 
                    }}>
                      {activity.status === 'completed' ? <CheckCircle /> : <PlayCircleOutline />}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {activity.moduleTitle}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.category} • Progress: {activity.progress} lessons
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Last accessed: {new Date(activity.lastAccessed).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {Math.round(activity.timeSpent / 60)}m
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        time spent
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">Start learning to see your recent activity!</Alert>
            )}
          </CardContent>
        </MotionCard>
      )}
    </Container>
  );
};

export default ProgressDashboard;
