<template>
  <div v-if="userLogged" class="sidebar">
    <ul v-if="type == 'user'">
      <li>
        <button @click="cart" class="link">Cart</button>
      </li>
      <li><button @click="history" class="link">My Orders</button></li>
      <li><button @click="logout" class="link">Logout</button></li>
    </ul>
    <ul v-else>
      <li>
        <button @click="products" active-class="active" class="link">Products</button>
      </li>
      <li>
        <button @click="users" active-class="active" class="link">Users</button>
      </li>
      <li>
        <button @click="orders" active-class="active" class="link">Orders</button>
      </li>
      <li>
        <button @click="logout" active-class="active" class="link">Logout</button>
      </li>
    </ul>
  </div>
  <div v-else class="sidebar">
    <ul>
        <li><button @click="login" class="link">Login</button></li>
        <li><button @click="signup" class="link">Signup</button></li>
        </ul>
    
  </div>
</template>

<script>
import router from "@/router/router";
export default {
  name: "SideBar",
  data(){
    return{
        userLogged: false,
        type: ''
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
    },
    signup(){
        this.$emit("options", (this.toggle = false));
        router.push("/signup");
    },
    products(){
        this.$emit("options", (this.toggle = false));
        router.push("/adminproducts");
    },
    users(){
        this.$emit("options", (this.toggle = false));
        router.push("/users");
    },
    orders(){
        this.$emit("options", (this.toggle = false));
        router.push("/orders");
    },
    history(){
        this.$emit("options", (this.toggle = false));
        router.push("/myorders");
    }
  },
  updated(){
    if(localStorage.getItem('user')){    
        this.userLogged = true 
        this.type = JSON.parse(localStorage.getItem('user')).user_type   
    }
    else{
        this.userLogged = false
    }
  },
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