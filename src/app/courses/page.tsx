import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

export default function CoursesMarketingPage() {
  const courses = [
    {
      id: 'grid-fundamentals',
      title: 'Grid Fundamentals',
      description: 'Master the basics of electricity markets, grid operations, and power system economics.',
      duration: '6 weeks',
      students: '2,400+',
      level: 'Beginner',
      image: '/course-grid-fundamentals.jpg'
    },
    {
      id: 'market-clearing',
      title: 'Market Clearing & LMPs',
      description: 'Deep dive into locational marginal pricing, market clearing mechanisms, and dispatch optimization.',
      duration: '8 weeks',
      students: '1,800+',
      level: 'Intermediate',
      image: '/course-market-clearing.jpg'
    },
    {
      id: 'trading-strategies',
      title: 'Trading Strategies',
      description: 'Advanced trading techniques, risk management, and portfolio optimization in electricity markets.',
      duration: '10 weeks',
      students: '950+',
      level: 'Advanced',
      image: '/course-trading.jpg'
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Master the{' '}
            <span className="bg-gradient-to-r from-electric-400 to-power-400 bg-clip-text text-transparent">
              Electric Grid
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            From fundamentals to advanced trading strategies, our courses provide hands-on experience with real market data and scenarios.
          </p>
          <Link href="/app/courses">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Start Learning Now
            </Button>
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-electric-500/50 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-electric-500/20 to-power-500/20 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-electric-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium bg-electric-500/20 text-electric-400 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">{course.title}</h3>
                <p className="text-slate-300 mb-4">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students}
                  </div>
                </div>
                
                <Link href={`/app/courses/${course.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 py-16 border-t border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of energy professionals advancing their careers with ExaWatt.
          </p>
          <Link href="/app/courses">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Explore All Courses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}