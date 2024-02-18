<script setup>
</script>

<template>
  <main>
    <div class="logo">
      <div class="container">
        <div
          class="circle"
          :style="{
            color: randomNumberBorderColor()
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
            borderColor: randomNumberBorderColor()
          }"
          class="circleMore"
        ></div>
      </div>
    </div>
  </main>
</template>
<script>
import colors from '../assets/color.js'
export default {
  setup() {
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
    let randomNumberBorderColor = function () {
      let borderIndex = Math.floor(Math.random() * 50)
      if (colors[borderIndex]) {
        let values = Object.values(colors[borderIndex])
        console.log(values)
        return values[0]
      }
      return 'black'
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
</style>
