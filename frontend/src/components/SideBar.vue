<template>
  <div class="sidebar">
    <ul>
      <!-- <li><router-link to="/">Home</router-link></li> -->
      <!-- <li><router-link to="/orders">Orders</router-link></li> -->
      <li>
        <button @click="cart" active-class="active" class="link">Cart</button>
      </li>
      <li v-if="userLogged"><button @click="logout" class="link">Logout</button></li>
      <ul v-else>
        <li><button @click="login" class="link">Login</button></li>
        <li><button @click="signup" class="link">Signup</button></li>
        </ul>
    </ul>
  </div>
</template>

<script>
import router from "@/router/router";
export default {
  name: "SideBar",
  data(){
    return{
        userLogged: false
    }
  },
  methods: {
    cart() {
    this.$emit("options", (this.toggle = false));
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        router.push("/cart");
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$emit("options", (this.toggle = false));
      router.push("/login");
    },
    login(){
        this.$emit("options", (this.toggle = false));
        router.push("/login");
    }
  },
  updated(){
    if(localStorage.getItem('user')){    
        this.userLogged = true    
    }
    else{
        this.userLogged = false
    }
  }
};
</script>

<style scoped>
.sidebar {
  background-color: #f5f5f5;
  width: 200px;
  box-shadow: 0px 2px 4px #888;
  position: fixed;
  right: 0;
  top: 60px;
  padding: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

</style>