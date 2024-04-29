<template>
  <div class="basic-layout">
    <basic-form
      ref="basicFormRef"
      :form-schemas="realFormSchemas"
      :query-params="queryParams"
      :basic-form-height="basicFormHeight"
    />
    <div v-loading="tableRegionLoading" class="table-region">
      <div class="table-button">
        <slot name="tableButton" />
        <div class="fixed-right-button">
          <el-button
            size="mini"
            type="primary"
            @click="queryData(1)"
          >查询</el-button>
          <el-button size="mini" @click="resetQueryParams">重置</el-button>
          <el-button v-if="realFormSchemas.length > 8" type="info" size="mini" @click="changeIsShowMoreForm">{{
            isShowMoreForm === false ? "展开" : "收起"
          }}</el-button>
        </div>
      </div>
      <div class="basic-table">
        <el-table
          stripe
          border
          :style="{ height: `${tableHeight}px` }"
          :height="tableHeight"
          :data="tableData"
          @sort-change="sortChange"
          @selection-change="handleSelectionChange"
        >
          <template v-for="(item, index) in realTableColumns">
            <el-table-column
              v-if="selection && index == 0"
              :key="index + 'selection'"
              fixed="left"
              type="selection"
              width="60"
            />

            <!-- 插槽 -->
            <el-table-column
              v-if="item.slot"
              :key="item.label"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width"
              :fixed="item.fixed"
              :sortable="item.sortable"
            >
              <!-- 表头当作html渲染 -->
              <template v-if="item.slotHeader" slot="header">
                <slot
                  :name="item.slotHeader"
                ><span
                  v-html="item.label"
                /></slot>
              </template>

              <template slot-scope="scope">
                <slot
                  :name="item.slot"
                  :data="scope.row"
                  :index="scope.$index"
                />
              </template>
            </el-table-column>

            <!-- 正常展示 -->
            <el-table-column
              v-else
              :key="`${item.label}${index}`"
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width"
              :fixed="item.fixed"
              :sortable="item.sortable"
            />
          </template>
        </el-table>
        <pagination
          ref="page"
          :total="total"
          :limit="pageParam.ps"
          :page="pageParam.pn"
          @pagination="paginationChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BasicForm from './form/BasicForm'
import Pagination from './Pagination'
import { queryParamsTransform } from './query'
import { isFunction, isArray, cloneDeep } from 'lodash'

export default {
  name: 'BasicTable',
  components: { BasicForm, Pagination },
  props: {
    selection: { type: Boolean, default: false },
    formSchemas: { type: Array, default: () => [] },
    tableColumns: { type: Array, default: () => [] },
    apiFn: { type: Function, default: () => {
      return () => {}
    } },
    setDefaultQueryParams: { type: [Function, undefined], default: undefined },
    afterFetch: { type: [Function, undefined], default: undefined },
    beforeFetch: { type: [Function, undefined], default: undefined },
    queryParams: {
      type: Object,
      default: () => {
        return {}
      }
    },
    notTransformQueryParams: { type: Boolean, default: false },
    isImmediateQuery: { type: Boolean, default: true },
    otherHeight: { type: Number, default: 0 }
  },
  data() {
    return {
      isShowMoreForm: false,
      tableRegionLoading: false,
      realFormSchemas: [],
      realTableColumns: [],
      tableData: [],
      tableSelectList: [],
      total: 0,
      pageParam: {
        ps: 10,
        pn: 1
      },
      tableHeight: 400,
      basicFormHeight: 92,
      sortParams: {},
      sortFields: {
        ascending: 'asc',
        descending: 'desc'
      }
    }
  },
  watch: {
    formSchemas: {
      handler() {
        this.updateRealFormSchemas()
        this.basicFormHeight = this.calcBasicFormHeight()
        this.calcTableHeight()
      },
      deep: true,
      immediate: true
    },
    apiFn: {
      handler() {
        this.queryData()
      },
      deep: true
    }
  },
  beforeMount() {
    this.realTableColumns = cloneDeep(this.tableColumns)
    this.isImmediateQuery && this.queryData()
    window.addEventListener('resize', this.calcTableHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calcTableHeight)
  },
  methods: {
    updateRealFormSchemas() {
      this.realFormSchemas = cloneDeep(this.formSchemas)
      this.basicFormHeight = this.calcBasicFormHeight()
      this.calcTableHeight()
    },
    handleSelectionChange(val) {
      this.tableSelectList = val
    },
    calcTableHeight() {
      const doc = document.documentElement
      const { height } = doc.getBoundingClientRect()
      // 根据框架组件实际高度+边距计算
      this.tableHeight = height - 70 - this.basicFormHeight - 40 - 62 - this.otherHeight
    },
    async queryData(pn = null) {
      if (pn) this.pageParam.pn = pn
      this.tableRegionLoading = true
      let params = {
        ...this.queryParams,
        ...this.pageParam,
        ...this.sortParams
      }

      if (this.notTransformQueryParams === false) {
        params = queryParamsTransform(params)
      }

      if (isFunction(this.beforeFetch)) {
        params = this.beforeFetch(params)
      }

      if (params) {
        const apiResult = await this.apiFn(params)

        if (apiResult && apiResult.code === 20000) {
          const { total, items } = apiResult.data
          if (isArray(items) && items.length > 0) {
            this.tableData = isFunction(this.afterFetch) ? this.afterFetch(items) : items
          } else {
            this.tableData = []
          }
          this.total = total
        } else {
          if (apiResult && Reflect.has(apiResult, 'msg')) {
            this.$message.error(apiResult.msg)
          }
        }
      }

      this.tableRegionLoading = false
    },
    resetQueryParams() {
      Object.assign(this.queryParams, this.$parent.$options.data().queryParams)
      Object.assign(this.$data.pageParam, this.$options.data().pageParam)

      if (isFunction(this.setDefaultQueryParams)) {
        this.setDefaultQueryParams()
      }

      this.queryData()
    },
    paginationChange(param) {
      this.pageParam.ps = param.limit
      this.pageParam.pn = param.page
      this.queryData()
    },
    changeIsShowMoreForm() {
      this.isShowMoreForm = !this.isShowMoreForm

      this.basicFormHeight = this.calcBasicFormHeight()
      this.calcTableHeight()
    },
    calcBasicFormHeight() {
      let height = 92
      const formSchemasLength = this.realFormSchemas.length
      if (formSchemasLength === 0) {
        height = 0
      } else {
        let rowNums = Math.ceil(formSchemasLength / 4)
        if (this.isShowMoreForm === false && rowNums > 2) {
          rowNums = 2 // 默认只展示两行
        }

        if (rowNums === 1) {
          height = 60
        } else if (rowNums > 2) {
          height = height + (rowNums - 2) * 40
        }
      }

      return height
    },
    sortChange({ column, prop, order }) {
      this.sortParams.field = prop
      this.sortParams.sort = this.sortFields[order]
      this.queryData()
    }
  }
}
</script>
<style lang="scss" scoped>
.basic-layout {
  .table-region {
    margin: 10px 10px 0 10px;
    max-width: 100%;
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #ffffff;
    overflow: hidden;
    color: #303133;
    transition: 0.3s;

    .table-button {
      height: 40px;
      line-height: 40px;
      margin-left: 5px;

      .fixed-right-button {
        float: right;
        margin-right: 5px;
      }
    }

    .basic-table {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
}
</style>
