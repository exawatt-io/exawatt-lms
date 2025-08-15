import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { FeatureIcon } from './FeatureIcon';

interface LearningPathProps {
  courses: Array<{
    id: string;
    title: string;
    icon: LucideIcon;
    color: string;
  }>;
}

export function LearningPath({ courses }: LearningPathProps) {
  return (
    <FeatureCard size="lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Recommended Learning Path
      </h2>
      <p className="text-slate-300 mb-6">
        Follow our structured approach from fundamentals to advanced trading strategies
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {courses.map((course, index) => {
          const getVariant = (colorClass: string) => {
            if (colorClass.includes('blue') || colorClass.includes('cyan')) return 'electric';
            if (colorClass.includes('green') || colorClass.includes('emerald')) return 'power';
            return 'mixed';
          };

          return (
            <div key={course.id} className="flex items-center">
              <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 rounded-lg border border-electric-700/40">
                <FeatureIcon 
                  icon={course.icon} 
                  variant={getVariant(course.color)} 
                  size="sm" 
                />
                <span className="font-medium text-slate-200">{course.title}</span>
              </div>
              {index < courses.length - 1 && (
                <ArrowRight className="h-5 w-5 text-electric-400 mx-4 hidden md:block" />
              )}
            </div>
          );
        })}
      </div>
    </FeatureCard>
  );
}