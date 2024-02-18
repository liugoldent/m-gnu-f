<template>
  <n-modal
    v-model:show="props.codeModalShowStatus"
    :mask-closable="false"
    :on-mask-click="updateCodeModalShowStatus"
  >
    <n-card style="width: 300px" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <div class="cardBtnGroupDisplay">
        <h2 class="codeName">{{ props.codeInfoObj.code }} -- {{ props.codeInfoObj.name }}</h2>
        <n-button v-for="(item, index) in linkWeb" @click="handleButtonClick(item)" :key="index">
          {{ item.name }}
        </n-button>
      </div>
    </n-card>
  </n-modal>
</template>

<script>
import { defineComponent } from 'vue'
import { NModal, NCard, NButton } from 'naive-ui'
export default defineComponent({
  props: {
    codeModalShowStatus: {
      type: Boolean,
      default: false,
      required: true
    },
    codeInfoObj: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    }
  },
  setup(props, { emit }) {
    const updateCodeModalShowStatus = (value) => {
      emit('update:codeModalShowStatus', value)
    }
    // 開啟新視窗
    let linkWeb = [
      {
        name: 'yahoo Stock',
        frontHref: 'https://tw.stock.yahoo.com/quote/',
        backHref: ''
      },
      {
        name: '玩股網',
        frontHref: 'https://www.wantgoo.com/stock/',
        backHref: ''
      },
      {
        name: 'Hi Stock 嗨投資',
        frontHref: 'https://histock.tw/stock/',
        backHref: ''
      },
      {
        name: 'PC Home 股市',
        frontHref: 'https://stock.pchome.com.tw/stock/sid',
        backHref: '.html'
      },
      {
        name: 'Goodinfo! 台灣股市資訊網',
        frontHref: 'https://goodinfo.tw/tw/StockDetail.asp?STOCK_ID=',
        backHref: ''
      },
      {
        name: 'anue 鉅亨網',
        frontHref: 'https://invest.cnyes.com/twstock/TWS/',
        backHref: ''
      },
      {
        name: '台灣證券交易所',
        frontHref: 'https://mis.twse.com.tw/stock/fibest.jsp?stock=',
        backHref: ''
      },
      {
        name: '股市爆料同學會',
        frontHref: 'https://www.cmoney.tw/forum/stock/',
        backHref: ''
      }
    ]
    const handleButtonClick = function (webItem) {
      window.open(`${webItem.frontHref}${props.codeInfoObj.code}${webItem.backHref}`, '_blank')
    }
    return {
      props,
      linkWeb, // 要連結的網站名稱
      handleButtonClick,
      updateCodeModalShowStatus // emit往父層更新modalStatus
    }
  },
  components: {
    NModal,
    NCard,
    NButton
  }
})
</script>
<style lang='scss' scoped>
.cardBtnGroupDisplay {
  display: flex;
  flex-direction: column;
  justify-content: center;
  > button {
    margin-bottom: 10px;
  }
  .codeName {
    text-align: center;
  }
}
</style>



