<template>
  <div class="navbar">
    <router-link to="/products" id="products-link">
      <h2>EcommWeb</h2>
    </router-link>

    <div class="search-container">
      <input
        type="text"
        class="search-input"
        v-model="searchTerm"
        placeholder="Search..."
      />
      <button class="search-btn" @click="searchProduct(searchTerm)">Search</button>
    </div>
    <!-- <div v-if="products">
      <h1>eeexiist</h1>
        <ProductsPage :products = "products"/>
      </div>
      <p v-else>No results found</p> -->

    <div class="info">
      <router-link to="/products" active-class="active" class="link">Home</router-link>
      <router-link to="/about" active-class="active" class="link"
        >About</router-link
      >
      <router-link to="/contact" active-class="active" class="link"
        >Contact</router-link
      >
      <button @click="show" class="menu">
        <img src="../assets/menu.png">
      </button>
    </div>
  </div>
</template>

<script>
import router from '@/router/router';
export default {
  name: "NavBar",
  components: {
    // ProductsPage
  },
  emit: ["options"],
  data() {
    return {
      showMenu: false,
      searchTerm: "",
      products: [],
      toggle: false,
    };
  },
  methods: {
    show() {
      this.toggle = !this.toggle;
      this.$emit("options", this.toggle);
    },
    searchProduct(searchTerm) {
      router.push({ path: '/products', query: { term: searchTerm } })
      // console.log(this.searchTerm);
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  top: 0;
  /* justify-content: space-between; */
  position: fixed;
  background-color: white;
  align-items: center;
  border-bottom: 1px solid #ddd;
  height: 60px;
  width: 100%;
  justify-content: center;
}

.info {
  /* align-content: center; */
  position: absolute;
  right: 16px;
  top: 10px;
}

#products-link {
  text-align: center;
  display: block;
  color: black;
  font-size: 22px;
  left: 32px;
  position: absolute;
  top: 16px;
  text-decoration: none;
}

#products-link h2 {
  margin: 0;
  color: black;
}

.active {
  color: blue;
}

.menu{
  background-color: whitesmoke;
}

.menu:hover{
  box-shadow: 0px 2px 4px #888;
}

#cart-link {
  position: absolute;
  right: 16px;
  top: 16px;
}
.search-container {
  display: flex;
  /* margin-left: 10px; */
  align-items: center;
  max-width: 450px;
  height: 38px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  flex: 1;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 20px;
  margin-bottom: 0;
  border-radius: 10px;
}

.search-btn {
  background-color: rgb(85, 90, 138);
  color: #fff;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
}


@media (max-width: 450px) {
  .navbar {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }

  .search-container {
    max-width: 100%;
    margin-bottom: 20px;
  }
}
</style>