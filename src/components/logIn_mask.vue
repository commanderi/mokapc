<template>
    <!-- 登录遮罩 -->
    <div class="Mask logIn_mask scale_0">
        <!-- 登录 -->
        <div class="registered logIn_box">
            <div class="registered_title">
                <span class="registered_title_font">用户登录</span>
                <span class="registered_close" @click="loginIsteredClose">关闭<i class="iconfont icon-guanbi"></i></span>
            </div>
            <div class="registered_con">
                <section>
                    <p class="loginTip"><i class="iconfont icon-bitian loginTip_x"></i>用户名(必填)</p>
                    <input type="text" class="logIn_input" placeholder="请输入字母和数字组成的4-12个字符" v-model="loginUserName">
                </section>
                <section>
                    <p class="loginTip"><i class="iconfont icon-bitian loginTip_x"></i>密码(必填)</p>
                    <input type="password" class="logIn_input" placeholder="请输入字母和数字组成的6-15个字符" v-model="loginUserPwd">
                </section>
                <section>
                    <p class="loginTip"><i class="iconfont icon-bitian loginTip_x"></i>验证码(必填)</p>
                    <input type="text" class="logIn_input" placeholder="请输入六位数验证码" v-model="loginCode" v-on:focus="loginCodeUpdate">
                </section>
                <section>
                    <div class="login_yanzhengma_box">
                        <div class="login_yanzhengma"><img src="http://api.vs04o.cn/login/get_verification_code"></div>
                        <div class="login_yanzhengma_font" @click="loginCodeUpdate"><i class="iconfont icon-shuaxin lf_shua"></i>点击更换验证码</div>
                    </div>
                </section>
                <input type="button" class="logInBtn" value="立即登录" @click="login">
                <input type="button" class="registeredBtn lf_zuce" value="立即注册" @click="goReg">
                <input type="button" class="attemptBtn" value="免费试玩">
            </div>
        </div>
    </div>
</template>
<script>
import {isPasswd} from '../assets/js/global.js'
import {isRegisterUserName} from '../assets/js/global.js'
import {isEmpty} from '../assets/js/global.js'
// import bus from '../assets/js/eventBus.js'
export default {
    name: 'index',
    data () {
        return {
            loginUserName:'',
            loginUserPwd:'',
            loginCode:''
        }
    },
    methods:{
        login:function(){
            if(isRegisterUserName(this.loginUserName)){
                if(isPasswd(this.loginUserPwd)){
                    if(isEmpty(this.loginCode)){
                        this.getUser()
                    }else{
                        layer.msg('请填写验证码',{time:1200});
                    }
                }else{
                    layer.msg('请正确输入密码',{time:1200});
                }
            }else{
                layer.msg('请正确输入用户名',{time:1200});
            }
        },
        // 登录
        getUser:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'login/login',
                data: {
                    mobile:this.loginUserName,
                    password:this.loginUserPwd,
                    code:this.loginCode
                }
            })
            .then(res => {
                if(res.data.ret==200){
                    this.loginIsteredClose();
                    layer.msg(res.data.msg,{time:1200});
                    localStorage.setItem('userToken',res.data.data.token);
                    localStorage.setItem('userId',res.data.data.id);
                    localStorage.setItem('loginStatus',true);
                    // 登录成功之后，将已登录的head显示出来
                    this.$emit('priceChange',true);
                    // this.$store.state.AppUserStatus = localStorage.getItem('loginStatus');
                }else{
                    layer.msg(res.data.msg,{time:1200});
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 去注册
        goReg:function(){
            this.loginIsteredClose();
            $('.registered_mask').addClass('scale_1');
        },
        // 关闭登录遮罩
        loginIsteredClose:function(){
            this.loginUserName='',this.loginUserPwd='',this.loginCode='';
            $('.logIn_mask').removeClass('scale_1');
        },
        // 更新验证码
        loginCodeUpdate:function(){
            $('.login_yanzhengma img').attr('src','http://api.vs04o.cn/login/get_verification_code'+'?'+ new Date().getTime())
        }
    },
    mounted(){
        layui.use('layer', function(){
            var layer = layui.layer;
        });
    }
}
</script>

