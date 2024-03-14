<template>
  <TableDatFilter
    :drawer-active="drawerActive"
    placement="left"
    @onMaskClick="onMaskClick"
    @emitFilterObj="emitFilterObj"
  />
  <div class="table">
    <table-list :viewType="viewType" :filter-obj="filterObj"
      ><icon-filter
        :btn-type="btnType"
        :circleStatus="false"
        :btn-func="filterFunc"
        class="iconFilter"
        >Filter</icon-filter
      ></table-list
    >
  </div>
</template>

<script>
import { ref, watchEffect, reactive } from 'vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import TableList from '@/components/TableList.vue'
import TableDatFilter from '@/components/TableDataFilter.vue'
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

    // 點擊filter btn：開啟drawer
    let filterFunc = function () {
      drawerActive.value = true
    }
    // 點擊mask要做的事
    const onMaskClick = function () {
      drawerActive.value = false
    }
    // 按確認後，傳上來的filter資料
    let filterObj = reactive({
      bias10HigherThan: 0,
      bias10LowerThan: 0,
      bias20HigherThan: 0,
      bias20LowerThan: 0,
      closeHigherThan: 0,
      closeLowerThan: 0,
      volumeHigherThan: 0
    })
    const emitFilterObj = function (obj) {
      Object.assign(filterObj, obj)
    }
    return {
      title,
      viewType,
      btnType,
      filterObj,
      drawerActive, // 抽屜開啟狀態
      filterFunc, // 點擊btn的func
      onMaskClick,
      emitFilterObj //
    }
  }
}
</script>

<style scoped>
.iconFilter {
  margin-bottom: 10px;
}
.table {
  width: 80%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
