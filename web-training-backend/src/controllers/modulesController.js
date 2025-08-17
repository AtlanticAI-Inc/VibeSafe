const TrainingModule = require('../models/TrainingModule');
const UserProgress = require('../models/UserProgress');
const { validateInput } = require('../middleware/security');

// @desc    Get all training modules
// @route   GET /api/v1/modules
// @access  Public/Private (based on published status)
exports.getModules = async (req, res, next) => {
  try {
    let query = {};
    
    // Only show published modules to non-admin users
    if (!req.user || req.user.role !== 'admin') {
      query.isPublished = true;
    }
    
    // Build query
    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Filter by category, difficulty, type
    if (req.query.category) query.category = req.query.category;
    if (req.query.difficulty) query.difficulty = req.query.difficulty;
    if (req.query.type) query.type = req.query.type;
    
    // Search functionality
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = JSON.parse(queryStr);

    let modules = TrainingModule.find(query);

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      modules = modules.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      modules = modules.sort(sortBy);
    } else {
      modules = modules.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await TrainingModule.countDocuments(query);

    modules = modules.skip(startIndex).limit(limit);

    // Populate author and instructors
    modules = modules.populate('author', 'name email').populate('instructors', 'name email');

    const results = await modules;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: results.length,
      totalCount: total,
      pagination,
      data: results
    });
  } catch (error) {
    console.error('Get modules error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get single training module
// @route   GET /api/v1/modules/:id
// @access  Public/Private
exports.getModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateInput.objectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid module ID'
      });
    }

    const module = await TrainingModule.findById(id)
      .populate('author', 'name email profile.avatar')
      .populate('instructors', 'name email profile.avatar');

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Check if user can access unpublished modules
    if (!module.isPublished && (!req.user || !['admin', 'instructor'].includes(req.user.role))) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Get user progress if authenticated
    let userProgress = null;
    if (req.user) {
      userProgress = await UserProgress.findOne({
        user: req.user._id,
        module: module._id
      });
    }

    res.status(200).json({
      success: true,
      data: {
        module,
        userProgress
      }
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Create training module
// @route   POST /api/v1/modules
// @access  Private (Admin/Instructor)
exports.createModule = async (req, res, next) => {
  try {
    // Add author to req.body
    req.body.author = req.user.id;

    const module = await TrainingModule.create(req.body);

    res.status(201).json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error('Create module error:', error);
    
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Update training module
// @route   PUT /api/v1/modules/:id
// @access  Private (Admin/Owner)
exports.updateModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateInput.objectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid module ID'
      });
    }

    let module = await TrainingModule.findById(id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Make sure user is module owner or admin
    if (module.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this module'
      });
    }

    module = await TrainingModule.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: module
    });
  } catch (error) {
    console.error('Update module error:', error);
    
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message).join(', ');
      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Delete training module
// @route   DELETE /api/v1/modules/:id
// @access  Private (Admin/Owner)
exports.deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateInput.objectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid module ID'
      });
    }

    const module = await TrainingModule.findById(id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Make sure user is module owner or admin
    if (module.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this module'
      });
    }

    await module.deleteOne();

    // Delete related user progress records
    await UserProgress.deleteMany({ module: id });

    res.status(200).json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error) {
    console.error('Delete module error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Enroll in training module
// @route   POST /api/v1/modules/:id/enroll
// @access  Private
exports.enrollInModule = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!validateInput.objectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid module ID'
      });
    }

    const module = await TrainingModule.findById(id);

    if (!module) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    if (!module.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Module is not available for enrollment'
      });
    }

    // Check if user is already enrolled
    const existingProgress = await UserProgress.findOne({
      user: req.user.id,
      module: id
    });

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this module'
      });
    }

    // Create user progress record
    const progress = await UserProgress.create({
      user: req.user.id,
      module: id,
      maxScore: module.totalPoints
    });

    // Update module enrollment stats
    module.stats.enrollments += 1;
    await module.save();

    res.status(201).json({
      success: true,
      message: 'Successfully enrolled in module',
      data: progress
    });
  } catch (error) {
    console.error('Enroll module error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

// @desc    Get module statistics
// @route   GET /api/v1/modules/stats
// @access  Private (Admin/Instructor)
exports.getModuleStats = async (req, res, next) => {
  try {
    const stats = await TrainingModule.aggregate([
      {
        $group: {
          _id: null,
          totalModules: { $sum: 1 },
          publishedModules: {
            $sum: { $cond: [{ $eq: ['$isPublished', true] }, 1, 0] }
          },
          totalEnrollments: { $sum: '$stats.enrollments' },
          totalCompletions: { $sum: '$stats.completions' },
          averageRating: { $avg: '$rating.average' }
        }
      }
    ]);

    const categoryStats = await TrainingModule.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const difficultyStats = await TrainingModule.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {
          totalModules: 0,
          publishedModules: 0,
          totalEnrollments: 0,
          totalCompletions: 0,
          averageRating: 0
        },
        categoryDistribution: categoryStats,
        difficultyDistribution: difficultyStats
      }
    });
  } catch (error) {
    console.error('Get module stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};
