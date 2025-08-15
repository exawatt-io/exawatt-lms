import { groq } from 'next-sanity'

// GROQ queries for ExaWatt content

export const COURSES_QUERY = groq`
  *[_type == "course" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    difficulty,
    duration,
    estimatedHours,
    enrollmentCount,
    rating,
    isFeatured,
    tags,
    price,
    instructor->{
      _id,
      name,
      title,
      slug
    },
    category->{
      _id,
      title,
      color,
      icon,
      slug
    },
    learningObjectives,
    featuredImage,
    publishedAt
  }
`

export const COURSE_BY_SLUG_QUERY = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    difficulty,
    duration,
    estimatedHours,
    enrollmentCount,
    rating,
    isFeatured,
    tags,
    price,
    status,
    learningObjectives,
    featuredImage,
    publishedAt,
    instructor->{
      _id,
      name,
      title,
      bio,
      avatar,
      expertise,
      experience,
      slug
    },
    category->{
      _id,
      title,
      description,
      color,
      icon,
      slug
    },
    prerequisites[]->{
      _id,
      title,
      slug,
      difficulty
    },
    "lessons": *[_type == "lesson" && references(^._id) && isPublished == true] | order(orderIndex) {
      _id,
      title,
      slug,
      orderIndex,
      description,
      estimatedDuration,
      hasQuiz,
      hasSimulation,
      simulationReference->{
        _id,
        title,
        slug
      }
    }
  }
`

export const SIMULATIONS_QUERY = groq`
  *[_type == "simulation" && status == "available"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    difficulty,
    estimatedDuration,
    features,
    learningObjectives,
    icon,
    colorGradient,
    tags,
    status,
    isFeatured,
    userCount,
    rating,
    publishedAt,
    category->{
      _id,
      title,
      color,
      icon,
      slug
    },
    prerequisites[]->{
      _id,
      title,
      slug,
      _type
    }
  }
`

export const SIMULATION_BY_SLUG_QUERY = groq`
  *[_type == "simulation" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    fullDescription,
    difficulty,
    estimatedDuration,
    features,
    learningObjectives,
    icon,
    colorGradient,
    tags,
    status,
    userCount,
    rating,
    publishedAt,
    defaultParameters,
    scenarios,
    category->{
      _id,
      title,
      description,
      color,
      icon,
      slug
    },
    prerequisites[]->{
      _id,
      title,
      slug,
      _type,
      difficulty
    }
  }
`

export const FEATURED_COURSES_QUERY = groq`
  *[_type == "course" && status == "published" && isFeatured == true] | order(rating desc) [0...3] {
    _id,
    title,
    slug,
    description,
    difficulty,
    duration,
    enrollmentCount,
    rating,
    instructor->{
      name,
      title
    },
    category->{
      title,
      color,
      icon
    },
    featuredImage
  }
`

export const FEATURED_SIMULATIONS_QUERY = groq`
  *[_type == "simulation" && status == "available" && isFeatured == true] | order(rating desc) [0...3] {
    _id,
    title,
    slug,
    description,
    difficulty,
    estimatedDuration,
    features[0...3],
    userCount,
    rating,
    icon,
    colorGradient,
    category->{
      title,
      color
    }
  }
`

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    color,
    icon,
    order,
    "courseCount": count(*[_type == "course" && references(^._id) && status == "published"]),
    "simulationCount": count(*[_type == "simulation" && references(^._id) && status == "available"])
  }
`

export const INSTRUCTORS_QUERY = groq`
  *[_type == "instructor" && isActive == true] | order(name asc) {
    _id,
    name,
    slug,
    title,
    avatar,
    bio,
    expertise,
    experience,
    "courseCount": count(*[_type == "course" && references(^._id) && status == "published"])
  }
`

export const LESSON_BY_SLUG_QUERY = groq`
  *[_type == "lesson" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    estimatedDuration,
    learningObjectives,
    keyTerms,
    hasQuiz,
    hasSimulation,
    orderIndex,
    course->{
      _id,
      title,
      slug,
      difficulty,
      instructor->{
        name,
        title
      }
    },
    simulationReference->{
      _id,
      title,
      slug,
      description
    },
    "previousLesson": *[_type == "lesson" && references(^.course._id) && orderIndex == (^.orderIndex - 1)][0] {
      title,
      slug
    },
    "nextLesson": *[_type == "lesson" && references(^.course._id) && orderIndex == (^.orderIndex + 1)][0] {
      title,
      slug
    }
  }
`

export const SEARCH_CONTENT_QUERY = groq`
  *[_type in ["course", "simulation"] && (
    title match $searchTerm + "*" ||
    description match $searchTerm + "*" ||
    tags[]match $searchTerm + "*"
  )] {
    _type,
    _id,
    title,
    slug,
    description,
    difficulty,
    "type": _type,
    category->{
      title,
      color
    }
  }
`