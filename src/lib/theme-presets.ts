/**
 * Theme Presets for ExaWatt
 * 
 * Easy theme switching - just copy these CSS variables to globals.css
 * to instantly change the entire site's color scheme.
 */

export const themePresets = {
  // Current: Electric Energy (vibrant and energetic)
  electricEnergy: {
    name: "Electric Energy",
    description: "Vibrant blue, orange, and green for an energetic feel",
    cssVariables: `
    --color-primary: var(--electric-blue-500);
    --color-secondary: var(--electric-green-500);
    --color-accent: var(--electric-orange-500);
    --gradient-primary: linear-gradient(135deg, var(--electric-blue-500) 0%, var(--electric-blue-600) 100%);
    --gradient-accent: linear-gradient(135deg, var(--electric-orange-500) 0%, var(--electric-orange-600) 100%);
    --glow-primary: 0 0 20px rgba(14, 165, 233, 0.3);
    --glow-accent: 0 0 20px rgba(251, 146, 60, 0.3);
    `
  },

  // Alternative: Professional Power (more conservative)
  professionalPower: {
    name: "Professional Power",
    description: "Charcoal with amber accents for a professional look",
    cssVariables: `
    --color-primary: var(--charcoal-600);
    --color-secondary: var(--emerald-500);
    --color-accent: var(--amber-500);
    --gradient-primary: linear-gradient(135deg, var(--charcoal-600) 0%, var(--charcoal-700) 100%);
    --gradient-accent: linear-gradient(135deg, var(--amber-500) 0%, var(--amber-600) 100%);
    --glow-primary: 0 0 20px rgba(55, 65, 81, 0.3);
    --glow-accent: 0 0 20px rgba(245, 158, 11, 0.3);
    `
  },

  // Alternative: Neon Grid (cyberpunk energy theme)
  neonGrid: {
    name: "Neon Grid",
    description: "Electric blue and cyan for a futuristic grid feeling",
    cssVariables: `
    --color-primary: #00f5ff;
    --color-secondary: #39ff14;
    --color-accent: #ff073a;
    --gradient-primary: linear-gradient(135deg, #00f5ff 0%, #0080ff 100%);
    --gradient-accent: linear-gradient(135deg, #ff073a 0%, #ff4081 100%);
    --glow-primary: 0 0 30px rgba(0, 245, 255, 0.5);
    --glow-accent: 0 0 30px rgba(255, 7, 58, 0.5);
    `
  },

  // Alternative: Green Energy (sustainability focused)
  greenEnergy: {
    name: "Green Energy",
    description: "Green-focused palette for sustainability themes",
    cssVariables: `
    --color-primary: var(--electric-green-600);
    --color-secondary: var(--electric-blue-500);
    --color-accent: var(--amber-500);
    --gradient-primary: linear-gradient(135deg, var(--electric-green-600) 0%, var(--electric-green-700) 100%);
    --gradient-accent: linear-gradient(135deg, var(--amber-500) 0%, var(--amber-600) 100%);
    --glow-primary: 0 0 20px rgba(22, 163, 74, 0.4);
    --glow-accent: 0 0 20px rgba(245, 158, 11, 0.3);
    `
  }
} as const;

/**
 * Instructions for changing themes:
 * 
 * 1. Copy the desired theme's cssVariables
 * 2. Replace the corresponding CSS variables in src/app/globals.css
 * 3. The entire site will automatically update to use the new colors
 * 
 * Example:
 * To switch to "Professional Power" theme, replace this section in globals.css:
 * 
 * /* Semantic Color Tokens - CHANGE THESE TO SWITCH ENTIRE THEME */
 * --color-primary: var(--charcoal-600);
 * --color-secondary: var(--emerald-500);
 * --color-accent: var(--amber-500);
 * // ... etc
 */