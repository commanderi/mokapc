<template>
<div class="main">
    <div class="con">
        <!-- 顶部的登录状态 -->
        <app-head ref="loginMaskChuan"></app-head>
        <!-- 主导航 -->
        <app-nav></app-nav>
    </div>
    <div class="MobileBetting_con">
        <div class="MobileBetting_con_right"></div>
        <div class="MobileBetting_con_left">
            <span>随时随地畅玩彩票，随心<br>掌控投入梦想，注定精彩</span>
            <div class="dow">
                <div class="dow_div">
                    <a class="dow_div_a dow_div_a1 center" href="">
                        <i class="iconfont icon-ios1 lf_icon_ios"></i>
                        <span class="dow_div_a_span">IOS版下载</span>
                    </a>
                    <div class="dow_div_div">
                        <!-- <img style="width:110px;height:110px" src="../assets/img/24cf25.png"> -->
                        <img style="width:110px;height:110px" src="../assets/img/qrCode.png">
                    </div>
                    <p class="mobileBetting_dow_font">扫一扫下载IPhone版</p>
                </div>
                <div class="dow_div">
                    <a class="dow_div_a dow_div_a2 center" href="">
                        <i class="iconfont icon-anzhuo lf_icon_android"></i>
                        <span class="dow_div_a_span">Android版下载</span>
                    </a>
                    <div class="dow_div_div">
                        <!-- <img style="width:110px;height:110px" src="../assets/img/24cf25.png"> -->
                        <img style="width:110px;height:110px" src="../assets/img/qrCode.png">
                    </div>
                    <p class="mobileBetting_dow_font">扫一扫下载Android版</p>
                </div>
            </div>
        </div>
    </div>
    <!-- 全局底部 -->
    <app-footer></app-footer>
    <!-- 注册遮罩 -->
    <registered-mask></registered-mask>
    <!-- 登录遮罩 -->
    <login-mask v-on:priceChange='priceChange'></login-mask>
    <!-- 用户中心 -->
    <user v-if="this.$store.state.AppUserStatus"></user>
</div>
</template>

<script>
import registeredMask from './registered_mask'
import logInMask from './logIn_mask'
import user from './user'
export default {
    name: 'mobileBetting',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus,
        }
    },
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
    },
    components:{
        // 注册子组件
       'registered-mask':registeredMask,
       'login-mask':logInMask,
       'user':user
    },
}
</script>

