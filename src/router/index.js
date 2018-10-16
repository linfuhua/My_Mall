import Vue from 'vue'
import Router from 'vue-router'
// import GoodsList from '@/components/GoodsList'
import GoodsList from '@/views/GoodsList'
import Title from '@/components/Title'
import Image from '@/components/Image'
// import HelloWorld from '@/components/HelloWorld'
import Cart from '@/views/Cart'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodsList',
      components:{
        default : GoodsList,
        title : Title,
        img : Image
      }
      // children : [
      //   {
      //     path: 'title',
      //     name: 'title',
      //     component: Title
      //   },
      //   {
      //     path: 'image',
      //     name: 'image',
      //     component: Image
      //   }
      // ]
    },
    {
      path: '/cart',
      name:'cart',
      component: Cart
    }
  ]
})

