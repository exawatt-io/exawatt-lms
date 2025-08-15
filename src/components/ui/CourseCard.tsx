import React from 'react';
import Link from 'next/link';
import { LucideIcon, Clock, Users, Book, BarChart3, ArrowRight } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { FeatureIcon } from './FeatureIcon';
import { Badge } from './Badge';
import { Button } from './Button';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  students: number;
  icon: LucideIcon;
  color: string;
  lessons: number;
  simulations: number;
}

export function CourseCard({
  id,
  title,
  description,
  duration,
  difficulty,
  students,
  icon,
  color,
  lessons,
  simulations
}: CourseCardProps) {
  const getColorVariant = (colorClass: string) => {
    if (colorClass.includes('blue') || colorClass.includes('cyan')) return 'electric';
    if (colorClass.includes('green') || colorClass.includes('emerald')) return 'power';
    return 'mixed';
  };

  return (
    <FeatureCard variant="interactive" size="lg" className="overflow-hidden">
      <div className={`bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-center justify-between">
          <FeatureIcon icon={icon} variant={getColorVariant(color)} size="md" />
          <Badge variant="neutral" size="sm">
            {difficulty}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3">
          {title}
        </h3>
        <p className="text-slate-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">{duration}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Book className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">{lessons} lessons</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">{students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">{simulations} simulations</span>
          </div>
        </div>

        <Link href={`/courses/${id}`}>
          <Button variant="primary" className="w-full" icon={ArrowRight}>
            Start Course
          </Button>
        </Link>
      </div>
    </FeatureCard>
  );
}