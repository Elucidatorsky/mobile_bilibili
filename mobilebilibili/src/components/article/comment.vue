<template>
  <div class="commentParent">
    <div v-for="(item,index) in commentList" :key="index">
      <div class="commentItem">
        <div class="userImg">
          <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/logo.png" alt="">
        </div>
        <div class="commonContent">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
          <div>
            {{item.comment_content}}
            <span class="publish" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
      <div style="padding-left:8vw">
        <comment-item @PostPublish="publishClick" :commentChild="item.child"></comment-item>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from './commentItem'
export default {
  data(){
    return{
      commentList:null
    }
  },
  components:{
    commentItem,
  },
  methods:{
    async commentData(){
      const res = await this.$http.get('/comment/'+this.$route.params.id)
      // console.log(res);
      if(res.data){
        this.$emit('lengthselect',res.data.length)
      }
      this.commentList = this.changeCommentData(res.data)
    },
    changeCommentData(data){
      
      function fn(temp){
        let arr1 = []
        for(var i = 0;i<data.length;i++){
          if(data[i].parent_id==temp){
            arr1.push(data[i])
            data[i].child = fn(data[i].comment_id)
          }
        }
        return arr1
      }
      return fn(null)
    },
    publishClick(id){
      // console.log(id);
      this.$emit('publishClick',id)
    }
  },
  created(){
    this.commentData()
  }
}
</script>

<style lang="stylus" scoped>
.commentParent
  padding 0 4vw
  >div
    border-bottom 1px solid #e7e7e7
    .commentItem
      display flex
      padding 3vw 0
      .userImg
        margin-right 2vw
        img 
          width 9vw
          height 9vw
          border-radius 50%
      .commonContent
        flex 1
        position relative
        p
          position relative
          display flex
          justify-content space-between
          font-size 13px
          color #555
          margin-bottom 2vw
        div
          position relative
          font-size 13px
          .publish
            color red
            position absolute
            right 0
</style>
