Horoscope API Assessment
🌟 Overview

This API delivers daily horoscopes with JWT-based authentication, rate limiting, and a 7-day history feature. It is designed to be lightweight, secure, and scalable, with room for future personalized user experiences.

⚙️ Setup Instructions

Clone the repository:

git clone https://github.com/ShalakaPawar/horoscope-api-assessment.git
cd horoscope-api-assessment


Install dependencies:

npm install


Run the server:

npm start


The API will be accessible at http://localhost:3000.

Design Decisions

Zodiac Auto-detection: Simplified zodiac calculation using month/day ranges on signup.

In-memory Horoscope Data: Avoided DB overhead for static horoscope text for fast prototype.

Rate-Limiting Middleware: In-memory limiter to prevent spammy requests per user.

JWT Authentication: Stateless, scalable, and secure token-based authentication.

MongoDB + Mongoose: Flexible NoSQL setup for quick prototyping and future schema changes.

7-Day History Tracking: Stores recent horoscopes per user to allow reference and reduce repeated computation.

Modular Architecture: Separated routes, middleware, and utilities for maintainability and extensibility.

Simple API-first Approach: Focused on backend API design to support multiple clients (web/mobile).


Potential Improvements

Personalized Horoscopes: Generate user-specific horoscopes using birth charts or AI models.

Persistent Storage: Replace in-memory storage with a database (MongoDB/PostgreSQL) for durability.

Dynamic Content Generation: Use AI for engaging and personalized horoscope messages.

Multi-Language Support: Expand for global users.

Advanced Rate Limiting & Caching: Use distributed caches (Redis) for scaling and better performance.

Analytics & Logging: Track API usage, user engagement, and popular horoscopes.

Scalability Considerations

Database Indexing: Quickly retrieve user-specific data.

Caching: Reduce DB load by caching zodiac-specific or precomputed horoscope content.

Microservices: Separate authentication, horoscope generation, and history services to scale independently.

Horizontal Scaling: Stateless JWT allows multiple server instances behind a load balancer.

Asynchronous Processing: Precompute AI-generated personalized horoscopes for large user bases to avoid latency.


API Endpoints & cURL Examples
Sample cURL Requests
1. Sign Up

Endpoint: POST /auth/signup
Description: Create a new user account.

curl --location 'http://localhost:3000/auth/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "your_password_here",
  "birthdate": "1990-05-15"
}'

2. Login

Endpoint: POST /auth/login
Description: Authenticate user and get JWT token.

curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "john.doe@example.com",
  "password": "your_password_here"
}'


Response Example:

{
  "token": "your_jwt_token_here"
}

3. Get Today’s Horoscope

Endpoint: GET /horoscope/today
Description: Retrieve today’s horoscope for the logged-in user.

curl --location 'http://localhost:3000/horoscope/today' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your_jwt_token_here'


Response Example:

{
  "date": "2025-08-16",
  "zodiacSign": "Leo",
  "content": "Today is full of opportunities for growth and learning."
}

4. Get 7-Day Horoscope History

Endpoint: GET /horoscope/history
Description: Retrieve the last 7 days of horoscopes for the logged-in user.

curl --location 'http://localhost:3000/horoscope/history' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer your_jwt_token_here'


Response Example:

[
  {
    "date": "2025-08-16",
    "zodiacSign": "Leo",
    "content": "Today is full of opportunities for growth."
  },
  {
    "date": "2025-08-15",
    "zodiacSign": "Leo",
    "content": "Small changes lead to big results."
  }
]
