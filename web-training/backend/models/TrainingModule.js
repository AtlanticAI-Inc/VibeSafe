const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  pageNumber: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['introduction', 'theory', 'example', 'hands-on', 'case-study', 'summary'],
    default: 'theory'
  },
  codeExamples: [{
    language: String,
    code: String,
    description: String
  }],
  images: [{
    url: String,
    caption: String,
    alt: String
  }],
  keyPoints: [String],
  additionalResources: [{
    title: String,
    url: String,
    type: String // 'article', 'video', 'documentation', 'tool'
  }]
});

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple-choice', 'multiple-select', 'true-false', 'coding', 'text'],
    default: 'multiple-choice'
  },
  options: [String],
  correctAnswers: [Number], // Array to support multiple-select
  correctAnswer: Number, // For backward compatibility
  explanation: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  points: {
    type: Number,
    default: 1
  },
  codeTemplate: String, // For coding questions
  testCases: [{
    input: String,
    expectedOutput: String
  }]
});

const trainingModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web-security', 'network-security', 'cryptography', 'incident-response', 'cloud-security', 'devsecops']
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  duration: {
    type: Number,
    required: true, // Duration in minutes
  },
  overview: {
    objectives: [String],
    prerequisites: [String],
    outcomes: [String]
  },
  pages: [pageSchema],
  quiz: {
    questions: [quizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70
    },
    timeLimit: {
      type: Number, // in minutes
      default: 30
    },
    maxAttempts: {
      type: Number,
      default: 3
    }
  },
  labExercises: [{
    title: String,
    description: String,
    instructions: [String],
    hints: [String],
    solution: String,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium'
    },
    estimatedTime: Number // in minutes
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingModule'
  }],
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stats: {
    totalEnrollments: {
      type: Number,
      default: 0
    },
    completions: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    averageCompletionTime: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

trainingModuleSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

trainingModuleSchema.index({ category: 1, difficulty: 1 });
trainingModuleSchema.index({ tags: 1 });
trainingModuleSchema.index({ isPublished: 1 });

module.exports = mongoose.model('TrainingModule', trainingModuleSchema);
