import dotenv from 'dotenv'

dotenv.config();

const CONFIG = {
    DB_URL: process.env.DB_URL,
    PORT: process.env.PORT
}

export { CONFIG }