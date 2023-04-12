<template>
  <div class="login">
    <form @submit.prevent="checkUser">

      <span v-if="!userExists">User does not exist</span>
      <span v-if="incorrect">Incorrect Password</span>

      <label for="email">Email</label>
      <input type="text" id="email" v-model="email" required />
      <br />

      <label for="password">Password</label>
      <input type="password" id="password" v-model="password" required />

      <br />
      <button type="submit">Login</button>
      <br>
    <div>Not a user? &nbsp;<router-link to="/signup">Sign up</router-link></div>
    </form>
    
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router/router'
export default {
  data() {
    return {
      email: '',
      password: '',
      incorrect: false,
      userExists: true,
      product_id: '',
    quantity: '',
    }
  },
  methods: {
    checkUser() {
      axios
        .post("http://localhost:5000/api/checkUser", { email: this.email })
        .then((response) => {
          if (response.data.exists) {
            this.userExists = response.data.exists;
            this.checkPassword();
          } else {
            this.userExists = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkPassword() {
      axios
        .post("http://localhost:5000/api/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
            // console.log(res.data);
            if(!res.data.pcheck){
                this.incorrect = res.data.pcheck;
                localStorage.setItem("user", JSON.stringify(res.data));
                if(res.data.user_type == 'user'){
                  this.$emit("options", (this.toggle = false));

                  if(this.product_id != '' && this.quantity != ''){
                    const userId = res.data.user_id
                    const num = this.quantity
                    const productId = this.product_id
                    axios.post(`http://localhost:5000/api/users/${userId}/cart/${productId}`, { num })
                    .then(res => {
                      console.log(res);
                      router.push({path : `/products/${productId}`, query: {toCart : true}})
                    })
                    
                  }
                  else{
                    router.push("/products");
                  }
                  
                }
                else{
                  router.push("/adminproducts")
                }
            }
            else{
                this.incorrect = true
            }
        })
        .catch(err => console.log(err));
    },
  },
  created(){
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      router.push("/products");
    }
    else if(this.$route.params){
      this.product_id = this.$route.params.productId,
    this.quantity =  this.$route.params.quantity
    }
  }
}
</script>

<style scoped>
/* .login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
} */
/* form {
    
    max-width: 500px;
    margin: 80px auto; */
    /* align-items: center; */
  /* } */
  
  /* label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 2px solid #ccc;
    border-radius: 5px;
  }
  
  button[type="submit"] {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color:rgb(85, 90, 138);
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .radio {
    display: flex;
  }

  .delete {
    display: block;
    width: 80%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: rgb(143, 37, 37);
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .update {
    display: block;
    width: 80%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: yellowgreen;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }

  .signup{
    display: block;
    width: 10%;
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: cadetblue;
    color: white;
    font-size: 16px;
    cursor: pointer;
  } */
</style>