import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import Paginate from "vuejs-paginate";
import VueMeta from "vue-meta";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Loader from "@/components/app/Loader";
import messagePlugin from "@/utils/message.plugin";
import tooltipDirective from "@/directives/tooltip.directive";
import dateFilter from "@/filters/date.filter.js";
import localizeFilter from "@/filters/localize.filter.js";
import currencyFilter from "@/filters/currency.filter.js";
import "materialize-css/dist/js/materialize.min";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter("date", dateFilter);
Vue.filter("localize", localizeFilter);
Vue.filter("currency", currencyFilter);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

const firebaseConfig = {
    apiKey: "AIzaSyCRkEb6qZzICAOagSc9_3TscLgSwFOjCYU",
    authDomain: "vue-crm-uk.firebaseapp.com",
    databaseURL: "https://vue-crm-uk.firebaseio.com",
    projectId: "vue-crm-uk",
    storageBucket: "vue-crm-uk.appspot.com",
    messagingSenderId: "759754440205",
    appId: "1:759754440205:web:bfe55888a9056035e9df44",
    measurementId: "G-6VSCDJ1KBH",
};
firebase.initializeApp(firebaseConfig);

let app;
firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            store,
            render: (h) => h(App),
        }).$mount("#app");
    }
});
