import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';

const lessonData = {
  '1': {
    title: 'Introduction to Electrical Power Systems',
    duration: '25 min',
    courseId: 'grid-fundamentals',
    courseName: 'Grid Fundamentals',
    nextLesson: '2',
    prevLesson: null,
  }
};

const sampleContent = {
  title: "Introduction to Electrical Power Systems",
  content: `Welcome to your first lesson in Grid Fundamentals! In this lesson, we'll explore the basic concepts of electrical power systems and how they form the backbone of our modern economy.

## Learning Objectives

By the end of this lesson, you will understand:

- The basic components of electrical power systems
- How electricity flows from generation to consumption
- The role of the electrical grid in society
- Key terminology used in power systems

## What is an Electrical Power System?

An electrical power system is a network of electrical components used to supply, transmit, and use electric power. The power system consists of three main components:

### 1. Generation
Power plants convert various forms of energy into electrical energy. Common generation sources include:

- **Thermal Power Plants**: Coal, natural gas, nuclear
- **Renewable Sources**: Solar, wind, hydro, geothermal
- **Energy Storage**: Batteries, pumped hydro, compressed air

### 2. Transmission
High-voltage transmission lines carry electricity over long distances from power plants to distribution substations. This network operates at voltages typically between 115 kV and 765 kV.

### 3. Distribution
Lower-voltage distribution systems deliver electricity from substations to end users like homes, businesses, and factories. Distribution voltages typically range from 4 kV to 35 kV.

## The Role of the Grid

The electrical grid serves several critical functions:

- **Reliability**: Ensures continuous power supply even when individual components fail
- **Efficiency**: Optimizes power flow to minimize losses and costs
- **Flexibility**: Accommodates varying demand and generation patterns
- **Integration**: Connects diverse generation sources and load centers

## Key Terms

**Load**: The amount of electrical power being consumed at any given time

**Baseload**: The minimum level of demand on the electrical grid over 24 hours

**Peak Load**: The maximum electrical demand during a specific period

**Grid Frequency**: The rate at which alternating current oscillates (60 Hz in North America)

**Power Factor**: The ratio of real power to apparent power in an AC circuit

## Real-World Example

Consider the path electricity takes from a natural gas power plant to your home:

1. **Generation**: Natural gas burns in a turbine, spinning a generator that produces electricity at 25 kV
2. **Step-up Transformation**: Voltage is increased to 345 kV for efficient long-distance transmission
3. **Transmission**: High-voltage lines carry power hundreds of miles to your city
4. **Step-down Transformation**: Voltage is reduced to 12 kV at a distribution substation
5. **Distribution**: Local distribution lines carry power through neighborhoods
6. **Final Transformation**: A transformer on your street reduces voltage to 120/240V for your home

## Review Questions

1. What are the three main components of an electrical power system?
2. Why is electricity transmitted at high voltages over long distances?
3. What is the difference between baseload and peak load?
4. Name three types of renewable energy sources commonly used for electricity generation.`
};

interface LessonPageProps {
  params: Promise<{ 
    courseId: string;
    lessonId: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseId, lessonId } = await params;
  const lesson = lessonData[lessonId as keyof typeof lessonData];

  if (!lesson || lesson.courseId !== courseId) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/courses/${courseId}`}
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{lesson.courseName}</span>
              </Link>
              <div className="text-slate-400">/</div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-primary-600" />
                <span className="font-medium text-slate-900">Lesson {lessonId}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Clock className="h-4 w-4" />
              <span>{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Lesson Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-8">{sampleContent.title}</h1>
            <div className="prose prose-slate prose-lg max-w-none">
              {sampleContent.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-3xl font-semibold text-slate-800 mb-4 mt-8">{line.replace('## ', '')}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-2xl font-semibold text-slate-700 mb-3 mt-6">{line.replace('### ', '')}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="text-slate-600 mb-2">{line.replace('- ', '')}</li>;
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  const text = line.replace(/\*\*/g, '');
                  const [term, definition] = text.split(': ');
                  return (
                    <p key={index} className="text-slate-600 mb-4">
                      <strong className="text-slate-800">{term}:</strong> {definition}
                    </p>
                  );
                } else if (line.match(/^\d+\./)) {
                  return <li key={index} className="text-slate-600 mb-2 list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="text-slate-600 mb-4 leading-relaxed">{line}</p>;
                }
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            {lesson.prevLesson && (
              <Link
                href={`/courses/${courseId}/lessons/${lesson.prevLesson}`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Lesson</span>
              </Link>
            )}
          </div>
          
          <div>
            {lesson.nextLesson && (
              <Link
                href={`/courses/${courseId}/lessons/${lesson.nextLesson}`}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-energy-500 to-primary-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <span>Next Lesson</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Course Progress</span>
            <span className="text-sm text-slate-600">Lesson {lessonId} of 12</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-energy-500 to-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(parseInt(lessonId) / 12) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}