import { findAll } from '../datamapper/categoryDatamapper.js'

class Category {
  static async findAllCategories() {
    return findAll()
  }
}

export { Category }
