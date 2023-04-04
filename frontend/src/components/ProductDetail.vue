<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img :src="product.image" />
    </div>
    <div id="product-details">
      <h1>{{ product.name.toUpperCase() }}</h1>
      <h3 id="price">&#8377;{{ product.price }}</h3>
      <p>Average rating : {{ product.avgRating }}</p>
      <button @click="addToCart(product.product_id)" id="add-to-cart">
        Add to cart
      </button>
      <span v-if="addedToCart">Item add to cart successfully!!</span>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <PageNotFound v-else />
</template>

<script>
import PageNotFound from "./PageNotFound.vue";
import axios from "axios";
import router from "@/router/router";
export default {
  name: "ProductsDetail",
  components: {
    PageNotFound,
  },
  data() {
    return {
      product: {},
      addedToCart: false,
    };
  },
  methods: {
    addToCart(product_id) {
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        const userId = JSON.parse(localStorage.getItem("user")).user_id;
        const productId = product_id;
        const num = 1
        axios
          .post(`http://localhost:5000/api/users/${userId}/cart/${productId}`,{num})
          .then((this.addedToCart = true))
          .catch((err) => console.log(err));
      }
    },
  },
  async created() {
    const id = this.$route.params.id;
    const result = await axios.get(`http://localhost:5000/api/products/${id}`);
    this.product = result.data;
  },
};
</script>

<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
  /* display: flex; */
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}

span {
  color: green;
  /* text-align: center; */
}
</style>