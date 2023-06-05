<template>
  <v-row>
    <v-col>
      <v-table
        :fixed-header="true"
        :height="props.tableHeight"
        class="lcm-table"
        :class="{ 'table-scroll': props.showDataManipulateColumn }"
      >
        <thead>
          <tr>
            <th
              v-for="(header, index) of props.columnAttrs.labels"
              class="text-left border-table"
              :style="{
                minWidth: `${props.columnAttrs.columnsWidth[index]}px`,
                maxWidth: `${props.columnAttrs.columnsWidth[index]}px`,
              }"
            >
              {{ header }}
            </th>
            <th
              class="table-scroll-right-fixed"
              v-if="props.showDataManipulateColumn"
            >
              <slot name="selectHeader"></slot>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="props.data.length !== 0" v-for="item in props.data">
            <td
              v-for="(field, index) in props.columnAttrs.fields"
              class="border-table"
              :style="{
                textDecoration: props.columnAttrs.clickableColumn[index]
                  ? 'underline'
                  : '',
                cursor: props.columnAttrs.clickableColumn[index]
                  ? 'pointer'
                  : '',
                color: props.columnAttrs.clickableColumn[index] ? '#97E4FF' : '',
              }"
              @click="
                props.columnAttrs.clickableColumn[index] &&
                  onClickDetail(item[field])
              "
            >
              {{ item[field] }}
            </td>
            <td
              class="pl-2 pr-2 table-scroll-right-fixed"
              v-if="props.showDataManipulateColumn"
            >
              <slot name="selectMenu"></slot>
            </td>
          </tr>
          <tr v-else>
            <td :colspan="getColspanNum">EMPTY DATA</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <div class="pagination" v-if="!props.hidePagination">
    <v-row>
      <v-col>
        <v-pagination
          v-model="props.pageNum"
          :length="paginationLength"
          :total-visible="7"
          size="small"
          rounded="circle"
        />
      </v-col>
    </v-row>
    <div class="pagination_select">
      <div class="d-flex align-center">
        <p class="text-subtitle-2 mr-2">1ページ中の件数</p>
        <v-select
          density="compact"
          hide-details
          v-model="props.pageSize"
          :items="[10, 20, 50]"
          v-on:update:model-value="onPage($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ComputedRef } from "vue";
import ColumnAttributes from "@/models/column-attributes.model";

const props = defineProps({
  columnAttrs: {
    required: true,
    type: Object as PropType<ColumnAttributes>,
  },
  data: {
    required: true,
    type: Object as PropType<Array<any>>,
  },
  total: {
    required: true,
    type: Number,
  },
  pageSize: {
    type: Number,
    required: true,
  },
  pageNum: {
    type: Number,
    required: true,
  },
  tableHeight: {
    type: Number,
  },
  showDataManipulateColumn: {
    type: Boolean,
  },
  hidePagination: {
    type: Boolean,
  },
});

const emit = defineEmits([
  "refreshData",
  "addNewItem",
  "clickDetail",
  "page",
  "update:pageSize",
  "update:pageNum",
  "submit-request",
]);

const paginationLength: ComputedRef<number> = computed(() => {
  let pages = Math.floor(props.total / props.pageSize);
  if (props.total % props.pageSize != 0) {
    pages++;
  }
  // return pages;
  return 10;
});

const getColspanNum = computed(() => {
  return props.showSubmitColumn
    ? props.columnAttrs.labels.length + 1
    : props.columnAttrs.labels.length;
});

const onClickRefreshData = () => emit("refreshData");

const onClickDetail = (value: any) => emit("clickDetail", value);

const onAddNewItem = () => emit("addNewItem");

const onPage = (pageSize: number, pageNum: number) => {
  pageSize && emit("update:pageSize", pageSize);
  pageNum && emit("update:pageNum", pageNum);
  emit("page");
};

const onSubmitRequest = () => {
  emit("submit-request");
};
</script>

<style lang="scss">
.table-text-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.table-scroll {
  width: 100%;
  overflow: scroll;
  .v-table__wrapper {
    overflow-x: auto;
  }
  table {
    display: block;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bbb;
    }
  }
  .v-field__input {
    white-space: nowrap;
    overflow: hidden;
  }
}

.table-scroll-right-fixed {
  position: sticky;
  right: 0;
  top: 0;
}

.pagination {
  position: relative;
  &_select {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
