import { client } from '../services/database.js'

const TABLE_NAME = 'category'
const TABLE_ARTICLE = 'article'

//------------------------------------------------------------------- FIND ALL
async function findAll() {
  const result = await client.query(`SELECT * FROM "${TABLE_NAME}";`)
  return result.rows
}

//------------------------------------------------------------------- FIND ARTICLES BY CATEGORY ID
async function findArticlesByCategory(categoryId) {
  const result = await client.query(
    `SELECT * FROM "${TABLE_ARTICLE}" WHERE "category_id" = $1;`,
    [categoryId]
  )
  return result.rows
}

export { findAll, findArticlesByCategory }
