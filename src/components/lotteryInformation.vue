<template>
    <!-- 开奖信息 -->
    <div class="main">
        <div class="con">
            <!-- 顶部的登录状态 -->
            <app-head ref="loginMaskChuan"></app-head>
            <!-- 主导航 -->
            <app-nav></app-nav>
            <div class="LotteryInformation_con">
                <!-- 引入layui TAB切换组件 -->
                <div class="layui-tab layui-tab-card lf_LotteryInformation_tab">
                    <ul class="layui-tab-title lf_LotteryInformation_tab_title">
                        <!-- <b class="lf_LotteryInformation_tab_return" ><i class="iconfont icon-jiantou"></i>返回目录</b> -->
                        <li v-on:click="getHotCate()" class="layui-this">全部</li>
                        <li v-on:click="getHotCate('PK10')">PK10</li>
                        <li v-on:click="getHotCate('KS')">快三</li>
                        <li v-on:click="getHotCate('SSC')">时时彩</li>
                        <li v-on:click="getHotCate('LHC')">六合彩</li>
                    </ul>
                    <div class="layui-tab-content lf_LotteryInformation_con_list">
                        <div class="layui-tab-item lf_layui-tab-item layui-show">
                            <ul>
                                <li v-for="(d,i) in muaData" :key="i" v-on:click="getnewopennumberdetail(d.id)">{{ d.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="LotteryInformation_con_list">
                    <div class="LotteryInformation_con_list_top" v-for="(d,i) in newfirstData" :key="i">
                        <template v-if="cateid==d.id">
                            <div class="LotteryInformation_con_list_top_title">
                                <span class="LotteryInformation_con_list_top_title_font">{{ d.name }}</span>
                                <!-- <span class="Lottery_time">[每20分钟开奖]</span> -->
                                <!-- <a href="" class="zoushi"><i class="iconfont icon-jiagezoushi"></i>号码走势</a> -->
                                <router-link class="wanfa" to="/gameRules"><i class="iconfont icon-jilu"></i>玩法规则</router-link>
                            </div>
                            <div class="LotteryInformation_con_list_top_con">
                                <span class="phase_box">
                                    <b>第</b>
                                    <select id="phase_select">
                                        <option>{{ d.stage }}</option>
                                    </select>
                                    <b>期</b>
                                </span>
                                <span class="phase_time">
                                    <b>开奖日期：</b><b>{{ d.dateline }}</b>
                                </span>
                                <span class="WinningNumber">
                                    <template v-for="(c,j) in d.number.split(',')">
                                        <i :key="j">{{ c }}</i>
                                    </template>
                                </span>
                                <!-- <span>大单|牛五</span> -->
                            </div>
                        </template>
                    </div>
                    <div class="LotteryInformation_con_list_bottom">
                        <div class="layui-tab lf_Lottery_tab" lay-filter="test1">
                            <ul class="layui-tab-title" v-if="cateid!=null">
                                <li class="layui-this" lay-id="1">今天</li>
                                <li lay-id="2" >昨天</li>
                                <li lay-id="3" >前天</li>
                            </ul>
                            <div class="layui-tab-content lf_Lottery">
                                <div class="layui-tab-item layui-show">
                                    <table id="Lottery_table">
                                        <thead>
                                            <tr>
                                                <th>期号</th>
                                                <th>开奖号码</th>
                                                <th>开奖时间</th>
                                            </tr>
                                        </thead>
                                        <tbody id="Lottery_table_tbody">
                                            <template v-if="listData!=null">
                                                <tr v-for="(d,i) in listData.data" :key="i">
                                                    <td>{{ d.stage }}</td>
                                                    <td>{{ d.number }}</td>
                                                    <td>{{ d.dateline }}</td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- <div class="layui-tab-item">888</div>
                                <div class="layui-tab-item">999</div> -->
                            </div>
                        </div>
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
import user from './user';
import {thisDay} from '../assets/js/global.js';
import {formatTime} from '../assets/js/global.js';
export default {
    name: 'lotteryInformation',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus,
            userId:null,
            userToken:null,
            muaData:null,
            listData:null,
            newfirstData:null,
            cateid:null,
            startTime:null,
            endTime:null,
        }
    },
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        
        // 获取彩种菜单
        getHotCate:function(id=''){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_hot_cate',
                data: {'token':this.userToken,'uid':this.userId,'kind':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.muaData = res.data.data;
                    if(id=='KS'){
                        this.getnewopennumberdetail(9)
                    }else if(id=='SSC'){
                        this.getnewopennumberdetail(5)
                    }else if(id=='LHC'){
                        this.getnewopennumberdetail(11)
                    }else if(id=='PK10'){
                        this.getnewopennumberdetail(3)
                    }
                }else{
                    // layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 某个彩种开奖详情
        getnewopennumberdetail:function(id,s=thisDay()+' '+'00:00:00',n=thisDay()+' '+'23:59:59'){
            this.cateid = id;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_new_open_number_detail',
                data: {'token':this.userToken,'uid':this.userId,'cate':id,'page':1,'start':s,'end':n}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.startTime = null;
                    this.endTime = null;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
            this.getnewopennumber();
        },
        // 获取最近一期的开奖结果
        getnewopennumber:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_new_open_number',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.newfirstData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
    },
    components:{
        // 注册子组件
       'registered-mask':registeredMask,
       'login-mask':logInMask,
       'user':user
    },
    // html加载完成之后执行
    mounted(){
        let me = this;
        getuserIdToken:{
            this.userId = localStorage.getItem('userId');
            this.userToken = localStorage.getItem('userToken');
            if(this.userId==null || this.userId==undefined){
                layer.msg('没有获取到您的用户id,请重新登录重试');
                return
            }else if(this.userToken==null || this.userToken==undefined){
                layer.msg('没有获取到您的用户token,请重新登录重试');
                return
            }else{
                this.getHotCate();
                this.getnewopennumberdetail(3);
            }
        };
        layui.use(['element','layer'], function(){
            var element = layui.element;
            element.on('tab(test1)', function(){
                if(me.cateid==null||me.cateid==''){
                    layer.msg('请先选择查询的彩种')
                }else{
                    let num = this.getAttribute('lay-id');
                    let a = null;
                    if(num==1){
                        a = formatTime((Date.parse(thisDay())/1000),'Y-M-D');
                    }else if(num==2){
                        a = formatTime((Date.parse(thisDay())/1000)-86400,'Y-M-D');
                    }else if(num==3){
                        a = formatTime((Date.parse(thisDay())/1000)-(86400*2),'Y-M-D');
                    }
                    let s = a+' '+'00:00:00';
                    let n = a+' '+'23:59:59';
                    me.getnewopennumberdetail(me.cateid,s,n)
                }
            });
        });
    }

}
</script>


