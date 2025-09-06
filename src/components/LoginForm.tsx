'use client';

import { useState } from 'react';
import { useAuth, UserRole } from '@/context/AuthContext';

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('waiter');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password, selectedRole);
    if (!success) {
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  const roleCards = [
    { role: 'admin' as UserRole, title: 'Admin', color: 'bg-red-500 hover:bg-red-600' },
    { role: 'manager' as UserRole, title: 'Manager', color: 'bg-yellow-500 hover:bg-yellow-600' },
    { role: 'waiter' as UserRole, title: 'Waiter', color: 'bg-green-500 hover:bg-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">POS</h1>
          <h2 className="text-2xl font-semibold text-gray-700">for Restaurant</h2>
          <div className="mt-4 w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-red-500 mb-8">Login</h3>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-3">Select Role:</label>
            <div className="grid grid-cols-3 gap-3">
              {roleCards.map(({ role, title, color }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`
                    ${selectedRole === role ? color : 'bg-gray-200 hover:bg-gray-300'}
                    ${selectedRole === role ? 'text-white' : 'text-gray-700'}
                    py-3 px-2 rounded-lg font-semibold text-sm transition-colors
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                  `}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Enter your email"
                style={{ color: '#000000', backgroundColor: '#ffffff' }}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 bg-white"
                placeholder="Enter your password"
                style={{ color: '#000000', backgroundColor: '#ffffff' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Use your Firebase authentication credentials</p>
          </div>
        </div>
      </div>
    </div>
  );
}