<template>
  <v-container>
    {{ $attrs.name }}
  </v-container>
  <div class="pa-4">
    <CommonTabs :tabDetails="tabDetails" @onClickTab="handleClickTab"/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import TabCommon from "@/models/tab-common";
import router from "@/router";

const tabDetails = [
  { tabTitle: '資産運用管理', tabName: 'AssetManagement' },
  { tabTitle: '出荷受付（＆利用者登録）', tabName: 'ShippingManagement' },
] as TabCommon[]

const handleClickTab = (tab: string) => {
  if (router.currentRoute.value.name !== tab) {
    router.push({ name: tab });
  }
}

</script>
