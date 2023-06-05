<template>
  <v-app-bar app color="#97E4FF" class="header">
    <v-container class="header-container">
      <v-row class="header-body">
        <v-col cols="1">
          <v-app-bar-nav-icon
            @click="openHideDrawer"
          ></v-app-bar-nav-icon>
        </v-col>
        <v-col>
          <div class="text-caption text-right">
            <div>20220901 株式会社ロスペック</div>
            <div>987654321 山田太郎</div>
          </div>
        </v-col>
        <v-col cols="1" class="kebab-menu">
          <ToolBar />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import ToolBar from "@/components/application/ToolBar.vue";

const props = defineProps({
  backgroundColor: { type: String, default: 'white'}
})
const emit = defineEmits(['openHideDrawer'])
/**
 * ユーザーがナビゲーション バーのアイコンをクリックしたときにイベントを発行する
 */
function openHideDrawer() {
  emit('openHideDrawer')
}
</script>

<style lang="scss" scoped>
.header {
  .header-container {
    max-width: 100%;
    .header-body {
      display: flex;
      align-items: center;
      .kebab-menu {
        display: flex;
        flex: 0;
        width: 48px;
        justify-content: center;
        align-items: stretch;
      }
    }
  }
}
</style>
