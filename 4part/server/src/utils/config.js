import "dotenv/config";

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV !== "production"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URI;

export const variables = { PORT, MONGODB_URI };
