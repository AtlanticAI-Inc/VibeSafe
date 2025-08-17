const express = require('express');
const {
  getModules,
  getModule,
  createModule,
  updateModule,
  deleteModule,
  enrollInModule,
  getModuleStats
} = require('../controllers/modulesController');

const { protect, authorize, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public/Optional auth routes
router.get('/', optionalAuth, getModules);
router.get('/:id', optionalAuth, getModule);

// Protected routes
router.post('/:id/enroll', protect, enrollInModule);

// Admin/Instructor only routes
router.get('/admin/stats', protect, authorize('admin', 'instructor'), getModuleStats);
router.post('/', protect, authorize('admin', 'instructor'), createModule);
router.put('/:id', protect, authorize('admin', 'instructor'), updateModule);
router.delete('/:id', protect, authorize('admin', 'instructor'), deleteModule);

module.exports = router;
