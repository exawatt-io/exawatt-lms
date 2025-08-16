import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
    "./mdx-components.tsx",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        
        // Semantic color system
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          active: 'var(--color-secondary-active)',
          foreground: 'var(--color-secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          active: 'var(--color-accent-active)',
          foreground: 'var(--color-accent-foreground)',
        },
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        
        // Electric Energy Color Palette
        'electric-blue': {
          300: 'var(--electric-blue-300)',
          400: 'var(--electric-blue-400)',
          500: 'var(--electric-blue-500)',
          600: 'var(--electric-blue-600)',
          700: 'var(--electric-blue-700)',
          800: 'var(--electric-blue-800)',
          900: 'var(--electric-blue-900)',
        },
        'electric-orange': {
          300: 'var(--electric-orange-300)',
          400: 'var(--electric-orange-400)',
          500: 'var(--electric-orange-500)',
          600: 'var(--electric-orange-600)',
          700: 'var(--electric-orange-700)',
          800: 'var(--electric-orange-800)',
          900: 'var(--electric-orange-900)',
        },
        'electric-green': {
          300: 'var(--electric-green-300)',
          400: 'var(--electric-green-400)',
          500: 'var(--electric-green-500)',
          600: 'var(--electric-green-600)',
          700: 'var(--electric-green-700)',
          800: 'var(--electric-green-800)',
          900: 'var(--electric-green-900)',
        },
        
        // Legacy/Alternative Color Palettes  
        charcoal: {
          400: 'var(--charcoal-400)',
          500: 'var(--charcoal-500)',
          600: 'var(--charcoal-600)',
          700: 'var(--charcoal-700)',
          800: 'var(--charcoal-800)',
          900: 'var(--charcoal-900)',
        },
        amber: {
          400: 'var(--amber-400)',
          500: 'var(--amber-500)',
          600: 'var(--amber-600)',
          700: 'var(--amber-700)',
          800: 'var(--amber-800)',
          900: 'var(--amber-900)',
        },
        emerald: {
          400: 'var(--emerald-400)',
          500: 'var(--emerald-500)',
          600: 'var(--emerald-600)',
          700: 'var(--emerald-700)',
          800: 'var(--emerald-800)',
          900: 'var(--emerald-900)',
        },
        
        // Legacy colors (deprecated - use semantic colors instead)
        electric: {
          400: 'var(--electric-400)',
          500: 'var(--electric-500)',
          600: 'var(--electric-600)',
          700: 'var(--electric-700)',
          800: 'var(--electric-800)',
          900: 'var(--electric-900)',
        },
        power: {
          400: 'var(--amber-400)', // Alias to amber
          500: 'var(--amber-500)',
        },
        dark: {
          DEFAULT: '#0a0f1c',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0a0f1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)', 
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow-primary': 'var(--glow-primary)',
        'glow-accent': 'var(--glow-accent)',
        'glow-success': 'var(--glow-success)',
        'electric': '0 0 30px rgba(14, 165, 233, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;