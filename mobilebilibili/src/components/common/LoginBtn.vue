<template>
    <div class="loginbtnWrap" @click="registerClick">
        <div class="loginbtn">{{btntext}}</div>
    </div>
</template>

<script>
export default {
    props:['btntext'],
    methods:{
        registerClick(){
            // $emit向父组件发送一个事件
            this.$emit('registerSubmit')
        }
    }
}
</script>

<style lang="stylus" scoped>
.loginbtnWrap
    padding 3vw 2vw
    .loginbtn 
        height 10vw
        background-color #ff9db5
        color #fff
        text-align center
        line-height 9vw
        font-size 4.5vw 
</style>