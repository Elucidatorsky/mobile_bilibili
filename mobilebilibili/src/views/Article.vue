<template>
  <div v-if="model" class="article">
    <nav-bar></nav-bar>
    <div class="detailinfo">
      <div class="video">
        <video :src="model.content" controls></video>
      </div>
      <div class="detailinfoText">
        <div>
          <span>{{model.category.title}}</span>
          <span>{{model.name}}</span>
        </div>
        <div>
          <span>{{model.userinfo.name}}</span>
          <span>146.42万次观看</span>
          <span>5281条弹幕</span>
          <span>{{model.date}}</span>
        </div>
        <div>
          <p @click="collectionClick" :class="{acollect:collectActive}">
            <span>
              <van-icon name="star" size="6vw"/>
              收藏
            </span>
          </p>
          <p @click="subscriptClick" :class="{acollect:subscritionActive}">
            <span>
              <van-icon name="chat" size="6vw" />
              关注
            </span>
          </p>
          <p>
            <span>
              <van-icon name="share" size="6vw" />
              分享
            </span>
          </p>
        </div>
      </div>
      <div class="detailparent">
        <Detail class="detailitem" v-for="(item,index) in commendList"
        :key="index" 
        :detailitem="item" />
      </div>
    </div>

    <commentTitle :datalength = "lens" @Postcomment="Postsuccess" ref="commentIpt"/>
    <comment @lengthselect="len => lens = len" ref="commentPublish" @publishClick="PostChildClick"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/NavBar.vue'
import Detail from './Detail.vue'
import commentTitle from '@/components/article/commentTitle.vue'
import comment from '@/components/article/comment.vue'
import { log } from 'util'
export default {
  data(){
    return{
      model:null,
      commendList:null,
      myuser:null,
      lens:null,
      Postcom:{
        comment_content:'',
        comment_date:'',
        parent_id:null,
        article_id:null
      },
      collectActive:null,
      subscritionActive:null,
    }
  },
  components:{
    NavBar,
    Detail,
    commentTitle,
    comment,
  },
  methods:{
    async articleitemData(){
      // console.log(this.$route);
      const res = await this.$http.get('/article/'+this.$route.params.id)
      // console.log(res);
      this.model = res.data[0]
      if(this.model){
        this.subscritionInit()
      }
    },
    async commendData(){
      const res = await this.$http.get('/commend')
      // console.log(res);
      this.commendList = res.data
    },
    async Postsuccess(res){
      const date = new Date()
      let m = date.getMonth()+1
      let d = date.getDate()
      if(m<10){
        m='0'+m
      }
      if(d<10){
        d = '0'+d
      }
      let str =  `${m}-${d}`
      this.Postcom.comment_content = res
      this.Postcom.comment_date =str
      this.Postcom.article_id = this.$route.params.id
      // console.log(this.Postcom);
      const result = await this.$http.post('/comment_post/'+localStorage.getItem('id'),this.Postcom)
      // console.log(result);
      this.$refs.commentPublish.commentData()
      this.Postcom.parent_id=null
      if(result.status = 200){
        this.$msg.fail('评论发表成功')
      }
    },
    PostChildClick(id){
      this.Postcom.parent_id = id
      this.$refs.commentIpt.focusInput()
      // console.log(id);
    },
    async collectionClick(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{
          article_id: this.$route.params.id
        })
        console.log(res);
        if(res.data.msg=='收藏成功'){
          this.collectActive = true
        }else{
          this.collectActive = false
        }
        this.$msg.fail(res.data.msg)
      }
    },
    //进入页面是否收藏
    async collectionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/collection/'+localStorage.getItem('id'),{
          params:{
            article_id: this.$route.params.id
          }
        })
        // console.log("进入是否收藏",res);
        this.collectActive = res.data.success
      }
    },
    async subscriptClick(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/sub_scription/'+localStorage.getItem('id'),{
          sub_id: this.model.userid
        })
        console.log(res);
        if(res.data.msg=='关注成功'){
          this.subscritionActive = true
        }else{
          this.subscritionActive = false
        }
        this.$msg.fail(res.data.msg)
      }
    },
    //进入页面是否关注
    async subscritionInit(){
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/sub_scription/'+localStorage.getItem('id'),{
          params:{
            sub_id: this.model.userid
          }
        })
        // console.log("进入是否关注",res);
        this.collectActive = res.data.success
      }
    }
  },
  created(){
    this.articleitemData()
    this.commendData()
    this.collectionInit()
  },
  watch:{
    $route(){
      this.articleitemData()
      this.commendData()
      this.collectionInit()
      this.subscritionInit()
    }
  }
}
</script>

<style lang="stylus" scoped>
.article
  background #fff
  .detailinfo
    background #fff
    .video
      width 100%
      video 
        width 100%
    .detailinfoText
      padding 4vw
      div:nth-child(1)
        span:nth-child(1)
          padding 0 3vw
          color #fb7299
          background-color #f4f4f4
          border-radius 2vw
      div:nth-child(2)
        padding 1vw
        span 
          margin-right 2vw
          color #aaa
          font-size 3.333vw
        span:nth-child(1)
          padding-right 2vw
          color #000
          font-size 4.444vw
      div:nth-child(3)
        display flex
        p
          margin 0 3vw
          color #757575
          font-size 4vw
        .acollect
          color #fb7299
    .detailparent
      display flex
      flex-wrap wrap
      justify-content space-around
      .detailitem
        margin 1.8vw 0
        width 45%
</style>
