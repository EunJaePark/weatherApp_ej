<template>
  <div 
    class="city clear"
    
  ><!-- @cityname = "newCity" v-bind="weatherBG"-->
    <div class="mainWeather">
      <h1 class="cityname">{{ city.name }}</h1>
      <span class="date">Sunday 30 April</span>

      <div v-if="weather" class="clear">
        <h3>배경에 적용되어야 할 날씨id : ***** {{ weather[0].id }} *****</h3>
        <div class="iconBox">
          <img v-bind:src="`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`" />
        </div>
        <div class="textBox">
         <span class="temp">{{ temp }}℃</span> <!--평균기온-->
          <span v-for="item in weather" class="weatherText">{{ item.main }}.  </span> <!--날씨-->
        </div>
      </div>
    </div><!--.mainWeather-->

    <div class="weatherInfo">
      <div v-if="tempInfo">
        <span>{{ maxTemp }}℃<span>Heigh</span></span> <!--최고 기온-->
        <span>{{ minTemp  }}℃<span>Low</span></span>  <!--최저 기온-->    
        <span>{{ tempInfo.humidity }}%<span>Humidity</span></span> <!--습도-->     
      </div>

      <div v-if="wind">
        <span>{{ wind.speed }}m/s<span>Wind</span></span> <!--바람-->
        <!-- <span>{{ windDeg }}풍({{ wind.deg }}) {{ wind.speed }}m/s<span>Wind</span></span> -->
      </div>

      <div v-if="sun">
        <span>{{ sunriseTime }}<span>Sunrise</span></span> <!--일출-->
        <span>{{ sunsetTime }}<span>Sunset</span></span> <!--일몰-->
      </div>
    </div><!--.weatherInfo-->

    <h2>Forecast</h2>
    <div class="weather5dayInfo">      
      <ul>
        <li v-for="item in date5days">
          <span>{{ `${new Date(item.dt * 1000).getMonth() + 1 < 10 ? `0${new Date(item.dt * 1000).getMonth() + 1}` : `${new Date(item.dt * 1000).getMonth() + 1}`}.${new Date(item.dt * 1000).getDate() < 10 ? `0${new Date(item.dt * 1000).getDate()}` : `${new Date(item.dt * 1000).getDate()}`}` }} </span>
          <span>{{ `${new Date(item.dt * 1000).getHours()}:${new Date(item.dt * 1000).getMinutes()}0` }} </span>
          <!-- <span>{{ item.weather[0].main }}</span> -->
          <img v-bind:src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" />
          <span>{{ Math.round(item.main.temp) }}℃</span>
        </li>
      </ul>
    </div><!--.weather5dayInfo-->

    
    <!-- <div style="outline:2px solid gray;  padding:20px;">
      <p>날씨 전체 데이터</p>
      {{ city }}
    </div> -->
  </div><!--.city-->
</template>

<script>
import { eventbus } from '../main'
export default {
  data() {
    return {
      cityname: '',
      // signal: false,
      minus: 273.15,  // json데이터에서 temp는 Kelvin(절대온도)이므로 273.15를 빼주어야한다. // 켈빈은 절대온도(0을 기전으로 함)에 기반으로 하여 측정되는 온도이며, 'K' 심볼이 사용됩니다. 0K 은 -273.15 °C, 혹은 -459.67 °F 로 변환될 수 있습니다.
      weatherId: '',
    }
  },
  computed: {
    // 각 데이터 선언.
    city () {
      console.log(this.$store.state.weatherData);
      
      return this.$store.state.weatherData
    },
    tempInfo() {
      return this.$store.state.weatherData.main
    },
    weather() {
      return this.$store.state.weatherData.weather
    },
    sun() {
      return this.$store.state.weatherData.sys
    },
    wind() {
      return this.$store.state.weatherData.wind
    },

    // 기온: 섭씨로 수정 + 소수점 반올림.
    temp() {
      return Math.round(this.tempInfo.temp - this.minus)  // 소수점 반올림.
    },
    maxTemp() {
      return Math.round(this.tempInfo.temp_max - this.minus)
    },
    minTemp() {
      return Math.round(this.tempInfo.temp_min - this.minus)
    },

    // 날씨에 따른 배경 체인지.
    // weatherBG() {  
    //   localStorage.setItem('weatherID', this.weather[0].id) 
    //   let id = this.weather[0].id
    //   console.log(id);
      
    //   if(id < 300) {
    //     console.log('Thunderstorm')    
    //     localStorage.setItem('weather', 'thunderstorm')     
    //     let bg = document.querySelector('.city').classList.add('thunderstorm')   
    //   } else if(id < 400) {
    //     console.log('Drizzle')   
    //     localStorage.setItem('weather', 'drizzle')  
    //     let bg = document.querySelector('.city').classList.add('drizzle') 
    //   } else if(id < 600) {
    //     console.log('이건Rain')   
    //     localStorage.setItem('weather', 'rain')        
    //     let bg = document.querySelector('.city').classList.add('rain')           
    //   } else if(id < 700) {
    //     console.log('Snow')  
    //     localStorage.setItem('weather', 'snow')  
    //     let bg = document.querySelector('.city').classList.add('snow')    
    //   } else if(id < 800) {
    //     console.log('Atmosphere')  
    //     localStorage.setItem('weather', 'atmosphere')  
    //     let bg = document.querySelector('.city').classList.add('atmosphere')         
    //   } else if(id >= 801) {
    //     console.log('Clouds')  
    //     localStorage.setItem('weather', 'clouds')    
    //     let bg = document.querySelector('.city').classList.add('clouds')     
    //   } else if(id = 800) {
    //     console.log('Clean') 
    //     localStorage.setItem('weather', 'clean')  
    //     let bg = document.querySelector('.city').classList.add('clean')  
    //   }
    //   return this.weatherBg(id)       
    // },


    // weatherID() {
    //   console.log('왜 weather의 length랑 [0]이랑 다 안되는거야....ㅠㅠ');
      
    //   console.log(this.weather)
      
    //   for(let i = 0; i < this.weather.length; i++) {
    //     return this.weather[i].id
    //   }
    // },
    // 날씨에 따른 배경 체인지.
    weatherBG() {  
      localStorage.setItem('weatherID', this.weatherID) 
      this.weatherId = this.weatherID
      console.log(`this.weatherId: ${this.weatherId}`);
      
      return this.weatherBg(this.weatherId)     
    },

    //일출,일몰시간: 유닉스 시간을 표준시간으로 변경.
    sunriseTime() {
      // unix시간 변환.
      const sunrise = this.sun.sunrise
      console.log(sunrise);
      const sunrisetime = new Date(sunrise * 1000)
      const sunriseTimestr = `${(sunrisetime.getHours() % 12) < 10 ? `0${sunrisetime.getHours() % 12}` : `${sunrisetime.getHours() % 12}`}:${sunrisetime.getMinutes() < 10 ? `0${sunrisetime.getMinutes()}` : `${sunrisetime.getMinutes()}`}`
      return sunriseTimestr;
    },
    sunsetTime() {
      // unix시간 변환.
      const sunset = this.sun.sunset
      console.log(sunset);
      const sunsettime = new Date(sunset * 1000)
      const sunsetTimestr = `${(sunsettime.getHours() % 12) < 10 ? `0${sunsettime.getHours() % 12}` : `${sunsettime.getHours() % 12}`}:${sunsettime.getMinutes() < 10 ? `0${sunsettime.getMinutes()}` : `${sunsettime.getMinutes()}`}`
      return sunsetTimestr;
    },

    // // 풍향: 방위 각도를 한글로 수정.
    // windDeg() {
    //   let cardinalPoints = null
    //   if(0 <= this.wind.deg < 11.25 || 348.75 <= this.wind.deg < 360) { cardinalPoints = '북' }
    //   else if(11.25 <= this.wind.deg < 78.75)  { cardinalPoints = '북동' }
    //   else if(78.75 <= this.wind.deg < 123.75)  { cardinalPoints = '동' }
    //   else if(123.75 <= this.wind.deg < 146.25)  { cardinalPoints = '남동' }
    //   else if(146.25 <= this.wind.deg < 191.25)  { cardinalPoints = '남' }
    //   else if(191.25 <= this.wind.deg < 236.25)  { cardinalPoints = '남서' }
    //   else if(236.25 <= this.wind.deg < 281.25)  { cardinalPoints = '서' }
    //   else if(281.25 <= this.wind.deg < 348.75)  { cardinalPoints = '북서' }

    //   return cardinalPoints
    // },

    // 5days 시간별 날씨 전체 데이터.
    weather5days() {
      return this.$store.state.weather5daysData
    },
    // 5days 날짜 + 기온 + icon(id).
    date5days() {
      return this.weather5days.list
    }

  },
  created() {  
    // 페이지에 새롭게 접속할 경우, 이전에 입력해놓았던 나라가 보이도록 로컬스토리지에서 나라이름 가져옴.
    const localstorageCityName = localStorage.getItem('city_name')
    this.newCity(localstorageCityName)
    // 페이지 새로고침시 weather에 따른 배경색 주기위함.
    // const weatherID = localStorage.getItem('weatherID')
    // console.log(weatherID)
    // this.weatherBg(weatherID)

    

    // SearchCity.vue에서 input에 입력한 나라이름 가져와서 새롭게 나라날씨 데이터 가져옴.
    // eventbus.$on('sendCityName', (cityInput, signal) => {
    eventbus.$on('sendCityName', (cityInput) => {
      console.log(cityInput)
      // console.log(signal);     

      // 나라 이름이 맞을 경우 날씨데이터 보여주고, 이름 틀릴경우 알림창 뜨도록하기.(아직 미완성) 
      // if(signal === true) {
        // this.newCity(cityInput)
      // }    

      if(cityInput) {
        this.newCity(cityInput)
        let weatherid = null
        console.log(weatherid);
        console.log(this.$store.state.weatherData);
        console.log(this.weatherBg);
        
        this.weatherBg(weatherid)
      }
      
    }) 
    

    
        
  },
  methods: {
    // api주소에 입력한 도시이름 넣어줌.(api의 index.js)
    newCity(cityname) {
      console.log('city name 받았어!!!!!!!!!');
      this.$store.dispatch('FETCH_WEATHER', cityname)    
      this.$store.dispatch('FETCH_5DAYS', cityname) 
    },

    weatherBg(id) {
      // const bg = this.weather[0].id
      // console.log(bg);
      // const entireBG = null
      console.log(id); //console에 null로 뜨네...?
      // id = this.weather[0].id
      console.log(`이걸로 날씨id가 적용되는건데.....!화면에 뜬 숫자랑 같은가.....${id}`);
      console.log(this);
      
      if(id < 300) {
        console.log('Thunderstorm')    
        localStorage.setItem('weather', 'thunderstorm')     
        document.querySelector('.city').classList.add('thunderstorm')   
      } else if(id < 400) {
        console.log('Drizzle')   
        localStorage.setItem('weather', 'drizzle')  
        document.querySelector('.city').classList.add('drizzle') 
      } else if(id < 600) {
        console.log('이건Rain')   
        localStorage.setItem('weather', 'rain')        
        document.querySelector('.city').classList.add('rain')           
      } else if(id < 700) {
        console.log('Snow')  
        localStorage.setItem('weather', 'snow')  
        document.querySelector('.city').classList.add('snow')    
      } else if(id < 800) {
        console.log('Atmosphere')  
        localStorage.setItem('weather', 'atmosphere')  
        document.querySelector('.city').classList.add('atmosphere')         
      } else if(id >= 801) {
        console.log('Clouds')  
        localStorage.setItem('weather', 'clouds')    
        document.querySelector('.city').classList.add('clouds')     
      } else if(id = 800) {
        console.log('Clean') 
        localStorage.setItem('weather', 'clean')  
        document.querySelector('.city').classList.add('clean')  
      }
    }
  }
}


    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.
    // 온도, 날씨정보, 도시명, 날짜 출력.
</script>

<style>
.clear:after{ content:''; display:block; clear:both; }
.thunderstorm{ background-color:darkslategrey; }
.drizzle{ background-color:yellowgreen; }
.rain{ background-color:lightcyan; }
.snow{ background-color:burlywood; }
.atmosphere{ background-color:blue; }
.clean{ background-color:skyblue; }
.clouds{ background-color:darkgrey; }

.city{ outline:0px solid orange; min-height:100vh; padding:250px 100px 40px; }

.mainWeather{ outline:0px solid red; width:50%; float:left; }
.mainWeather > .cityname{ outline:0px solid red; font-size:45px; font-weight:bold; }
.mainWeather > .date{ margin:10px 0 50px; font-size:20px; display:block; }
.mainWeather > div{  height:200px; }
.mainWeather > div > .iconBox{ outline:0px solid lime; width:50%; padding-top:10px; float:left; }
.mainWeather > div > .iconBox > img{ outline:0px solid lime; width:180px; margin:0 0 0 auto; display:block; }
.mainWeather > div > .textBox{ outline:0px solid blue; width:50%; height:100%; padding:40px 0; float:left; }
.mainWeather > div > .textBox > .temp{ outline:0px solid blue; font-size:70px;  }
.mainWeather > div > .textBox > .weatherText{ outline:0px solid blueviolet; margin-left:10px; font-size:20px; display:block;  }

.weatherInfo{ border-radius:10px;  width:calc(50% + -20px);  margin:100px 0 0 20px; background-color:rgba(255, 255, 255, .2); float:left; }
.weatherInfo span{ width:33.3%; height:100px; padding:26px 0; font-size:20px; text-align:center; float:left; position:relative; } /* 날씨정보 */
.weatherInfo span > span{  width:100%; height:auto; padding:0; font-size:15px; position:absolute; bottom:26px; left:0; }  /* 날씨정보 타이틀 */

/* <div class="weather5dayInfo">
      <ul>
        <li v-for="item in date5days">
          <span>{{ `${new Date(item.dt * 1000).getMonth() + 1}.${new Date(item.dt * 1000).getDate()}` }} </span>
          <span>{{ `${new Date(item.dt * 1000).getHours()}:${new Date(item.dt * 1000).getMinutes()}0` }} </span>
          <span>{{ Math.round(item.main.temp) }}</span>
          <span>{{ item.weather[0].main }}</span>
          <img v-bind:src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`" />
        </li>
      </ul>
    </div><!--.weather5dayInfo--> */

h2{ width:100%; margin:30px 0 15px; font-weight:400; font-size:25px; text-align:left; display:inline-block; }
.weather5dayInfo{  width:100%; overflow:scroll; }
.weather5dayInfo > ul{width:4400px;  }
.weather5dayInfo > ul:after{ content:''; display:block; clear:both; }
.weather5dayInfo > ul > li{ border-radius:5px; width:90px; padding:10px; list-style:none; background-color:rgba(255, 255, 255, .2); float:left; }
.weather5dayInfo > ul > li + li{ margin-left:20px; }

.weather5dayInfo > ul > li > span{ text-align:center; display:block; }
.weather5dayInfo > ul > li > img{ width:70%; margin:0 auto; display:block; }

@media screen and (max-width: 900px) {
  .city{ padding:150px 40px 40px; }
  .mainWeather{ width:100%; }
  .weatherInfo{ width:100%; margin:50px 0; padding:0 50px; }
}

@media screen and (max-width: 550px) {
  .mainWeather > div > .iconBox > img{ width:130px; }
  .mainWeather > div > .textBox > .temp{ font-size:50px; }
  .weatherInfo{ width:100%; margin:30px 0; padding: 0 10px; }
}
</style>
