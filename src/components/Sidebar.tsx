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
  children
}: SidebarProps) {

  // Navigation items configuration
  const navigationItems: NavigationItem[] = [
    {
      id: 'audience',
      label: 'Audience',
      icon: <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-gray-600" />,
      active: currentPage === 'audience',
      onClick: () => window.location.href = '/audience-demographic'
    },
    {
      id: 'concepts',
      label: 'Concepts',
      icon: <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-gray-600" />,
      active: currentPage === 'concepts',
      onClick: () => window.location.href = '/concept'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 text-gray-600" />,
      active: currentPage === 'dashboard',
      onClick: () => window.location.href = '/'
    }
  ];

  // Get the active navigation item to determine the icon
  const activeNavItem = navigationItems.find(item => item.active);

  const displayIcon = activeNavItem ? (
    <FontAwesomeIcon 
      icon={activeNavItem.id === 'audience' ? faUsers : 
            activeNavItem.id === 'concepts' ? faLightbulb : faChartBar} 
      className="w-5 h-5 text-white" 
    />
  ) : (
    <FontAwesomeIcon icon={faLightbulb} className="w-5 h-5 text-white" />
  );

  return (
    <div className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    } bg-white flex flex-col`}>
      
      {/* Logo/Header */}
      <div className={`flex items-center px-6 py-4 h-20 sticky top-0 z-10 bg-white ${
        isOpen ? 'justify-between' : 'justify-center'
      }`}>
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              {displayIcon}
            </div>
            <span className="text-lg font-semibold text-gray-900">{title}</span>
          </div>
        )}
        <button
          onClick={onToggleAction}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Navigation */}
      {navigationItems.length > 0 && (
        <nav className="flex-1 p-4 space-y-2 border-r border-gray-200">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50'
                } ${!isOpen ? 'justify-center' : ''}`}
              >
                <div>
                  {item.icon}
                </div>
                {isOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Custom Content */}
      {children && (
        <div className="flex-1 p-4 border-r border-gray-200">
          {children}
        </div>
      )}


    </div>
  );
}
