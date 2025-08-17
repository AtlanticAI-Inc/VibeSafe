import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
  Avatar,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  School,
  PlayArrow,
  CheckCircle,
  Lock,
  Star,
  Search,
  FilterList,
  Security,
  Code,
  VpnKey,
  Api,
  Storage,
  Cloud,
  BugReport,
  Timeline,
  Assessment,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTraining } from '../context/TrainingContext';
import apiService from '../services/apiService';

const MotionCard = motion(Card);

const TrainingModules = () => {
  const navigate = useNavigate();
  // const { user, saveProgress } = useTraining(); // TODO: Use when implementing authentication
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState(0);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping for modules
  const iconMapping = {
    'Web Security': Security,
    'Secure Coding': Code,
    'Development': Code,
    'Cryptography': VpnKey,
    'Identity & Access': VpnKey,
    'API Security': Api,
    'Database': Storage,
    'Cloud Security': Cloud,
    'Testing': BugReport,
    'Operations': Timeline,
  };

  // Color mapping for modules
  const colorMapping = {
    'Web Security': '#4caf50',
    'Secure Coding': '#ff9800',
    'Development': '#ff9800',
    'Cryptography': '#2196f3',
    'Identity & Access': '#9c27b0',
    'API Security': '#607d8b',
    'Database': '#795548',
    'Cloud Security': '#3f51b5',
    'Testing': '#f44336',
    'Operations': '#ff5722',
  };

  // Fetch modules from API
  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getModules();
        
        // Transform API data to match component expectations
        const transformedModules = response.data.map(module => ({
          id: module._id || module.id,
          title: module.title,
          description: module.description,
          category: module.category,
          level: module.difficulty || 'Intermediate',
          duration: `${Math.round(module.estimatedTime / 60)} hours`,
          progress: 0, // TODO: Get from user progress API
          status: 'available', // TODO: Determine based on user progress
          rating: module.rating?.average || 4.5,
          icon: iconMapping[module.category] || Security,
          color: colorMapping[module.category] || '#4caf50',
          lessons: module.lessons?.length || 0,
          hands_on: module.type === 'Hands-on' || module.type === 'Interactive',
          certificate: module.settings?.certificateEnabled || true,
          totalPoints: module.totalPoints || 0,
          completionRate: module.completionRatePercent || 0
        }));
        
        setModules(transformedModules);
      } catch (err) {
        setError(err.message || 'Failed to load modules');
        console.error('Error fetching modules:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, []);

  const fallbackModules = [
    {
      id: 'owasp-top-10',
      title: 'OWASP Top 10',
      description: 'Learn about the most critical web application security risks and how to prevent them.',
      category: 'Web Security',
      level: 'Beginner',
      duration: '4 hours',
      progress: 100,
      status: 'completed',
      rating: 4.8,
      icon: Security,
      color: '#4caf50',
      lessons: 10,
      hands_on: true,
      certificate: true,
    },
    {
      id: 'secure-coding',
      title: 'Secure Coding Practices',
      description: 'Master secure coding techniques and best practices for multiple programming languages.',
      category: 'Development',
      level: 'Intermediate',
      duration: '6 hours',
      progress: 85,
      status: 'in_progress',
      rating: 4.9,
      icon: Code,
      color: '#ff9800',
      lessons: 15,
      hands_on: true,
      certificate: true,
    },
    {
      id: 'cryptography',
      title: 'Cryptography Fundamentals',
      description: 'Understanding encryption, hashing, digital signatures, and cryptographic protocols.',
      category: 'Cryptography',
      level: 'Intermediate',
      duration: '8 hours',
      progress: 25,
      status: 'in_progress',
      rating: 4.7,
      icon: VpnKey,
      color: '#2196f3',
      lessons: 12,
      hands_on: true,
      certificate: true,
    },
    {
      id: 'authentication',
      title: 'Authentication & Access Control',
      description: 'Implement secure authentication systems and access control mechanisms.',
      category: 'Identity & Access',
      level: 'Intermediate',
      duration: '5 hours',
      progress: 60,
      status: 'in_progress',
      rating: 4.6,
      icon: VpnKey,
      color: '#9c27b0',
      lessons: 8,
      hands_on: true,
      certificate: true,
    },
    {
      id: 'api-security',
      title: 'API Security',
      description: 'Secure your APIs with proper authentication, authorization, and validation techniques.',
      category: 'API Security',
      level: 'Advanced',
      duration: '7 hours',
      progress: 0,
      status: 'locked',
      rating: 4.9,
      icon: Api,
      color: '#607d8b',
      lessons: 14,
      hands_on: true,
      certificate: true,
      prerequisite: 'secure-coding',
    },
    {
      id: 'database-security',
      title: 'Database Security',
      description: 'Protect your databases from SQL injection and other common attack vectors.',
      category: 'Database',
      level: 'Intermediate',
      duration: '4 hours',
      progress: 0,
      status: 'available',
      rating: 4.5,
      icon: Storage,
      color: '#795548',
      lessons: 9,
      hands_on: true,
      certificate: true,
    },
    {
      id: 'cloud-security',
      title: 'Cloud Security Essentials',
      description: 'Secure cloud infrastructures and understand shared responsibility models.',
      category: 'Cloud Security',
      level: 'Advanced',
      duration: '10 hours',
      progress: 0,
      status: 'locked',
      rating: 4.8,
      icon: Cloud,
      color: '#3f51b5',
      lessons: 18,
      hands_on: true,
      certificate: true,
      prerequisite: 'authentication',
    },
    {
      id: 'penetration-testing',
      title: 'Penetration Testing Basics',
      description: 'Learn ethical hacking techniques and vulnerability assessment methodologies.',
      category: 'Testing',
      level: 'Advanced',
      duration: '12 hours',
      progress: 0,
      status: 'locked',
      rating: 4.7,
      icon: BugReport,
      color: '#f44336',
      lessons: 20,
      hands_on: true,
      certificate: true,
      prerequisite: 'owasp-top-10',
    },
    {
      id: 'incident-response',
      title: 'Security Incident Response',
      description: 'Develop skills to detect, analyze, and respond to security incidents effectively.',
      category: 'Operations',
      level: 'Advanced',
      duration: '6 hours',
      progress: 0,
      status: 'available',
      rating: 4.6,
      icon: Timeline,
      color: '#ff5722',
      lessons: 11,
      hands_on: true,
      certificate: true,
    },
  ];

  const categories = ['all', 'Web Security', 'Development', 'Cryptography', 'Identity & Access', 'API Security', 'Database', 'Cloud Security', 'Testing', 'Operations'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterLevel === 'all' || module.level === filterLevel;
    const matchesCategory = filterCategory === 'all' || module.category === filterCategory;
    
    if (activeTab === 0) return matchesSearch && matchesLevel && matchesCategory; // All
    if (activeTab === 1) return matchesSearch && matchesLevel && matchesCategory && module.status === 'in_progress'; // In Progress
    if (activeTab === 2) return matchesSearch && matchesLevel && matchesCategory && module.status === 'completed'; // Completed
    if (activeTab === 3) return matchesSearch && matchesLevel && matchesCategory && module.status === 'available'; // Available
    
    return false;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'available': return 'info';
      case 'locked': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in_progress': return 'In Progress';
      case 'available': return 'Available';
      case 'locked': return 'Locked';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle />;
      case 'in_progress': return <PlayArrow />;
      case 'available': return <School />;
      case 'locked': return <Lock />;
      default: return <School />;
    }
  };

  const handleModuleClick = (module) => {
    if (module.status === 'locked') return;
    navigate(`/modules/${module.id}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Show loading state
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              Loading training modules...
            </Typography>
          </Box>
        </Box>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Error Loading Modules
          </Typography>
          <Typography variant="body2">
            {error}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => window.location.reload()}
              sx={{ mr: 1 }}
            >
              Retry
            </Button>
          </Box>
        </Alert>
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
            🎓 Security Training Modules
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Master cybersecurity through hands-on interactive courses
          </Typography>
        </Box>

        {/* Search and Filters */}
        <Card sx={{ mb: 4, p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search modules..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Level</InputLabel>
                <Select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  label="Level"
                >
                  {levels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level === 'all' ? 'All Levels' : level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setSearchTerm('');
                  setFilterLevel('all');
                  setFilterCategory('all');
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Tabs */}
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
            <Tab label={`All (${modules.length})`} />
            <Tab label={`In Progress (${modules.filter(m => m.status === 'in_progress').length})`} />
            <Tab label={`Completed (${modules.filter(m => m.status === 'completed').length})`} />
            <Tab label={`Available (${modules.filter(m => m.status === 'available').length})`} />
          </Tabs>
        </Card>
      </motion.div>

      {/* Modules Grid */}
      <Grid container spacing={3}>
        {filteredModules.map((module, index) => {
          const IconComponent = module.icon;
          
          return (
            <Grid item xs={12} sm={6} lg={4} key={module.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: module.status !== 'locked' ? 'pointer' : 'not-allowed',
                  opacity: module.status === 'locked' ? 0.6 : 1,
                  '&:hover': module.status !== 'locked' ? {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 188, 212, 0.15)',
                  } : {},
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleModuleClick(module)}
                whileHover={module.status !== 'locked' ? { scale: 1.02 } : {}}
              >
                {/* Header with Icon and Status */}
                <Box
                  sx={{
                    p: 2,
                    background: `linear-gradient(135deg, ${module.color}20, ${module.color}10)`,
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: module.color,
                        mr: 2,
                        width: 48,
                        height: 48,
                      }}
                    >
                      <IconComponent />
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {module.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          size="small"
                          label={getStatusText(module.status)}
                          color={getStatusColor(module.status)}
                          icon={getStatusIcon(module.status)}
                        />
                        <Chip
                          size="small"
                          label={module.level}
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  </Box>

                  {/* Progress Bar */}
                  {module.progress > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {module.progress}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={module.progress}
                        sx={{
                          borderRadius: 1,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: module.color,
                          },
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 40 }}
                  >
                    {module.description}
                  </Typography>

                  {/* Module Details */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    <Chip
                      size="small"
                      label={module.category}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={`${module.lessons} lessons`}
                      variant="outlined"
                    />
                    <Chip
                      size="small"
                      label={module.duration}
                      variant="outlined"
                    />
                  </Box>

                  {/* Features */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    {module.hands_on && (
                      <Chip
                        size="small"
                        label="🛠️ Hands-on"
                        color="success"
                        variant="outlined"
                      />
                    )}
                    {module.certificate && (
                      <Chip
                        size="small"
                        label="🏆 Certificate"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Star sx={{ color: '#ffb400', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {module.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      (4.2k reviews)
                    </Typography>
                  </Box>

                  {/* Prerequisites */}
                  {module.prerequisite && (
                    <Box sx={{ mt: 2, p: 1, backgroundColor: 'warning.dark', borderRadius: 1 }}>
                      <Typography variant="caption" color="warning.contrastText">
                        📚 Requires: {modules.find(m => m.id === module.prerequisite)?.title || 'Previous module'}
                      </Typography>
                    </Box>
                  )}
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant={module.status === 'completed' ? 'outlined' : 'contained'}
                    color={module.status === 'completed' ? 'success' : 'primary'}
                    startIcon={getStatusIcon(module.status)}
                    disabled={module.status === 'locked'}
                    onClick={() => handleModuleClick(module)}
                  >
                    {module.status === 'completed' ? 'Review' :
                     module.status === 'in_progress' ? 'Continue' :
                     module.status === 'available' ? 'Start' : 'Locked'}
                  </Button>
                </CardActions>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State */}
      {filteredModules.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Assessment sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
              No modules found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search terms or filters
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSearchTerm('');
                setFilterLevel('all');
                setFilterCategory('all');
                setActiveTab(0);
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default TrainingModules;
