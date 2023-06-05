<template>
  <v-table :style="customStyle" :fixed-header="true" :height="props.tableHeight" density="compact" class="lcm-table">
    <thead v-if="showHead">
      <tr>
        <!-- Arrange table when table include record asset_set -->
        <th v-for="(header, index) of props.columnAttrs.labels" :class="['text-left', arrangeLayoutTable ? 'thead-mode-edit' : '']"
          :style="{ width: `${props.columnAttrs.columnsWidth[index]}px` }">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in props.data" class="w-100">
        <td v-for="(field, index) in props.columnAttrs.fields"
          :class="showHead ? '' : 'table-body-border'"
          :style="{ width: `${props.columnAttrs.columnsWidth[index]}px` }"
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
        <!-- Show cell is button -->
        <td v-if="actionBtn && props.data.length > 1" class="table-body-border">
          <slot name="deleteBtn" :item="item"></slot>
        </td>
        <!-- Arrange table when cell isn't button and table is not included asset is main-->
        <td v-else-if="customTableAsset && item.isMain" class="column_blank"></td>
      </tr>
      <tr v-if="actionBtn && props.data.length > 0">
        <td colspan="8" class="column_blank"></td>
        <td class="table-body-border">
          <slot name="addBtn"></slot>
        </td>
      </tr>
      <tr v-if="!props.data || props.data.length === 0">
        <!-- Arrange table when table include record asset_set -->
        <td :colspan="arrangeLayoutTable ? props.columnAttrs.labels.length - 1 : props.columnAttrs.labels.length" class="table-body-border text-center">
          EMPTY DATA
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script lang="ts" setup>import ColumnAttributes from '@/models/column-attributes.model';
import { PropType } from 'vue';

const props = defineProps({
  columnAttrs: {
    required: true,
    type: Object as PropType<ColumnAttributes>
  },
  data: {
    required: true,
    type: Object as PropType<Array<any>>
  },
  tableHeight: {
    type: Number
  },
  showHead: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: Object
  },
  actionBtn: {
    type: Boolean,
    default: false
  },
  customTableAsset: {
    type: Boolean,
    default: false
  },
  arrangeLayoutTable: {
    type: Boolean,
    default: false
  }
});

</script>
<style lang="scss" scoped>
.lcm-table {
  thead {
    .column_blank {
      background: none !important;
      border: none !important;
    }
    tr {
      :deep(.thead-mode-edit) {
        &:last-of-type {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
        }
      }
    }
  }
  tbody {
    tr {
      :deep(.column_blank) {
        background: none !important;
        border: none !important;
      }
    }
  }
}
.table-body-border {
  border: 1px solid #ccc !important;
}
</style>
