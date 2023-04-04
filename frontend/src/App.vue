<template>
  <div id="app">
    <NavBar @options="sidebar" @search="searchProduct"/>
    <SideBar v-show="showSide" @options="sidebar"/>
    <!-- <router-view @search="searchProduct"/>     -->
    <router-view @options="sidebar"/>
  </div>
</template>


<script>
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
// import { useRoute } from "vue-router";
export default {
  name: "App",
  data(){
    return{
      showSide: false
    }
  },
  components: {
    NavBar,
    SideBar
  },
  methods:{
    sidebar(toggle){
      this.showSide = toggle
    },
    searchProduct(searchTerm){
      // const route = useRoute()
      // console.log(this.$route.fullPath);
      if(this.$route.fullPath == '/products'){
        console.log(searchTerm);
      }
    }
  }
};
</script>

<style>

* {
  box-sizing: border-box;
  font-family: Arial;
}

#page-wrap {
  margin: 60px auto;
  max-width: 800px;
  min-height: 100vh;
}

button {
  background-color: rgb(85, 90, 138);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  outline: 0;
  padding: 10px;
}
</style>
