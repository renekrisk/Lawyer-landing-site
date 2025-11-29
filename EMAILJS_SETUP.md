# EmailJS Setup Instructions

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up with your email (free account is fine)
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or any email provider
4. Connect your email account (janemwangi94@gmail.com)
5. Copy the **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Service Needed: {{service_type}}

Message:
{{message}}
```

4. Copy the **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (looks like: `AbCdEfGhIjKlMnOp`)

### Step 5: Configure Your Website
1. Create a file named `.env.local` in your project root
2. Add these lines (replace with your actual values):

```
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

3. Save the file

### Step 6: Test It!
1. Run `npm run dev`
2. Go to the Contact section
3. Fill out the form and submit
4. Check janemwangi94@gmail.com for the email!

## Troubleshooting

**Form not sending?**
- Check that `.env.local` exists and has the correct values
- Restart your dev server after creating `.env.local`
- Check browser console for errors

**Not receiving emails?**
- Verify your email service is connected in EmailJS dashboard
- Check spam folder
- Ensure template is saved and published

## Security Note
The `.env.local` file is gitignored, so your keys won't be pushed to GitHub. This is safe for development and production.
