<template>
  <v-footer :class="[`bg-${backgroundColor}`, 'footer']">
    <div class="pa-4">
      <p>© 2023 LOSPEC Co.,Ltd.</p>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const props = defineProps({
  backgroundColor: { type: String, default: "white" },
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: end;
  max-height: 72px;
}
</style>
