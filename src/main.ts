import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(far, fas, fab)
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app
.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app");
