# Admin Setup Guide

## ⚠️ IMPORTANT: Setting Password for Existing Users

If you already have users in Supabase (like `muhammadismailkpt@gmail.com` or `primeuaeservices@gmail.com`), you need to **set their passwords**:

### Method 1: Reset Password (Recommended)
1. Go to Supabase Dashboard → **Authentication** → **Users**
2. Click on the user you want to login with
3. Click **"Send password reset email"** or **"Reset password"**
4. Check the user's email inbox for reset link
5. Set a new password via the reset link

### Method 2: Set Password Directly in Supabase
1. Go to **Authentication** → **Users**
2. Click on the user
3. Scroll down to **"Update user"** section
4. Enter a new password in the **"Password"** field
5. Click **"Update user"**
6. Make sure **"Email confirmed"** is checked ✅

### Method 3: Use "Send Magic Link" (Temporary)
1. Click on the user in Supabase
2. Click **"Send magic link"**
3. User will receive email with login link (no password needed)

---

## Creating Your First Admin User

To login to the admin panel, you need to create an admin user in Supabase first.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project: https://supabase.com/dashboard
2. Navigate to **Authentication** → **Users**
3. Click **"Add user"** or **"Create new user"**
4. Enter:
   - **Email**: Your admin email (e.g., `admin@primeuaeservices.com`)
   - **Password**: A strong password (minimum 6 characters)
   - **Auto Confirm User**: ✅ Check this box (important!)
5. Click **"Create user"**

### Option 2: Using Supabase SQL Editor

1. Go to **SQL Editor** in Supabase Dashboard
2. Run this SQL (replace email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    confirmation_token,
    recovery_token
)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@primeuaeservices.com',  -- Change this to your email
    crypt('YourPassword123!', gen_salt('bf')),  -- Change this to your password
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    false,
    '',
    ''
);
```

**Note**: The SQL method is more complex. Use Option 1 (Dashboard) instead.

### Option 3: Sign Up via API (Temporary)

You can temporarily enable email signup in Supabase:

1. Go to **Authentication** → **Providers** → **Email**
2. Enable **"Enable email signup"**
3. Use the signup form (if available) or create via dashboard
4. Disable signup after creating admin user (for security)

## After Creating User

1. Go to `/admin/login`
2. Enter your email and password
3. You should be redirected to `/admin` dashboard

## Troubleshooting

### "Invalid login credentials"
- Make sure the user exists in Supabase
- Check that email is confirmed (Auto Confirm should be enabled)
- Verify email and password are correct

### "Network error" or "Failed to fetch"
- Check `.env.local` file has correct Supabase URL and keys
- Restart the development server: `npm run dev`
- Check browser console for detailed errors

### "Supabase is not configured"
- Make sure `.env.local` file exists in project root
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart the server after adding environment variables

## Environment Variables Required

Make sure your `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

