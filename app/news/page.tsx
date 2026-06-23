import { supabase } from '@/lib/supabaseClient';
import NewsCard from '@/components/NewsCard';

export const revalidate = 600;

export default async function NewsPage() {
  const [{ data: alerts }, { data: regularNews }] = await Promise.all([
    supabase.from('news_posts').select('*').eq('source_type', 'alert').order('published_at', { ascending: false }).limit(10),
    supabase.from('news_posts').select('*').neq('source_type', 'alert').order('published_at', { ascending: false }).limit(30),
  ]);
  const news = [...(alerts || []), ...(regularNews || [])];

  return (
    <>
      <section className="section">
        <div className="section-label">Lizzie Today</div>
        <h2 className="section-title">All Local Updates</h2>
        {news.length === 0 && <div className="empty">No updates yet.</div>}
        {news.map((post: any) => (
          <NewsCard post={post} key={post.id} />
        ))}
      </section>
    </>
  );
}
