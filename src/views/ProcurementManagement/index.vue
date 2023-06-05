<template>
  <Breadcrumbs :breadcrumbItems="breadcrumbs" />
  <div class="pa-4">
    <CommonTabs :tabDetails="tabDetails" @onClickTab="handleClickTab"/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/application/Breadcrumbs.vue";
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import TabCommon from "@/models/tab-common";
import router from "@/router";

const tabDetails = [
  { tabTitle: '品目マスター', tabName: 'ItemMaster' },
  { tabTitle: 'メーカーマスター', tabName: 'MakerMaster' },
  { tabTitle: 'PCセットマスター', tabName: 'ItemSet' },
  { tabTitle: 'PCキッティングマスター', tabName: 'KittinMaster'},
] as TabCommon[]
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
    text: "マスター管理",
    disabled: false,
    to: "/procurement_management/master_management",
  },
];

const handleClickTab = (tab: string) => {
  if (router.currentRoute.value.name !== tab) {
    router.push({ name: tab });
  }
}

</script>
