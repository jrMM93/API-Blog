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
  return result.rowCount
}

//------------------------------------------------------------------- UPDATE
async function updateData(articleId, articleData) {
  let { category, slug, title, content, category_id } = articleData

  const sql = {
    text: `
      UPDATE "${TABLE_NAME}"
          SET
          "category" = $1,
          "slug" = $2,
          "title" = $3,
          "content" = $4,
          "category_id" = $5
      WHERE "id" = $6;`,
    values: [category, slug, title, content, category_id, articleId],
  }

  const result = await client.query(sql)
  return result.rowCount
}

//------------------------------------------------------------------- DELETE
async function deleteData(articleId) {
  const result = await client.query(
    `DELETE FROM "${TABLE_NAME}" WHERE "id" = $1;`,
    [articleId]
  )

  return result.rowCount
}

//------------------------------------------------------------------- FIND ARTICLE BY TITLE
async function findArticleByTitle(title) {
  const sql = {
    text: `SELECT * FROM "${TABLE_NAME}" WHERE "title" = $1;`,
    values: [title],
  }

  const result = await client.query(sql)

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0]
}

//------------------------------------------------------------------- FIND ARTICLE BY SLUG
async function findArticleBySlug(slug) {
  const sql = {
    text: `SELECT * FROM "${TABLE_NAME}" WHERE "slug" = $1;`,
    values: [slug],
  }

  const result = await client.query(sql)

  if (result.rowCount === 0) {
    return null
  }

  return result.rows[0]
}

export {
  findAll,
  findOne,
  createData,
  updateData,
  deleteData,
  findArticleByTitle,
  findArticleBySlug,
}
