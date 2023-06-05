<template>
  <v-row class="pa-0 ma-0" justify="center">
    <v-dialog v-model="dialogListItemProcurement" persistent>
      <v-card>
        <v-container class="d-flex justify-end">
          <v-btn density="compact" @click="onClickClose" size="large"
            >戻る</v-btn
          >
        </v-container>
        <v-container>
          {{ $attrs.name }}
        </v-container>
        <v-container class="pb-0">
          <CommonTabs
            :tabDetails="tabDetails"
            @onClickTab="handleClickTab"
            :tab-name="displayProcurement"
          />
        </v-container>
        <template v-if="displayProcurement === 'content0'">
          <ItemListModal @onAddItem="getItem"></ItemListModal>
        </template>
        <template v-if="displayProcurement === 'content1'">
          <ItemSetListModal @onAddItem="getItemSet"></ItemSetListModal>
        </template>
        <template v-if="displayProcurement === 'content2'">
          <licenceListModal @onAddItem="licenceGetItem"></licenceListModal>
        </template>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CommonTabs from "@/components/tabs/custom-tabs/index.vue";
import ItemSetListModal from "@/components/modal/commonItemSetListModal.vue";
import ItemListModal from "@/components/modal/commonItemListModal.vue";
import licenceListModal from "@/components/modal/licenceListModal.vue";

import TabCommon from "@/models/tab-common";
const dialogListItemProcurement = ref(false);
const displayProcurement = ref("content0");

const tabDetails = [
  { tabTitle: "PC・機器", tabName: "content0" },
  { tabTitle: "PCセット", tabName: "content1" },
  { tabTitle: "クラウドライセンス", tabName: "content2" },
] as TabCommon[];

const handleClickTab = (tab: string) => {
  displayProcurement.value = tab;
};

const onClickClose = () => {
  dialogListItemProcurement.value = false;
};

const openDialogItemListProcurement = async (addingState: any) => {
  displayProcurement.value =
    addingState == 0
      ? "content0"
      : addingState == 1
      ? "content1"
      : "content2";
  dialogListItemProcurement.value = true;
};

const emit = defineEmits(["getItemSet", "getItem", "licenceGetItem"]);

const getItemSet = (value: any) => {
  emit("getItemSet", value);
  onClickClose();
};

const getItem = (value: any) => {
  emit("getItem", value);
  onClickClose();
};

const licenceGetItem = (value: any) => {
  emit("licenceGetItem", value);
  onClickClose();
};

defineExpose({
  openDialogItemListProcurement,
});
</script>

<style lang="scss" scoped></style>
