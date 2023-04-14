<template>
  <div id="page-wrap" v-if="cartItems.length > 0">
    <h1>Shopping Cart</h1>
    <div
      v-for="product in cartItems"
      :key="product.id"
      class="product-container"
    >
      <img class="product-image" :src="product.image_data[0]" />
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
      <!-- <router-link
              :to="'/products/' + product.product_id"
              class="router-link"
              ><button class="remove-button">Details</button></router-link
            > -->
    </div>
    <h3 id="total-price">Total: &#8377;{{ totalPrice }}</h3>
    <button id="checkout-button" @click="checkout">Proceed to Checkout</button>
  </div>
  <h2 v-else>Your cart is empty!!</h2>
</template>

<script>
import axios from "axios";
import { getImageUrl } from "@/utils";
import router from "@/router/router";

export default {
  name: "CartPage",
  data() {
    return {
      cartItems: [],
      images: [],
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
      if((num > 0 && product.quantity != product.avail_quantity) || (num < 0 && product.quantity != 0)){
        product.quantity = product.quantity + num
      }
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
    checkout() {
      // console.log("ccc", this.totalPrice);
      let orderItems = []
      for(let i=0; i<this.cartItems.length; i++){
        orderItems.push({ product_id: this.cartItems[i].product_id, quantity: this.cartItems[i].quantity });
      }
      router.push({ name: "checkout", query: { totalPrice: this.totalPrice, orderItems: JSON.stringify(orderItems) } });
    },
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "admin") {
      router.push("/products");
    }
    const id = user.user_id;
    axios
      .get(`http://localhost:5000/api/users/${id}/cart`)
      .then((res) => {
        const products = res.data;
        for (let i = 0; i < products.length; i++) {
          if (products[i].image_data.length > 0) {
            const url = getImageUrl(products[i].image_data[0]);
            this.images.push(url);
            products[i].image_data = this.images;
            this.images = [];
          }
        }
        this.cartItems = products;
        console.log(this.cartItems);
      })
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
  height: 120px;
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
h2 {
  margin-top: 90px;
  text-align: center;
}
</style>