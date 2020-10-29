<template>
  <div class="home">
    <nav-bar></nav-bar>
    <van-tabs v-model="active" sticky swipeable>
    <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
      <van-list
        :immediate-check="false"
        v-model="item.loading"
        :finished="item.finished"
        finished-text="我也是有底线的"
        @load="onLoad"
      >
        <div class="detailparent">
          <detail class="detailitem" v-for="(categoryitem,categoryindex) in item.list" :key="categoryindex" 
          :detailitem="categoryitem"
          />
        </div>
      </van-list>
    </van-tab>
  </van-tabs>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import Detail from '@/views/Detail.vue'
export default {
  data(){
    return{
      category:[],
      active:0,
    }
  },
  components:{
    NavBar,
    Detail,
  },
  methods:{
    async selectCategory(){
      const res = await this.$http.get('/category')
      // console.log(res);
      this.changeCategory(res.data)
    },
    changeCategory(data){
      const category1 = data.map((item,index) => {
        item.list = [];
        item.finished = false;
        item.loading = false;
        item.page = 0;
        item.pagesize = 10;
        return item
      })
      // console.log(category1);
      this.category = category1
      this.selectArtical()
    },
    async selectArtical(){
      const categoryitem = this.categoryItem()
      const res = await this.$http.get('/detail/' + categoryitem._id,{
        params:{

          page:categoryitem.page,
          pagesize:categoryitem.pagesize
        }
      })
      // console.log(...res.data);
      // console.log(res.data);
      // res.data.forEach(item => {
      //   categoryitem.list.push(item)
      // });
      categoryitem.list.push(...res.data)
      categoryitem.loading = false
      if(res.data.length<categoryitem.pagesize){
        categoryitem.finished = true
      }
    },
    onLoad(){
      const categoryitem = this.categoryItem()
      setTimeout(() => {
        categoryitem.page += 1
        this.selectArtical()
      }, 1000);
    },
    categoryItem(){
      const categoryitem = this.category[this.active]
      return categoryitem
    }
  },
  watch:{
    active(){
      this.selectArtical()
    }
  },
  created(){
    this.selectCategory()
  }
}
</script>

<style lang="stylus" scoped>
.home
  background-color #fff
  .detailparent
    display flex
    flex-wrap wrap
    justify-content space-around
    .detailitem
      margin 1.8vw 0
      width 45%
</style>
