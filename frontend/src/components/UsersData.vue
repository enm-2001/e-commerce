<template>
  <div>
    <table v-if="users.length">
      <thead>
        <tr>
          <th>User id</th>
          <th>Name of user</th>
          <th>Email</th>
          <th>User role</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.user_id">
          <td>{{ user.user_id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.user_type }}</td>
          <td>
            <button @click="deleteUser(user.user_id)" class="delete">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <h1 v-else>No users</h1>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router/router";
export default {
  name: "UsersData",
  data() {
    return {
      users: [],
    };
  },
  methods: {
    deleteUser(id) {
      axios
        .delete(`http://localhost:5000/delete/users/${id}`)
        .then((this.users = this.users.filter((user) => user.user_id != id)));
    },
  },
  async created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      router.push("/login");
    } else if (user && user.user_type == "user") {
      router.push("/products");
    }
    const response = await axios.get("http://localhost:5000/api/users");
    console.log(response.data);
    this.users = response.data;
  },
};
</script>

<style scoped>
</style>