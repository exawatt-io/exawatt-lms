/**
 * Script to add more lessons to ExaWatt Sanity CMS
 * Run with: node scripts/add-more-lessons.js
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
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const addMoreLessons = async () => {
  try {
    console.log('🚀 Adding more lessons to ExaWatt...')
    
    // First, get the existing courses to link lessons to them
    const courses = await client.fetch('*[_type == "course"]')
    console.log(`Found ${courses.length} courses`)
    
    if (courses.length === 0) {
      console.log('❌ No courses found. Please run the main populate script first.')
      return
    }

    // Find Grid Fundamentals course
    const gridFundamentals = courses.find(course => course.slug.current === 'grid-fundamentals')
    const marketOperations = courses.find(course => course.slug.current === 'market-operations')
    
    if (!gridFundamentals) {
      console.log('❌ Grid Fundamentals course not found')
      return
    }

    console.log('📖 Creating additional lessons...')

    const additionalLessons = [
      {
        _type: 'lesson',
        title: 'Power Generation Fundamentals',
        slug: { current: 'power-generation-fundamentals' },
        course: { _type: 'reference', _ref: gridFundamentals._id },
        orderIndex: 2,
        description: 'Learn about different types of power generation and their characteristics.',
        content: [
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'In this lesson, we\'ll explore the various methods of generating electrical power and understand how different technologies contribute to our energy mix.',
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
                text: 'Types of Power Generation',
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
                text: 'Power generation can be broadly categorized into conventional and renewable sources. Each type has unique characteristics that affect grid operations and market dynamics.',
              },
            ],
          },
        ],
        estimatedDuration: 30,
        learningObjectives: [
          'Understand different power generation technologies',
          'Compare characteristics of renewable vs conventional generation',
          'Learn about capacity factors and availability',
        ],
        keyTerms: [
          {
            _key: generateKey(),
            term: 'Capacity Factor',
            definition: 'The ratio of actual energy output to the maximum possible output over a specific period',
          },
          {
            _key: generateKey(),
            term: 'Baseload Power',
            definition: 'The minimum level of demand on an electrical grid over a span of time',
          },
        ],
        hasQuiz: true,
        hasSimulation: false,
        isPublished: true,
        publishedAt: new Date().toISOString(),
      },
      {
        _type: 'lesson',
        title: 'Grid Transmission Systems',
        slug: { current: 'grid-transmission-systems' },
        course: { _type: 'reference', _ref: gridFundamentals._id },
        orderIndex: 3,
        description: 'Understanding high-voltage transmission networks and power flow.',
        content: [
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'Transmission systems are the highways of the electrical grid, carrying large amounts of power over long distances at high voltages.',
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
                text: 'Why High Voltage?',
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
                text: 'Transmitting power at high voltages reduces current, which minimizes power losses due to resistance in the transmission lines.',
              },
            ],
          },
        ],
        estimatedDuration: 35,
        learningObjectives: [
          'Understand transmission system voltage levels',
          'Learn about power losses and efficiency',
          'Explore transmission line characteristics',
        ],
        keyTerms: [
          {
            _key: generateKey(),
            term: 'Transmission Line',
            definition: 'High-voltage power lines that carry electricity over long distances',
          },
          {
            _key: generateKey(),
            term: 'Power Losses',
            definition: 'Energy lost as heat during transmission due to resistance',
          },
        ],
        hasQuiz: false,
        hasSimulation: true,
        isPublished: true,
        publishedAt: new Date().toISOString(),
      }
    ]

    // Add lessons for Market Operations if it exists
    if (marketOperations) {
      additionalLessons.push({
        _type: 'lesson',
        title: 'Introduction to Electricity Markets',
        slug: { current: 'introduction-to-electricity-markets' },
        course: { _type: 'reference', _ref: marketOperations._id },
        orderIndex: 1,
        description: 'Overview of deregulated electricity markets and their structure.',
        content: [
          {
            _key: generateKey(),
            _type: 'block',
            children: [
              {
                _key: generateKey(),
                _type: 'span',
                text: 'Electricity markets have evolved from regulated monopolies to competitive markets that determine prices through supply and demand dynamics.',
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
                text: 'Market Participants',
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
                text: 'Electricity markets include generators, load-serving entities, transmission operators, and market operators, each playing crucial roles.',
              },
            ],
          },
        ],
        estimatedDuration: 25,
        learningObjectives: [
          'Understand market deregulation history',
          'Identify key market participants',
          'Learn about market timeframes',
        ],
        keyTerms: [
          {
            _key: generateKey(),
            term: 'ISO/RTO',
            definition: 'Independent System Operator or Regional Transmission Organization that manages electricity markets',
          },
          {
            _key: generateKey(),
            term: 'Market Clearing',
            definition: 'Process of matching supply and demand to determine market prices',
          },
        ],
        hasQuiz: true,
        hasSimulation: false,
        isPublished: true,
        publishedAt: new Date().toISOString(),
      })
    }

    // Create the lessons
    for (const lesson of additionalLessons) {
      const result = await client.create(lesson)
      console.log(`✅ Created lesson: ${result.title}`)
    }

    console.log('🎉 Additional lessons created successfully!')
    console.log(`📊 Added ${additionalLessons.length} new lessons`)
    console.log('🚀 You can now test lesson navigation in the app!')

  } catch (error) {
    console.error('❌ Error creating additional lessons:', error)
  }
}

addMoreLessons()