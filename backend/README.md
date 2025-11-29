# Backend Server Documentation

## Overview
Full-featured Node.js/Express backend for the Nyambura Mwangi & Co Advocates website.

## Features
- ✅ RESTful API endpoints
- ✅ SQLite database storage
- ✅ Email notifications via Nodemailer
- ✅ Form validation
- ✅ CORS enabled
- ✅ Error handling

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file in the `backend/` directory:

```
PORT=5000
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=janemwangi94@gmail.com
```

**Gmail App Password Setup:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate password for "Mail"
5. Use that password in `.env`

### 3. Start Server
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### POST /api/contact
Submit a contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "service": "civil",
  "message": "I need legal assistance..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "id": 1
}
```

### GET /api/contacts
Get all contact submissions (admin).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "service": "civil",
      "message": "...",
      "status": "pending",
      "created_at": "2025-11-29 10:00:00"
    }
  ]
}
```

### GET /api/contacts/:id
Get a single contact submission.

### PATCH /api/contacts/:id
Update contact status.

**Request Body:**
```json
{
  "status": "contacted"  // pending | contacted | resolved
}
```

## Database Schema

**Table: contacts**
- `id` - INTEGER PRIMARY KEY
- `name` - TEXT NOT NULL
- `email` - TEXT NOT NULL
- `service` - TEXT
- `message` - TEXT NOT NULL
- `status` - TEXT DEFAULT 'pending'
- `created_at` - DATETIME DEFAULT CURRENT_TIMESTAMP

## Frontend Integration

Update `.env.local` in the frontend:
```
VITE_USE_BACKEND=true
VITE_API_URL=http://localhost:5000/api
```

## Production Deployment

1. Set environment variables on your server
2. Use a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name lawyer-backend
   pm2 save
   pm2 startup
   ```
3. Set up nginx as reverse proxy
4. Use HTTPS in production

## Troubleshooting

**Database not creating?**
- Check file permissions in backend directory
- Database file `contacts.db` should auto-create

**Emails not sending?**
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASS in `.env`
- Ensure 2-Step Verification is enabled

**CORS errors?**
- Backend allows all origins by default
- Update CORS config in `server.js` for production
