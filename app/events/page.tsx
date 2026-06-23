'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', location: '', event_date: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })
      .then(({ data }) => setEvents(data || []));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('events').insert([form]);
    if (!error) setSubmitted(true);
  };

  return (
    <>
      <section className="section">
        <div className="section-label">This Week</div>
        <h2 className="section-title">Events in Elizabethtown</h2>
        {events.length === 0 && <div className="empty">Nothing posted yet.</div>}
        {events.map((e) => (
          <div className="card" key={e.id}>
            <h3>{e.name}</h3>
            <p>{e.description}</p>
            <div className="meta">{new Date(e.event_date).toLocaleDateString()} &middot; {e.location}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">Submit</div>
        <h2 className="section-title">Add Your Event — Free</h2>
        {submitted ? (
          <div className="card"><p>Thanks! Your event has been added.</p></div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input className="field" placeholder="Event name" required
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="field" placeholder="Location" required
              onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input className="field" type="date" required
              onChange={(e) => setForm({ ...form, event_date: e.target.value })} />
            <textarea className="field" placeholder="Description" rows={3}
              onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button type="submit" className="btn">Submit event</button>
          </form>
        )}
      </section>
    </>
  );
}
