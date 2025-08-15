import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, Clock, Users, BarChart3, CheckCircle } from 'lucide-react';

const courseData = {
  'grid-fundamentals': {
    title: 'Grid Fundamentals',
    description: 'Understanding the basics of electrical grids, power generation, transmission, and distribution systems.',
    duration: '4 weeks',
    students: 1250,
    difficulty: 'Beginner',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Electrical Power Systems',
        description: 'Basic concepts of electricity generation, transmission, and distribution.',
        duration: '25 min',
        type: 'lesson'
      },
      {
        id: 2,
        title: 'Power Generation Technologies',
        description: 'Overview of different power generation methods and their characteristics.',
        duration: '30 min',
        type: 'lesson'
      },
      {
        id: 3,
        title: 'Transmission Systems',
        description: 'High-voltage transmission networks and their operation.',
        duration: '35 min',
        type: 'lesson'
      },
      {
        id: 4,
        title: 'Basic Grid Simulation',
        description: 'Hands-on simulation of a simple power grid.',
        duration: '45 min',
        type: 'simulation'
      }
    ]
  },
  'market-operations': {
    title: 'Market Operations',
    description: 'Learn how electricity markets function, including day-ahead and real-time market clearing mechanisms.',
    duration: '6 weeks',
    students: 890,
    difficulty: 'Intermediate',
    lessons: [
      {
        id: 1,
        title: 'Introduction to Electricity Markets',
        description: 'History and structure of deregulated electricity markets.',
        duration: '30 min',
        type: 'lesson'
      },
      {
        id: 2,
        title: 'Day-Ahead Market Operations',
        description: 'How day-ahead markets clear and set prices.',
        duration: '40 min',
        type: 'lesson'
      },
      {
        id: 3,
        title: 'Real-Time Market Clearing',
        description: 'Understanding real-time dispatch and pricing.',
        duration: '35 min',
        type: 'lesson'
      },
      {
        id: 4,
        title: 'Market Clearing Simulation',
        description: 'Interactive simulation of market clearing process.',
        duration: '60 min',
        type: 'simulation'
      }
    ]
  }
};

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = courseData[courseId as keyof typeof courseData];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/courses"
          className="inline-flex items-center space-x-2 text-slate-300 hover:text-white mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Courses</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-electric-800/40 p-8">
              <h1 className="text-3xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-slate-300 mb-6">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-electric-950/30 to-electric-900/30 rounded-lg border border-electric-800/20">
                  <Clock className="h-6 w-6 text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold text-white">{course.duration}</div>
                  <div className="text-sm text-slate-300">Duration</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-power-950/30 to-power-900/30 rounded-lg border border-power-700/20">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-white">{course.students.toLocaleString()}</div>
                  <div className="text-sm text-slate-300">Students</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-electric-950/30 to-power-950/30 rounded-lg border border-electric-700/20">
                  <BarChart3 className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-white">{course.difficulty}</div>
                  <div className="text-sm text-slate-300">Level</div>
                </div>
              </div>

              {/* Course Outline */}
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Course Outline</h2>
                <div className="space-y-4">
                  {course.lessons.map((lesson, index) => (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/lessons/${lesson.id}`}
                      className="flex items-center space-x-4 p-4 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg border border-electric-800/40 hover:from-slate-700 hover:to-slate-600 hover:border-electric-600/60 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-electric-500 to-electric-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-slate-300 text-sm mb-2">
                          {lesson.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-slate-400 flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{lesson.duration}</span>
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            lesson.type === 'simulation'
                              ? 'bg-power-900/50 text-power-400 border border-power-700/50'
                              : 'bg-electric-900/50 text-electric-400 border border-electric-700/50'
                          }`}>
                            {lesson.type === 'simulation' ? 'Simulation' : 'Lesson'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {lesson.type === 'simulation' ? (
                          <BarChart3 className="h-5 w-5 text-green-600" />
                        ) : (
                          <Play className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-electric-800/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Get Started
              </h3>
              <Link
                href={`/courses/${courseId}/lessons/1`}
                className="w-full bg-gradient-to-r from-electric-500 to-electric-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-500/25 transition-all duration-200 flex items-center justify-center gap-2 mb-4"
              >
                Start Course
                <Play className="h-4 w-4" />
              </Link>
              <p className="text-sm text-slate-300 text-center">
                Join {course.students.toLocaleString()} other students
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-electric-800/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                What You'll Learn
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Fundamental concepts of electrical power systems
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    How electricity markets operate and clear
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Hands-on experience with market simulations
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">
                    Real-world applications and case studies
                  </span>
                </li>
              </ul>
            </div>

            {/* Prerequisites */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-lg border border-electric-800/40 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Prerequisites
              </h3>
              <ul className="space-y-2">
                <li className="text-slate-300 text-sm">
                  • Basic understanding of economics
                </li>
                <li className="text-slate-300 text-sm">
                  • High school level mathematics
                </li>
                <li className="text-slate-300 text-sm">
                  • Interest in energy markets
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}