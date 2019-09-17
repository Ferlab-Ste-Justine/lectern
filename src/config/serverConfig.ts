import * as dotenv from "dotenv";

dotenv.config();

export const serverPort = process.env.PORT || "3000";
export const openApiPath = process.env.OPENAPI_PATH || "/api-docs";
export const mongoHost = process.env.MONGO_HOST || "localhost";
export const mongoPort = process.env.MONGO_PORT || 27017;
export const mongoDb = process.env.MONGO_DB || "lectern";
export const mongoUser = process.env.MONGO_USER;
export const mongoPass = process.env.MONGO_PASS;