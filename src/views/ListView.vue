<template>
  <div class="about">
    <table-list />
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import TableList from '../components/TableList.vue'
export default {
  props: {
    componentType: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    TableList
  },
  setup(props) {
    const title = ref(props.componentType)
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    const message = computed(() => {
      return `Count is: ${count.value}`
    })

    watchEffect(() => {
      title.value = props.componentType
    })

    return {
      count,
      increment,
      message,
      title
    }
  }
}
</script>

<style>
.about {
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 50px;
}
</style>
