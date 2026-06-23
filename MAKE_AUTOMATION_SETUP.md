# Automating News + Alerts into The Elizabethtown App

This sets up two Make.com scenarios that auto-fill your `news_posts` table.

## Scenario 1 — Local News (Google News RSS)

1. **Module 1:** RSS > Watch RSS feed items
   - Feed URL: `https://news.google.com/rss/search?q=Hardin+County+Kentucky&hl=en-US&gl=US&ceid=US:en`
   - (Add a second, identical scenario with `Elizabethtown+Kentucky` instead, if you want broader coverage)
2. **Module 2:** Supabase > Create a Record
   - Table: `news_posts`
   - `title` → map from RSS "Title"
   - `summary` → map from RSS "Description" (Make has a "strip HTML" function — wrap the field in `striphtml()` since Google News descriptions include HTML)
   - `source_type` → set to text value `news`
   - `published_at` → map from RSS "Date"
3. Set the scenario to run every **1-2 hours** (no need for real-time on regular news)

## Scenario 2 — Severe Weather Alerts (National Weather Service)

1. **Module 1:** HTTP > Make a request
   - URL: `https://api.weather.gov/alerts/active?area=KY`
   - Method: GET
   - Parse response: Yes (JSON)
2. **Module 2:** Iterator
   - Iterate over `features` (the array of individual alerts in the response)
3. **Module 3:** Filter
   - Only continue if `areaDesc` (inside `properties`) **contains** `Hardin`
4. **Module 4:** Supabase > Search Records (dedupe check)
   - Search `news_posts` where `title` equals the alert headline
   - Add a filter after this: only continue if **no** record found (prevents duplicate alerts on every run)
5. **Module 5:** Supabase > Create a Record
   - `title` → `properties.headline`
   - `summary` → `properties.description` (truncate to ~300 characters using Make's `substring()` function)
   - `source_type` → set to text value `alert`
   - `published_at` → `properties.sent`
6. Set this scenario to run every **15 minutes** — alerts are time-sensitive

## Result

Once both scenarios are live:
- Regular news flows into `news_posts` with `source_type = 'news'`
- Active NWS alerts flow in with `source_type = 'alert'`
- The app automatically shows alerts first, with a red "Alert" badge, on both the homepage and `/news`

## Notes
- The NWS API requires no key and is free, government-maintained, and reliable.
- Google News RSS occasionally includes loosely-related stories (e.g., statewide news mentioning Hardin County only in passing) — periodically review `news_posts` in Supabase and delete anything irrelevant.
- If you want tighter coverage, add a Make.com **Text Filter** module checking that the title/description contains "Elizabethtown" OR "Hardin County" before inserting.
