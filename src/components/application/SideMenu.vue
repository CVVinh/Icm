<template>
  <v-navigation-drawer
    app
    permanent
    :color="backgroundColor"
    v-model="isDrawerOpen"
  >
    <Drawer />
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import Drawer from "@/components/application/Drawer.vue";
import { computed } from "@vue/reactivity";

const props = defineProps({
  drawer: {type: Boolean, require: true},
  backgroundColor: {type: String, default: 'white'}
});
const emit = defineEmits(['update:drawer']);

const isDrawerOpen = computed({
  get: () => props.drawer,
  set: (val) => {
    emit('update:drawer', val)
  }
})

</script>
