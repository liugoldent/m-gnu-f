<template>
  <div class="layout">
    <div class="mainCharts" ref="chart"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted, ref, getCurrentInstance } from 'vue'
export default {
  setup() {
    const { proxy } = getCurrentInstance()
    const fetchData = async function () {
      proxy.$axios
        .post(`/crawler/echarts`)
        .then((res) => {
          const { data } = res
          date = data['updateDay']
          bullList = data['bull']
          bearList = data['bear']
          init()
        })
        .catch((err) => {
          console.log(err)
        })
    }
    onMounted(async () => {
      await fetchData()
    })
    // 圖表初始化
    let chart = ref(null)
    let date = []
    let bullList = []
    let bearList = []
    function init() {
      let myChart = echarts.init(chart.value)
      let options = {
        title: {
          text: '10-20均線交叉數量'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Bull', 'Bear']
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // prettier-ignore
            data: date
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Bull',
            type: 'bar',
            data: bullList,
            markPoint: {
              data: []
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: {
              color: 'rgba(255, 0, 0, 0.7)'
            }
          },
          {
            name: 'Bear',
            type: 'bar',
            data: bearList,
            markPoint: {
              data: []
            },
            markLine: {
              data: [{ type: 'average', name: 'Avg' }]
            },
            itemStyle: {
              color: 'rgba(0, 128, 0, 0.7)'
            }
          }
        ]
      }
      // 渲染图表
      myChart.setOption(options)
      window.addEventListener(
        'resize',
        () => {
          myChart.resize()
        },
        false
      )
    }
    return {
      chart
    }
  },
  components: {}
}
</script>
<style lang="scss">
.layout {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainCharts {
  color: white;
  width: 90%;
  height: 90%;
}
</style>
