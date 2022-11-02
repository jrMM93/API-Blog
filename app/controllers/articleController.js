import { Article } from '../models/article.js'

//------------------------------------------------------------- FETCH ALL
async function fetchAllArticles(req, res) {
  try {
    const articles = await Article.findAllArticles()

    if (articles) res.status(200).json(articles)
    else throw new Error('No posts were found')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

//------------------------------------------------------------- FETCH ONE
async function fetchOneArticle(req, res) {
  try {
    const articleId = +req.params.id

    const article = await Article.findOneArticle(articleId)
    console.log(article)

    if (article) res.status(200).json(article)
    else throw new Error(`This post doesn't exist`)
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

export { fetchAllArticles, fetchOneArticle }
