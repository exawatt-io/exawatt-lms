import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, Clock, Users, BarChart3, CheckCircle, BookOpen, Star } from 'lucide-react';
import { getCourseBySlug } from '@/sanity/lib/fetch';
import { getDifficultyColor } from '@/sanity/lib/fetch';
import { PortableText } from '@portabletext/react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { AppLayout } from '@/components/app/AppLayout';

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

// Icon mapping for categories
const iconMap = {
  'Zap': BarChart3, // Using BarChart3 as fallback for any Zap icons
  'BarChart3': BarChart3,
  'Shield': CheckCircle, // Using CheckCircle as fallback for Shield
  'BookOpen': BookOpen,
  'Play': Play,
} as const;

const portableTextComponents = {
  block: {
    h2: ({children}: any) => <h2 className="text-xl font-semibold text-white mb-3 mt-6">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-lg font-medium text-slate-200 mb-2 mt-4">{children}</h3>,
    normal: ({children}: any) => <p className="text-slate-300 mb-3 leading-relaxed">{children}</p>,
  },
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourseBySlug(courseId);

  if (!course) {
    notFound();
  }

  const IconComponent = iconMap[course.category.icon as keyof typeof iconMap] || BarChart3;

  return (
    <AppLayout
      title={course.title}
      subtitle={`${course.category.title} • ${course.difficulty} • ${course.duration}`}
      headerActions={
        <div className="flex items-center gap-4">
          <Link
            href="/app/courses"
            className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Courses</span>
          </Link>
          <div className="flex items-center gap-2">
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-slate-400">
              <Star className="h-4 w-4 text-yellow-400" />
              {course.rating}
            </div>
          </div>
        </div>
      }
    >
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${course.category.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    <Badge variant="neutral">
                      {course.category.title}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-4">
                    {course.title}
                  </h1>
                  <p className="text-lg text-slate-300 mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.enrollmentCount.toLocaleString()} students
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {course.rating}
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              {course.fullDescription && (
                <div className="prose prose-slate max-w-none">
                  <PortableText 
                    value={course.fullDescription} 
                    components={portableTextComponents}
                  />
                </div>
              )}

              {/* Learning Objectives */}
              {course.learningObjectives && course.learningObjectives.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Learning Objectives</h2>
                  <ul className="space-y-2">
                    {course.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-300">
                        <CheckCircle className="h-5 w-5 text-electric-400 flex-shrink-0 mt-0.5" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Course Outline */}
            {course.lessons && course.lessons.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                <h2 className="text-xl font-semibold text-white mb-6">Course Lessons</h2>
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <Link
                      key={lesson._id}
                      href={`/app/courses/${courseId}/lessons/${lesson.slug.current}`}
                      className="flex items-center space-x-4 p-4 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-200 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-electric-500 to-electric-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {lesson.orderIndex}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1 group-hover:text-electric-300 transition-colors">
                          {lesson.title}
                        </h3>
                        {lesson.description && (
                          <p className="text-slate-300 text-sm mb-2">
                            {lesson.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-slate-400 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.estimatedDuration} min</span>
                          </span>
                          {lesson.hasQuiz && (
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-900/50 text-blue-400 border border-blue-700/50">
                              Quiz
                            </span>
                          )}
                          {lesson.hasSimulation && (
                            <span className="text-xs px-2 py-1 rounded-full bg-power-900/50 text-power-400 border border-power-700/50">
                              Simulation
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Play className="h-5 w-5 text-slate-400 group-hover:text-electric-400 transition-colors" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Get Started
              </h3>
              <div className="space-y-4">
                {course.lessons && course.lessons.length > 0 ? (
                  <Link href={`/app/courses/${courseId}/lessons/${course.lessons[0].slug.current}`}>
                    <Button variant="primary" size="lg" className="w-full" icon={Play}>
                      Start Course
                    </Button>
                  </Link>
                ) : (
                  <Button variant="outline" size="lg" className="w-full" disabled>
                    No Lessons Available
                  </Button>
                )}
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {course.price.isFree ? 'FREE' : `$${course.price.amount}`}
                  </div>
                  <p className="text-sm text-slate-400">
                    Join {course.enrollmentCount.toLocaleString()} other students
                  </p>
                </div>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Course Details</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Level</span>
                  <span className="text-white">{course.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Students</span>
                  <span className="text-white">{course.enrollmentCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-white">{course.rating}</span>
                  </div>
                </div>
                {course.estimatedHours && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Time</span>
                    <span className="text-white">{course.estimatedHours} hours</span>
                  </div>
                )}
              </div>
            </div>

            {/* Instructor */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Instructor</h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-power-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {course.instructor.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{course.instructor.name}</h4>
                  {course.instructor.title && (
                    <p className="text-sm text-slate-400">{course.instructor.title}</p>
                  )}
                  {course.instructor.experience && (
                    <p className="text-sm text-slate-400">{course.instructor.experience} years experience</p>
                  )}
                </div>
              </div>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && course.prerequisites.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Prerequisites</h3>
                <div className="space-y-2">
                  {course.prerequisites.map((prereq) => (
                    <Link 
                      key={prereq._id}
                      href={`/app/courses/${prereq.slug.current}`}
                      className="block p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      <div className="font-medium text-white">{prereq.title}</div>
                      <div className="text-sm text-slate-400">{prereq.difficulty}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm hover:bg-slate-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}