import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  message: string,
  statusResponse: number | null
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    message: '',
    statusResponse: null
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    setStatusResponse(state, status) {
      state.statusResponse = status;
    }
  },
  getters: {
    getMessage(state) {
      return state.message;
    },
    getStatusResponse(state) {
      return state.statusResponse;
    }
  },
  actions: {
    setMessage({commit }, message) {
      commit('setMessage', message);
    },
    setStatusResponse({ commit }, status) {
      commit('setStatusResponse', status);
    }
  }
})
export function useStore () {
  return baseUseStore(key);
}
