# 🛋️Furniro - Modern Furniture E-commerce Platform

<div align="center">
  <img src="https://img.shields.io/badge/Version-10.0-purple" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-6+-green" alt="MongoDB">
  
  <h3>Where comfort and style find harmony</h3>
  <p>A comprehensive full-stack web application for modern furniture shopping, with a dynamic admin dashboard, searching and filtering features.</p>
</div>

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)

## 🌟 Overview

**Furniro** is a full-featured, responsive online furniture marketplace built with the
MEAN stack (MongoDB, Express, Angular, Node.js). The platform delivers a seamless shopping experience with modern design, 
robust authentication, and comprehensive e-commerce functionality for both customers and administrators.


## ✨ Core Features Breakdown

### 🎨 Modern & Responsive Design
- Mobile-first approach with adaptive layouts for all screen sizes
- Clean, minimalist UI following modern design principles
- Smooth animations and transitions for enhanced user experience
- Accessibility compliant with proper ARIA labels and keyboard navigation


### 👥 Dual-Role Authentication System
- **User Features**:
  - Google OAuth integration for one-click sign-up/login
  - Persistent login sessions with JWT tokens
  - Profile management with order history and preferences
    
- **Admin Features**:
  - Protected admin routes with role-based access control
  - Dashboard analytics for store performance
  - Complete inventory management capabilities
  - Order processing and customer management tools


### 🛍️ Advanced Product Discovery
- **Search & Filter System**:
  - Real-time search with debounced input
  - Advanced filtering by:
  - Category (living room, bedroom, office, outdoor)
  - Availability status
 

### 🛒 Smart Shopping Cart
- **Cart Management**:
  - Persistent cart across sessions
  - Real-time quantity updates with stock validation
  - Add/remove items with instant feedback
  - Save for later functionality

### 💳 Secure Checkout Process
- **Multi-step Checkout**:
  - Cart review with item verification
  - Shipping information with address validation
  - Payment method selection
  - Order confirmation
  - Stripe Integration


### Screenshot

### Home Page
<img width="1877" height="976" alt="screenshot-homepage" src="https://github.com/user-attachments/assets/f970d9fc-8d4c-457c-b584-12bc22e5a359" />

### Register Page
<img width="1920" height="1892" alt="screenshot1" src="https://github.com/user-attachments/assets/7bb8a33d-a948-410e-b3bf-6e12feccb4d8" />

### Products Page
<img width="1872" height="978" alt="screenshot2" src="https://github.com/user-attachments/assets/60c9bc68-d0bd-4f13-9dfa-00a432e81ab0" />


---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Token-based authentication |
| **Google OAuth 2.0** | Social authentication |
| **Stripe** | Payment processing |
| **Nodemailer** | Email service |
| **Multer** | File upload handling |
| **Cloudinary** | Image storage |


### Frontend
| Technology | Purpose |
|------------|---------|
| **Angular 21** | UI framework |
| **Bootstrap** | Additional components |
| **Angular-Material** | Additional components |
| **Axios** | HTTP client |
| **Framer Motion** | Animations |
| **CSS** | Style |

### Test
- Run the frontend with (ng serve -o)
- Run the backend repo with (npm run dev)

**The backend Repo**: https://github.com/salmafadlabdulrahman/furniture-backend-repo
