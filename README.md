# Learning Management System (LMS)

A full-featured Learning Management System built with the MERN stack (MongoDB, Express, React, Node.js).

![LMS Demo](https://example.com/lms-demo.png)

## Features

### User Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Teacher, Student)
- Password reset functionality
- Email verification

### Course Management
- Course creation and organization
- Section and lesson structuring
- Rich content support (videos, articles, PDFs)
- Progress tracking
- Course ratings and reviews

### Learning Materials
- Video lessons with multiple provider support
- PDF and document uploads
- Rich text articles
- Downloadable resources

### Assessment & Evaluation
- Multiple quiz types (multiple choice, true/false, fill in the blank, etc.)
- Auto-grading
- Quiz attempt management
- Passing scores and completion certificates

### Communication & Collaboration
- Course announcements
- Discussion forums
- Real-time notifications
- Direct messaging (via socket.io)

### Reporting & Analytics
- Student progress tracking
- Course completion rates
- Quiz performance statistics
- User engagement metrics

## Tech Stack

### Backend
- **Node.js & Express** - Fast, unopinionated web framework
- **MongoDB & Mongoose** - NoSQL database for flexible data storage
- **JWT Authentication** - Secure user authentication
- **Socket.io** - Real-time communication
- **Multer & Cloudinary** - File uploads and storage
- **Nodemailer** - Email sending capabilities

### Frontend
- **React** - UI library for building responsive interfaces
- **Redux Toolkit** - State management
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Socket.io Client** - Real-time communication
- **React Player** - Video playback
- **React Markdown** - Markdown rendering
- **React PDF** - PDF viewing

## Project Structure

```
lms-app/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── assets/         # Images, fonts, etc.
│       ├── components/     # Reusable components
│       ├── contexts/       # React contexts
│       ├── features/       # Feature-based organization
│       ├── hooks/          # Custom React hooks
│       ├── layouts/        # Page layouts
│       ├── pages/          # Main page components
│       ├── services/       # API services
│       ├── store/          # Redux store and slices
│       ├── styles/         # Global styles
│       └── utils/          # Utility functions
│
└── server/                 # Backend Express application
    ├── config/             # Configuration files
    ├── controllers/        # Route controllers
    ├── middlewares/        # Custom middlewares
    ├── models/             # Mongoose models
    ├── routes/             # API routes
    ├── uploads/            # Temporary file storage
    └── utils/              # Utility functions
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/SirCodeKnight/Learning-Management-System-LMS-.git
   cd Learning-Management-System-LMS-
   ```

2. Install backend dependencies
   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/lms-db
   # For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/lms-db

   # JWT Authentication
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=30d
   JWT_COOKIE_EXPIRE=30

   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_email_app_password
   EMAIL_FROM=noreply@yourlms.com

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install frontend dependencies
   ```bash
   cd ../client
   npm install
   ```

2. Create a `.env` file in the client directory with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

3. Start the frontend development server
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend Deployment (Render)
1. Create a Render account (https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the build settings:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add all environment variables from your `.env` file
6. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Create an account on Vercel (https://vercel.com) or Netlify (https://netlify.com)
2. Import your GitHub repository
3. Configure the build settings:
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add environment variables
5. Deploy

### MongoDB Atlas Setup
1. Create a MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Set up database access (username and password)
4. Configure network access
5. Get your connection string and update your backend `.env` file

## Customization

### Theming
The frontend uses Tailwind CSS which can be easily customized through the `tailwind.config.js` file. You can change:
- Color schemes
- Font families
- Spacing scales
- Breakpoints
- And more

### Feature Management
You can enable or disable specific features of the LMS by modifying:
- Backend feature flags in `server/config/features.js`
- Frontend feature flags in `client/src/config/features.js`

### Branding
To rebrand the application for your organization:
1. Replace logos and favicon in `client/public/`
2. Update application name in `client/public/index.html`
3. Customize colors in Tailwind configuration
4. Modify email templates in `server/utils/emailSender.js`

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



## Acknowledgements
- All the open-source libraries used in this project
- The community for inspiration and best practices
