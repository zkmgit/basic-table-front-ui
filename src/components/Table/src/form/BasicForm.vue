<template>
  <div class="basic-form" :style="{ height: `${basicFormHeight}px` }">
    <el-form
      ref="form"
      :label-width="labelWidth"
      :label-position="labelPosition"
      :size="size"
      :model="queryParams"
    >
      <el-row>
        <div
          v-for="(schema, index) in formSchemas"
          :key="`${schema.field}${index}`"
        >
          <form-item :form-model="queryParams" :schema="schema" />
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { basicProps } from './props'
import FormItem from './components/FormItem.vue'

export default {
  name: 'BasicForm',
  components: { FormItem },
  props: basicProps,
  data() {
    return {
      getSchema: []
    }
  },
  mounted() {
    this.getSchema = this.formSchemas
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.basic-form {
  margin: 10px;
  border-radius: 4px;
  border: 1px solid #e6ebf5;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;

  .el-form {
    margin: 10px;
    ::v-deep .el-form-item {
      margin-bottom: 5px;
    }

    .el-row {
      ::v-deep .el-col {
        max-height: 40px;
      }
    }
  }
}
</style>
