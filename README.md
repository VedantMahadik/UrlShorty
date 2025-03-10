# UrlShorty

## Overview
UrlShorty is a **scalable URL shortening service**, similar to Bit.ly or TinyURL. It allows users to shorten long URLs into more manageable links while tracking usage analytics. The system is built with **TypeScript, Node.js, Express, and Supabase**, ensuring **high performance and reliability**.

## Features
✅ **Shorten Long URLs** – Generate unique short links for any URL.
✅ **Redirect to Original URL** – Clicking the short link redirects users to the original URL.

## Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** Supabase
- **Deployment:** Render

## System Architecture
```
User Request → API Gateway → URL Shortener Service → Database → Response
```
- **API Gateway**: Handles incoming requests.
- **Shortener Service**: Generates unique short links and stores them.
- **Database**: Stores mappings of short links to original URLs.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- Supabase

### Steps to Run Locally
1. **Clone the Repository**
```sh
 git clone https://github.com/VedantMahadik/UrlShorty.git
 cd UrlShorty
```
2. **Install Dependencies**
```sh
 npm install
```
3. **Set Up Environment Variables**
Create a `.env` file in the root directory and configure the following:
```
PORT=8081
SUPABASE_URL=<your url>
SUPABASE_ANON_KEY=<your key>
BASE_URL=http://localhost:8081/

```
4. **Run the Application**
```sh
 npm start
```

5. **Test the API**
Use Postman or cURL to test endpoints:
- **Shorten URL:** `POST /` → `{ "url": "https://example.com" }`
- **Redirect:** `GET /:short_url`

## API Endpoints
| Method | Endpoint | Description |
|--------|------------|---------------------------|
| POST | `/` | Shortens a long URL |
| GET | `/:short_url` | Redirects to the original URL |



## Future Enhancements
🔹 **User Authentication (OAuth, JWT)**  
🔹 **Rate Limiting & Security Improvements**  
🔹 **More Analytics & Admin Dashboard**  
🔹 **Support for Custom Shortened URLs**  

## Contributing
Feel free to open issues and submit pull requests. Contributions are welcome!

## License
This project is licensed under the **MIT License**.

## Try it!!!
[URLShorty](https://url-shorty-frontend.vercel.app/)

---
🚀 **Developed by [Vedant Mahadik](https://github.com/VedantMahadik)**

