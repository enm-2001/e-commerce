<template>
  <div id="page-wrap">
    <div class="grid-wrap">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="product-item"
      >
        <!-- <img src="../assets/attire1.webp" /> -->
        <img :src="product.image_data[0]" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">&#8377;{{ product.price }}</p>
        <router-link :to="'/products/' + product.product_id">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getImageUrl } from "@/utils";

export default {
  name: "ProductsPage",
  props: ["term"],
  // query: [],
  data() {
    return {
      products: [],
      results: [],
      images: [],
    };
  },
  methods: {
    searchProduct(searchTerm) {
      this.products = this.products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    },
  },
  async created() {
    const response = await axios.get("http://localhost:5000/api/products");
    this.results = response.data
    const products = response.data;
    console.log(response.data);
    for (let i = 0; i < products.length; i++) {
      // console.log(products[i].image_data);
      if (products[i].image_data.length > 0) {
        const url = getImageUrl(products[i].image_data[0]);
        // console.log(url);
        this.images.push(url);

        products[i].image_data = this.images;
        this.images = [];
      }

      // console.log(products[i].image_data);
    }

    this.products = products;
  },
  watch: {
    $route() {
      this.products = this.results
      this.searchProduct(this.$route.query.term);
    },
  },
};
</script>

<style scoped>
.grid-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 80px;
}

.product-item {
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 2px 5px #888;
  display: flex;
  flex-direction: column;
  margin-bottom: 2%;
  padding: 20px;
  /* position: relative; */
  width: 32%;
}

.product-name {
  margin-bottom: 0;
}

img {
  height: 200px;
  /* width: 200px; */
}

a {
  width: 100%;
}

button {
  width: 100%;
}
</style>