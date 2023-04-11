<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Order id</th>
          <th>Email</th>
          <th>Total Amount</th>
          <th>Order Date</th>
          <th>Address</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.order_id">
          <td>{{ order.order_id }}</td>
          <td>{{ order.email }}</td>
          <td>{{ order.total_amount }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.address }}</td>
          <td>{{ order.payment_method }}</td>
          <td><button @click="orderStatus(order)" class="details">{{order.order_status}}</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from '@/router/router';
export default {
  name: "OrdersData",
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    orderStatus(order){
        if(order.order_status == "Processing"){
            order.order_status = 'Shipped'
        }
        else if(order.order_status == 'Shipped'){
            order.order_status = 'Delivered'
        }
        else{
            order.order_status = 'Processing'
        }
        const status = order.order_status
        axios.put(`http://localhost:5000/api/${order.order_id}/status`,{status})
    }
    
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "user") {
      router.push("/products");
    }
    axios
      .get("http://localhost:5000/api/orders")
      .then((res) => (this.orders = res.data));
  },
};
</script>

<style scoped>
.details{
    width: 100px;
}
</style>