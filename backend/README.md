# Riad Seif Foundation - Django Backend

This is the Django REST API backend for the Riad Seif Foundation website.

## 🚀 Quick Start

### Prerequisites

- Python 3.10+
- pip (Python package manager)

### Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

5. **Create superuser (for admin access):**
   ```bash
   python manage.py createsuperuser
   ```

6. **Seed sample data (optional):**
   ```bash
   python manage.py shell < scripts/seed_data.py
   ```

7. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

The API will be available at `http://localhost:8000`

## 📚 API Endpoints

### Publications
- `GET /api/publications/` - List all publications
- `GET /api/publications/{id}/` - Get single publication
- `GET /api/publications/featured/` - Get featured publications
- `GET /api/publications/by_category/` - Get publications by category

### Events
- `GET /api/events/` - List all events
- `GET /api/events/{id}/` - Get single event
- `GET /api/events/upcoming/` - Get upcoming events
- `GET /api/events/past/` - Get past events
- `GET /api/events/featured/` - Get featured events

### Contact
- `POST /api/contact/` - Submit contact form

### Content
- `GET /api/settings/` - Get site settings
- `GET /api/pages/` - Get all page content
- `GET /api/pages/{page}/` - Get specific page content
- `GET /api/team/` - Get team members
- `GET /api/news/` - Get news updates

### Documentation
- `GET /api/docs/` - Swagger API documentation
- `GET /api/schema/` - OpenAPI schema

## 🔐 Admin Panel

Access the Django admin at `http://localhost:8000/admin`

Features:
- Manage publications (add, edit, delete)
- View and manage contact submissions
- Create and edit forum events
- Update site settings
- Manage team members and news

## 🗂️ Project Structure

```
backend/
├── config/               # Django settings
│   ├── settings.py       # Main settings
│   ├── urls.py           # URL routing
│   └── wsgi.py           # WSGI config
├── apps/
│   ├── publications/     # Publications app
│   ├── contact/          # Contact form app
│   ├── forum/            # Events app
│   └── content/          # Site content app
├── scripts/
│   └── seed_data.py      # Database seeding
├── media/                # Uploaded files
├── manage.py
└── requirements.txt
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL - optional)
DB_NAME=riadseif
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
```

### CORS

CORS is configured to allow requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`

Update `CORS_ALLOWED_ORIGINS` in `settings.py` for production.

## 📦 Production Deployment

1. Set `DEBUG=False`
2. Configure a proper `SECRET_KEY`
3. Use PostgreSQL instead of SQLite
4. Configure proper email settings
5. Set up static file serving (whitenoise or nginx)
6. Use gunicorn or uwsgi as WSGI server

```bash
# Production requirements
pip install gunicorn whitenoise

# Run with gunicorn
gunicorn config.wsgi:application
```

## 🧪 Testing

```bash
# Run tests
python manage.py test

# With coverage
pip install coverage
coverage run manage.py test
coverage report
```

