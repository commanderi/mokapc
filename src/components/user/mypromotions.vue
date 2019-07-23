<template>
    <!-- 推广管理 -->
    <div class="Promotion">
        <div class="PromotionCantant" v-show="showandhide==0">
            <p class="user_h">邀请码列表</p>
            <div class="PromotionCantant_list">
                <ul class="PromotionCantant_list_ul clear">
                    <li>最后更新</li>
                    <li>邀请码</li>
                    <li>邀请链接</li>
                    <li class="text_no">用户类别</li>
                    <li>注册用户数</li>
                    <li>返点</li>
                    <li>操作</li>
                </ul>
                <button class="readyCreateNewUser_btn" v-on:click="createInvite(1)"><i class="iconfont icon-jiahao"></i>创建新邀请</button>
                <ul class="PromotionCantant_list_con">
                    <template v-if="listData!=null">
                        <li class="clear" v-for="(d,i) in listData" :key="i">
                            <span class="text_no">{{ d.create_at }}</span>
                            <span>{{ d.code }}</span>
                            <span><input v-on:click="copyUrl($event,d.link,i)" class="sec" type="text" :value="d.link" readonly title="点击复制"></span>
                            <!-- <span v-on:click="copyUrl($event,d.link)"><input id="sec" type="text" :value="d.link"><i class="iconfont icon-lianjie"></i>邀请链接</span> -->
                            <span>代理</span>
                            <span>{{ d.register_number }}</span>
                            <span>{{ d.base }}</span>
                            <template v-if="d.status==1">
                                <span class="center">
                                    <button class="inviteSwitch_btn" :class="codestatus==d.code ? 'inviteSwitchstyle_no' : 'inviteSwitchstyle'" v-on:click="editProduceCode(d.code,0,i)"></button>
                                </span>
                            </template>
                            <template v-else>
                                <span class="center">
                                    <button class="inviteSwitch_btn" :class="codestatus==d.code ? 'inviteSwitchstyle' : 'inviteSwitchstyle_no'" v-on:click="editProduceCode(d.code,1,i)"></button>
                                </span>
                            </template>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        <!-- 创建新邀请 -->
        <div class="inviteNewUser_box" v-show="showandhide==1">
            <p class="user_h">
                <a class="myuserlist" v-on:click="createInvite(0)">邀请码列表</a>
                <i class="iconfont icon-next CreateNewUser_icon"></i>
                <span>创建新邀请</span>
            </p>
            <div class="bankCard_input_box clear">
                <div class="RadioUserType clear">
                    <p class="RadioUserType_title">用户类别</p>
                    <!-- <button class="RadioUserType_btn RadioUserType_this">
                        <i class="iconfont icon-zu"></i>
                        <span>会员</span>
                    </button> -->
                    <button class="RadioUserType_btn RadioUserType_this">
                        <!-- <i class="iconfont icon-weixuanzhong"></i> -->
                        <i class="iconfont icon-zu"></i>
                        <span>代理</span>
                    </button>
                </div>

                <div class="setUserRebate">
                    <p class="setUserRebate_title">彩票返点 (赔率%)</p>
                    <template v-if="sliderValue!=null || BackRebatesList!==null">
                        <span class="setUserRebate_number">
                            <template v-for="s in BackRebatesList">
                                <template v-if="s.percent==sliderValue+'%'">{{ base = s.base }}</template>
                            </template>
                            ({{ sliderValue }}%)
                        </span>
                    </template>
                    <div class="ratioCtrl_Slider setUserRebate_la" data-before='' data-after=''>
                        <div id="setinviteNewUser_number" class="demo-slider">
                            <div class="layui-slider ">
                                <div class="layui-slider-bar"></div>
                                <div class="layui-slider-wrap">
                                    <div class="layui-slider-wrap-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="setUserRebate">
                    <p class="setUserRebate_title">工资返点</p>
                    <template v-if="sliderValue2!=null || wageList!==null">
                        <span class="setUserRebate_number">
                            <template v-for="s in wageList">
                                <template v-if="s.percent==sliderValue2+'%'">
                                    {{ mebase = s.base }}
                                </template>
                            </template>
                            ({{ sliderValue2 }}%)
                        </span>
                    </template>
                    <div class="ratioCtrl_Slider2 setUserRebate_la" data-before='' data-after=''>
                        <div id="setUserRebate_number2" class="demo-slider">
                            <div class="layui-slider ">
                                <div class="layui-slider-bar"></div>
                                <div class="layui-slider-wrap">
                                    <div class="layui-slider-wrap-btn"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bankCard_input_box clear">
                    <h6>邀请码状态<span class="modifyPwd_tip center"></span></h6>
                    <button id="inviteSwitch_btn2" :class="codestartUsing==1 ? 'inviteSwitchstyle' : 'inviteSwitchstyle_no'" v-on:click="startUsing(codestartUsing)"></button>
                </div>
                <div class="bankCard_input_box">
                    <h6>邀请码<span class="modifyPwd_tip center"></span></h6>
                    <input type="text" class="bankCardName inviteNewUser_qrcode" v-model="code" readonly="readonly" unselectable="on">
                    <button id="createInvitationCode_btn" v-on:click="produceCode">生成邀请码</button>
                </div>
            </div>
            <p class="CreateNewUser_bottom_p">
                <button class="cancelCreateNewUser_btn" v-on:click="createInvite(0)">取消</button>
                <button class="CreateNewUser_btn" v-on:click="addProduceCode">创建新邀请</button>
            </p>
        </div>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'mypromotions',
    data () {
        return {
            userId:null,
            userToken:null,
            showandhide:0,
            listData:null,
            codestatus:null,
            codestartUsing:1, //创建新邀请的时候是否启用邀请码
            code:null,
            BackRebatesList:null,
            sliderValue:null, //滑动的值 
            sliderValue2:null,
            wageList:null,
            base:null,
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{},
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{},
    // 事件方法执行
    methods:{
        createInvite:function(n){
            this.showandhide = n;
            this.code = null;
            if(this.showandhide==0){
                this.getPromotionLinks();
            }
        },
        startUsing:function(n){
            if(n){
                this.codestartUsing = 0;
            }else{
                this.codestartUsing = 1;
            }
        },
        copyUrl:function(e,url,i){
            var dom = document.getElementsByClassName('sec')[i];
            dom.select();
            document.execCommand("Copy");
            layer.msg('已复制好，可贴粘')
        },
        // 修改邀请码
        editProduceCode:function(code,act,i){
            let dom = $('.inviteSwitch_btn').eq(i);
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/edit_produce_code',
                data: {'token':this.userToken,'uid':this.userId,'code':code,'status':act,'base':''}
            })
            .then(res => {
                if(res.data.ret==200){
                    if($(dom).is('.inviteSwitchstyle')){
                        $(dom).removeClass('inviteSwitchstyle').addClass('inviteSwitchstyle_no');
                    }else{
                        $(dom).addClass('inviteSwitchstyle').removeClass('inviteSwitchstyle_no');
                    }
                    layer.msg(res.data.msg);
                    this.getPromotionLinks();
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取我的邀请码
        getPromotionLinks:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/get_promotion_links',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 生成邀请码
        produceCode:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/produce_code',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.code = res.data.data.code;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 添加邀请码
        addProduceCode:function(){
            if(!isEmpty(this.base)){
                layer.msg('请设置彩票返点');
                return
            }else if(!isEmpty(this.code)){
                layer.msg('请生成邀请码');
                return
            }else{
                if(this.sliderValue2==null||this.sliderValue2==''){
                    this.sliderValue2 = 0;
                }
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'agent/add_produce_code',
                    data: {'token':this.userToken,'uid':this.userId,'base':this.base,'code':this.code,'status':this.codestartUsing,'wage_percent':this.sliderValue2/100}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        this.createInvite(0);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
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
                this.getPromotionLinks();
            }
        };
        
        // 下级会员返点列表
        this.$http({
            method: 'post',
            url: this.$store.state.postUrl+'agent/get_back_rebates',
            data: {'token':this.userToken,'uid':this.userId}
        })
        .then(res => {
            if(res.data.ret==200){
                this.BackRebatesList = res.data.data;
                let num = null;
                for (let i = 0; i < this.BackRebatesList.length; i++) {
                    num = i;
                }
                layui.use('slider', function(){
                    layui.slider.render({
                        elem: '#setinviteNewUser_number',
                        theme: '#f10320',
                        min: 0,
                        max: num,
                        tips: false,
                        change: function(value){
                            me.sliderValue = Number(me.BackRebatesList[num].percent.replace(/%/,''))+value/10;
                            $('.ratioCtrl_Slider').attr({'data-before':me.BackRebatesList[num].percent.replace(/%/,''),'data-after': me.sliderValue});
                        }
                    });
                });
            }else{
                layer.msg(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
        // 下级会员工资返点列表
        this.$http({method: 'post',url: this.$store.state.postUrl+'agent/get_wage_rebates',data: {'token':this.userToken,'uid':this.userId}})
        .then(res => {
            if(res.data.ret==200){
                this.wageList = res.data.data;
                const num = this.wageList.length-1;
                layui.use('slider', function(){
                    var slider2 = layui.slider;
                    slider2.render({
                        elem: '#setUserRebate_number2',
                        theme: '#f10320',
                        min: 0,
                        max: num,
                        tips: false,
                        change: function(value){
                            let tem = Number(me.wageList[num].percent.replace(/%/,''))+value/10;
                            me.sliderValue2 = tem.toFixed(1);
                            $('.ratioCtrl_Slider2').attr({'data-before':Math.round(me.wageList[num].percent.replace(/%/,'')*100)/100,'data-after': me.sliderValue2});
                        }
                    });
                });
            }else{
                layer.msg(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
}
</script>
<style scoped>
.sec{width: 100%;background-color: #f1f1f1;border: none;cursor: pointer;}
.setUserRebate{float: left;}
</style>

