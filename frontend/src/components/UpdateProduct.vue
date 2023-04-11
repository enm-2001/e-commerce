<template>
  <form @submit.prevent="updateProduct(product.product_id)">
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
      <div style="color: red">Click on the image to remove it !</div>
      <img 
        v-for="(image, index) in images2"
        :key="index"
        :src="image"
        :alt="'Image ' + (index + 1)"
       @click="removeImage(index)"
      />
    </div>
    <button type="submit">Update Product</button>
  </form>
</template>

<script>
import axios from "axios";
import router from '@/router/router';
export default {
  name: "UpdateTask",
  data() {
    return {
      product: {},
      images: [],
      images2:[]
    };
  },
  methods: {
    getImageUrl(image) {
      const base64 = window.btoa(
        new Uint8Array(image.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      // console.log(image);
      return `data:${image.type};base64,${base64}`;
    },
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        
        this.images.push(files[i]);
        // console.log(this.images)
      }
      // console.log(this.images);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // to read the contents of file and convert it to data Url
        const reader = new FileReader();
        reader.onload = () => {
          this.images2.push(reader.result);
        };
        reader.readAsDataURL(file);
        // console.log(this.images2);
      }
    },
    removeImage(index){
      this.images2.splice(index, 1)
      this.product.image_data.splice(index, 1)
    },
    updateProduct(product_id){
        // axios.put(`http://localhost:5000/updateproduct/${product_id}`, this.product)
        // .then(res => {
        //     console.log(res.data)
        //     router.push(`/products/${product_id}`)
        // })
        // .catch(err => console.log(err))
        const formData = new FormData();
        console.log(this.images.length);
      for (let i = 0; i < this.images.length; i++) {
        formData.append("images[]", this.images[i]);
        console.log(formData.getAll("images[]"));
      }
      
      formData.append("product", JSON.stringify(this.product));
      axios.put(`http://localhost:5000/updateproduct/${product_id}`, formData)
      .then(res => {
        console.log(res);
        router.push(`/products/${product_id}`)
      })
      .catch(err => console.log(err))
      
    }
    },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "user") {
      router.push("/products");
    }
    const productId = this.$route.params.product_id;
    await axios.get(`http://localhost:5000/api/products/${productId}`).then((res) => {
      const product = res.data;
      this.images2 = product.image_data
      console.log("lll",product.image_data.length);
      for (let i = 0; i < product.image_data.length; i++) {
        const url = this.getImageUrl(product.image_data[i]);
        this.images.push(url);

        product.image_data[i] = this.images;
        this.images = [];
      }
        console.log(product.image_data.length);
      this.product = product;
    });
  },
};
</script>

<style scoped>
img{
  width: 400px
}
</style>