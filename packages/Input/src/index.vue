<script lang="ts" setup>
defineEmits(["change"]);
</script>

<template>
  <a-input class="my-input" @change="$emit('change', $event)">
    <slot></slot>
  </a-input>
</template>
<style scoped lang="scss">
.my-input {
  background-color: green;
}
</style>
