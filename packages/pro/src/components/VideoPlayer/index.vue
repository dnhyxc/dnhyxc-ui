<!--
 * 
 * @author: dnhyxc
 * @since: 2025-05-21
 * index.vue
-->
<template>
  <div class="video-wrap">
    <div class="video" @click="onClick">is a Video Player - {{ count }}</div>
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
.video {
  height: 32px;
  background-color: beige;
}
</style>
