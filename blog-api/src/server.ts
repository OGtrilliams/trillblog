import express from "express";
import config from "./config";
import cors from "cors";
import type { CorsOptions } from "cors";

const app = express();

// Configure CORS options
const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false
      );
      console.log(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

// apply CORS middleware
app.use(cors(corsOptions));

// enable JSON request body parsing
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(config.PORT, () => {
  console.log(`Server running on https://localhost:${config.PORT}`);
});
