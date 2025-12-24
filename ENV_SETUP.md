# Care.IO Environment Configuration

Please create a file named `.env.local` in the root of your project and paste the following configuration. Replace the placeholders with your actual secrets.

```env
# Database Connection
# Replace <db_password> with your MongoDB Atlas password
MONGODB_URI=mongodb+srv://pawadmin:<db_password>@cluster0.hsvpkgt.mongodb.net/care_io?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Configuration
# Generated via: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=supersecret_replace_this_with_a_long_random_string

# Google OAuth (Required for Google Sign-In)
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Email Service (Nodemailer)
# Use a Gmail App Password if using Google
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_your_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

### Why these are needed:
1. **MONGODB_URI**: Connects your application to the Atlas database for users and bookings.
2. **NEXTAUTH_SECRET**: Used to encrypt session cookies and JWTs.
3. **GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**: Required for Google OAuth sign-in functionality.
4. **EMAIL_USER/PASS**: Required for sending booking confirmations and welcome emails.
5. **STRIPE_SECRET_KEY**: Enables backend server-to-server communication with Stripe for secure payments.

---

## 🔐 Google OAuth Setup Guide

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Choose **Web application** as the application type
6. Add **Authorized redirect URIs**:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://care-io-eta.vercel.app/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret** to your `.env.local`

### Step 2: Configure OAuth Consent Screen

1. Go to **APIs & Services** → **OAuth consent screen**
2. Choose **External** (unless you have a Google Workspace)
3. Fill in the required information:
   - App name: `Care.IO`
   - User support email: Your email
   - Developer contact: Your email
4. **IMPORTANT**: Add test users (if app is in Testing mode):
   - Click **Add Users** in the Test users section
   - Add the email addresses that should be able to sign in
5. **OR** Publish your app (recommended for production):
   - Click **Publish App** to make it available to all users

### Step 3: Fix "Access Denied" Error

If you see **"Access Denied - You do not have permission to sign in"**, check:

✅ **Redirect URI matches exactly** (no trailing slash, correct protocol)
- Development: `http://localhost:3000/api/auth/callback/google`
- Production: `https://care-io-eta.vercel.app/api/auth/callback/google`

✅ **OAuth app is Published** OR your email is added to **Test users**

✅ **Environment variables are correct** in `.env.local`:
- No extra spaces
- No quotes around values
- Correct Client ID and Secret

✅ **Restart dev server** after changing `.env.local`:
```bash
# Stop server (Ctrl + C)
npm run dev
```

✅ **Browser cookies enabled** and cache cleared

### Step 4: Verify Setup

1. Check that `.env.local` has all required variables
2. Restart your development server
3. Try signing in with Google
4. Check browser console and server logs for any errors

---

## 🚨 Security Note

**NEVER commit `.env.local` to Git!** It's already in `.gitignore`, but always double-check before pushing code.
