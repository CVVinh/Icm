<template>
  <v-dialog v-model="showDialog" class="custom-modal" persistent>
    <v-card :id="AppConstants.COMMON_MODAL_CARD_ID">
      <v-card-title>
        <DetailModalComponent
          :dateTime="dateTimeForm"
          :modalName="modalName"
          :isBtnAdd="isAddItem"
          :isBtnUpdate="isUpdateItem"
          :isBtnDelete="isDeleteItem"
          :customCondition="customCondition"
          :show-header-modal="showHeaderModal"
          :custom-header-content-flag="customHeaderModalFlag"
          @on-close="handleOnClose"
          @on-save="handleOnSave"
          @on-delete="handleOnDelete"
        >
          <template #customHeaderContent>
            <slot name="customHeaderContent"></slot>
          </template>
        </DetailModalComponent>
      </v-card-title>
      <v-card-text class="form-modal">
        <slot name="contentModal" />
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import DetailModalComponent from "@/components/commons/detail-modal-component.vue";
import DateTimeAction from "@/models/DateTimeAction";
import AppConstants from "@/constants/constants";
import useAlert from "@/utils/alert"

const { removeAlertMessage } = useAlert()

const props = defineProps({
  modalId: {
    type: String,
    required: false,
    default: ""
  },
  modalName: {
    type: String,
    required: true
  },
  dateTimeForm: {
    type: Object as PropType<DateTimeAction>,
    default: {}
  },
  showAddUpdateBtn: {
    type: Boolean,
    default: true
  },
  showDeleteBtn: {
    type: Boolean,
    default: true
  },
  showHeaderModal: {
    type: Boolean,
    default: true
  },
  customHeaderModalFlag: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["onSave", "onDelete", "onClose"])
const isAddItem = ref();
const isDeleteItem = ref();
const isUpdateItem = ref();
const customCondition = ref();
const showDialog = ref(false);
let dataModalId = ref();

/**
 * モーダルを開く
 * @param itemId アイテムID
 * @param isDeleted チェック項目を削除
 */
const openModal = async (itemId: Number, isDeleted: Number = 0, isCustomCondition: Boolean = true) => {
  removeAlertMessage();
  if (!itemId) {
    // show add button when it is mode add and showAddUpdateBtn flag is true
    isAddItem.value = true && props.showAddUpdateBtn;
  } else {
    isAddItem.value = false;
    dataModalId.value = itemId;
  }
  customCondition.value = isCustomCondition
  // show delete button when item isn't deleted, is update mode and showDeleteBtn flag is true
  isDeleteItem.value = isDeleted === 0 && !isAddItem.value && props.showDeleteBtn;
  // show update button when item isn't deleted, is update mode and showAddUpdateBtn flag is true
  isUpdateItem.value = !isAddItem.value && isDeleted === 0 && props.showAddUpdateBtn;
  showDialog.value = true;
};

/**
 * イベントセーブメーカーアイテム
 */
const handleOnSave = async () => {
  await emit('onSave', isAddItem);
};

/**
 * イベント削除メーカーアイテム
 */
const handleOnDelete = async () =>{
  emit('onDelete', dataModalId.value);
  handleOnClose();
}

/**
 * イベントクローズモーダル
 */
const handleOnClose = () => {
  showDialog.value = false;
  emit('onClose');
}

defineExpose({
  openModal,
  handleOnClose
});
</script>

<style lang="scss" scoped>
.custom-modal {
  .v-card {
    .v-card-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .v-container {
        padding: 10px 0px 0px 0px;
      }
    }
    .v-card-text {
      padding-top: 0px !important;
      padding-bottom: 0px !important;

    }
  }
}
</style>
