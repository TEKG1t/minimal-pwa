# Anni — Dein Ring

## Kurzbeschreibung

**Anni — Dein Ring** ist ein mobiles, pixel-art-inspiriertes Diskussion-Spiel. Die Spielerin tritt in kurzen, rundenbasierten Debatten gegen schräge Rivalinnen und Rivalen an. Jede Runde wird mit einem Argument gespielt. Argumente verursachen Schaden, heilen Energie oder kombinieren beide Effekte. Gesammelte Verbündete unterstützen Anni mit passiven Fähigkeiten.

Die Anwendung ist als installierbare PWA umgesetzt und auf schmale Smartphone-Bildschirme optimiert.

## Spielziel

Eine Diskussion wird gewonnen, wenn die Energie der gegnerischen Figur auf null sinkt, bevor Annis eigene Energie auf null fällt.

Für einen Sieg erhält Anni:

- 12 Weisheit
- einen erhöhten Siegzähler
- eine verlängerte Siegesserie

Bei einer Niederlage wird die Siegesserie auf null zurückgesetzt.

## Spielablauf

1. Auf dem **Ring** wird eine neue Diskussion gestartet.
2. Eine zufällige Rivalin oder ein zufälliger Rivale erscheint.
3. Anni wählt pro Runde eines der drei ausgerüsteten Argumente.
4. Das Argument wird angewendet.
5. Die gegnerische Figur verursacht Gegenwind.
6. Verbündeten-Fähigkeiten werden abhängig von ihrem Typ angewendet.
7. Der Kampf endet mit Sieg oder Niederlage.
8. Zwischen Kämpfen können Argumente gesammelt, ausgerüstet und Verbündete ausgewählt werden.

## Navigation und Screens

### Ring

Die Startseite ist der Einstiegspunkt des Spiels.

Sie enthält:

- den aktuellen Weisheitsstand
- Siege und Siegesserie
- den Button **Diskussion starten**
- einen kurzen Spieltipp
- eine pixel-artige Anni-Illustration

### Arsenal

Das Arsenal ist die Sammlung für Argumente und Verbündete.

#### Argumente ziehen

- Kosten: **10 Weisheit**
- Schaltet ein zufälliges Argument frei
- Bereits bekannte Argumente können erneut gezogen werden

#### Verbündete ziehen

- Kosten: **25 Weisheit**
- Schaltet eine zufällige gegnerische Figur als Verbündeten frei
- Bereits bekannte Verbündete können erneut gezogen werden

Das Arsenal zeigt für jedes Argument und jeden Verbündeten, ob es bereits freigeschaltet wurde.

Ausgerüstete Argumente werden visuell hervorgehoben. Ein Loadout kann maximal drei Argumente enthalten.

### Profil

Das Profil zeigt:

- Annis Statistik
- Siege
- beste beziehungsweise aktuelle Siegesserie
- verfügbare Weisheit
- das aktive Argument-Loadout
- alle gesammelten Verbündeten
- die Auswahl des aktiven Verbündeten

Der aktive Verbündete kann jederzeit gewechselt oder deaktiviert werden.

## Argumente

Argumente werden durch Name, gesprochenen Satz, Kategorie, Stärke und eine kurze Beschreibung definiert.

| Argument | Kategorie | Satz | Effekt |
|---|---|---|---|
| Screech | Angriff | `SCREEEEEECH` | Verursacht hohen Schaden |
| Süßi | Heilung | `Du bist süßi` | Heilt Annis Energie |
| Rrruu | Chaos | `rrrruuu rrrrruuuu` | Teilt die Wirkung zufällig zwischen Schaden und Heilung auf |
| Machste nix | Angriff | `Da machste nichts` | Verlässlicher, mittlerer Schaden |
| Schmetterlinge | Heilung | `Königin der Schmetterlinge` | Starke Heilung |
| Labil | Angriff | `Du bist. Labil.` | Verursacht starken Schaden |

### Argument-Kategorien

- **Angriff**: reduziert die Energie des Gegners
- **Heilung**: stellt Annis Energie wieder her
- **Chaos**: kombiniert mehrere Effekte mit zufälliger Verteilung

Die Wirkung wird während des Kampfes leicht variiert, damit sich wiederholte Diskussionen nicht vollständig identisch spielen.

## Verbündete

Verbündete sind ehemalige oder bekannte Rivalen, die nach dem Freischalten Anni unterstützen.

| Verbündeter | Titel | Passive Fähigkeit |
|---|---|---|
| Felix | Der Nerd | Verstärkt Annis Heilung um 25 % |
| Vada | Die Schlagfertige | Verstärkt Annis Schaden um 25 % |
| Screech Lady | Die Frequenz | Verursacht zu Beginn jeder Runde zusätzlichen Schaden |
| Junior Rakete | Der Antrieb | Heilt Anni zu Beginn jeder Runde |
| Bahnhof Hänger | Die Ruhe selbst | Keine passive Fähigkeit |
| Pigeon | König der Gleise | Verstärkt Schaden und Heilung leicht |

Die Fähigkeit wird im Profil unter dem Namen des Verbündeten angezeigt. Während einer Diskussion werden aktive Effekte im Kampflog berücksichtigt.

## Rivalen im Kampf

Zu Beginn jeder Diskussion wird aktuell eine zufällige Rivalin oder ein zufälliger Rivale ausgewählt. Die Figuren besitzen unterschiedliche Energiehöchstwerte und visuelle Identitäten.

Verfügbare Rivalen:

- Felix
- Vada
- Screech Lady
- Junior Rakete
- Bahnhof Hänger
- Pigeon

Die Gegnerdarstellung enthält:

- Namen
- Avatar
- aktuelle Energie
- maximale Energie
- Kampfspruch

## Kampfsystem

### Energie

- Anni startet mit 100 Energie.
- Jede Rivalin besitzt einen eigenen Energiehöchstwert.
- Energie wird durch Angriffe reduziert.
- Heilungsargumente erhöhen Annis Energie, jedoch nie über das Maximum.
- Schaden und Heilung werden auf gültige Werte begrenzt.

### Runden

Jede gespielte Aktion:

1. berechnet die Wirkung des ausgewählten Arguments
2. wendet den aktiven Verbündeten-Bonus an
3. berechnet zusätzlichen Gegenwind
4. aktualisiert beide Energiewerte
5. schreibt das Ergebnis in den Kampflog
6. erhöht die Rundenzahl

Eine Runde endet, sobald eine Seite null Energie erreicht.

### Kampflog

Der Kampflog zeigt:

- das gesprochene Argument
- verursachten Schaden
- erhaltene Heilung
- Gegenwind
- zusätzliche Verbündeten-Effekte

Der aktuellste Eintrag wird visuell hervorgehoben.

## Weisheit und Freischaltungen

Weisheit ist die zentrale Ressource für Ziehungen im Arsenal.

| Aktion | Kosten |
|---|---:|
| Argument ziehen | 10 Weisheit |
| Verbündeten ziehen | 25 Weisheit |
| Sieg | +12 Weisheit |

Weisheit kann nicht unter null sinken. Ein Pull-Button wird deaktiviert, wenn nicht genug Weisheit vorhanden ist.

## Speichersystem

Der Spielstand wird lokal im Browser unter dem Schlüssel `anni-save-v2` gespeichert.

Gespeicherte Werte:

- `wisdom`: aktuelle Weisheit
- `streak`: aktuelle Siegesserie
- `wins`: gewonnene Diskussionen
- `unlocked`: IDs der freigeschalteten Argumente
- `loadout`: aktuell ausgerüstete Argumente
- `ownedRivals`: IDs der freigeschalteten Verbündeten
- `selectedRival`: aktuell ausgewählter Verbündeter

Beim Start wird der Spielstand aus `localStorage` geladen. Beschädigte oder nicht lesbare Daten führen auf den initialen Spielstand zurück.

## Visuelles Design

Das Spiel verwendet eine reduzierte Retro-Arcade-Ästhetik:

- `Press Start 2P` für Überschriften und UI-Labels
- `VT323` für Fließtext und Kampflog
- harte Pixel-Schatten statt weicher Schatten
- dicke schwarze Rahmen
- Lime, Coral und Teal als Akzentfarben
- gepunkteter Papierhintergrund
- pixelartige Avatare und Illustrationen
- feste obere und untere Navigation

Die obere Leiste zeigt:

- Anni-Branding
- aktuelle Weisheit
- Spielstatus

Die untere Navigationsleiste ist auf Mobilgeräten am Viewport fixiert und bietet direkten Zugriff auf:

- Ring
- Arsenal
- Profil

Safe-Area-Abstände für Geräte mit Notch oder Home-Indikator werden berücksichtigt.

## Responsive Verhalten

Die Anwendung ist mobile-first aufgebaut:

- optimiert für Breiten ab 320 Pixel
- feste Topbar
- feste Bottom-Navigation
- reservierter Inhaltsabstand, damit Inhalte nicht unter den Leisten verschwinden
- keine horizontale Überbreite
- große Touch-Ziele für Buttons
- kompakte Grid-Darstellung für Argumente und Verbündete

Auf größeren Bildschirmen bleibt die Anwendung als zentrierte, schmale Spieloberfläche dargestellt.

## Technische Architektur

Die aktuelle Anwendung liegt im React/Vite-Einstiegspunkt:

- `src/App.tsx`: Spielzustand, Datenmodell, Kampflogik und Screens
- `src/App.css`: Spieloberfläche und responsive Pixel-Art-Styles
- `src/index.css`: globale Typografie und Basisstyles
- `src/main.tsx`: React-Einstiegspunkt und PWA-Service-Worker-Registrierung
- `index.html`: Dokument-Metadaten und PWA-Einstieg

Die Spielzustände werden mit React-State verwaltet. Die Datenstrukturen für Argumente und Verbündete sind zentral in `App.tsx` definiert.

## PWA-Verhalten

Die Anwendung wird mit Vite und `vite-plugin-pwa` gebaut.

Beim Build werden unter anderem erzeugt:

- `manifest.webmanifest`
- Service Worker
- Workbox Runtime
- precachte Produktionsassets

Dadurch kann die Anwendung nach der ersten Auslieferung als installierbare Web-App verwendet werden.

## NFC-Freischaltung

Die PWA besitzt eine spezielle Client-Route:

```text
/nfc/unlock-all
```

Wird diese URL geöffnet, beispielsweise über einen NFC-Tag, dann werden alle Argumente und alle Verbündeten lokal freigeschaltet. Die ersten drei Argumente werden automatisch als Loadout ausgerüstet. Der Spielstand bleibt im bestehenden `localStorage` erhalten.

Nach dem Öffnen:

- wechselt die Anwendung zum Arsenal
- erscheint der Hinweis **„Smart NFC unlock! Alles freigeschaltet.“**
- kann der NFC-Tag mehrfach verwendet werden, ohne Duplikate zu erzeugen

Die Route ist eine Frontend-Route der statischen PWA. Der Webserver muss unbekannte Pfade auf `index.html` zurückführen, damit die React-Anwendung auch beim direkten Öffnen der NFC-URL geladen wird.

## Entwicklungsbefehle

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Bekannte Designentscheidungen

- Das Spiel bleibt bewusst als kompakte One-Page-PWA umgesetzt.
- Die Spielmechanik ist leicht verständlich und schnell spielbar.
- Zufällige Varianz verhindert vollständig deterministische Kämpfe.
- Verbündete sind keine eigene Kampfeinheit, sondern passive Unterstützer.
- Der Spielstand ist lokal und benötigt kein Backend.