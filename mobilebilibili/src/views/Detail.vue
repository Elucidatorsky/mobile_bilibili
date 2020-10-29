<template>
  <div class="detailItem" @click="pathPush">
    <meta name="referrer" content="never">
    <div class="imgparent">
      <img :src="detailitem.img" alt="" style="width:100%">
      <div class="bottom">
        <span class="video"><van-icon  name="play-circle-o" color="white" size="3.33vw"/>1122</span>
        <span class="comment"><van-icon name="orders-o" color="white" size="3.33vw" />{{detailitem.commentlen?detailitem.commentlen:66}}</span>
      </div>
    </div>
    <p>{{detailitem.name}}</p>
  </div>
</template>

<script>
export default {
  props:['detailitem'],
  methods:{
    pathPush(){
      // console.log(this.detailitem);
      if(this.$route.path!=`/article/${this.detailitem.id}`){
        this.$router.push(`/article/${this.detailitem.id}`)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .detailItem
    position relative
    p
      font-size 3.333vw
    .imgparent
      position relative
      .bottom 
        position absolute
        display flex
        bottom 0
        left 0
        right 0
        padding 0 1vw
        color white
        justify-content space-between
        background linear-gradient(0deg,rgba(0,0,0,.7),transparent)

</style>
