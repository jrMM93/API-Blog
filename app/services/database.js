//-- Import PG
import pg from 'pg'

//-- Create new client
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

//-- Connection
client.connect()

export { client }
