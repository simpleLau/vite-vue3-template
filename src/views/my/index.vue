<template>
  <el-button @click="increment">{{ count }}</el-button>
</template>

<script setup lang="ts" name="My">
import { storeToRefs } from 'pinia'
import { useCounterStore } from 'store/count.ts'

const store = useCounterStore()
const { count } = storeToRefs(store)
const { increment } = store
</script>

<style lang="scss" scoped></style>
