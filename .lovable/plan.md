

## Plan: Core-Flow absichern & Bugs fixen

### Überblick
Der Basis-Flow ist weitgehend implementiert. Es fehlen zwei Features (Video löschen, View-Count-Inkrement) und es gibt einen Bug in Login.tsx. Hier die konkreten Änderungen:

---

### 1. Login.tsx — Doppelter `<Link>` Bug fixen
Zeile 53 enthält zwei verschachtelte `<Link>`:
```jsx
<Link to="/" className="font-display text-3xl text-neon"><Link to="/" className="font-display text-3xl text-neon">SCORLINK</Link></Link>
```
Wird zu einem einzelnen `<Link>`.

---

### 2. VideoPage.tsx — View-Count via RPC
Beim Laden der VideoPage wird `supabase.rpc('increment_view_count', { video_id: id })` aufgerufen — einmalig im `useEffect`, nachdem das Video geladen ist. Nur für fremde Videos (nicht eigene).

---

### 3. Video löschen — Dashboard & VideoPage

**Dashboard.tsx:**
- Lösch-Button (Trash-Icon) an jedem Video in der Liste
- Bestätigungsdialog (AlertDialog) vor dem Löschen
- Nach Bestätigung: Video-Datei + Thumbnail aus Storage löschen, DB-Eintrag entfernen, Liste aktualisieren

**VideoPage.tsx:**
- Lösch-Button nur anzeigen wenn `isOwnVideo === true`
- Gleiche Lösch-Logik mit Bestätigungsdialog
- Nach Löschen: Redirect zum Dashboard

**Shared Helper** (in `storage.ts`):
- Neue Funktion `deleteVideoAssets(video: Video)` die:
  - Video-Datei aus `videos`-Bucket löscht (Pfad aus URL extrahieren)
  - Thumbnail aus `thumbnails`-Bucket löscht (falls vorhanden)
  - DB-Eintrag löscht: `supabase.from('videos').delete().eq('id', video.id)`

---

### Technische Details

**Storage-Pfad-Extraktion:** Die Public URL enthält den Bucket-Pfad nach `/object/public/{bucket}/`. Daraus wird der relative Pfad für `storage.from(bucket).remove([path])` extrahiert.

**RLS:** Delete-Policy für Videos existiert bereits (`auth.uid() = player_id`). Storage-Delete-Policies müssen ggf. per Migration hinzugefügt werden für die Buckets `videos` und `thumbnails`.

**Migration:** Storage-RLS-Policies für DELETE auf `videos` und `thumbnails` Buckets hinzufügen, falls nicht vorhanden.

---

### Dateien die geändert werden
| Datei | Änderung |
|---|---|
| `src/pages/Login.tsx` | Doppelten Link fixen |
| `src/pages/VideoPage.tsx` | View-Count RPC + Lösch-Button mit Dialog |
| `src/pages/Dashboard.tsx` | Lösch-Button mit Bestätigungsdialog |
| `src/lib/storage.ts` | `deleteVideoAssets()` Helper |
| Migration | Storage DELETE Policies |

