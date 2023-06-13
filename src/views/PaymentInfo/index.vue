<template>
    <v-container class="">
        <v-row>
            <v-col cols="8">
                <v-card class="mt-4">
                    <v-card-title>
                        <v-icon color="green" icon="mdi-check-underline" size="50"></v-icon>
                        <span class="text-h4">Checkout</span> 
                    </v-card-title>
                    <v-card-text class="ml-15">
                        <h2>Xác nhận thông tin thanh toán</h2>
                    </v-card-text>
                </v-card>

                <!-- alert -->
                <v-alert class="mt-5" type="success" title="Nếu bạn có sự thay đổi sau khi đặt xe?"
                    text="Bạn sẽ được hoàn trả lại tiền nếu bạn huỷ đặt xe trong vòng 48 giờ!">
                </v-alert>

                <!-- car information ordered  -->
                <v-card class="mt-7">
                    <v-row>
                        <v-avatar class="ma-3" size="300" rounded="0">
                            <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png" cover></v-img>
                        </v-avatar>
                        <v-card-text>
                            <v-row align="center" no-gutters>
                                <v-col class="d-flex">
                                    <span class="text-h1 font-weight-black">CHERVOLET</span> <span
                                        class="text-h5 align-self-center text-medium-emphasis ml-5">Xe siêu sang</span>
                                </v-col>
                            </v-row>
                            <v-row align="center" no-gutters class="d-flex mt-3 align-self-center text-h5">
                                <v-col cols="3">
                                    <v-icon icon="mdi-account-outline" size="60"></v-icon>
                                    <span class="ml-2">2 chỗ</span>
                                </v-col>
                                <v-col cols="3">
                                    <v-icon color="yellow" icon="mdi-star" size="60"></v-icon>
                                    <span class="ml-2">5.0</span>
                                </v-col>
                            </v-row>
                            <v-row align="center" no-gutters class="d-flex mt-3 align-self-center text-h5">
                                <v-col cols="3">
                                    <v-icon icon="mdi-cogs" size="60"></v-icon>
                                    <span class="ml-2">Số tự động</span>
                                </v-col>
                                <v-col cols="3">
                                    <v-icon icon="mdi-car-multiple" size="60"></v-icon>
                                    <span class="ml-2">5 chuyến</span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-row>
                </v-card>

                <!-- receiving address -->
                <v-card class="justify-center mt-7">
                    <v-card-title>
                        <v-icon color="red" icon="mdi-map-marker" size="50"></v-icon>
                        <span class="text-h4">Địa chỉ nhận</span>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <h2>Xuân khánh, Ninh Kiều, Cần Thơ</h2>
                    </v-card-text>
                </v-card>
                
                <!-- info user -->
                <v-sheet class="pa-6 mt-7" :elevation="3" rounded>
                    <v-row>
                        <v-col>
                            <div class="d-flex">
                                <v-icon color="blue" icon="mdi-account-alert" size="50"></v-icon>
                                <span class="ml-3">
                                    <p class="text-h4">Thông tin người thuê!</p>
                                    <p class="ml-1">Thông tin cá nhân của người thuê xe</p>
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-form ref="inforUserForm"
                        class="pa-10"
                    >
                        <v-row>
                            <v-col cols="12">
                                <vc-select
                                    label="Chọn thông tin"
                                    v-model="infoUserSelected"
                                    variant="underlined"
                                    density="comfortable"
                                    :items="mstBaseUser"
                                    class="table-submit-elements"
                                    item-title="baseName"
                                    item-value="baseId"
                                    no-data-text="Không có dữ liệu"
                                    @onChange="onChangeSelected"
                                    >
                                </vc-select>
                            </v-col>
                             <v-col cols="12">
                                <div class="form-input">
                                    <!-- <vc-input
                                        label="Địa chỉ người thuê"
                                        name="address"
                                        :rules="['required']"
                                        :value="baseUserInfo.address"
                                        v-model="baseUserInfo.address"
                                    /> -->
                                    <v-text-field
                                        v-model="baseUserInfo.address"
                                        label="Địa chỉ người thuê"
                                        density="compact"
                                        variant="underlined"
                                        required
                                    />
                                </div>
                            </v-col>
                            
                            <v-col cols="12">
                                <div class="form-input">
                                    <!-- <vc-input
                                        label="Email"
                                        name="eMailAddress"
                                        :rules="['required']"
                                        :value="baseUserInfo.address"
                                        v-model="baseUserInfo.eMailAddress"
                                        @update:value="updateInput"
                                    /> -->
                                    <v-text-field
                                        v-model="baseUserInfo.eMailAddress"
                                        label="Email"
                                        density="compact"
                                        variant="underlined"
                                        required
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="form-input">
                                    <!-- <vc-input
                                        label="Số điện thoại"
                                        name="phoneNumber"
                                        :rules="['required']"
                                        :value="baseUserInfo.telephoneNumber"
                                        v-model="baseUserInfo.telephoneNumber"
                                    /> -->
                                    <v-text-field
                                        v-model="baseUserInfo.telephoneNumber"
                                        label="Số điện thoại"
                                        density="compact"
                                        variant="underlined"
                                        required
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="form-input">
                                    <!-- <vc-input
                                        label="Số fax"
                                        name="faxNumber"
                                        :rules="['required']"
                                        :value="baseUserInfo.faxNumber"
                                        v-model="baseUserInfo.faxNumber"
                                    /> -->
                                    <v-text-field
                                        v-model="baseUserInfo.faxNumber"
                                        label="Số fax"
                                        density="compact"
                                        variant="underlined"
                                        required
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <!-- <v-btn type="submit" block class="mt-2">Submit</v-btn> -->
                    </v-form>
                </v-sheet>

                <!-- payment method -->
                <v-sheet class="pa-6 mt-7" :elevation="3" rounded>
                    <v-row>
                        <v-col>
                            <div class="d-flex">
                                <v-icon color="blue" icon="mdi-cash-check" size="50"></v-icon>
                                <span class="ml-3">
                                    <p class="text-h4">Phương thức thanh toán</p>
                                </span>
                            </div>
                        </v-col>
                    </v-row>
                    <v-form ref="paymenMethodForm"
                        lazy-validation
                        @submit.prevent
                        class="pa-10"
                    >
                        <v-row>
                            <v-col cols="12">
                                 <div class="form-selection">
                                    <vc-select
                                        label="Chọn phương thức thanh toán"
                                        density="compact"
                                        no-data-text="Không có dữ liệu"
                                        item-title="text"
                                        item-value="value"
                                    /> 
                                    <!-- v-model="modelValue.arrivalInfo.isAsset" -->
                                    <!-- :items="isAsset" -->
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="form-selection">
                                    <vc-input-date
                                        label="Ngày áp dụng thẻ"
                                        :defaultValue="2023-6-12"
                                        >
                                    </vc-input-date>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="form-input">
                                    <vc-input
                                        label="Số thẻ"
                                        name="numberCard"
                                        :rules="['required']"
                                    />
                                </div>
                            </v-col>
                                <v-col cols="12">
                                <div class="form-input">
                                    <vc-input
                                        label="CVC"
                                        name="numberCVC"
                                        :rules="['required']"
                                    />
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div class="form-input">
                                    <vc-input
                                        label="Tên chủ thẻ"
                                        name="userNameCard"
                                        :rules="['required']"
                                    />
                                </div>
                            </v-col>
                        </v-row>
                        <!-- <v-btn type="submit" block class="mt-2">Submit</v-btn> -->
                    </v-form>
                </v-sheet>
            </v-col>


            <v-col cols="4">               
                <v-card class="mt-4">
                    <v-card-item>
                        <v-card-title>
                            <!-- <v-icon color="blue" icon="mdi-account-credit-card" size="50"></v-icon> -->
                            <span class="text-h4">Tổng chi phí thanh toán</span>
                        </v-card-title>
                    </v-card-item>
                    <v-card-text class="ml-2">
                        <v-row align="center" no-gutters class="text-h5">
                            <v-col class="d-flex justify-space-between mt-4" cols="12">
                                <span>Phí thuê xe:</span>
                                <span>
                                    <p>5.808.980 &#273;</p>
                                    <small>290.800 &#273;</small>
                                </span>
                            </v-col>
                            <v-col class="d-flex justify-space-between mt-5" cols="12">
                                <span>Bảo hiểm:</span>
                                <span>
                                    <p>5.808.980 &#273;</p>
                                    <small>290.800 &#273;</small>
                                </span>
                            </v-col>
                            <v-col class="d-flex justify-space-between mt-5" cols="12">
                                <span>Ghế da:</span>
                                <span>
                                    <p>5.808.980 &#273;</p>
                                    <small>290.800 &#273;</small>
                                </span>
                            </v-col>
                        </v-row>
                        <v-divider class="mx-1 mt-3"></v-divider>
                        <v-row align="center" no-gutters class="text-h5 mt-3">
                            <v-col cols="12" class="mt-5">
                                <p class="font-weight-black">
                                    Dự chi trong 3 ngày: 12/06/2023 - 15/06/2023
                                </p>
                            </v-col>
                            <v-col class="d-flex justify-end mt-3" cols="12">
                                <v-sheet>5.808.980 &#273;</v-sheet>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { PropType, ref, reactive, computed, Ref, onMounted} from "vue";
import BaseUserInfo from "@/models/BaseUserInfo";
import { useStore } from "@/store/index";
import BaseService from "@/services/base.service";
import { watch } from "fs";

const store = useStore();
const getStatusRes = computed(() => store.getters.getStatusResponse);
var idUserCurrent = 1
var mstBaseUser = ref<any[]>([])
var infoUserSelected = ref(null);
var baseUserInfo: any = ref({
    accountId: null,
    baseId: null,
    baseName: null,
    prefCode: null,
    address: null,
    addressee: null,
    eMailAddress: null,
    telephoneNumber: null,
    faxNumber: null,
});

onMounted(async () => {
  const baseUserTemp = await BaseService.getBaseUserInfo(idUserCurrent);
  mstBaseUser.value = [...baseUserTemp.mstBaseUser];
});

function onChangeSelected(data: any){
    baseUserInfo.value = mstBaseUser.value.filter(ele => ele.baseId == data)[0]
    console.log(baseUserInfo);

}

function updateInput(data: any) {
    console.log(data);
}

</script>
