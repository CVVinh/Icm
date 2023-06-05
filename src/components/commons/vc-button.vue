<template>
  <v-btn
    :class="['vc-button text-none', { 'v-btn--loading': loading }]"
    :loading="loading"
    :disabled="loading"
    @click="onClicked"
    color="primary"
  >
    <slot></slot>
    <span class="loader">
      <v-icon light>mdi-cached</v-icon>
    </span>
  </v-btn>
</template>

<script setup lang="ts">
  defineProps<{
    loading?: boolean
  }>()

  const emit = defineEmits(['click'])

  const onClicked = () => {
    emit('click')
  }
</script>
