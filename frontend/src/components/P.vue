<template>
  <v-container fluid>
    Products
    <v-row>
      <v-col cols="12" md="3" v-for="product in products" :key="product.id">
        <v-card class="m-4 pa-4" :loading="loading" max-width="400">
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="deep-purple"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img cover height="250" :src="product.images[0]"></v-img>

          <v-card-item>
            <v-card-title>{{ product.name }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <div class="my-4 text-subtitle-1">Rs. {{ product.price }}</div>

            <div>{{ product.description }}</div>
          </v-card-text>
          <v-btn @click="viewProduct(product.id)"> View Product </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
  <script>
import { useRouter } from "vue-router";

export default {
  name: "ViewProduct",
  data() {
    return {
      products: [],
      images2: [],
    };
  },
  mounted() {
    this.loadProducts();
  },
  setup() {
    const router = useRouter();
    function viewProduct(id) {
      router.push("/mainProduct/" + id);
    }
    return {
      viewProduct,
    };
  },
  methods: {
    async loadProducts() {
      try {
        const response = await fetch("http://localhost:5000/products");
        console.log(response);
        const products = await response.json();

        for (let i = 0; i < products.length; i++) {
          console.log(products[i]);

          const url = this.getImageUrl(products[i].images[0]);

          this.images2.push(url);

          products[i].images = this.images2;
          this.images2 = [];
        }

        this.products = products;
      } catch (err) {
        console.error(err);
        alert("Error while loading products");
      }
    },
    getImageUrl(image) {
      const base64 = window.btoa(
        new Uint8Array(image.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      return `data:${image.contentType};base64,${base64}`;
    },
  },
};
</script>