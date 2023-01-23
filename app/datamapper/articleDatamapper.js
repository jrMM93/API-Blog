import { client } from '../services/database.js'

const TABLE_NAME = 'article'

//------------------------------------------------------------------- FIND ALL
async function findAll() {
  const result = await client.query(`SELECT * FROM "${TABLE_NAME}";`)
  return result.rows
}

//------------------------------------------------------------------- FIND ONE
async function findOne(articleId) {
  const result = await client.query(
    `SELECT * FROM "${TABLE_NAME}" WHERE "id" = $1;`,
    [articleId]
  )
  return result.rows[0]
}

//------------------------------------------------------------------- CREATE
async function createData(articleData) {
  let { category, slug, title, content, category_id, user_id } = articleData

  const sql = {
    text: `
      INSERT INTO "${TABLE_NAME}"
        ("category", "slug", "title", "content", "category_id", "user_id")
      VALUES
        ($1,$2,$3,$4,$5,$6);  
    `,
    values: [category, slug, title, content, category_id, user_id],
  }

  const result = await client.query(sql)
  return result.rows[0]
}

export { findAll, findOne, createData }
