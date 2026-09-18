# TicketSystem — Bus, Train & Plane Ticket Booking Platform
🌐 **Live Website Demo:** [teal-brioche-33d2a5.netlify.app](https://teal-brioche-33d2a5.netlify.app/)
A full-stack ticket booking web app for Bangladesh built with **Node.js, Express, MongoDB (Mongoose)** on the backend and **HTML, Bootstrap 5, vanilla JavaScript** on the frontend.

Users can sign up, log in, search bus/train/plane routes, select seats, book tickets, and view their booking history from a profile page.

## Features

- User authentication with **JWT tokens** and **bcrypt password hashing**
- Bus, Train, and Plane booking flows with interactive seat selection
- Bookings are saved to MongoDB and tied to the logged-in user
- Protected booking API — only authenticated users can create bookings
- Profile page showing a user's full booking history
- Responsive Bootstrap 5 UI

## Tech Stack

| Layer     | Tech |
|-----------|------|
| Frontend  | HTML5, Bootstrap 5, vanilla JS |
| Backend   | Node.js, Express |
| Database  | MongoDB with Mongoose |
| Auth      | JWT (jsonwebtoken) + bcryptjs |

## Project Structure

```
ticket-system/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/User.js
│   ├── models/Booking.js
│   ├── routes/authRoutes.js
│   ├── routes/bookingRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── bus.html
    ├── train.html
    ├── plane.html
    ├── profile.html
    ├── confirm.html
    ├── css/style.css
    └── js/main.js
```

## Getting Started

### 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and add your own values:

```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ticket-system
JWT_SECRET=replace_with_a_long_random_string
```

Start the server:

```bash
npm run dev     # with nodemon
# or
npm start
```

The API runs at `http://localhost:5000`.

### 2. Frontend setup

The frontend is static, so you can open the files directly or serve them:

```bash
cd frontend
npx serve .
```

Then visit `http://localhost:3000` (or whichever port `serve` prints) and navigate to `index.html`.

> The frontend calls the API at `http://localhost:5000/api` — update `API_BASE` in `js/main.js` if you deploy the backend elsewhere.

## API Endpoints

| Method | Endpoint              | Auth | Description |
|--------|-----------------------|------|--------------|
| POST   | `/api/auth/signup`    | No   | Create a new account |
| POST   | `/api/auth/login`     | No   | Log in, returns a JWT |
| POST   | `/api/bookings`       | Yes  | Create a new booking |
| GET    | `/api/bookings/my`    | Yes  | Get the logged-in user's bookings |

Protected routes require an `Authorization: Bearer <token>` header.

## Notes / Next Steps

- Passwords are hashed with bcrypt; never store plaintext passwords.
- `.env` is git-ignored — never commit real credentials. Only `.env.example` should be pushed.
- Ideas to extend this project further: seat availability persisted per trip (currently seats reset per session), email confirmation, payment gateway integration, admin dashboard for managing routes.

## License

MIT
