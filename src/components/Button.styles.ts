// Base styling
export const BASE_CLASSES =
  'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';
export const DEFAULT_ANIMATION = 'transition-colors duration-200';

// Available colors
export const COLORS = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

// Size styles
export const SIZES = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-8 text-base',
  lg: 'py-4 px-10 text-lg',
} as const;

// Predefined hover effects
export const HOVER_EFFECTS = {
  '': '', // No hover animation
  pulse: 'hover:scale-105 hover:shadow-lg',
  scale: 'hover:scale-110 hover:shadow-xl',
  glow: 'hover:shadow-2xl',
  slide: 'hover:translate-x-1 hover:shadow-lg',
} as const;

// Predefined animations
export const ANIMATIONS = {
  smooth: 'transition-all duration-300 ease-in-out',
  bounce: 'transition-all duration-200 ease-out hover:animate-bounce',
  fade: 'transition-opacity duration-300 ease-in-out',
  spring: 'transition-all duration-200 ease-out',
} as const;

// Complete color mappings for Tailwind to recognize
export const COLOR_CLASSES = {
  // Primary variant classes
  primary: {
    slate: 'bg-slate-600 text-white focus:ring-slate-500 hover:bg-slate-700',
    gray: 'bg-gray-600 text-white focus:ring-gray-500 hover:bg-gray-700',
    zinc: 'bg-zinc-600 text-white focus:ring-zinc-500 hover:bg-zinc-700',
    neutral:
      'bg-neutral-600 text-white focus:ring-neutral-500 hover:bg-neutral-700',
    stone: 'bg-stone-600 text-white focus:ring-stone-500 hover:bg-stone-700',
    red: 'bg-red-600 text-white focus:ring-red-500 hover:bg-red-700',
    orange:
      'bg-orange-600 text-white focus:ring-orange-500 hover:bg-orange-700',
    amber: 'bg-amber-600 text-white focus:ring-amber-500 hover:bg-amber-700',
    yellow:
      'bg-yellow-600 text-white focus:ring-yellow-500 hover:bg-yellow-700',
    lime: 'bg-lime-600 text-white focus:ring-lime-500 hover:bg-lime-700',
    green: 'bg-green-600 text-white focus:ring-green-500 hover:bg-green-700',
    emerald:
      'bg-emerald-600 text-white focus:ring-emerald-500 hover:bg-emerald-700',
    teal: 'bg-teal-600 text-white focus:ring-teal-500 hover:bg-teal-700',
    cyan: 'bg-cyan-600 text-white focus:ring-cyan-500 hover:bg-cyan-700',
    sky: 'bg-sky-600 text-white focus:ring-sky-500 hover:bg-sky-700',
    blue: 'bg-blue-600 text-white focus:ring-blue-500 hover:bg-blue-700',
    indigo:
      'bg-indigo-600 text-white focus:ring-indigo-500 hover:bg-indigo-700',
    violet:
      'bg-violet-600 text-white focus:ring-violet-500 hover:bg-violet-700',
    purple:
      'bg-purple-600 text-white focus:ring-purple-500 hover:bg-purple-700',
    fuchsia:
      'bg-fuchsia-600 text-white focus:ring-fuchsia-500 hover:bg-fuchsia-700',
    pink: 'bg-pink-600 text-white focus:ring-pink-500 hover:bg-pink-700',
    rose: 'bg-rose-600 text-white focus:ring-rose-500 hover:bg-rose-700',
  },
  // Secondary variant classes
  secondary: {
    slate:
      'border-2 border-slate-600 text-slate-600 focus:ring-slate-500 hover:bg-slate-600 hover:text-white',
    gray: 'border-2 border-gray-600 text-gray-600 focus:ring-gray-500 hover:bg-gray-600 hover:text-white',
    zinc: 'border-2 border-zinc-600 text-zinc-600 focus:ring-zinc-500 hover:bg-zinc-600 hover:text-white',
    neutral:
      'border-2 border-neutral-600 text-neutral-600 focus:ring-neutral-500 hover:bg-neutral-600 hover:text-white',
    stone:
      'border-2 border-stone-600 text-stone-600 focus:ring-stone-500 hover:bg-stone-600 hover:text-white',
    red: 'border-2 border-red-600 text-red-600 focus:ring-red-500 hover:bg-red-600 hover:text-white',
    orange:
      'border-2 border-orange-600 text-orange-600 focus:ring-orange-500 hover:bg-orange-600 hover:text-white',
    amber:
      'border-2 border-amber-600 text-amber-600 focus:ring-amber-500 hover:bg-amber-600 hover:text-white',
    yellow:
      'border-2 border-yellow-600 text-yellow-600 focus:ring-yellow-500 hover:bg-yellow-600 hover:text-white',
    lime: 'border-2 border-lime-600 text-lime-600 focus:ring-lime-500 hover:bg-lime-600 hover:text-white',
    green:
      'border-2 border-green-600 text-green-600 focus:ring-green-500 hover:bg-green-600 hover:text-white',
    emerald:
      'border-2 border-emerald-600 text-emerald-600 focus:ring-emerald-500 hover:bg-emerald-600 hover:text-white',
    teal: 'border-2 border-teal-600 text-teal-600 focus:ring-teal-500 hover:bg-teal-600 hover:text-white',
    cyan: 'border-2 border-cyan-600 text-cyan-600 focus:ring-cyan-500 hover:bg-cyan-600 hover:text-white',
    sky: 'border-2 border-sky-600 text-sky-600 focus:ring-sky-500 hover:bg-sky-600 hover:text-white',
    blue: 'border-2 border-blue-600 text-blue-600 focus:ring-blue-500 hover:bg-blue-600 hover:text-white',
    indigo:
      'border-2 border-indigo-600 text-indigo-600 focus:ring-indigo-500 hover:bg-indigo-600 hover:text-white',
    violet:
      'border-2 border-violet-600 text-violet-600 focus:ring-violet-500 hover:bg-violet-600 hover:text-white',
    purple:
      'border-2 border-purple-600 text-purple-600 focus:ring-purple-500 hover:bg-purple-600 hover:text-white',
    fuchsia:
      'border-2 border-fuchsia-600 text-fuchsia-600 focus:ring-fuchsia-500 hover:bg-fuchsia-600 hover:text-white',
    pink: 'border-2 border-pink-600 text-pink-600 focus:ring-pink-500 hover:bg-pink-600 hover:text-white',
    rose: 'border-2 border-rose-600 text-rose-600 focus:ring-rose-500 hover:bg-rose-600 hover:text-white',
  },
} as const;

// Glow effect classes
export const GLOW_CLASSES = {
  slate: 'hover:shadow-slate-500/50',
  gray: 'hover:shadow-gray-500/50',
  zinc: 'hover:shadow-zinc-500/50',
  neutral: 'hover:shadow-neutral-500/50',
  stone: 'hover:shadow-stone-500/50',
  red: 'hover:shadow-red-500/50',
  orange: 'hover:shadow-orange-500/50',
  amber: 'hover:shadow-amber-500/50',
  yellow: 'hover:shadow-yellow-500/50',
  lime: 'hover:shadow-lime-500/50',
  green: 'hover:shadow-green-500/50',
  emerald: 'hover:shadow-emerald-500/50',
  teal: 'hover:shadow-teal-500/50',
  cyan: 'hover:shadow-cyan-500/50',
  sky: 'hover:shadow-sky-500/50',
  blue: 'hover:shadow-blue-500/50',
  indigo: 'hover:shadow-indigo-500/50',
  violet: 'hover:shadow-violet-500/50',
  purple: 'hover:shadow-purple-500/50',
  fuchsia: 'hover:shadow-fuchsia-500/50',
  pink: 'hover:shadow-pink-500/50',
  rose: 'hover:shadow-rose-500/50',
} as const;

// Helper functions to get classes from mappings
export const getVariantClasses = (
  variant: 'primary' | 'secondary',
  color: string
) => {
  return (
    COLOR_CLASSES[variant][color as keyof typeof COLOR_CLASSES.primary] ||
    COLOR_CLASSES[variant].blue
  );
};

export const getHoverClasses = () => {
  // Hover classes are now included in the variant classes
  return '';
};

export const getGlowClasses = (color: string) => {
  return GLOW_CLASSES[color as keyof typeof GLOW_CLASSES] || GLOW_CLASSES.blue;
};
