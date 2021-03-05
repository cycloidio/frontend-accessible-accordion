import { createApp } from 'vue';
import App from './App.vue';
import Vue3AccessibleAccordion from './index';
import DKToast from 'vue-dk-toast';

const app = createApp(App);

app.use(Vue3AccessibleAccordion);
app.use(DKToast, {
	duration: 5000,
	positionY: 'top',
	styles: {
		color: '#ffffff',
		backgroundColor: '#1c9797',
	},
});
app.mount('#app');
