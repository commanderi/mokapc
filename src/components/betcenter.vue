<template>
    <div class="main">
        <!-- 顶部的登录状态 -->
        <app-head ref="loginMaskChuan"></app-head>
        <div class="betcenter">
            <!-- 此处引入该页面左侧菜单 -->
            <betcenter-menu v-on:controlHot="controlMe" v-on:transferTofather="fatherReceive"></betcenter-menu>
            <!-- 此处引入页面主要部分 -->
            <template v-if="betcenter_Content">
                <!-- pk10 -->
                <PK10 v-if="showMe==3 || showMe==4" ref="borther"></PK10>
                <!-- 时时彩 -->
                <SSC v-else ref="borther"></SSC>
            </template>
            <!-- 热门彩种表格 -->
            <betcenter-HotTable v-if="betcenter_Hot" v-on:controlHot="controlMe" v-on:transferTofather="fatherReceive"></betcenter-HotTable>
        </div>
        <!-- 注册 -->
        <registered-mask></registered-mask>
        <!-- 登录 -->
        <login-mask v-on:priceChange='priceChange'></login-mask>
        <!-- 用户中心 -->
        <user v-if="this.$store.state.AppUserStatus"></user>
    </div>
</template>
<script>
import registeredMask from './registered_mask'
import logInMask from './logIn_mask'
import user from './user'
import betcenterMenu from '@/components/betcenters/betcenterMenu'
import betcenterHotTable from '@/components/betcenters/betcenterHotTable'

import pk10 from '@/components/betcenters/PK10/MK_PK10'
import ssc from '@/components/betcenters/SSC/MK_SSC'
export default {
    name:'betcenter',
    data(){
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus,
            betcenter_Hot:true,
            betcenter_Content:true,
            showMe:null,
        }
    },
    components:{
        // 注册子组件
        'registered-mask':registeredMask,
        'login-mask':logInMask,
        'user':user,
        'betcenter-menu':betcenterMenu,
        'betcenter-HotTable':betcenterHotTable,
        'PK10':pk10,
        'SSC':ssc,
    },
    watch:{

    },
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        controlMe:function(data){
            this.betcenter_Hot = data;
            this.betcenter_Content = !data;
        },
        // 子组件betcenterMenu传递过来的事件
        fatherReceive(a,b) {
            this.showMe = b;
            // 父组件通过$ref调用子组件各个彩种中的事件方法
            try {
                this.$refs.borther.bortherMethods();
                layer.open({type:3});
            } catch (error) {
                console.log('betcenter出错')
                layer.open({type:3});
            }
            
        },
    },
    mounted(){
        if(this.$route.params.status || this.$store.state.specificTypeID==null){
            // 这里是从菜单点击进入
            this.betcenter_Hot = true;
            this.betcenter_Content = false;
        }else{
            // 这里是直接点击具体的彩种进入
            this.betcenter_Hot = false;
            this.betcenter_Content = true;
        }
        try {
            this.showMe = this.$store.state.specificTypeID[0]
        } catch (error) {
            console.log('选择的奖项为',this.$store.state.specificTypeID);
        }
    }
}

</script>
<style>
.header_top_logIn_con{margin-right: 7.5%;}
/* .header_top_logIn{background-color: rgba(0,0,0,0.75)} */
</style>





