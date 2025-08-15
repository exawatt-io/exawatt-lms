"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Book, BarChart3, Settings } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/courses", label: "Courses", icon: Book },
    { href: "/simulations", label: "Simulations", icon: BarChart3 },
    { href: "/dashboard", label: "Dashboard", icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/exawatt-logo.png"
              alt="ExaWatt Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-white">
              ExaWatt
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-slate-300 hover:text-electric-400 transition-colors font-medium"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <Link
              href="/get-started"
              className="bg-gradient-to-r from-electric-500 to-power-400 text-dark-900 px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-electric-500/25 transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-slate-300 hover:text-white hover:bg-dark-800"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800 border-t border-dark-700">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-2 text-slate-300 hover:text-electric-400 hover:bg-dark-700 px-3 py-2 rounded-md font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <Link
                href="/get-started"
                className="flex items-center justify-center bg-gradient-to-r from-electric-500 to-power-400 text-dark-900 px-3 py-2 rounded-md font-semibold mt-4"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}