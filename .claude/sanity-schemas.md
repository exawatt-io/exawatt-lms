# Sanity CMS Schema Documentation

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
- `seo` - SEO settings object for search optimization

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
- `seo` - SEO settings object for search optimization

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
- `seo` - SEO settings object for search optimization

**Purpose:** Interactive learning tools with configurable parameters and scenarios.

#### 6. **SEO Object** (`seo`)
Reusable SEO configuration for all content types.

**Fields:**
- `metaTitle` - SEO title tag (50-60 characters recommended)
- `metaDescription` - Meta description (150-160 characters recommended)
- `keywords` - Array of focus keywords (3-5 recommended)
- `ogImage` - Social media sharing image with alt text
- `noIndex` - Boolean to hide from search engines
- `canonicalUrl` - Preferred URL for content
- `structuredData` - Schema.org markup for rich snippets
  - `type` - Schema type (Course, LearningResource, Article, etc.)
  - `educationalLevel` - Difficulty level for educational content
  - `timeRequired` - Duration in ISO 8601 format

**Purpose:** Comprehensive SEO optimization for better search visibility and social sharing.

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

## Schema Files

### File Locations
- `/src/sanity/schemaTypes/category.ts`
- `/src/sanity/schemaTypes/instructor.ts`
- `/src/sanity/schemaTypes/course.ts`
- `/src/sanity/schemaTypes/lesson.ts`
- `/src/sanity/schemaTypes/simulation.ts`
- `/src/sanity/schemaTypes/objects/seo.ts` - Reusable SEO object schema

### Field Groups
All content types use consistent field grouping:
- **Content** - Main content fields (title, description, rich text)
- **Details** - Metadata and configuration
- **Structure** - Relationships and ordering
- **SEO** - Search engine optimization settings

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
- **Comprehensive SEO system** with dedicated SEO object type:
  - Meta titles and descriptions with character count validation
  - Focus keywords for targeted optimization
  - Open Graph images for social media sharing
  - Schema.org structured data for rich snippets
  - Educational metadata for course-specific markup
  - Canonical URLs and search engine controls