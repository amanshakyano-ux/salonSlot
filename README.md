# salonSlot
Full-stack salon booking platform where users can discover salons, view services and pricing, check available slots, and book appointments. Salon owners can manage salons, services, and customer bookings with secure role-based authentication.

## Project Progress

### Authentication & Authorization

* User Signup
* User Login
* Password Hashing using bcrypt
* JWT Authentication
* Role-Based Authorization (User / Owner)
* Protected Owner Routes

### Salon Management

* Create Salon
* User ↔ Salon Association
* Owner can create and manage salons

### Service Management

* Create Service
* Get Salon Services
* Update Service
* Delete Service
* Salon ↔ Service Association

### Booking Management

* Book Appointment
* View User Booking History
* View Salon Appointments (Owner Dashboard)
* User ↔ Booking Association
* Salon ↔ Booking Association
* Service ↔ Booking Association

### Slot Management

* Available Slots API
* Dynamic Slot Generation Based on Salon Timings
* Double Booking Prevention using Composite Unique Index

  * salonId
  * bookingDate
  * slotTime

### Salon Search

* Search Salons by:

  * Name
  * City
  * Area
  * Address
* Owner Information Included
* Starting Service Price Included

### Additional Features

* Password reset flow with email-based reset link, 15-minute expiry, and one-time-use reset tokens
* Booking email notifications for confirmation, cancellation, and completion
* Cloudinary-backed salon image upload for salon create/update operations
* Cashfree payment integration for secure order creation and verification
* Protected admin/owner endpoints for salon/service management and booking completion
* Scheduled cleanup of expired password reset tokens using node-cron

### Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT
* bcrypt
* Cloudinary
* node-cron

### Current Status

Backend MVP completed with authentication, salon management, service management, appointment booking, slot availability, password reset, email notifications, image upload, and salon search functionality.

Backend Setup
1. Clone the Backend Repository
git clone <your-backend-repo-url>
cd <backend-folder-name>
2. Install Dependencies
npm install
3. Create .env File

Create a .env file in the backend root folder.

PORT=3000

DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
DB_DIALECT=mysql

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENV=sandbox

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

BREVO_API_KEY=your_brevo_api_key

Do not push the .env file to GitHub.

4. Setup MySQL Database

Create a MySQL database manually.

Example:

CREATE DATABASE trimlyq;

Then update your .env file:

DB_NAME=trimlyq
5. Start Backend Server

For development:

npm run dev

Or production start:

npm start

Backend should run on:

http://localhost:3000
6. Test Backend

Open this URL in browser:

http://localhost:3000/ping

Expected response:

{
  "success": true,
  "message": "Backend latest code working"
}