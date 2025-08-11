import { createApp } from 'vue';
import App from './App.vue';

import './assets/main.css';
import { OutputExample } from './output-example';
// TODO(cqcpcqp) 这样import认真的么。。。
// 而且这样搞完之后也没办法按需引入了吧
import '../../packages/ds-ui/umd/index.mini';

// new OutputExample().render();
createApp(App).mount('#app');
