import winston from "winston";
import config from "@/config";

const { combine, timestamp, json, errors, align, printf, colorize } =
  winston.format;

const transports: winston.transport[] = [];

// add console transport if app is not running in production

if (config.NODE_ENV !== "production") {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }), //add colors to log levels
        timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }), //add timestamp to logs
        align(),
        printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? `\n${JSON.stringify(meta)}`
            : "";

          return `${timestamp} [${level}] : ${message}${metaStr}`;
        })
      ),
    })
  );
}

// create a logger instance using Winston

const logger = winston.createLogger({
  level: config.LOG_LEVEL || "info", // set default log level
  format: combine(timestamp(), errors({ stack: true }), json()), // use JSON format for log messages
  transports,
  silent: config.NODE_ENV === "test", //disable logging in test environment
});

export { logger };
