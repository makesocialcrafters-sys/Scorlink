

## Add "Entdecken" (Discover Players) Page

### What
A new public page at `/entdecken` showing all registered players in a grid, sorted by total earnings. No login required.

### Changes

**1. Create `src/pages/Entdecken.tsx`**
- Fetch all profiles where `username IS NOT NULL` from Supabase, ordered by `total_earnings` desc
- Use the existing `supabase` client from `@/integrations/supabase/client`
- Use `formatEuro` from `@/lib/helpers` (matching existing import pattern)
- Layout: Fixed nav bar (FOOTYTIPS logo + "Einloggen" link), header section, responsive card grid
- Cards show: avatar (or ⚽ fallback), display_name, @username, club/position tags, earnings, "Profil ansehen →" link to `/p/{username}`
- Loading state with skeleton cards, empty state with emoji
- Styling follows existing dark theme (card bg `#111`, border `#262626`, neon accent for earnings)

**2. Update `src/App.tsx`**
- Import `Entdecken` page
- Add route: `<Route path="/entdecken" element={<Entdecken />} />`

**3. Optionally add nav link from Landing page**
- Add a "Spieler entdecken" link on the landing page pointing to `/entdecken`

