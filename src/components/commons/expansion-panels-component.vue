<template>
  <v-expansion-panels elevation="5">
    <v-expansion-panel v-for="expansion in expansionPanels" :key="expansion">
      <v-expansion-panel-title :expand-icon="`mdi-${expandIcon}`" :collapse-icon="`mdi-${collapseIcon}`">
        <div class="d-flex w-100 justify-space-between pr-4">
          <h4>{{ expansion.panelTitle }}</h4>
          <h4 class="text-blue">開閉</h4>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <slot :name="`content(${expansion.panelContent})`"></slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import ExpansionPanel from '@/models/ExpansionPanel';

const props = defineProps({
  expansionPanels: {
    type: Array<ExpansionPanel>,
    required:true
  },
  expandIcon: {
    type: String,
    default: 'plus'
  },
  collapseIcon: {
    type: String,
    default: 'minus'
  }
})
</script>
<style scoped lang="scss">
:deep(.v-expansion-panel) {
  // border-radius: 0px;
  .v-expansion-panel__shadow {
    // box-shadow: none;
  }
  .v-expansion-panel-title__icon {
    border: 1px #97E4FF solid;
    color: #97E4FF;
    width: 64px;
    height: 24px;
    text-align: center;
    display: flex;
    justify-content: center;
    border-radius: 4px;
  }
}
</style>
