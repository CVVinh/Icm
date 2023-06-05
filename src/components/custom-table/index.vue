<template>
  <div :class="borderTableFlag ? 'bordered-table-component' : ''">
    <v-container class="pa-0">
      <v-row :no-gutters="true" :justify="'end'" :class="borderTableFlag ? 'pa-4' : 'py-4'">
        <v-col :cols="6" :align-self="'center'">
          <v-row :no-gutters="true" style="align-items: center;">
            <slot name="leftToolbar"></slot>
            <template v-if="showleftToolbar">
              <v-btn icon="mdi-reload" @click="onClickRefreshData" size="small" />
              <slot name="buttonTable">
                <v-btn v-if="btnAddItem" class="ml-3" @click="onAddItem()">新規</v-btn>
              </slot>
            </template>
          </v-row>
        </v-col>
        <v-col :cols="6" :align-self="'center'">
          <v-row :no-gutters="true" style="align-items: center; justify-content: end;">
            <slot name="rightToolbar"></slot>
          </v-row>
        </v-col>
      </v-row>
      <v-row :no-gutters="true">
        <v-container :class="[borderTableFlag ? 'px-4 py-0' : 'pa-0']">
          <v-row v-if="textTable">
            <v-col cols="5">PCセット資産</v-col>
            <v-col cols="7">メインPC資産</v-col>
          </v-row>
          <v-table :fixed-header="true" :height="props.data.length >= 10 ? `${props.tableHeight}` : ''" density="compact" class="lcm-table">
            <thead>
              <tr>
                <th v-for="(header, index) of props.columnAttrs.labels" class="text-left"
                  :style="{ width: `${props.columnAttrs.columnsWidth[index]}px` }" style="background-color: #97E4FF">
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody>
              <slot name="customTableBody" v-if="customBodyTable"></slot>
              <tr v-else v-for="item in props.data">
                <td v-for="(field, index) in props.columnAttrs.fields"
                  :class="customCellClick(props.columnAttrs.clickableColumn[index], item[field]) ? 'text-link' : ''"
                  @click="customCellClick(props.columnAttrs.clickableColumn[index], item[field]) && onClickDetail(item[field], item, field)"
                >
                  <slot
                    :name="`cell(${field})`"
                    :value="item[field]"
                    :item="item"
                    :field="field"
                    :columnLabel="props.columnAttrs.labels[index]"
                  >
                   {{ item[field] }}
                  </slot>
                </td>
              </tr>
              <tr v-if="!props.data || props.data.length === 0">
                <td :colspan="props.columnAttrs.labels.length" class="text-center">
                  EMPTY DATA
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-container>
      </v-row>
      <v-row v-if="showPaginationFlag" :no-gutters="true" class="pa-4">
        <v-col cols="1">
          <v-select variant="underlined" density="compact" hide-details v-model="props.pageSize" :items="[10, 20, 50]"
            v-on:update:model-value="onPage($event, 1)" />
        </v-col>
        <v-pagination v-model="props.pageNum" :length="paginationLength" :total-visible="7" size="x-small"
          rounded="circle" v-on:update:model-value="onPage(undefined, $event)" />
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import ColumnAttributes from '@/models/column-attributes.model'

const props = defineProps({
  columnAttrs: {
    required: true,
    type: Object as PropType<ColumnAttributes>
  },
  data: {
    required: true,
    type: Object as PropType<Array<any>>
  },
  total: {
    required: true,
    type: Number
  },
  pageSize: {
    type: Number,
    required: true
  },
  pageNum: {
    type: Number,
    required: true
  },
  tableHeight: {
    type: Number
  },
  customBodyTable: {
    type: Boolean,
    default: false
  },
  btnAddItem: {
    type: Boolean,
    default: true
  },
  showPaginationFlag: {
    type: Boolean,
    default: true
  },
  showleftToolbar: {
    type: Boolean,
    default: true
  },
  borderTableFlag: {
    type: Boolean,
    default: true
  },
  textTable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['refreshData', 'clickDetail', 'page', 'update:pageSize', 'update:pageNum', 'onAddItem']);

const paginationLength = computed(() => {
  if (props.total === 0) {
    return 1
  }

  let pages = Math.floor(props.total / props.pageSize)
  if ((props.total % props.pageSize) != 0) {
    pages++
  }
  return pages
})

const onClickRefreshData = () => emit('refreshData')

/**
 * ユーザーのクリックイベントの詳細を処理し、
 *
 * 対応する表示モーダルに値を渡します
 * @param value 選択したユーザー レコードの値
 * @param item 選択したユーザーのアイテム
 * @param field 選択されたユーザー フィールド
 */
const onClickDetail = (value: any, item: any, field: any) => {
  let itemObject: any = {};
  itemObject = item;
  itemObject.field = field;
  emit('clickDetail', value, itemObject)
}

const onPage = (pageSize: number | undefined, pageNum: number | undefined) => {
  pageSize && emit('update:pageSize', pageSize)
  pageNum && emit('update:pageNum', pageNum)
  emit('page')
}

const onAddItem = () => {
  emit('onAddItem');
}

const customCellClick = (clickAbleColumn: any, value: any) => {
  return clickAbleColumn && (value === 0 || value);
}

</script>

<style lang="scss" scoped>
.text-link {
  text-decoration: underline;
  cursor: pointer;
  color: blue;
}
</style>
