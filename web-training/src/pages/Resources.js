import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  Divider,
} from '@mui/material';
import {
  MenuBook,
  Search,
  Link as LinkIcon,
  GetApp,
  Code,
  Security,
  School,
  Description,
  VideoLibrary,
  Quiz,
  BugReport,
  Api,
  Cloud,
  Storage,
  VpnKey,
  ExpandMore,
  Language,
  GitHub,
  Article,
  PictureAsPdf,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const Resources = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories = {
    documentation: {
      title: 'Documentation & Guides',
      icon: Description,
      resources: [
        {
          id: 1,
          title: 'OWASP Security Testing Guide',
          description: 'Comprehensive guide for web application security testing',
          type: 'Documentation',
          url: 'https://owasp.org/www-project-web-security-testing-guide/',
          tags: ['OWASP', 'Testing', 'Web Security'],
          difficulty: 'Intermediate',
          downloadable: true,
        },
        {
          id: 2,
          title: 'VibeSafe CLI Documentation',
          description: 'Complete guide to using VibeSafe for security scanning',
          type: 'API Reference',
          url: '#',
          tags: ['VibeSafe', 'CLI', 'Documentation'],
          difficulty: 'Beginner',
          downloadable: true,
        },
        {
          id: 3,
          title: 'Secure Coding Practices',
          description: 'Industry best practices for writing secure code',
          type: 'Best Practices',
          url: '#',
          tags: ['Secure Coding', 'Best Practices', 'Development'],
          difficulty: 'Intermediate',
          downloadable: false,
        },
        {
          id: 4,
          title: 'Cryptography Implementation Guide',
          description: 'Practical guide to implementing cryptography in applications',
          type: 'Technical Guide',
          url: '#',
          tags: ['Cryptography', 'Implementation', 'Security'],
          difficulty: 'Advanced',
          downloadable: true,
        },
      ]
    },
    tools: {
      title: 'Security Tools & Software',
      icon: Code,
      resources: [
        {
          id: 5,
          title: 'VibeSafe CLI',
          description: 'AI-powered security vulnerability scanner',
          type: 'Security Scanner',
          url: 'https://github.com/vibesafe/vibesafe-cli',
          tags: ['Scanner', 'AI', 'Vulnerability'],
          difficulty: 'Beginner',
          downloadable: true,
        },
        {
          id: 6,
          title: 'OWASP ZAP',
          description: 'Web application security scanner',
          type: 'Security Scanner',
          url: 'https://www.zaproxy.org/',
          tags: ['OWASP', 'Web Scanner', 'Penetration Testing'],
          difficulty: 'Intermediate',
          downloadable: true,
        },
        {
          id: 7,
          title: 'Burp Suite Community',
          description: 'Web vulnerability scanner and proxy',
          type: 'Security Scanner',
          url: 'https://portswigger.net/burp/communitydownload',
          tags: ['Web Security', 'Proxy', 'Scanner'],
          difficulty: 'Intermediate',
          downloadable: true,
        },
        {
          id: 8,
          title: 'Nmap',
          description: 'Network discovery and security auditing',
          type: 'Network Scanner',
          url: 'https://nmap.org/',
          tags: ['Network', 'Discovery', 'Security'],
          difficulty: 'Advanced',
          downloadable: true,
        },
      ]
    },
    tutorials: {
      title: 'Video Tutorials & Courses',
      icon: VideoLibrary,
      resources: [
        {
          id: 9,
          title: 'Web Application Security Fundamentals',
          description: '10-hour comprehensive video course covering OWASP Top 10',
          type: 'Video Course',
          url: '#',
          tags: ['Video', 'OWASP', 'Web Security'],
          difficulty: 'Beginner',
          duration: '10 hours',
        },
        {
          id: 10,
          title: 'Advanced Penetration Testing',
          description: 'Hands-on penetration testing techniques and methodologies',
          type: 'Video Series',
          url: '#',
          tags: ['Penetration Testing', 'Advanced', 'Hands-on'],
          difficulty: 'Advanced',
          duration: '15 hours',
        },
        {
          id: 11,
          title: 'Secure Coding in Practice',
          description: 'Real-world examples of secure coding patterns',
          type: 'Workshop',
          url: '#',
          tags: ['Secure Coding', 'Workshop', 'Practice'],
          difficulty: 'Intermediate',
          duration: '8 hours',
        },
        {
          id: 12,
          title: 'API Security Deep Dive',
          description: 'Complete guide to securing REST and GraphQL APIs',
          type: 'Webinar',
          url: '#',
          tags: ['API Security', 'REST', 'GraphQL'],
          difficulty: 'Advanced',
          duration: '3 hours',
        },
      ]
    },
    references: {
      title: 'Quick References & Cheat Sheets',
      icon: Quiz,
      resources: [
        {
          id: 13,
          title: 'OWASP Top 10 Cheat Sheet',
          description: 'Quick reference for the most critical security risks',
          type: 'Cheat Sheet',
          url: '#',
          tags: ['OWASP', 'Quick Reference', 'Top 10'],
          difficulty: 'Beginner',
          downloadable: true,
        },
        {
          id: 14,
          title: 'SQL Injection Prevention',
          description: 'Comprehensive guide to preventing SQL injection attacks',
          type: 'Reference Guide',
          url: '#',
          tags: ['SQL Injection', 'Prevention', 'Database'],
          difficulty: 'Intermediate',
          downloadable: true,
        },
        {
          id: 15,
          title: 'XSS Prevention Cheat Sheet',
          description: 'Complete reference for preventing cross-site scripting',
          type: 'Cheat Sheet',
          url: '#',
          tags: ['XSS', 'Prevention', 'Web Security'],
          difficulty: 'Intermediate',
          downloadable: true,
        },
        {
          id: 16,
          title: 'Cryptographic Standards',
          description: 'Reference for current cryptographic standards and algorithms',
          type: 'Reference',
          url: '#',
          tags: ['Cryptography', 'Standards', 'Algorithms'],
          difficulty: 'Advanced',
          downloadable: true,
        },
      ]
    },
    communities: {
      title: 'Communities & Forums',
      icon: Language,
      resources: [
        {
          id: 17,
          title: 'OWASP Community',
          description: 'Global community focused on improving software security',
          type: 'Community',
          url: 'https://owasp.org/',
          tags: ['Community', 'OWASP', 'Security'],
          members: '50,000+',
        },
        {
          id: 18,
          title: 'Information Security Stack Exchange',
          description: 'Q&A community for information security professionals',
          type: 'Q&A Forum',
          url: 'https://security.stackexchange.com/',
          tags: ['Q&A', 'Community', 'Help'],
          members: '200,000+',
        },
        {
          id: 19,
          title: 'Reddit /r/netsec',
          description: 'Network security and information security discussions',
          type: 'Forum',
          url: 'https://reddit.com/r/netsec',
          tags: ['Reddit', 'Network Security', 'Discussion'],
          members: '500,000+',
        },
        {
          id: 20,
          title: 'DefCon Groups',
          description: 'Local security groups and meetups worldwide',
          type: 'Meetup',
          url: 'https://defcon.org/html/links/dc-groups.html',
          tags: ['DefCon', 'Meetup', 'Local'],
          members: '10,000+',
        },
      ]
    },
  };

  const tabConfig = [
    { key: 'documentation', label: 'Docs & Guides', icon: Description },
    { key: 'tools', label: 'Tools', icon: Code },
    { key: 'tutorials', label: 'Tutorials', icon: VideoLibrary },
    { key: 'references', label: 'References', icon: Quiz },
    { key: 'communities', label: 'Communities', icon: Language },
  ];

  const currentResources = resourceCategories[tabConfig[activeTab].key].resources;

  const filteredResources = currentResources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'Documentation': return <Article />;
      case 'API Reference': return <Api />;
      case 'Best Practices': return <School />;
      case 'Technical Guide': return <MenuBook />;
      case 'Security Scanner': return <Security />;
      case 'Network Scanner': return <BugReport />;
      case 'Video Course': return <VideoLibrary />;
      case 'Video Series': return <VideoLibrary />;
      case 'Workshop': return <School />;
      case 'Webinar': return <VideoLibrary />;
      case 'Cheat Sheet': return <Quiz />;
      case 'Reference Guide': return <Description />;
      case 'Reference': return <MenuBook />;
      case 'Community': return <Language />;
      case 'Q&A Forum': return <Quiz />;
      case 'Forum': return <Language />;
      case 'Meetup': return <Language />;
      default: return <Article />;
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
            📚 Security Resources & References
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Comprehensive collection of security tools, documentation, and learning materials
          </Typography>
        </Box>

        {/* Search */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ py: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search resources, tools, and documentation..."
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
          </CardContent>
        </Card>

        {/* Category Tabs */}
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
                minHeight: 72,
              },
            }}
          >
            {tabConfig.map((tab, index) => {
              const Icon = tab.icon;
              return (
                <Tab
                  key={index}
                  icon={<Icon />}
                  label={tab.label}
                  iconPosition="start"
                />
              );
            })}
          </Tabs>
        </Card>
      </motion.div>

      {/* Resources Grid */}
      <Grid container spacing={3}>
        {filteredResources.map((resource, index) => {
          const ResourceIcon = getResourceIcon(resource.type);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={resource.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0, 188, 212, 0.15)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 2 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar
                      sx={{
                        bgcolor: 'primary.main',
                        mr: 2,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {ResourceIcon}
                    </Avatar>
                    <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        {resource.title}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                        <Chip label={resource.type} size="small" variant="outlined" />
                        {resource.difficulty && (
                          <Chip
                            label={resource.difficulty}
                            size="small"
                            color={getDifficultyColor(resource.difficulty)}
                            variant="outlined"
                          />
                        )}
                        {resource.duration && (
                          <Chip label={resource.duration} size="small" variant="outlined" />
                        )}
                        {resource.members && (
                          <Chip label={resource.members} size="small" variant="outlined" />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.5 }}
                  >
                    {resource.description}
                  </Typography>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                    {resource.tags.map((tag, tagIndex) => (
                      <Chip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(0, 188, 212, 0.1)',
                          color: 'primary.main',
                          fontSize: '0.7rem',
                        }}
                      />
                    ))}
                  </Box>

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      startIcon={<LinkIcon />}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="small"
                      sx={{ flexGrow: 1 }}
                    >
                      Open
                    </Button>
                    {resource.downloadable && (
                      <Button
                        variant="outlined"
                        startIcon={<GetApp />}
                        size="small"
                      >
                        Download
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Search sx={{ fontSize: '4rem', color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
              No resources found
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Try adjusting your search terms or browse different categories
            </Typography>
            <Button
              variant="contained"
              onClick={() => setSearchTerm('')}
            >
              Clear Search
            </Button>
          </Box>
        </motion.div>
      )}

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            ❓ Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">How do I get started with VibeSafe CLI?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Start by installing the VibeSafe CLI tool and following our getting started guide. 
                    The tool provides automated security scanning with AI-powered vulnerability detection. 
                    Begin with the basic scan command and gradually explore advanced features.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Which security tools should I use for web applications?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    For web applications, we recommend starting with VibeSafe CLI for comprehensive scanning, 
                    OWASP ZAP for dynamic testing, and incorporating static analysis tools in your CI/CD pipeline. 
                    The combination provides both automated and manual testing capabilities.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">How often should I run security scans?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Security scans should be integrated into your development workflow. Run scans on every 
                    code commit, before releases, and regularly on production systems. Critical applications 
                    should have daily automated scans with immediate alerting for high-severity issues.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">Where can I learn about the latest security vulnerabilities?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Stay updated with OWASP Top 10, CVE databases, security advisories from major vendors, 
                    and security research blogs. Join security communities and mailing lists for real-time 
                    threat intelligence and best practice discussions.
                  </Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="h6">How do I contribute to open source security projects?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    Start by contributing to OWASP projects, reporting vulnerabilities responsibly, 
                    writing security tools, or improving documentation. Many projects welcome 
                    contributions from developers of all skill levels. Check project repositories 
                    for contribution guidelines and good first issues.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </Box>
      </motion.div>

      {/* Quick Links Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Box sx={{ mt: 6, p: 3, backgroundColor: 'rgba(255, 255, 255, 0.02)', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            🔗 Quick Links
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <List dense>
                <ListItem>
                  <ListItemIcon><Security sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="https://owasp.org/Top10/" target="_blank">OWASP Top 10</Link>}
                    secondary="Most critical security risks"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Code sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="#" target="_blank">VibeSafe GitHub</Link>}
                    secondary="Source code and issues"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <List dense>
                <ListItem>
                  <ListItemIcon><Article sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="https://cheatsheetseries.owasp.org/" target="_blank">OWASP Cheat Sheets</Link>}
                    secondary="Quick reference guides"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><BugReport sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="https://cve.mitre.org/" target="_blank">CVE Database</Link>}
                    secondary="Vulnerability database"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <List dense>
                <ListItem>
                  <ListItemIcon><Language sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="https://security.stackexchange.com/" target="_blank">Security Stack Exchange</Link>}
                    secondary="Q&A community"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VideoLibrary sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="#" target="_blank">Security Training</Link>}
                    secondary="Video courses"
                  />
                </ListItem>
              </List>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <List dense>
                <ListItem>
                  <ListItemIcon><GitHub sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="https://github.com/topics/security" target="_blank">Security on GitHub</Link>}
                    secondary="Open source tools"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon><PictureAsPdf sx={{ color: 'primary.main' }} /></ListItemIcon>
                  <ListItemText 
                    primary={<Link href="#" target="_blank">Security Guides</Link>}
                    secondary="PDF downloads"
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Resources;
