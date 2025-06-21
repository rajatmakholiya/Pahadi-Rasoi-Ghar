"use client";

import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import LoginImage from "../../assets/Login.png";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleToggleMode = () => {
    setIsSigningUp(!isSigningUp);
    setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isSigningUp ? '/api/auth/signup' : '/api/auth/login';

    try {
      if (isSigningUp && password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.email) {
          localStorage.setItem('userEmail', data.email); // Store email
        }
        router.push('/');
      } else {
        setError(data.message || 'An error occurred.');
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side with image */}
      <div className="relative hidden lg:block">
        <Image
          src={LoginImage}
          alt="A beautiful mountain valley at sunrise"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-10 left-10">
            <h2 className="text-4xl font-bold text-white leading-tight">Pahadi Rasoi Ghar</h2>
            <p className="text-lg text-white/90 mt-2">Authentic Himalayan Cuisine</p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="flex items-center justify-center p-8 sm:p-12 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {isSigningUp ? 'Create a new account' : 'Sign in to your account'}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Or{' '}
              <button type="button" onClick={handleToggleMode} className="font-medium text-[#ff5757] hover:text-[#e64a4a] focus:outline-none focus:underline" disabled={isLoading}>
                {isSigningUp ? 'Sign in to your account.' : 'Sign up for a new account.'}
              </button>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-shadow"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                    </label>
                    <div className="text-sm">
                        {!isSigningUp && (
                            <a href="#" className="font-medium text-[#ff5757] hover:text-[#e64a4a]">
                                Forgot your password?
                            </a>
                        )}
                    </div>
                </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-shadow"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                />
              </div>
            </div>

            {isSigningUp && (
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Confirm Password
                    </label>
                    <div className="mt-1">
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] dark:bg-gray-800 dark:text-white dark:border-gray-600 transition-shadow"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#ff5757] hover:bg-[#e64a4a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5757] transition-colors duration-300 disabled:bg-opacity-50"
                disabled={isLoading}
              >
                {isLoading ? (isSigningUp ? 'Signing Up...' : 'Signing In...') : (isSigningUp ? 'Sign Up' : 'Sign In')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;