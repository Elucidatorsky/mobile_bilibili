<template>
  <div class="LoginTop">
      <div class="left">一</div>
      <div class="mid">{{middleTop}}</div>
      <div class="right">
        <slot name="right" />
      </div>
  </div>
</template>

<script>
export default {
  props:['middleTop']
}
</script>

<style lang="stylus" scoped>
.LoginTop
  height 12.5vw
  background-color #FFF
  display flex
  justify-content center
  align-items center
  .left,.right,.mid
    // justify-content center
    // align-items center
    font-size 4.5vw
  .left
    flex 2
  .mid
    flex 8
  .right
    flex 3  
    text-align center
</style>