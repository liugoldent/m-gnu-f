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
        <n-form-item label="收盤價">
          <n-input-number style="width: 100%;" v-model:value="formValue.close" placeholder="输入數值" />
        </n-form-item>
        <n-form-item label="成交量">
          <n-input-number style="width: 100%;" v-model:value="formValue.volume" placeholder="输入數值" />
        </n-form-item>
        <n-form-item label="10日乖離率">
          <n-input-number style="width: 100%;" v-model:value="formValue.bias10" placeholder="输入數值" />
        </n-form-item>
        <n-form-item label="20日乖離率">
          <n-input-number style="width: 100%;" v-model:value="formValue.bias20" placeholder="输入數值" />
        </n-form-item>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<script>
import { NDrawer, NDrawerContent, NForm, NFormItem, NInputNumber } from 'naive-ui'
import { ref } from 'vue'
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
    const onMaskClick = function () {
      emit('onMaskClick', false)
    }
    return {
      props,
      onMaskClick,
      formValue: ref({
        bias10: 0,
        bias20: 0,
        close: 0,
        volume: 0
      })
    }
  },
  components: {
    NDrawer,
    NDrawerContent,
    NForm,
    NFormItem,
    NInputNumber
  }
}
</script>
<style scoped>
</style>
