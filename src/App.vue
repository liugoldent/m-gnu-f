<script>
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { darkTheme, NButton, NSpace, NCard, NConfigProvider } from 'naive-ui'

export default defineComponent({
  setup() {
    return {
      darkTheme,
      theme: ref(null)
    }
  },
  components: {
    NButton,
    NSpace,
    NCard,
    NConfigProvider
  }
})
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/bull">Bull</RouterLink>
        <RouterLink to="/bear">Bear</RouterLink>
      </nav>
    </div>
  </header>
  <n-config-provider :theme="theme">
    <n-card>
      <n-space>
        <n-button @click="theme = darkTheme">深色</n-button>
        <n-button @click="theme = null">浅色</n-button>
      </n-space>
    </n-card>
    <RouterView />
  </n-config-provider>

</template>

<style scoped>
header {
  height: 100px;
  line-height: 1.5;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    width: 100%;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: left;
    font-size: 1rem;
    margin-top: 1rem;
  }
}
</style>
