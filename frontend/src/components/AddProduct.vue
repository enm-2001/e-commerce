<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" v-model="product.name" required />
    </div>
    <div>
      <label for="description">Description</label>
      <textarea
        id="description"
        v-model="product.description"
        required
      ></textarea>
    </div>
    <div>
      <label for="price">Price</label>
      <input id="price" type="number" v-model="product.price" required />
    </div>
    <div>
      <label for="images">Images</label>
      <input id="images" type="file" multiple @change="handleFileUpload" />
      <img
        v-for="(image, index) in images2"
        :key="index"
        :src="image"
        :alt="'Image ' + (index + 1)"
      />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
import router from "@/router/router";
// import axios from 'axios';
// import axios from 'axios';
export default {
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: "",
        // images: []
      },
      images: [],
      images2: [],
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.images.push(files[i]);
        // console.log(this.images)
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // to read the contents of file and convert it to data Url
        const reader = new FileReader();
        reader.onload = () => {
          this.images2.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    async submitForm() {
      const formData = new FormData();
      for (let i = 0; i < this.images.length; i++) {
        formData.append("images[]", this.images[i]);
      }
      formData.append("product", JSON.stringify(this.product));
      await axios
        .post("http://localhost:5000/api/addproduct", formData)
        .then((res) => {
          console.log(res.data);
          router.push("/adminproducts");
        });
    },
    created() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        router.push("/login");
      } else if (user && user.user_type == "user") {
        router.push("/products");
      }
    },
  },
};
</script>