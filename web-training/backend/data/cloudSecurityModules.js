// Cloud Security Training Modules
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const cloudSecurityModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Cloud Security Fundamentals",
    description: "Introduction to cloud computing security, shared responsibility model, and basic cloud protection mechanisms.",
    category: "cloud-security",
    difficulty: "beginner",
    duration: 125,
    overview: {
      objectives: [
        "Understand cloud security fundamentals",
        "Learn shared responsibility model",
        "Master basic cloud security concepts",
        "Identify cloud-specific threats and risks"
      ],
      prerequisites: [
        "Basic understanding of cloud computing",
        "Fundamental security knowledge"
      ],
      outcomes: [
        "Can identify cloud security risks",
        "Understands shared responsibility model",
        "Can implement basic cloud security measures"
      ]
    },
    tags: ["cloud-fundamentals", "shared-responsibility", "cloud-threats", "basic-cloud-security"],
    isPublished: true
  },
  {
    title: "AWS Security Essentials", 
    description: "Essential AWS security services, IAM fundamentals, basic AWS security configuration, and best practices.",
    category: "cloud-security",
    difficulty: "beginner",
    duration: 140,
    overview: {
      objectives: [
        "Master AWS security services",
        "Implement AWS IAM effectively", 
        "Configure basic AWS security settings",
        "Apply AWS security best practices"
      ]
    },
    tags: ["aws-security", "aws-iam", "aws-services", "aws-best-practices", "cloud-providers"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "Container and Kubernetes Security",
    description: "Advanced container security, Kubernetes security architecture, pod security, and container orchestration security.",
    category: "cloud-security",
    difficulty: "intermediate",
    duration: 160,
    overview: {
      objectives: [
        "Secure containerized applications",
        "Master Kubernetes security architecture",
        "Implement pod and cluster security",
        "Manage container image security"
      ]
    },
    tags: ["container-security", "kubernetes-security", "docker-security", "pod-security", "orchestration"],
    isPublished: true
  },
  {
    title: "Multi-Cloud Security and Compliance",
    description: "Multi-cloud security strategies, compliance frameworks, cloud governance, and hybrid cloud security.",
    category: "cloud-security", 
    difficulty: "intermediate",
    duration: 175,
    overview: {
      objectives: [
        "Implement multi-cloud security strategies",
        "Master cloud compliance frameworks", 
        "Design cloud governance programs",
        "Secure hybrid cloud environments"
      ]
    },
    tags: ["multi-cloud-security", "cloud-compliance", "cloud-governance", "hybrid-cloud", "compliance-frameworks"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules
  {
    title: "Advanced Cloud Architecture Security",
    description: "Expert-level cloud architecture security, zero-trust cloud models, advanced threat protection, and security automation.",
    category: "cloud-security",
    difficulty: "advanced", 
    duration: 190,
    overview: {
      objectives: [
        "Design secure cloud architectures",
        "Implement zero-trust cloud models",
        "Deploy advanced threat protection",
        "Automate cloud security operations"
      ]
    },
    tags: ["cloud-architecture", "zero-trust-cloud", "advanced-threat-protection", "security-automation"],
    isPublished: true
  },
  {
    title: "Cloud Security DevOps and CSPM",
    description: "Advanced cloud security integration with DevOps, Cloud Security Posture Management, and continuous security monitoring.",
    category: "cloud-security",
    difficulty: "advanced",
    duration: 180,
    overview: {
      objectives: [
        "Integrate security with cloud DevOps",
        "Implement CSPM solutions effectively",
        "Deploy continuous security monitoring", 
        "Lead cloud security transformation"
      ]
    },
    tags: ["cloud-devsecops", "cspm", "continuous-monitoring", "cloud-security-ops", "security-transformation"],
    isPublished: true
  }
];

module.exports = cloudSecurityModules;
