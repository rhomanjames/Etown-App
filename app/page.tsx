import { supabase } from '@/lib/supabaseClient';

async function getData() {
  const [{ data: news }, { data: events }, { data: businesses }, { data: jobs }] = await Promise.all([
    supabase.from('news_posts').select('*').order('published_at', { ascending: false }).limit(4),
    supabase.from('events').select('*').order('event_date', { ascending: true }).limit(3),
    supabase.from('businesses').select('*').order('created_at', { ascending: false }).limit(3),
    supabase.from('jobs').select('*').order('created_at', { ascending: false }).limit(3),
  ]);
  return { news: news || [], events: events || [], businesses: businesses || [], jobs: jobs || [] };
}

export const revalidate = 600; // refresh every 10 min

export default async function Home() {
  const { news, events, businesses, jobs } = await getData();

  return (
    <>
      <div className="weather-strip">
        <span className="temp">75°</span>
        <span>Cloudy &middot; 45% chance of rain today &middot; Elizabethtown, KY</span>
      </div>

      <section className="section">
        <div className="section-label">Today in Etown</div>
        <h2 className="section-title">Lizzie's Daily Update</h2>
        {news.length === 0 && (
          <div className="empty">No updates yet — check back this morning.</div>
        )}
        {news.map((post: any) => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="meta">{new Date(post.published_at).toLocaleDateString()}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">Coming Up</div>
        <h2 className="section-title">This Week's Events</h2>
        {events.length === 0 && (
          <div className="empty">No events posted yet. <a href="/events">Add the first one →</a></div>
        )}
        {events.map((e: any) => (
          <div className="card" key={e.id}>
            <h3>{e.name}</h3>
            <p>{e.location}</p>
            <div className="meta">{new Date(e.event_date).toLocaleDateString()}</div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="section-label">Around Town</div>
        <h2 className="section-title">Local Businesses</h2>
        {businesses.length === 0 && (
          <div className="empty">No businesses listed yet. <a href="/businesses">Add yours free →</a></div>
        )}
        {businesses.map((b: any) => (
          <div className="card" key={b.id}>
            <h3>{b.name}</h3>
            <p>{b.category} &middot; {b.address}</p>
          </div>
        ))}
      </section>
      <section className="section">
        <div className="section-label">Hiring Now</div>
        <h2 className="section-title">Local Jobs</h2>
        {jobs.length === 0 && (
          <div className="empty">No jobs posted yet. <a href="/jobs">Post one free →</a></div>
        )}
        {jobs.map((j: any) => (
          <div className="card" key={j.id}>
            <h3>{j.title}</h3>
            <p>{j.company} &middot; {j.location}</p>
          </div>
        ))}
      </section>
    </>
  );
}
