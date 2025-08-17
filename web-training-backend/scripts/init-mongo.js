// MongoDB initialization script
print('Starting database initialization...');

// Switch to the vibesafe-training database
db = db.getSiblingDB('vibesafe-training');

// Create collections
db.createCollection('users');
db.createCollection('trainingmodules');
db.createCollection('userprogresses');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "resetPasswordToken": 1 });
db.users.createIndex({ "emailVerificationToken": 1 });

db.trainingmodules.createIndex({ "category": 1, "difficulty": 1 });
db.trainingmodules.createIndex({ "isPublished": 1 });
db.trainingmodules.createIndex({ "rating.average": -1 });
db.trainingmodules.createIndex({ "createdAt": -1 });

db.userprogresses.createIndex({ "user": 1, "module": 1 }, { unique: true });
db.userprogresses.createIndex({ "status": 1 });
db.userprogresses.createIndex({ "completedAt": -1 });
db.userprogresses.createIndex({ "enrolledAt": -1 });

// Create admin user (password is bcrypt hash for "AdminPass123!")
const adminUser = {
  name: "Admin User",
  email: "admin@vibesafe.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LEq1YZYhqCPAzgQOq", // AdminPass123!
  role: "admin",
  isActive: true,
  isEmailVerified: true,
  profile: {
    avatar: "",
    bio: "VibeSafe Security Training Platform Administrator",
    title: "System Administrator",
    company: "VibeSafe",
    location: "Global",
    skills: ["Security", "Administration", "Training"],
    preferences: {
      theme: "dark",
      notifications: {
        email: true,
        push: true
      },
      language: "en"
    }
  },
  progress: {
    completedModules: [],
    currentModule: null,
    totalScore: 0,
    level: 1,
    badges: ["admin"],
    certificates: []
  },
  security: {
    twoFactorEnabled: false,
    sessions: []
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

try {
  db.users.insertOne(adminUser);
  print('Admin user created successfully');
} catch (error) {
  print('Admin user already exists or error creating admin user: ' + error);
}

// Create sample training modules
const sampleModules = [
  {
    title: "OWASP Top 10 Security Risks",
    description: "Learn about the most critical web application security risks as defined by OWASP",
    category: "Web Security",
    difficulty: "Beginner",
    type: "Interactive",
    estimatedTime: 120,
    prerequisites: [],
    learningObjectives: [
      "Understand the OWASP Top 10",
      "Identify common security vulnerabilities",
      "Learn prevention techniques"
    ],
    lessons: [
      {
        title: "Introduction to OWASP Top 10",
        type: "theory",
        content: {
          theory: "The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications."
        },
        duration: 15,
        order: 0
      },
      {
        title: "Injection Attacks Quiz",
        type: "quiz",
        content: {
          quiz: {
            questions: [
              {
                question: "What is SQL injection?",
                options: [
                  "A type of code injection attack",
                  "A database management technique",
                  "A security testing method",
                  "A programming language"
                ],
                correctAnswer: 0,
                explanation: "SQL injection is a code injection technique that might destroy your database.",
                points: 10
              }
            ]
          }
        },
        duration: 20,
        order: 1
      }
    ],
    tags: ["owasp", "security", "web", "vulnerabilities"],
    isPublished: true,
    publishedAt: new Date(),
    author: adminUser._id,
    instructors: [],
    rating: {
      average: 4.5,
      count: 25,
      reviews: []
    },
    stats: {
      enrollments: 150,
      completions: 120,
      averageScore: 85,
      completionRate: 80
    },
    settings: {
      allowRetakes: true,
      passingScore: 70,
      timeLimit: 180,
      certificateEnabled: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Secure Coding Practices",
    description: "Best practices for writing secure code and preventing common vulnerabilities",
    category: "Secure Coding",
    difficulty: "Intermediate",
    type: "Hands-on",
    estimatedTime: 180,
    prerequisites: ["Basic programming knowledge"],
    learningObjectives: [
      "Apply secure coding principles",
      "Prevent common coding vulnerabilities",
      "Implement security controls"
    ],
    lessons: [
      {
        title: "Input Validation",
        type: "lab",
        content: {
          lab: {
            description: "Practice implementing proper input validation",
            vulnerableCode: "// Vulnerable code example\nconst userInput = req.body.input;\ndb.query('SELECT * FROM users WHERE id = ' + userInput);",
            secureCode: "// Secure code example\nconst userInput = req.body.input;\nif (validator.isNumeric(userInput)) {\n  db.query('SELECT * FROM users WHERE id = ?', [userInput]);\n}",
            hints: ["Use parameterized queries", "Validate all input", "Sanitize data"],
            solution: "Always validate and sanitize user input before using it in database queries or other operations."
          }
        },
        duration: 45,
        order: 0
      }
    ],
    tags: ["secure-coding", "development", "best-practices"],
    isPublished: true,
    publishedAt: new Date(),
    author: adminUser._id,
    instructors: [],
    rating: {
      average: 4.2,
      count: 18,
      reviews: []
    },
    stats: {
      enrollments: 85,
      completions: 65,
      averageScore: 78,
      completionRate: 76
    },
    settings: {
      allowRetakes: true,
      passingScore: 75,
      timeLimit: 240,
      certificateEnabled: true
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

try {
  db.trainingmodules.insertMany(sampleModules);
  print('Sample training modules created successfully');
} catch (error) {
  print('Error creating sample modules: ' + error);
}

print('Database initialization completed successfully!');
