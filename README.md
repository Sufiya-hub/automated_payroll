# Automated Payroll System

A comprehensive full-stack Next.js application for managing employee payrolls, attendance, and leave requests. 
This project integrates with a Postgres database (via Drizzle ORM) and Razorpay for actual fund account creation and salary disbursements.

## Key Features

- **Dynamic Salary Calculation**: Supports custom salary components like basic, DA, HRA, allowances, PF, and dynamic professional tax slabs.
- **Attendance & Leave Management**: Tracks daily attendance (with geofencing/IP checks) and automatically deducts pay for excess leaves.
- **Razorpay Integration**: Directly creates fund accounts and processes IMPS salary payouts securely via POST APIs.
- **Role-Based Access**: Distinguishes between standard employees and managers/admins for protected operations.
- **Audit Logs**: Maintains a secure record of payroll generation and sensitive updates.
- **Robust Security**: Uses Zod for strict data validation and bcrypt for password hashing.

## Tech Stack

- **Frontend**: Next.js (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Gateway**: Razorpay
- **Validation & Security**: Zod, bcryptjs

## Environment Setup

Create a `.env` file in the root directory and add the following variables:

```env
DATABASE_URL=postgres://user:password@host:port/dbname
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SCERET=your_google_client_secret

RAZORPAY_TEST_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_key_secret
ACCOUNT_NUMBER=your_company_razorpay_account_number
```

## Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Push Database Schema to PostgreSQL:
   ```bash
   npx drizzle-kit push:pg
   ```
   *(Note: Adjust the command based on your `drizzle.config.js` settings)*

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Code Quality

The codebase utilizes `Prettier` and `ESLint` to maintain code standards. You can format the code by running:

```bash
npx prettier --write .
```

## Demo Credentials
To get started as an admin, you can manually insert a user with `position: 'admin'` or `'manager'` directly into your database.
