import { AlertTriangle } from 'lucide-react';

export default function NewsCard({ post }: { post: any }) {
  const isAlert = post.source_type === 'alert';

  return (
    <div className={`card ${isAlert ? 'card-alert' : ''}`}>
      {isAlert && (
        <div className="alert-badge">
          <AlertTriangle size={14} strokeWidth={2.5} />
          <span>Alert</span>
        </div>
      )}
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <div className="meta">{new Date(post.published_at).toLocaleDateString()}</div>
    </div>
  );
}
