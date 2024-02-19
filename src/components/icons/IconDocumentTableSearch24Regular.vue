<script>
import { DocumentTableSearch24Regular } from '@vicons/fluent'
import { NIcon, NButton } from 'naive-ui'
export default {
  props: {},
  components: {
    DocumentTableSearch24Regular,
    NIcon,
    NButton
  }
}
</script>

<template>
  <n-button type="default" @click="$emit('search')">
    <template #icon>
      <n-icon><DocumentTableSearch24Regular /></n-icon>
    </template>
    <slot></slot>
  </n-button>
</template>
