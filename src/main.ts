import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import Antd from 'ant-design-vue'
import { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import '@/style/index.css'

Vue.use(Antd)
Vue.prototype.$message = message
Vue.config.productionTip = false

new Vue({
	router,
	render: (h) => h(App),
}).$mount('#app')