import { App } from 'vue'

import VcInput from './vc-input.vue'
import VcButton from './vc-button.vue'
import VcSelect from './vc-select.vue'
import VcInputDate from './vc-input-date.vue'
import VcTextarea from './vc-textarea.vue'
import SearchComponent from './search-component.vue'
import DialogListItem from './dialog-list-item.vue'



const requireComponent = {
  VcInput,
  VcButton,
  VcSelect,
  VcInputDate,
  SearchComponent,
  DialogListItem,
  VcTextarea
}
const register = (app: App<Element>): void => {
  Object.entries(requireComponent).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  register,
}
