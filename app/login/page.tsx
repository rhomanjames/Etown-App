'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  };

  return (
    <>
      <section className="section">
        <div className="section-label">Account</div>
        <h2 className="section-title">Log in to The Elizabethtown App</h2>
        {sent ? (
          <div className="card">
            <h3>Check your email</h3>
            <p>We sent a magic link to {email}. Click it to log in — no password needed.</p>
          </div>
        ) : (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn">Send magic link</button>
            {error && <p style={{ color: '#a33', fontSize: 13, marginTop: 10 }}>{error}</p>}
          </form>
        )}
      </section>
    </>
  );
}
