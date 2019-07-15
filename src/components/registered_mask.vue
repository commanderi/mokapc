<template>
    <!-- 注册遮罩 -->
    <div class="Mask registered_mask scale_0">
        <!-- 注册 -->
        <div class="registered">
            <div class="registered_title">
                <span class="registered_title_font">用户注册</span>
                <span class="registered_close" @click="registeredClose">关闭<i class="iconfont icon-guanbi"></i></span>
            </div>
            <div class="registered_con">
                <p class="registered_con_p">
                    <i class="iconfont icon-yonghu lf_alibaba_icon"></i>
                    <input type="text" class="registered_input username" placeholder="用户名(4-11位字母和数字)" v-model="username">
                    <i class="iconfont icon-bitian i_xx"></i>
                </p>
                <p class="registered_con_p">
                    <i class="iconfont icon-mima lf_alibaba_icon"></i>
                    <input type="password" class="registered_input userpassword" placeholder="密码(6-15位字母或数字)" v-model="userpassword">
                    <i class="iconfont icon-bitian i_xx"></i>
                </p>
                <p class="registered_con_p">
                    <i class="iconfont icon-mima lf_alibaba_icon"></i>
                    <input type="password" class="registered_input" placeholder="确认密码" v-model="userpasswordS">
                    <i class="iconfont icon-bitian i_xx"></i>
                </p>
                <p class="registered_con_p">
                    <i class="iconfont icon-shouji lf_alibaba_icon"></i>
                    <input type="text" class="registered_input" placeholder="请输入11位手机号码" minlength="0" maxlength="11" v-model="userTel">
                </p>
                <p class="registered_con_p">
                    <i class="iconfont icon-email3 lf_alibaba_icon"></i>
                    <input type="text" class="registered_input" placeholder="邀请码只能是字母或数字" v-model="inviteCode">
                </p>
                <p class="registered_con_p">
                    <i class="iconfont icon-securityCode-b lf_alibaba_icon"></i>
                    <input type="text" class="registered_input" placeholder="验证码" v-model="securityCodeNumber" v-on:focus="VerificationCodeUpdate">
                    <img src="http://api.vs04o.cn/login/get_verification_code" id="securityCode" title="点击更换验证码">
                    <i class="iconfont icon-bitian i_xx"></i>
                </p>
                <p class="protocol">
                    <i class="iconfont icon-gou protocol_btn protocol_yes" data-act='1' @click="pactBtn($event)"></i>
                    <span>我已看过并同意《<a href="">用户购彩服务协议</a>》</span>
                </p>
                <input type="button" class="registeredBtn" value="立即注册" @click="RegisteredBtn">
                <input type="button" class="attemptBtn" value="免费试玩">
                <p class="registered_copyright">
                    <b class="go_login" @click="goLogin">快速登录</b>
                    <span>2010-2019 © 版权所有</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import {isPhone} from '../assets/js/global.js'
import {isPasswd} from '../assets/js/global.js'
import {isRegisterUserName} from '../assets/js/global.js'
import {isEmpty} from '../assets/js/global.js'
export default {
    name: 'index',
    data () {
        return {
            username:'',
            userpassword:'',
            userpasswordS:'',
            securityCodeNumber:'',
            userTel:'',
            inviteCode:'',
        }
    },
    methods:{
        RegisteredBtn:function(){
            if($('.protocol_btn').attr('data-act')==1){
                if(isRegisterUserName(this.username)){
                    if(isPasswd(this.userpassword)){
                        if(this.userpassword==this.userpasswordS){
                            if(isPhone(this.userTel)){
                                if(isEmpty(this.securityCodeNumber)){
                                    if(isEmpty(this.inviteCode)){
                                        this.reg()
                                    }else{
                                        layer.msg('请填写邀请码',{time:1200});
                                    }
                                }else{
                                    layer.msg('请填写验证码',{time:1200});
                                }
                            }else{
                                layer.msg('请正确输入手机号',{time:1200});
                            }
                        }else{
                            layer.msg('两次密码输入不一致',{time:1200});
                        }
                    }else{
                        layer.msg('请正确输入密码',{time:1200});
                    }
                }else{
                    layer.msg('请正确输入用户名',{time:1200});
                }
            }else{
                layer.msg('请先同意购彩服务协议再进行注册',{time:1800})
            }
        },
        // 关闭注册遮罩后清除input数据
        registeredClose:function(){
            this.username='',this.userpassword='',this.userpasswordS='',this.securityCodeNumber='',this.userTel='';
            $('.protocol>i').addClass('protocol_yes').attr('data-act','1');
            $('.registered_mask').removeClass('scale_1')
        },
        // 同意协议
        pactBtn:function(event){
            var el = event.currentTarget;
            if($(el).attr('data-act')==1){
                $(el).removeClass('protocol_yes').attr('data-act','0');
            }else{
                $(el).addClass('protocol_yes').attr('data-act','1');
            }
        },
        goLogin:function(){
            this.registeredClose();
            $('.logIn_mask').addClass('scale_1');
        },
        // 注册
        reg:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'login/register',
                data: {
                    mobile:this.username,
                    password:this.userpassword,
                    code:this.securityCodeNumber,
                    tel:this.userTel,
                    invite_code:this.inviteCode
                }
            })
            .then(res => {
                if(res.data.ret==200){
                    this.registeredClose();
                    layer.msg(res.data.msg+'请进行登录');
                    // this.$store.state.AppUserStatus = false;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        VerificationCodeUpdate:function(){
            $('#securityCode').attr('src','http://api.vs04o.cn/login/get_verification_code'+'?'+ new Date().getTime())
        }
    },
    mounted(){
        layui.use('layer', function(){
            var layer = layui.layer;
        });
        let prizeData = window.location.href.split('=');
        if(prizeData[1]!=undefined||prizeData[1]!=null){
            this.inviteCode = prizeData[1];
        }
    }
}
</script>
    
