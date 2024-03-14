<script setup></script>

<template>
  <main>
    <div class="logo">
      <div class="container">
        <div
          class="circle"
          :style="{
            color: randomNumberBorderColor(0)
          }"
        >
          MGnu
        </div>
        <div
          v-for="index in 10"
          :key="index"
          :style="{
            top: randomNumberPx(index),
            left: randomNumberPx(index),
            right: randomNumberPx(index),
            bottom: randomNumberPx(index),
            borderWidth: randomNumberBorder(),
            borderColor: randomNumberBorderColor(index)
          }"
          class="circleMore"
        ></div>
      </div>
    </div>
  </main>
</template>
<script>
import colors from '@/assets/color.js'
export default {
  setup() {
    let baseNumber = Math.floor(Math.random() * 10)
    // 位移寬度
    let randomNumberPx = function (index) {
      let number = Math.random()
      if (number >= 0.5) {
        return `${Math.random() + index}px`
      } else {
        return `-${Math.random() + index}px`
      }
    }
    // border 寬度
    let randomNumberBorder = function () {
      return `${Math.random() * (5 - 1) + 1}px`
    }
    // border 顏色
    let randomNumberBorderColor = function (index) {
      let values = Object.values(colors[baseNumber * 10 + index])
      return values[0]
    }
    return {
      randomNumberPx,
      randomNumberBorder,
      randomNumberBorderColor
    }
  },
  components: {}
}
</script>
<style>
.logo {
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.circleMore {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: solid;
  position: absolute;
}

.circle {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: solid;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-size: 35px;
  font-weight: bold;
  /* animation: gradient 5s linear infinite; */
}
@media screen and (max-width: 300px) {
  .circle, .circleMore {
    width: 100px;
    height: 100px;
  }
}
</style>
