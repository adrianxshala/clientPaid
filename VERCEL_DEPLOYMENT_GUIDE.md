# Vercel Deployment Guide for Supabase + Next.js

## Prerequisites

- Vercel account
- Supabase project with API keys
- Git repository with your code

## Step 1: Environment Variables Setup

### 1.1 Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **API**
4. Copy the following values:
   - **Project URL** (e.g., `https://your-project-id.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### 1.2 Set Environment Variables in Vercel

#### Option A: Via Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable Name                   | Value                                 | Environment                      |
| ------------------------------- | ------------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `https://your-project-id.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (your anon key)              | Production, Preview, Development |

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to Vercel
vercel login

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Pull environment variables to local development
vercel env pull .env.local
```

## Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js settings

### 2.2 Configure Build Settings

- **Framework Preset**: Next.js
- **Root Directory**: `client` (if your Next.js app is in a subdirectory)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)

### 2.3 Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Check the deployment logs for any errors

## Step 3: Verify Deployment

### 3.1 Test Your Application

1. Visit your deployed URL
2. Test the login functionality
3. Check that the dashboard loads correctly
4. Verify that environment variables are working

### 3.2 Debug Common Issues

#### Issue: "Missing NEXT_PUBLIC_SUPABASE_URL"

**Solution**: Ensure environment variables are set in Vercel dashboard and redeploy.

#### Issue: "Build failed during prerendering"

**Solution**: The dashboard page is now set to `dynamic = 'force-dynamic'` to prevent build-time authentication issues.

#### Issue: "Supabase connection failed"

**Solution**:

1. Verify your Supabase URL and anon key are correct
2. Check that your Supabase project is active
3. Ensure RLS policies are properly configured

## Step 4: Environment Variable Security

### 4.1 Public vs Private Variables

- `NEXT_PUBLIC_*` variables are exposed to the browser
- Only use `NEXT_PUBLIC_` prefix for variables that are safe to expose
- Never put sensitive keys (like service role keys) in `NEXT_PUBLIC_` variables

### 4.2 Best Practices

- Use different Supabase projects for development and production
- Regularly rotate your API keys
- Monitor your Supabase usage and costs
- Use environment-specific configurations

## Step 5: Monitoring and Maintenance

### 5.1 Vercel Analytics

- Enable Vercel Analytics to monitor performance
- Set up alerts for build failures
- Monitor function execution times

### 5.2 Supabase Monitoring

- Monitor database performance in Supabase dashboard
- Set up alerts for unusual activity
- Review authentication logs regularly

## Troubleshooting

### Common Build Errors

1. **"Module not found" errors**

   - Ensure all dependencies are in `package.json`
   - Run `npm install` locally to verify

2. **"Environment variable not found"**

   - Double-check variable names (case-sensitive)
   - Ensure variables are set for the correct environment
   - Redeploy after adding variables

3. **"Authentication failed"**
   - Verify Supabase credentials
   - Check that your Supabase project is active
   - Ensure RLS policies allow the operations you're trying to perform

### Getting Help

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Quick Checklist

- [ ] Supabase project created and active
- [ ] Environment variables set in Vercel
- [ ] Repository connected to Vercel
- [ ] Build completed successfully
- [ ] Application accessible via Vercel URL
- [ ] Login functionality working
- [ ] Dashboard loads correctly
- [ ] No console errors in browser
