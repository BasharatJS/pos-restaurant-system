'use client';

import React from 'react';

interface HeaderProps {
  user: any;
  logout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, logout }) => (
  <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
        <p className="text-gray-600">Real-time restaurant management</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
);

export default Header;