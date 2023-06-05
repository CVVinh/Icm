<template>
  <Breadcrumbs :breadcrumbItems="breadcrumbs" />
  <div class="pa-4">TOP page / TOPページ</div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/application/Breadcrumbs.vue";
const breadcrumbs = [
  {
    text: "TOP",
    disabled: false,
    to: "/Top",
  },
];
</script>
