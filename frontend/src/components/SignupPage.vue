<template>
  <div class="login">
    <form @submit.prevent="signup" action="/home">

      <label for="name">Full Name</label>
      <input type="text" id="name" v-model="formData.name" required />   

      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email" v-on:blur="checkUser(formData.email)" required />
      
      <span v-if="userExists">User already exists</span>

     
      <label for="pwd">Password</label>
      <input type="password" id="pwd" v-model="formData.pwd" required />

      <label for="type">User type</label>
      <div class="radio">
      <input type="radio" id="type" v-model="formData.type" value="admin"/>Admin
      <input type="radio" id="type" v-model="formData.type" value="user"/>User
      </div>
       <br />

      <button type="submit">Register</button>
      <br>
      <div>Already a user?&nbsp; <router-link to="/login">Sign in</router-link></div>
    </form>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router/router'
export default {
   name: 'SignupPage',
  data() {
    return {
      formData: {
        name: "",
        email: "",
        pwd: "",
        type: "",
      },
      userExists : false
    }
  },
  methods: {
     signup() {
      axios
        .post("http://localhost:5000/api/users", this.formData)
        .then((response) => {
            console.log(response)
            this.$emit("options", (this.toggle = false));
            router.push('/login')
        })
        .catch((err) => console.log(err));
      // console.log(this.formData);
    },
    checkUser(email) {
      axios
        .post("http://localhost:5000/api/checkUser", { email: email })
        .then((response) => {
          if (response.data.exists) {
            this.userExists = true
          } else {
            this.userExists = response.data.exists
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/products");
    }
  }
}
</script>

<style scoped>
 
</style>