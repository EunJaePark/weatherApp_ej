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
.popup{ border-radius: 50px; width: 400px; padding: 15px 0; background-color: rgba(53, 52, 52, .8); position: absolute; left: 50%; top: 50px; transform: translateX(-50%); transition: all .8s ease; z-index: 2000; }
.popup > p{ font-size: 20px; text-align: center; }
.hide{ top: -60px; }

@media screen and (max-width: 900px) {
    .popup{ width: 350px; top: 30px; }
    .popup > p{ font-size: 18px; }
    .hide{ top: -60px; }
}

@media screen and (max-width: 550px) {
    .popup{ width: 300px; }
    .popup > p{ font-size: 16px; }
}
</style>