<template>
  <div id="app" class="app">
      <SearchCity></SearchCity>
      <router-view></router-view>
  </div>
</template>


<script>
import SearchCity from './components/SearchCity'
export default {
  components: { 
    SearchCity 
  }
}
</script>
<style>
.app{ width:100%; min-width:400px; height:100vh; min-height:800px; padding-top:150px;  background:url('../src/assets/landscape.jpg') no-repeat; background-size:cover;}

@media screen and (max-width: 900px) {
  .app{ padding-top:50px; }
}
</style>
