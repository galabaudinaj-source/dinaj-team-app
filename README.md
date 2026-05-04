# 🌿 Dinaj Besichtigungs-App – PWA

Baustellenbesichtigungen als installierbare App auf iPhone & Android.

---

## 📁 Dateistruktur

```
dinaj-besichtigung/
├── index.html          ← Die gesamte App (HTML + CSS + JS)
├── manifest.json       ← PWA-Konfiguration (Name, Icons, Farben)
├── service-worker.js   ← Offline-Caching
├── icons/
│   ├── icon-192.png    ← App-Icon (Android, PWA)
│   ├── icon-512.png    ← App-Icon groß (Splash Screen)
│   └── apple-touch-icon.png  ← App-Icon iPhone (180×180)
└── README.md           ← Diese Datei
```

---

## 🚀 Veröffentlichen über GitHub Pages

### Schritt 1 – GitHub-Konto
Kostenlos anlegen auf [github.com](https://github.com) falls noch nicht vorhanden.

### Schritt 2 – Repository erstellen
1. Auf GitHub: **New repository** klicken
2. Name z.B. `dinaj-besichtigung`
3. **Public** wählen (GitHub Pages ist bei Free-Konten nur für Public-Repos kostenlos)
4. Repository erstellen

### Schritt 3 – Dateien hochladen
**Option A – per Browser (einfachste Methode):**
1. Im Repository auf **Add file → Upload files** klicken
2. Alle Dateien inkl. `icons/`-Ordner per Drag & Drop hochladen
3. **Commit changes** klicken

**Option B – per Git (Terminal):**
```bash
git clone https://github.com/DEIN-USERNAME/dinaj-besichtigung.git
# Alle Dateien in den Ordner kopieren
cd dinaj-besichtigung
git add .
git commit -m "PWA veröffentlichen"
git push
```

### Schritt 4 – GitHub Pages aktivieren
1. Im Repository auf **Settings** → **Pages** gehen
2. Unter **Source**: Branch `main`, Ordner `/ (root)` auswählen
3. **Save** klicken
4. Nach ca. 1–2 Minuten ist die App erreichbar unter:
   ```
   https://DEIN-USERNAME.github.io/dinaj-besichtigung/
   ```

---

## 📱 App auf dem Handy installieren

### iPhone (Safari)
1. Die URL im **Safari**-Browser öffnen (nicht Chrome!)
2. Unten auf das **Teilen-Symbol** tippen (Quadrat mit Pfeil)
3. **„Zum Home-Bildschirm"** antippen
4. Namen bestätigen → **Hinzufügen**
5. Die App erscheint jetzt als Icon auf dem Home-Bildschirm

> ⚠️ Wichtig: Auf iPhone funktioniert die Installation **nur über Safari**, nicht über Chrome oder andere Browser.

### Android (Chrome)
1. Die URL im **Chrome**-Browser öffnen
2. Oben rechts auf die **drei Punkte** tippen
3. **„App installieren"** oder **„Zum Startbildschirm hinzufügen"** antippen
4. Bestätigen → App erscheint auf dem Startbildschirm

---

## ✏️ App-Icons anpassen (optional)

Die mitgelieferten Icons sind automatisch generiert. Für ein echtes Firmen-Logo:

1. Erstelle PNG-Bilder in diesen Größen:
   - `icon-192.png` → 192 × 192 Pixel
   - `icon-512.png` → 512 × 512 Pixel
   - `apple-touch-icon.png` → 180 × 180 Pixel
2. Hintergrundfarbe: `#1a1a2e` (dunkelblau) passt zum App-Design
3. Randbereich von ~10% freilassen (für „maskable" Icons auf Android)
4. Dateien in den `icons/`-Ordner hochladen und die alten überschreiben

Kostenlose Tools zum Erstellen:
- [RealFaviconGenerator.net](https://realfavicongenerator.net) – lädt alle Größen auf einmal
- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

---

## 🔄 App aktualisieren

Wenn du `index.html` änderst und neu hochlädst, müssen Nutzer den Browser-Cache leeren
oder in der App nach unten ziehen (Pull-to-Refresh), damit die neue Version geladen wird.

Für automatisches Update: In `service-worker.js` die Cache-Versionsnummer erhöhen:
```js
const CACHE_NAME = 'dinaj-besichtigung-v2';  // ← Zahl erhöhen
```

---

## 💾 Datenspeicherung

Alle Besichtigungen werden **lokal im Browser** gespeichert (`localStorage`).
- Die Daten verlassen das Gerät nicht
- Kein Server, keine Cloud, keine Kosten
- Backup über den „⬇️ Backup exportieren"-Button erstellen

---

## 🌐 Offline-Nutzung

Nach der ersten Installation ist die App **vollständig offline nutzbar**:
- Neue Besichtigungen anlegen ✓
- Archiv durchsuchen ✓
- PDF erstellen ✓ (wenn jsPDF zuvor einmal geladen wurde)
- Backup exportieren ✓

Lediglich Google Fonts lädt beim ersten Start aus dem Internet – danach gecacht.
