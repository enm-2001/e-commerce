import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../components/HomePage'
import ProductsPage from '../components/ProductsPage'
import ProductDetail from '../components/ProductDetail'
import CartPage from '../components/CartPage'
import PageNotFound from '../components/PageNotFound'
import LoginPage from '../components/LoginPage'
import SignupPage from '../components/SignupPage'
import CheckoutPage from '../components/CheckoutPage'
import AboutPage from '../components/AboutPage'
import ContactPage from '../components/ContactPage'
import AddProduct from '../components/AddProduct'
import UpdateProduct from '../components/UpdateProduct'
import AdminPanel from '../components/AdminPanel'
import AdminProducts from '../components/AdminProducts'
import UsersData from '../components/UsersData'
import OrdersData from '../components/OrdersData'
import UserOrders from '../components/UserOrders'

const routes = [
  // { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/login/:productId/:quantity', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/products', component: ProductsPage },
  { path: '/products/:product_id', component: ProductDetail, props: true },
  { path: '/cart', component: CartPage },
  { path: '/checkout',name: 'checkout', component: CheckoutPage, props: true },
  { path: '/about', component: AboutPage },
  { path: '/contact', component: ContactPage },
  { path: '/addproduct', component: AddProduct },
  { path: '/updateproduct/:product_id', component: UpdateProduct },
  { path: '/admin', component: AdminPanel },
  { path: '/adminproducts', component: AdminProducts },
  { path: '/users', component: UsersData },
  { path: '/orders', component: OrdersData },
  { path: '/myorders', component: UserOrders },
  { path: '/', redirect: '/products' },
  { path: '/:catchAll(.*)', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


export default router;
