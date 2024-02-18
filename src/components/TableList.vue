<template>
  <div class="item">
    <n-date-picker class="elementMargin" v-model:value="timestamp" type="date" />
    <IconDocumentTableSearch24RegularVue
      class="elementMargin"
      searchType="cross1020"
      @search="search('cross1020')"
      >10-20交叉</IconDocumentTableSearch24RegularVue
    >
    <slot></slot>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :bordered="true"
      :row-props="rowProps"
    />
    <ApiErrorModalVue
      :modal-show-status="modalShowStatus"
      @update:modalShowStatus="updateModalShowStatusFunc"
    />
    <CodeLinkModal
      :code-info-obj="codeInfoObj"
      :code-modal-show-status="codeModalShowStatus"
      @update:codeModalShowStatus="updateCodeModalShowStatusFunc"
    ></CodeLinkModal>
  </div>
</template>
<script>
import { NDataTable, NDatePicker } from 'naive-ui'
import IconDocumentTableSearch24RegularVue from './icons/IconDocumentTableSearch24Regular.vue'
import ApiErrorModalVue from './ApiErrorModal.vue'
import CodeLinkModal from './CodeLinkModal.vue'
import { getCurrentInstance, ref, watch, toRefs, watchEffect } from 'vue'

export default {
  props: {
    viewType: {
      type: String,
      default: 'bull',
      required: true
    },
    filterObj: {
      type: Object,
      default: () => {
        return {
          bias10HigherThan: 0,
          bias10LowerThan: 0,
          bias20HigherThan: 0,
          bias20LowerThan: 0,
          closeHigherThan: 0,
          closeLowerThan: 0,
          volumeHigherThan: 0
        }
      }
    }
  },
  setup(props) {
    const { proxy } = getCurrentInstance()
    // modal系列
    const modalShowStatus = ref(false)
    const updateModalShowStatusFunc = function () {
      modalShowStatus.value = false
    }
    // table系列
    let tableData = ref([])
    let tableAllData = ref([])
    const tableRef = ref(null)
    const createColumns = () => {
      return [
        {
          key: 'code',
          title: '代號',
          minWidth: 100
        },
        {
          key: 'name',
          title: '名稱',
          minWidth: 150
        },
        {
          key: 'close',
          title: '收盤價',
          sorter: 'default'
        },
        {
          key: 'volume',
          title: '成交量',
          sorter: 'default'
        },
        {
          key: 'updateDay',
          title: '更新日期'
        },
        {
          key: 'bias10',
          title: '10日乖離率',
          sorter: 'default'
        },
        {
          key: 'bias20',
          title: '20日乖離率',
          sorter: 'default'
        }
      ]
    }
    // 搜尋資料
    let timestamp = ref(new Date().getTime())
    // 搜尋資料-1：取得日期
    const getDateStr = function (dateNumber) {
      const date = new Date(dateNumber)
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // 注意月份需要加1，并且补零
      const day = ('0' + date.getDate()).slice(-2) // 注意日期需要补零
      return `${year}-${month}-${day}`
    }
    // 搜尋資料-2：主程式
    const search = async function (type) {
      let day = getDateStr(timestamp.value)
      proxy
        .$axios({
          url: `/crawler/goodInfo/${type}/${day}/${props.viewType}`
        })
        .then((res) => {
          tableData.value = res.data[props.viewType].sort((a, b) => b.close - a.close)
          tableAllData.value = JSON.parse(JSON.stringify(tableData.value))
        })
        .catch((err) => {
          modalShowStatus.value = true
          console.log(err)
        })
    }
    // 清空tableData
    const { viewType } = toRefs(props)
    watch(viewType, () => {
      tableData.value = []
    })

    // 排序資料
    const sortClose = function () {
      tableRef.value.sort('close', 'ascend')
    }
    // filter更新
    watchEffect(() => {
      try {
        let tempTableAllData = JSON.parse(JSON.stringify(tableAllData.value))
        let passStatus = function (value) {
          return value !== null && value !== 0
        }
        const filterConditions = {
          closeHigherThan: 'close',
          closeLowerThan: 'close',
          volumeHigherThan: 'volume',
          bias10HigherThan: 'bias10',
          bias10LowerThan: 'bias10',
          bias20HigherThan: 'bias20',
          bias20LowerThan: 'bias20'
        }
        for (const key in filterConditions) {
          const filterKey = filterConditions[key]
          const filterValue = props.filterObj[key]

          if (passStatus(filterValue) && key.includes('Higher')) {
            console.log('1')
            tempTableAllData = tempTableAllData.filter((item) => item[filterKey] >= filterValue)
          }
          if (passStatus(filterValue) && key.includes('Lower')) {
            console.log('2')
            tempTableAllData = tempTableAllData.filter((item) => item[filterKey] <= filterValue)
          }
        }
        tableData.value = tempTableAllData
      } catch (error) {
        console.log(error)
      }
    })
    // 每列事件
    let codeModalShowStatus = ref(false)
    let codeInfoObj = ref({})
    const handleRowClick = function (row) {
      codeModalShowStatus.value = true
      codeInfoObj.value = row
    }
    // 關閉code modal
    const updateCodeModalShowStatusFunc = function () {
      codeModalShowStatus.value = false
    }
    return {
      tableData,
      columns: createColumns(), // table的欄位名稱
      pagination: {
        pageSize: 10
      },
      updateModalShowStatusFunc, // 更新modal的開啟狀態
      modalShowStatus, // modal的開啟狀態
      search, // 打api取得資料的function
      table: tableRef,
      sortClose,
      timestamp,
      rowProps: (row) => {
        return {
          style: 'cursor: pointer;',
          onClick: () => {
            handleRowClick(row)
          }
        }
      },
      codeModalShowStatus,
      updateCodeModalShowStatusFunc,
      codeInfoObj
    }
  },
  components: {
    NDataTable,
    IconDocumentTableSearch24RegularVue,
    ApiErrorModalVue,
    NDatePicker,
    CodeLinkModal
  }
}
</script>
<style scoped>
.item {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.elementMargin {
  margin-bottom: 10px;
}
</style>
