import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, WifiOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signInWithGoogle, signInWithEmail, isOnline } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOnline) {
      setError('Please check your internet connection and try again.');
      return;
    }
    try {
      await signInWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    if (!isOnline) {
      setError('Please check your internet connection and try again.');
      return;
    }
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Failed to log in with Google.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-eco-paper to-white dark:from-eco-green-dark dark:to-eco-green-medium">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-eco-green-dark rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-eco-green-dark dark:text-white">
            Sign in to your account
          </h2>
          {!isOnline && (
            <div className="mt-4 flex items-center justify-center text-red-600 dark:text-red-400">
              <WifiOff className="h-5 w-5 mr-2" />
              <span>You are currently offline</span>
            </div>
          )}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-eco-green-medium dark:border-eco-green-light rounded-t-md focus:outline-none focus:ring-eco-green-medium focus:border-eco-green-medium focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isOnline}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 dark:text-white dark:bg-eco-green-medium dark:border-eco-green-light rounded-b-md focus:outline-none focus:ring-eco-green-medium focus:border-eco-green-medium focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isOnline}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-eco-green-medium hover:bg-eco-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-eco-green-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isOnline}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-eco-green-light group-hover:text-eco-green-light" />
              </span>
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-eco-green-light"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-eco-green-dark text-gray-500 dark:text-gray-300">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-eco-green-light rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-eco-green-medium hover:bg-gray-50 dark:hover:bg-eco-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isOnline}
            >
              <User className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 