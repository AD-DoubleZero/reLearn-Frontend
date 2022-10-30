import { ADDRESS_API_COLLOCATION } from "../utils/consts"
import fetchAPI from "../utils/fetchAPI"
import { ICollocation, ITag } from "../utils/interfaces"

class CollocationAPI {
  // undefined
  static async get(LanguageId: number, options: {
    body?: string
    sorting?: string
    tags?: ITag[]
    page?: number
    limit?: number
  }) {
    return await fetchAPI(ADDRESS_API_COLLOCATION, "GET", {
      params: { ...options, LanguageId }
    }) as { count: number, collocations: ICollocation[]}
  }

  // undefined
  static async put(CollocationId: number, options: Partial<Omit<ICollocation, "id" | "createdAt" | "updatedAt" | "UserId" | "LanguageId">>) {
    return await fetchAPI(ADDRESS_API_COLLOCATION, "PUT", {
      body: { ...options, CollocationId }
    }) as ICollocation // надо ли возвращать?
  }
}

export default CollocationAPI
