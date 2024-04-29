const Mock = require('mockjs')

const data = Mock.mock({
  'items|100': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        msg: '成功',
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
