<template>
  <div :class="styles.main">欢迎来到平安云厨ECC 学校业务 平台</div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import styles from "./index.module.scss";

const store = useStore();
const { dispatch } = store;

onMounted(() => {
  dispatch("user/getStudentAction", { pageNum: 1 });
});
</script>
