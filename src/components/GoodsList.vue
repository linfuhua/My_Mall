<template>
    <div>
        {{msg}}
      {{$route.params.goodsId}}
      <router-link to="/goods/title">显示商品标题</router-link>
      <router-link to="/goods/image">显示商品图片</router-link>
      <router-link to="/cart">跳转到购物车页面</router-link>
      <button @click="jump">跳转到购物车页面</button>
      <div>
        <router-view></router-view>
      </div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        data() {
          return{
            msg : '这是商品列表页面'
          }
        },
      methods:{
          jump(){
//            this.$router.push('/cart')
//            this.$router.push({path:'cart'})
            this.$router.push({path:'/cart?goodsId=123'})
//            this.$router.go(-1)
          }
      }
    }
</script>
