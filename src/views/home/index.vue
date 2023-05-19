<template>
  <div class="msg">{{ msg }}</div>
</template>

<script setup lang="ts" name="Home">
import { ref } from 'vue'

const msg = ref(import.meta.env.VITE_APP_BASE_URL)
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';

.msg {
  color: $primary-color;
}
</style>
