<!--
 * 
 * @author: dnhyxc
 * @since: 2025-05-21
 * index.vue
-->
<template>
  <div class="button-wrap">
    <div class="button" @click="onClick">{{ count.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Button {
  count: number;
  text: string;
}

const count = ref<Button>({
  count: 0,
  text: 'this is a Button'
});
const onClick = () => {
  count.value.count++;
  count.value.text = 'this is a Button' + count.value.count;
  console.log('count', count.value);
};
</script>
<style scoped lang="less">
.button {
  height: 32px;
  background-color: skyblue;
}
</style>
