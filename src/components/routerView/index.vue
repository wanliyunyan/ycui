<script lang="ts" setup></script>
<template>
  <div>
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <transition mode="out-in">
          <div>
            <suspense>
              <component :is="Component" />
              <template #fallback>
                <div>加载中...</div>
              </template>
            </suspense>
          </div>
        </transition>
      </template>
    </router-view>
  </div>
</template>
