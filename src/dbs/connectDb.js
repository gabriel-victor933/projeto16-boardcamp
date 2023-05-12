import dotenv from "dotenv"
dotenv.config()
import pg from "pg"

const {Pool} = pg

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}

export const db = new Pool(configDatabase);

