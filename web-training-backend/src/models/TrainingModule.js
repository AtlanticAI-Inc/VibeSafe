const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['theory', 'quiz', 'lab', 'video'],
    required: true
  },
  content: {
    theory: String,
    quiz: {
      questions: [{
        question: String,
        options: [String],
        correctAnswer: Number,
        explanation: String,
        points: { type: Number, default: 10 }
      }]
    },
    lab: {
      description: String,
      vulnerableCode: String,
      secureCode: String,
      hints: [String],
      solution: String,
      testCases: [{
        input: String,
        expectedOutput: String,
        description: String
      }]
    },
    video: {
      url: String,
      duration: Number,
      transcript: String
    }
  },
  duration: Number, // in minutes
  order: { type: Number, default: 0 },
  isOptional: { type: Boolean, default: false }
});

const trainingModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a module title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Web Security',
      'Network Security',
      'Cryptography',
      'Secure Coding',
      'Penetration Testing',
      'Incident Response',
      'Compliance',
      'Risk Management'
    ]
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    required: true
  },
  type: {
    type: String,
    enum: ['Interactive', 'Hands-on', 'Theory', 'Assessment'],
    required: true
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  prerequisites: [String],
  learningObjectives: [String],
  lessons: [lessonSchema],
  tags: [String],
  thumbnail: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: Date,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  instructors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
    reviews: [{
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now }
    }]
  },
  stats: {
    enrollments: { type: Number, default: 0 },
    completions: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 }
  },
  settings: {
    allowRetakes: { type: Boolean, default: true },
    passingScore: { type: Number, default: 70 },
    timeLimit: Number, // in minutes
    certificateEnabled: { type: Boolean, default: true },
    certificateTemplate: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate completion rate
trainingModuleSchema.virtual('completionRatePercent').get(function() {
  if (this.stats.enrollments === 0) return 0;
  return Math.round((this.stats.completions / this.stats.enrollments) * 100);
});

// Calculate total points
trainingModuleSchema.virtual('totalPoints').get(function() {
  return this.lessons.reduce((total, lesson) => {
    if (lesson.type === 'quiz' && lesson.content.quiz) {
      return total + lesson.content.quiz.questions.reduce((sum, q) => sum + (q.points || 10), 0);
    }
    return total;
  }, 0);
});

// Index for better performance
trainingModuleSchema.index({ category: 1, difficulty: 1 });
trainingModuleSchema.index({ isPublished: 1 });
trainingModuleSchema.index({ 'rating.average': -1 });
trainingModuleSchema.index({ createdAt: -1 });

// Update completion rate when stats change
trainingModuleSchema.pre('save', function(next) {
  if (this.stats.enrollments > 0) {
    this.stats.completionRate = (this.stats.completions / this.stats.enrollments) * 100;
  }
  next();
});

module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
