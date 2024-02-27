<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'
import { darkTheme, NButton, NIcon, NSpace, NConfigProvider, NSwitch } from 'naive-ui'
import { DarkModeRound, LightModeOutlined } from '@vicons/material'
export default defineComponent({
  setup() {
    onMounted(() => {
      const value = localStorage.getItem('mGnuDarkMode')
      if (value === 'mGnuWebLight') {
        toLightMode()
      }
      if (value === 'mGnuWebDark') {
        toDarkMode()
      }
    })
    let theme = ref(null)
    // 改變darkMode or LightMode的function
    const toDarkMode = function () {
      localStorage.setItem('mGnuDarkMode', 'mGnuWebDark')
      theme.value = darkTheme
    }
    const toLightMode = function () {
      localStorage.setItem('mGnuDarkMode', 'mGnuWebLight')
      theme.value = null
    }
    // switchUpdate Func（開關切換的動作）
    const router = useRouter()
    const handleUpdateValue = function (value) {
      router.push(`/cross/${value}`)
    }
    return {
      darkTheme,
      theme,
      toDarkMode,
      toLightMode,
      handleUpdateValue,
      railStyle: ({ focused, checked }) => {
        const style = {}
        if (checked) {
          style.background = '#d03050'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#008000'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      },
      activeValue: ref('bull')
    }
  },
  components: {
    NButton,
    NSpace,
    NIcon,
    DarkModeRound,
    LightModeOutlined,
    NConfigProvider,
    NSwitch
  }
})
</script>

<template>
  <div :style="{ background: theme === null ? 'white' : 'black' }">
    <header>
      <div>
        <nav>
          <RouterLink to="/" style="color: gray;">Home</RouterLink>
          <n-switch
            :rail-style="railStyle"
            checked-value="bull"
            unchecked-value="bear"
            @update:value="handleUpdateValue"
            v-model:value="activeValue"
          >
            <template #checked> 多方交叉 </template>
            <template #unchecked> 空方交叉 </template>
          </n-switch>
        </nav>
      </div>
    </header>
    <n-config-provider :theme="theme" class="nConfigProvider">
      <n-space class="nSpacePosition">
        <n-button v-if="theme === null" @click="toDarkMode"
          ><n-icon><DarkModeRound /></n-icon
        ></n-button>
        <n-button v-else @click="toLightMode"
          ><n-icon><LightModeOutlined /></n-icon
        ></n-button>
      </n-space>
      <RouterView />
    </n-config-provider>
  </div>
</template>

<style scoped>
.nConfigProvider {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
header {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  display: flex;
  align-items: center;
}

nav a.router-link-exact-active {
  color: gray;
  text-decoration: underline;
  border-left: 1px solid var(--color-border);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  font-size: 20px;
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none; /* 移除底线 */
}

nav a:first-of-type {
  border: 0;
}

.nSpacePosition {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
