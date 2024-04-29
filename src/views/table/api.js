const list = []
const initData = () => {
  for (let i = 0; i < 100; i++) {
    list.push({ id: i + 1, name: '张三', sex: '男', status: 1, age: 20 + i })
  }
}
initData()

export const queryPageData = () => {
  return {
    code: '1',
    msg: '成功',
    result: {
      list: list,
      total: list.length
    }
  }
}
