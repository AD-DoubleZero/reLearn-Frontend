import { ADDRESS_API_CLUSTER } from "../utils/consts"
import fetchAPI from "../utils/fetchAPI"
import { ICluster, IClusterPutOptions, ICollocation } from "../utils/interfaces"

class ClusterAPI {
  // undefined
  static async get(LanguageId: number, options?: { acceptableLevels?: number[] }) {
    return await fetchAPI(ADDRESS_API_CLUSTER, "GET", {
      params: {
        ...options,
        LanguageId,
      }
    }) as {
      cluster: ICluster,
      collocations: ICollocation[]
    }
  }

  // undefined
  static async getAvailableLevels(LanguageId: number) {
    return await fetchAPI(ADDRESS_API_CLUSTER, "GET", {
      params: {
        LanguageId,
        onlyAvailableLevels: true
      }
    }) as {
      level: number
      count: number
    }[]
  }

  // undefined
  static async put(ClusterId: number, options: Partial<IClusterPutOptions>) {
    await fetchAPI(ADDRESS_API_CLUSTER, "PUT", {
      body: { ...options, ClusterId }
    }) // надо ли возвращать?
    return
  }
}

export default ClusterAPI