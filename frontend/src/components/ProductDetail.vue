<template>
<div  v-if="product">
  <div id="page-wrap">
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
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">&#8377;{{ product.price }}</h3>
      <h3 id="price" v-if="product.avail_quantity != 0">Quantity left: {{product.avail_quantity}}</h3>
      <h3 id="price" v-else style="color: red">Out of stock</h3>
      <div class="quantity">
          Quantity:
          <span class="quantity">
            <button @click="updateQuantity(product,-1)" class="quantityBtn">
              -
            </button>
            <input type="text" v-model="quantity" />
            <button @click="updateQuantity(product, 1)" class="quantityBtn">
              +
            </button></span
          >
        </div>
        <br>
      <button @click="addToCart(product)" id="add-to-cart">
        Add to cart
      </button>
      <span v-if="addedToCart">Item add to cart successfully!!</span>
      <span v-if="noQuantity" style="color: red">{{product.avail_quantity == 0?"Currently this item is out of stock" : "Please select quantity!!"}}</span>
    </div>  
  </div>
  <div class="description">
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
      quantity: 0,
      noQuantity: false
    };
  },
  methods: {
    updateQuantity(product, number){
      if(number > 0 && this.quantity != product.avail_quantity){
        this.quantity = this.quantity + number
      }
      else if(number < 0 && this.quantity != 0){
        this.quantity = this.quantity + number
      }
    },
    addToCart(product) {
      if(this.quantity != 0){
        const user = JSON.parse(localStorage.getItem("user"))
      if (!user) {
        router.push({path : '/login', query: {productId: product.product_id,quantity: this.quantity}})
      } 
      else if(user && user.user_type == 'admin'){
        alert("Please login as a customer")
      }
      else {
        const userId = user.user_id;
        const productId = product.product_id;
        const num = this.quantity
        axios
          .post(`http://localhost:5000/api/users/${userId}/cart/${productId}`,{num})
          .then((this.addedToCart = true))
          .catch((err) => console.log(err));
      }
      }
      else{
        this.noQuantity = true
      }
    },
  },
  async created() {
    if(this.$route.query.toCart){
      this.addedToCart = true
    }
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
  margin-bottom: 0px;
  padding: 16px;
  max-width: 900px;
  /* height: 10px; */
  display: flex;
  align-items: center;
}

.description{
  margin: 0px auto;
  max-width: 900px;
}

#img-wrap {
  /* text-align: center; */
  padding-right: 50px;
}

img {
  /* width: 300px; */
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

#carousel{
  width:  400px;  
}

.carousel__viewport{
  max-width: 400px;
}

.carousel__item {
  min-height: 200px;
  box-shadow: 0px 2px 4px #888;
  width: 400px;
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