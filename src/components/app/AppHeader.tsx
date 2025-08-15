"use client";

import React from 'react';
import { Search, Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AppHeader({ title, subtitle, actions }: AppHeaderProps) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title Section */}
        <div className="flex-1">
          {title && (
            <div>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
              {subtitle && (
                <p className="text-sm text-slate-400 mt-1">{subtitle}</p>
              )}
            </div>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {actions}
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses, simulations..."
              className="pl-10 pr-4 py-2 w-80 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-electric-500 focus:ring-1 focus:ring-electric-500"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-electric-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center gap-2 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <div className="w-7 h-7 bg-gradient-to-br from-electric-500 to-power-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-black">JS</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}