// Centralized theme configuration
export const theme = {
  cards: {
    base: 'rounded-xl shadow-lg border transition-all duration-200',
    background: {
      default: 'bg-gradient-to-br from-slate-900 to-slate-800',
      interactive: 'bg-gradient-to-br from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700',
      highlight: 'bg-gradient-to-br from-slate-800 to-slate-700',
    },
    borders: {
      default: 'border-electric-800/40',
      interactive: 'border-electric-800/40 hover:border-electric-600/60',
      highlight: 'border-electric-700/50 hover:border-electric-500/70',
    },
    padding: {
      sm: 'p-4',
      md: 'p-6', 
      lg: 'p-8',
    },
    hover: {
      default: '',
      interactive: 'hover:shadow-xl cursor-pointer',
      highlight: 'hover:shadow-lg',
    }
  },
  colors: {
    text: {
      primary: 'text-white',
      secondary: 'text-slate-300',
      muted: 'text-slate-400',
    },
    accent: {
      electric: 'text-electric-400',
      power: 'text-power-400',
    }
  }
} as const;

export type ThemeVariant = keyof typeof theme.cards.background;
export type ThemeSize = keyof typeof theme.cards.padding;