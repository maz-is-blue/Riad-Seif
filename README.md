# Riad Seif Foundation Website

A bilingual (Arabic/English) website for the **Riad Seif Foundation for Human Rights**.

## 🏗️ Project Structure

```
riad-seif/
├── backend/          # Django REST API
│   ├── apps/         # Django applications
│   ├── config/       # Django settings
│   ├── scripts/      # Database seeding
│   └── manage.py
│
├── frontend/         # React + Vite + TypeScript
│   ├── src/          # Source code
│   ├── package.json
│   └── vite.config.ts
│
└── README.md         # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Python** 3.10+

### 1. Start the Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # Optional
python manage.py runserver
```

Backend: http://localhost:8000
Admin: http://localhost:8000/admin
API Docs: http://localhost:8000/api/docs

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## 📚 Documentation

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/publications/` | GET | List publications |
| `/api/publications/featured/` | GET | Featured publications |
| `/api/events/` | GET | List events |
| `/api/events/upcoming/` | GET | Upcoming events |
| `/api/contact/` | POST | Submit contact form |
| `/api/settings/` | GET | Site settings |
| `/api/team/` | GET | Team members |
| `/api/news/` | GET | News updates |

## 🌐 Features

- **Bilingual Support** - Full Arabic/English with RTL/LTR layouts
- **Django Admin** - Content management for staff
- **REST API** - Full CRUD for all content
- **Working Contact Form** - Rate-limited with validation
- **Responsive Design** - Mobile-first with Tailwind CSS

## 📦 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 18 | Django 5.0 |
| TypeScript | Django REST Framework |
| Vite | PostgreSQL/SQLite |
| Tailwind CSS | drf-spectacular |
| Wouter | django-cors-headers |
| Motion | Pillow |

## 📝 License

Copyright © 2025 Riad Seif Foundation for Human Rights

