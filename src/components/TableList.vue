<template>
  <div class="item">
    <div class="itemCheckBox">
      <n-checkbox v-model:checked="listType" checked-value="list"> 單日列表 </n-checkbox>
      <n-checkbox v-model:checked="listType" checked-value="difference"> 兩日交集 </n-checkbox>
    </div>
    <n-date-picker
      v-if="listType === 'list'"
      class="elementMargin"
      v-model:value="timestamp"
      type="date"
    />
    <n-date-picker
      v-else
      class="elementMargin"
      v-model:value="dateRange"
      type="daterange"
      clearable
    />
    <div class="searchTypeClass">
      <IconDocumentTableSearch24RegularVue
        class="elementMargin"
        searchType="cross1020"
        @search="search('cross1020')"
        >10-20交叉</IconDocumentTableSearch24RegularVue
      >
      <IconDocumentTableSearch24RegularVue
        class="elementMargin"
        searchType="cross0520"
        @search="search('cross0520')"
        >05-20交叉</IconDocumentTableSearch24RegularVue
      >
      <!-- <IconDocumentTableSearch24RegularVue
        class="elementMargin"
        searchType="cross051020"
        @search="search('cross051020')"
        >05-10-20交叉</IconDocumentTableSearch24RegularVue
      > -->
    </div>
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
import { NDataTable, NDatePicker, NCheckbox } from 'naive-ui'
import IconDocumentTableSearch24RegularVue from './icons/IconDocumentTableSearch24Regular.vue'
import ApiErrorModalVue from './ApiErrorModal.vue'
import CodeLinkModal from './CodeLinkModal.vue'
import { getCurrentInstance, ref, watch, toRefs, watchEffect, onMounted } from 'vue'
import { getPreviousDayTimestamp, getPreviousTwoDays } from '@/assets/date'
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
    let listType = ref('list')
    let timestamp = ref(getPreviousDayTimestamp())
    // 搜尋資料-1：取得日期
    const getDateStr = function (dateNumber) {
      const date = new Date(dateNumber)
      const year = date.getFullYear()
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // 注意月份需要加1，并且补零
      const day = ('0' + date.getDate()).slice(-2) // 注意日期需要补零
      return `${year}-${month}-${day}`
    }
    // 搜尋資料：先決定是哪種type來丟到後端
    const decideApiDetail = function () {
      let obj = {}
      if (listType.value === 'list') {
        obj['data'] = {
          day1: getDateStr(timestamp.value)
        }
      }
      if (listType.value === 'difference') {
        obj['data'] = {
          day1: getDateStr(dateRange.value[0]),
          day2: getDateStr(dateRange.value[1])
        }
      }
      return obj
    }
    // 搜尋資料-2：主程式
    const search = async function (crossType) {
      const apiDetail = decideApiDetail()
      proxy.$axios
        .post(`/crawler/goodInfo/${crossType}/${listType.value}/${props.viewType}`, {
          day: apiDetail['data']
        })
        .then((res) => {
          if (res.data[props.viewType].length > 0) {
            tableData.value = res.data[props.viewType].sort((a, b) => b.close - a.close)
            tableAllData.value = JSON.parse(JSON.stringify(tableData.value))
          } else {
            tableData.value = []
            tableAllData.value = []
          }
        })
        .catch((err) => {
          modalShowStatus.value = true
          tableData.value = []
          tableAllData.value = []
          console.log(err)
        })
    }
    // 搜尋資料-3：交集的日期設定
    let defaultDate = getPreviousTwoDays()
    let dateRange = ref([defaultDate.previousTwoDays, defaultDate.previousDay]) // 多日差集的時間列表
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
            tempTableAllData = tempTableAllData.filter((item) => item[filterKey] >= filterValue)
          }
          if (passStatus(filterValue) && key.includes('Lower')) {
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
      codeInfoObj,
      listType, // 單日列表 or 多日差集的checkbox value
      dateRange // 多日差集的時間列表
    }
  },
  components: {
    NDataTable,
    IconDocumentTableSearch24RegularVue,
    ApiErrorModalVue,
    NDatePicker,
    CodeLinkModal,
    NCheckbox
  }
}
</script>
<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.itemCheckBox {
  margin-bottom: 10px;
}
.elementMargin {
  margin-bottom: 10px;
}
.searchTypeClass {
  display: flex;
  overflow: auto;
  > .n-button {
    flex: 1;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
