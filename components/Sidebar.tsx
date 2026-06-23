'use client';
import { usePathname } from 'next/navigation';
import { Home, Newspaper, CalendarDays, Building2, Briefcase, LogIn } from 'lucide-react';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/news', label: 'News', icon: Newspaper },
  { href: '/events', label: 'Events', icon: CalendarDays },
  { href: '/businesses', label: 'Businesses', icon: Building2 },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/login', label: 'Log in', icon: LogIn },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <a href="/" className="wordmark">
        elizabethtown<span className="dot">.</span>app
      </a>
      <nav className="side-nav">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <a key={href} href={href} className={`side-link ${active ? 'active' : ''}`}>
              <Icon size={20} strokeWidth={2} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
