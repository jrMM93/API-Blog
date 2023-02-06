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

//------------------------------------------------------------- CREATE
async function createArticle(req, res) {
  try {
    const titleIsTaken = await Article.findByTitle(req.body.title)
    if (titleIsTaken) {
      return res.json('This title already exists')
    }

    console.log(req)
    await Article.createArticle(req.body)
    return res.status(200).json('Your post has been successfully created')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

//------------------------------------------------------------- UPDATE
async function updateArticle(req, res) {
  try {
    const articleId = +req.params.id

    let articleInfo = await Article.findOneArticle(articleId)

    // if (!(articleInfo.user_id === +req.userId)) {
    //   return res.status(403).json('Unauthorized')
    // }

    for (const key in articleInfo) {
      req.body[key] ? req.body[key] : (req.body[key] = articleInfo[key])
    }

    const titleIsTaken = await Article.findByTitle(req.body.title)
    if (titleIsTaken) {
      return res.json('This title already exists')
    }

    await Article.updateArticle(articleId, req.body)

    return res.status(200).json('Your post has been successfully edited')
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

//------------------------------------------------------------- DELETE
async function deleteArticle(req, res) {
  try {
    const articleId = +req.params.id

    // let articleInfo = await Article.findOneArticle(articleId)

    // if (!(articleInfo.user_id === +req.userId)) {
    //   return res.status(403).json('Unauthorized')
    // }
    await Article.deleteArticle(articleId)

    return res.status(200).json(`Post successfully deleted`)
  } catch (err) {
    res.status(500).json({ 'Error 500': err.message })
  }
}

export {
  fetchAllArticles,
  fetchOneArticle,
  createArticle,
  updateArticle,
  deleteArticle,
}
