import { statusOptions } from './constant.js'

export const formSchemas = {
  name: {
    label: '名称',
    component: 'Input',
    componentProps: {
      placeholder: '请输入'
    }
  },
  userIds: {
    label: '用户名',
    component: 'Select',
    componentProps: {
      optionsDataKey: 'userOptions',
      multiple: true
    }
  },
  status: {
    label: '状态',
    component: 'Select',
    componentProps: {
      options: statusOptions
    }
  },
  time: {
    label: '创建时间',
    component: 'DatePicker'
  }
}

