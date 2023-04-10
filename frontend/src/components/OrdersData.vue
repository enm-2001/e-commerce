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
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'OrdersData',
        data(){
            return{
                orders: []
            }
        },
        created(){
            axios.get('http://localhost:5000/api/orders')
            .then(res => this.orders = res.data)
        }
    }
</script>

<style scoped>

</style>