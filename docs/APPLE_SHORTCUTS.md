# Apple Shortcuts API Dokumentation

Diese Dokumentation beschreibt, wie du Apple Kurzbefehle einrichtest, um mit der 1% Besser App zu interagieren.

## Supabase REST API Basis

Alle API-Anfragen gehen an:

```
https://YOUR_PROJECT_ID.supabase.co/rest/v1/
```

### Erforderliche Headers

Jede Anfrage benötigt diese Headers:

| Header          | Wert                                     |
| --------------- | ---------------------------------------- |
| `apikey`        | Dein Supabase Anon Key                   |
| `Authorization` | `Bearer YOUR_ANON_KEY`                   |
| `Content-Type`  | `application/json`                       |
| `Prefer`        | `return=representation` (für POST/PATCH) |

---

## API Endpoints

### 1. Morgenziel setzen (POST)

Setzt das Tagesziel am Morgen.

**Endpoint:**

```
POST /rest/v1/daily_entries
```

**Body:**

```json
{
  "user_id": "demo-user-001",
  "date": "2024-01-28",
  "morning_goal": "10 Minuten meditieren"
}
```

**Apple Shortcut Schritte:**

1. **Datum abrufen**: Aktuelles Datum im Format `YYYY-MM-DD`
2. **Text eingeben**: Prompt für Morgenziel
3. **URL abrufen**: POST request an Supabase

### 2. Morgenziel aktualisieren (PATCH)

Falls bereits ein Eintrag existiert.

**Endpoint:**

```
PATCH /rest/v1/daily_entries?user_id=eq.demo-user-001&date=eq.2024-01-28
```

**Body:**

```json
{
  "morning_goal": "Neues Ziel"
}
```

### 3. Abend-Bestätigung (PATCH)

Bestätigt ob das Ziel erreicht wurde.

**Endpoint:**

```
PATCH /rest/v1/daily_entries?user_id=eq.demo-user-001&date=eq.2024-01-28
```

**Body (Erfolg):**

```json
{
  "evening_completed": true,
  "reflection_note": "Optionale Notiz"
}
```

**Body (Nicht geschafft):**

```json
{
  "evening_completed": false,
  "reflection_note": "Was lief schief?"
}
```

### 4. Heutiges Ziel abrufen (GET)

Zeigt das aktuelle Tagesziel an.

**Endpoint:**

```
GET /rest/v1/daily_entries?user_id=eq.demo-user-001&date=eq.2024-01-28&select=morning_goal,evening_completed
```

### 5. Streak abrufen (GET)

Holt alle abgeschlossenen Tage für Streak-Berechnung.

**Endpoint:**

```
GET /rest/v1/daily_entries?user_id=eq.demo-user-001&evening_completed=eq.true&order=date.desc&limit=100
```

---

## Beispiel Apple Shortcut: Morgenziel

```
1. [Eingabe erfragen] - "Was macht dich heute 1% besser?"
   → Speichere als "Ziel"

2. [Aktuelles Datum] - Format: YYYY-MM-DD
   → Speichere als "Heute"

3. [URL abrufen]
   URL: https://YOUR_PROJECT.supabase.co/rest/v1/daily_entries
   Methode: POST
   Headers:
     - apikey: YOUR_ANON_KEY
     - Authorization: Bearer YOUR_ANON_KEY
     - Content-Type: application/json
     - Prefer: return=representation
   Body (JSON):
     {
       "user_id": "demo-user-001",
       "date": [Heute],
       "morning_goal": [Ziel]
     }

4. [Mitteilung anzeigen] - "✅ Ziel gesetzt: [Ziel]"
```

## Beispiel Apple Shortcut: Abend-Check

```
1. [Aus Liste wählen] - "Hast du dein Ziel erreicht?"
   Optionen: "✓ Ja", "✗ Nein"
   → Speichere als "Ergebnis"

2. [Aktuelles Datum] - Format: YYYY-MM-DD
   → Speichere als "Heute"

3. [Wenn Ergebnis = "✓ Ja"]
   [Variable setzen] completed = true
   [Sonst]
   [Variable setzen] completed = false

4. [URL abrufen]
   URL: https://YOUR_PROJECT.supabase.co/rest/v1/daily_entries?user_id=eq.demo-user-001&date=eq.[Heute]
   Methode: PATCH
   Headers: (wie oben)
   Body: { "evening_completed": [completed] }

5. [Mitteilung anzeigen] - "Abend-Check gespeichert!"
```

---

## Automatisierung mit Kurzbefehlen

1. **Morgens um 8:00**: Automatisch Morgenziel-Shortcut starten
2. **Abends um 21:00**: Automatisch Abend-Check Shortcut starten

Gehe zu:

- Einstellungen → Kurzbefehle → Automation → + → Tageszeit
