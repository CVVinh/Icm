<template>
  <v-container class="">
    <v-row>
      <v-col cols="7" class="pb-1">
        <div>
          <span>
            マスター管理 > 委託先マスター詳細
          </span>
        </div>
      </v-col>
      <!-- start form button -->
      <v-col cols="5" class="d-flex justify-end pb-1">
        <template v-for="btn in btnHeaderList">
          <v-btn
            small
            color="primary"
            class="ml-8 text-left pl-2 pr-8"
            dark
        >
          {{ btn.text }}
        </v-btn>
        </template>
      </v-col>
       <!-- end form button -->
    </v-row>
    <v-row>
      <v-col class="d-flex justify-end pb-1">論理削除</v-col>
    </v-row>
    <v-row>
      <!-- start form method -->
      <v-col cols="9" class="d-flex pb-1">
        <v-col cols="3" class="pb-1 mr-13" v-for="method in methodHeaderList">
          <table>
            <tr>
              <td>{{ method.method}}</td>
            </tr>
            <tr>
              <td>日時</td>
              <td>登録者</td>
            </tr>
            <tr>
              <td class="td-border-date text-wrap"></td>
              <td class="td-border-name text-wrap"></td>
            </tr>
          </table>
        </v-col>
      </v-col>
      <!-- end form method -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HeaderModal",
  data () {
      return {
        btnHeaderList: [
          {
            text:"戻る"
          },
          {
            text:"追加"
          },
          {
            text:"変更"
          },
          {
            text:"削除"
          }
        ],
        methodHeaderList: [
          {
            method:"戻る",
          },
          {
            method:"最終更新",
          },
          {
            method:"削除",
          },
        ],
      }
  },
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}
td{
  line-break: anywhere;
}
.td-border-date, .td-border-name{
  height: 25px;
  border: 1px solid black;
  padding: 5px;
}
.td-border-date{
  min-width: 100px;
}
.td-border-name{
  min-width: 150px;

}
</style>
