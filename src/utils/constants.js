export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.example.com"
    : "http://localhost:3000/api/";
