<template>
    <v-card>
      <v-card-title>会社組織選択</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field label="会社ID" v-model="returnData.group_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社名" v-model="returnData.group_name" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社郵便番号" v-model="returnData.zip_cd" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社所在地" v-model="returnData.address" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="会社電話番号" v-model="returnData.telephone_number" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="組織コード" v-model="returnData.organization_id" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="組織名称" v-model="returnData.organization_name" required></v-text-field>
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
  
  <script>
  export default {
    props: {
      //会社組織選択
      group_id: '',
      organization_name: '',
      zip_cd: '',
      address: '',
      telephone_number: '',
      organization_id: '',
      organization_name: '',
    },
    data() {
      return {
        returnData: {
          //会社組織選択
          group_id: this.group_id,
          organization_name: this.organization_name,
          zip_cd: this.zip_cd,
          address: this.address,
          telephone_number: this.telephone_number,
          organization_id: this.organization_id,
          organization_name: this.organization_name,
        }
      }
    },
    methods: {
      submit() {
        this.$emit('clickSubmit', this.returnData)
      }
    }
  }
  </script>