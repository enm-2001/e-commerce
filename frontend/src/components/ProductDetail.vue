<template>
  <div id="page-wrap" v-if="product">
    <div id="carousel">
    <Carousel>
    <Slide v-for="(image, index) in product.image_data" :key="index">
      <div class="carousel__item"><img :src="image" /></div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  </div>
    <!-- <div v-for="(image, index) in product.image_data" :key="index" id="img-wrap">
      <img :src="image" />
    </div> -->
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">&#8377;{{ product.price }}</h3>
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
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import axios from "axios";
import router from "@/router/router";
import { getImageUrl } from "@/utils";

export default {
  name: "ProductsDetail",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
    PageNotFound,
  },
  data() {
    return {
      product: {},
      images: [],
      addedToCart: false,
    };
  },
  methods: {
    addToCart(product_id) {
      const user = JSON.parse(localStorage.getItem("user"))
      if (!user) {
        router.push("/login");
      } 
      else if(user && user.user_type == 'admin'){
        alert("Please login as a customer")
      }
      else {
        const userId = user.user_id;
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
    const id = this.$route.params.product_id;
    const result = await axios.get(`http://localhost:5000/api/products/${id}`);
    const product = result.data;
    for (let i = 0; i < product.image_data.length; i++) {
      // console.log(products[i].image_data);

      const url = getImageUrl(product.image_data[i]);
      // console.log(url);
      this.images.push(url);

      product.image_data[i] = this.images;
      this.images = [];
      // console.log(products.image_data[i]);
    }

    this.product = product;
  },
};
</script>

<style scoped>
#page-wrap {
  margin-top: 80px;
  padding: 16px;
  max-width: 900px;
  /* height: 10px; */
  display: flex;
  align-items: center;
}

#img-wrap {
  /* text-align: center; */
  padding-right: 50px;
}

img {
  /* width: 400px; */
  height: 400px
}

#product-details {
  padding-left: 80px;
  width: 500px;
  position: relative;
}

#add-to-cart {
  width: 100%;
}


span {
  color: green;
  /* text-align: center; */
}

#carousel{
  width: 400px;
}

.carousel__item {
  min-height: 200px;
  box-shadow: 0px 2px 4px #888;
  width: 500px;
  background-color: var(--vc-clr-white);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>