/**
 * Test script to verify the migrated lesson content in Sanity
 */

import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
});

async function testMigration() {
  try {
    console.log('🧪 Testing migrated content...');

    // Test 1: Check if Grid Fundamentals course exists
    const course = await client.fetch(
      `*[_type == "course" && slug.current == "grid-fundamentals"][0] {
        _id,
        title,
        slug,
        status,
        "lessonCount": count(*[_type == "lesson" && references(^._id)])
      }`
    );

    if (course) {
      console.log('✅ Course found:');
      console.log(`   - Title: ${course.title}`);
      console.log(`   - Status: ${course.status}`);
      console.log(`   - Lessons: ${course.lessonCount}`);
    } else {
      console.log('❌ Grid Fundamentals course not found');
      return;
    }

    // Test 2: Check if the migrated lesson exists
    const lesson = await client.fetch(
      `*[_type == "lesson" && slug.current == "introduction-to-electrical-power-systems"][0] {
        _id,
        title,
        slug,
        isPublished,
        estimatedDuration,
        "contentBlocks": length(content),
        "learningObjectivesCount": length(learningObjectives),
        "keyTermsCount": length(keyTerms),
        course->{
          title,
          slug
        }
      }`
    );

    if (lesson) {
      console.log('✅ Lesson found:');
      console.log(`   - Title: ${lesson.title}`);
      console.log(`   - Published: ${lesson.isPublished}`);
      console.log(`   - Duration: ${lesson.estimatedDuration} minutes`);
      console.log(`   - Content blocks: ${lesson.contentBlocks}`);
      console.log(`   - Learning objectives: ${lesson.learningObjectivesCount}`);
      console.log(`   - Key terms: ${lesson.keyTermsCount}`);
      console.log(`   - Course: ${lesson.course?.title || 'Not linked'}`);
    } else {
      console.log('❌ Migrated lesson not found');
      return;
    }

    // Test 3: Check lesson content structure
    const lessonContent = await client.fetch(
      `*[_type == "lesson" && slug.current == "introduction-to-electrical-power-systems"][0] {
        content[0..2] {
          _type,
          style,
          "text": children[0].text[0..50]
        },
        learningObjectives[0..2],
        keyTerms[0..2] {
          term,
          definition[0..50]
        }
      }`
    );

    if (lessonContent) {
      console.log('✅ Content structure verified:');
      console.log('   - Sample content blocks:');
      lessonContent.content?.forEach((block, i) => {
        console.log(`     ${i + 1}. ${block._type} (${block.style}): "${block.text || 'No text'}..."`);
      });
      
      console.log('   - Sample learning objectives:');
      lessonContent.learningObjectives?.forEach((obj, i) => {
        console.log(`     ${i + 1}. ${obj}`);
      });
      
      console.log('   - Sample key terms:');
      lessonContent.keyTerms?.forEach((term, i) => {
        console.log(`     ${i + 1}. ${term.term}: ${term.definition}...`);
      });
    }

    console.log('\n🎉 Migration verification completed successfully!');
    console.log('The lesson is ready to be displayed on the frontend.');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testMigration();