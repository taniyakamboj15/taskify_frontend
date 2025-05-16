export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://taskify-backend-rose.vercel.app/api/"
    : "http://localhost:3000/api/";
