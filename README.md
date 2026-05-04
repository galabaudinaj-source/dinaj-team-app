# 🌿 Dinaj Tagesbericht – PWA

Tagesberichte erfassen, als PDF exportieren und auf dem Handy als App nutzen.

---

## 📁 Dateistruktur

```
dinaj-tagesbericht/
├── index.html            ← Gesamte App (HTML + CSS + JS, vollständig offline)
├── manifest.json         ← PWA-Konfiguration (Name, Icons, Farben)
├── service-worker.js     ← Offline-Caching
├── icons/
│   ├── icon-192.png      ← App-Icon Android / PWA (192×192)
│   ├── icon-512.png      ← App-Icon groß / Splash Screen (512×512)
│   └── apple-touch-icon.png  ← App-Icon iPhone (180×180)
└── README.md             ← Diese Datei
```

---

## 🚀 Veröffentlichen über GitHub Pages (kostenlos, kein Server nötig)

### Voraussetzungen
- Kostenloses Konto auf [github.com](https://github.com)
- Alle Dateien aus diesem Ordner (inkl. `icons/`-Unterordner)

---

### Schritt 1 – Repository anlegen

1. Auf [github.com](https://github.com) einloggen
2. Oben rechts auf **„+"** → **„New repository"** klicken
3. **Repository name:** z.B. `dinaj-tagesbericht`
4. **Visibility:** `Public` wählen *(GitHub Pages ist bei Free-Konten nur für öffentliche Repos kostenlos)*
5. **„Create repository"** klicken

---

### Schritt 2 – Dateien hochladen

**Option A – direkt im Browser (empfohlen für Einsteiger):**

1. Im neu erstellten Repository auf **„Add file" → „Upload files"** klicken
2. Alle Dateien per **Drag & Drop** in das Upload-Fenster ziehen:
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - Den gesamten `icons/`-Ordner
3. Unten auf **„Commit changes"** klicken

**Option B – per Git (Terminal):**
```bash
# Repository klonen
git clone https://github.com/DEIN-USERNAME/dinaj-tagesbericht.git

# Alle Dateien in den Ordner kopieren, dann:
cd dinaj-tagesbericht
git add .
git commit -m "Tagesbericht PWA veröffentlichen"
git push
```

---

### Schritt 3 – GitHub Pages aktivieren

1. Im Repository oben auf **„Settings"** klicken
2. Im linken Menü: **„Pages"** auswählen
3. Unter **„Branch"**: `main` und Ordner `/ (root)` auswählen
4. Auf **„Save"** klicken

⏳ Nach ca. **1–3 Minuten** ist die App erreichbar unter:
```
https://DEIN-USERNAME.github.io/dinaj-tagesbericht/
```
*(z.B. `https://vdinaj.github.io/dinaj-tagesbericht/`)*

---

## 📱 App auf dem Handy installieren

### iPhone / iPad (Safari)

> ⚠️ **Nur mit Safari** – Chrome und andere Browser auf iOS unterstützen keine PWA-Installation.

1. Die App-URL im **Safari**-Browser öffnen
2. Unten auf das **Teilen-Symbol** tippen (Quadrat mit Pfeil nach oben ↑)
3. Nach unten scrollen → **„Zum Home-Bildschirm"** antippen
4. Optional den Namen anpassen
5. **„Hinzufügen"** antippen

✅ Die App erscheint als Icon auf dem Home-Bildschirm und öffnet sich ohne Browser-Leiste – genau wie eine normale App.

---

### Android (Chrome)

1. Die App-URL in **Chrome** öffnen
2. Oben rechts auf die **drei Punkte** (⋮) tippen
3. **„App installieren"** oder **„Zum Startbildschirm hinzufügen"** antippen
4. Bestätigen

✅ App-Icon erscheint auf dem Startbildschirm.

---

## ✏️ Icons anpassen (optional)

Die mitgelieferten Icons passen farblich zur App (dunkelgrün `#2d5a24`).
Für ein eigenes Firmenlogo:

| Datei | Größe | Zweck |
|---|---|---|
| `icon-192.png` | 192 × 192 px | Android, Chrome PWA |
| `icon-512.png` | 512 × 512 px | Splash Screen, Play Store |
| `apple-touch-icon.png` | 180 × 180 px | iPhone Home-Bildschirm |

**Tipps für gute Icons:**
- Hintergrundfarbe `#2d5a24` (dunkelgrün) passt zur App
- Ca. 10–15% Rand zum Rand frei lassen (für Android „maskable" Rounding)
- PNG mit Transparenz (RGBA) oder vollem Hintergrund – beides funktioniert

**Kostenlose Tools:**
- [RealFaviconGenerator.net](https://realfavicongenerator.net) – generiert alle Größen auf einmal
- [Canva](https://canva.com) – Logo gestalten und als PNG exportieren

---

## 🔄 App nach Änderungen aktualisieren

Wenn du `index.html` änderst und neu hochlädst, lädt der Service Worker automatisch
die neue Version beim nächsten App-Start.

**Für sofortiges Update** (z.B. bei kritischen Fixes):
In `service-worker.js` die Versionsnummer erhöhen:
```js
// Vorher:
const CACHE_NAME = 'dinaj-tagesbericht-v1';
// Nachher:
const CACHE_NAME = 'dinaj-tagesbericht-v2';  // ← hochzählen
```
Dann neu hochladen → alle Nutzer bekommen beim nächsten Öffnen die neue Version.

---

## 💾 Datenspeicherung & Datenschutz

- Alle Berichte werden **nur lokal** im Browser des Geräts gespeichert (`localStorage`)
- **Kein Server**, keine Cloud, keine Datenübertragung
- Daten verlassen das Gerät nicht – außer beim bewussten PDF-Export oder Backup
- Backup über **„⬇️ Exportieren"** im Archiv-Tab erstellen und z.B. in Google Drive ablegen

---

## 🌐 Offline-Nutzung

Nach dem ersten Öffnen (mit Internet) ist die App **vollständig offline nutzbar:**

| Funktion | Offline |
|---|---|
| Neuen Bericht erstellen | ✅ |
| Archiv durchsuchen | ✅ |
| Bericht löschen | ✅ |
| Backup exportieren | ✅ |
| PDF erstellen | ✅ *(nach einmaligem Laden von jsPDF)* |
| Wetter laden | ❌ *(braucht Internet)* |

---

## 📞 Support

Bei technischen Fragen zur App: Vatan Dinaj – Garten & Landschaftsbau, Bochum
