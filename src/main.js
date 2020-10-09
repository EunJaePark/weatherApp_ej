import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false


export const eventbus = new Vue({
  methods: {
    //searchCity컴포넌트에서 input에 입력한 나라명을 City.vue로 전달하기 위한 이벤트버스.
    inputName(cityInput) {
      this.$emit('sendCityName', cityInput);
    },
    alertMessage(message) {
      this.$emit('errorCheck', message);
    },
    checkCity(check) {
      this.$emit('checkCity', check);
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
