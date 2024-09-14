<script lang="ts" setup>
const schema = [
  { label: 'xx1', field: 'xx', component: 'n-input', span: 12 },
  { label: 'xx2', field: 'xx2', component: 'n-input', span: 12 },
]
</script>

<template>
  <button icon-btn @click="toggleDark()">
    <div i-carbon-sun dark:i-carbon-moon />
  </button>
  <Form :schema />
</template>
