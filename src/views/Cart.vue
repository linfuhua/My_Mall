<template>
    <div>
        {{msg}} {{$route.query.goodsId}}
    </div>
</template>
<style>
</style>
<script>
    export default {
        data() {
            return {
                msg: '这是购物车页面'
            }
        }
    }
</script>
