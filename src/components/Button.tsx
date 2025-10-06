import React from 'react';
import { twMerge } from 'tw-merge';
import {
  BASE_CLASSES,
  DEFAULT_ANIMATION,
  SIZES,
  HOVER_EFFECTS,
  ANIMATIONS,
  getVariantClasses,
  getHoverClasses,
  getGlowClasses,
} from './Button.styles';

// Types
type TailwindColor =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  color?: TailwindColor;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  hover?: '' | 'pulse' | 'scale' | 'glow' | 'slide' | string;
  animation?: 'smooth' | 'bounce' | 'fade' | 'spring' | string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  color = 'blue',
  onClick,
  className,
  disabled = false,
  hover,
  animation,
}: ButtonProps) {
  const getHoverEffectClasses = () => {
    if (!hover) return '';
    if (hover === 'glow')
      return `${HOVER_EFFECTS[hover]} ${getGlowClasses(color)}`;
    return HOVER_EFFECTS[hover as keyof typeof HOVER_EFFECTS] || hover;
  };

  return (
    <button
      className={twMerge(
        `${BASE_CLASSES} ${getVariantClasses(variant, color)} ${SIZES[size]} ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${getHoverClasses()} ${getHoverEffectClasses()} ${ANIMATIONS[animation as keyof typeof ANIMATIONS] || animation || DEFAULT_ANIMATION} ${className || ''}`
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
