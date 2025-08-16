# Sanity CMS Technical Integration

## Frontend Integration

### File Structure
- **Data fetching utilities**: `/src/sanity/lib/fetch.ts`
- **TypeScript interfaces**: `/src/sanity/lib/types.ts`
- **GROQ queries**: `/src/sanity/lib/queries.ts`
- **PortableText rendering**: Custom components in lesson pages
- **Dynamic routing**: For courses and lessons

### Configuration
- **Client setup**: `/src/sanity/lib/client.ts`
- **Environment variables**: Configured in `.env.local`
- **Studio config**: `/sanity.config.ts`

## GROQ Query Examples

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

## Portable Text Rendering

### Custom Components
The lesson pages use custom Portable Text components for rich content rendering:

```typescript
const portableTextComponents = {
  block: {
    h2: ({children}: any) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-semibold text-slate-200 mb-3 mt-6">{children}</h3>,
    normal: ({children}: any) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({children}: any) => <ul className="text-slate-300 mb-4 leading-relaxed space-y-2">{children}</ul>,
  },
  listItem: {
    bullet: ({children}: any) => (
      <li className="flex items-start gap-2">
        <div className="w-1.5 h-1.5 bg-electric-400 rounded-full mt-2 flex-shrink-0" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({children}: any) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({children}: any) => <em className="text-electric-300 italic">{children}</em>,
  },
  types: {
    image: ({value}: any) => (
      <div className="my-6">
        <img src={value.asset.url} alt={value.alt || ''} className="rounded-lg w-full" />
        {value.caption && <p className="text-sm text-slate-400 mt-2 text-center italic">{value.caption}</p>}
      </div>
    ),
    codeBlock: ({value}: any) => (
      <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
        <code className={`language-${value.language} text-sm`}>{value.code}</code>
      </pre>
    ),
  },
};
```

### Supported Content Types
- **Headers**: H2, H3, H4 with custom styling
- **Paragraphs**: Professional typography
- **Lists**: Custom bullet points with Electric Energy theme
- **Bold/Italic**: Proper mark rendering
- **Images**: Responsive with captions
- **Code Blocks**: Syntax highlighting support
- **Callouts**: Info, warning, success, error styles

## Data Fetching Patterns

### Server Components
```typescript
// Fetch data in server components
export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const course = await getCourseBySlug(params.courseId);
  return <CourseDetail course={course} />;
}
```

### Parallel Queries
```typescript
// Fetch multiple related data in parallel
const [lesson, course] = await Promise.all([
  getLessonBySlug(lessonId),
  getCourseBySlug(courseId)
]);
```

### Error Handling
```typescript
if (!lesson || !course || lesson.course?._id !== course._id) {
  notFound();
}
```

## Performance Optimization

### Caching Strategy
- **Static pages**: Pre-generate course and lesson pages
- **Incremental Static Regeneration**: Update content without full rebuilds
- **Client caching**: Use Next.js built-in caching for Sanity queries

### Query Optimization
- **Selective fields**: Only fetch needed data in GROQ queries
- **Reference expansion**: Use `->` operator for related content
- **Pagination**: Implement for large content lists

### Image Optimization
- **Sanity CDN**: Automatic image optimization and WebP conversion
- **Responsive images**: Use Sanity's URL parameters for different sizes
- **Alt text**: Always include for accessibility

## API Integration

### Sanity Client Configuration
```typescript
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
});
```

### Type Safety
- **Generated types**: Use Sanity's TypeScript generation
- **Interface definitions**: Custom types for complex queries
- **Runtime validation**: Validate query results when needed

### Real-time Updates
```typescript
// Optional: Real-time updates for live content
export const previewClient = createClient({
  ...client.config(),
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
```