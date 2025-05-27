<!--
 * 
 * @author: dnhyxc
 * @since: 2025-05-21
 * index.vue
-->
<template>
  <div class="button-wrap">
    <div @click="onClick">Button</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

const onClick = () => {
  count.value++;
  console.log('count', count.value);
};
</script>
<style scoped lang="less">
.button-wrap {
  width: 100px;
  height: 32px;
  background-color: antiquewhite;
}
</style>
