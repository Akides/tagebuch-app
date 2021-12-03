# FWE-WS21-22-764770 Tagebuch App

## **Installation**
---
**Setup backend**
- im Ordner "backend" .env Datei erstellen
- Inhalt aus der .env.example nach .env kopieren
- `npm install` ausführen

**Setup frontend**
- Im Ordner "frontend" `npm install` ausführen

**App starten**
- Die gesamte App wird mit Docker Compose gestartet
- im Root Ordner `docker-compose up` starten
- Einmalig `docker-compose exec backend npm run typeorm schema:sync`
ausführen, um das Datenbankschema zu synchronisieren
- Das Backend läuft auf http://localhost:3000
- Der Client läuft auf http://localhost:3002
- PhpMyAdmin läuft auf http://localhost:8080. Login Daten:
    - Server: db
    - Benutzer: root
    - Passwort: 123456789


## **Backend Informationen**
---
### **Testen der Anfragen**
Ich habe eine Postman Collection erstellt, damit können die Requests getestet werden: [Zur Collection](packages/backend/postman/diary-app.postman_collection.json)


### **Struktur der Routen**
- /api
- Anfragen, die Entry betreffen: /api/entry
- Anfragen, die Label betreffen: /api/label
- Anfragen, die die Wetterdaten API betreffen: /api/weather
- In der Entry Route sieht es je nach Anfrage eventuell verschachtelter aus. Dazu bitte einen Blick in `entry.router.ts` werfen

### **Funktionalitäten**
- Es sollten alle gestellten Anforderungen in der Hausaufgabenbeschreibung erfüllt sein.
    - Es muss möglich sein ein oder mehrere Label zu einem Tagebucheintrag hinzuzufügen und löschen zu können:
        - `/api/entry/addLabel/:labelId/:entryId`
        - `/api/entry/removeLabel/:labelId/:entryId`
    - Es soll eine Route geben die alle Tagebucheinträge eines bestimmten Label
zurückgeben kann: 
        - `/api/entry/byLabel/:labelId`
    - Es muss möglich sein Tagebucheinträge als CSV Datei zu exportieren:
        - `/api/entry/csv`
    - Anlegen, Beartbeiten, Auflisten, Löschen von Tagebucheinträgen und Labels:
        - Bitte einen Blick in entry.router.ts/ entry.controller.ts und label.router.ts/ label.controller.ts werfen.
    - Beziehungen zwischen Entry und Label wurden mit ManyToMany umgesetzt.
- Zusatzfunktion:
    - Es kann die Temperatur in Celsius für Frankfurt für ein bestimmtes Datum geholt werden.
    - Dazu eine Anfrage an `/api/weather/:date` schicken
    - Die verwendete Wetterdaten API: https://www.metaweather.com/api/

## **Frontend Informationen**
---
### **Funktionalitäten**
- Es sollten alle gestellten Anforderungen in der Hausaufgabenbeschreibung erfüllt sein:
- CRUD Einträge
    - Einträge anzeigen:
        - Die Listenansicht ist die Standardansicht
        - Die Detailansicht ist zu erreichen, wenn man die Preview des Eintrags maximiert.
    - Einträge erstellen: Den "New" Button anklicken und rechts den Eintrag erstellen. Falls der Titel leer ist oder ein ungültiges Datumsformat angegeben wird, wird der Eintrag nicht erstellt.
    - Einträge ändern: Auf dem "Stift" in der jeweiligen Ansicht klicken. Falls der Titel leer ist oder ein ungültiges Datumsformat angegeben wird, wird der Eintrag nicht geändert.
    - Einträge löschen: Auf dem "Stift" in der jeweilgen Ansicht klicken und rechts unten den Löschknopf anklicken.
    - Die Änderungen werden in der Datenbank gespeichert
- Download der Tagebucheinträge:
    - links unten in der Listenansicht auf "DOWNLOAD" klicken.
- Suchen
    - In der Listenansicht über dem Suchfeld das Dropdown Menu benutzen um einzustellen, nach was gesucht werden soll.
    - In das Suchfeld in der Sidebar Suchinhalt angeben und mit Enter bestätigen. Mit "SHOW ALL" wird der Filter aufgehoben.
    - Datum nach dem Format `YYYY-MM-DD` suchen.
- Einträge für ein bestimmtes Label anzeigen
    - In der Sidebar auf ein Label klicken.
- Label erstellen
    - Beim Bearbeiten eines Eintrags unten Labelnamen angeben und speichern. Nach dem die Änderung des Eintrags gespeichert wurde wird die Änderung in die Datenbank übernommen.
- Label entfernen
    - von einem Eintrag entfernen: In die Detailansicht gehen. Auf den "Stift" klicken und unten die Label wegklicken
    - komplett löschen: Das zu löschende Label darf zu keinem Eintrag hinzugefügt sein. In der Sidebar das Label wegklicken.
- Sonstiges:
    - Der Wochentag eines Eintrags wird automatisch eingetragen.
    - Die Tagestemperatur in Frankfurt wird in der Detailansicht angezeigt.
    - Markdown wird unterstützt.

### **Routen**
- `/` und `/cardview` leiten auf die Listenansicht.
- `/entryview/:id` leitet auf den Tagebucheintrag in der Detailansicht mit der angegebenen ID weiter.
- Routen sind in `App.tsx` definiert.

