export const basicProps = {
  queryParams: { type: Object, default: () => { return {} } },
  formSchemas: { type: Array, default: () => [] },
  labelWidth: { type: String, default: '140px' },
  basicFormHeight: { type: Number, default: 92 },
  labelPosition: { type: String, default: 'right' },
  size: { type: String, default: 'medium' }
}
