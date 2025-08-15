"use client";

import React, { useState } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

export function AppLayout({ children, title, subtitle, headerActions }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-slate-950 fixed inset-0 z-50">
      {/* Sidebar */}
      <AppSidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AppHeader 
          title={title}
          subtitle={subtitle}
          actions={headerActions}
        />
        
        {/* Content */}
        <main className="flex-1 overflow-auto bg-slate-950">
          <div className="p-6 max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}