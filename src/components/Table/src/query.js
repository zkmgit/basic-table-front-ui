import { cloneDeep, isNull, isArray } from 'lodash'

export const queryParamsTransform = (params) => {
  const newParams = cloneDeep(params)

  for (const key in newParams) {
    const value = newParams[key]

    if (isNull(value) || value === '' || value === undefined) {
      Reflect.deleteProperty(newParams, key)
    }

    if (isArray(value) && value.length === 0) {
      Reflect.deleteProperty(newParams, key)
    }
  }

  return newParams
}
