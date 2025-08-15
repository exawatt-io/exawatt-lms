/**
 * Script to populate Sanity with sample ExaWatt content
 * Run with: node scripts/populate-sanity.js
 */

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { randomUUID } from 'crypto'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Helper function to generate unique keys
const generateKey = () => randomUUID().replace(/-/g, '').substring(0, 12)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-08-15',
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to .env.local
  useCdn: false,
})

// Sample data matching your current ExaWatt structure
const categories = [
  {
    _type: 'category',
    title: 'Grid Fundamentals',
    slug: { current: 'grid-fundamentals' },
    description: 'Essential concepts of electrical power systems, transmission, and distribution networks.',
    color: 'from-blue-500 to-cyan-500',
    icon: 'Zap',
    order: 1,
  },
  {
    _type: 'category',
    title: 'Market Operations',
    slug: { current: 'market-operations' },
    description: 'How electricity markets function, including pricing mechanisms and trading strategies.',
    color: 'from-green-500 to-emerald-500',
    icon: 'BarChart3',
    order: 2,
  },
  {
    _type: 'category',
    title: 'Risk Management',
    slug: { current: 'risk-management' },
    description: 'Financial and operational risk management in power markets and trading.',
    color: 'from-red-500 to-pink-500',
    icon: 'Shield',
    order: 3,
  },
  {
    _type: 'category',
    title: 'Renewable Integration',
    slug: { current: 'renewable-integration' },
    description: 'Managing variable renewable energy sources in modern electricity systems.',
    color: 'from-green-400 to-blue-500',
    icon: 'Wind',
    order: 4,
  },
]

const instructors = [
  {
    _type: 'instructor',
    name: 'Dr. Sarah Chen',
    slug: { current: 'dr-sarah-chen' },
    title: 'Professor of Electrical Engineering, Stanford University',
    bio: [
      {
        _key: generateKey(),
        _type: 'block',
        children: [
          {
            _key: generateKey(),
            _type: 'span',
            text: 'Dr. Sarah Chen is a leading expert in power systems engineering with over 15 years of experience in grid modernization and renewable energy integration. She has published over 50 peer-reviewed papers and consulted for major utilities worldwide.',
          },
        ],
      },
    ],
    expertise: ['Power Systems', 'Grid Modernization', 'Renewable Integration', 'Smart Grids'],
    credentials: [
      {
        _key: generateKey(),
        degree: 'Ph.D. Electrical Engineering',
        institution: 'MIT',
        year: 2008,
      },
      {
        _key: generateKey(),
        degree: 'M.S. Electrical Engineering',
        institution: 'Stanford University',
        year: 2005,
      },
    ],
    experience: 15,
    isActive: true,
  },
  {
    _type: 'instructor',
    name: 'Prof. Michael Torres',
    slug: { current: 'prof-michael-torres' },
    title: 'Senior Market Analyst, CAISO',
    bio: [
      {
        _key: generateKey(),
        _type: 'block',
        children: [
          {
            _key: generateKey(),
            _type: 'span',
            text: 'Professor Torres brings real-world market operations experience to ExaWatt. He has worked at CAISO for over 12 years, specializing in market design and economic dispatch optimization.',
          },
        ],
      },
    ],
    expertise: ['Market Operations', 'Economic Dispatch', 'LMP Formation', 'Market Design'],
    credentials: [
      {
        _key: generateKey(),
        degree: 'Ph.D. Economics',
        institution: 'UC Berkeley',
        year: 2010,
      },
    ],
    experience: 12,
    isActive: true,
  },
  {
    _type: 'instructor',
    name: 'Dr. Jennifer Liu',
    slug: { current: 'dr-jennifer-liu' },
    title: 'Director of Risk Management, Goldman Sachs Commodities',
    bio: [
      {
        _key: generateKey(),
        _type: 'block',
        children: [
          {
            _key: generateKey(),
            _type: 'span',
            text: 'Dr. Liu is a quantitative finance expert specializing in energy commodity risk management. She leads risk assessment for a $2B energy trading portfolio.',
          },
        ],
      },
    ],
    expertise: ['Risk Management', 'Quantitative Finance', 'Portfolio Optimization', 'Energy Trading'],
    credentials: [
      {
        _key: generateKey(),
        degree: 'Ph.D. Financial Engineering',
        institution: 'Stanford University',
        year: 2012,
      },
    ],
    experience: 10,
    isActive: true,
  },
]

const sampleContent = async () => {
  try {
    console.log('🚀 Starting to populate Sanity with sample data...')
    
    // Clean up existing content first
    console.log('🧹 Cleaning up existing content...')
    await client.delete({ query: '*[_type in ["lesson", "course", "simulation", "instructor", "category"]]' })
    console.log('✅ Existing content cleared')

    // Create categories first
    console.log('📂 Creating categories...')
    const createdCategories = []
    for (const category of categories) {
      const result = await client.create(category)
      createdCategories.push(result)
      console.log(`✅ Created category: ${result.title}`)
    }

    // Create instructors
    console.log('👨‍🏫 Creating instructors...')
    const createdInstructors = []
    for (const instructor of instructors) {
      const result = await client.create(instructor)
      createdInstructors.push(result)
      console.log(`✅ Created instructor: ${result.name}`)
    }

    // Create courses
    console.log('📚 Creating courses...')
    const courses = [
      {
        _type: 'course',
        title: 'Grid Fundamentals',
        slug: { current: 'grid-fundamentals' },
        description: 'Understanding the basics of electrical grids, power generation, transmission, and distribution systems.',
        fullDescription: [
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'This comprehensive course covers the fundamental concepts of electrical power systems. Students will learn about power generation, transmission networks, distribution systems, and the key principles that keep the lights on.',
              },
            ],
          },
        ],
        instructor: { _type: 'reference', _ref: createdInstructors[0]._id },
        category: { _type: 'reference', _ref: createdCategories[0]._id },
        difficulty: 'Beginner',
        duration: '4 weeks',
        estimatedHours: 20,
        learningObjectives: [
          'Understand basic power system components',
          'Learn about AC power flow',
          'Analyze transmission line characteristics',
          'Explore distribution system design',
        ],
        tags: ['fundamentals', 'grid', 'transmission', 'power-systems'],
        price: { amount: 0, currency: 'USD', isFree: true },
        status: 'published',
        isFeatured: true,
        enrollmentCount: 1250,
        rating: 4.8,
        publishedAt: new Date().toISOString(),
      },
      {
        _type: 'course',
        title: 'Market Operations',
        slug: { current: 'market-operations' },
        description: 'Learn how electricity markets function, including day-ahead and real-time market clearing mechanisms.',
        instructor: { _type: 'reference', _ref: createdInstructors[1]._id },
        category: { _type: 'reference', _ref: createdCategories[1]._id },
        difficulty: 'Intermediate',
        duration: '6 weeks',
        estimatedHours: 35,
        learningObjectives: [
          'Understand market clearing mechanisms',
          'Learn about LMP formation',
          'Analyze bidding strategies',
          'Explore ancillary services markets',
        ],
        tags: ['markets', 'pricing', 'operations', 'lmp'],
        price: { amount: 299, currency: 'USD', isFree: false },
        status: 'published',
        enrollmentCount: 890,
        rating: 4.9,
        publishedAt: new Date().toISOString(),
      },
      {
        _type: 'course',
        title: 'Risk Management',
        slug: { current: 'risk-management' },
        description: 'Advanced strategies for managing financial and operational risks in power trading and market participation.',
        instructor: { _type: 'reference', _ref: createdInstructors[2]._id },
        category: { _type: 'reference', _ref: createdCategories[2]._id },
        difficulty: 'Advanced',
        duration: '5 weeks',
        estimatedHours: 40,
        prerequisites: [
          // Will reference the Market Operations course after it's created
        ],
        learningObjectives: [
          'Quantify portfolio risk metrics',
          'Implement hedging strategies',
          'Perform stress testing',
          'Optimize risk-adjusted returns',
        ],
        tags: ['risk', 'finance', 'trading', 'portfolio'],
        price: { amount: 499, currency: 'USD', isFree: false },
        status: 'published',
        enrollmentCount: 450,
        rating: 4.7,
        publishedAt: new Date().toISOString(),
      },
    ]

    const createdCourses = []
    for (const course of courses) {
      const result = await client.create(course)
      createdCourses.push(result)
      console.log(`✅ Created course: ${result.title}`)
    }

    // Create simulations
    console.log('⚡ Creating simulations...')
    const simulations = [
      {
        _type: 'simulation',
        title: 'Market Clearing Engine',
        slug: { current: 'market-clearing' },
        description: 'Simulate the intersection of supply and demand curves to determine market-clearing prices and quantities.',
        category: { _type: 'reference', _ref: createdCategories[1]._id },
        difficulty: 'Beginner',
        estimatedDuration: '15-30 min',
        features: [
          'Supply/demand curves',
          'Price discovery',
          'Market equilibrium',
          'Merit order dispatch',
        ],
        learningObjectives: [
          'Understand supply and demand dynamics',
          'Learn price formation mechanisms',
          'Analyze market equilibrium',
          'Explore economic dispatch',
        ],
        icon: 'BarChart3',
        colorGradient: 'from-blue-500 to-cyan-500',
        tags: ['pricing', 'market', 'equilibrium', 'dispatch'],
        defaultParameters: {
          generators: JSON.stringify([
            { name: 'Coal Plant A', capacity: 500, price: 25 },
            { name: 'Gas Plant B', capacity: 300, price: 45 },
            { name: 'Solar Farm C', capacity: 200, price: 0 },
          ]),
          demand: JSON.stringify([
            { hour: 1, load: 800 },
            { hour: 2, load: 750 },
            { hour: 3, load: 900 },
          ]),
          settings: JSON.stringify({ timeStep: 1, currency: 'USD' }),
        },
        scenarios: [
          {
            _key: generateKey(),
            name: 'Base Case',
            description: 'Standard market conditions with mixed generation',
            parameters: '{"scenario": "base", "demandMultiplier": 1.0}',
            isDefault: true,
          },
          {
            _key: generateKey(),
            name: 'High Demand',
            description: 'Peak demand scenario testing price spikes',
            parameters: '{"scenario": "peak", "demandMultiplier": 1.5}',
            isDefault: false,
          },
        ],
        status: 'available',
        isFeatured: true,
        userCount: 2100,
        rating: 4.9,
        publishedAt: new Date().toISOString(),
      },
      {
        _type: 'simulation',
        title: 'Economic Dispatch',
        slug: { current: 'economic-dispatch' },
        description: 'Optimize power generation dispatch considering transmission constraints and generator characteristics.',
        category: { _type: 'reference', _ref: createdCategories[0]._id },
        difficulty: 'Intermediate',
        estimatedDuration: '20-45 min',
        features: [
          'Generator merit order',
          'Transmission limits',
          'Cost optimization',
          'Load flow analysis',
        ],
        icon: 'Zap',
        colorGradient: 'from-green-500 to-emerald-500',
        tags: ['dispatch', 'optimization', 'grid', 'transmission'],
        status: 'available',
        userCount: 1800,
        rating: 4.8,
        publishedAt: new Date().toISOString(),
      },
    ]

    const createdSimulations = []
    for (const simulation of simulations) {
      const result = await client.create(simulation)
      createdSimulations.push(result)
      console.log(`✅ Created simulation: ${result.title}`)
    }

    // Create sample lessons
    console.log('📖 Creating lessons...')
    const lessons = [
      {
        _type: 'lesson',
        title: 'Introduction to Power Systems',
        slug: { current: 'introduction-to-power-systems' },
        course: { _type: 'reference', _ref: createdCourses[0]._id },
        orderIndex: 1,
        description: 'Overview of electrical power systems and their components.',
        content: [
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'Welcome to the world of electrical power systems! In this lesson, we\'ll explore the fundamental components that make up our electrical grid.',
              },
            ],
          },
          {
            _key: generateKey(),
            _type: 'block',
            style: 'h3',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'What is a Power System?',
              },
            ],
          },
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'A power system is a network of electrical components used to supply, transmit, and use electric power. The three main components are:',
              },
            ],
          },
        ],
        estimatedDuration: 25,
        learningObjectives: [
          'Define electrical power systems',
          'Identify key system components',
          'Understand power flow basics',
        ],
        keyTerms: [
          {
            _key: generateKey(),
            term: 'Generation',
            definition: 'The process of producing electrical energy from other forms of energy',
          },
          {
            _key: generateKey(),
            term: 'Transmission',
            definition: 'High-voltage bulk transfer of electrical energy',
          },
        ],
        hasQuiz: true,
        hasSimulation: false,
        isPublished: true,
        publishedAt: new Date().toISOString(),
      },
    ]

    for (const lesson of lessons) {
      const result = await client.create(lesson)
      console.log(`✅ Created lesson: ${result.title}`)
    }

    console.log('🎉 Sample data creation completed successfully!')
    console.log(`
📊 Created:
- ${categories.length} categories
- ${instructors.length} instructors  
- ${courses.length} courses
- ${simulations.length} simulations
- ${lessons.length} lessons

🚀 You can now visit http://localhost:3002/studio to see your content!
    `)

  } catch (error) {
    console.error('❌ Error creating sample data:', error)
  }
}

sampleContent()