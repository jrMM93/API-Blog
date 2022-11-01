import { client } from '../services/database.js'

const TABLE_NAME = 'category'

//------------------------------------------------------------------- FIND ALL
async function findAll() {
  const result = await client.query(`SELECT * FROM "${TABLE_NAME}";`)
  return result.rows
}

export { findAll }
