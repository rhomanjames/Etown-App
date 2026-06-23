import type { Metadata } from 'next';
import '../styles/globals.css';
import Sidebar from '@/components/Sidebar';

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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="shell">
          <Sidebar />
          <main className="content">{children}</main>
          <div className="right-rail" />
        </div>
      </body>
    </html>
  );
}
