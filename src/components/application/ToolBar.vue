<template>
  <v-toolbar-items class="toolbar-items">
    <v-menu>
      <template v-slot:activator="{ props: menu }">
        <v-btn
          icon="mdi-dots-vertical"
          v-bind="menu"
          class="kebab-menu-icon"
        />
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in supports"
          :key="index"
          :to="item.link"
        >
          <v-icon :icon="item.icon" class="mr-2" />{{ item.name }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-toolbar-items>
</template>

<script setup lang="ts">
const supports = [
  {
    name: "FAQ",
    icon: "mdi-frequently-asked-questions",
    link: "/about",
  },
  {
    name: "マニュアル",
    icon: "mdi-book-open-variant",
    link: "/support/manual",
  },
  {
    name: "ログアウト",
    icon: "mdi-logout",
    link: "/",
  },
];
</script>

<style lang="scss" scoped>
.toolbar-items {
  height: 48px;
  width: 24px;
  .kebab-menu-icon {
    width: 96px;
    height: 100%;
  }
}
</style>
