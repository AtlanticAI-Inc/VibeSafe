const express = require('express');
const {
  getUserProgress,
  updateLessonProgress,
  getModuleProgress,
  getAnalytics,
  getLeaderboard
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// Progress routes
router.get('/', getUserProgress);
router.post('/lesson', updateLessonProgress);
router.get('/module/:moduleId', getModuleProgress);
router.get('/analytics', getAnalytics);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
