<template>
  <h1>{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a target="_blank" href="https://code.visualstudio.com/">VSCode</a>
    +
    <a
      :key="1"
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code class="px-4 py-2 rounded-4">components/HelloWorld.vue</code> to test hot module
    replacement.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<style lang="less" scoped>
a {
  color: @red;
}

code {
  color: #304455;
  background-color: #eee;
}
</style>
