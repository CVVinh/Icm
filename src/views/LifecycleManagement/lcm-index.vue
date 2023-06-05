<template>
  <Breadcrumbs :breadcrumbItems="breadcrumbs" />
  <v-container>
    <CommonTabs :tabDetails="tabDetails" @onClickTab="handleClickTab" />
    <RouterView />
  </v-container>
</template>

<script setup lang="ts">
import Breadcrumbs from "@/components/application/Breadcrumbs.vue";
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import TabCommon from "@/models/tab-common";
import { useRouter } from "vue-router";

const tabDetails = [
  { tabTitle: "PCセット・単体PC・機器", tabName: "Hardware Management" },
  { tabTitle: "ライセンス", tabName: "Software Management" },
] as TabCommon[];

const breadcrumbs = [
  {
    text: "TOP",
    disabled: false,
    to: "/Top",
  },
  {
    text: "ライフサイクル統合資産管理",
    disabled: true,
    to: "/Top",
  },
  {
    text: "ライフサイクル統合資産管理",
    disabled: false,
    to: "/lifecycle-management",
  },
];

const router = useRouter();

const handleClickTab = (tab: string) => {
  if (router.currentRoute.value.name !== tab) {
    router.push({ name: tab });
  }
};
</script>
