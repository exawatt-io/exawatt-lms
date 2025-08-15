import { client } from './client'
import {
  COURSES_QUERY,
  COURSE_BY_SLUG_QUERY,
  SIMULATIONS_QUERY,
  SIMULATION_BY_SLUG_QUERY,
  FEATURED_COURSES_QUERY,
  FEATURED_SIMULATIONS_QUERY,
  CATEGORIES_QUERY,
  INSTRUCTORS_QUERY,
  LESSON_BY_SLUG_QUERY,
  SEARCH_CONTENT_QUERY,
} from './queries'
import type {
  Course,
  Simulation,
  Category,
  Instructor,
  Lesson,
  SearchResult,
} from './types'

// Course fetching functions
export async function getCourses(): Promise<Course[]> {
  try {
    const courses = await client.fetch<Course[]>(COURSES_QUERY)
    return courses
  } catch (error) {
    console.error('Error fetching courses:', error)
    return []
  }
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const course = await client.fetch<Course | null>(COURSE_BY_SLUG_QUERY, { slug })
    return course
  } catch (error) {
    console.error('Error fetching course by slug:', error)
    return null
  }
}

export async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const courses = await client.fetch<Course[]>(FEATURED_COURSES_QUERY)
    return courses
  } catch (error) {
    console.error('Error fetching featured courses:', error)
    return []
  }
}

// Simulation fetching functions
export async function getSimulations(): Promise<Simulation[]> {
  try {
    const simulations = await client.fetch<Simulation[]>(SIMULATIONS_QUERY)
    return simulations
  } catch (error) {
    console.error('Error fetching simulations:', error)
    return []
  }
}

export async function getSimulationBySlug(slug: string): Promise<Simulation | null> {
  try {
    const simulation = await client.fetch<Simulation | null>(SIMULATION_BY_SLUG_QUERY, { slug })
    return simulation
  } catch (error) {
    console.error('Error fetching simulation by slug:', error)
    return null
  }
}

export async function getFeaturedSimulations(): Promise<Simulation[]> {
  try {
    const simulations = await client.fetch<Simulation[]>(FEATURED_SIMULATIONS_QUERY)
    return simulations
  } catch (error) {
    console.error('Error fetching featured simulations:', error)
    return []
  }
}

// Category and instructor functions
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await client.fetch<Category[]>(CATEGORIES_QUERY)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export async function getInstructors(): Promise<Instructor[]> {
  try {
    const instructors = await client.fetch<Instructor[]>(INSTRUCTORS_QUERY)
    return instructors
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return []
  }
}

// Lesson functions
export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    const lesson = await client.fetch<Lesson | null>(LESSON_BY_SLUG_QUERY, { slug })
    return lesson
  } catch (error) {
    console.error('Error fetching lesson by slug:', error)
    return null
  }
}

// Search function
export async function searchContent(searchTerm: string): Promise<SearchResult[]> {
  try {
    const results = await client.fetch<SearchResult[]>(SEARCH_CONTENT_QUERY, { searchTerm })
    return results
  } catch (error) {
    console.error('Error searching content:', error)
    return []
  }
}

// Utility functions for filtering and sorting
export function filterCoursesByDifficulty(courses: Course[], difficulty: string): Course[] {
  if (difficulty === 'all') return courses
  return courses.filter(course => course.difficulty.toLowerCase() === difficulty.toLowerCase())
}

export function filterCoursesByCategory(courses: Course[], categorySlug: string): Course[] {
  if (categorySlug === 'all') return courses
  return courses.filter(course => course.category.slug.current === categorySlug)
}

export function filterSimulationsByCategory(simulations: Simulation[], categorySlug: string): Simulation[] {
  if (categorySlug === 'all') return simulations
  return simulations.filter(simulation => simulation.category.slug.current === categorySlug)
}

export function sortCourses(courses: Course[], sortBy: 'title' | 'rating' | 'enrollment' | 'newest'): Course[] {
  const sorted = [...courses]
  
  switch (sortBy) {
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'enrollment':
      return sorted.sort((a, b) => b.enrollmentCount - a.enrollmentCount)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    default:
      return sorted
  }
}

// Helper function to get difficulty color classes (matching existing design)
export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-900/50 text-green-300'
    case 'Intermediate':
      return 'bg-yellow-900/50 text-yellow-300'
    case 'Advanced':
      return 'bg-red-900/50 text-red-300'
    default:
      return 'bg-slate-700 text-slate-300'
  }
}

// Helper function to get status colors
export function getStatusColor(status: string): string {
  switch (status) {
    case 'new':
      return 'bg-electric-600 text-white'
    case 'available':
      return 'bg-green-900/50 text-green-300'
    case 'locked':
      return 'bg-slate-700 text-slate-400'
    case 'coming-soon':
      return 'bg-blue-900/50 text-blue-300'
    default:
      return 'bg-slate-700 text-slate-300'
  }
}