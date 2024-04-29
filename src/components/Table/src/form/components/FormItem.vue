<template>
  <el-col :span="6">
    <el-form-item :label="schema.label" :field="schema.field">
      <div style="display: flex">
        <div style="flex: 1">

          <!-- Input输入框 -->
          <el-input
            v-if="schema.component === 'Input'"
            v-model="formModel[schema.field]"
            size="small"
            :placeholder="
              schema.componentProps ? schema.componentProps.placeholder : ''
            "
          />

          <!-- InputTextArea输入框 -->
          <el-input
            v-else-if="schema.component === 'InputTextArea'"
            v-model="formModel[schema.field]"
            size="small"
            type="textarea"
            :rows="1"
            :placeholder="
              schema.componentProps ? schema.componentProps.placeholder : ''
            "
          />

          <!-- DatePicker日期选择 -->
          <div v-else-if="schema.component === 'DatePicker'">
            <el-date-picker
              v-model="formModel[schema.field]"
              style="width: 100%"
              :type="schema.componentProps ? schema.componentProps.type : 'daterange'"
              size="small"
              :value-format="schema.componentProps ? schema.componentProps.valueFormat : 'yyyy-MM-dd'"
            />
          </div>

          <!-- Select选项 -->
          <div v-else-if="schema.component === 'Select'">
            <el-select
              v-model="formModel[schema.field]"
              style="width: 100%"
              clearable
              filterable
              size="small"
              :collapse-tags="true"
              :multiple-limit="
                schema.componentProps ? schema.componentProps.multipleLimit : 0
              "
              :multiple="
                schema.componentProps ? schema.componentProps.multiple : ''
              "
            >
              <el-option
                v-for="item in schema.componentProps.options"
                :key="item.value"
                :label="item[schema.componentProps.optionsLableField]"
                :value="item[schema.componentProps.optionsValueField]"
              />
            </el-select>
          </div>

          <div v-else-if="schema.component === 'Cascader'">
            <el-cascader
              v-model="formModel[schema.field]"
              style="width: 100%"
              :options="schema.componentProps.options"
              :collapse-tags="true"
              :props="
                schema.componentProps ? schema.componentProps.props : ''
              "
              clearable
              filterable
            />
          </div>
        </div>
      </div>
    </el-form-item>
  </el-col>
</template>
<script>
export default {
  name: 'FormItem',
  props: {
    schema: {
      type: Object,
      default: () => {
        return {}
      }
    },
    formModel: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
<style lang="scss">
.el-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list {
  max-width: 400px;
}
.el-select__tags-text {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
