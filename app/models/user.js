import { createData, findByEmail } from '../datamapper/userDatamapper.js'

class User {
  static async createUser(firstName, lastName, email, hashedPassword) {
    return createData(firstName, lastName, email, hashedPassword)
  }

  static async findUserByEmail(email) {
    return findByEmail(email)
  }
}

export { User }
