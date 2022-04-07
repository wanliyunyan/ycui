<script lang="ts" setup>
defineEmits(["click"]);
</script>

<template>
  <a-button class="my-button" @click="$emit('click', $event)">
    <slot></slot>
  </a-button>
</template>
<style scoped lang="scss">
.my-button {
  background-color: red;
}
</style>
