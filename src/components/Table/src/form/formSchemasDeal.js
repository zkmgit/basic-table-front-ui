import { cloneDeep } from 'lodash'
import { formSchemas } from './formSetting'
import store from '@/store'

export const getFormSchemas = (fields, routeName = '') => {
  const formSchemasList = []
  const cloneFormSchemas = cloneDeep(formSchemas)

  fields.forEach(field => {
    if (Reflect.has(cloneFormSchemas, field)) {
      const formSchemaItem = cloneFormSchemas[field]

      Reflect.set(formSchemaItem, 'field', field)

      if (Reflect.has(formSchemaItem, 'routeNameConfigs') && formSchemaItem.routeNameConfigs[routeName]) {
        const pageFormSchemaItem = formSchemaItem.routeNameConfigs[routeName]

        if (Reflect.has(pageFormSchemaItem, 'componentProps')) {
          const componentProps = pageFormSchemaItem.componentProps

          if (!Reflect.has(formSchemaItem, 'componentProps')) {
            Reflect.set(formSchemaItem, 'componentProps', {})
          }

          Object.assign(formSchemaItem.componentProps, componentProps)
          Reflect.deleteProperty(pageFormSchemaItem, 'componentProps')
        }

        Object.assign(formSchemaItem, pageFormSchemaItem)
      }

      if (Reflect.has(formSchemaItem, 'componentProps') && Reflect.has(formSchemaItem.componentProps, 'optionsDataKey')) {
        const key = formSchemaItem.componentProps.optionsDataKey
        const keyOptions = store.getters[`optionsData/${key}`]

        formSchemaItem.componentProps.options = keyOptions
      }

      if (formSchemaItem.component === 'Select' && Reflect.has(formSchemaItem, 'componentProps')) {
        if (!formSchemaItem.componentProps.optionsLableField) {
          formSchemaItem.componentProps.optionsLableField = 'label'
        }

        if (!formSchemaItem.componentProps.optionValueFieldMap) {
          formSchemaItem.componentProps.optionsValueField = 'value'
        }
      }

      formSchemasList.push(formSchemaItem)
    }
  })

  return formSchemasList
}
