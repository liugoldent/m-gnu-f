<template>
  <n-modal
    v-model:show="props.modalShowStatus"
    :mask-closable="false"
    :on-mask-click="updateModalShowStatus"
  >
    <n-card
      style="width: 600px"
      title="錯誤訊息："
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> 取得資料錯誤 </template>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { NModal, NCard } from 'naive-ui'
export default defineComponent({
  props: {
    modalShowStatus: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  setup(props, { emit }) {
    const updateModalShowStatus = (value) => {
      emit('update:modalShowStatus', value)
    }
    return {
      props,
      updateModalShowStatus // emit往父層更新modalStatus
    }
  },
  components: {
    NModal,
    NCard
  }
})
</script>
