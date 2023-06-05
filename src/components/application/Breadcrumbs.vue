<template>
  <v-breadcrumbs :items="breadcrumbItems">
    <template v-slot:divider>
      <v-icon>{{`mdi-${dividerIcon}`}}</v-icon>
    </template>
  </v-breadcrumbs>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  dividerIcon: {type: String, default: 'chevron-right'},
  breadcrumbItems: {type: Array, required: true}
})
</script>
