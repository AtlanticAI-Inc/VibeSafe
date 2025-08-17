const mongoose = require('mongoose');

// Individual lesson progress within a module
const LessonProgressSchema = new mongoose.Schema({
  lessonId: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  attempts: {
    type: Number,
    default: 0
  },
  answers: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed,
    isCorrect: Boolean,
    timeSpent: Number
  }],
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Module progress tracking
const ModuleProgressSchema = new mongoose.Schema({
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'TrainingModule',
    required: true
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'paused'],
    default: 'not_started'
  },
  completedLessons: [LessonProgressSchema],
  totalScore: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date,
    default: null
  },
  lastAccessed: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Achievement tracking
const AchievementSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: [
      'module_completed',
      'first_lesson',
      'streak_achieved',
      'perfect_score',
      'fast_learner',
      'category_master',
      'consistent_learner'
    ]
  },
  moduleId: {
    type: mongoose.Schema.ObjectId,
    ref: 'TrainingModule',
    required: false
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
});

// Learning streak tracking
const StreakSchema = new mongoose.Schema({
  current: {
    type: Number,
    default: 0
  },
  longest: {
    type: Number,
    default: 0
  },
  lastActivity: {
    type: Date,
    default: Date.now
  }
});

// Overall user statistics
const StatsSchema = new mongoose.Schema({
  totalTimeSpent: {
    type: Number,
    default: 0 // in minutes
  },
  modulesCompleted: {
    type: Number,
    default: 0
  },
  averageScore: {
    type: Number,
    default: 0
  },
  streak: StreakSchema
});

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  moduleProgress: [ModuleProgressSchema],
  achievements: [AchievementSchema],
  stats: StatsSchema,
  
  // Legacy fields for backward compatibility
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  module: {
    type: mongoose.Schema.ObjectId,
    ref: 'TrainingModule'
  },
  status: {
    type: String,
    enum: ['not_started', 'in_progress', 'completed', 'failed'],
    default: 'not_started'
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  },
  startedAt: Date,
  completedAt: Date,
  lastAccessedAt: {
    type: Date,
    default: Date.now
  },
  currentLesson: {
    type: Number,
    default: 0
  },
  completedLessons: [{
    lessonIndex: Number,
    completedAt: Date,
    score: Number,
    timeSpent: Number, // in seconds
    attempts: Number
  }],
  quizResults: [{
    lessonIndex: Number,
    attempt: Number,
    score: Number,
    totalQuestions: Number,
    correctAnswers: Number,
    answers: [{
      questionIndex: Number,
      selectedAnswer: Number,
      isCorrect: Boolean,
      timeSpent: Number
    }],
    completedAt: Date
  }],
  labResults: [{
    lessonIndex: Number,
    attempt: Number,
    code: String,
    testsPassed: Number,
    totalTests: Number,
    hints: [Number], // indices of hints used
    completedAt: Date,
    timeSpent: Number
  }],
  totalScore: {
    type: Number,
    default: 0
  },
  maxScore: Number,
  percentageScore: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0 // in seconds
  },
  attempts: {
    type: Number,
    default: 1
  },
  certificateIssued: {
    type: Boolean,
    default: false
  },
  certificateId: String,
  notes: String,
  bookmarks: [{
    lessonIndex: Number,
    note: String,
    createdAt: { type: Date, default: Date.now }
  }],
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    submittedAt: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for unique user-module combination
userProgressSchema.index({ user: 1, module: 1 }, { unique: true });

// Index for querying
userProgressSchema.index({ status: 1 });
userProgressSchema.index({ completedAt: -1 });
userProgressSchema.index({ enrolledAt: -1 });

// Virtual for completion percentage
userProgressSchema.virtual('completionPercentage').get(function() {
  if (!this.populated('module') || !this.module.lessons) {
    return 0;
  }
  const totalLessons = this.module.lessons.length;
  const completedCount = this.completedLessons.length;
  return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
});

// Virtual for pass/fail status
userProgressSchema.virtual('hasPassed').get(function() {
  if (!this.populated('module')) return false;
  const passingScore = this.module.settings?.passingScore || 70;
  return this.percentageScore >= passingScore;
});

// Calculate percentage score before saving
userProgressSchema.pre('save', function(next) {
  if (this.totalScore && this.maxScore) {
    this.percentageScore = Math.round((this.totalScore / this.maxScore) * 100);
  }
  next();
});

// Update status based on progress
userProgressSchema.methods.updateStatus = function() {
  if (this.completedAt) {
    this.status = this.hasPassed ? 'completed' : 'failed';
  } else if (this.startedAt) {
    this.status = 'in_progress';
  } else {
    this.status = 'not_started';
  }
  return this.save();
};

// Mark lesson as completed
userProgressSchema.methods.completeLesson = function(lessonIndex, score = 0, timeSpent = 0) {
  const existingLesson = this.completedLessons.find(l => l.lessonIndex === lessonIndex);
  
  if (existingLesson) {
    existingLesson.score = Math.max(existingLesson.score, score);
    existingLesson.attempts += 1;
    existingLesson.timeSpent += timeSpent;
  } else {
    this.completedLessons.push({
      lessonIndex,
      completedAt: new Date(),
      score,
      timeSpent,
      attempts: 1
    });
  }
  
  this.currentLesson = Math.max(this.currentLesson, lessonIndex + 1);
  this.lastAccessedAt = new Date();
  
  if (!this.startedAt) {
    this.startedAt = new Date();
  }
  
  return this.save();
};

// Add quiz result
userProgressSchema.methods.addQuizResult = function(lessonIndex, quizData) {
  const attempt = this.quizResults.filter(r => r.lessonIndex === lessonIndex).length + 1;
  
  this.quizResults.push({
    lessonIndex,
    attempt,
    ...quizData,
    completedAt: new Date()
  });
  
  return this.save();
};

// Add lab result
userProgressSchema.methods.addLabResult = function(lessonIndex, labData) {
  const attempt = this.labResults.filter(r => r.lessonIndex === lessonIndex).length + 1;
  
  this.labResults.push({
    lessonIndex,
    attempt,
    ...labData,
    completedAt: new Date()
  });
  
  return this.save();
};

module.exports = mongoose.model('UserProgress', userProgressSchema);
