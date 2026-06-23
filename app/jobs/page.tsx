'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', company: '', location: '', pay: '', description: '', contact: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => setJobs(data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('jobs').insert([form]);
    if (!error) setSubmitted(true);
  };

  return (
    <>
      <section className="section">
        <div className="section-label">Hiring Now</div>
        <h2 className="section-title">Job Board</h2>
        {jobs.length === 0 && <div className="empty">No openings posted yet.</div>}
        {jobs.map((j) => (
          <div className="card" key={j.id}>
            <h3>{j.title}</h3>
            <p>{j.company} &middot; {j.location}</p>
            {j.pay && <p>{j.pay}</p>}
            <p>{j.description}</p>
            <div className="meta">Contact: {j.contact}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">Post a Job</div>
        <h2 className="section-title">Hiring? List It Free</h2>
        {submitted ? (
          <div className="card"><p>Thanks! Your job listing has been posted.</p></div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input className="field" placeholder="Job title" required
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="field" placeholder="Company name" required
              onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <input className="field" placeholder="Location" required
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className="field" placeholder="Pay (optional, e.g. $16-18/hr)"
              onChange={(e) => setForm({ ...form, pay: e.target.value })} />
            <textarea className="field" placeholder="Job description" rows={3}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="field" placeholder="Contact (email or phone)" required
              onChange={(e) => setForm({ ...form, contact: e.target.value })} />
            <button type="submit" className="btn">Post job</button>
          </form>
        )}
      </section>
    </>
  );
}
