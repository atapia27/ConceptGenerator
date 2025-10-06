'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Header({ title, subtitle, className = '' }: HeaderProps) {
  return (
    <header
      className={`sticky top-0 z-10 h-20 border-b border-l-0 border-gray-200 bg-white px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
