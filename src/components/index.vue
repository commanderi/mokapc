<template>
    <div id="index">
        <div class="main">
            <div class="con">
                <!-- 顶部的登录状态 -->
                <app-head ref="loginMaskChuan"></app-head>
                <!-- 主导航 -->
                <app-nav></app-nav>
                <!-- 滚动信息 -->
                <div class="ScrollingInformation">
                    <div class="lf_laba center">
                        <i class="iconfont icon-laba lf_gonggao"></i>
                    </div>
                    <div class="ScrollingInformation_info">
                        <!-- 滚动内容标签 -->
                        <!-- <div class="ScrollingInformation_info_me"> -->
                        <marquee behavior="" direction="" style="height: 30px;line-height: 30px;color: rgba(255,255,255,1)">
                            <template v-if="platformInfo!==null">
                                <span v-for="(item,index) in platformInfo" :key="index">{{ item.content_lb }}</span>
                            </template>
                        </marquee>
                        <!-- </div> -->
                    </div>
                </div>
                <!-- 轮播 -->
                <div class="banner_box layui-carousel" id="banner" lay-filter="banner">
                    <div carousel-item>
                        <div v-for='(item,index) in imgList' :key="index"><a style="display:block" :href="item.ad_click_url"><img :src="item.ad_url"></a></div>
                    </div>
                </div>
                <!-- 热门彩种表格 -->
                <section>
                    <div class="Popular">
                        <span class="Popular_font">热门彩种</span>
                    </div>
                    <div class="index_table">
                        <ul class="index_table_ul">
                            <li v-for='(item,index) in catesData' :key='index'>
                                <span class="index_table_ul_li_left">
                                    <img :src="item.cate_img">
                                </span>
                                <div class="index_table_ul_li_right">
                                    <p class="index_table_ul_li_right_title">{{ item.name }}</p>
                                    <div class="index_table_ul_li_right_con">
                                        <p class="lf_number"></p>
                                        <p>&nbsp;</p>
                                        <p class="time_bottom">&nbsp;{{ item.detail }}</p>
                                    </div>
                                    <div class="index_table_ul_li_right_bottom" v-if="item.is_open==1">
                                        <a @click="getSpecifiOddsc(item.id,item.cate_img,item.name)">马上下注</a>
                                        <router-link to="/lotteryInformation">更多开奖</router-link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
            <!-- 全局底部 -->
            <app-footer></app-footer>
            <!-- 左侧面包屑 -->
            <downloadQrcode></downloadQrcode>
            <!-- 注册遮罩 -->
            <registered-mask></registered-mask>
            <user v-if="this.$store.state.AppUserStatus"></user>
            <!-- 登录遮罩 -->
            <login-mask v-on:priceChange='priceChange'></login-mask>
            <!-- 公告遮罩 -->
            <div class="Mask announcement scale_0 scale_1">
                <!-- 公告 -->
                <div class="announcement_box">
                    <div class="announcement_title">平台公告<div class="announcement_close center" @click="announcementClose">关闭<i class="iconfont icon-guanbi"></i></div></div>
                    <div class="announcement_con clear">
                        <div class="announcement_con_left">
                            <ul>
                                <!-- .clickMe -->
                                <li class="text_no" :class="lolme==index ? 'clickMe' : ''" v-on:click="announcementnav(index)" v-for="(item,index) in platformMaskInfo" :key="index">{{ item.info }}</li>
                            </ul>
                        </div>
                        <div class="announcement_con_right">
                            <!-- .im_show -->
                            <div v-for="(item,index) in platformMaskInfo" :class="lolme==index ? 'im_show' : ''" :key="index" v-html="item.content"></div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 清除缓存 -->
            <button class="clearlocalStorageCache" v-on:click="clearlocalStorageCache">清除缓存</button>
        </div>
    </div>
</template>
<script>
import downloadQrcode from './downloadQrcode'
import registeredMask from './registered_mask'
import logInMask from './logIn_mask'
import user from './user'
export default {
    name: 'index',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus, // 个人中心的显示与否
            imgList:'',
            platformInfo:[],//轮播消息
            platformMaskInfo:[],//弹窗消息
            catesData:'',
            userToken:null,
            userId:null,
            lolme:0,
            banner:null,
        }
    },
    // html加载完成之前,执行,执行顺序：父组件-子组件
    created(){
        layui.use('layer', function(){
            var layer = layui.layer;
        });
    },
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{
        AppUserStatus () {
            return this.$store.state.AppUserStatus
        }
    },
    // components是声明组件
    components:{
        // 注册子组件
       'downloadQrcode':downloadQrcode,
       'registered-mask':registeredMask,
       'login-mask':logInMask,
       'user':user
    },
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{
        
    },
    // 事件方法执行
    methods:{
        announcementClose:function(){
            $('.announcement').removeClass('scale_1');
        },
        announcementnav:function(n){
            this.lolme = n;
        },
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        clearlocalStorageCache:function(){
            localStorage.clear();
            localStorage.setItem('loginStatus',false);
            this.$refs.loginMaskChuan.clearData(false);
            layer.msg('清除成功');
        },
        // 获取指定彩种的赔率
        getSpecifiOddsc:function(id,url,name){
            var indexNum = null;
            for(var i=0;i<localStorage.length;i++){
                if(localStorage.key(i)==id){
                    indexNum = localStorage.key(i);
                }
            }
            this.$emit('transferTofather', true, id)
            if(indexNum!=null){
                this.$store.state.specificTypeID = [id,url,name];
                this.$store.state.specificTypeData = JSON.parse(localStorage.getItem(indexNum));
                this.$router.push({
                    name: 'betcenter',
                    params: {
                        status: false
                    }
                })
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'lottery/get_lottery_odds',
                    data: {'token':this.userToken,'uid':this.userId,'cate':id}
                })
                .then(res => {
                    if(res.data.ret==200){
                        this.$store.state.specificTypeID = [id,url,name];
                        this.$store.state.specificTypeData = res.data.data;
                        localStorage.setItem('getLotteryOddsTime',new Date().getTime())
                        localStorage.setItem(id,JSON.stringify(res.data.data))
                        this.$router.push({
                            name: 'betcenter',
                            params: {
                                status: false
                            }
                        })
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log('获取彩种赔率出错:'+err);
                })
            }
        },
        
    },
    // html加载完成后执行,执行顺序：子组件-父组件
    mounted(){
        // 获取全部彩种
        getCates:{
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_cates',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    // 将全部彩种数据缓存到store中，以便其他页面使用，并减少http请求
                    this.$store.state.getCates = res.data.data;
                    localStorage.setItem('getCatesTime',new Date().getTime())
                    localStorage.setItem('getCates',JSON.stringify(res.data.data)); // 同时在localStorage中存一份，以防刷新页面导致store中数据丢失
                    this.catesData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
        // 获取平台公告
        getInfo:{
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_notice',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    for(let i=0;i<res.data.data.length;i++){
                        if(res.data.data[i].is_pop==1 && res.data.data[i].is_show==0){ // 弹窗
                            this.platformMaskInfo.push(Object.assign(res.data.data[i]));
                        }else if(res.data.data[i].is_pop==0 && res.data.data[i].is_show==1){ // 轮播
                            this.platformInfo.push(Object.assign(res.data.data[i]));
                        }else if(res.data.data[i].is_pop==1 && res.data.data[i].is_show==1){ // 即是轮播也是弹窗
                            this.platformInfo.push(Object.assign(res.data.data[i]));
                            this.platformMaskInfo.push(Object.assign(res.data.data[i]));
                        }
                    }
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
        // 获取轮播图
        getBanners:{
            let me = this;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_banners',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.imgList = Object.assign(res.data.data);
                    layui.use('carousel', function(){
                        layui.carousel.render({
                            elem: '#banner',
                            width: '100%',
                            height: '430px',
                            interval:5000,
                            anim:'default',
                        })
                    });
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
    }
}

</script>
<style scoped>
.clearlocalStorageCache{position: fixed;left: 10px;bottom: 10px;padding: 4px 8px;border: none;cursor: pointer;background-color: rgba(76, 76, 76, 0.23);color: #6d6d6d;font-size: 12px;}
</style>
