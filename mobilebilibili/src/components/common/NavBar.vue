<template>
  <div class="navbar">
    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/bilibili.png" alt="">
    </div>
    <div>
      <p>
        <van-icon class="ipt-icon" name="search"></van-icon>
        请输入你想输入的内容
      </p>
    </div>
    <div @click="backuserinfo">
        <img :src="model.user_img" alt="" slot="right" v-if="model.user_img">
        <img src="@/assets/logo.png" alt="" slot="right" @click="$router.push('/login')" v-else>
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      model:{}
    }
  },
  methods:{
    async selectUser(){
      if(localStorage.getItem('token')){
        const res = await this.$http.get('/user/'+localStorage.getItem('id'))
        this.model = res.data[0]
      }

    },
    backuserinfo(){
      this.$router.push('/userinfo')
    }
  },
  created(){
    this.selectUser()
  }
}
</script>

<style lang="stylus" scoped>
.navbar
  height 12.5vw
  background-color #fff
  display flex
  .logo
    width 25vw
    display flex
    justify-content center
    align-items center
    img 
      width 80%
  div:nth-child(2)
    flex 1
    display flex
    justify-content center
    align-items center
    p
      font-size 3.611vw
      background-color #f4f4f4
      padding 0.556vw 0
      // text-indent 0.833vw 
      // position relative
      width 90%
      border-radius 2.5vw
      color #aaa
      white-space nowrap
      text-overflow ellipsis
      overflow hidden
      .ipt-icon
        transform translate(50%,10%)
        margin-right 1.389vw
        // position absolute
        // left 2.778vw
        // top 50%
        // transform translate(0,-50%)
  div:nth-child(3)
    display flex
    justify-content center
    align-items center
    img 
      width 7.5vw
      height 7.5vw
      border-radius 50%
    p
      margin 0 2.222vw
      padding 1.389vw 2.778vw
      border-radius 0.833vw
      background-color #fb7299
      color #ffffff
      font-size 3.611vw
</style>