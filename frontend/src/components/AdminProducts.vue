<template>
  <div class="products">
    <table v-if="products.length">
      <thead>
        <tr>
          <th>Product id</th>
          <th>Product name</th>
          <th>Price</th>
          <!-- <th>Ratings</th> -->
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.product_id">
          <td>{{ product.product_id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <!-- <td>{{ product.avgRatings }}</td> -->
          <td>
            <router-link
              :to="'/products/' + product.product_id"
              class="router-link"
              ><button class="details">Details</button></router-link
            >
          </td>
          <td>
            <button @click="deleteProduct(product.product_id)" class="delete">
              Delete
            </button>
          </td>
          <td>
            <router-link
              :to="'/updateproduct/' + product.product_id"
              class="router-link"
              ><button class="update">Update</button></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>No products</h1>
    <router-link to="/addproduct" class="router-link"
      ><button>Add Product</button></router-link
    >
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router/router';
// import router from '@/routes/routes'
export default {
  name: "AdminProducts",

  data() {
    return {
      products: [],
    };
  },
  props: ["product"],
  methods: {
    deleteProduct(id) {
      axios
        .delete(`http://localhost:5000/delete/products/${id}`)
        .then(
          (this.products = this.products.filter(
            (item) => item.product_id != id
          ))
        );
    },
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "user") {
      router.push("/products");
    }
    const response = await axios.get("http://localhost:5000/api/products");
    this.products = response.data
    this.products = this.products.sort((a, b) => {
            return a.product_id - b.product_id;
          });
  },
};
</script>

<style>
.products {
  text-align: center;
}

table {
  border-collapse: collapse;
  margin: 80px auto;
  width: 80%;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>