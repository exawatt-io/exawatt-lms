import { Zap, BarChart3, Shield } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { CourseCard } from "@/components/ui/CourseCard";
import { LearningPath } from "@/components/ui/LearningPath";

const courses = [
  {
    id: "grid-fundamentals",
    title: "Grid Fundamentals",
    description: "Understanding the basics of electrical grids, power generation, transmission, and distribution systems.",
    duration: "4 weeks",
    difficulty: "Beginner",
    students: 1250,
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
    lessons: 12,
    simulations: 3,
  },
  {
    id: "market-operations",
    title: "Market Operations",
    description: "Learn how electricity markets function, including day-ahead and real-time market clearing mechanisms.",
    duration: "6 weeks", 
    difficulty: "Intermediate",
    students: 890,
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    lessons: 18,
    simulations: 5,
  },
  {
    id: "risk-management",
    title: "Risk Management",
    description: "Advanced strategies for managing financial and operational risks in power trading and market participation.",
    duration: "5 weeks",
    difficulty: "Advanced",
    students: 450,
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    lessons: 15,
    simulations: 4,
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen">
      <Section>
        {/* Header */}
        <SectionHeader 
          title="Power Market Courses"
          description="Master electricity markets through our structured curriculum designed by industry experts. Each course combines theory with practical simulations."
        />

        {/* Learning Path */}
        <div className="mb-16">
          <LearningPath courses={courses} />
        </div>

        {/* Course Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <FeatureCard>
            <h3 className="text-xl font-bold text-white mb-4">
              Interactive Learning Features
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Real-time market simulations</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">AI-powered personalized tutoring</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Adaptive assessments and quizzes</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Progress tracking and certificates</span>
              </li>
            </ul>
          </FeatureCard>

          <FeatureCard>
            <h3 className="text-xl font-bold text-white mb-4">
              Industry Recognition
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Course completion certificates</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Professional development credits</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Industry partnership recognition</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-electric-500 to-power-400 rounded-full"></div>
                <span className="text-slate-300">Career advancement support</span>
              </li>
            </ul>
          </FeatureCard>
        </div>
      </Section>
    </div>
  );
}