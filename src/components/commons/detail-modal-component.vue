<template>
  <v-container class="custom-form">
    <div class="header-form">
      <h4 class="title">
        {{ props.modalName}}
      </h4>
      <div class="btn-group">
        <v-btn class="btn-action" density="compact" prepend-icon="mdi-arrow-left" @click="onClose" size="large">戻る</v-btn>
        <v-btn class="btn-action" density="compact" prepend-icon="mdi-plus" @click="onSave"
          v-if="isBtnAdd" size="large">追加</v-btn>
        <v-btn class="btn-action" density="compact" prepend-icon="mdi-update" @click="onSave"
          v-if="isBtnUpdate && customCondition" size="large">変更</v-btn>
        <div v-if="isBtnDelete && customCondition" class="btn-action-delete">
          <v-btn density="compact" prepend-icon="mdi-delete" @click="onDelete" size="large">削除</v-btn>
          <span>論理削除</span>
        </div>
      </div>
    </div>
    <template v-if="customHeaderContentFlag">
      <slot name="customHeaderContent"></slot>
    </template>
    <template v-else>
      <v-form class="header-info pt-0 pb-0" v-if="!isBtnAdd && showHeaderModal">
        <v-col class="form-search" cols="4">
          <span>登録</span>
          <div class="item-group">
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="日時"
                class="input-time"
                :readonly="true" underlined
                hide-details
                :value="dateTime?.createdTime" />
              </div>
            </v-col>
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="登録者"
                :readonly="true" underlined
                hide-details  />
              </div>
            </v-col>
          </div>
        </v-col>
        <v-col class="form-search" cols="4">
          <span>最終更新</span>
          <div class="item-group">
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="日時"
                class="input-time"
                :readonly="true" underlined
                hide-details
                :value="dateTime?.updatedTime" />
              </div>
            </v-col>
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="登録者"
                :readonly="true" underlined
                hide-details />
              </div>
            </v-col>
          </div>
        </v-col>
        <v-col class="form-search" cols="4">
          <span>削除</span>
          <div class="item-group">
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="日時"
                class="input-time"
                :readonly="true" underlined
                hide-details
                :value="dateTime?.deletedTime" />
              </div>
            </v-col>
            <v-col class="item-info">
              <div class="form-input">
                <vc-input
                label="登録者"
                :readonly="true" underlined
                hide-details />
              </div>
            </v-col>
          </div>
        </v-col>
      </v-form>
    </template>
  </v-container>
</template>

<script lang="ts" setup>
import DateTimeAction from '@/models/DateTimeAction';
import { PropType } from 'vue';

const props = defineProps({
  isBtnAdd: Boolean,
  isBtnUpdate: Boolean,
  isBtnDelete: Boolean,
  customCondition: {
    type: Boolean,
    default: true
  },
  modalName: {
    type: String,
    required: true
  },
  dateTime: {
    type: Object as PropType<DateTimeAction>,
    required: true
  },
  customHeaderContentFlag: {
    type: Boolean,
    default: false
  },
  showHeaderModal: {
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['onSave', 'onClose', 'onDelete']);

/**
 * イベント収納アイテム
 */
const onSave = () => {
  emit('onSave');
}

/**
 * イベントクローズモーダル
 */
const onClose = () => {
  emit('onClose');
}

/**
 * イベント削除項目
 */
const onDelete = () => {
  emit('onDelete');
}
</script>

<style lang="scss" scoped>
.custom-form {
  max-width: 100% !important;
  .header-form {
    margin: 0px;
    max-width: 100% !important;
    display: flex;
    .title {
      flex-grow: 7;
    }
    .btn-group {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
      .btn-action {
        display: flex;
        margin-left: 20px;
        &-delete {
          display: flex;
          flex-direction: column;
          margin-left: 20px;
        }
      }
    }
  }
  .header-info {
    display: flex;
    .form-search {
      .item-group {
        display: flex;
        width: 100%;
        .item-info {
          padding: 0px;
          .input-time {
            :deep(.v-field__outline) {
              border-radius: unset;
              border-right: none;
            }
          }
        }
        :deep(.v-field__outline) {
          border-radius: unset;
        }
      }
    }
  }
}
</style>
