import Vue from 'vue'
import Router from 'vue-router'

const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')

// 1. 安装插件
Vue.use(Router)

// 2. 创建路由对象 导出router
export default new Router({
    routes: [{
        path: '',
        redirect: '/home'

    }, {
        path: '/home',
        component: Home
    }, {
        path: '/category',
        component: Category
    }, {
        path: '/cart',
        component: Cart
    }, {
        path: '/profile',
        component: Profile
    }, {
        // 动态路由
        path: '/detail/:iid',
        component: Detail
    }],
    mode: 'history'
})