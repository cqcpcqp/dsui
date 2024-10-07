import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import { OutputExample } from './output-example';
// TODO(cqcpcqp) 这样import认真的么。。。
import '../../packages/ds-ui/umd/index.mini';

// new OutputExample().render();
createApp(App).mount('#app');
