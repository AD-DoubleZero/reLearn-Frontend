import { ADDRESS, ADDRESS_API } from "./consts"
import telegram from "./telegram"
import toParamsURL from "./toParamsURL"

const api = ADDRESS + ADDRESS_API
type Method = "GET" | "POST" | "DELETE" | "PUT"

const tg = telegram()

const fetchAPI = async (to: string, method: Method, options: {
  body?: { [propName: string]: any }
  params?: { [propName: string]: any }
}) => {
  const { params, body } = options

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Authorization": tg.initData
    },
  }

  if (body && Object.keys(body).length > 0) {
    const tempBody: any = {}
    for (let [key, value] of Object.entries(body)) {
      const type = typeof value
      if (type === "number" || type === "string") {
        tempBody[key] = value
      } else {
        tempBody[key] = JSON.stringify(value)
      }
    }
    init.body = tempBody
  }

  let queryParams: {[propName: string]: string}
  const UserId = tg.initDataUnsafe.user?.id

  if (!UserId) {
    throw new Error("UserId error in fetchAPI")
  }

  if (params && Object.keys(params).length > 0) {
    queryParams = toParamsURL({ ...params, UserId })
  } else {
    queryParams = toParamsURL({ UserId })
  }

  let result: any
  await fetch(api + to + new URLSearchParams(queryParams), init)
    .then(json => json.json())
    .then(res => {result = res})

  return result
}

export default fetchAPI