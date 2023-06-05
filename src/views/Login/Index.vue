<template>
  <div class="d-flex justify-center align-center login_wrap">
    <div class="login">
      <v-card class="pa-8">
        <v-card-title>ログイン</v-card-title>
        <v-text-field label="ユーザーID" variant="outlined"></v-text-field>
        <v-text-field
          variant="outlined"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="パスワード"
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <div class="fill-height mt-4">
          <v-btn block color="#97E4FF" size="large" v-on:click="onClick()">
            ログイン
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const showPassword = ref(false);

// TODO: ログインの挙動の仮実装を本番仕様に差し替える必要あり / Temporally implemented login function
const router = useRouter();
const onClick = () => {
  router.push("/top");
};
</script>

<style lang="scss" scoped>
.login {
  &_wrap {
    height: calc(100vh - 56px - 72px);
  }
  width: 480px;
}
</style>
