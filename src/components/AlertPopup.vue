<template>
  <div class="popup" :class="{'hide': error === false}">
      <p>검색 지역을 올바르게 입력해 주세요.</p>
  </div>
</template>

<script>
import { eventbus } from '../main.js';
export default {
    data() {
        return {
            error: false,
        }
    },
    created() {
        eventbus.$on('errorCheck', (cont) => {
            this.error = cont.error;
            setTimeout(() => {
                this.error = false;
            }, 1500);
            }
        );
    },
}
</script>

<style>
.popup{ border-radius: 50px; width: 400px; height: 60px; background-color: rgba(53, 52, 52, .8); position: absolute; left: 50%; top: 50px; transform: translateX(-50%); transition: all .8s ease; z-index: 2000; }
.popup > p{ margin-top: 18px; font-size: 20px; text-align: center; }
.hide{ top: -100px; }

@media screen and (max-width: 900px) {
    .popup{ top: 30px; }
    .hide{ top: -120px; }
}

@media screen and (max-width: 550px) {
    .popup{ width: 330px; }
    .popup > p{ font-size: 18px; }
    .hide{ top: -120px; }
}
</style>