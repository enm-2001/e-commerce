<template>
    <div v-if="!placed">
    <h2>Checkout</h2>
    <form @submit.prevent="placeOrder">
      <label for="name">Name</label>
      <input type="text" id="name" v-model="name">
      
      <label for="address">Address</label>
      <input type="text" id="address" v-model="address">
      
      <label for="city">City</label>
      <input type="text" id="city" v-model="city">
      
      <label for="state">State</label>
      <input type="text" id="state" v-model="state" >
      
      <label for="zip">Zip Code</label>
      <input type="text" id="zip" v-model="zip">
      
      <button type="submit">Place Order</button>
    </form>
  </div>
  <h2 v-else>Your order has been placed successfully!!</h2>
</template>

<script>
    export default {
        name: 'CheckoutPage',
        data(){
            return{
                placed: false
            }
        },
        methods: {
            placeOrder(){
                //props: { customProp: 'hello world' },
                this.placed = true;
            }
        }
    }
</script>

<style scoped>
h2{
    text-align: center;
}
</style>