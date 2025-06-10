# XIM Store - Digital Product Marketplace

A full-stack e-commerce platform for selling digital products, built with React, Node.js, and MySQL.

## Features

### User Management
- User registration and login system
- Role-based access control (Admin and User roles)
- Secure password hashing
- User profile management

### Admin Dashboard
- User management interface
- Product management system
- Real-time user role updates
- Secure admin-only routes

### Product Management
- CRUD operations for products
- Image upload functionality
- Text file upload support
- Product categorization
- Price management
- Product description and details

### Shopping Features
- Shopping cart functionality
- Product browsing by categories
- Detailed product views
- Secure checkout process

### File Management
- Support for image uploads
- Support for text file uploads
- Secure file storage
- Organized file structure

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- MySQL database with Sequelize ORM
- Multer for file uploads
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
├── Front/
│   └── xim-store/          # React frontend application
│       ├── src/
│       │   ├── Components/ # React components
│       │   └── App.tsx     # Main application component
│
└── Backend/
    ├── config/            # Database configuration
    ├── controllers/       # Route controllers
    ├── Models/           # Database models
    ├── routes/           # API routes
    └── uploads/          # File upload directory
        ├── images/       # Image uploads
        └── files/        # Text file uploads
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend
   cd Backend
   npm install

   # Frontend
   cd Front/xim-store
   npm install
   ```

3. Configure the database:
   - Create a MySQL database
   - Update database configuration in `Backend/config/db.js`

4. Start the servers:
   ```bash
   # Backend (from Backend directory)
   npm start

   # Frontend (from Front/xim-store directory)
   npm start
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## Security Features

- Password hashing using bcrypt
- Role-based access control
- Secure file upload handling
- Protected API routes
- Input validation and sanitization

## API Endpoints

### User Routes
- POST `/api/users/register` - Register new user
- POST `/api/users/login` - User login
- GET `/api/users` - Get all users (admin only)
- PUT `/api/users/:userId/role` - Update user role (admin only)

### Product Routes
- GET `/api/products` - Get all products
- POST `/api/products` - Create new product (admin only)
- PUT `/api/products/:id` - Update product (admin only)
- DELETE `/api/products/:id` - Delete product (admin only)

### Upload Routes
- POST `/api/upload` - Upload files (images and text files)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.