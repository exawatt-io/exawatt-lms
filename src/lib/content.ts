/**
 * Legacy content utilities - DEPRECATED
 * 
 * All course and lesson content is now managed through Sanity CMS.
 * Use the following instead:
 * 
 * - Course data: /src/sanity/lib/queries.ts (COURSE_BY_SLUG_QUERY)
 * - Lesson data: /src/sanity/lib/queries.ts (LESSON_BY_SLUG_QUERY)
 * - Content fetching: /src/sanity/lib/fetch.ts (sanityFetch)
 * 
 * This file is kept for reference but all functions are deprecated.
 */

export interface LessonMetadata {
  title: string;
  duration: string;
  description?: string;
  courseId: string;
  lessonId: string;
}

/**
 * @deprecated Use Sanity CMS lesson queries instead
 */
export async function getLessonContent(courseId: string, lessonId: string): Promise<string | null> {
  console.warn('getLessonContent is deprecated. Use Sanity CMS LESSON_BY_SLUG_QUERY instead.');
  return null;
}

/**
 * @deprecated Use Sanity CMS lesson queries instead
 */
export function getLessonMetadata(courseId: string, lessonId: string): LessonMetadata | null {
  console.warn('getLessonMetadata is deprecated. Use Sanity CMS LESSON_BY_SLUG_QUERY instead.');
  return null;
}