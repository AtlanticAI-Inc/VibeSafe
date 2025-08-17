// DevSecOps Training Modules
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const devSecOpsModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "DevSecOps Fundamentals",
    description: "Introduction to DevSecOps principles, secure software development lifecycle, and basic security integration practices.",
    category: "devsecops",
    difficulty: "beginner",
    duration: 115,
    overview: {
      objectives: [
        "Understand DevSecOps core principles",
        "Learn secure software development lifecycle", 
        "Master basic security integration",
        "Implement shift-left security practices"
      ],
      prerequisites: [
        "Basic software development knowledge",
        "Understanding of DevOps concepts",
        "Fundamental security awareness"
      ],
      outcomes: [
        "Can integrate security into development workflows",
        "Understands secure development practices",
        "Can implement basic DevSecOps tools"
      ]
    },
    tags: ["devsecops-fundamentals", "secure-sdlc", "shift-left-security", "security-integration"],
    isPublished: true
  },
  {
    title: "Secure Coding Practices",
    description: "Essential secure coding techniques, code review practices, static analysis, and vulnerability prevention.",
    category: "devsecops",
    difficulty: "beginner", 
    duration: 135,
    overview: {
      objectives: [
        "Master secure coding techniques",
        "Implement effective code review processes",
        "Use static analysis tools effectively",
        "Prevent common vulnerabilities at the source"
      ]
    },
    tags: ["secure-coding", "code-review", "static-analysis", "vulnerability-prevention", "sast"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "CI/CD Security and Automation",
    description: "Advanced CI/CD security integration, security testing automation, pipeline security, and deployment protection.",
    category: "devsecops",
    difficulty: "intermediate",
    duration: 155,
    overview: {
      objectives: [
        "Secure CI/CD pipelines comprehensively",
        "Automate security testing processes",
        "Implement pipeline security controls",
        "Deploy secure release management"
      ]
    },
    tags: ["cicd-security", "pipeline-security", "security-automation", "secure-deployment", "testing-automation"],
    isPublished: true
  },
  {
    title: "Infrastructure as Code Security",
    description: "Advanced IaC security practices, security scanning of infrastructure code, compliance automation, and secure provisioning.",
    category: "devsecops",
    difficulty: "intermediate",
    duration: 165,
    overview: {
      objectives: [
        "Implement secure Infrastructure as Code",
        "Automate infrastructure security scanning",
        "Ensure compliance through automation",
        "Master secure cloud provisioning"
      ]
    },
    tags: ["iac-security", "terraform-security", "infrastructure-scanning", "compliance-automation", "secure-provisioning"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules
  {
    title: "Advanced Security Testing and DAST",
    description: "Expert-level security testing methodologies, dynamic application security testing, API security testing, and comprehensive test automation.",
    category: "devsecops",
    difficulty: "advanced",
    duration: 185,
    overview: {
      objectives: [
        "Master advanced security testing techniques",
        "Implement comprehensive DAST strategies",
        "Lead API security testing initiatives", 
        "Design holistic security testing frameworks"
      ]
    },
    tags: ["advanced-security-testing", "dast", "api-security-testing", "test-automation", "security-frameworks"],
    isPublished: true
  },
  {
    title: "Enterprise DevSecOps Transformation",
    description: "Strategic DevSecOps implementation, organizational change management, metrics and measurement, and culture transformation.",
    category: "devsecops", 
    difficulty: "advanced",
    duration: 200,
    overview: {
      objectives: [
        "Lead enterprise DevSecOps transformation",
        "Manage organizational culture change",
        "Implement comprehensive metrics programs",
        "Design scalable DevSecOps architectures"
      ]
    },
    tags: ["devsecops-transformation", "organizational-change", "security-metrics", "culture-change", "enterprise-scale"],
    isPublished: true
  }
];

module.exports = devSecOpsModules;
