import Link from "next/link";
import { ArrowRight, Book, BarChart3, Zap, CheckCircle, Play } from "lucide-react";
import { FeatureCard } from "@/components/ui/FeatureCard";

// Example of how the homepage could be refactored
export function HomePageExample() {
  const features = [
    {
      icon: Book,
      title: "Interactive Courses",
      description: "Structured curriculum covering grid fundamentals through advanced trading strategies with real-world examples.",
      gradient: "from-electric-500 to-electric-600"
    },
    {
      icon: BarChart3,
      title: "Market Simulations", 
      description: "Real-time market clearing, dispatch optimization, and LMP formation tools with live data integration.",
      gradient: "from-power-500 to-power-600"
    },
    {
      icon: Zap,
      title: "AI-Powered Learning",
      description: "Personalized tutoring, adaptive assessments, and intelligent scenario generation tailored to your progress.",
      gradient: "from-electric-500 to-power-500"
    }
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Choose ExaWatt?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Bridge the gap between theory and practice with our comprehensive learning platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <FeatureCard key={index} className="text-center">
                <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-slate-300">
                  {feature.description}
                </p>
              </FeatureCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}