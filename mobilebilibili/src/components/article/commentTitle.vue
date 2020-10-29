<template>
  <div class="comment">
    <p class="comment-title">
      <span>评论</span>
      <span>（{{datalength}}）</span>
    </p>
    <div class="commentMyinfo">
      <img :src="myuser.user_img" alt="" v-if="myuser">
      <img src="@/assets/logo.png" alt="" v-else>
      <input type="text" v-model="comcontent" ref="Postipt" placeholder="说点什么吧" @focus="focusInput">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['datalength'],
  data(){
    return{
      myuser:null,
      comcontent:'',
    }
  },
  methods:{
    async myUserinfo(){
      const res = await this.$http.get('/user/'+localStorage.getItem('id'))
      // console.log(res);
      this.myuser = res.data[0]
    },
    focusInput(){
      if(this.myuser&&!localStorage.getItem('token')&&!localStorage.getItem('id')){
        console.log(this.$route);
        this.$msg.fail("请先登录")
        setTimeout(() => {
          this.$router.push('/login')
        }, 1000);
      }
      this.$refs.Postipt.focus()
    },
    commentPublish(){
      this.$emit('Postcomment',this.comcontent)
      this.comcontent = ''
    }
  },
  created(){
    if(localStorage.getItem('token')){
      this.myUserinfo()
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment
  padding 8.333vw 2.778vw 0 2.778vw
  .comment-title
    span:nth-child(2)
      color #aaa
  .commentMyinfo
    padding 3vw 0
    display flex
    img 
      height 7vw
      width 7vw
      border-radius 50%
    input 
      outline none
      border 0
      background-color #f4f4f4
      border-radius 3.611vw
      font-size 3.333vw
      padding 0 2.778vw
      margin-left 2.778vw
    button 
      outline none
      border 0 
      border-radius 3.333vw
      background #fb7299
      color white
      font-size 3.333vw
      padding 0 4.167vw
      margin-left 3vw
</style>
