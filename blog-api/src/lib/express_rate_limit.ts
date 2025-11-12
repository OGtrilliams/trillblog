import { rateLimit } from "express-rate-limit";

// configure rate limiting middleware
const limiter = rateLimit({
  windowMs: 60000, //1 min. time window for request limiting
  limit: 60, //allow max 60 requests per window per IP
  standardHeaders: "draft-8", // use latest standard rate-limit headers
  legacyHeaders: false,
  message: {
    error:
      "You have sent too many requests in a short amount of time. Please try again later.",
  },
});

export default limiter;
