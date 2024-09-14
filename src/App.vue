<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <main font-sans>
    <n-config-provider :theme="isDark ? darkTheme : null">
      <RouterView />
    </n-config-provider>
  </main>
</template>
