import Link from "next/link";
import { ArrowRight, Book, BarChart3, Users, Zap, CheckCircle, Play } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { FeatureIcon } from "@/components/ui/FeatureIcon";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-electric-950/20 to-power-950/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-electric-400 to-power-400 bg-clip-text">
                Power Markets
              </span>{" "}
              with AI
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Learn electricity market operations through interactive simulations and AI-powered personalized education. 
              From grid fundamentals to advanced trading strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Start Learning
                </Button>
              </Link>
              <Link href="/simulations">
                <Button variant="outline" size="lg" icon={Play}>
                  Try Simulation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Section variant="highlight">
        <SectionHeader 
          title="Why Choose ExaWatt?"
          description="Bridge the gap between theory and practice with our comprehensive learning platform"
        />

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard className="text-center">
            <FeatureIcon icon={Book} variant="electric" className="mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Interactive Courses</h3>
            <p className="text-slate-300">
              Structured curriculum covering grid fundamentals through advanced trading strategies with real-world examples.
            </p>
          </FeatureCard>

          <FeatureCard className="text-center">
            <FeatureIcon icon={BarChart3} variant="power" className="mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">Market Simulations</h3>
            <p className="text-slate-300">
              Real-time market clearing, dispatch optimization, and LMP formation tools with live data integration.
            </p>
          </FeatureCard>

          <FeatureCard className="text-center">
            <FeatureIcon icon={Zap} variant="mixed" className="mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Learning</h3>
            <p className="text-slate-300">
              Personalized tutoring, adaptive assessments, and intelligent scenario generation tailored to your progress.
            </p>
          </FeatureCard>
        </div>
      </Section>

      {/* Target Audience Section */}
      <Section>
        <SectionHeader 
          title="Built for Energy Professionals"
          description="Whether you're transitioning roles or advancing your career, our platform meets you where you are"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Energy professionals transitioning roles",
            "Finance professionals entering power trading", 
            "Policy analysts and regulators",
            "Corporate energy managers",
            "Graduate students in energy programs",
            "Market operators and planners"
          ].map((audience, index) => (
            <FeatureCard key={index} size="sm" className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-electric-400 flex-shrink-0" />
              <span className="text-slate-200">{audience}</span>
            </FeatureCard>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section variant="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Master Power Markets?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of energy professionals advancing their careers with ExaWatt
          </p>
          <Link href="/courses">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              Get Started Today
            </Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
