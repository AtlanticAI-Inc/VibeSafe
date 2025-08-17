import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Switch,
  FormControlLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
} from '@mui/material';
import {
  AdminPanelSettings,
  People,
  School,
  Analytics,
  Settings,
  Security,
  Notifications,
  Edit,
  Delete,
  Add,
  Visibility,
  Block,
  CheckCircle,
  Warning,
  Error,
  Info,
  Download,
  Upload,
  Refresh,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

const MotionCard = motion(Card);

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userDialog, setUserDialog] = useState({ open: false, user: null, mode: 'view' });
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    autoBackup: true,
    debugMode: false,
    maxUsers: 1000,
    sessionTimeout: 30,
  });

  // Mock data
  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'User',
      status: 'Active',
      lastLogin: '2024-01-15 14:30',
      modules: 8,
      certificates: 5,
      progress: 75,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2024-01-15 16:45',
      modules: 12,
      certificates: 10,
      progress: 100,
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2024-01-10 09:15',
      modules: 3,
      certificates: 1,
      progress: 25,
    },
    {
      id: 4,
      name: 'Emily Chen',
      email: 'emily.chen@company.com',
      role: 'Instructor',
      status: 'Active',
      lastLogin: '2024-01-15 11:20',
      modules: 15,
      certificates: 12,
      progress: 95,
    },
  ];

  const systemStats = {
    totalUsers: 247,
    activeUsers: 189,
    totalModules: 12,
    completedAssessments: 1543,
    certificatesIssued: 892,
    averageProgress: 68,
    systemUptime: '99.8%',
    storageUsed: '2.4 GB',
  };

  const recentActivity = [
    {
      id: 1,
      type: 'user_registration',
      message: 'New user registered: alex.brown@company.com',
      timestamp: '5 minutes ago',
      severity: 'info',
    },
    {
      id: 2,
      type: 'certificate_issued',
      message: 'Certificate issued to John Smith for OWASP Top 10',
      timestamp: '12 minutes ago',
      severity: 'success',
    },
    {
      id: 3,
      type: 'system_warning',
      message: 'High memory usage detected on server 2',
      timestamp: '25 minutes ago',
      severity: 'warning',
    },
    {
      id: 4,
      type: 'module_completed',
      message: '5 users completed Secure Coding module today',
      timestamp: '1 hour ago',
      severity: 'success',
    },
    {
      id: 5,
      type: 'security_alert',
      message: 'Failed login attempts from suspicious IP',
      timestamp: '2 hours ago',
      severity: 'error',
    },
  ];

  const usageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Active Users',
        data: [145, 165, 189, 201, 223, 247],
        borderColor: '#00bcd4',
        backgroundColor: 'rgba(0, 188, 212, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Completed Modules',
        data: [89, 102, 156, 189, 234, 267],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const moduleUsageData = {
    labels: ['OWASP Top 10', 'Secure Coding', 'Cryptography', 'Authentication', 'API Security'],
    datasets: [{
      data: [89, 76, 45, 67, 23],
      backgroundColor: [
        '#00bcd4',
        '#4caf50',
        '#ff9800',
        '#9c27b0',
        '#f44336',
      ],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          font: { family: '"Roboto Mono", monospace' },
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
          font: { family: '"Roboto Mono", monospace' },
        },
      },
    },
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleUserAction = (user, action) => {
    setUserDialog({ open: true, user, mode: action });
  };

  const closeUserDialog = () => {
    setUserDialog({ open: false, user: null, mode: 'view' });
  };

  const handleSettingChange = (setting) => (event) => {
    setSystemSettings(prev => ({
      ...prev,
      [setting]: event.target.checked !== undefined ? event.target.checked : event.target.value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Suspended': return 'warning';
      default: return 'default';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Instructor': return 'warning';
      case 'User': return 'primary';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'error': return <Error sx={{ color: '#f44336' }} />;
      case 'warning': return <Warning sx={{ color: '#ff9800' }} />;
      case 'success': return <CheckCircle sx={{ color: '#4caf50' }} />;
      case 'info': return <Info sx={{ color: '#2196f3' }} />;
      default: return <Info />;
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
              ⚙️ Admin Panel
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Platform management and system administration
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<Download />}>
              Export Data
            </Button>
            <Button variant="outlined" startIcon={<Refresh />}>
              Refresh
            </Button>
          </Box>
        </Box>

        {/* System Status Alert */}
        {systemSettings.maintenanceMode && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Maintenance Mode Active:</strong> The system is currently in maintenance mode. 
              Users may experience limited functionality.
            </Typography>
          </Alert>
        )}

        {/* Tabs */}
        <Card sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 64,
              },
            }}
          >
            <Tab icon={<Analytics />} label="Overview" iconPosition="start" />
            <Tab icon={<People />} label="User Management" iconPosition="start" />
            <Tab icon={<School />} label="Content Management" iconPosition="start" />
            <Tab icon={<Settings />} label="System Settings" iconPosition="start" />
            <Tab icon={<Security />} label="Security & Logs" iconPosition="start" />
          </Tabs>
        </Card>
      </motion.div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Grid container spacing={3}>
          {/* System Stats Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <People sx={{ fontSize: '3rem', color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {systemStats.totalUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
                <Chip 
                  label={`${systemStats.activeUsers} active`} 
                  color="success" 
                  size="small" 
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
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <School sx={{ fontSize: '3rem', color: 'success.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {systemStats.certificatesIssued}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Certificates Issued
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                  +12 this week
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Analytics sx={{ fontSize: '3rem', color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {systemStats.averageProgress}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Average Progress
                </Typography>
                <Typography variant="caption" color="success.main" sx={{ display: 'block', mt: 1 }}>
                  +3% from last month
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Security sx={{ fontSize: '3rem', color: 'info.main', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {systemStats.systemUptime}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  System Uptime
                </Typography>
                <Chip 
                  label="Healthy" 
                  color="success" 
                  size="small" 
                  sx={{ mt: 1 }} 
                />
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} lg={8}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Platform Usage Trends
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Line data={usageData} options={chartOptions} />
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
                  Module Popularity
                </Typography>
                <Box sx={{ height: 250 }}>
                  <Doughnut data={moduleUsageData} options={doughnutOptions} />
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Recent System Activity
                </Typography>
                
                <List>
                  {recentActivity.map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemIcon>
                        {getSeverityIcon(activity.severity)}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.message}
                        secondary={activity.timestamp}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      )}

      {/* User Management Tab */}
      {activeTab === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    User Management
                  </Typography>
                  <Button variant="contained" startIcon={<Add />}>
                    Add User
                  </Button>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Progress</TableCell>
                        <TableCell align="right">Modules</TableCell>
                        <TableCell align="right">Last Login</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                                {user.name.charAt(0)}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {user.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {user.email}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.role}
                              size="small"
                              color={getRoleColor(user.role)}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={user.status}
                              size="small"
                              color={getStatusColor(user.status)}
                            />
                          </TableCell>
                          <TableCell align="right">{user.progress}%</TableCell>
                          <TableCell align="right">{user.modules}</TableCell>
                          <TableCell align="right">{user.lastLogin}</TableCell>
                          <TableCell align="right">
                            <IconButton 
                              size="small" 
                              onClick={() => handleUserAction(user, 'view')}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              size="small" 
                              onClick={() => handleUserAction(user, 'edit')}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <Delete />
                            </IconButton>
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
      )}

      {/* System Settings Tab */}
      {activeTab === 3 && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  System Configuration
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onChange={handleSettingChange('maintenanceMode')}
                        color="warning"
                      />
                    }
                    label="Maintenance Mode"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemSettings.userRegistration}
                        onChange={handleSettingChange('userRegistration')}
                        color="primary"
                      />
                    }
                    label="Allow User Registration"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemSettings.emailNotifications}
                        onChange={handleSettingChange('emailNotifications')}
                        color="primary"
                      />
                    }
                    label="Email Notifications"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemSettings.autoBackup}
                        onChange={handleSettingChange('autoBackup')}
                        color="primary"
                      />
                    }
                    label="Automatic Backups"
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={systemSettings.debugMode}
                        onChange={handleSettingChange('debugMode')}
                        color="error"
                      />
                    }
                    label="Debug Mode"
                  />
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <MotionCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  Platform Limits
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <TextField
                    fullWidth
                    label="Maximum Users"
                    type="number"
                    value={systemSettings.maxUsers}
                    onChange={handleSettingChange('maxUsers')}
                    helperText="Maximum number of registered users"
                  />
                  
                  <TextField
                    fullWidth
                    label="Session Timeout (minutes)"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={handleSettingChange('sessionTimeout')}
                    helperText="User session timeout in minutes"
                  />
                  
                  <TextField
                    fullWidth
                    label="Storage Limit"
                    value="10 GB"
                    disabled
                    helperText="Maximum storage allocation"
                  />
                </Box>
              </CardContent>
            </MotionCard>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
              <Button variant="outlined">
                Reset to Defaults
              </Button>
              <Button variant="contained">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* User Detail Dialog */}
      <Dialog
        open={userDialog.open}
        onClose={closeUserDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {userDialog.mode === 'edit' ? 'Edit User' : 'User Details'}
        </DialogTitle>
        <DialogContent>
          {userDialog.user && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={userDialog.user.name}
                    disabled={userDialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={userDialog.user.email}
                    disabled={userDialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Role"
                    value={userDialog.user.role}
                    disabled={userDialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Status"
                    value={userDialog.user.status}
                    disabled={userDialog.mode === 'view'}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Progress: {userDialog.user.progress}% • 
                    Modules: {userDialog.user.modules} • 
                    Certificates: {userDialog.user.certificates}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUserDialog}>
            {userDialog.mode === 'edit' ? 'Cancel' : 'Close'}
          </Button>
          {userDialog.mode === 'edit' && (
            <Button variant="contained" onClick={closeUserDialog}>
              Save Changes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminPanel;
