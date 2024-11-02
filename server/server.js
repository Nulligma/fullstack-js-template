import app from "./app.js";
import dotenv from 'dotenv';
import { conntectDB } from './db.js';

dotenv.config();

export const pg = await conntectDB();

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));