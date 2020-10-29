<template>
    <div>
        <login-top middleTop="注册bilibili">
            <div slot="right" style="font-size:4vw" @click="$router.push('/login')">切换到登录</div>
        </login-top>
        <login-text label="姓名" style="margin: 4vw 0"
            placeholder="请输入姓名"
            rule="^.{6,16}$"
            @inputChange="res => model.name=res"
        ></login-text>
        <login-text label="账号"
            placeholder="请输入账号"
            rule="^.{6,16}$"
            @inputChange="res => model.username=res"
        ></login-text>
        <login-text label="密码"
            placeholder="请输入密码"
            type="password"
            rule=".{6,16}$"
            @inputChange="res => model.password=res"
        ></login-text>
        <login-btn btntext="注册" @registerSubmit="registerSubmit"></login-btn>
    </div>
</template>

<script>
import LoginTop from '@/components/common/LoginTop.vue'
import LoginText from '@/components/common/LoginText.vue'
import LoginBtn from '@/components/common/LoginBtn.vue'
import { log } from 'util'
export default {
    name:'register',
    data(){
        return{
            model:{
                name:'',
                username:'',
                password:'',
            }
        }
    },
    components:{
        LoginTop,
        LoginText,
        LoginBtn
    },
    methods:{
        async registerSubmit(){ // async 把异步的顺序写成同步的顺序
            console.log('submit OK ?');
            // console.log("name: ",name)
            // console.log("this.name",this.name)
            let rulg = /^.{6,16}$/
            if(rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password) && rulg.test(this.password)){
                console.log('正则全部校验成功');
                const res = await this.$http.post('/register',this.model)
                // .then(res =>{ // .then是异步的存储? setTimeout也是异步的 异步执行低于同步执行速度
                //     console.log(".then res",res);
                // })
                // console.log("res",res.data.msg);
                this.$msg.fail(res.data.msg);
                localStorage.setItem('id',res.data.id)
                localStorage.setItem('token',res.data.objtoken)
                setTimeout(() => {
                    this.$router.push('/userinfo')
                }, 2000);
            }else{
                this.$msg.fail('格式错误，请重新输入')
            }
        }
    }
}
</script>

<style>

</style>