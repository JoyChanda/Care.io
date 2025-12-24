# 🔧 MongoDB Connection Error Fix

## Error Message
```
querySrv ENOTFOUND _mongodb._tcp.clusterO.mongodb.net
```

## Problem
Your `.env.local` file has a typo in the MongoDB connection string. You're using `clusterO` (letter O) instead of `cluster0` (zero).

## Solution

### Step 1: Check Your `.env.local` File

Open your `.env.local` file and check the `MONGODB_URI` line:

❌ **WRONG:**
```env
MONGODB_URI=mongodb+srv://username:password@clusterO.hsvpkgt.mongodb.net/...
```

✅ **CORRECT:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.hsvpkgt.mongodb.net/...
```

### Step 2: Fix the Typo

Change `clusterO` to `cluster0` (zero, not letter O).

### Step 3: Get the Correct Connection String from MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Update your `.env.local` file

### Step 4: Restart Your Dev Server

After fixing the `.env.local` file:

```bash
# Stop the server (Ctrl + C)
npm run dev
```

## Common Connection String Format

```
mongodb+srv://<username>:<password>@cluster0.<cluster-id>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

**Important points:**
- `cluster0` (zero) - NOT `clusterO` (letter O)
- Replace `<username>` with your MongoDB username
- Replace `<password>` with your MongoDB password (URL encode if it contains special characters)
- Replace `<database-name>` with your database name (e.g., `care_io`)

## Other Common Issues

### Issue 1: Password Contains Special Characters
If your password has special characters like `@`, `#`, `%`, etc., you need to URL encode them:

- `@` becomes `%40`
- `#` becomes `%23`
- `%` becomes `%25`

Or better yet, create a password without special characters.

### Issue 2: Network Access Not Configured
1. Go to MongoDB Atlas → Network Access
2. Click **Add IP Address**
3. For development: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. For production: Add your specific IP addresses

### Issue 3: Database User Not Created
1. Go to MongoDB Atlas → Database Access
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Set username and password
5. Set user privileges (usually **Read and write to any database** for development)

## Verify Connection

After fixing, test your connection:

```bash
# If you have a test script
node test-db.js

# Or just try registering a user in your app
```

## Still Having Issues?

Check:
1. ✅ MongoDB Atlas cluster is running (not paused)
2. ✅ Correct username and password
3. ✅ Network Access allows your IP
4. ✅ Database user exists
5. ✅ Connection string format is correct
6. ✅ `.env.local` file is in the root directory
7. ✅ Dev server was restarted after changing `.env.local`

