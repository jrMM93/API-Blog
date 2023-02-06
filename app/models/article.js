import {
  findAll,
  findOne,
  createData,
  updateData,
  deleteData,
  findArticleByTitle,
  findArticleBySlug,
} from '../datamapper/articleDatamapper.js'

class Article {
  static async findAllArticles() {
    return findAll()
  }

  static async findOneArticle(articleId) {
    return findOne(articleId)
  }

  static async createArticle(articleData) {
    return createData(articleData)
  }

  static async updateArticle(articleId, articleData) {
    return updateData(articleId, articleData)
  }

  static async deleteArticle(articleId) {
    return deleteData(articleId)
  }

  static async findByTitle(title) {
    return findArticleByTitle(title)
  }

  static async findBySlug(slug) {
    return findArticleBySlug(slug)
  }
}

export { Article }
