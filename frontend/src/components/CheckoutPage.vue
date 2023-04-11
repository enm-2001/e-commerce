<template>
  <div id="page-wrap">
    <div v-if="!placed">
      <h2>Checkout</h2>
      <form @submit.prevent="submit">
        <!-- <label for="name">Name</label>
      <input type="text" id="name" v-model="name">

      <label for="email">Email</label>
      <input type="email" id="email" v-model="formData.email"> -->

        <label for="address">Address</label>
        <input type="text" id="address" v-model="formData.address" />

        <button type="submit">Submit</button>
      </form>
    </div>
    <div v-if="submitted && !placed">
      <h2>Payment Details</h2>
      <form @submit.prevent="placeOrder">
        <label for="payment">Mode of payment</label>
        <div class="radio">
          <input
            type="radio"
            id="payment"
            v-model="formData.payment"
            value="cod"
          />Cash On Delivery <br />
          <input
            type="radio"
            id="payment"
            v-model="formData.payment"
            value="card"
          />Via Debit/Credit Card
        </div>

        <div v-if="formData.payment == 'card'">
          <label for="cardDetails">Card number</label>
          <input type="text" id="cardDetails" />
          <div class="card">
            <label>Expiry</label>
            <input type="month" />
            <label>CVV</label>
            <input type="password" />
          </div>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
    <h2 v-if="placed">Your order has been placed successfully!!</h2>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router/router';
export default {
  name: "CheckoutPage",
  data() {
    return {
      formData: {
        user_id: "",
        order_date: "",
        total_amount: "",
        address: "",
        payment: "",
      },
      placed: false,
      submitted: false,
    };
  },
  props: ["totalPrice"],
  methods: {
    submit() {
      this.submitted = true;
    },
    placeOrder() {
      this.formData.user_id = JSON.parse(localStorage.getItem("user")).user_id;
      this.formData.order_date = new Date().toLocaleDateString();
      this.formData.total_amount = this.$route.query.totalPrice;

      const orderItems =  JSON.parse(this.$route.query.orderItems)

      axios
        .post("http://localhost:5000/api/checkout", {
          formData: this.formData,
          orderItems,
        })
        .then((res) => {
          if (res.data.order_id) {
            const order_id = res.data.order_id
            const user_id = JSON.parse(localStorage.getItem("user")).user_id;
            axios
              .delete(`http://localhost:5000/${user_id}/emptyCart`)
              .then((res) => {
                if (res.data.emptyCart) {
                  
                  axios.post(`http://localhost:5000/api/mail`,{
                    order_id,
                    name: JSON.parse(localStorage.getItem("user")).name,
                    email: JSON.parse(localStorage.getItem("user")).email,
                    order_date: new Date().toLocaleDateString(),
                    payment_method: this.formData.payment,
                    total_amount: this.$route.query.totalPrice,
                    orderItems
                  })
                  this.placed = true;
                }
              });
          }
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "admin") {
      router.push("/products");
    }
  },
};
</script>

<style scoped>
form {
  margin-top: 0;
}
h2 {
  margin-top: 70px;
  text-align: center;
}
input[type="radio"] {
  display: inline;
  width: 20%;
  margin-right: 0;
  padding: 0;
}
.card {
  display: flex;
  align-items: center;
}
</style>