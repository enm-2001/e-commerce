<template>
  <div id="page-wrap">
    <div class="grid-wrap">
      <div
        v-for="product in items"
        :key="product.product_id"
        class="product-item"
      >
        <!-- <img src="../assets/attire1.webp" /> -->
        <img v-bind:src="product.image" />
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
export default {
  name: "ProductsPage",
  props: ["products"],
  data() {
    return {
      items: [],
      results: [],
    };
  },
  methods: {
    searchProduct(searchTerm){
      console.log("sssssss");
      this.items = this.items.filter(item => item.name == searchTerm)
    }
  },
  async created() {
    const result = await axios.get("http://localhost:5000/api/products");
    const items = result.data;
    this.results = items;
    this.items = items;
    // console.log(this.results);
  },
  // mounted() {
  //   if (Object.prototype.hasOwnProperty.call(this.$props, "products")) {
  //     this.items = this.products;
  //     console.log("iiiii", this.items);
  //   } else {
  //     this.items = this.results;
  //     // console.log(this.items);
  //   }
  // },
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