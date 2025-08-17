const TrainingModule = require('../models/TrainingModule');
const { allTrainingModules, moduleStats } = require('../data/allModules');

// @desc    Get all training modules with filtering and pagination
// @route   GET /api/modules
// @access  Public
const getModules = async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { isPublished: true };
    
    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Execute query with pagination
    const modules = await TrainingModule.find(query)
      .select('-pages -quiz.questions') // Exclude detailed content for list view
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
      
    const total = await TrainingModule.countDocuments(query);
    
    res.json({
      modules,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalModules: total,
        hasNext: skip + modules.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Server error while fetching modules' });
  }
};

// @desc    Get single training module with full content
// @route   GET /api/modules/:id
// @access  Public
const getModuleById = async (req, res) => {
  try {
    const module = await TrainingModule.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('prerequisites', 'title difficulty');
      
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    if (!module.isPublished) {
      return res.status(403).json({ error: 'Module not available' });
    }
    
    res.json(module);
  } catch (error) {
    console.error('Error fetching module:', error);
    res.status(500).json({ error: 'Server error while fetching module' });
  }
};

// @desc    Get module statistics and overview
// @route   GET /api/modules/stats
// @access  Public
const getModuleStats = async (req, res) => {
  try {
    // Get real-time stats from database
    const totalModules = await TrainingModule.countDocuments({ isPublished: true });
    const categories = await TrainingModule.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const difficulties = await TrainingModule.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);
    
    // Format aggregation results
    const categoryStats = {};
    categories.forEach(cat => {
      categoryStats[cat._id] = cat.count;
    });
    
    const difficultyStats = {};
    difficulties.forEach(diff => {
      difficultyStats[diff._id] = diff.count;
    });
    
    // Get total duration and average ratings
    const durationStats = await TrainingModule.aggregate([
      { $match: { isPublished: true } },
      {
        $group: {
          _id: null,
          totalDuration: { $sum: '$duration' },
          averageRating: { $avg: '$stats.averageRating' },
          totalEnrollments: { $sum: '$stats.totalEnrollments' },
          totalCompletions: { $sum: '$stats.completions' }
        }
      }
    ]);
    
    const stats = durationStats[0] || {
      totalDuration: 0,
      averageRating: 0,
      totalEnrollments: 0,
      totalCompletions: 0
    };
    
    res.json({
      totalModules,
      categories: categoryStats,
      difficulties: difficultyStats,
      totalEstimatedHours: Math.round(stats.totalDuration / 60),
      averageRating: parseFloat(stats.averageRating?.toFixed(1)) || 0,
      totalEnrollments: stats.totalEnrollments,
      totalCompletions: stats.totalCompletions,
      completionRate: stats.totalEnrollments > 0 
        ? parseFloat((stats.totalCompletions / stats.totalEnrollments * 100).toFixed(1))
        : 0
    });
  } catch (error) {
    console.error('Error fetching module stats:', error);
    res.status(500).json({ error: 'Server error while fetching statistics' });
  }
};

// @desc    Get featured/recommended modules
// @route   GET /api/modules/featured
// @access  Public
const getFeaturedModules = async (req, res) => {
  try {
    const featured = await TrainingModule.find({ 
      isPublished: true,
      'stats.averageRating': { $gte: 4.0 }
    })
    .select('-pages -quiz.questions')
    .populate('createdBy', 'username')
    .sort({ 'stats.averageRating': -1, 'stats.totalEnrollments': -1 })
    .limit(6);
    
    res.json(featured);
  } catch (error) {
    console.error('Error fetching featured modules:', error);
    res.status(500).json({ error: 'Server error while fetching featured modules' });
  }
};

// @desc    Search modules by text
// @route   GET /api/modules/search
// @access  Public
const searchModules = async (req, res) => {
  try {
    const { q, category, difficulty } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }
    
    const searchQuery = {
      isPublished: true,
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { tags: { $in: [new RegExp(q, 'i')] } },
        { 'pages.title': { $regex: q, $options: 'i' } },
        { 'pages.content': { $regex: q, $options: 'i' } }
      ]
    };
    
    if (category) searchQuery.category = category;
    if (difficulty) searchQuery.difficulty = difficulty;
    
    const modules = await TrainingModule.find(searchQuery)
      .select('-pages -quiz.questions')
      .populate('createdBy', 'username')
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);
      
    res.json({ results: modules, total: modules.length });
  } catch (error) {
    console.error('Error searching modules:', error);
    res.status(500).json({ error: 'Server error while searching modules' });
  }
};

// @desc    Seed database with training modules
// @route   POST /api/modules/seed
// @access  Private (Admin only)
const seedModules = async (req, res) => {
  try {
    // Check if modules already exist
    const existingCount = await TrainingModule.countDocuments();
    if (existingCount > 0) {
      return res.status(400).json({ 
        error: `Database already contains ${existingCount} modules. Use force=true to overwrite.` 
      });
    }
    
    // Clear existing modules if force flag is set
    if (req.query.force === 'true') {
      await TrainingModule.deleteMany({});
    }
    
    // Insert all modules
    const insertedModules = await TrainingModule.insertMany(allTrainingModules);
    
    // Update stats
    const stats = await TrainingModule.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          categories: { $addToSet: '$category' },
          difficulties: { $addToSet: '$difficulty' }
        }
      }
    ]);
    
    res.json({
      message: 'Training modules seeded successfully',
      inserted: insertedModules.length,
      categories: stats[0]?.categories || [],
      difficulties: stats[0]?.difficulties || []
    });
  } catch (error) {
    console.error('Error seeding modules:', error);
    res.status(500).json({ error: 'Server error while seeding modules' });
  }
};

module.exports = {
  getModules,
  getModuleById,
  getModuleStats,
  getFeaturedModules,
  searchModules,
  seedModules
};
