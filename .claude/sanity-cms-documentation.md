# ExaWatt Sanity CMS Documentation

## Overview
ExaWatt uses Sanity CMS to manage educational content for power markets training. This document outlines the content structure, schema relationships, and content strategy.

## Content Architecture

### Core Content Types

#### 1. **Category** (`category`)
Organizes courses and simulations by subject area.

**Fields:**
- `title` - Display name (e.g., "Market Operations", "Grid Fundamentals")
- `slug` - URL-friendly identifier 
- `description` - Brief explanation of the category
- `color` - Tailwind gradient class for visual theming
- `icon` - Lucide icon name for UI display
- `order` - Display sequence number

**Purpose:** Provides organized navigation and visual consistency across the platform.

#### 2. **Instructor** (`instructor`)
Profiles of course instructors and industry experts.

**Fields:**
- `name` - Full name
- `slug` - URL identifier
- `title` - Professional title/position
- `avatar` - Profile photo (Sanity image)
- `bio` - Rich text biography (Portable Text)
- `expertise` - Array of specialization areas
- `credentials` - Array of degrees/certifications with institution and year
- `experience` - Years of experience (number)
- `linkedin` - LinkedIn profile URL
- `isActive` - Whether instructor is currently teaching

**Purpose:** Builds credibility and provides context for course quality.

#### 3. **Course** (`course`)
Main educational programs covering power markets topics.

**Fields:**
- `title` - Course name
- `slug` - URL identifier
- `description` - Short description for listings (200 chars max)
- `fullDescription` - Detailed course overview (Portable Text)
- `instructor` - Reference to instructor
- `category` - Reference to category
- `difficulty` - Enum: Beginner/Intermediate/Advanced
- `duration` - Human-readable duration (e.g., "4 weeks")
- `estimatedHours` - Total study time estimate
- `prerequisites` - Array of references to required courses
- `learningObjectives` - Array of learning goals
- `tags` - Array of searchable keywords
- `featuredImage` - Course hero image
- `price` - Object with amount, currency, and isFree flag
- `status` - Enum: draft/published/coming-soon/archived
- `isFeatured` - Boolean for homepage prominence
- `enrollmentCount` - Total enrolled students
- `rating` - Average rating (0-5)
- `publishedAt` - Publication timestamp

**Purpose:** Core educational content with comprehensive metadata for marketing and learning paths.

#### 4. **Lesson** (`lesson`)
Individual learning units within courses.

**Fields:**
- `title` - Lesson name
- `slug` - URL identifier
- `course` - Reference to parent course
- `orderIndex` - Position within course sequence
- `description` - Brief lesson overview
- `content` - Rich lesson content (Portable Text with custom blocks)
- `estimatedDuration` - Minutes to complete
- `learningObjectives` - Array of lesson-specific goals
- `keyTerms` - Array of term/definition objects
- `hasQuiz` - Boolean for quiz availability
- `hasSimulation` - Boolean for simulation exercises
- `simulationReference` - Reference to related simulation
- `isPublished` - Publication status
- `publishedAt` - Publication timestamp

**Purpose:** Granular content delivery with rich media support and learning tracking.

#### 5. **Simulation** (`simulation`)
Interactive market simulation tools.

**Fields:**
- `title` - Simulation name
- `slug` - URL identifier
- `description` - Brief description for listings
- `fullDescription` - Detailed explanation (Portable Text)
- `category` - Reference to category
- `difficulty` - Enum: Beginner/Intermediate/Advanced
- `estimatedDuration` - Time to complete (e.g., "15-30 min")
- `features` - Array of key capabilities
- `learningObjectives` - Array of learning goals
- `prerequisites` - Array of references to required courses/simulations
- `icon` - Lucide icon name
- `colorGradient` - Tailwind gradient for theming
- `tags` - Array of searchable keywords
- `defaultParameters` - Object with JSON strings for simulation config
- `scenarios` - Array of predefined scenario objects
- `status` - Enum: available/new/locked/coming-soon/maintenance
- `isFeatured` - Boolean for prominence
- `userCount` - Total users who have used simulation
- `rating` - Average rating (0-5)
- `publishedAt` - Publication timestamp

**Purpose:** Interactive learning tools with configurable parameters and scenarios.

## Content Relationships

```
Category
├── Courses (1:many)
│   ├── Instructor (many:1)
│   ├── Prerequisites (many:many, self-referencing)
│   └── Lessons (1:many)
│       └── Simulation Reference (many:1, optional)
└── Simulations (1:many)
    └── Prerequisites (many:many, references courses/simulations)
```

## Content Strategy

### Learning Path Structure
1. **Categories** organize content by domain expertise
2. **Courses** provide structured learning sequences
3. **Prerequisites** enforce logical progression
4. **Lessons** deliver granular content with simulations
5. **Simulations** provide hands-on practice

### Content Lifecycle
1. **Draft** - Content creation and review
2. **Published** - Live content available to users
3. **Coming Soon** - Marketing preview with enrollment
4. **Archived** - Deprecated content (hidden from new users)

### SEO and Discoverability
- All content types have `slug` fields for clean URLs
- `tags` arrays enable search and filtering
- `description` fields optimize for search engines
- Rich content supports internal linking

## Technical Implementation

### Schema Files
- `/src/sanity/schemaTypes/category.ts`
- `/src/sanity/schemaTypes/instructor.ts`
- `/src/sanity/schemaTypes/course.ts`
- `/src/sanity/schemaTypes/lesson.ts`
- `/src/sanity/schemaTypes/simulation.ts`

### Studio Configuration
- Studio available at `/studio` route
- Custom document structure in `/src/sanity/structure.ts`
- Environment variables in `.env.local`

### Sample Data
- Population script: `/scripts/populate-sanity.js`
- Additional lessons script: `/scripts/add-more-lessons.js`
- Includes realistic content matching existing hardcoded data
- Proper `_key` properties for all array fields

### Frontend Integration
- Data fetching utilities: `/src/sanity/lib/fetch.ts`
- TypeScript interfaces: `/src/sanity/lib/types.ts`
- GROQ queries: `/src/sanity/lib/queries.ts`
- PortableText rendering with custom components
- Dynamic routing for courses and lessons

## Content Management Workflows

### Course Creation Process
1. Create/assign **Category** and **Instructor**
2. Create **Course** with metadata and learning objectives
3. Create **Lessons** in sequential order
4. Link relevant **Simulations** to lessons
5. Set prerequisites and publish

### Content Review Process
1. Content created in `draft` status
2. Review content, metadata, and relationships
3. Verify prerequisites and learning paths
4. Update to `published` status
5. Monitor enrollment and ratings

### Simulation Configuration
1. Create simulation with basic metadata
2. Configure `defaultParameters` JSON for initial state
3. Create multiple `scenarios` for different learning objectives
4. Test simulation functionality
5. Link to relevant lessons and courses

## Best Practices

### Content Creation
- Use consistent terminology across all content
- Ensure learning objectives are specific and measurable
- Create realistic prerequisites that match skill progression
- Include rich media (images, diagrams) for complex concepts

### Technical Considerations
- Always include `_key` properties for array items when using API
- Use references instead of duplicate content
- Optimize images for web delivery
- Validate JSON in simulation parameters

### Content Maintenance
- Regular review of course ratings and feedback
- Update content based on industry changes
- Maintain consistent difficulty progression
- Archive outdated content rather than deleting

## Completed Implementation ✅

### Phase 1 - Core CMS (Completed)
- ✅ **Schema Design** - All 5 core content types implemented
- ✅ **Frontend Integration** - Dynamic pages with Sanity data
- ✅ **Content Management** - Fully functional Sanity Studio
- ✅ **Rich Content** - PortableText with custom components
- ✅ **Navigation** - Complete course-to-lesson routing
- ✅ **Sample Data** - Realistic content for testing
- ✅ **Layout Integration** - AppLayout with proper scrolling

### Current Features Working
- **Dynamic Course Pages** - `/app/courses` with Sanity data
- **Dynamic Simulation Pages** - `/app/simulations` with categories
- **Course Detail Pages** - `/app/courses/[courseId]` with lesson listings
- **Lesson Pages** - `/app/courses/[courseId]/lessons/[lessonId]` with rich content
- **Navigation Flow** - Complete user journey from courses to lessons
- **Content Rendering** - PortableText with callouts, code blocks, images
- **Progress Tracking** - Mock progress integration ready for real data

## Future Enhancements

### Phase 2 Planned Features
- **Real User Progress** - Replace mock progress with actual user data
- **Search & Filtering** - Implement functional search across content
- **Learning Paths** - Guided course sequences
- **Market Scenarios** - Real-world case studies
- **Content Analytics** - Performance metrics
- **A/B Testing** - Content variant testing

### Advanced Content Types
- **Webinar** - Live and recorded sessions
- **Assessment** - Quizzes and examinations
- **Certificate** - Completion credentials
- **Discussion** - Community forums integration
- **Resource** - Downloadable materials

## Query Examples

### Fetch Featured Courses
```groq
*[_type == "course" && isFeatured == true] {
  title,
  slug,
  description,
  difficulty,
  instructor->{name, title},
  category->{title, color},
  rating,
  enrollmentCount
}
```

### Get Course with Lessons
```groq
*[_type == "course" && slug.current == $slug][0] {
  ...,
  instructor->,
  category->,
  "lessons": *[_type == "lesson" && references(^._id)] | order(orderIndex)
}
```

### Available Simulations by Category
```groq
*[_type == "simulation" && status == "available"] {
  title,
  slug,
  description,
  difficulty,
  category->{title, color},
  features,
  rating
} | order(category->order, title)
```

### Get Lesson with Course Context
```groq
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
```

## Troubleshooting

### Common Issues

**Array Key Errors:**
- Always include `_key` properties when creating array items via API
- Use `randomUUID().replace(/-/g, '').substring(0, 12)` for generating keys

**Routing Issues:**
- Ensure all lesson pages use AppLayout for proper scrolling
- Check slug consistency between Sanity and Next.js routes
- Verify course-lesson relationships in Sanity

**Content Not Displaying:**
- Check if content is marked as `isPublished: true`
- Verify references between courses, lessons, and instructors
- Ensure proper GROQ query structure

**Performance:**
- Use parallel queries with `Promise.all()` for multiple data fetches
- Implement proper error handling in fetch functions
- Consider caching for frequently accessed content