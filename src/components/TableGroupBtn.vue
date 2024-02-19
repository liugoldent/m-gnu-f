<template>
  <n-button-group size="small">
    <n-button type="default" round>
      <template #icon>
        <n-icon><log-in-icon /></n-icon>
      </template>
      活着
    </n-button>
    <n-button type="default">
      <template #icon>
        <n-icon><log-in-icon /></n-icon>
      </template>
      其实
    </n-button>
    <n-button type="default">
      <template #icon>
        <n-icon><log-in-icon /></n-icon>
      </template>
      很好
    </n-button>
  </n-button-group>
</template>

<script>
import { NButtonGroup, NButton, NIcon } from 'naive-ui'

export default {
  components: {
    NButtonGroup,
    NButton,
    NIcon
  }
}
</script>
<style scoped></style>
