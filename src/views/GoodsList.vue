<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show' : filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
                <dd v-for="(price,index) in priceFilter">
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked == index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
                <!--<dd>-->
                  <!--<a href="javascript:void(0)">100 - 500</a>-->
                <!--</dd>-->
                <!--<dd>-->
                  <!--<a href="javascript:void(0)">500 - 1000</a>-->
                <!--</dd>-->
                <!--<dd>-->
                  <!--<a href="javascript:void(0)">1000 - 2000</a>-->
                <!--</dd>-->
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodsList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'/static/'+ item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:void(0)" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="./../../static/loading-svg/loading-spinning-bubbles.svg" v-show="loading">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>
<style>
  .load-more{
    height:50px;
    line-height: 50px;
    text-align: center;
  }
</style>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'
    export default {
      data() {
        return {
          msg: 'hello world',
          goodsList : [],
          priceFilter :[
            {
              startPrice : "0",
              endPrice : "100"
            },
            {
              startPrice : "100",
              endPrice : "500"
            },
            {
              startPrice : "500",
              endPrice : "1000"
            },
            {
              startPrice : "1000",
              endPrice : "5000"
            }
          ],
          priceChecked :'all',
          filterBy : false,
          overLayFlag : false,
          sortFlag : 1,  //默认升序排列
          page : 1 ,
          pageSize :8,   //一页8条数据
          busy : true,
          loading: false
        }
      },
      components : {
        NavHeader,NavFooter,NavBread
      },
      mounted : function () {
        this.getGoodList();
      },
      methods : {
        getGoodList(flag){
          var param = {
            page : this.page,
            pageSize :this.pageSize,
            sort : this.sortFlag?1 :-1,
            priceLevel : this.priceChecked
          };
          this.loading=true;
          axios.get("/goods",{
              params:param
            }).then((response) => {
            let res = response.data;
            this.loading=false;
            if(res.status == '0'){
              if(flag){
                this.goodsList = this.goodsList.concat(res.result.list);
                if(res.result.list == 0){
                  this.busy = true
                }else {
                  this.busy=false
                }
              }else {
                this.goodsList = res.result.list;
                this.busy=false;
              }
            }else {
              this.goodsList= [];
            }
          })
        },
        sortGoods(){
          this.sortFlag = !this.sortFlag;
          this.page = 1;
          this.getGoodList();
        },
        loadMore(){
          this.busy = true;
          setTimeout(()=>{
            this.page++;
            this.getGoodList(true)
          },500)
        },
        setPriceFilter(index){
          this.priceChecked = index;
          this.closePop();
          this.page=1;
          this.getGoodList()
        },
        showFilterPop(){
          this.filterBy = true;
          this.overLayFlag = true
        },
        closePop(){
          this.filterBy = false;
          this.overLayFlag = false
        },
        addCart(productId){
          axios.post("/goods/addCart",{
            productId:productId
          }).then(function (res) {
            if(res.status=='0'){
              alert("加入成功");
            }else{
              alert("msg:"+ res.msg)
            }
          });
        }
      }
    }
</script>
