import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Security,
  Dashboard,
  School,
  Code,
  Analytics,
  MenuBook,
  AccountCircle,
  Settings,
  Logout,
  Notifications,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Navbar = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Dashboard },
    { path: '/modules', label: 'Training', icon: School },
    { path: '/vibesafe', label: 'VibeSafe', icon: Code },
    { path: '/progress', label: 'Analytics', icon: Analytics },
    { path: '/resources', label: 'Resources', icon: MenuBook },
  ];

  if (user.isAdmin) {
    navigationItems.push({
      path: '/admin',
      label: 'Admin',
      icon: AdminPanelSettings,
    });
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Logo and Brand */}
        <MotionBox
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            mr: 4,
          }}
          onClick={() => navigate('/dashboard')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Security
            sx={{
              mr: 1,
              fontSize: '2rem',
              color: 'primary.main',
              filter: 'drop-shadow(0 0 8px rgba(0, 188, 212, 0.3))',
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00bcd4, #4dd0e1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Fira Code", monospace',
            }}
          >
            VibeSafe Training
          </Typography>
        </MotionBox>

        {/* Navigation Menu - Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            flexGrow: 1,
          }}
        >
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Tooltip key={item.path} title={item.label}>
                <MotionBox
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Button
                    color="inherit"
                    startIcon={<Icon />}
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 0.5,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: active ? 600 : 400,
                      color: active ? 'primary.main' : 'text.primary',
                      backgroundColor: active
                        ? 'rgba(0, 188, 212, 0.1)'
                        : 'transparent',
                      border: active
                        ? '1px solid rgba(0, 188, 212, 0.3)'
                        : '1px solid transparent',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 188, 212, 0.05)',
                        border: '1px solid rgba(0, 188, 212, 0.2)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </MotionBox>
              </Tooltip>
            );
          })}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto', mr: 1 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* User Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <Badge badgeContent={3} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="User Menu">
            <IconButton onClick={handleMenuOpen} sx={{ p: 0.5 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: 'primary.main',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* Mobile Navigation Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              minWidth: 200,
            },
          }}
        >
          {/* Mobile Navigation Items */}
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <MenuItem
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  handleMenuClose();
                }}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  backgroundColor: isActive(item.path)
                    ? 'rgba(0, 188, 212, 0.1)'
                    : 'transparent',
                }}
              >
                <Icon sx={{ mr: 1 }} />
                {item.label}
              </MenuItem>
            );
          })}
          
          {/* User Actions */}
          <MenuItem sx={{ borderTop: 1, borderColor: 'divider', mt: 1 }}>
            <AccountCircle sx={{ mr: 1 }} />
            Profile
          </MenuItem>
          <MenuItem>
            <Settings sx={{ mr: 1 }} />
            Settings
          </MenuItem>
          <MenuItem sx={{ color: 'error.main' }}>
            <Logout sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsEl}
          open={Boolean(notificationsEl)}
          onClose={handleNotificationsClose}
          sx={{
            mt: 1,
            '& .MuiPaper-root': {
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              minWidth: 300,
            },
          }}
        >
          <MenuItem>
            <Box>
              <Typography variant="subtitle2" color="primary">
                New Security Alert
              </Typography>
              <Typography variant="body2" color="text.secondary">
                High severity vulnerability detected in dependencies
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="subtitle2" color="success.main">
                Training Complete
              </Typography>
              <Typography variant="body2" color="text.secondary">
                OWASP Top 10 module completed successfully
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem>
            <Box>
              <Typography variant="subtitle2" color="warning.main">
                Scan Scheduled
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Weekly VibeSafe scan will run in 2 hours
              </Typography>
            </Box>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
