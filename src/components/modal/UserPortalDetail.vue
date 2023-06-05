<template>
        <v-card>
            <v-container>
                <p>利用者ポータル > 各種申請詳細</p>
                <v-row class="justify-end">
                    <v-col cols="1">
                        <v-btn 
                            color="#E0E0E0"
                            v-on:click="$emit('ClickUserportalModal')"
                        >戻る</v-btn>
                    </v-col>
                    <v-col cols="1">
                        <v-btn
                            color="#97E4FF"
                            v-on:click="$emit('ClickUserportalModal')"
                        >申請</v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="4">
                        <h4>申請者</h4>
                    </v-col>
                    <v-col cols="4">
                        <h4>資産利用者</h4>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="2">
                        <vc-input 
                            v-model="searchState.organization_name"
                            dense
                            label="会社/組織"
                            density="compact"
                            variant="underlined"
                        ></vc-input>
                    </v-col>
                    <v-col cols="2">
                        <vc-input
                            v-model="searchState.account_name"
                            dense
                            density="compact"
                            variant="underlined"
                            label="申請者"
                        ></vc-input>
                    </v-col>
                    <v-col cols="2">
                        <vc-select
                        :items="company"
                        item-title="text"
                        item-value="value"
                        return-object
                        label="選択"
                        density="compact"
                    />
                    </v-col>
                    <v-col cols="2">
                        <vc-select
                        :items="user"
                        item-title="text"
                        item-value="value"
                        return-object
                        label="選択"
                        density="compact"
                    />
                    </v-col>
                </v-row>
            </v-container>
<!--申請対象資産-->
            <v-container>
                <v-card class="pa-3">
                    <v-row>
                        <v-col cols="12">
                            <h4>申請対象資産</h4>
                        </v-col>
                        
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_application.application_state"
                                density="compact"
                                variant="underlined"
                                label="申請状況"
                                disabled
                            ></vc-input>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_application.asset_status"
                                density="compact"
                                variant="underlined"
                                label="資産ステータス"
                            ></vc-input>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_application.asset_id"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="資産ID"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application.asset_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="資産名称"
                            ></vc-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application.organization_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="利用組織"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application.account_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="利用者"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application.use_on_from"
                                counter
                                density="compact"
                                variant="underlined"
                                label="利用開始日"
                            ></vc-input>
                        </v-col>
                        <v-spacer/>
                    </v-row>
                </v-card>    
            </v-container>
<!--代替手配資産-->
            <v-container>
                <v-card class="pa-3">
                    <v-row>
                        <v-col cols="12">
                            <h4>代替手配資産</h4>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_substitute.substitute_stete"
                                density="compact"
                                variant="underlined"
                                label="利用者代替手配対応"
                                disabled
                            ></vc-input>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_substitute.asset_status"
                                density="compact"
                                variant="underlined"
                                label="資産ステータス"
                            ></vc-input>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_substitute.asset_id"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="資産ID"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_substitute.asset_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="資産名称"
                            ></vc-input>
                        </v-col>       
                    </v-row>
                    <v-row>             
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_substitute.organization_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="利用組織"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_substitute.account_name"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="利用者"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_substitute.use_on_from"
                                counter="30"
                                density="compact"
                                variant="underlined"
                                label="利用開始日"
                            ></vc-input>
                        </v-col>
                    </v-row>
                </v-card>
            </v-container>
<!--申請種類-->
            <v-container>
                <v-card class="pa-3">
                    <v-row>
                        <v-col cols="12">
                            <h4>申請詳細</h4>
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_application_detail.application_id"
                                dense
                                density="compact"
                                variant="underlined"
                                label="申請ID (自動採番)"
                                disabled
                            ></vc-input>
                        </v-col>
                        <v-col cols="2">
                            <vc-select
                            v-model="searchState_application_detail.application_kinds"
                            :items="aset"
                            item-title="text"
                            item-value="value"
                            return-object
                            label="申請種類"
                            density="compact"
                        />
                        </v-col>
                        <v-col cols="2">
                            <vc-input
                                v-model="searchState_application_detail.application_menu"
                                dense
                                density="compact"
                                variant="underlined"
                                label="申請メニュー"
                                disabled
                            ></vc-input>
                        </v-col>
                    </v-row>
                    <v-row dense>
                        <v-col cols="2">
                            <vc-input-date
                                label="申請日"
                                v-model="application_menu"
                            ></vc-input-date>
                        </v-col>
                        <v-col cols="2">
                            <vc-input-date 
                                label="対応完了希望日"
                                v-model="request_completion_date"
                            ></vc-input-date>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application_detail.change_organization"
                                dense
                                density="compact"
                                variant="underlined"
                                label="利用者変更後会社/組織"
                            ></vc-input>
                        </v-col>
                        <v-col cols="3">
                            <vc-input
                                v-model="searchState_application_detail.change_account"
                                dense
                                density="compact"
                                variant="underlined"
                                label="利用者変更後利用者"
                            ></vc-input>
                        </v-col>
                    </v-row>
                    <v-col cols="10">
                        <v-textarea
                         v-model="searchState_application_detail.remarks"
                        label="要望/申し送り"
                        ></v-textarea>
                    </v-col>
                </v-card>
            </v-container>
        </v-card>
</template>
<script setup lang="ts">
import { on } from "events";
import { reactive , ref } from "vue";
import HelpdeskInformation from "@/models/userrequest-information.model";
import { Helpdeskservice } from "@/apis/Helpdesk/helpdesk.service";

//カレンダー
const application_menu = document.querySelector('input[type="date"]');
const request_completion_date = document.querySelector('input[type="date"]');
//ダイアログ処理
const dialogListItem = ref(false);

//未使用
let searchState = reactive({
    organization_name: undefined,
    account_name: undefined,
    use_on_from: undefined,
    asset_name: undefined,
    asset_id: undefined,
    asset_status: undefined,
});

//申請対象資産
let searchState_application = reactive({
    application_state: undefined,
    asset_status: undefined,
    asset_id: undefined,
    asset_name: undefined,
    organization_name: undefined,
    account_name: undefined,
    use_on_from: undefined,
});


//代替え手配資産
let searchState_substitute = reactive({
    substitute_stete: undefined,
    application_state: undefined,
    asset_status: undefined,
    asset_id: undefined,
    asset_name: undefined,
    organization_name: undefined,
    account_name: undefined,
    use_on_from: undefined,
})

//申請詳細
let searchState_application_detail = reactive({
    application_id: undefined,
    application_kinds: undefined,
    application_menu: undefined,
    application_from: undefined,
    request_completion_date: undefined,
    change_organization: undefined,
    change_account: undefined,
    remarks: undefined,
})
//申請ボタン処理



//プルダウンの内容
const user = ref<any[]>([
  { value: '1', text: '田中太郎' },
  { value: '2', text: '山田太郎' },
  { value: '3', text: '佐藤太郎' },
])
const company = ref<any[]>([
  { value: '1', text: '会社' },
  { value: '2', text: '組織' },
  { value: '3', text: '拠点' },
])
const aset = ref<any[]>([
  { value: '1', text: '資産' },
  { value: '2', text: 'クラウドライセンス' },

])

//ダイアログ詳細ポータルのボタン処理
interface Emits {
  (event: "clickUserportalModal"): void
}
const emit =defineEmits<Emits>();
const ClickHelpdeskModal = (): void => {
    emit("clickUserportalModal");
}

</script>

<style scoped>






</style>
