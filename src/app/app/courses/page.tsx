import React from 'react';
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

export default function AppCoursesPage() {
  const courses = [
    {
      id: 'grid-fundamentals',
      title: 'Grid Fundamentals',
      description: 'Understanding the basics of electrical grids, power generation, transmission, and distribution systems.',
      instructor: 'Dr. Sarah Chen',
      duration: '4 weeks',
      difficulty: 'Beginner',
      students: 1250,
      rating: 4.8,
      progress: 85,
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      lessons: 13,
      completedLessons: 11,
      simulations: 3,
      status: 'enrolled',
      nextLesson: 'Power Flow Analysis',
      tags: ['fundamentals', 'grid', 'transmission']
    },
    {
      id: 'market-operations',
      title: 'Market Operations',
      description: 'Learn how electricity markets function, including day-ahead and real-time market clearing mechanisms.',
      instructor: 'Prof. Michael Torres',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      students: 890,
      rating: 4.9,
      progress: 40,
      icon: BarChart3,
      color: 'from-green-500 to-emerald-500',
      lessons: 18,
      completedLessons: 7,
      simulations: 5,
      status: 'enrolled',
      nextLesson: 'Economic Dispatch Models',
      tags: ['markets', 'pricing', 'operations']
    },
    {
      id: 'risk-management',
      title: 'Risk Management',
      description: 'Advanced strategies for managing financial and operational risks in power trading and market participation.',
      instructor: 'Dr. Jennifer Liu',
      duration: '5 weeks',
      difficulty: 'Advanced',
      students: 450,
      rating: 4.7,
      progress: 0,
      icon: Shield,
      color: 'from-purple-500 to-violet-500',
      lessons: 15,
      completedLessons: 0,
      simulations: 4,
      status: 'available',
      nextLesson: 'Introduction to Portfolio Theory',
      tags: ['risk', 'finance', 'trading']
    },
    {
      id: 'renewable-integration',
      title: 'Renewable Integration',
      description: 'Managing variable renewable energy sources in modern electricity markets and grid operations.',
      instructor: 'Dr. Robert Kim',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      students: 320,
      rating: 4.6,
      progress: 0,
      icon: Zap,
      color: 'from-green-400 to-blue-500',
      lessons: 12,
      completedLessons: 0,
      simulations: 6,
      status: 'locked',
      prerequisite: 'Grid Fundamentals',
      tags: ['renewable', 'solar', 'wind', 'integration']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-900/50 text-green-300';
      case 'Intermediate': return 'bg-yellow-900/50 text-yellow-300';
      case 'Advanced': return 'bg-red-900/50 text-red-300';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enrolled': return Play;
      case 'completed': return CheckCircle;
      case 'locked': return Lock;
      default: return BookOpen;
    }
  };

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
          {courses.map((course) => {
            const IconComponent = course.icon;
            const isLocked = course.status === 'locked';
            const isEnrolled = course.status === 'enrolled';
            
            return (
              <div
                key={course.id}
                className={`bg-slate-900 border border-slate-800 rounded-xl overflow-hidden ${
                  isLocked ? 'opacity-60' : 'hover:border-slate-700'
                } transition-all`}
              >
                <div className="flex">
                  {/* Course Header with Icon */}
                  <div className={`bg-gradient-to-br ${course.color} w-24 flex items-center justify-center`}>
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
                            {course.lessons} lessons
                          </div>
                          <div className="flex items-center gap-1">
                            <Play className="h-3 w-3" />
                            {course.simulations} simulations
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {course.students.toLocaleString()} students
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
                          Instructor: <span className="text-slate-300">{course.instructor}</span>
                        </div>
                      </div>

                      {/* Course Status & Actions */}
                      <div className="ml-6 text-right min-w-0">
                        {isEnrolled && (
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
                              {course.completedLessons}/{course.lessons} lessons
                            </div>
                          </div>
                        )}

                        {isLocked ? (
                          <div className="text-center">
                            <Lock className="h-5 w-5 text-slate-400 mx-auto mb-2" />
                            <div className="text-xs text-slate-400">
                              Complete: {course.prerequisite}
                            </div>
                          </div>
                        ) : isEnrolled ? (
                          <div className="space-y-2">
                            <Button variant="primary" size="sm" icon={ArrowRight} href={`/app/courses/${course.id}`}>
                              Continue
                            </Button>
                            <div className="text-xs text-slate-400">
                              Next: {course.nextLesson}
                            </div>
                          </div>
                        ) : (
                          <Button variant="outline" size="sm" icon={getStatusIcon(course.status)} href={`/app/courses/${course.id}`}>
                            Enroll
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}