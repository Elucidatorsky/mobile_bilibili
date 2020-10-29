<template>
  <div class="userdetail">
    <div>
      <div class="user_img">
        <img :src="userInfo.user_img" alt="" v-if="userInfo.user_img">
        <img src="@/assets/logo.png" alt="" v-else>
      </div>
      <div class="user_edit">
        <div>
          <p>
            <span>0</span>
            <span class="user_text">粉丝</span>
          </p>
          <p>
            <span>1</span>
            <span class="user_text">关注</span>
          </p>
          <p>
            <span>0</span>
            <span class="user_text">获赞</span>
          </p>
        </div>
        <div @click="$router.push('/edit')">
          <div class="user_editBtn">编辑资料</div>
        </div>
      </div>
    </div>
    <div>
      <h2>{{userInfo.name}}</h2>
      <p v-if="userInfo.user_desc">{{userInfo.user_desc}}</p>
      <p v-else>这个人很神秘，什么都没有写</p>
    </div>
  </div>
</template>

<script>
export default {
  props:['userInfo']
}
</script>

<style lang="stylus" scoped>
.userdetail
  background-color #fff
  padding 0 12px
  >div:nth-child(1)
    display flex
  .user_img
    margin 2vw
    img
      height 21.5vw
      width 21.5vw
      border-radius 50%
  .user_edit
    flex 1
    div:nth-child(1)
      display flex
      p
        padding 2.222vw 0
        flex 1
        display flex
        justify-content center
        align-items center
        flex-direction column
        font-size 4vw
        .user_text
          color #aaa
      p:nth-child(1),p:nth-child(2)
        border-right 0.3vw solid #ccc
    div:nth-child(2)
      padding 3vw 4vw
      .user_editBtn
        border 0.3vw solid #fb7a9f
        display flex
        justify-content center
        border-radius 0.833vw
        color #fb7a9f
  >div:nth-child(2)
    h2
      margin 0
      font-weight 400
    p
      margin 5px 0
      color #999


</style>

