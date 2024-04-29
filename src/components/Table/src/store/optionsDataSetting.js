import { cloneDeep, isArray } from 'lodash'

export const methodActions = {
  userOptions: () => {
    return {
      code: '1',
      result: [{ name: '路人甲', id: 1 }, { name: '路人乙', id: 2 }, { name: '路人丙', id: 3 }]
    }
  }
}

// 根据框架select组件所映射字段，把后端返回的数据转化为label value格式
export const formatOptionsData = (data, formatType = 'default', label = 'label', value = 'value') => {
  const cloneData = cloneDeep(data)
  let optionsData = []

  switch (formatType) {
    case 'default':
      if (isArray(label)) {
        optionsData = cloneData.map(item => {
          return {
            label: label.map(labelItem => item[labelItem]).join('-'),
            value: item[value]
          }
        })
      } else {
        optionsData = cloneData.map(item => {
          return {
            label: item[label],
            value: item[value]
          }
        })
      }
      break
    case 'array':
      optionsData = cloneData.map(item => {
        return {
          label: item,
          value: item
        }
      })
      break
  }

  return optionsData
}

