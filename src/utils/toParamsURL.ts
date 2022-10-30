const toParamsURL = (object: Object) => {
  const params: {[propName: string]: string} = {}

  for (let [key, value] of Object.entries(object)) {
    params[key] = JSON.stringify(value)
  }

  return params
}

export default toParamsURL