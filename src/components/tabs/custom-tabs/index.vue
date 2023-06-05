<template>
  <v-tabs color="#2DC8FF" align-tabs="start" v-model="stateTab" :height="35" v-on:update:model-value="tabChange">
    <v-tab v-for="tabDetail in tabDetails" selected-class="" @click="onClickTab(tabDetail.tabName)">
      {{ tabDetail.tabTitle }}
    </v-tab>
  </v-tabs>
</template>
<script lang="ts" setup>
import TabCommon from '@/models/tab-common';
import router from '@/router';
import { onMounted, PropType, ref } from 'vue';

onMounted(() => {
  const tabName = props.tabName || router.currentRoute.value.name;
  const indexOfTab = props.tabDetails.findIndex(tab => tab.tabName === tabName);
  stateTab.value = indexOfTab;
})
const props = defineProps({
  tabDetails: {
    type: Array as PropType<Array<TabCommon>>,
    required: true
  },
  tabName: {
    type: String
  }
});
const emit = defineEmits(['tabChange', 'onClickTab']);
const stateTab = ref(0);

const tabChange = (event: any) => {
  emit('tabChange', event);
}

const onClickTab = (tab: String) => {
  emit('onClickTab', tab);
}
</script>
<style lang="scss" scoped>

</style>
