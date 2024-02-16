<template>
  <div class="item">
    <IconDocumentTableSearch24RegularVue
      class="btn"
      searchType="cross1020"
      @search="search('cross1020')"
      >10-20交叉</IconDocumentTableSearch24RegularVue
    >
    <n-data-table
      ref="table"
      :columns="columns"
      :data="tableData"
      :pagination="pagination"
      :bordered="true"
    />
    <ApiErrorModalVue
      :modal-show-status="modalShowStatus"
      @update:modalShowStatus="updateModalShowStatusFunc"
    />
  </div>
</template>
<script>
import { NDataTable, NSpace, NButton } from 'naive-ui'
import IconDocumentTableSearch24RegularVue from './icons/IconDocumentTableSearch24Regular.vue'
import ApiErrorModalVue from './ApiErrorModal.vue'
import { getCurrentInstance, ref, watch, toRefs } from 'vue'

export default {
  props: {
    viewType: {
      type: String,
      default: 'bull',
      required: true
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
          // defaultSortOrder: 'ascend',
          sorter: 'default'
        },
        {
          key: 'volume',
          title: '成交量'
        },
        {
          key: 'updateDay',
          title: '更新日期'
        },
        {
          key: 'bias10',
          title: '10日乖離率'
        },
        {
          key: 'bias20',
          title: '20日乖離率'
        }
      ]
    }
    const search = async function (type) {
      let day = '2024-02-15'
      proxy
        .$axios({
          url: `/crawler/goodInfo/${type}/${day}/${props.viewType}`
        })
        .then((res) => {
          tableData.value = res.data[props.viewType].sort((a,b) => b.close - a.close)
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
      sortClose
    }
  },
  components: {
    NDataTable,
    IconDocumentTableSearch24RegularVue,
    ApiErrorModalVue,
    NSpace,
    NButton
  }
}
</script>
<style scoped>
.item {
  display: flex;
  flex-direction: column;
}
.btn {
  margin-bottom: 10px;
}
</style>
