<script>
import { Filter } from '@vicons/tabler'
import { NIcon, NButton } from 'naive-ui'
export default {
  props: {
    btnType: {
      type: String,
      default: 'primary'
    },
    circleStatus: {
      type: Boolean,
      default: false
    },
    btnFunc: {
      type: Function,
      default: () => {}
    }
  },
  setup(props) {
    return {
      props
    }
  },
  components: {
    Filter,
    NIcon,
    NButton
  }
}
</script>

<template>
  <n-button :type="props.btnType" :circle="props.circleStatus" @click="btnFunc" ghost>
    <template #icon>
      <n-icon><Filter /></n-icon>
    </template>
    <slot></slot>
  </n-button>
</template>
