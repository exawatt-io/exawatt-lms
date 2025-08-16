/**
 * Script to convert bullet point text blocks into proper Sanity list structures
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
 * Convert bullet point text blocks into proper list structures
 */
function convertTextToLists(content) {
  const newContent = [];
  let currentListItems = [];
  
  for (let i = 0; i < content.length; i++) {
    const block = content[i];
    
    // Check if this block contains bullet points
    const hasBulletPoints = block._type === 'block' && 
      block.children?.some(child => 
        child.text && (child.text.includes('• ') || child.text === '• ')
      );
    
    if (hasBulletPoints) {
      // Extract list items from this block
      const fragments = block.children || [];
      const listItems = [];
      let currentItem = '';
      
      for (let j = 0; j < fragments.length; j++) {
        const fragment = fragments[j];
        const text = fragment.text || '';
        
        if (text === '• ' || text.startsWith('• ')) {
          // Start of a new list item
          if (currentItem.trim()) {
            listItems.push({
              text: currentItem.trim(),
              marks: []
            });
          }
          currentItem = text.replace('• ', '');
        } else if (text.includes('\n• ')) {
          // Fragment contains both content and new bullet point
          const parts = text.split('\n• ');
          currentItem += parts[0];
          if (currentItem.trim()) {
            listItems.push({
              text: currentItem.trim(),
              marks: fragment.marks || []
            });
          }
          currentItem = parts[1] || '';
        } else {
          // Continue current item
          currentItem += text;
        }
      }
      
      // Add the last item
      if (currentItem.trim()) {
        listItems.push({
          text: currentItem.trim(),
          marks: []
        });
      }
      
      // Convert to proper list items
      listItems.forEach(item => {
        currentListItems.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          markDefs: [],
          children: [
            {
              _type: 'span',
              _key: generateKey(),
              text: item.text,
              marks: item.marks
            }
          ]
        });
      });
    } else {
      // Regular block - if we have accumulated list items, add them first
      if (currentListItems.length > 0) {
        newContent.push(...currentListItems);
        currentListItems = [];
      }
      
      // Add the regular block
      newContent.push(block);
    }
  }
  
  // Add any remaining list items
  if (currentListItems.length > 0) {
    newContent.push(...currentListItems);
  }
  
  return newContent;
}

async function fixListStructure() {
  try {
    console.log('🔧 Converting bullet points to proper list structures...');

    // Get the lesson
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
    console.log(`   - Original content blocks: ${lesson.content?.length || 0}`);

    // Convert bullet points to proper lists
    const updatedContent = convertTextToLists(lesson.content || []);

    console.log(`   - New content blocks: ${updatedContent.length}`);

    // Update the lesson
    const result = await client
      .patch(lesson._id)
      .set({ content: updatedContent })
      .commit();

    console.log('✅ List structure fixed!');
    console.log(`   - Updated lesson: ${result.title}`);

    // Verify the changes
    const updatedLesson = await client.fetch(`
      *[_type == "lesson" && _id == "${lesson._id}"][0] {
        content[0..10] {
          _type,
          style,
          listItem,
          children[0] {
            text
          }
        }
      }
    `);

    console.log('\n📋 Sample of updated content:');
    updatedLesson.content?.slice(0, 10).forEach((block, i) => {
      const listInfo = block.listItem ? ` [${block.listItem}]` : '';
      console.log(`${i + 1}. ${block.style}${listInfo}: "${block.children?.[0]?.text?.substring(0, 40)}..."`);
    });

    console.log('\n🎉 List structure conversion completed successfully!');

  } catch (error) {
    console.error('❌ Failed to fix list structure:', error);
    throw error;
  }
}

// Run the fix
fixListStructure();