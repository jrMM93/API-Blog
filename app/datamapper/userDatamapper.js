import { client } from '../services/database.js'

const TABLE_NAME = 'user'

//------------------------------------------------------------------- CREATE USER
async function createData(firstName, lastName, email, hashedPassword) {
  const sql = {
    text: `INSERT INTO "${TABLE_NAME}" ("firstname", "lastname", "email", "password") VALUES ($1, $2, $3, $4)`,
    values: [firstName, lastName, email, hashedPassword],
  }

  const result = await client.query(sql)

  return result.rows[0]
}

//------------------------------------------------------------------- FIND USER BY EMAIL
async function findByEmail(email) {
  const sql = {
    text: `SELECT * FROM "${TABLE_NAME}" WHERE "email" = $1;`,
    values: [email],
  }

  const result = await client.query(sql)

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0]
}

export { createData, findByEmail }
