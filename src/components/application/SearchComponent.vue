<template>
  <v-card-actions>
    <v-container class="ma-3">
      <v-expansion-panel-header>詳細検索</v-expansion-panel-header>
      <v-row dense>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-0">
            &darr; 特定時
          </div>
          <v-text-field class="pa-1" v-model="dataSearch.itemSetId" label="PCセット品目ID" clearable>
          </v-text-field>
        </v-col>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
          <v-combobox v-model="dataSearch.item_set_maker_model" label="PCセット資産タイプ" clearable />
        </v-col>

        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
          <v-text-field v-model="dataSearch.item_set_jan_code" label="PCセット名称(前方一致)" clearable>
          </v-text-field>
        </v-col>

        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
        </v-col>
        <v-col cols="12" lg="2">
          <div class="text-caption pa-3"> </div>
        </v-col>
        <v-col cols="12" lg="1">
          <div class="text-caption pa-3"> </div>

        </v-col>
        <v-col cols="12" lg="1" align-self="center">
          <div class="text-caption pa-3"> </div>
          <v-select 
            fieldValue="value" 
            fieldText="name" 
            v-model="dataSearch.deleted_flag" 
            :items="[{value: 1, name: '含む'}, {value: 2, name: '含めない'}]" 
            label="論理削除"
          ></v-select>
          <v-btn @click="search" class="ma-3" color="#97E4FF"> 検索 </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row dense>
        <v-col cols="12" lg="1">
          <div class="text-caption"> </div>
          <v-select 
            fieldValue="value" 
            fieldText="name" 
            v-model="dataSearch.expirationStatus" 
            :items="[{value: 1, name: 'すべて'}, {value: 2, name: '有効のみ'}]" 
            label="期間有効品目"
          ></v-select>
        </v-col>
        <v-col cols="12" lg="2">
          <vc-input-date label="有効期間(From)" v-model="dataSearch.ItemSetexpirationDateFrom"></vc-input-date>
        </v-col>
        <v-col cols="12" lg="2" class="pb-0">
          <vc-input-date label="有効期間(To)" v-model="dataSearch.itemSetExpirationDateTo"></vc-input-date>
        </v-col>

        <v-spacer />
        <v-col cols="6" lg="1" align-self="center">
          <v-btn class="ma-3" color="blue lighten-3"> クリア </v-btn>
        </v-col>
      </v-row>

      <v-expansion-panels class="mt-5">
        <v-expansion-panel>
          <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
            詳細検索条件
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-row class="mx-3" dense>
              <v-col cols="12" lg="2">
                <v-text-field label="メインPC品目ID" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="2">
                <v-combobox label="メインPCタイプ" clearable />

              </v-col>
              <v-col cols="12" lg="1">
                <v-text-field label="JANコード" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="1">
                <v-btn class="ma-3" color="blue lighten-3"> QR </v-btn>
              </v-col>
              <v-col cols="12" lg="1">
                <v-combobox label="メーカー" clearable />

              </v-col>
              <v-col cols="12" lg="2">
                <v-text-field label="メーカー型番" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="12" lg="1">
                <v-select 
                  fieldValue="value" 
                  fieldText="name" 
                  v-model="dataSearch.itemSetOs" 
                  :items="[{value: 1, name: 'IOS'}, {value: 2, name: 'Android'}]" 
                  label="OS">
                </v-select>
              </v-col>
            </v-row>


          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-card-actions>
</template>
  
<script>
export default {
  name: "SearchComponent",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      dataSearch: {
        itemSetId: '',
        itemSetName: '',
        item_set_jan_code: '',
        item_set_maker_model: '',
        item_set_maker_id: '',
        deleted_flag: '',
        itemSetExpirationDateFrom: '',
        itemSetExpirationDateTo: '',
      }
    }
  },
  methods: {
    search() {
      this.$emit("search:change", this.dataSearch)
    }
  }
}
</script>
  
<style>

</style>
