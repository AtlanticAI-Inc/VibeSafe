// Cryptography Training Modules  
// 6 modules total: 2 per difficulty level (beginner, intermediate, advanced)

const cryptographyModules = [
  // BEGINNER LEVEL - 2 modules
  {
    title: "Cryptography Fundamentals",
    description: "Introduction to cryptographic concepts, symmetric and asymmetric encryption, and basic cryptographic principles.",
    category: "cryptography",
    difficulty: "beginner", 
    duration: 140,
    overview: {
      objectives: [
        "Understand fundamental cryptographic concepts",
        "Learn symmetric vs asymmetric encryption", 
        "Master basic cryptographic operations",
        "Identify appropriate cryptographic solutions"
      ],
      prerequisites: [
        "Basic mathematics knowledge",
        "Understanding of computer science basics"
      ],
      outcomes: [
        "Can explain cryptographic fundamentals",
        "Understands when to use different encryption types",
        "Can implement basic cryptographic solutions"
      ]
    },
    tags: ["crypto-fundamentals", "symmetric-encryption", "asymmetric-encryption", "cryptographic-principles"],
    isPublished: true
  },
  {
    title: "Hashing and Digital Signatures",
    description: "Comprehensive guide to hash functions, message authentication codes, digital signatures, and integrity verification.",
    category: "cryptography",
    difficulty: "beginner",
    duration: 125,
    overview: {
      objectives: [
        "Master hash function concepts and applications",
        "Understand digital signature mechanisms",
        "Implement message authentication codes",
        "Ensure data integrity and authenticity"
      ]
    },
    tags: ["hashing", "digital-signatures", "hmac", "data-integrity", "authentication"],
    isPublished: true
  },
  
  // INTERMEDIATE LEVEL - 2 modules
  {
    title: "Public Key Infrastructure (PKI)",
    description: "Advanced PKI concepts, certificate authorities, certificate management, and trust models.",
    category: "cryptography", 
    difficulty: "intermediate",
    duration: 175,
    overview: {
      objectives: [
        "Design and implement PKI systems",
        "Manage digital certificates effectively",
        "Understand trust models and hierarchies", 
        "Implement certificate-based authentication"
      ]
    },
    tags: ["pki", "digital-certificates", "certificate-authorities", "trust-models", "x509"],
    isPublished: true
  },
  {
    title: "Key Management and Cryptographic Protocols",
    description: "Advanced key management practices, key distribution, cryptographic protocols, and secure communications.",
    category: "cryptography",
    difficulty: "intermediate", 
    duration: 160,
    overview: {
      objectives: [
        "Master key management best practices",
        "Implement secure key distribution",
        "Understand advanced cryptographic protocols",
        "Design secure communication systems"
      ]
    },
    tags: ["key-management", "key-distribution", "crypto-protocols", "tls-ssl", "secure-communications"],
    isPublished: true
  },
  
  // ADVANCED LEVEL - 2 modules
  {
    title: "Cryptanalysis and Attack Techniques", 
    description: "Advanced cryptanalysis methods, attack techniques against cryptographic systems, and vulnerability assessment.",
    category: "cryptography",
    difficulty: "advanced",
    duration: 200,
    overview: {
      objectives: [
        "Master cryptanalysis techniques",
        "Understand attack vectors against crypto systems",
        "Perform cryptographic vulnerability assessments",
        "Develop countermeasures against crypto attacks"
      ]
    },
    tags: ["cryptanalysis", "crypto-attacks", "vulnerability-assessment", "side-channel-attacks", "crypto-security"],
    isPublished: true
  },
  {
    title: "Advanced Cryptographic Applications",
    description: "Cutting-edge cryptographic applications including blockchain, zero-knowledge proofs, and post-quantum cryptography.",
    category: "cryptography", 
    difficulty: "advanced",
    duration: 185,
    overview: {
      objectives: [
        "Implement advanced cryptographic applications",
        "Understand blockchain and distributed ledger security",
        "Master zero-knowledge proof systems",
        "Prepare for post-quantum cryptography"
      ]
    },
    tags: ["blockchain-crypto", "zero-knowledge-proofs", "post-quantum-crypto", "advanced-applications", "emerging-crypto"],
    isPublished: true
  }
];

module.exports = cryptographyModules;
