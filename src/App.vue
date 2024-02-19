<script>
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue'
import { darkTheme, NButton, NIcon, NSpace, NConfigProvider } from 'naive-ui'
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
    return {
      darkTheme,
      theme,
      toDarkMode,
      toLightMode
    }
  },
  components: {
    NButton,
    NSpace,
    NIcon,
    DarkModeRound,
    LightModeOutlined,
    NConfigProvider
  }
})
</script>

<template>
  <div :style="{ background: theme === null ? 'white' : 'black' }">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/bull">Bull</RouterLink>
          <RouterLink to="/bear">Bear</RouterLink>
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
