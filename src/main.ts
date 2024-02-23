import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {Vuelize} from "vuelize";
import {initDB} from "./dataSource";

initDB().then(()=>{
    createApp(App).use(Vuelize).mount('#app')
});
