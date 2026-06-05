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

### Tech Stack

* Node.js
* Express.js
* MySQL
* Sequelize ORM
* JWT
* bcrypt

### Current Status

Backend MVP completed with authentication, salon management, service management, appointment booking, slot availability, and salon search functionality.
