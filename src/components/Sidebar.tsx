'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import { faBars, faUsers, faChartBar } from '@fortawesome/free-solid-svg-icons';

// Navigation item interface
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onToggleAction: () => void;
  title: string;
  currentPage: 'audience' | 'concepts' | 'dashboard';
  children?: React.ReactNode;
}

export function Sidebar({
  isOpen,
  onToggleAction,
  title,
  currentPage,
  children,
}: SidebarProps) {
  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    {
      id: 'audience',
      label: 'Audience',
      icon: (
        <FontAwesomeIcon icon={faUsers} className="h-5 w-5 text-gray-600" />
      ),
      active: currentPage === 'audience',
      onClick: () => (window.location.href = '/audience-demographic'),
    },
    {
      id: 'concepts',
      label: 'Concepts',
      icon: (
        <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5 text-gray-600" />
      ),
      active: currentPage === 'concepts',
      onClick: () => (window.location.href = '/concept'),
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <FontAwesomeIcon icon={faChartBar} className="h-5 w-5 text-gray-600" />
      ),
      active: currentPage === 'dashboard',
      onClick: () => (window.location.href = '/'),
    },
  ];

  // Get the active navigation item to determine the icon
  const activeNavItem = navigationItems.find((item) => item.active);

  const displayIcon = activeNavItem ? (
    <FontAwesomeIcon
      icon={
        activeNavItem.id === 'audience'
          ? faUsers
          : activeNavItem.id === 'concepts'
            ? faLightbulb
            : faChartBar
      }
      className="h-5 w-5 text-white"
    />
  ) : (
    <FontAwesomeIcon icon={faLightbulb} className="h-5 w-5 text-white" />
  );

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } flex flex-col bg-white`}
    >
      {/* Logo/Header */}
      <div
        className={`sticky top-0 z-10 flex h-20 items-center bg-white px-6 py-4 ${
          isOpen ? 'justify-between' : 'justify-center'
        }`}
      >
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              {displayIcon}
            </div>
            <span className="text-lg font-semibold text-gray-900">{title}</span>
          </div>
        )}
        <button
          onClick={onToggleAction}
          className="cursor-pointer rounded-lg p-2 transition-colors hover:bg-gray-100"
        >
          <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      {navigationItems.length > 0 && (
        <nav className="flex-1 space-y-2 border-r border-gray-200 p-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!isOpen ? 'justify-center' : ''}`}
              >
                <div>{item.icon}</div>
                {isOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Custom Content */}
      {children && (
        <div className="flex-1 border-r border-gray-200 p-4">{children}</div>
      )}
    </div>
  );
}
