<template>
  <div class="inputBox" >
    <form @submit.prevent="cityName">
      <input
        type="text"
        placeholder="'영어'로 지역명을 입력해 주세요."
        v-model="cityInput"       
      >
      <button>
        <i class="fas fa-search"></i>
      </button>
    </form>    
  </div>
</template>

<script>
import { eventbus } from '../main'
export default {
  data() {
    return {
      cityInput: '',
    }
  },
  created() {
    console.log(localStorage.getItem('city_name'));
    // 검색한 도시가 없을 경우 'seoul'날씨가 뜨도록 함.
    if(localStorage.getItem('city_name') === '' || localStorage.getItem('city_name') === 'null' || !localStorage.getItem('city_name')) {  
      localStorage.setItem('city_name', 'seoul');
    } 
  },
  methods: {
    cityName() {
      console.log(`입력한 이름: ${this.cityInput}`)

      // City.vue로 보내는 이벤트버스함수인 inputName()(main.js에 작성해놓은함수.)으로 전송할 데이터들 넣어줌.
      // true는 City.vue에서 사용할 signal.(지금 코드에서는 없어도 됨.)
      eventbus.inputName(this.cityInput) 
      // eventbus.inputName(this.cityInput, true)

      // local storage에 입력한 도시이름 저장하는 함수 실행.
      this.saveName(this.cityInput)

      // input입력창 다시 비워줌.
      this.cityInput = null
    },
    saveName(city) {
      console.log(this);
      console.log(city);
      
      console.log('saveName가 실행됨!!!!');
      
      // local storage에 입력한 도시이름 저장.
      console.log(`로컬에저장할 나라이름: ${city}`);
      
      localStorage.setItem('city_name', this.cityInput);
    },
  }

}
</script>

<style scoped>
.inputBox{ position: absolute; top:150px; left:50%; transform:translateX(-50%); z-index:1000;  }
form{ width:500px; margin:0 auto; position: relative; }
form > input{ border:none; border-radius:20px; width:100%; line-height:40px;  padding:0 40px 0 55px; font-size:18px; color:#575656; box-shadow:3px 3px 5px rgba(0, 0, 0, .1); }
form > input:focus{ outline:none; }
form > button{ border: none; background-color: transparent; cursor: pointer; position:absolute; left:20px; top:50%; transform:translateY(-50%);  }
form > button:focus{ outline: none; }
form > button > i{ font-size:20px; color:rgba(0, 0, 0, .5); }
form > button:hover > i{ color:rgba(0, 0, 0, .7); }


@media screen and (max-width: 900px) {
  .inputBox{ top:100px; }
  form{ width:400px; }
}

@media screen and (max-width: 500px) {
  .inputBox{ width:90%; }
  form{ width:350px; }
}
</style>