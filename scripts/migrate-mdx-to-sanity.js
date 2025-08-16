/**
 * Script to migrate existing MDX lesson content to Sanity CMS
 * This will parse the MDX file and create proper Sanity documents
 */

import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

/**
 * Parse MDX content and convert to Portable Text blocks
 */
function parseMDXToPortableText(mdxContent) {
  const lines = mdxContent.split('\n');
  const blocks = [];
  let currentBlock = null;
  let listItems = [];
  let isInCodeBlock = false;
  let codeBlockContent = [];
  let codeBlockLanguage = '';

  const generateKey = () => Math.random().toString(36).substring(2, 15);

  // Helper function to parse text with markdown formatting
  const parseTextWithMarks = (text) => {
    const children = [];
    // Split by bold markers while preserving the markers
    const parts = text.split(/(\*\*[^*]*\*\*)/);
    
    parts.forEach(part => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        // Bold text
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: part.slice(2, -2),
          marks: ['strong']
        });
      } else if (part.trim()) {
        // Regular text
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: part,
          marks: []
        });
      }
    });
    
    return children.length > 0 ? children : [{
      _type: 'span',
      _key: generateKey(),
      text: text,
      marks: []
    }];
  };

  const finishCurrentBlock = () => {
    if (currentBlock) {
      blocks.push(currentBlock);
      currentBlock = null;
    }
    if (listItems.length > 0) {
      // Create separate block for each list item to handle bold formatting
      listItems.forEach(item => {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: '• ',
              marks: []
            },
            ...parseTextWithMarks(item)
          ]
        });
      });
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line && !isInCodeBlock) continue;

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!isInCodeBlock) {
        finishCurrentBlock();
        isInCodeBlock = true;
        codeBlockLanguage = line.substring(3) || 'text';
        codeBlockContent = [];
      } else {
        // End code block
        blocks.push({
          _type: 'codeBlock',
          _key: generateKey(),
          language: codeBlockLanguage,
          code: codeBlockContent.join('\n')
        });
        isInCodeBlock = false;
        codeBlockContent = [];
        codeBlockLanguage = '';
      }
      continue;
    }

    if (isInCodeBlock) {
      codeBlockContent.push(lines[i]); // Preserve original spacing
      continue;
    }

    // Handle headers
    if (line.startsWith('#')) {
      finishCurrentBlock();
      const level = line.match(/^#+/)[0].length;
      const text = line.substring(level).trim();
      
      // Skip the main title (h1)
      if (level === 1) continue;
      
      const style = level === 2 ? 'h2' : level === 3 ? 'h3' : level === 4 ? 'h4' : 'normal';
      
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: style,
        markDefs: [],
        children: parseTextWithMarks(text)
      });
      continue;
    }

    // Handle list items
    if (line.startsWith('- ') || line.startsWith('* ') || /^\d+\./.test(line)) {
      const text = line.replace(/^[-*\d\.]\s*/, '');
      listItems.push(text);
      continue;
    }


    // Handle horizontal rules
    if (line === '---') {
      finishCurrentBlock();
      continue;
    }

    // Handle regular paragraphs
    if (line && !line.startsWith('#')) {
      finishCurrentBlock();
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        markDefs: [],
        children: parseTextWithMarks(line)
      });
    }
  }

  finishCurrentBlock();
  return blocks;
}

/**
 * Extract learning objectives from MDX content
 */
function extractLearningObjectives(mdxContent) {
  const lines = mdxContent.split('\n');
  const objectives = [];
  let inObjectivesSection = false;

  for (const line of lines) {
    if (line.includes('## Learning Objectives')) {
      inObjectivesSection = true;
      continue;
    }
    
    if (inObjectivesSection && line.startsWith('##')) {
      break;
    }
    
    if (inObjectivesSection && line.startsWith('- ')) {
      objectives.push(line.substring(2).trim());
    }
  }

  return objectives;
}

/**
 * Extract key terms from MDX content
 */
function extractKeyTerms(mdxContent) {
  const lines = mdxContent.split('\n');
  const keyTerms = [];
  let inKeyTermsSection = false;

  for (const line of lines) {
    if (line.includes('## Key Terms')) {
      inKeyTermsSection = true;
      continue;
    }
    
    if (inKeyTermsSection && line.startsWith('##')) {
      break;
    }
    
    if (inKeyTermsSection && line.startsWith('**') && line.includes('**:')) {
      const colonIndex = line.indexOf(':');
      const term = line.substring(2, line.indexOf('**', 2));
      const definition = line.substring(colonIndex + 1).trim();
      
      keyTerms.push({
        _key: Math.random().toString(36).substring(2, 15),
        term: term,
        definition: definition
      });
    }
  }

  return keyTerms;
}

/**
 * Main migration function
 */
async function migrateMDXLesson() {
  try {
    console.log('🚀 Starting MDX to Sanity migration...');

    // Read the MDX file (configurable)
    const lessonFile = process.argv[2] || '../content/courses/grid-fundamentals/lessons/02-power-generation-technologies.mdx';
    const mdxPath = path.join(__dirname, lessonFile);
    
    if (!fs.existsSync(mdxPath)) {
      throw new Error(`MDX file not found at: ${mdxPath}`);
    }

    const mdxContent = fs.readFileSync(mdxPath, 'utf-8');
    console.log('✅ MDX content loaded');

    // Extract the title (first h1)
    const titleMatch = mdxContent.match(/^# (.+)$/m);
    const title = titleMatch ? titleMatch[1] : 'Untitled Lesson';
    
    // Generate slug from title
    const slug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Parse content
    const contentBlocks = parseMDXToPortableText(mdxContent);
    const learningObjectives = extractLearningObjectives(mdxContent);
    const keyTerms = extractKeyTerms(mdxContent);

    console.log('✅ Content parsed successfully');
    console.log(`   - ${contentBlocks.length} content blocks`);
    console.log(`   - ${learningObjectives.length} learning objectives`);
    console.log(`   - ${keyTerms.length} key terms`);

    // First, ensure we have the Grid Fundamentals course
    const existingCourse = await client.fetch(
      `*[_type == "course" && slug.current == "grid-fundamentals"][0]`
    );

    let courseId;
    if (existingCourse) {
      courseId = existingCourse._id;
      console.log('✅ Found existing Grid Fundamentals course');
    } else {
      // Create the course first
      console.log('📝 Creating Grid Fundamentals course...');
      
      // Get or create category
      let category = await client.fetch(
        `*[_type == "category" && slug.current == "grid-fundamentals"][0]`
      );
      
      if (!category) {
        category = await client.create({
          _type: 'category',
          title: 'Grid Fundamentals',
          slug: { current: 'grid-fundamentals' },
          description: 'Understanding electrical power system basics and grid operations',
          color: 'from-electric-blue-500 to-electric-blue-700',
          icon: 'Zap',
          order: 1
        });
        console.log('✅ Created Grid Fundamentals category');
      }

      // Get or create instructor
      let instructor = await client.fetch(
        `*[_type == "instructor" && slug.current == "sarah-chen"][0]`
      );
      
      if (!instructor) {
        instructor = await client.create({
          _type: 'instructor',
          name: 'Dr. Sarah Chen',
          slug: { current: 'sarah-chen' },
          title: 'Senior Power Systems Engineer',
          bio: [
            {
              _type: 'block',
              _key: Math.random().toString(36).substring(2, 15),
              style: 'normal',
              markDefs: [],
              children: [
                {
                  _type: 'span',
                  _key: Math.random().toString(36).substring(2, 15),
                  text: 'Dr. Sarah Chen is a leading expert in power systems engineering with over 15 years of experience in grid operations and renewable energy integration.',
                  marks: []
                }
              ]
            }
          ],
          expertise: ['Power Systems', 'Grid Operations', 'Renewable Integration'],
          credentials: [
            {
              _key: Math.random().toString(36).substring(2, 15),
              degree: 'Ph.D. in Electrical Engineering',
              institution: 'MIT',
              year: 2008
            }
          ],
          experience: 15,
          isActive: true
        });
        console.log('✅ Created instructor profile');
      }

      // Create the course
      const course = await client.create({
        _type: 'course',
        title: 'Grid Fundamentals',
        slug: { current: 'grid-fundamentals' },
        description: 'Learn the essential concepts of electrical power systems, from generation to consumption.',
        fullDescription: [
          {
            _type: 'block',
            _key: Math.random().toString(36).substring(2, 15),
            style: 'normal',
            markDefs: [],
            children: [
              {
                _type: 'span',
                _key: Math.random().toString(36).substring(2, 15),
                text: 'This comprehensive course covers the fundamental concepts of electrical power systems. Students will learn about power generation, transmission, distribution, and the critical role of the electrical grid in modern society.',
                marks: []
              }
            ]
          }
        ],
        instructor: { _type: 'reference', _ref: instructor._id },
        category: { _type: 'reference', _ref: category._id },
        difficulty: 'Beginner',
        duration: '4 weeks',
        estimatedHours: 20,
        learningObjectives: [
          'Understand the basic components of electrical power systems',
          'Learn how electricity flows from generation to consumption',
          'Explore the role of the electrical grid in society',
          'Master key terminology used in power systems'
        ],
        tags: ['power systems', 'electrical grid', 'energy', 'fundamentals'],
        price: {
          amount: 0,
          currency: 'USD',
          isFree: true
        },
        status: 'published',
        isFeatured: true,
        enrollmentCount: 1250,
        rating: 4.8,
        publishedAt: new Date().toISOString(),
        seo: {
          metaTitle: 'Grid Fundamentals - Learn Power Systems Basics | ExaWatt',
          metaDescription: 'Master electrical power system fundamentals with our comprehensive course. Learn generation, transmission, distribution and grid operations.',
          keywords: ['power systems', 'electrical grid', 'energy education'],
          structuredData: {
            type: 'Course',
            educationalLevel: 'Beginner',
            timeRequired: 'PT20H'
          }
        }
      });

      courseId = course._id;
      console.log('✅ Created Grid Fundamentals course');
    }

    // Create the lesson
    console.log('📝 Creating lesson document...');
    
    // Extract description from first paragraph after title
    const descriptionMatch = mdxContent.match(/^# .+\n\n(.+?)(?:\n\n|$)/m);
    const description = descriptionMatch ? descriptionMatch[1] : 'Course lesson covering key concepts.';
    
    // Determine order index (look for existing lessons)
    const existingLessons = await client.fetch(
      `*[_type == "lesson" && references($courseId)] | order(orderIndex desc) [0]`,
      { courseId }
    );
    const orderIndex = existingLessons ? existingLessons.orderIndex + 1 : 1;
    
    // Check if lesson already exists and update instead of create
    const existingLesson = await client.fetch(
      `*[_type == "lesson" && slug.current == $slug][0]`,
      { slug }
    );

    let lesson;
    if (existingLesson) {
      console.log('📝 Updating existing lesson...');
      lesson = await client
        .patch(existingLesson._id)
        .set({
          title: title,
          description: description,
          content: contentBlocks,
          estimatedDuration: 25,
          learningObjectives: learningObjectives,
          keyTerms: keyTerms,
          hasQuiz: true,
          hasSimulation: false,
          isPublished: true,
          publishedAt: new Date().toISOString(),
        })
        .commit();
    } else {
      console.log('📝 Creating new lesson...');
      lesson = await client.create({
        _type: 'lesson',
        title: title,
        slug: { current: slug },
        course: { _type: 'reference', _ref: courseId },
        orderIndex: orderIndex,
        description: description,
        content: contentBlocks,
        estimatedDuration: 25,
        learningObjectives: learningObjectives,
        keyTerms: keyTerms,
        hasQuiz: true,
        hasSimulation: false,
        isPublished: true,
        publishedAt: new Date().toISOString(),
        seo: {
          metaTitle: 'Introduction to Electrical Power Systems | ExaWatt',
          metaDescription: 'Learn power system basics: generation, transmission, distribution. Understand how electricity flows from power plants to your home.',
          keywords: ['power systems', 'electricity generation', 'electrical grid'],
          structuredData: {
            type: 'LearningResource',
            educationalLevel: 'Beginner',
            timeRequired: 'PT25M'
          }
        }
      });
    }

    console.log('✅ Successfully migrated MDX lesson to Sanity!');
    console.log(`   - Course ID: ${courseId}`);
    console.log(`   - Lesson ID: ${lesson._id}`);
    console.log(`   - Title: ${title}`);
    console.log(`   - Order: ${orderIndex}`);
    console.log(`   - Lesson URL: /app/courses/grid-fundamentals/lessons/${slug}`);

    return {
      courseId,
      lessonId: lesson._id,
      success: true
    };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run the migration
migrateMDXLesson()
  .then((result) => {
    console.log('\n🎉 Migration completed successfully!');
    console.log('You can now view the lesson in Sanity Studio and on the frontend.');
  })
  .catch((error) => {
    console.error('\n💥 Migration failed:', error.message);
    process.exit(1);
  });