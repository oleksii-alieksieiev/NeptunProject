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
