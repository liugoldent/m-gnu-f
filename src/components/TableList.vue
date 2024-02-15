<template>
  <div class="item">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" :bordered="true" />
  </div>
</template>
<script>
import { NDataTable } from 'naive-ui'
export default {
  setup() {
    const createColumns = () => {
      return [
        {
          key: 'code',
          title: '代號'
        },
        {
          key: 'name',
          title: '名稱'
        },
        {
          key: 'close',
          title: '收盤價'
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
    const data = [
      {
        code: '0050',
        name: '元大台灣50',
        close: 135.95,
        volume: 17961,
        updateDay: '2024/02/05',
        buyOrSell: 'bull',
        bias10: 0.57,
        bias20: 1.85
      },
      {
        code: '0056',
        name: '元大高股息',
        close: 36.45,
        volume: 20356,
        updateDay: '2024/02/05',
        buyOrSell: 'bull',
        bias10: 0.46,
        bias20: 0.81
      }
    ]
    return {
      data,
      columns: createColumns(),
      pagination: {
        pageSize: 10
      }
    }
  },
  components: {
    NDataTable
  }
}
</script>
<style scoped>
</style>
