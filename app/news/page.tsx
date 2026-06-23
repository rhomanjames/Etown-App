import { supabase } from '@/lib/supabaseClient';

export const revalidate = 600;

export default async function NewsPage() {
  const { data: news } = await supabase
    .from('news_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(30);

  return (
    <>
      <section className="section">
        <div className="section-label">Lizzie Today</div>
        <h2 className="section-title">All Local Updates</h2>
        {(!news || news.length === 0) && <div className="empty">No updates yet.</div>}
        {news?.map((post: any) => (
          <div className="card" key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <div className="meta">{new Date(post.published_at).toLocaleDateString()}</div>
          </div>
        ))}
      </section>
    </>
  );
}
