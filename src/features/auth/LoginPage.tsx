// src/features/auth/LoginPage.tsx
// Login page component (placeholder)

import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Implement actual login
      console.log("Login:", { email, password });
      setError("Login not implemented yet");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">💊</span>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Sign in to PharmaScan
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button type="submit" isLoading={isLoading} className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-indigo-600 hover:text-indigo-800">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
