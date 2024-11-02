import mongoose from "mongoose";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export async function conntectDB() {
    const {
        MONGO_HOST,
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_PORT,
        MONGO_DBNAME,
        MONGO_LOCAL,
        MONGO_URL,
        PG_URI
    } = process.env;

    let MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}?authSource=admin`;

    if (MONGO_LOCAL) {
        MONGO_URI = `${MONGO_URL}/${MONGO_DBNAME}`;
    }

    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        return drizzle(postgres(PG_URI));
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
}