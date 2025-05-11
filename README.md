# Learning Management System (LMS)

A full-featured Learning Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Teacher, Student)
  - Password reset functionality
  - Email verification

- **Course Management**
  - Course creation and organization
  - Section and lesson structuring
  - Rich content support (videos, articles, PDFs)
  - Progress tracking
  - Course ratings and reviews

- **Learning Materials**
  - Video lessons with multiple provider support
  - PDF and document uploads
  - Rich text articles
  - Downloadable resources

- **Assessment & Evaluation**
  - Multiple quiz types (multiple choice, true/false, fill in the blank, etc.)
  - Auto-grading
  - Quiz attempt management
  - Passing scores and completion certificates

- **Communication & Collaboration**
  - Course announcements
  - Discussion forums
  - Real-time notifications
  - Direct messaging (via socket.io)

- **Reporting & Analytics**
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

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
  https://github.com/SirCodeKnight/Learning-Management-System-LMS-.git
   cd lms-app
   ```

2. Install server dependencies
   ```bash
   cd server
   npm install
   ```

3. Install client dependencies
   ```bash
   cd ../client
   npm install
   ```

4. Set up environment variables
   - Copy the `.env.example` file to `.env` in the server directory
   - Fill in the required environment variables

5. Start the development servers

   Server:
   ```bash
   cd server
   npm run dev
   ```

   Client:
   ```bash
   cd client
   npm start
   ```

## Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Select the server directory as the root directory
4. Set the build command: `npm install`
5. Set the start command: `npm start`
6. Add the environment variables from your `.env` file
7. Click "Create Web Service"

### Frontend Deployment (Vercel)

1. Create a new project on Vercel
2. Connect your GitHub repository
3. Set the root directory to the client folder
4. Configure the build settings:
   - Build command: `npm run build`
   - Output directory: `build`
5. Add environment variables
6. Deploy

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account if you don't have one
2. Create a new cluster
3. Set up database access (username and password)
4. Set up network access (IP whitelist)
5. Get your connection string and update your backend `.env` file

## Customization

### Theming

The frontend uses Tailwind CSS which can be easily customized through the `tailwind.config.js` file. You can change:

- Color schemes
- Font families
- Spacing scales
- Breakpoints
- And more

### Feature Toggles

The application includes a feature toggle system that allows you to enable or disable certain features:

- In the backend, check `config/features.js`
- In the frontend, check `src/config/features.js`

### White Labeling

To rebrand the application:

1. Replace logos and favicon in `client/public/`
2. Update application name and metadata in `client/public/index.html`
3. Modify color schemes in Tailwind configuration
4. Update email templates in `server/utils/emailSender.js`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please create an issue in the GitHub repository or contact the maintainers directly.

## Acknowledgements

- All the open-source libraries and tools used in this project
- The community for inspiration and best practices
