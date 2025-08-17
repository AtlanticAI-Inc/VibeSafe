const express = require('express');
const router = express.Router();
const {
  getModules,
  getModuleById,
  getModuleStats, 
  getFeaturedModules,
  searchModules,
  seedModules
} = require('../controllers/modulesController');

// Public routes
router.get('/', getModules);
router.get('/stats', getModuleStats);
router.get('/featured', getFeaturedModules);
router.get('/search', searchModules);
router.get('/:id', getModuleById);

// Admin routes (seed functionality)
router.post('/seed', seedModules); // In production, this should be protected with admin middleware

module.exports = router;
