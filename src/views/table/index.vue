<template>
  <div>
    <basic-table
      ref="basicTableRef"
      :form-schemas="formSchemas"
      :query-params="queryParams"
      :table-columns="tableColumns"
      :selection="true"
      :api-fn="apiFn"
    >

      <template #tableButton>
        <el-button type="primary" size="small" icon="el-icon-edit">测试按钮1</el-button>
      </template>
      <!-- 插槽使用 -->
      <template #index="{ index }">
        {{ index + 1 }}
      </template>

      <template #action="{ data }">
        <el-button type="primary" size="small" icon="el-icon-edit">测试按钮2{{ data.id }}</el-button>
      </template>

    </basic-table>
  </div>
</template>
<script>
import { BasicTable } from '@/components/Table'
import { getFormSchemas } from '@/components/Table/src/form/formSchemasDeal'
import { queryPageData } from './api'

export default {
  name: 'Table',
  components: { BasicTable },
  data() {
    return {
      queryParams: {
        name: '',
        userIds: [],
        status: '',
        time: []
      },
      apiFn: () => {},
      formSchemas: [],
      tableColumns: [
        { label: '序号', prop: 'index', slot: 'index', width: 70 },
        { label: 'ID', prop: 'id', width: 160 },
        { label: 'author', prop: 'author', width: 200 },
        { label: 'title', prop: 'title', width: 150 },
        { label: '状态', prop: 'status', width: 110 },
        { label: 'display_time', prop: 'display_time', width: 100 },
        { label: '操作', slot: 'action', width: 160, fixed: 'right' }
      ]
    }
  },
  async created() {
    this.apiFn = queryPageData
    this.formSchemas = getFormSchemas(Object.keys(this.queryParams), this.$route.name)
  },
  methods: {
    // 表格刷新事件
    refreshTableData() {
      this.$refs.basicTableRef.queryData()
    }
  }
}
</script>
