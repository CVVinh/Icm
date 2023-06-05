<template>
  <v-form ref="arrivalForm"
    lazy-validation
    validate-on="submit">
    <div class="top-form pa-3">
      <div class="title mb-5">
        <h4>入荷情報</h4>
      </div>
      <v-row>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="入荷資産ID"
              readonly
              :value="modelValue.arrivalInfo.arrivalId"
            />
          </div>
        </v-col>
        <v-col :cols="5">
        </v-col>
        <v-col :cols="2">
          <div class="form-selection">
            <vc-select
              label="入荷拠点"
              density="compact"
              :rules="['required']"
              v-model="modelValue.arrivalInfo.baseId"
              :items="mstBases"
              item-title="baseName"
              item-value="baseId"
              single-line
              no-data-text="データなし"
              />
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="入荷日"
              readonly
              v-model="modelValue.arrivalInfo.arrivalOn"
            ></vc-input>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="2">
          <div class="form-selection">
            <vc-select
              label="資産区分"
              density="compact"
              readonly
              v-model="modelValue.itemInfo.assetType"
              :items="listAssetType"
              single-line
              no-data-text="データなし"
              />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="品目ID"
              name="品目ID"
              :rules="['required']"
              readonly
              v-model="modelValue.itemInfo.itemId"
            />
          </div>
        </v-col>
        <v-col :cols="6">
          <div class="form-input">
            <vc-input
              label="品目名称"
              readonly
              v-model="modelValue.itemInfo.itemName"
            />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <v-btn style="margin-top: 20px;" small color="primary" class="btn-action" dark  @click="onClickItemList">
              追加品目選択
            </v-btn>
            <p style="color: rgb(176,0,32);">
              {{ arrivalForm ? arrivalForm['items'].find((element: any) => element.id == '品目ID')['errorMessages'][0] : '' }}
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="シリアルナンバー"
              readonly
              v-model="modelValue.itemInfo.itemName"
            />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="JANコード"
              readonly
              v-model="modelValue.itemInfo.janCode"
            />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="メーカー名称"
              readonly
              v-model="modelValue.itemInfo.makerName"
            />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="メーカー型番"
              readonly
              v-model="modelValue.itemInfo.makerModel"
            />
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-selection">
            <vc-select
              label="OS"
              density="compact"
              readonly
              v-model="modelValue.itemInfo.osId"
              :items="OS"
              single-line
              item-title="text"
              item-value="value"
              no-data-text="データなし"
              />
          </div>
        </v-col>
      </v-row>
      <v-row v-if="modelValue.arrivalInfo.arrivalId">
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="発注ID"
              readonly
              v-model="modelValue.oderInfo.procurementId"
            />
          </div>
        </v-col>
        <v-col :cols="4">
          <div class="form-input">
            <vc-input
              label="発注名称"
              readonly
              v-model="modelValue.procurementInfo.procurementName"
            />
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="発注日"
              readonly
              v-model="modelValue.oderInfo.createdAt"
            />
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="発注者"
              readonly
              v-model="modelValue.oderInfo.quotationRequester"
            />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="between-form pa-3">
      <div class="title">
        <h4>利用者情報</h4>
      </div>
      <v-row>
        <v-col :cols="3">
          <div class="form-selection">
            <vc-input-date
              label="利用開始日"
              :defaultValue="modelValue.arrivalInfo.usingFrom"
              v-model="modelValue.arrivalInfo.usingFrom"
            >
            </vc-input-date>
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-selection">
            <vc-input-date
              label="利用終了日"
              :defaultValue="modelValue.arrivalInfo.usingTo"
              v-model="modelValue.arrivalInfo.usingTo"
            >
            </vc-input-date>
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="利用会社/組織"
              readonly :value="modelValue.accountInfo.accountName"/>
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="利用者"
              readonly :value="modelValue.groupInfo.groupName" />
          </div>
        </v-col>
        <v-col :cols="2">
          <div class="form-input">
            <vc-input
              label="発注時利用者添付"
              readonly />
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="bottom-form pa-3">
      <div class="title">
        <h4>検品・資産登録情報</h4>
      </div>
      <v-row>
        <v-col :cols="2">
          <div class="form-selection">
            <vc-select
              label="資産登録"
              readonly
              density="compact"
              v-model="modelValue.arrivalInfo.isAsset"
              :items="isAsset"
              no-data-text="データなし"
              item-title="text"
              item-value="value"
            />
          </div>
        </v-col>
        <v-col :cols="7">
          <div class="form-textarea">
            <vc-textarea
              rows="1"
              label="申し送り"
              name="申し送り"
              :rules="['required']"
            ></vc-textarea>
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="資産登録担当者"
              readonly
              v-model="modelValue.arrivalInfo.assetApproveAccountId" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col :cols="2">
          <div class="form-selection">
            <vc-select
              label="検品"
              name="検品"
              :rules="['required']"
              density="compact"
              v-model="modelValue.arrivalInfo.inspectionStatus"
              :items="getInspectionList"
              @update:modelValue="setAssetRegistration"
              single-line
              no-data-text="データなし"
            >
              <template #selection="{ item }">
                <span>
                  {{ displayInspection(item) }}
                </span>
              </template>
            </vc-select>
          </div>
        </v-col>
        <v-col :cols="7">
          <div class="form-textarea">
            <vc-textarea
              rows="1"
              label="申し送り"
              name="申し送り"
              :rules="['required']"
              v-model="modelValue.arrivalInfo.inspectionStatusNote"></vc-textarea>
          </div>
        </v-col>
        <v-col :cols="3">
          <div class="form-input">
            <vc-input
              label="検品担当者"
              name="検品担当者"
              :rules="['required']"
              v-model.number="modelValue.arrivalInfo.inspectionAccountId" />
          </div>
        </v-col>
      </v-row>
      <v-row v-if="modelValue.arrivalInfo.inspectionStatus === 2">
        <v-col :cols="2">
          <div class="form-selection">
            <vc-select
              label="不合格処理"
              name="不合格処理"
              :rules="['required']"
              density="compact"
              v-model="modelValue.arrivalInfo.failureAction"
              :items="rejectionProcessing"
              single-line
              no-data-text="データなし"
              />
          </div>
        </v-col>
        <v-col :cols="7">
          <div class="form-textarea">
            <vc-textarea
              rows="1"
              label="申し送り"
              v-model="modelValue.arrivalInfo.failureActionNote"></vc-textarea>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-form>
  <dialog-list-item ref="activeDialogListItem" @onAddItem="getItem" />
</template>

<script lang="ts" setup>
import { PropType, ref, reactive, computed } from "vue";
import Arrival from "@/models/Arrival";
import ItemMaster from "@/models/ItemMaster"
import DialogListItem from "../commons/dialog-list-item.vue";

const props = defineProps({
  rejectionProcessing: {
    type:  Array<string>,
    required: true
  },
  modelValue: {
    type: Object as PropType<Arrival>,
    required: true
  },
  inspectionResult: {
    type: Array<any>,
    required: true
  },
  listAssetType: {
    type: Array,
    required: true
  },
  OS: {
    type: Array,
    required: true
  },
  isAsset: {
    type: Array,
    required: true
  },
  mstBases: {
    type: Array,
    required: true
  }
});

const rules = computed(() => {
  const rules: any = [];
      const rule = (value: any) => {
          return !!value || value == 0 || 'このフィールド義務。'
      }
      rules.push(rule);
    return rules
})

const getInspectionList = computed(() => {
  const inspectionList = props.inspectionResult
  return props.modelValue.arrivalInfo.arrivalId ? inspectionList.filter(inspection => inspection.value !== 0) : inspectionList
})

const displayInspection = (item: any) => {
  const inspectionStatus = props.inspectionResult.find((inspection) => inspection && inspection.value === item.value);
  return inspectionStatus ? inspectionStatus.title : '';
}

const emit = defineEmits(['update:modelValue'])
const arrivalForm = ref<any | null>(null);
const activeDialogListItem = ref<any>(null);

const validateForm = async () => {
  const validForm = await arrivalForm.value.validate();
  return validForm;
}

const getItem = (value: any) => {
  props.modelValue.itemInfo = value[0]
};
const onClickItemList = (keyMain: any) => {
  activeDialogListItem.value.openDialogItemList();
};
const setAssetRegistration = (value: any) => {
  // check condition for asset registration
  if ([0, 2].includes(value)) {
    props.modelValue.arrivalInfo.isAsset = 0
    if (value === 2) {
      // If inspection is failure, rejection process to not yet
      props.modelValue.arrivalInfo.failureAction = 0
    }
  } else {
    props.modelValue.arrivalInfo.isAsset = 1
  }
};
defineExpose({
  validateForm,
});
</script>

<style lang="scss" scoped>
.maker-modal {
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
      .v-form {
        padding: 5px 20px 40px 20px;
        border: 1px solid black;
      }
    }
    .v-card-actions {
      min-height: auto;
    }
  }
}
.top-form {
  border-top: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.between-form {
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
.bottom-form {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
}
</style>
