import ProcurementManagement from "@/views/ProcurementManagement/index.vue";
import ItemSet from "@/views/ItemSetMaster/index.vue";
import ItemMaster from "@/views/ItemMaster/index.vue";
import MakerMaster from "@/views/MakerMaster/index.vue";
import KittinMaster from "@/views/kitting/KittingMaster.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/Login/Index.vue"),
    },
    {
      path: "/Top",
      name: "TOP",
      component: () => import("@/views/Top/Index.vue"),
    },

    {
      path: "/procurement_management/master_management",
      name: "Procurement Management",
      component: ProcurementManagement,
      redirect: {
        name: "ItemMaster",
      },
      children: [
        {
          path: "item_set",
          name: "ItemSet",
          component: ItemSet,
        },
        {
          path: "item_master",
          name: "ItemMaster",
          component: ItemMaster,
        },
        {
          path: "maker_master",
          name: "MakerMaster",
          component: MakerMaster,
        },
        {
          path: "kitting",
          name: "KittinMaster",
          component: KittinMaster,
        },
      ],
    },
    {
      path: "/procurement_management/order_management",
      name: "Order Management",
      component: () => import("@/views/ProcurementManagement/OrderManagement.vue"),
    },
    {
      path: "/procurement_management/arrival_management",
      name: "Arrival Management",
      component: () => import('@/views/Arrival/index.vue'),
    },
    {
      path: "/procurement_management/payment_management",
      name: "Payment Management",
      component: () => import('@/views/PaymentInfo/index.vue')
    },
    {
      path: "/operation-management",
      name: "Operation Management",
      redirect: {
        name: "Outsourcing Company Management",
      },
      children: [
        {
          path: "outsourcing-company",
          name: "Outsourcing Company Management",
          component: () =>
            import("@/views/OperationManagement/OutsorcingCompanyManagement/index.vue"),
        },
        {
          path: "asset-shipment-management",
          name: "Asset Shipment Management",
          component: () =>
            import("@/views/OperationManagement/AssetShipmentManagement/index.vue"),
          redirect: {
            name: "AssetManagement",
          },
          props: {name: '資産運用管理'},
          children: [
            {
              path: "asset-management",
              name: "AssetManagement",
              component: () =>
                import("@/views/OperationManagement/AssetShipmentManagement/AssetManagement/index.vue"),
            },
            {
              path: "shipping-management",
              name: "ShippingManagement",
              component: () =>
                import("@/views/OperationManagement/AssetShipmentManagement/ShippingManagement/index.vue"),
            }
          ]
        },
      ],
    },

    {
      path: "/user_portal",
      name: "UserPortal",
      component: () => import("@/views/UserPortal/UserPortal.vue"),
      props: { name: "利用者ポータル" },
    },
    {
      path: "/helpdesk",
      name: "Helpdesk",
      component: () => import("@/views/Helpdesk/Helpdesk.vue"),
      props: { name: "ヘルプデスク管理" },
    },
    {
      path: "/lifecycle-management",
      name: "Lifecycle Management Integration",
      children: [
        {
          path: "",
          name: "Life Cycle Management",
          component: () => import("@/views/LifecycleManagement/lcm-index.vue"),
          redirect: {
            name: 'Hardware Management'
          },
          children: [
            {
              path: "",
              name: "Hardware Management",
              component: () => import("@/views/LifecycleManagement/LifeCycleManagementSubView/lcm-content.vue"),
              props: { softwareFlag: false },
            },
            {
              path: "software",
              name: "Software Management",
              component: () => import("@/views/LifecycleManagement/LifeCycleManagementSubView/lcm-content.vue"),
              props: { softwareFlag: true },
            },
          ],
        },
        {
          path: "depreciation-management",
          name: "Depreciation management",
          component: import('@/views/LifecycleManagement/depre-index.vue'),
          children: [
            {
              path: "",
              name: "Depreciation view",
              component: import("@/views/LifecycleManagement/DepreciationManagementSubView/Depreciation.vue")
            }
          ]
        }
      ],
    },
  ],
});

export default router;
