<template>
    <v-card>
      <v-card-title>利用者選択</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="社員ID" v-model="returnData.account_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="社員名" v-model="returnData.account_name" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社ID" v-model="returnData.group_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社名" v-model="returnData.organization_name" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="組織ID" v-model="returnData.organization_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="組織名" v-model="returnData.organization_name" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="拠点ID" v-model="returnData.base_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="拠点名" v-model="returnData.base_name" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="利用者電話番号" v-model="returnData.telephone_number" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="利用者メールアドレス" v-model="returnData.e_mail_address" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="success" @click="submit">
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
    <!--呼び出し側ダイアログbuttonとscriptの例
    <div>
      <v-btn color="success" @click.stop="dialog = true">
        開く
      </v-btn>
      <v-dialog v-model="dialog">
        <dialog-card
          :name="name"
          :email="email">
          <staff-stub-modal
          v-on:clickSubmit="onSubmit" />
        </dialog-card>
      </v-dialog>
      <v-text-field v-model="account_name" label="社員名" disabled></v-text-field>
      <v-text-field v-model="account_id" label="社員コード" disabled></v-text-field>
    </div>

    <script>
import StaffStubModal from '@/components/stub/StaffStubModal.vue'

export default {
  components: {
    StaffStubModal
  },
  data() {
    return {
      account_name: '',
      account_id: '',
      dialog: false
    }
  },
  methods: {
    onSubmit(params) {
      this.dialog =false
      this.s_name = params.account_name
      this.s_cd = params.account_id
    }
  }
}
</script>
    -->
  
  <script>
  export default {
    props: {
      //利用者選択
      account_id: '',
      account_name: '',
      group_id: '',
      organization_name: '',
      base_id: '',
      base_name: '',
      telephone_number: '',
      e_mail_address: '',
    },
    data() {
      return {
        returnData: {
          //利用者選択
          account_id: this.account_id,
          account_name: this.account_name,
          group_id: this.group_id,
          organization_name: this.organization_name,
          base_id: this.base_id,
          base_name: this.base_name,
          telephone_number: this.telephone_number,
          e_mail_address: this.e_mail_address,
        }
      }
    },
    methods: {
      submit() {
        this.$emit('clickSubmit', this.returnData )
      }
    }
  }
  </script>