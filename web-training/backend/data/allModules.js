// Complete Training Modules - All Categories
// 36 total modules: 6 per category, 2 per difficulty level

const webSecurityModules = require('./allWebSecurityModules');
const networkSecurityModules = require('./networkSecurityModules');
const cryptographyModules = require('./cryptographyModules');
const incidentResponseModules = require('./incidentResponseModules');
const cloudSecurityModules = require('./cloudSecurityModules');
const devSecOpsModules = require('./devSecOpsModules');

// Add placeholder user ID for seeding (will be replaced with actual admin user ID)
const ADMIN_USER_ID = '507f1f77bcf86cd799439011';

// Function to add necessary fields for database seeding
function prepareModuleForDatabase(module, index) {
  return {
    ...module,
    createdBy: ADMIN_USER_ID,
    stats: {
      totalEnrollments: Math.floor(Math.random() * 1000) + 100,
      completions: Math.floor(Math.random() * 800) + 50,
      averageRating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0-5.0
      averageCompletionTime: module.duration * (0.8 + Math.random() * 0.4) // 80%-120% of estimated duration
    },
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000), // Random date within last year
    updatedAt: new Date()
  };
}

// Complete module collection
const allTrainingModules = [
  ...webSecurityModules.map(prepareModuleForDatabase),
  ...networkSecurityModules.map(prepareModuleForDatabase), 
  ...cryptographyModules.map(prepareModuleForDatabase),
  ...incidentResponseModules.map(prepareModuleForDatabase),
  ...cloudSecurityModules.map(prepareModuleForDatabase),
  ...devSecOpsModules.map(prepareModuleForDatabase)
];

// Summary statistics
const moduleStats = {
  totalModules: allTrainingModules.length,
  categories: {
    'web-security': webSecurityModules.length,
    'network-security': networkSecurityModules.length, 
    'cryptography': cryptographyModules.length,
    'incident-response': incidentResponseModules.length,
    'cloud-security': cloudSecurityModules.length,
    'devsecops': devSecOpsModules.length
  },
  difficulties: {
    'beginner': allTrainingModules.filter(m => m.difficulty === 'beginner').length,
    'intermediate': allTrainingModules.filter(m => m.difficulty === 'intermediate').length,
    'advanced': allTrainingModules.filter(m => m.difficulty === 'advanced').length
  },
  totalEstimatedHours: Math.round(allTrainingModules.reduce((sum, m) => sum + m.duration, 0) / 60),
  averageDuration: Math.round(allTrainingModules.reduce((sum, m) => sum + m.duration, 0) / allTrainingModules.length)
};

module.exports = {
  allTrainingModules,
  moduleStats,
  webSecurityModules,
  networkSecurityModules,
  cryptographyModules, 
  incidentResponseModules,
  cloudSecurityModules,
  devSecOpsModules
};
