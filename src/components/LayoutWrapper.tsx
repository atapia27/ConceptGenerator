'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar, Header } from '@/components';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // Determine current page based on pathname
  const getCurrentPage = (): 'audience' | 'concepts' | 'dashboard' => {
    if (pathname === '/audience-demographic') return 'audience';
    if (pathname === '/concept') return 'concepts';
    return 'dashboard';
  };

  // Get page title and subtitle based on current page
  const getPageInfo = () => {
    switch (getCurrentPage()) {
      case 'audience':
        return {
          title: 'Audience Demographics',
          subtitle: 'Create targeted audience profiles for marketing campaigns',
        };
      case 'concepts':
        return {
          title: 'Creative Concepts',
          subtitle: 'Generate data-driven advertising concepts',
        };
      default:
        return {
          title: 'Dashboard',
          subtitle: 'Welcome to your concept generation dashboard',
        };
    }
  };

  const currentPage = getCurrentPage();
  const { title, subtitle } = getPageInfo();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggleAction={() => setSidebarOpen(!sidebarOpen)}
        title={
          currentPage === 'audience'
            ? 'Audience'
            : currentPage === 'concepts'
              ? 'Concepts'
              : 'Dashboard'
        }
        currentPage={currentPage}
      />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}
      >
        {/* Header */}
        <Header title={title} subtitle={subtitle} />

        {/* Page Content */}
        <main className="p-6">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
