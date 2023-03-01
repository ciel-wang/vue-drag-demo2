import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '/public/assets/iconfont/iconfont.css';
import '@/styles/common.scss';
import '@/styles/reset.css';

import '@/custom-component'; // 注册自定义组件

Vue.use(ElementUI, { size: 'small' });
Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
