import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/app/AppLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  Play, 
  Clock, 
  Users, 
  BookOpen, 
  CheckCircle,
  Lock,
  Star,
  Filter,
  Search,
  ArrowRight,
  Zap,
  BarChart3,
  Shield
} from 'lucide-react';
import { getCourses } from '@/sanity/lib/fetch';
import { getDifficultyColor } from '@/sanity/lib/fetch';
import type { Course } from '@/sanity/lib/types';

// Icon mapping for categories
const iconMap = {
  'Zap': Zap,
  'BarChart3': BarChart3,
  'Shield': Shield,
  'BookOpen': BookOpen,
  'Play': Play,
} as const;

interface CourseWithProgress extends Course {
  // Mock progress data - this would come from user progress tracking
  progress?: number;
  completedLessons?: number;
  enrollmentStatus?: 'enrolled' | 'available' | 'completed' | 'locked';
  nextLesson?: string;
}

function mockUserProgress(course: Course): CourseWithProgress {
  // Mock data for demo - in real app this would come from user progress API
  const mockProgress = {
    'grid-fundamentals': { progress: 85, completedLessons: 11, enrollmentStatus: 'enrolled' as const, nextLesson: 'Power Flow Analysis' },
    'market-operations': { progress: 40, completedLessons: 7, enrollmentStatus: 'enrolled' as const, nextLesson: 'Economic Dispatch Models' },
    'risk-management': { progress: 0, completedLessons: 0, enrollmentStatus: 'available' as const },
  };
  
  return {
    ...course,
    ...mockProgress[course.slug.current as keyof typeof mockProgress],
  };
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'enrolled': return Play;
    case 'completed': return CheckCircle;
    case 'locked': return Lock;
    default: return BookOpen;
  }
}

export default async function AppCoursesPage() {
  const courses = await getCourses();
  const coursesWithProgress = courses.map(mockUserProgress);

  return (
    <AppLayout
      title="Courses"
      subtitle="Master electricity markets through our comprehensive curriculum"
      headerActions={
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" icon={Filter}>
            Filter
          </Button>
          <Button variant="outline" size="sm" icon={Search}>
            Search
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Filter Tabs */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-lg w-fit">
          {['All Courses', 'Enrolled', 'Available', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                tab === 'All Courses'
                  ? 'bg-electric-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid gap-6">
          {coursesWithProgress.map((course) => {
            const IconComponent = iconMap[course.category.icon as keyof typeof iconMap] || Zap;
            const isLocked = course.enrollmentStatus === 'locked';
            const isEnrolled = course.enrollmentStatus === 'enrolled';
            
            return (
              <div
                key={course._id}
                className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${
                  isLocked ? 'opacity-60' : 'hover:border-slate-700'
                } transition-all`}
              >
                <div className="flex">
                  {/* Course Header with Icon */}
                  <div className={`bg-gradient-to-br ${course.category.color} w-24 flex items-center justify-center`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Course Content */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                            {course.difficulty}
                          </span>
                          {isLocked && <Lock className="h-4 w-4 text-slate-400" />}
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-6 text-xs text-slate-400 mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {course.lessons?.length || 0} lessons
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.enrollmentCount.toLocaleString()} students
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400" />
                            {course.rating}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {course.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="text-xs text-slate-400">
                          Instructor: <span className="text-slate-300">{course.instructor.name}</span>
                        </div>
                      </div>

                      {/* Course Status & Actions */}
                      <div className="ml-6 text-right min-w-0">
                        {isEnrolled && course.progress !== undefined && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">Progress</span>
                              <span className="text-xs text-slate-300">{course.progress}%</span>
                            </div>
                            <div className="w-32 bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-electric-500 h-2 rounded-full transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <div className="mt-2 text-xs text-slate-400">
                              {course.completedLessons}/{course.lessons?.length || 0} lessons
                            </div>
                          </div>
                        )}

                        {isLocked ? (
                          <div className="text-center">
                            <Lock className="h-5 w-5 text-slate-400 mx-auto mb-2" />
                            <div className="text-xs text-slate-400">
                              Prerequisites required
                            </div>
                          </div>
                        ) : isEnrolled ? (
                          <div className="space-y-2">
                            <Link href={`/app/courses/${course.slug.current}`}>
                              <Button variant="primary" size="sm" icon={ArrowRight}>
                                Continue
                              </Button>
                            </Link>
                            {course.nextLesson && (
                              <div className="text-xs text-slate-400">
                                Next: {course.nextLesson}
                              </div>
                            )}
                          </div>
                        ) : (
                          <Link href={`/app/courses/${course.slug.current}`}>
                            <Button variant="outline" size="sm" icon={getStatusIcon(course.enrollmentStatus || 'available')}>
                              {course.price.isFree ? 'Enroll Free' : `Enroll $${course.price.amount}`}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No courses message */}
        {coursesWithProgress.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No courses available</h3>
            <p className="text-slate-400">Check back soon for new courses!</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}