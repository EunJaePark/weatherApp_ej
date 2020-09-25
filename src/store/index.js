import Vue from 'vue'
import Vuex from 'vuex'
import { weatherCity, /*weatherIcon,*/ weather5days } from '../api/index'

Vue.use(Vuex)

export default new Vuex.Store({ //const로 선언하는 것과 차이....?
  state: {
    weatherData: [],
    weather5daysData: [],
  },
  mutations: {
    SET_CITY(state, city) {
      state.weatherData = city
    },
    // SET_ICON(state, icon) {
    //   state.iconData = icon
    // },
    SET_5DAYS(state, city) {
      state.weather5daysData = city
    },
  },
  actions: {
    FETCH_WEATHER(context, cityname) {
      // 직전에 검색했던 도시명 불러와 변수 선언.
      let savedCity = localStorage.getItem('city_name');
      return weatherCity(cityname)
      .then(res => {
        context.commit('SET_CITY', res.data);
        return res;
      })
      .catch(err => {
        console.log(`직전에 검색했던 도시: ${savedCity}`);
        // 도시명이 올바르지 않을 경우 알림창 띄움.
        alert('검색 지역을 올바르게 입력해 주세요.');
        // 도시명이 올바르지 않을 경우, 직전에 검색했던 도시명을 다시 사용.
        localStorage.setItem('city_name', savedCity);
      })
    },
    FETCH_5DAYS(context, cityname) {
      return weather5days(cityname)
      .then(res => {
        context.commit('SET_5DAYS', res.data)
        return res
      })
      .catch(err => {
        console.log(err);
        
      })
    },
  },
  modules: {
  }
})
