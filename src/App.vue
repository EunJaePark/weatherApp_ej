<template>
  <div id="app" class="app">
      <SearchCity></SearchCity>
      <AlertPopup></AlertPopup>
      <router-view></router-view>
  </div>
</template>


<script>
import SearchCity from './components/SearchCity'
import AlertPopup from './components/AlertPopup';
export default {
  components: { 
    SearchCity,
    AlertPopup, 
  }
}
</script>
<style>
.app{ width:100%; min-width:400px;  min-height:800px; position: relative; }
</style>
