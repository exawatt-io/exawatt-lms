import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle, Play } from 'lucide-react';
import { getLessonBySlug, getCourseBySlug } from '@/sanity/lib/fetch';
import { PortableText } from '@portabletext/react';
import { Button } from '@/components/ui/Button';
import { AppLayout } from '@/components/app/AppLayout';

interface LessonPageProps {
  params: Promise<{ 
    courseId: string;
    lessonId: string;
  }>;
}

// Portable Text components for rendering rich content
const portableTextComponents = {
  block: {
    h2: ({children}: any) => <h2 className="text-2xl font-semibold text-white mb-4 mt-8">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-semibold text-slate-200 mb-3 mt-6">{children}</h3>,
    h4: ({children}: any) => <h4 className="text-lg font-semibold text-slate-200 mb-2 mt-4">{children}</h4>,
    normal: ({children}: any) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
    blockquote: ({children}: any) => (
      <blockquote className="border-l-4 border-electric-500 pl-4 py-2 my-4 bg-slate-800/50 rounded-r">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({children}: any) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({children}: any) => <em className="text-electric-300 italic">{children}</em>,
    code: ({children}: any) => (
      <code className="bg-slate-800 text-electric-300 px-2 py-1 rounded text-sm font-mono">
        {children}
      </code>
    ),
  },
  types: {
    image: ({value}: any) => (
      <div className="my-6">
        <img 
          src={value.asset.url} 
          alt={value.alt || ''} 
          className="rounded-lg w-full"
        />
        {value.caption && (
          <p className="text-sm text-slate-400 mt-2 text-center italic">{value.caption}</p>
        )}
      </div>
    ),
    codeBlock: ({value}: any) => (
      <div className="my-6">
        <pre className="bg-slate-900 border border-slate-700 rounded-lg p-4 overflow-x-auto">
          <code className={`language-${value.language} text-sm`}>
            {value.code}
          </code>
        </pre>
      </div>
    ),
    callout: ({value}: any) => {
      const typeStyles = {
        info: 'border-blue-500 bg-blue-500/10 text-blue-300',
        warning: 'border-yellow-500 bg-yellow-500/10 text-yellow-300',
        success: 'border-green-500 bg-green-500/10 text-green-300',
        error: 'border-red-500 bg-red-500/10 text-red-300',
      };
      
      return (
        <div className={`border-l-4 p-4 my-4 rounded-r ${typeStyles[value.type as keyof typeof typeStyles]}`}>
          <p className="text-sm">{value.content}</p>
        </div>
      );
    },
  },
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  
  // Fetch lesson and course data from Sanity
  const [lesson, course] = await Promise.all([
    getLessonBySlug(lessonId),
    getCourseBySlug(courseId)
  ]);

  if (!lesson || !course || lesson.course?._id !== course._id) {
    notFound();
  }

  return (
    <AppLayout
      title={`Lesson ${lesson.orderIndex}: ${lesson.title}`}
      subtitle={course.title}
      headerActions={
        <div className="flex items-center gap-4">
          <Link
            href={`/app/courses/${courseId}`}
            className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Course</span>
          </Link>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <Clock className="h-4 w-4" />
            <span>{lesson.estimatedDuration} min</span>
          </div>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">{lesson.title}</h1>
          {lesson.description && (
            <p className="text-lg text-slate-300 leading-relaxed">{lesson.description}</p>
          )}
        </div>

        {/* Learning Objectives */}
        {lesson.learningObjectives && lesson.learningObjectives.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-electric-400" />
              Learning Objectives
            </h2>
            <ul className="space-y-2">
              {lesson.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-300">
                  <div className="w-1.5 h-1.5 bg-electric-400 rounded-full mt-2 flex-shrink-0" />
                  {objective}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lesson Content */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 mb-8">
          <div className="prose prose-slate prose-lg max-w-none">
            {lesson.content && (
              <PortableText 
                value={lesson.content} 
                components={portableTextComponents}
              />
            )}
          </div>
        </div>

        {/* Key Terms */}
        {lesson.keyTerms && lesson.keyTerms.length > 0 && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Key Terms</h2>
            <div className="grid gap-4">
              {lesson.keyTerms.map((term, index) => (
                <div key={index} className="border-l-4 border-electric-500 pl-4">
                  <h3 className="font-semibold text-electric-300 mb-1">{term.term}</h3>
                  <p className="text-slate-300 text-sm">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Simulation Link */}
        {lesson.hasSimulation && lesson.simulationReference && (
          <div className="bg-gradient-to-r from-electric-600 to-power-500 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold mb-2">Practice with Simulation</h3>
                <p className="text-electric-100 mb-4">{lesson.simulationReference.description}</p>
              </div>
              <Link href={`/app/simulations/${lesson.simulationReference.slug.current}`}>
                <Button variant="secondary" icon={Play}>
                  Launch Simulation
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mb-8">
          <div>
            {lesson.previousLesson && (
              <Link href={`/app/courses/${courseId}/lessons/${lesson.previousLesson.slug.current}`}>
                <Button variant="outline" icon={ArrowLeft}>
                  Previous: {lesson.previousLesson.title}
                </Button>
              </Link>
            )}
          </div>
          
          <div>
            {lesson.nextLesson && (
              <Link href={`/app/courses/${courseId}/lessons/${lesson.nextLesson.slug.current}`}>
                <Button variant="primary" icon={ArrowRight}>
                  Next: {lesson.nextLesson.title}
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-200">Course Progress</span>
            <span className="text-sm text-slate-400">
              Lesson {lesson.orderIndex} of {course.lessons?.length || 0}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-electric-500 to-power-400 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${course.lessons ? (lesson.orderIndex / course.lessons.length) * 100 : 0}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>Started</span>
            <span>{Math.round(course.lessons ? (lesson.orderIndex / course.lessons.length) * 100 : 0)}% Complete</span>
            <span>Finished</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}