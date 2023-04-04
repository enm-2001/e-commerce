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

const routes = [
    // { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/signup', component: SignupPage },
    { path: '/products', component: ProductsPage },
    { path: '/products/:id', component: ProductDetail },
    { path: '/cart', component: CartPage },
    { path: '/checkout', component: CheckoutPage },
    { path: '/about', component: AboutPage },
    { path: '/contact', component: ContactPage },
    { path: '/', redirect: '/products' },
    { path: '/:catchAll(.*)', component: PageNotFound }
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  
  export default router;
