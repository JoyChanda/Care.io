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
3. **EMAIL_USER/PASS**: Required for sending booking confirmations and welcome emails.
4. **STRIPE_SECRET_KEY**: Enables backend server-to-server communication with Stripe for secure payments.
