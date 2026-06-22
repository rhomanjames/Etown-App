# The Elizabethtown App

Free local news, events, and business directory for Elizabethtown, KY — minimal, fast, no app-store install needed (PWA-ready).

## Stack
- Next.js 14 (App Router)
- Supabase (database + auth, free tier)
- Vercel (hosting, free tier) or GitHub Pages

## 1. Set up Supabase (free)
1. Go to https://supabase.com → New Project
2. Once created, open the **SQL Editor** and paste in the contents of `supabase_schema.sql` from this repo. Run it.
3. Go to **Project Settings → API** and copy:
   - Project URL
   - `anon` public key

## 2. Set up locally
```bash
npm install
cp .env.local.example .env.local
# paste your Supabase URL + anon key into .env.local
npm run dev
```
Visit http://localhost:3000

## 3. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - The Elizabethtown App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elizabethtown-app.git
git push -u origin main
```

## 4. Deploy free on Vercel
1. Go to https://vercel.com → New Project → Import your GitHub repo
2. Add the two environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) in Vercel's project settings
3. Deploy — Vercel gives you a free `.vercel.app` URL, and you can point your own domain (elizabethtown.app) to it for free under Project Settings → Domains

## 5. Connect elizabethtown.app domain
In Vercel: Settings → Domains → Add `elizabethtown.app` → follow the DNS instructions (point your domain registrar's A/CNAME record to Vercel).

## What's included (MVP)
- **Homepage** — weather strip (static for now, swap in a weather API later), latest news, upcoming events, recent businesses
- **/news** — full news feed (pulled from `news_posts` table)
- **/events** — event list + free public submission form
- **/businesses** — directory + free public submission form
- **/login** — passwordless email login (Supabase magic link)

## Adding daily news content
For now, add rows to the `news_posts` table manually via the Supabase Table Editor (Title, Summary, Body). 
Next step: connect your Make.com automation to insert rows into `news_posts` automatically each morning using the Supabase REST API (HTTP module, POST to `/rest/v1/news_posts` with your `service_role` key — keep that key server-side only, never in the app).

## Notes on accounts/cost
- Magic-link login means no passwords to manage, and Supabase's free tier covers thousands of users before you'd pay anything.
- Public submission forms for events/businesses currently have no spam protection — add a simple Cloudflare Turnstile or honeypot field before a public launch.
