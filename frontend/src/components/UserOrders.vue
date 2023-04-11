<template>
    <div>
        <table>
      <thead>
        <tr>
          <th>Product name</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Order Date</th>
          <th>Status</th>
          <th>Product details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in myOrders" :key="order.order_id">
          <td>{{ order.name }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.price * order.quantity }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.order_status }}</td>
          <td>
            <router-link
              :to="'/products/' + order.product_id"
              class="router-link"
              ><button class="details">Details</button></router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import router from '@/router/router';
    export default {
        name: 'UserOrders',
        data(){
            return{
                myOrders: []
            }
        },
        created(){
            const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "admin") {
      router.push("/products");
    }
            const userId = user.user_id
            axios.get(`http://localhost:5000/api/${userId}/myorders`)
            .then(res => this.myOrders = res.data)
        }
    }
</script>

<style scoped>

</style>