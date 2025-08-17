const UserProgress = require('../models/UserProgress');
const User = require('../models/User');
const TrainingModule = require('../models/TrainingModule');

// @desc    Get user progress
// @route   GET /api/v1/progress
// @access  Private
exports.getUserProgress = async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ userId: req.user.id })
      .populate('moduleProgress.moduleId', 'title category difficulty estimatedTime')
      .populate('achievements.moduleId', 'title');

    if (!progress) {
      // Create initial progress record
      progress = await UserProgress.create({
        userId: req.user.id,
        moduleProgress: [],
        achievements: [],
        stats: {
          totalTimeSpent: 0,
          modulesCompleted: 0,
          averageScore: 0,
          streak: {
            current: 0,
            longest: 0,
            lastActivity: new Date()
          }
        }
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update lesson progress
// @route   POST /api/v1/progress/lesson
// @access  Private
exports.updateLessonProgress = async (req, res) => {
  try {
    const { 
      moduleId, 
      lessonId, 
      completed, 
      score, 
      timeSpent,
      answers 
    } = req.body;

    if (!moduleId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: 'Module ID and Lesson ID are required'
      });
    }

    // Verify module exists
    const module = await TrainingModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Training module not found'
      });
    }

    // Find or create user progress
    let progress = await UserProgress.findOne({ userId: req.user.id });
    
    if (!progress) {
      progress = await UserProgress.create({
        userId: req.user.id,
        moduleProgress: [],
        achievements: [],
        stats: {
          totalTimeSpent: 0,
          modulesCompleted: 0,
          averageScore: 0,
          streak: {
            current: 0,
            longest: 0,
            lastActivity: new Date()
          }
        }
      });
    }

    // Find or create module progress
    let moduleProgress = progress.moduleProgress.find(
      mp => mp.moduleId.toString() === moduleId
    );

    if (!moduleProgress) {
      moduleProgress = {
        moduleId,
        status: 'in_progress',
        completedLessons: [],
        totalScore: 0,
        timeSpent: 0,
        lastAccessed: new Date(),
        startedAt: new Date()
      };
      progress.moduleProgress.push(moduleProgress);
    }

    // Find or create lesson progress
    let lessonProgress = moduleProgress.completedLessons.find(
      lesson => lesson.lessonId === lessonId
    );

    if (!lessonProgress) {
      lessonProgress = {
        lessonId,
        completed: false,
        score: 0,
        timeSpent: 0,
        attempts: 0,
        answers: [],
        completedAt: null
      };
      moduleProgress.completedLessons.push(lessonProgress);
    }

    // Update lesson progress
    lessonProgress.attempts += 1;
    lessonProgress.timeSpent += timeSpent || 0;
    if (answers) {
      lessonProgress.answers = answers;
    }

    if (completed) {
      lessonProgress.completed = true;
      lessonProgress.completedAt = new Date();
      lessonProgress.score = Math.max(lessonProgress.score, score || 0);
    }

    // Update module progress
    moduleProgress.timeSpent += timeSpent || 0;
    moduleProgress.lastAccessed = new Date();

    // Calculate module completion
    const totalLessons = module.lessons?.length || 0;
    const completedLessons = moduleProgress.completedLessons.filter(l => l.completed).length;
    
    if (totalLessons > 0 && completedLessons === totalLessons) {
      moduleProgress.status = 'completed';
      moduleProgress.completedAt = new Date();
      moduleProgress.totalScore = moduleProgress.completedLessons.reduce((sum, l) => sum + l.score, 0);

      // Update user stats
      progress.stats.modulesCompleted += 1;
      
      // Add achievement
      const achievement = {
        type: 'module_completed',
        moduleId,
        title: `Completed ${module.title}`,
        description: `Successfully completed the ${module.title} training module`,
        earnedAt: new Date(),
        points: Math.round(moduleProgress.totalScore)
      };
      progress.achievements.push(achievement);
    }

    // Update overall stats
    progress.stats.totalTimeSpent += timeSpent || 0;
    
    // Update streak
    const today = new Date().toDateString();
    const lastActivity = progress.stats.streak.lastActivity.toDateString();
    
    if (today !== lastActivity) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        progress.stats.streak.current += 1;
      } else {
        progress.stats.streak.current = 1;
      }
      
      progress.stats.streak.longest = Math.max(
        progress.stats.streak.longest,
        progress.stats.streak.current
      );
      progress.stats.streak.lastActivity = new Date();
    }

    // Calculate average score
    const allScores = progress.moduleProgress
      .flatMap(mp => mp.completedLessons.filter(l => l.completed && l.score > 0))
      .map(l => l.score);
    
    if (allScores.length > 0) {
      progress.stats.averageScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
    }

    await progress.save();

    res.status(200).json({
      success: true,
      data: {
        moduleProgress: moduleProgress,
        stats: progress.stats,
        message: completed ? 'Lesson completed successfully!' : 'Progress updated'
      }
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get module progress
// @route   GET /api/v1/progress/module/:moduleId
// @access  Private
exports.getModuleProgress = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const progress = await UserProgress.findOne({ userId: req.user.id })
      .populate('moduleProgress.moduleId', 'title category difficulty estimatedTime lessons');

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: {
          moduleId,
          status: 'not_started',
          completedLessons: [],
          totalScore: 0,
          timeSpent: 0,
          completionPercentage: 0
        }
      });
    }

    const moduleProgress = progress.moduleProgress.find(
      mp => mp.moduleId._id.toString() === moduleId
    );

    if (!moduleProgress) {
      return res.status(200).json({
        success: true,
        data: {
          moduleId,
          status: 'not_started',
          completedLessons: [],
          totalScore: 0,
          timeSpent: 0,
          completionPercentage: 0
        }
      });
    }

    // Calculate completion percentage
    const totalLessons = moduleProgress.moduleId.lessons?.length || 0;
    const completedLessons = moduleProgress.completedLessons.filter(l => l.completed).length;
    const completionPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

    res.status(200).json({
      success: true,
      data: {
        ...moduleProgress.toObject(),
        completionPercentage: Math.round(completionPercentage)
      }
    });
  } catch (error) {
    console.error('Get module progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get learning analytics
// @route   GET /api/v1/progress/analytics
// @access  Private
exports.getAnalytics = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.user.id })
      .populate('moduleProgress.moduleId', 'title category difficulty');

    if (!progress) {
      return res.status(200).json({
        success: true,
        data: {
          overview: {
            modulesStarted: 0,
            modulesCompleted: 0,
            totalTimeSpent: 0,
            averageScore: 0,
            currentStreak: 0,
            longestStreak: 0
          },
          categoryBreakdown: [],
          recentActivity: [],
          achievements: []
        }
      });
    }

    // Calculate category breakdown
    const categoryStats = {};
    progress.moduleProgress.forEach(mp => {
      const category = mp.moduleId.category;
      if (!categoryStats[category]) {
        categoryStats[category] = {
          category,
          started: 0,
          completed: 0,
          timeSpent: 0,
          averageScore: 0,
          totalScore: 0,
          count: 0
        };
      }
      
      categoryStats[category].started += 1;
      categoryStats[category].timeSpent += mp.timeSpent;
      
      if (mp.status === 'completed') {
        categoryStats[category].completed += 1;
        categoryStats[category].totalScore += mp.totalScore;
        categoryStats[category].count += 1;
      }
    });

    // Calculate average scores for categories
    Object.values(categoryStats).forEach(cat => {
      if (cat.count > 0) {
        cat.averageScore = cat.totalScore / cat.count;
      }
    });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentActivity = progress.moduleProgress
      .filter(mp => mp.lastAccessed >= thirtyDaysAgo)
      .sort((a, b) => b.lastAccessed - a.lastAccessed)
      .slice(0, 10)
      .map(mp => ({
        moduleTitle: mp.moduleId.title,
        category: mp.moduleId.category,
        status: mp.status,
        lastAccessed: mp.lastAccessed,
        timeSpent: mp.timeSpent,
        progress: mp.completedLessons.filter(l => l.completed).length
      }));

    // Get recent achievements
    const recentAchievements = progress.achievements
      .sort((a, b) => b.earnedAt - a.earnedAt)
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          modulesStarted: progress.moduleProgress.length,
          modulesCompleted: progress.stats.modulesCompleted,
          totalTimeSpent: progress.stats.totalTimeSpent,
          averageScore: Math.round(progress.stats.averageScore),
          currentStreak: progress.stats.streak.current,
          longestStreak: progress.stats.streak.longest
        },
        categoryBreakdown: Object.values(categoryStats),
        recentActivity,
        achievements: recentAchievements
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get leaderboard
// @route   GET /api/v1/progress/leaderboard
// @access  Private
exports.getLeaderboard = async (req, res) => {
  try {
    const { category, timeframe = '30d' } = req.query;
    
    // Calculate date filter based on timeframe
    let dateFilter = {};
    if (timeframe !== 'all') {
      const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      dateFilter = { 'moduleProgress.lastAccessed': { $gte: cutoffDate } };
    }

    // Build aggregation pipeline
    const pipeline = [
      { $match: dateFilter },
      { $unwind: '$moduleProgress' },
      { $lookup: {
        from: 'trainingmodules',
        localField: 'moduleProgress.moduleId',
        foreignField: '_id',
        as: 'module'
      }},
      { $unwind: '$module' }
    ];

    // Add category filter if specified
    if (category && category !== 'all') {
      pipeline.push({ $match: { 'module.category': category } });
    }

    // Group and calculate scores
    pipeline.push(
      { $group: {
        _id: '$userId',
        totalScore: { $sum: '$moduleProgress.totalScore' },
        modulesCompleted: { $sum: { $cond: [{ $eq: ['$moduleProgress.status', 'completed'] }, 1, 0] } },
        totalTimeSpent: { $sum: '$moduleProgress.timeSpent' },
        averageScore: { $avg: '$moduleProgress.totalScore' }
      }},
      { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user'
      }},
      { $unwind: '$user' },
      { $project: {
        userId: '$_id',
        name: '$user.name',
        totalScore: 1,
        modulesCompleted: 1,
        totalTimeSpent: 1,
        averageScore: { $round: ['$averageScore', 1] }
      }},
      { $sort: { totalScore: -1, modulesCompleted: -1 } },
      { $limit: 50 }
    );

    const leaderboard = await UserProgress.aggregate(pipeline);

    // Add ranks
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry
    }));

    // Find current user's position
    const currentUserRank = rankedLeaderboard.find(
      entry => entry.userId.toString() === req.user.id.toString()
    );

    res.status(200).json({
      success: true,
      data: {
        leaderboard: rankedLeaderboard,
        currentUserRank: currentUserRank || null,
        filters: {
          category: category || 'all',
          timeframe
        }
      }
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
