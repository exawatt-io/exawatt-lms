import fs from 'fs';
import path from 'path';

export interface LessonMetadata {
  title: string;
  duration: string;
  description?: string;
  courseId: string;
  lessonId: string;
}

export async function getLessonContent(courseId: string, lessonId: string): Promise<string | null> {
  try {
    const contentPath = path.join(process.cwd(), 'content', 'courses', courseId, 'lessons', `${lessonId.padStart(2, '0')}-introduction.mdx`);
    
    if (!fs.existsSync(contentPath)) {
      return null;
    }
    
    const content = fs.readFileSync(contentPath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Error loading lesson content:', error);
    return null;
  }
}

export function getLessonMetadata(courseId: string, lessonId: string): LessonMetadata | null {
  // In a real application, this would come from a CMS or database
  const lessons: Record<string, LessonMetadata> = {
    'grid-fundamentals-1': {
      title: 'Introduction to Electrical Power Systems',
      duration: '25 min',
      description: 'Basic concepts of electricity generation, transmission, and distribution.',
      courseId: 'grid-fundamentals',
      lessonId: '1',
    }
  };
  
  const key = `${courseId}-${lessonId}`;
  return lessons[key] || null;
}