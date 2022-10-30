import { ADDRESS_API_LANGUAGE } from "../utils/consts"
import fetchAPI from "../utils/fetchAPI"
import { ILanguage } from "../utils/interfaces"

class LanguageAPI {
  // undefined
  static async get() {
    return await fetchAPI(ADDRESS_API_LANGUAGE, "GET", {}) as ILanguage[]
  }
}

export default LanguageAPI