<template>
  <div class="userinfo">
    <nav-bar></nav-bar>
    <img src="@/assets/banner.jpg" alt="" class="backImg">
    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import userDetail from '@/components/userComponent/userDetail.vue'
import userArticle from '@/components/userComponent/userArticle.vue'
export default {
  data(){
    return{
      model:{}
    }
  },
  components: {
    NavBar,
    userDetail,
    userArticle
  },
  methods:{
    async UserinfoData(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id')
      // ,{
      //   headers:{
      //     'Authorization':'Bearer ' + localStorage.getItem('token')
      //   }
      // }
      )
      this.model = res.data[0]
    }
  },
  created(){
    this.UserinfoData()
  }
}
</script>

<style lang="stylus">
.userinfo
  .backImg
    height 36vw

</style>