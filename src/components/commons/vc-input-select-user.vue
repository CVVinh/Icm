<template>
  <v-container>
    <v-text-field
      id="input-select"
      label="user"
      :variant="variant"
      :density="density"
      :model-value="getDisplayName"
      @update:model-value="search($event)"
      clearable
      hide-details
      @click:clear="clear"
      autocomplete="off"
      @keydown.delete="pressDelete"
    ></v-text-field>

    <v-menu activator="#input-select" :close-on-back="false">
      <v-list :max-height="250">
        <v-list-item
          v-for="(user, index) in state.userList"
          :key="index"
          :value="index"
          @click="clickItem(user)"
        >
          <v-list-item-title>{{ user.userName }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-container>
</template>
<script lang="ts" setup>
import { ref, onMounted, PropType, computed, reactive } from "vue";

defineProps({
  variant: {
    type: String as PropType<
      "outlined" | "plain" | "underlined" | "filled" | "solo" | undefined
    >,
    default: "underlined",
  },
  density: {
    type: String as PropType<"default" | "comfortable" | "compact">,
    default: "compact",
  },
});

const state = reactive({
  userList: [{ userId: 1, userName: "123" }] as SysUser[],
  selectedUser: undefined as SysUser | undefined,
  inputValue: undefined as string | undefined,
});

const emits = defineEmits(["select"]);

const timeoutRef = ref<NodeJS.Timeout | null>(null);

const getDisplayName = computed(() => {
  if (!state.selectedUser) {
    return state.inputValue;
  }
  return state.selectedUser.userName;
});

onMounted(async () => {
  await getUserList();
});

const getUserList = async () => {
  console.log("get user");
};

const search = (freeText: string) => {
  state.inputValue = freeText;
  if (!freeText) {
    return;
  }
  timeoutRef.value && clearTimeout(timeoutRef.value);
  timeoutRef.value = setTimeout(() => getUserList(), 500);
};

const clickItem = (user: SysUser) => {
  state.selectedUser = user;
  state.inputValue = user.userName;
  emits("select", user);
};

const clear = () => {
  state.inputValue = "";
  state.selectedUser = undefined;
};

const pressDelete = () => {
  state.selectedUser = undefined;
};
</script>
<style lang="scss" scoped></style>
