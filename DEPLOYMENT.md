# Deployment Guide for LMS Application

This guide explains how to deploy the LMS application to production. The application consists of a Node.js/Express backend and a React frontend.

## Prerequisites

Before you begin, make sure you have:

- A MongoDB Atlas account (or other MongoDB provider)
- A Cloudinary account (for file uploads)
- A server/hosting environment for the backend (Render, Heroku, Digital Ocean, AWS, etc.)
- A static site hosting service for the frontend (Vercel, Netlify, etc.)
- Domain names (optional but recommended for production)

## 1. Preparing the Backend for Deployment

### 1.1 MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (the free tier is sufficient to start)
3. Set up a database user with password authentication
4. Configure network access (IP whitelist) or set it to allow access from anywhere
5. Get your MongoDB connection string that looks like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/lms-db?retryWrites=true&w=majority
   ```

### 1.2 Cloudinary Setup

1. Create a Cloudinary account at https://cloudinary.com/
2. Note your cloud name, API key, and API secret from your dashboard
3. Create a folder named 'lms' in your Cloudinary media library

### 1.3 Environment Variables

Update your `.env` file in the server directory with production values:

```
# Server Configuration
PORT=5000
NODE_ENV=production

# MongoDB Connection
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/lms-db?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_long_secure_random_string_here
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USERNAME=youremail@gmail.com
EMAIL_PASSWORD=your_email_app_password
EMAIL_FROM=noreply@yourlms.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com
```

## 2. Deploying the Backend to Render

### 2.1 Preparing the Backend

1. Make sure your `package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

2. Create a `render.yaml` file in the root directory of the project:
   ```yaml
   services:
     - type: web
       name: lms-backend
       env: node
       region: your-preferred-region
       buildCommand: cd server && npm install
       startCommand: cd server && npm start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 5000
         - key: MONGO_URI
           sync: false
         - key: JWT_SECRET
           sync: false
         - key: JWT_EXPIRE
           value: 30d
         - key: JWT_COOKIE_EXPIRE
           value: 30
         - key: CLOUDINARY_CLOUD_NAME
           sync: false
         - key: CLOUDINARY_API_KEY
           sync: false
         - key: CLOUDINARY_API_SECRET
           sync: false
         - key: EMAIL_SERVICE
           sync: false
         - key: EMAIL_USERNAME
           sync: false
         - key: EMAIL_PASSWORD
           sync: false
         - key: EMAIL_FROM
           sync: false
         - key: FRONTEND_URL
           sync: false
   ```

### 2.2 Deploying to Render

1. Create a new account on Render (https://render.com/) if you don't have one
2. Connect your GitHub repository to Render
3. Create a new Web Service
4. Select your repository and specify the server directory
5. Configure the service:
   - Name: `lms-backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add all your environment variables from `.env`
6. Click "Create Web Service"

## 3. Preparing the Frontend for Deployment

### 3.1 Environment Variables

Create a `.env` file in the client directory with the following:

```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com
```

### 3.2 Build the Frontend

1. Update the `package.json` with the homepage field (if deploying to a non-root URL):
   ```json
   "homepage": "https://your-frontend-domain.com"
   ```

2. Build the React app:
   ```bash
   cd client
   npm install
   npm run build
   ```

## 4. Deploying the Frontend to Vercel

### 4.1 Vercel Setup

1. Create a Vercel account (https://vercel.com/) if you don't have one
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

### 4.2 Deploying to Vercel

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Follow the prompts and configure:
   - Set the project name
   - Confirm the directory is the client directory
   - Set the environment variables:
     - REACT_APP_API_URL=https://your-backend-url.onrender.com
     - REACT_APP_SOCKET_URL=https://your-backend-url.onrender.com

4. To deploy to production, run:
   ```bash
   vercel --prod
   ```

## 5. Alternative: Deploying the Frontend to Netlify

### 5.1 Netlify Setup

1. Create a Netlify account (https://www.netlify.com/) if you don't have one
2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

### 5.2 Deploy to Netlify

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Create a `netlify.toml` file:
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
     
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy
   ```

4. Deploy to production:
   ```bash
   netlify deploy --prod
   ```

## 6. Connecting a Custom Domain

### 6.1 Render Custom Domain

1. Go to your Render dashboard and select your web service
2. Click on "Settings" and then "Custom Domain"
3. Add your domain and follow the DNS configuration instructions

### 6.2 Vercel/Netlify Custom Domain

1. Go to your project settings in Vercel/Netlify
2. Navigate to the Domains section
3. Add your domain and follow the DNS configuration instructions

## 7. Monitoring and Maintenance

### 7.1 Backend Monitoring

1. Set up Render's monitoring tools
2. Implement application logging with tools like Winston
3. Consider adding Sentry for error tracking

### 7.2 Database Monitoring

1. Set up MongoDB Atlas monitoring
2. Configure database alerts for high usage

### 7.3 Regular Maintenance

1. Regularly update dependencies
2. Monitor API performance
3. Back up your database regularly

## Troubleshooting Common Issues

### CORS Issues
- Ensure your backend has proper CORS configuration
- Verify the `FRONTEND_URL` in your backend environment variables

### Database Connection Issues
- Check if your IP is whitelisted in MongoDB Atlas
- Verify your connection string is correct

### Authentication Issues
- Ensure your JWT_SECRET is set correctly
- Check that your tokens are being properly saved and sent

### File Upload Issues
- Verify your Cloudinary credentials
- Check file size limits in your backend and Cloudinary settings