import { ADDRESS_API_USER } from "../utils/consts"
import fetchAPI from "../utils/fetchAPI"
import { IUser } from "../utils/interfaces"

class UserAPI {
  static async get() {
    return await fetchAPI(ADDRESS_API_USER, "GET", {}) as IUser
  }

  static async put(changes: Partial<Omit<IUser, "id">>) {
    await fetchAPI(ADDRESS_API_USER, "POST", { body: changes }) // надо ли возвращать?
    return
  }
}

export default UserAPI