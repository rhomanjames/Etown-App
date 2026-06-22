import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'The Elizabethtown App',
  description: 'Free local news, events, and businesses for Elizabethtown, KY.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="wrap">
          <div className="topbar">
            <a href="/" className="wordmark">elizabethtown<span className="dot">.</span>app</a>
            <nav className="nav">
              <a href="/news">News</a>
              <a href="/events">Events</a>
              <a href="/businesses">Businesses</a>
              <a href="/login">Log in</a>
            </nav>
          </div>
          <svg className="hills" viewBox="0 0 720 36" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30 C 90 5, 150 30, 240 12 C 330 30, 390 8, 480 24 C 560 6, 630 28, 720 14 L720 36 L0 36 Z" fill="#2F5233" opacity="0.12" />
          </svg>
          {children}
          <footer>The Elizabethtown App &middot; built for Etown, by Etown</footer>
        </div>
      </body>
    </html>
  );
}
