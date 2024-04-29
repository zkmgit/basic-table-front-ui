# Author-Kay.
# Table 基于Element UI 二次封装的页面组件

# Props Table

|  属性  |   类型  | 默认值 |  字段说明 |
| :----: | :----: | :----: |  :----:  |
| selection | Boolean | false | 是否显示表格首列的复选框 |
| formSchemas | Array | [] | 表单配置项 |
| queryParams | Object | {} | 表单的查询参数 |
| tableColumns | Array | [] | 表头的配置项 |
| apiFn        | Funtion | () => {} | 表格的分页查询api |
| isBeforeFetch | [Function, undefined] | undefined | 表格查询前对入参过滤处理 |
| isAfterFetch | [Function, undefined] | undefined | 表格查询后对数据过滤处理 |
| setDefaultQueryParams | [Function, undefined] | undefined | 设置表格初始查询的默认值 |
| isImmediateQuery | Boolean | true | 页面加载就执行查询表格数据 |
| notTransformQueryParams | Boolean | false | 是否使用默认的参数格式化 |
| otherHeight | Number | 0 | 表格计算减掉的其他元素高度 |
