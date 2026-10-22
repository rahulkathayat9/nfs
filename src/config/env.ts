import dotenv from "dotenv";

dotenv.config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT,
  JSON_WEB_TOKEN: process.env.JSON_WEB_TOKEN,
}


if (!env.DATABASE_URL) {
  throw new Error("DATABASE_URL not defined")
} else if (!env.PORT) {
  throw new Error("PORT is not defined")
} else if (!env.JSON_WEB_TOKEN) {
  throw new Error("JSON_WEB_TOKEN is not defined")
}

export default env;
