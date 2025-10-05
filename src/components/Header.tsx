'use client';

import React from 'react';

interface HeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function Header({ title, subtitle, className = '' }: HeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 px-6 py-4 h-20 border-l-0 sticky top-0 z-10 ${className}`}>
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
