import { Category } from '../models/category.js'

//------------------------------------------------------------- FETCH ALL
async function fetchAllCategories(req, res) {
  try {
    const categories = await Category.findAllCategories()

    if (categories) res.status(200).json(categories)
    else throw new Error('No categories were found')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

//------------------------------------------------------------- FETCH ARTICLES BY CATEGORY ID
async function fetchArticlesByCategoryId(req, res) {
  try {
    const categoryId = +req.params.id
    // console.log(categoryId)

    const articles = await Category.findArticlesByCategory(categoryId)
    if (articles) res.status(200).json(articles)
    else throw new Error('No articles were found')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

export { fetchAllCategories, fetchArticlesByCategoryId }
