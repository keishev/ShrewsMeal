# SHREWSMEAL

## 🍽️ Online Meal Booking System for Student Hostels

### Project Overview
ShrewsMeal is a web-based meal booking system designed to streamline meal preference collection in student hostels. Previously, cooks had to manually collect meal preferences from tenants, which was time-consuming and inefficient. This digital solution automates the process, enhancing workflow efficiency and improving the overall dining experience.

### 🎯 Objective
To digitize and optimize the meal booking process in student accommodations by providing an intuitive platform where:
- **Tenants** can easily book their meals in advance
- **Cooks** can efficiently manage and track meal requirements
- **Administrators** can oversee the entire system with comprehensive dashboards

### 📋 Features

#### For Tenants:
- **User Registration & Authentication**: Secure account creation with role-based access
- **Meal Booking Interface**: Interactive booking system for breakfast, lunch, and dinner
- **Booking Management**: Modify or cancel existing bookings
- **Profile Management**: Update personal information and dietary preferences
- **Booking History**: View past and upcoming meal bookings

#### For Cooks/Staff:
- **Dashboard Overview**: Real-time summary of daily meal requirements
- **Booking Analytics**: Visual progress bars and meal statistics
- **Date-based Filtering**: View bookings for specific dates
- **Sorting Options**: Organize booking data by various criteria
- **Tenant Management**: Access to tenant information and dietary restrictions

#### System Features:
- **Role-based Access Control**: Different interfaces for tenants and cooks
- **Responsive Design**: Mobile-friendly interface for all devices
- **Real-time Updates**: Dynamic booking status updates
- **Data Security**: Encrypted passwords and secure authentication
- **Database Integration**: Persistent data storage with MySQL

### 🛠️ Tech Stack

#### Frontend:
- **React.js** (v19.0.0) - Modern UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Day.js & Moment.js** - Date/time manipulation
- **SweetAlert2** - Enhanced user notifications
- **React Slick & Swiper** - Interactive carousels
- **Lucide React & React Icons** - Icon libraries
- **CSS3** - Custom styling and responsive design

#### Backend:
- **Node.js** - Server runtime environment
- **Express.js** - Web application framework
- **MySQL2** - Database driver
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **bcrypt** - Password hashing and security
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling middleware
- **dotenv** - Environment variable management

#### Database:
- **MySQL** - Relational database management system
- **Database Tables**:
  - `UserAccount` - User information and credentials
  - `BOOKING` - Meal booking records
  - `dietary_list` - Available dietary restrictions
  - `user_dietary` - User-specific dietary preferences

#### Development Tools:
- **Concurrently** - Run multiple npm scripts simultaneously
- **React Scripts** - Build and development tools
- **Testing Libraries** - Jest, React Testing Library

### 🏗️ System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend       │    │    Database     │
│   (React SPA)   │◄──►│  (Express API)   │◄──►│    (MySQL)      │
│                 │    │                  │    │                 │
│ • Booking UI    │    │ • Authentication │    │ • User Data     │
│ • Dashboard     │    │ • Booking Logic  │    │ • Booking Data  │
│ • User Profile  │    │ • User Management│    │ • Preferences   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 📁 Project Structure

```
ShrewsMeal/
├── README.md
└── shrewsapp/
    ├── package.json
    ├── backend/
    │   ├── server.js              # Server entry point
    │   ├── app.js                 # Express app configuration
    │   ├── controllers/           # Business logic controllers
    │   ├── db/                    # Database configuration
    │   ├── entity/                # Data models
    │   ├── middleware/            # Authentication middleware
    │   └── routes/                # API route definitions
    ├── src/
    │   ├── components/            # Reusable UI components
    │   ├── pages/                 # Main application pages
    │   ├── api/                   # Frontend API calls
    │   └── style/                 # CSS styling
    └── public/                    # Static assets
```

### 🚀 Getting Started

#### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ShrewsMeal.git
   cd ShrewsMeal/shrewsapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Create a MySQL database using the script in `backend/db/createDB.sql`
   - Configure database connection in your `.env` file

4. **Environment Configuration**
   Create a `.env` file in the project root with:
   ```
   SERVER_PORT=5000
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=shrewsmeal
   JWT_SECRET=your_jwt_secret
   ```

5. **Run the application**
   ```bash
   npm start
   ```
   This will start both the backend server (port 5000) and frontend development server (port 3000).

### 🔐 User Roles

#### Tenant
- Book meals for upcoming dates
- Modify existing bookings
- View booking history
- Manage profile and dietary preferences

#### Cook/Staff
- View daily meal summaries
- Access booking lists and analytics
- Filter bookings by date and criteria
- Manage tenant information

### 📊 Key Functionalities

1. **Authentication System**: Secure login/logout with JWT tokens
2. **Booking Interface**: Intuitive meal selection with visual feedback
3. **Dashboard Analytics**: Real-time meal statistics and progress tracking
4. **Profile Management**: User information and dietary preference handling
5. **Data Persistence**: Reliable storage and retrieval of booking data

### 🚧 Development Status
**Work in Progress** - This project is actively being developed with ongoing improvements to features, user interface, and system performance.

### 🤝 Contributing
This project is part of a student hostel management system. For questions or suggestions, please reach out to the development team.

### 📝 License
This project is developed for educational and operational purposes within the student accommodation context.

---

*Developed to enhance the dining experience and operational efficiency in student hostels through digital transformation.*
