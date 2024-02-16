<template>
  <icon-filter :btn-type="btnType" :circleStatus="false" :btn-func="filterFunc">Filter</icon-filter>
  <TableDatFilter :drawer-active="drawerActive" placement="left" @onMaskClick="onMaskClick"/>
  <div class="table">
    <table-list :viewType="viewType" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import IconFilter from '../components/icons/IconFilter.vue'
import TableList from '../components/TableList.vue'
import TableDatFilter from '../components/TableDataFilter.vue'
export default {
  props: {
    componentType: {
      type: String,
      default: '',
      required: true
    }
  },
  components: {
    TableList,
    IconFilter,
    TableDatFilter
  },
  setup(props) {
    // bear or bull 牛市熊市型態
    const title = ref(props.componentType)
    const viewType = ref('bull')

    watchEffect(() => {
      title.value = props.componentType
      viewType.value = title.value
    })

    // btnType（按鈕樣式）
    const btnType = 'info'

    // 抽屜開啟status
    let drawerActive = ref(false)

    // 點擊btn要做的事情
    let filterFunc = function () {
      drawerActive.value = true
    }
    // 點擊mask要做的事
    const onMaskClick = function(){
      drawerActive.value = false
    }
    return {
      title,
      viewType,
      btnType,
      drawerActive, // 抽屜開啟狀態
      filterFunc, // 點擊btn的func
      onMaskClick
    }
  }
}
</script>

<style>
.table {
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 50px;
}
</style>
