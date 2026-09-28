# NeptunProject

Eine einfache Full-Stack-Kundenverwaltung mit React, Node.js, Express und MySQL.

Das Projekt wurde erstellt, um die grundlegende Kommunikation zwischen Frontend, Backend und Datenbank zu üben.

## Funktionen

- Kunden anzeigen
- Neue Kunden hinzufügen
- Kundendaten bearbeiten
- Kunden löschen
- Bestätigung vor dem Löschen
- Speicherung der Kundendaten in einer MySQL-Datenbank

## Technologien

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- REST API

### Datenbank

- MySQL

## API-Endpunkte

- `GET /api/customers` – Kunden abrufen
- `POST /api/customers` – Kunden hinzufügen
- `PUT /api/customers/:id` – Kunden bearbeiten
- `DELETE /api/customers/:id` – Kunden löschen

## Projektstruktur

```text
NeptunProject/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md

Installation Backend
cd backend
npm install

Eine .env-Datei mit den MySQL-Zugangsdaten muss lokal erstellt werden.

Eine .env-Datei mit den MySQL-Zugangsdaten muss lokal erstellt werden.

Beispiel:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database

Backend starten:
node server.js

Frontend

cd frontend
npm install
npm run dev
Das Frontend kommuniziert über die REST API mit dem Node.js-Backend.
```
