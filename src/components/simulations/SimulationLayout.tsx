import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';

interface SimulationLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  backHref?: string;
}

export function SimulationLayout({ 
  title, 
  description, 
  children, 
  backHref = '/simulations' 
}: SimulationLayoutProps) {
  return (
    <div className="min-h-screen">
      <Section>
        {/* Back Button */}
        <Link
          href={backHref}
          className="inline-flex items-center space-x-2 text-slate-300 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Simulations</span>
        </Link>

        {/* Header */}
        <SectionHeader title={title} description={description} />

        {/* Simulation Content */}
        {children}
      </Section>
    </div>
  );
}