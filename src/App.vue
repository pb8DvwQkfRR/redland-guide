<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="['BoothsPage', 'ParadePage', 'StagePage', 'PinsPage']">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <TabBar v-if="showTab" />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

const route = useRoute()
// 底栏常驻（用户 9/28：展位攻略等按钮栏冻结常驻），详情页也显示；只有开发者模式 #/dev 不挂
const showTab = computed(() => route.name !== 'dev')
</script>
