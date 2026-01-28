# 1% Besser - Daily Habit Tracker

> "Was macht mich heute 1% besser?"

Eine mobile-first Progressive Web App (PWA) zum Tracken täglicher Micro-Improvements. Setze morgens ein Ziel, bestätige abends deinen Erfolg, und verfolge deinen Fortschritt über Zeit.

## ✨ Features

- 🌅 **Morgen-Routine**: Tägliches Ziel definieren
- 🌙 **Abend-Check**: Erfolg bestätigen mit optionaler Reflexion
- 🔥 **Streak-Tracking**: Tage in Folge mit Erfolg
- 📊 **Analytics**: 30-Tage Fortschritts-Graph
- 📅 **Wochen-Übersicht**: Kalenderansicht der letzten 7 Tage
- 📱 **PWA**: Installierbar auf iOS/Android
- 🔗 **Apple Shortcuts**: REST API für Automatisierung

## 🚀 Quick Start

### 1. Dependencies installieren

```bash
cd "20 daily habit tracker"
npm install
```

### 2. Supabase einrichten

1. Erstelle ein kostenloses Projekt auf [supabase.com](https://supabase.com)
2. Gehe zum SQL Editor und führe `supabase_schema.sql` aus
3. Kopiere URL und Anon Key aus Settings → API

### 3. Environment Variablen

Bearbeite `.env`:

```env
VITE_SUPABASE_URL=https://dein-projekt.supabase.co
VITE_SUPABASE_ANON_KEY=dein-anon-key
VITE_APP_PASSWORD=dein-sicheres-passwort
```

### 4. Starten

```bash
npm run dev
```

Öffne http://localhost:5173 im Browser.

## 📱 PWA Installation

### iOS (Safari)

1. Öffne die App in Safari
2. Tippe auf "Teilen" → "Zum Home-Bildschirm"

### Android (Chrome)

1. Öffne die App in Chrome
2. Tippe auf die drei Punkte → "App installieren"

## 🍎 Apple Shortcuts

Siehe [docs/APPLE_SHORTCUTS.md](docs/APPLE_SHORTCUTS.md) für die vollständige API-Dokumentation.

**Kurz-Übersicht:**

| Aktion       | Methode | Endpoint                                |
| ------------ | ------- | --------------------------------------- |
| Ziel setzen  | POST    | `/rest/v1/daily_entries`                |
| Abend-Check  | PATCH   | `/rest/v1/daily_entries?date=eq.{date}` |
| Ziel abrufen | GET     | `/rest/v1/daily_entries?date=eq.{date}` |

## 🛠 Manuelle Konfigurationsschritte

Nach der Installation müssen diese Schritte manuell durchgeführt werden:

### 1. Supabase Projekt erstellen

- Gehe zu [supabase.com](https://supabase.com)
- Erstelle neues Projekt (kostenloser Tier reicht)
- Warte bis das Projekt initialisiert ist

### 2. Datenbank-Schema anlegen

- Öffne SQL Editor im Supabase Dashboard
- Kopiere Inhalt von `supabase_schema.sql`
- Führe das SQL aus

### 3. API Credentials kopieren

- Gehe zu Settings → API
- Kopiere "Project URL" → `VITE_SUPABASE_URL`
- Kopiere "anon public" Key → `VITE_SUPABASE_ANON_KEY`

### 4. App-Passwort setzen

- Wähle ein sicheres Passwort
- Setze es als `VITE_APP_PASSWORD` in `.env`

### 5. (Optional) Deployment

Für öffentlichen Zugriff deployen auf:

- [Vercel](https://vercel.com) - `npx vercel`
- [Netlify](https://netlify.com) - Drag & Drop des `dist` Ordners
- GitHub Pages

### 6. Apple Shortcuts erstellen

- Siehe `docs/APPLE_SHORTCUTS.md`
- Ersetze `YOUR_PROJECT_ID` und `YOUR_ANON_KEY`
- Richte Automationen für Morgen/Abend ein

## 📁 Projektstruktur

```
20 daily habit tracker/
├── .env                    # Supabase Credentials
├── index.html              # Entry HTML
├── vite.config.js          # Vite + PWA Config
├── package.json
├── supabase_schema.sql     # Database Schema
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css           # Design System
│   ├── lib/
│   │   └── supabase.js     # API Client
│   └── components/
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       ├── MorningInput.jsx
│       ├── EveningCheck.jsx
│       ├── StreakBadge.jsx
│       ├── WeekOverview.jsx
│       ├── AnalyticsChart.jsx
│       └── BottomNav.jsx
└── docs/
    └── APPLE_SHORTCUTS.md
```

## 🎨 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Vanilla CSS mit Custom Properties
- **Charts**: Chart.js + react-chartjs-2
- **Database**: Supabase (PostgreSQL)
- **PWA**: vite-plugin-pwa

## 📄 Lizenz

MIT
