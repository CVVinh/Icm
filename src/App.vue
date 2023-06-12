<template>
  <v-app class="app">
    <SideMenu v-model:drawer="isDrawerOpen" v-if="!isLoginPage" />
    <Header
      @openHideDrawer="handleOpenHideDrawer"
      isLoginPage="isLoginPage"
      v-if="!isLoginPage"
    />
    <v-main>
      <v-expand-transition>
        <div v-if="showAlert" :class="['alert-message', {'alert-message-drawer-open': isDrawerOpen}]">
          <v-alert
            density="compact"
            :type="getStatusRes === 200 ? 'info' : 'error'"
            v-model="showAlert"
            closable
          >
            {{ getMsg }}
          </v-alert>
        </div>
      </v-expand-transition>
      <RouterView />
    </v-main>x
    <Footer />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, watch } from "vue";
import SideMenu from "./components/application/SideMenu.vue";
import Footer from "@/components/application/Footer.vue";
import Header from "@/components/application/Header.vue";
import { useRoute } from "vue-router";
import { useStore } from "./store";

/**
 * ログインページか否かを判定します
 */
const route = useRoute();
const currentPath = computed(() => route.path);
const isLoginPage = ref(false);
const store = useStore();
const getMsg = computed(() => store.getters.getMessage);
const getStatusRes = computed(() => store.getters.getStatusResponse);
const showAlert = ref(false)
/**
 * ユーザーが引き出しをクリックして開いたり隠したりしたときのイベントを処理します
 */
const isDrawerOpen = ref(true);

watchEffect(() => {
  showAlert.value = false;
  isLoginPage.value = currentPath.value === "/" ? true : false;
});

watch(getMsg, (newValue) => {
  if (!newValue.length) {
    showAlert.value = false;
    return;
  }
  showAlert.value = true;
  if (getStatusRes.value === 200) {
    setTimeout(() => {
      showAlert.value = false;
      store.dispatch("setMessage", "");
    }, 3000);
  }
});

watch(showAlert, (newValue) => {
  if (!newValue) {
    store.dispatch("setMessage", "");
  }
})

const handleOpenHideDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<style scoped lang="scss">
@import '@/assets/style/_variables.scss';
.app {
  min-height: calc(1 / 0.75 * 100vh);
  .alert-message {
    background-color: white;
  }
  .alert-message-drawer-open {
    width: calc(100% - 256px);
    left: 256px;
    position: fixed;
    z-index: $zindex-fixed;
  }
}
</style>
