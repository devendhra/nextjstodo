'use client'; 

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (!error) router.push('/');
    else {
      alert('Login failed!');
      setEmail('');
      setPassword('');
    }
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (!error){
      alert('Check your email for confirmation!');
      setEmail('');
      setPassword('');
    }
    else {
      alert('Signup failed!');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login / Signup</h1>
      <input
        className="border p-2 rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="flex gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
          Login
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
}
