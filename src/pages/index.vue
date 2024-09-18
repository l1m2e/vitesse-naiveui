<script lang="ts" setup>
import { useTemplateRef } from 'vue'

const mockDialog = useTemplateRef('MockDialog')
</script>

<template>
  <button icon-btn @click="toggleDark()">
    <div i-carbon-sun dark:i-carbon-moon />
  </button>

  <n-button @click="mockDialog?.open">
    打开
  </n-button>
  <MockDialog ref="MockDialog" />
</template>
