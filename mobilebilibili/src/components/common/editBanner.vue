<template>
  <div @click="bannerClick">
    <div class="editbanner">
      <span>{{left}}</span>
      <span><slot name="right"></slot></span>
    </div>
  </div>
</template>

<script>
export default {
  props:['left'],
  methods:{
    bannerClick(){
      this.$emit('bannerClick')
    }
  }
}
</script>

<style lang="stylus" scoped>
.editbanner
  background-color #fff
  padding 4.167vw
  color #333
  font-size 4vw
  border-bottom 0.3vw solid #fafafa
  display flex
  align-items center
  justify-content space-between
</style>
