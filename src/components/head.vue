<template>
    
    <!-- 已登录的顶部 -->
    <div class="header_top_logIn" v-if="loginStatus">
        <div class="header_top_right">
            <router-link to="/">
                <img src="../assets/img/logo.png">
            </router-link>
        </div>
        <div class="header_top_con header_top_logIn_con clear">
            <!-- <a v-on:click="handleClicks(6)" :class="{actives:6===limit}">
                <i class="iconfont icon-qianbao"></i>
                <span>中心钱包</span>
            </a> -->
            <a v-on:click="handleClicks(8)" :class="{actives:8===limit}">
                <i class="iconfont icon-ico_print"></i>
                <span>账户余额</span>
            </a>
            <a v-on:click="handleClicks(4)" :class="{actives:4===limit}">
                <i class="iconfont icon-chongzhi"></i>
                <span>充值</span>
            </a>
            <a v-on:click="handleClicks(6)" :class="{actives:6===limit}">
                <i class="iconfont icon-zhuanzhang"></i>
                <span>转账</span>
            </a>
            <a v-on:click="handleClicks(5)" :class="{actives:5===limit}">
                <i class="iconfont icon-withdrawal"></i>
                <span>提款</span>
            </a>
            <a v-on:click="handleClicks(1)" :class="{actives:1===limit}">
                <i class="iconfont icon-xiaoxi"></i>
                <span>我的消息</span>
            </a>
            <a v-on:click="handleClicks(7)" :class="{actives:7===limit}">
                <i class="iconfont icon-jilu"></i>
                <span>投注记录</span>
            </a>
            <a v-on:click="handleClicks(12)" :class="{actives:12===limit}">
                <i class="iconfont icon-yonghu1"></i>
                <span>用户中心</span>
            </a>
            <a v-on:click="userWithdraw">
                <i class="iconfont icon-dianyuan"></i>
                <span>安全退出</span>
            </a>
        </div>
    </div>
    <!-- 未登录的顶部 -->
    <div class="header_top" v-else>
        <div class="header_top_right">
            <router-link to="/">
                <img src="../assets/img/logo.png">
            </router-link>
        </div>
        <div class="header_top_con clear">
            <!-- <button type="button" class="subButton" placeholder="免费试玩">
                <div role="presentation" class="column___3sbmZ" style="width: auto; float: left;">
                    <i class="icon___Nkzor mdi mdi-gamepad-variant"></i>
                </div>
                免费试玩
            </button> -->
            <button placeholder="注册" class="enrollment" type="button" v-on:click="indexRegistered">注册</button>
            <button placeholder="登录" class="header_logIn" type="button" v-on:click="indexLogIn">登录</button>
        </div>
        <div class="header_top_left">
            <img src="../assets/img/zz.png">
        </div>
    </div>
</template>
<script>
export default {
    name: 'index',
    data () {
        return {
            limit:0,
            loginStatus: null, //登录状态
        }
    },
    methods:{
        // 登录
        indexLogIn:function(){
            $('.logIn_mask').addClass('scale_1');
        },
        // 注册
        indexRegistered:function(){
            $('.registered_mask').addClass('scale_1');
        },
        // 控制登录状态
        showAndhide:function(){
            let act = localStorage.getItem('loginStatus');
            if(act=='true'){
                this.loginStatus = true;
            }else{
                this.loginStatus = false;
            }
        },
        clearData:function(status){
            this.loginStatus = status;
        },
        // 退出登录
        userWithdraw:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'login/logout',
                data: {}
            })
            .then(res => {
                if(res.data.ret==200){
                    layer.msg(res.data.msg,{time:1200});
                    localStorage.setItem('loginStatus',false);
                    this.loginStatus = false;
                }else{
                    layer.msg(res.data.msg,{time:1200});
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        handleClicks:function(id){
            this.limit = id;
            this.$store.commit("increment",true);
            this.$store.commit("increment",id);
        }
    },
    mounted() {
        this.showAndhide();
    },
    computed: {

    }
}
</script>
<style scoped>

</style>


