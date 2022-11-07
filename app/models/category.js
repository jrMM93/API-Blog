import {
  findAll,
  findArticlesByCategory,
} from '../datamapper/categoryDatamapper.js'

class Category {
  static async findAllCategories() {
    return findAll()
  }

  static async findArticlesByCategory(categoryId) {
    return findArticlesByCategory(categoryId)
  }
}

export { Category }
