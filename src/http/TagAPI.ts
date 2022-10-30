import { ADDRESS_API_TAG } from "../utils/consts"
import fetchAPI from "../utils/fetchAPI"
import { ITag } from "../utils/interfaces"

class TagAPI {
  // undefined
  static async get(options?: { certainTagsId?: number[] }) {
    return await fetchAPI(ADDRESS_API_TAG, "GET", {
      params: options
    }) as ITag[]
  }

  // undefined
  static async post(title: string) {
    return await fetchAPI(ADDRESS_API_TAG, "POST", { body: { title } }) as ITag // надо ли возвращать?
  }

  // undefined
  static async delete(TagId: number) {
    return await fetchAPI(ADDRESS_API_TAG, "DELETE", { body: { TagId } }) as boolean
  }
}

export default TagAPI