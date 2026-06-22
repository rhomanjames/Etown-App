'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function BusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', category: '', address: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from('businesses')
      .select('*')
      .order('name', { ascending: true })
      .then(({ data }) => setBusinesses(data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('businesses').insert([form]);
    if (!error) setSubmitted(true);
  };

  return (
    <main>
      <section className="section">
        <div className="section-label">Directory</div>
        <h2 className="section-title">Local Businesses</h2>
        {businesses.length === 0 && <div className="empty">No listings yet.</div>}
        {businesses.map((b) => (
          <div className="card" key={b.id}>
            <h3>{b.name}</h3>
            <p>{b.category} &middot; {b.address}</p>
            <div className="meta">{b.phone}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">Claim Your Spot</div>
        <h2 className="section-title">Add Your Business — Free</h2>
        {submitted ? (
          <div className="card"><p>Thanks! Your business has been added.</p></div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input className="field" placeholder="Business name" required
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" placeholder="Category (e.g. Restaurant, Plumber)" required
              onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="field" placeholder="Address" required
              onChange={(e) => setForm({ ...form, address: e.target.value })} />
            <input className="field" placeholder="Phone" 
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <button type="submit" className="btn">Submit business</button>
          </form>
        )}
      </section>
    </main>
  );
}
