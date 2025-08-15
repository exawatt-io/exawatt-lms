"use client";

import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { ElectricityBackground } from '@/components/ElectricityBackground';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith('/app');

  if (isAppRoute) {
    // App mode: Full screen, no marketing navigation, no background effects
    return (
      <div className="h-screen overflow-hidden bg-slate-950">
        {children}
      </div>
    );
  }

  // Marketing/Website mode: Traditional layout with navigation and effects
  return (
    <>
      <ElectricityBackground />
      <div className="relative min-h-screen">
        <Navigation />
        <main className="pt-16 relative z-10">
          {children}
        </main>
      </div>
    </>
  );
}