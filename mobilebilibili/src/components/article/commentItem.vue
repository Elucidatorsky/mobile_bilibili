<template>
  <div class="commentItems">      
    <div class="commentItem" v-for="(item,index) in commentChild" :key="index">
        <div class="userImg">
          <img v-if="item.userinfo&&item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/logo.png" alt="">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-else>匿名用户</span>
            <span>{{item.comment_date}}</span>
          </p>
        </div>
        <div class="commonContent">
          <div v-if="!temp">{{item.comment_content}}
            <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span>
          </div>
          <div v-else>
            回复&nbsp;
            <span style="color:#3089ef">
              {{item.parent_user_info.name}}
            </span>
              &nbsp;:{{item.comment_content}}
            <span class="publish" @click="PostItemcomment(item.comment_id)">回复</span>
          </div>
        </div>
      <commentchild-item :commentChild="item.child" @postChild="postChild" :temp="true"></commentchild-item>
    </div>
  </div>
</template>

<script>
export default {
  name:'commentchildItem',
  props:['commentChild','temp'],
  methods:{
    PostItemcomment(id){
      this.$emit('postChild',id)
      this.$emit('PostPublish',id)
      // console.log("PostItemcomment",id);
    },
    postChild(id){
      this.PostItemcomment(id)
      // console.log("postChild",id);
      this.$emit('PostPublish',id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .commentItems
    .commentItem
      display flex
      flex-direction column
      padding 3vw 0
      .userImg
        margin-right 2vw
        display flex
        img 
          width 9vw
          height 9vw
          border-radius 50%
        p
          display flex
          margin-left 1vw
          flex-direction column
          justify-content space-between
          font-size 13px
          color #555
          margin-bottom 2vw
      .commonContent
        position relative
        flex 1
        margin-left 10vw
        font-size 13px
        div
          position relative
          .publish
            position absolute
            right 0
            color red
</style>
