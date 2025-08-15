// TypeScript interfaces for Sanity content types

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  color: string
  icon: string
  order: number
  courseCount?: number
  simulationCount?: number
}

export interface Instructor {
  _id: string
  name: string
  slug: {
    current: string
  }
  title?: string
  avatar?: SanityImage
  bio?: any[] // Portable Text
  expertise?: string[]
  experience?: number
  courseCount?: number
}

export interface Course {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  fullDescription?: any[] // Portable Text
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  estimatedHours?: number
  enrollmentCount: number
  rating: number
  isFeatured: boolean
  tags: string[]
  price: {
    amount: number
    currency: string
    isFree: boolean
  }
  status: 'draft' | 'published' | 'coming-soon' | 'archived'
  learningObjectives: string[]
  featuredImage?: SanityImage
  publishedAt: string
  instructor: Instructor
  category: Category
  prerequisites?: Course[]
  lessons?: Lesson[]
}

export interface Lesson {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  content?: any[] // Portable Text
  estimatedDuration?: number
  learningObjectives?: string[]
  keyTerms?: Array<{
    term: string
    definition: string
  }>
  hasQuiz: boolean
  hasSimulation: boolean
  orderIndex: number
  course?: Course
  simulationReference?: Simulation
  previousLesson?: {
    title: string
    slug: {
      current: string
    }
  }
  nextLesson?: {
    title: string
    slug: {
      current: string
    }
  }
}

export interface Simulation {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  fullDescription?: any[] // Portable Text
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedDuration: string
  features: string[]
  learningObjectives: string[]
  icon: string
  colorGradient: string
  tags: string[]
  status: 'available' | 'new' | 'locked' | 'coming-soon' | 'maintenance'
  isFeatured: boolean
  userCount: number
  rating: number
  publishedAt: string
  defaultParameters?: {
    generators?: string
    demand?: string
    settings?: string
  }
  scenarios?: Array<{
    name: string
    description: string
    parameters: string
    isDefault: boolean
  }>
  category: Category
  prerequisites?: Array<Course | Simulation>
}

// API Response types
export interface CoursesResponse {
  courses: Course[]
}

export interface SimulationsResponse {
  simulations: Simulation[]
}

export interface SearchResult {
  _type: 'course' | 'simulation'
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  difficulty: string
  type: string
  category: Category
}