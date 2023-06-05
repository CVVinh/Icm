<template>
  <Breadcrumbs :breadcrumbItems="breadcrumbs" />
  <div class="pa-4">Arrival Management / 入荷管理</div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/application/Breadcrumbs.vue";

const breadcrumbs = [
  {
    text: "TOP",
    disabled: false,
    to: "/Top",
  },
  {
    text: "調達管理",
    disabled: true,
    to: "/procurement_management",
  },
  {
    text: "入荷管理",
    disabled: false,
    to: "/procurement_management/arrival_management",
  },
];
</script>
