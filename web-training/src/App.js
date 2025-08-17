import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TrainingModules from './pages/TrainingModules';
import InteractiveLab from './pages/InteractiveLab';
import VibeSafeIntegration from './pages/VibeSafeIntegration';
import Progress from './pages/Progress';
import ProgressDashboard from './pages/ProgressDashboard';
import Resources from './pages/Resources';
import AdminPanel from './pages/AdminPanel';

// Authentication Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Lesson Components
import LessonPlayer from './components/Lessons/LessonPlayer';

// Context
import { TrainingProvider } from './context/TrainingContext';
import { AuthProvider } from './context/AuthContext';

// Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00bcd4', // VibeSafe cyan
      light: '#4dd0e1',
      dark: '#0097a7',
    },
    secondary: {
      main: '#ff4569', // Security alert red
      light: '#ff7597',
      dark: '#c51162',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", "Courier New", monospace',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    code: {
      fontFamily: '"Fira Code", "Roboto Mono", monospace',
      fontSize: '0.9rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      padding: '2px 4px',
      borderRadius: '3px',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          '&:hover': {
            border: '1px solid #00bcd4',
            boxShadow: '0 4px 20px rgba(0, 188, 212, 0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState({
    name: 'Security Developer',
    level: 'Intermediate',
    progress: 65,
    completedModules: 8,
    totalModules: 12,
    isAdmin: false,
  });

  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Load user preferences and progress
    const savedProgress = localStorage.getItem('vibesafe-training-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setUser(prev => ({ ...prev, ...progress }));
      } catch (error) {
        console.warn('Failed to load saved progress:', error);
      }
    }
  }, []);

  const saveProgress = (progressData) => {
    const updatedUser = { ...user, ...progressData };
    setUser(updatedUser);
    localStorage.setItem('vibesafe-training-progress', JSON.stringify(updatedUser));
  };

  return (
    <AuthProvider>
      <TrainingProvider value={{ user, saveProgress, darkMode, setDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Navbar user={user} />
                    <Box sx={{ flex: 1, pt: 2 }}>
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={<Navigate to="/dashboard" replace />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/modules" element={<TrainingModules />} />
                          <Route path="/modules/:moduleId" element={<InteractiveLab />} />
                          <Route path="/modules/:moduleId/lesson/:lessonId" element={
                            <LessonPlayer 
                              onComplete={(score, time) => saveProgress({ lastScore: score, timeSpent: time })}
                            />
                          } />
                          <Route path="/vibesafe" element={<VibeSafeIntegration />} />
                          <Route path="/progress" element={<ProgressDashboard />} />
                          <Route path="/progress/legacy" element={<Progress />} />
                          <Route path="/resources" element={<Resources />} />
                          <Route path="/admin" element={
                            <ProtectedRoute roles={['admin']}>
                              <AdminPanel />
                            </ProtectedRoute>
                          } />
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </AnimatePresence>
                    </Box>

                    {/* Footer */}
                    <Box 
                      sx={{ 
                        mt: 4, 
                        py: 2, 
                        px: 3, 
                        borderTop: 1, 
                        borderColor: 'divider',
                        backgroundColor: 'background.paper',
                        textAlign: 'center'
                      }}
                    >
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2
                      }}>
                        <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                          🛡️ VibeSafe Security Training Platform v1.0.0
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                            Progress: {user.progress}%
                          </Box>
                          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                            Level: {user.level}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </ThemeProvider>
      </TrainingProvider>
    </AuthProvider>
  );
}

export default App;
