<template>
  <div class="pa-4 d-inline-flex justify-space-between">
    <v-img height="70" width="70" src="/assets/images/logo.png"></v-img>
    <div class="align-self-center text-h5 pa-4">PC-LCM</div>
  </div>
  <v-divider></v-divider>
  <v-list>
    <v-list-group v-for="nav_list in navLists" :key="nav_list.name">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" active-color="primary"
          ><v-icon :icon="nav_list.icon" class="mr-2" />{{
            nav_list.name
          }}</v-list-item
        >
      </template>
      <v-list-item
        active-color="primary"
        v-if="nav_list.lists"
        v-for="nav_list_item in nav_list.lists"
        :key="nav_list_item.id"
        :title="nav_list_item.name"
        :value="nav_list_item.id"
        :to="nav_list_item.link ?? undefined"
      />
    </v-list-group>
  </v-list>
</template>

<script setup lang="ts">
const navLists = [
  {
    name: "調達管理",
    icon: "mdi-desktop-classic",
    lists: [
      {
        id: "master-management",
        name: "マスター管理",
        link: "/procurement_management/master_management",
      },
      {
        id: "order-management",
        name: "発注管理",
        link: "/procurement_management/order_management",
      },
      {
        id: "arrival-management",
        name: "入荷管理",
        link: "/procurement_management/arrival_management",
      },
    ],
  },
  {
    name: "運用管理",
    icon: "mdi-desktop-classic",
    lists: [
      {
        id: "outsourcing-company",
        name: "マスター管理",
        link: "/operation-management/outsourcing-company",
      },
      {
        id: 'asset-shipment-management',
        name: '資産運用管理',
        link: '/operation-management/asset-shipment-management'
      },
    ]
  },
  {
    name: "PC統合資産",
    icon: "mdi-desktop-classic",
    lists: [

    ],
  },
  {
    name:"ライフサイクル",
    icon:"mdi-desktop-classic",
    lists: [
      {
        id: 'integrate-lifecycle-management',
        name: "ライフサイクル統合管理",
        link: "/lifecycle-management",
      },
      {
        id:"depreciation_management",
        name:"減価償却管理",
        link:"/lifecycle-management/depreciation-management",
      },
    ],

  },
  {
    name: "PC調達",
    icon: "mdi-cart-variant",
    lists: [
      {
        id: "asset-master-search",
        name: "資産マスター検索",
        link: "/pc-supply/asset-master-search",
      },
      {
        id: "supply-set-search",
        name: "調達セット検索",
        link: "/pc-supply/supply-set-search",
      },
      {
        id: "quotation-order-search",
        name: "見積・発注検索",
        link: "/pc-supply/quotation-order-search",
      },
    ],
  },
  {
    name: "PC在庫",
    icon: "mdi-warehouse",
    lists: [
      {
        id: "pc-stock-search",
        name: "PC在庫検索",
        link: "/pc-stock/search",
      },
      {
        id: "returned-search",
        name: "PC返品検索",
        link: "/pc-stock/returned-search",
      },
    ],
  },
  {
    name: "PC廃棄",
    icon: "mdi-trash-can",
    lists: [
      {
        id: "schedule-search",
        name: "PC廃棄予定検索",
        link: "/pc-discard/schedule-search",
      },
      {
        id: "history-search",
        name: "PC廃棄履歴検索",
        link: "/pc-discard/history-search",
      },
    ],
  },
  {
    name: "PC利用",
    icon: "mdi-laptop-account",
    lists: [
      {
        id: "pc-use-search",
        name: "PC利用検索",
        link: "/pc-use/search",
      },
    ],
  },
  {
    name: "利用者ポータル",
    icon: "mdi-face-agent",
    lists: [
      {
        id: "help-desk-search",
        name: "利用者ポータル",
        link: "/user_portal",
      },
    ],
  },
  {
    name: "ヘルプデスク管理",
    icon: "mdi-face-agent",
    lists: [
      {
        id: "help-desk-search",
        name: "ヘルプデスク管理",
        link: "/helpdesk",
      },
    ],
  },
];
</script>
