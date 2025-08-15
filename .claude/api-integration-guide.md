# ExaWatt API Integration Guide

## Overview
This guide covers integrating external APIs, data sources, and services into the ExaWatt platform. The platform primarily uses Sanity CMS for content management and integrates with various power market data sources.

## Sanity CMS Integration

### Configuration
**Location:** `src/sanity/env.ts`, `sanity.config.ts`

```typescript
// Environment configuration
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-15';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const token = process.env.SANITY_API_TOKEN;

// Client configuration with CDN optimization
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token,
  perspective: 'published',
});
```

### Data Fetching Patterns

#### Server-Side Fetching
**Location:** `src/sanity/lib/fetch.ts`

```typescript
import { groq } from 'next-sanity';
import { client } from './client';

export async function sanityFetch<T = any>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: any;
  revalidate?: number | false;
  tags?: string[];
}): Promise<T> {
  return client.fetch(query, params, {
    next: {
      revalidate: typeof revalidate === 'number' ? revalidate : false,
      tags,
    },
  });
}

// Usage in page components
export async function getCourse(slug: string) {
  return await sanityFetch({
    query: courseBySlugQuery,
    params: { slug },
    revalidate: 3600, // 1 hour
    tags: [`course:${slug}`],
  });
}
```

#### Client-Side Fetching
```typescript
import { useLiveQuery } from '@sanity/preview-kit';

export function useCourseLive(slug: string, initialData: Course) {
  return useLiveQuery(initialData, courseBySlugQuery, { slug });
}

// Usage in components
function CoursePage({ course, preview }: { course: Course; preview: boolean }) {
  const data = preview ? useCourseLive(course.slug, course) : course;
  
  return <CourseContent course={data} />;
}
```

### GROQ Query Patterns

#### Basic Content Queries
**Location:** `src/sanity/lib/queries.ts`

```typescript
// Featured courses with instructor and category data
export const featuredCoursesQuery = groq`
  *[_type == "course" && isFeatured == true && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    difficulty,
    duration,
    estimatedHours,
    rating,
    enrollmentCount,
    featuredImage,
    instructor->{
      name,
      title,
      avatar
    },
    category->{
      title,
      color,
      icon
    },
    price,
    tags
  }
`;

// Course with related lessons
export const courseWithLessonsQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    ...,
    instructor->,
    category->,
    prerequisites[]->,
    "lessons": *[_type == "lesson" && references(^._id)] | order(orderIndex asc) {
      _id,
      title,
      slug,
      description,
      estimatedDuration,
      orderIndex,
      isPublished
    }
  }
`;
```

#### Complex Relationship Queries
```typescript
// Simulations with prerequisites and related courses
export const simulationWithContextQuery = groq`
  *[_type == "simulation" && slug.current == $slug][0] {
    ...,
    category->,
    prerequisites[]->{
      _type,
      title,
      slug,
      difficulty
    },
    "relatedCourses": *[_type == "course" && category._ref == ^.category._ref && _id != ^._id] | order(rating desc) [0...3] {
      title,
      slug,
      difficulty,
      rating
    }
  }
`;

// Content analytics query
export const contentAnalyticsQuery = groq`
  {
    "totalCourses": count(*[_type == "course"]),
    "publishedCourses": count(*[_type == "course" && status == "published"]),
    "totalLessons": count(*[_type == "lesson"]),
    "activeSimulations": count(*[_type == "simulation" && status == "available"]),
    "recentUpdates": *[_type in ["course", "lesson", "simulation"] && _updatedAt > $since] | order(_updatedAt desc) [0...10] {
      _type,
      title,
      _updatedAt
    }
  }
`;
```

### Content Mutation Patterns

#### Creating Content via API
```typescript
// Create course programmatically
export async function createCourse(courseData: Partial<Course>) {
  try {
    const result = await client.create({
      _type: 'course',
      title: courseData.title,
      slug: {
        current: slugify(courseData.title),
        _type: 'slug'
      },
      status: 'draft',
      publishedAt: new Date().toISOString(),
      ...courseData
    });
    
    return { success: true, course: result };
  } catch (error) {
    console.error('Failed to create course:', error);
    return { success: false, error };
  }
}

// Update course enrollment count
export async function updateEnrollmentCount(courseId: string, increment: number) {
  return await client
    .patch(courseId)
    .inc({ enrollmentCount: increment })
    .commit();
}
```

#### Batch Operations
```typescript
// Bulk update simulation ratings
export async function updateSimulationRatings(ratings: Array<{id: string, rating: number}>) {
  const transaction = client.transaction();
  
  ratings.forEach(({ id, rating }) => {
    transaction.patch(id, { rating });
  });
  
  return await transaction.commit();
}
```

## Real-time Data Integration

### Market Data APIs
Future integration patterns for real-time market data:

```typescript
// Market data service abstraction
interface MarketDataService {
  getCurrentPrices(): Promise<MarketPrice[]>;
  getHistoricalData(startDate: Date, endDate: Date): Promise<HistoricalData[]>;
  subscribeToUpdates(callback: (data: MarketUpdate) => void): () => void;
}

// EIA API integration example
class EIADataService implements MarketDataService {
  private baseUrl = 'https://api.eia.gov/v2';
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async getCurrentPrices(): Promise<MarketPrice[]> {
    const response = await fetch(
      `${this.baseUrl}/electricity/rto/region-data?api_key=${this.apiKey}&frequency=hourly&data[0]=value&facets[respondent][]=PJM`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch market prices');
    }
    
    const data = await response.json();
    return this.transformEIAData(data);
  }
  
  private transformEIAData(data: any): MarketPrice[] {
    return data.response.data.map((item: any) => ({
      timestamp: new Date(item.period),
      price: item.value,
      region: item.respondent,
    }));
  }
}
```

### WebSocket Integration
For real-time simulation updates:

```typescript
// WebSocket hook for real-time data
export function useRealtimeMarketData(marketId: string) {
  const [data, setData] = useState<MarketData | null>(null);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const ws = new WebSocket(`wss://api.example.com/market/${marketId}`);
    
    ws.onopen = () => {
      setConnected(true);
    };
    
    ws.onmessage = (event) => {
      const marketData = JSON.parse(event.data);
      setData(marketData);
    };
    
    ws.onclose = () => {
      setConnected(false);
    };
    
    return () => {
      ws.close();
    };
  }, [marketId]);
  
  return { data, connected };
}
```

## Authentication Integration

### NextAuth.js Setup (Future Implementation)
```typescript
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import { SanityAdapter } from '@next-auth/sanity-adapter';
import { client } from '@/sanity/lib/client';

export default NextAuth({
  providers: [
    // OAuth providers
  ],
  adapter: SanityAdapter(client),
  callbacks: {
    session: async ({ session, user }) => {
      // Add custom fields to session
      session.userId = user.id;
      return session;
    },
  },
});

// User profile integration with Sanity
export async function getUserProfile(userId: string) {
  return await sanityFetch({
    query: groq`*[_type == "user" && _id == $userId][0] {
      name,
      email,
      avatar,
      enrolledCourses[]->,
      completedLessons[]->,
      preferences
    }`,
    params: { userId },
  });
}
```

## External Service Integration

### Email Service Integration
```typescript
// Email service abstraction
interface EmailService {
  sendWelcomeEmail(user: User): Promise<void>;
  sendCourseCompletion(user: User, course: Course): Promise<void>;
  sendSimulationReport(user: User, results: SimulationResult): Promise<void>;
}

// SendGrid implementation
class SendGridEmailService implements EmailService {
  private sg: SendGrid;
  
  constructor(apiKey: string) {
    this.sg = SendGrid(apiKey);
  }
  
  async sendWelcomeEmail(user: User): Promise<void> {
    const msg = {
      to: user.email,
      from: 'noreply@exawatt.com',
      templateId: 'welcome-template-id',
      dynamicTemplateData: {
        name: user.name,
        coursesUrl: `${process.env.NEXT_PUBLIC_URL}/app/courses`,
      },
    };
    
    await this.sg.send(msg);
  }
}
```

### Analytics Integration
```typescript
// Analytics service for learning metrics
class LearningAnalytics {
  trackLessonStart(userId: string, lessonId: string) {
    // Track lesson engagement
    this.track('lesson_started', {
      userId,
      lessonId,
      timestamp: Date.now(),
    });
  }
  
  trackSimulationComplete(userId: string, simulationId: string, results: any) {
    // Track simulation completion and performance
    this.track('simulation_completed', {
      userId,
      simulationId,
      results,
      timestamp: Date.now(),
    });
  }
  
  private track(event: string, data: any) {
    // Send to analytics service (e.g., Mixpanel, Amplitude)
    if (typeof window !== 'undefined') {
      // Client-side tracking
      window.gtag?.('event', event, data);
    } else {
      // Server-side tracking
      // Send to analytics API
    }
  }
}
```

## Error Handling and Resilience

### API Error Handling
```typescript
// Centralized error handling for API calls
export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  context: string
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    
    // Log error for monitoring
    console.error(`API Error in ${context}:`, error);
    
    // Transform to standardized error
    throw new APIError(
      `Failed to ${context}`,
      500,
      'INTERNAL_ERROR'
    );
  }
}

// Usage
export async function getCourseWithRetry(slug: string) {
  return await withErrorHandling(
    () => sanityFetch({ query: courseBySlugQuery, params: { slug } }),
    'fetch course data'
  );
}
```

### Rate Limiting and Caching
```typescript
// Simple rate limiting for API calls
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  canMakeRequest(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove expired requests
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

// Cache wrapper for expensive API calls
const cache = new Map<string, { data: any; timestamp: number }>();

export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 300000 // 5 minutes
): Promise<T> {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttlMs) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

## Testing API Integrations

### Mock Services for Testing
```typescript
// Mock Sanity client for testing
export const createMockSanityClient = () => ({
  fetch: jest.fn(),
  create: jest.fn(),
  patch: jest.fn(() => ({ commit: jest.fn() })),
});

// Test data factories
export const createMockCourse = (overrides: Partial<Course> = {}): Course => ({
  _id: 'test-course-id',
  title: 'Test Course',
  slug: { current: 'test-course' },
  description: 'Test course description',
  status: 'published',
  difficulty: 'Beginner',
  ...overrides,
});

// Integration test example
describe('Course API Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('fetches course data correctly', async () => {
    const mockClient = createMockSanityClient();
    const mockCourse = createMockCourse();
    
    mockClient.fetch.mockResolvedValue(mockCourse);
    
    const result = await getCourse('test-course');
    
    expect(mockClient.fetch).toHaveBeenCalledWith(
      expect.stringContaining('*[_type == "course"'),
      { slug: 'test-course' },
      expect.any(Object)
    );
    expect(result).toEqual(mockCourse);
  });
});
```

## Performance Optimization

### Data Fetching Optimization
```typescript
// Parallel data fetching
export async function getCoursePageData(slug: string) {
  const [course, relatedCourses, instructorCourses] = await Promise.all([
    getCourse(slug),
    getRelatedCourses(slug),
    getInstructorCourses(slug),
  ]);
  
  return { course, relatedCourses, instructorCourses };
}

// Incremental Static Regeneration with Sanity webhooks
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  
  return {
    props: { course },
    revalidate: 3600, // Revalidate every hour
  };
}

// On-demand revalidation via webhook
export async function POST(request: Request) {
  const { type, slug } = await request.json();
  
  if (type === 'course') {
    await revalidatePath(`/courses/${slug}`);
  }
  
  return Response.json({ revalidated: true });
}
```

This integration guide provides the foundation for connecting ExaWatt with external services while maintaining performance, reliability, and user experience standards.