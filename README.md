# Rental Platform Backend

This is the backend service for the rental platform, built using TypeScript and Express.js. It handles authentication, authorization, user roles, property management, and payments.

## Features

- Role-based user authentication (Admin, Landlord, Tenant)
- Secure authentication using JWT and bcrypt
- Property listing and rental request management
- Payment processing with Stripe
- Type safety with TypeScript and validation using Zod
- MongoDB with Mongoose for efficient data management

## Technologies Used

- **Backend Framework:** Express.js
- **Database:** MongoDB (with Mongoose ORM)
- **Authentication:** JWT, bcrypt
- **Validation:** Zod
- **Payment Gateway:** Stripe
- **Other Dependencies:** CORS, dotenv, jwt-decode

## Installation and Setup

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or cloud-based)
- Stripe account for payment integration

### Steps to Run Locally

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:

   ```env
   PORT=5000
   DATABASE_CONNECTION_STRING=<mongodb-connection-string>
   EMAIL_USER=<your-email-address>
   EMAIL_PASS=<your-password-got-from-google>
   JWT_PRIVATE_KEY=<secret-key-for-jwt>
   STRIPE_SECRET_KEY=<stripe-secret-key-got-from-stripe>

   ```

PAYMENT_SUCCESS_URL=https://home-hunt-frontend.vercel.app/successful-payment
PAYMENT_FAILURE_URL=https://home-hunt-frontend.vercel.app/failed-payment
STRIPE_ENDPOINT_SECRET=<stripe-end-point-secret>

```


```

4. Start the server:

```sh
npm run dev
```

## Security Measures

- **JWT Authentication**: Secure login system with role-based access.
- **Bcrypt Hashing**: Ensures password security.
- **Environment Variables**: Sensitive data is stored securely in `.env`.

## License

This project is licensed under the MIT License.
