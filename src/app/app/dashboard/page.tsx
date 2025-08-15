import React from 'react';
import { AppLayout } from '@/components/app/AppLayout';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Play, 
  BookOpen,
  BarChart3,
  Zap,
  ArrowRight,
  Activity,
  Award
} from 'lucide-react';

export default function DashboardPage() {
  const recentActivity = [
    { id: 1, type: 'course', title: 'Grid Fundamentals - Lesson 3', progress: 75, time: '2 hours ago' },
    { id: 2, type: 'simulation', title: 'Market Clearing Engine', progress: 100, time: '1 day ago' },
    { id: 3, type: 'course', title: 'Market Operations - Lesson 1', progress: 50, time: '3 days ago' },
  ];

  const quickStats = [
    { label: 'Courses Completed', value: '3', change: '+1 this week', icon: BookOpen, color: 'text-green-400' },
    { label: 'Simulations Run', value: '47', change: '+12 this week', icon: Play, color: 'text-blue-400' },
    { label: 'Hours Studied', value: '23.5', change: '+4.2 this week', icon: Clock, color: 'text-purple-400' },
    { label: 'Certificates Earned', value: '2', change: 'Grid Fundamentals', icon: Award, color: 'text-yellow-400' },
  ];

  const upcomingDeadlines = [
    { course: 'Market Operations', lesson: 'Economic Dispatch Quiz', due: 'Tomorrow', urgent: true },
    { course: 'Risk Management', lesson: 'Portfolio Assessment', due: 'Dec 20', urgent: false },
    { course: 'Grid Fundamentals', lesson: 'Final Project', due: 'Dec 25', urgent: false },
  ];

  return (
    <AppLayout
      title="Dashboard"
      subtitle="Track your learning progress and continue where you left off"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <FeatureCard key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </FeatureCard>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <FeatureCard>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg">
                    <div className="w-10 h-10 bg-electric-900/50 rounded-lg flex items-center justify-center">
                      {activity.type === 'course' ? (
                        <BookOpen className="h-5 w-5 text-electric-400" />
                      ) : (
                        <Play className="h-5 w-5 text-power-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{activity.title}</h4>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex-1 bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-electric-500 h-2 rounded-full transition-all"
                            style={{ width: `${activity.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400">{activity.progress}%</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-slate-400">{activity.time}</p>
                      <Button variant="ghost" size="sm" icon={ArrowRight}>
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </div>

          {/* Quick Actions & Deadlines */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <FeatureCard>
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="primary" className="w-full justify-start" icon={Play}>
                  Run Market Simulation
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={BookOpen}>
                  Continue Learning
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={BarChart3}>
                  View Analytics
                </Button>
              </div>
            </FeatureCard>

            {/* Upcoming Deadlines */}
            <FeatureCard>
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{deadline.lesson}</h4>
                        <p className="text-xs text-slate-400">{deadline.course}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        deadline.urgent 
                          ? 'bg-red-900/50 text-red-300' 
                          : 'bg-slate-700 text-slate-300'
                      }`}>
                        {deadline.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </div>
        </div>

        {/* Course Progress */}
        <FeatureCard>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Course Progress</h3>
            <Button variant="ghost" size="sm">View All Courses</Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Grid Fundamentals', progress: 85, lessons: '11/13', nextLesson: 'Power Flow Analysis' },
              { name: 'Market Operations', progress: 40, lessons: '7/18', nextLesson: 'Economic Dispatch' },
              { name: 'Risk Management', progress: 15, lessons: '2/15', nextLesson: 'Portfolio Theory' },
            ].map((course, index) => (
              <div key={index} className="p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{course.name}</h4>
                  <span className="text-sm text-slate-400">{course.lessons}</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-xs text-slate-300">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-electric-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Next:</p>
                    <p className="text-sm text-slate-300">{course.nextLesson}</p>
                  </div>
                  <Button variant="outline" size="sm">Continue</Button>
                </div>
              </div>
            ))}
          </div>
        </FeatureCard>
      </div>
    </AppLayout>
  );
}