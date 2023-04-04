<template>
  <div id="page-wrap" v-if="cartItems">
    <h1>Shopping Cart</h1>
    <div
      v-for="product in cartItems"
      :key="product.id"
      class="product-container"
    >
      <img class="product-image" :src="product.imageUrl" />
      <div class="details-wrap">
        <h3>{{ product.name }}</h3>
        <p>&#8377; {{ product.price }}</p>
        <!-- <p>Quantity: {{product.quantity}} </p> -->
        <div class="quantity">
          Quantity:
          <span class="quantity">
            <button @click="updateQuantity(product, -1)" class="quantityBtn">
              -
            </button>
            <input type="text" v-model="product.quantity" />
            <button @click="updateQuantity(product, 1)" class="quantityBtn">
              +
            </button></span
          >
        </div>
      </div>

      <button class="remove-button" @click="removeFromCart(product.product_id)">
        Remove from Cart
      </button>
    </div>
    <h3 id="total-price">Total: &#8377;{{ totalPrice }}</h3>
    <router-link to="/checkout"
      ><button id="checkout-button">Proceed to Checkout</button></router-link
    >
  </div>
  <h2 v-else>Your cart is empty!!</h2>
</template>

<script>
import axios from "axios";
// import { cartItems } from "../fake-data";
export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );
    },
  },
  watch: {
    cartItems(newValue) {
      console.log(newValue);
    },
  },
  methods: {
    removeFromCart(product_id) {
      const userId = JSON.parse(localStorage.getItem("user")).user_id;
      const productId = product_id;
      axios
        .delete(`http://localhost:5000/api/users/${userId}/cart/${productId}`)
        .then((res) => {
          console.log(res.data);
          this.cartItems = this.cartItems.filter(
            (item) => item.product_id !== product_id
          );
        })
        .catch((err) => console.log(err));
    },
    updateQuantity(product, num) {
      // let qty = product.quantity
      product.quantity = product.quantity + num;
      if (product.quantity > 0) {
        console.log(product.quantity);
        const userId = JSON.parse(localStorage.getItem("user")).user_id;
        const productId = product.product_id;
        axios.post(
          `http://localhost:5000/api/users/${userId}/cart/${productId}`,
          { num }
        );
      } else if (product.quantity == 0) {
        console.log("remove");
        this.removeFromCart(product.product_id);
      }
    },
  },
  created() {
    const id = JSON.parse(localStorage.getItem("user")).user_id;
    axios
      .get(`http://localhost:5000/api/users/${id}/cart`)
      .then((res) => (this.cartItems = res.data))
      .catch((err) => console.log(err));
  },
};
</script>

<style scoped>
h1 {
  border-bottom: 1px solid black;
  margin: 0;
  margin-top: 16px;
  padding: 16px;
}

#total-price {
  padding: 16px;
  text-align: right;
}

#checkout-button {
  width: 100%;
}

.product-container {
  align-content: "center";
  border-bottom: 1px solid #ddd;
  display: flex;
  padding: 16px;
  width: 100%;
}

.product-image {
  flex: 1;
  height: 100px;
  max-width: 100px;
}

.details-wrap {
  padding: 0 16px;
  flex: 3;
}

.remove-button {
  flex: 1;
  margin: auto;
}
input[type="text"] {
  width: 50px;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 0px;
  text-align: center;
  margin: 0px;
}

.quantity {
  display: flex;
  margin-right: 0px;
  max-width: 120px;
  align-items: center;
}

.quantityBtn {
  height: 30px;
  border-radius: 0px;
  background-color: gray;
}
h2{
  text-align: center;
}
</style>