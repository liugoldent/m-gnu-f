<template>
  <n-drawer
    v-model:show="props.drawerActive"
    :width="502"
    :placement="placement"
    :on-update:show="() => {}"
    :on-mask-click="onMaskClick"
  >
    <n-drawer-content title="篩選器">
      <n-form ref="formRef" :label-width="80" :model="formValue" size="medium">
        <n-form-item label="收盤價大於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.closeHigherThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="收盤價小於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.closeLowerThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="成交量">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.volumeHigherThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="10日乖離率大於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.bias10HigherThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="10日乖離率小於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.bias10LowerThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="20日乖離率大於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.bias20HigherThan"
            placeholder="輸入數值"
          />
        </n-form-item>
        <n-form-item label="20日乖離率小於">
          <n-input-number
            style="width: 100%"
            v-model:value="formValue.bias20LowerThan"
            placeholder="輸入數值"
          />
        </n-form-item>
      </n-form>
      <template #footer >
        <n-button class="button-margin" @click="resetForm">重設</n-button>
        <n-button class="button-margin" @click="enterToFilter">確認</n-button>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { NDrawer, NDrawerContent, NForm, NFormItem, NInputNumber, NButton } from 'naive-ui'
import { reactive } from 'vue'
export default {
  props: {
    drawerActive: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'left'
    }
  },
  setup(props, { emit }) {
    // 按下遮罩（發送出去讓drawer關掉）
    const onMaskClick = function () {
      emit('onMaskClick', false)
    }
    // 確認後，傳送filter資料出去
    const enterToFilter = function () {
      emit('emitFilterObj', formValue)
      onMaskClick()
    }
    // 重設表格資料
    const resetForm = function () {
      for (const key in formValue) {
        formValue[key] = 0
      }
      emit('emitFilterObj', formValue)
    }
    // 表格資料
    let formValue = reactive({
      bias10HigherThan: 0,
      bias10LowerThan: 0,
      bias20HigherThan: 0,
      bias20LowerThan: 0,
      closeHigherThan: 0,
      closeLowerThan: 0,
      volumeHigherThan: 0
    })
    return {
      props,
      onMaskClick,
      enterToFilter,
      resetForm,
      formValue
    }
  },
  components: {
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NInputNumber,
    NButton
  }
}
</script>
<style scoped>
.button-margin {
  margin-right: 10px; /* 设置右边距为 10px，根据需要调整 */
}
</style>
