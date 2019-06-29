<template>
    <!-- 游戏规则 -->
    <div class="main">
        <div class="con">
            <!-- 顶部的登录状态 -->
            <app-head ref="loginMaskChuan"></app-head>
            <!-- 主导航 -->
            <app-nav></app-nav>
            <div class="gameRules clear">
                <div class="gameRules_left">
                    <ul>
                        <template v-if="catesData!==null">
                            <li v-for="(d,i) in catesData" :key="i" v-on:click="lolme(d)" :class="{im_Selected:thisMe==d.id}">{{ d.name }}</li>
                        </template>
                    </ul>
                </div>
                <div class="gameRules_right">
                    <template v-if="fontData!=null">
                        <div v-html="fontData.play_rule">
                            {{ fontData.play_rule }}
                        </div>
                    </template>
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
    </div>
</template>
<script>
import registeredMask from './registered_mask'
import logInMask from './logIn_mask'
import user from './user'
export default {
    name: 'gameRules',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus,
            catesData:null,
            thisMe:null,
            itemData:null,
            fontData:null,
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{
        'registered-mask':registeredMask,
        'login-mask':logInMask,
        'user':user
    },
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{},
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        lolme:function(data){
            this.thisMe = data.id;
            this.get_play_rule(data.id);
        },
        tiao:function(n){
            $('html,body').animate({scrollTop: $('#comeon'+n).offset().top}, 800)
        },
        get_lottery_odds:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_lottery_odds',
                data: {'cate':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.itemData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        get_play_rule:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_play_rule',
                data: {'cate':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    console.log(res.data.data);
                    this.fontData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    // html加载完成之后执行
    mounted(){
        layui.use('layer', function(){
            var layer = layui.layer;
        });
        // 获取全部彩种
        getCates:{
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_cates',
                data: {}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.catesData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
        this.get_play_rule(3);
    }
}
</script>
<style scoped>
.metable{width: 100%;height: auto;border: 1px solid #ccc;}
.metable>thead>tr{border-bottom: 1px solid #ccc;line-height: 35px;background-color: #e2efd9;font-weight: 100;color: #444;}
.metable>tbody>tr{line-height: 30px;text-align: center}
/* .metable>tbody>tr>td:first-child{border-left: 1px solid #ccc;border-right: 1px solid #ccc;} */
/* .metable>tbody>tr>td:last-child{border-right: 1px solid #ccc;border-left: 1px solid #ccc;} */
.mered{color: #f20320}
.gameRulescon>p{color: #444;font-size: 12px;font-family: "SimSun";font-weight: 300;line-height: 1.7;margin: 5px 0;}
.gameRulescon>p:nth-of-type(1){font-family: "SimSun";font-size: 13px;color: #444444;padding: 10px 0;font-weight: bold;}
.gameRulescon{margin-top: 20px}


</style>

