

import ConfigProvider, { message } from 'ant-design-vue';
import antdvIcons from '@/plugin/antdvIcons';
import vxeTable from '@/plugin/vxeTable';
import Router from './router';
import App from './App.vue';
import 'ant-design-vue/lib/message/style/index.less';
import 'ant-design-vue/lib/notification/style/index.less';
import '@/assets/scss/common.scss';
import '@/assets/scss/fixedAntdv.scss';
import '@/assets/scss/fixedMap.scss';
import '@/assets/scss/fixedVxeTable.scss';
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
const app = createApp(App);

app.use(createPinia());
app.use(Router);
app.use(message);
app.use(antdvIcons);
app.use(vxeTable);
app.use(ConfigProvider);
app.use(Vue3ColorPicker)
app.mount('#app');
