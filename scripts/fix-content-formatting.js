/**
 * Script to fix content formatting issues from the initial migration
 * This will update the existing lesson content to properly handle bold text and other formatting
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

const generateKey = () => Math.random().toString(36).substring(2, 15);

/**
 * Parse text with markdown-style formatting and convert to proper Sanity spans
 */
function parseTextWithFormatting(text) {
  const children = [];
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  parts.forEach(part => {
    if (part.startsWith('**') && part.endsWith('**')) {
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

  return children;
}

/**
 * Process content blocks to fix formatting
 */
function processContentBlocks(content) {
  return content.map(block => {
    if (block._type === 'block' && block.children) {
      // Process each child span
      const newChildren = [];
      
      block.children.forEach(child => {
        if (child.text && child.text.includes('**')) {
          // This span contains bold formatting that needs to be split
          const formattedChildren = parseTextWithFormatting(child.text);
          newChildren.push(...formattedChildren);
        } else {
          // Keep the span as-is
          newChildren.push(child);
        }
      });

      return {
        ...block,
        children: newChildren
      };
    }
    
    return block;
  });
}

async function fixContentFormatting() {
  try {
    console.log('🔧 Fixing content formatting...');

    // Get the lesson that needs formatting fixes
    const lesson = await client.fetch(`
      *[_type == "lesson" && slug.current == "introduction-to-electrical-power-systems"][0] {
        _id,
        _rev,
        title,
        content
      }
    `);

    if (!lesson) {
      console.log('❌ Lesson not found');
      return;
    }

    console.log(`✅ Found lesson: ${lesson.title}`);
    console.log(`   - Content blocks: ${lesson.content?.length || 0}`);

    // Process the content to fix formatting
    const updatedContent = processContentBlocks(lesson.content || []);

    // Update the lesson with fixed content
    const result = await client
      .patch(lesson._id)
      .set({ content: updatedContent })
      .commit();

    console.log('✅ Content formatting fixed!');
    console.log(`   - Updated lesson: ${result.title}`);
    console.log(`   - Processed ${updatedContent.length} content blocks`);

    // Verify the changes
    const updatedLesson = await client.fetch(`
      *[_type == "lesson" && _id == "${lesson._id}"][0] {
        content[0..2] {
          _type,
          style,
          children[] {
            text,
            marks
          }
        }
      }
    `);

    console.log('\n📋 Sample of updated content:');
    updatedLesson.content?.slice(0, 3).forEach((block, i) => {
      console.log(`${i + 1}. ${block.style}: ${block.children?.length || 0} spans`);
      block.children?.forEach((child, j) => {
        const marks = child.marks?.length ? ` [${child.marks.join(', ')}]` : '';
        console.log(`   ${j + 1}. "${child.text?.substring(0, 50)}..."${marks}`);
      });
    });

    console.log('\n🎉 Formatting fixes completed successfully!');

  } catch (error) {
    console.error('❌ Failed to fix formatting:', error);
    throw error;
  }
}

// Run the fix
fixContentFormatting();