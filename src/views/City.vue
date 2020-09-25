<template>
  <div 
    class="city clear"
    :class="[
      {
        'thunderstorm-light': weatherStatus === 'thunderstorm' && this.day === true,
        'drizzle-light': weatherStatus === 'drizzle' && this.day === true,
        'rain-light': weatherStatus === 'rain' && this.day === true,
        'snow-light': weatherStatus === 'snow' && this.day === true,
        'atmosphere-light': weatherStatus === 'atmosphere' && this.day === true,
        'clouds-light': weatherStatus === 'clouds' && this.day === true,
        'clean-light': weatherStatus === 'clean' && this.day === true,
        'thunderstorm-dark': weatherStatus === 'thunderstorm' && this.night === true,
        'drizzle-dark': weatherStatus === 'drizzle' && this.night === true,
        'rain-dark': weatherStatus === 'rain' && this.night === true,
        'snow-dark': weatherStatus === 'snow' && this.night === true,
        'atmosphere-dark': weatherStatus === 'atmosphere' && this.night === true,
        'clouds-dark': weatherStatus === 'clouds' && this.night === true,
        'clean-dark': weatherStatus === 'clean' && this.night === true,
      },
      {       
        'font-white': this.night === true || weatherStatus === 'rain' , 
        'font-black': this.day === true && weatherStatus !== 'rain'
      }
    ]"
  ><!-- @cityname = "newCity" v-bind="weatherBG"-->
  <!-- <div 
    class="dayBackgroundcolor"
    :class="{
      light: this.day === true, 
      dark: this.night === true
    }"
  >{{ this.day }} {{ this.night }}</div> -->
    <div class="mainWeather">
      <h1 class="cityname">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{ city.name }}</span>
      </h1>
      <!-- <span class="date">{{ today() }} / {{ city.timezone }}</span>
      <span class="date">{{ new Date() }}</span> -->
      <!-- <span class="date">{{ moment.tz("2019-11-12 15:00" , "Asia/Seoul") }}</span> -->

      <div v-if="weather" class="clear">
        <h3 class="transparent">배경에 적용되어야 할 날씨id(없애면 안됨 이 h3태그) : ***** {{weatherBG(weather[0].id) }} *****</h3>
        <div class="iconBox">
          <img v-bind:src="`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`" />
        </div>
        <div class="textBox">
         <span class="temp">{{ temp }}℃</span> <!--평균기온-->
          <span v-for="item in weather" :key="item.id" class="weatherText">{{ item.main }}.</span> <!--날씨-->
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
        <li v-for="item in date5days" :key="item.index">
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
      day: false,
      night: false,
      weatherStatus: '',
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
    //일출,일몰시간: 유닉스 시간을 표준시간으로 변경.
    sunriseTime() {
      // unix시간 변환.
      const sunrise = this.sun.sunrise
      localStorage.setItem('sunrise', sunrise)
      console.log(`일출시간 : ${sunrise}`);
      const sunrisetime = new Date(sunrise * 1000)
      console.log(`일출시간 : ${sunrisetime}`);
      const sunriseTimestr = `${(sunrisetime.getHours() % 12) < 10 ? `0${sunrisetime.getHours() % 12}` : `${sunrisetime.getHours() % 12}`}:${sunrisetime.getMinutes() < 10 ? `0${sunrisetime.getMinutes()}` : `${sunrisetime.getMinutes()}`}`
      console.log(`일출시간 : ${sunriseTimestr}`);

      // 일출/일몰 시간 이용해서 배경 밝기 조절하는 함수 실행시켜주기.
      this.sunBG();

      return sunriseTimestr;
    },
    sunsetTime() {
      // unix시간 변환.
      const sunset = this.sun.sunset
      localStorage.setItem('sunset', sunset)
      console.log(`일몰시간 : ${sunset}`);
      const sunsettime = new Date(sunset * 1000)
      const sunsetTimestr = `${(sunsettime.getHours() % 12) < 10 ? `0${sunsettime.getHours() % 12}` : `${sunsettime.getHours() % 12}`}:${sunsettime.getMinutes() < 10 ? `0${sunsettime.getMinutes()}` : `${sunsettime.getMinutes()}`}`
      return sunsetTimestr;
    },

    // // 일출, 일몰 시간에 따른 배경 밝기 조절.
    // sunBG() {
    //   const riseTime = this.sun.sunrise
    //   const setTime = this.sun.sunset
    //   console.log(riseTime, setTime, '아 왜 안되냐***********');
      
    //   this.sunbg(riseTime, setTime)
      
    //   return sunbe(riseTime, setTime)
    // },

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
    console.log(localStorage.getItem('weatherID'));
    const weatherID = localStorage.getItem('weatherID')
    // console.log(weatherID)
    this.weatherBg(weatherID)

    // 페이지 새로고침시 일출, 일몰에 따른 배경 밝기 조절.
    const sunriseTime = localStorage.getItem('sunrise')
    const sunsetTime = localStorage.getItem('sunset')
    console.log(sunriseTime, sunsetTime);
    
    this.sunbg(sunriseTime, sunsetTime)


    // SearchCity.vue에서 input에 입력한 나라이름 가져와서 새롭게 나라날씨 데이터 가져옴.
    eventbus.$on('sendCityName', (cityInput) => {
      console.log(cityInput)

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

    // 날씨에 따른 배경 체인지.
    weatherBG(weatherID) {  
      localStorage.setItem('weatherID', weatherID); 
      this.weatherId = weatherID;
      console.log(`this.weatherId: ${this.weatherId}`);

      this.weatherBg(this.weatherId); 
      console.log(this.weatherId);
      
      return weatherID;    
    },
    weatherBg(id) {
      console.log(id); //console에 null로 뜨네...?
      // id = this.weather[0].id
      console.log(`이걸로 날씨id가 적용되는건데.....!화면에 뜬 숫자랑 같은가.....${id}`);
      // console.log(this);
      
      if(id < 300) {
        console.log('Thunderstorm');    
        localStorage.setItem('weather', 'thunderstorm');
        this.weatherStatus = 'thunderstorm';     
        // document.querySelector('.city').classList.add('thunderstorm')   
      } else if(id < 400) {
        console.log('Drizzle');   
        localStorage.setItem('weather', 'drizzle');
        this.weatherStatus = 'drizzle';  
        // document.querySelector('.city').classList.add('drizzle') 
      } else if(id < 600) {
        console.log('이건Rain');   
        localStorage.setItem('weather', 'rain');  
        this.weatherStatus = 'rain';      
        // document.querySelector('.city').classList.add('rain')           
      } else if(id < 700) {
        console.log('Snow');
        localStorage.setItem('weather', 'snow'); 
        this.weatherStatus = 'snow';
        // document.querySelector('.city').classList.add('snow')    
      } else if(id < 800) {
        console.log('Atmosphere');  
        localStorage.setItem('weather', 'atmosphere');  
        this.weatherStatus = 'atmosphere';
        // document.querySelector('.city').classList.add('atmosphere')         
      } else if(id >= 801) {
        console.log('Clouds')  
        localStorage.setItem('weather', 'clouds');    
        this.weatherStatus = 'clouds';
        console.log(this.weatherStatus);
        // document.querySelector('.city').classList.add('clouds')     
      } else if(id = 800) {
        console.log('Clean'); 
        localStorage.setItem('weather', 'clean');  
        this.weatherStatus = 'clean';
        // document.querySelector('.city').classList.add('clean')  
      }
    },

    // 일출, 일몰 시간에 따른 배경 밝기 조절.
    sunBG() {
      const riseTime = this.sun.sunrise
      const setTime = this.sun.sunset
      console.log(riseTime, setTime, '아 왜 안되냐*********** 된다!!!!');
      
      this.sunbg(riseTime, setTime)
    },
    sunbg(sunriseTime, sunsetTime) {
      console.log('일출일몰시간 따라서 배경밝기 조절 함수 실행됨.');

      const timeNow = new Date().getTime() / 1000
      console.log(`현재시간 : ${timeNow} 일출:${sunriseTime} 일몰:${sunsetTime}`);
      // console.log(`현재시간 : ${timeNow} 일출:${this.sun.sunrise} 일몰:${this.sun.sunset}`);

      if(sunriseTime, sunsetTime) {
        if(timeNow < sunriseTime ) {
          console.log('동트기 전!!!!!!!!!!');
        
          this.day = false
          this.night = true
        }
        if(sunriseTime < timeNow < sunsetTime && !(timeNow < sunriseTime)) {  // timeNow < sunriseTime가 계속 일출 후랑 겹쳐서 적용되서, 조건을 하나 더 줌.
          console.log('해 뜸!!!!!!!!!');
          this.night = false
          this.day = true
        } 
        if( sunsetTime <= timeNow) {
          console.log('해 짐!!!!!!!!!!!');   
          this.day = false
          this.night = true
        }

        console.log(`day= ${this.day}`);
        console.log(`night= ${this.night}`);
      }
    },
    today() {
      return new Date().valueOf();
    },
  }
}


    //1. input이 입력되면 eventBus로 보낸 city명을 받아온뒤
    //2. city명을 데이터에 저장해주고,
    //3. 이 과정을 거친 후에 store로 시티명을 보내줘야함.
    // 온도, 날씨정보, 도시명, 날짜 출력.
</script>

<style>
.clear:after{ content:''; display:block; clear:both; }
.transparent{ opacity: 0; display: none; }
/* .light, .dark의 height를 넓이가 변할때마다 바꿔줘야함.!! */
.light{ border:3px solid yellow; content:''; display:block; width:100vw; min-height:100vh; background-color:rgba(255, 255, 255, .5); /*position:fixed; top:0; left:0;*/ }
.dark{ border:3px solid blue; content:''; display:block; width:100vw; min-height:100vh; background-color:rgba(0, 0, 0, .5); background-blend-mode: multiply; /*position:fixed; top:0; left:0;*/ }
.font-white{ color: #fff; }
.font-black{ color: #353434; }
/* --- light ver. --- */
.thunderstorm-light{ background:url('../assets/imgs/thunderstorm.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.drizzle-light{ background:url('../assets/imgs/drizzle.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.rain-light{ background:url('../assets/imgs/rain.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.snow-light{ background:url('../assets/imgs/snow.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.atmosphere-light{ background:url('../assets/imgs/atmosphere.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.clean-light{ background:url('../assets/imgs/clean.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
.clouds-light{ background:url('../assets/imgs/clouds.png') no-repeat center center; background-size: cover; background-color:rgba(255, 255, 255, 1); background-blend-mode: multiply; }
/* --- dark ver. --- */
.thunderstorm-dark{ background:url('../assets/imgs/thunderstorm.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.drizzle-dark{ background:url('../assets/imgs/drizzle.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.rain-dark{ background:url('../assets/imgs/rain.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.snow-dark{ background:url('../assets/imgs/snow.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.atmosphere-dark{ background:url('../assets/imgs/atmosphere.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.clean-dark{ background:url('../assets/imgs/clean.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }
.clouds-dark{ background:url('../assets/imgs/clouds.png') no-repeat center center; background-size: cover; background-color:rgba(0, 0, 0, .7); background-blend-mode: multiply; }


.city{ outline:0px solid orange; min-height:100vh; padding:250px 100px 40px;  }
.dayBackgroundcolor{ width: 100vw; height: 100vh; position: fixed; top: 0; left: 0;  }

.mainWeather{ outline:0px solid red; width:50%; float:left; z-index: 100; }
.mainWeather > .cityname > i{  margin-right: 20px; font-size: 40px; display:inline-block; }
.mainWeather > .cityname > span{ font-size:45px; font-weight:bold; }
.mainWeather > .date{ margin:10px 0 50px; font-size:20px; display:block; }
.mainWeather > div{  height:200px; margin-top: 40px; }
.mainWeather > div > .iconBox{ outline:0px solid lime; width:50%; padding-top:10px; float:left; }
.mainWeather > div > .iconBox > img{ outline:0px solid lime; width:180px; margin:0 0 0 auto; display:block; }
.mainWeather > div > .textBox{ outline:0px solid blue; width:50%; height:100%; padding:40px 0; float:left; }
.mainWeather > div > .textBox > .temp{ outline:0px solid blue; font-size:70px;  }
.mainWeather > div > .textBox > .weatherText{ outline:0px solid blueviolet; margin-left:10px; font-size:20px; display:block;  }

.weatherInfo{ border-radius:10px;  width:calc(50% + -20px);  margin:100px 0 0 20px; background-color:rgba(255, 255, 255, .2); float:left;  }
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

h2{ width:100%; margin:80px 0 15px; font-weight:400; font-size:25px; text-align:left; display:inline-block; }
.weather5dayInfo{  width:100%; overflow:scroll; }
.weather5dayInfo > ul{width:4400px;  }
.weather5dayInfo > ul:after{ content:''; display:block; clear:both; }
.weather5dayInfo > ul > li{ border-radius:5px; width:90px; padding:10px; list-style:none; background-color:rgba(255, 255, 255, .2); float:left; }
.weather5dayInfo > ul > li + li{ margin-left:20px; }

.weather5dayInfo > ul > li > span{ text-align:center; display:block; }
.weather5dayInfo > ul > li > img{ width:70%; margin:0 auto; display:block; }

@media screen and (max-width: 900px) {
  .city{ padding:180px 40px 40px; }
  .mainWeather{ width:100%; }
  .weatherInfo{ width:100%; margin:50px 0; padding:0 50px; }
}

@media screen and (max-width: 550px) {
  .mainWeather > div > .iconBox > img{ width:130px; }
  .mainWeather > div > .textBox > .temp{ font-size:50px; }
  .weatherInfo{ width:100%; margin:30px 0; padding: 0 10px; }
  h2{ margin:30px 0 15px; }
}
</style>
