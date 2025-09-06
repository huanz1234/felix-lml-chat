<script setup>
import { onMounted } from 'vue'
import { useSettingStore } from '@/stores/setting'

const settingStore = useSettingStore()

// 应用主题到document
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark-theme')
  } else {
    document.documentElement.classList.remove('dark-theme')
  }
}

// 组件挂载时应用保存的主题
onMounted(() => {
  applyTheme(settingStore.settings.theme)
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 移除所有过渡动画相关的样式 */
</style>
