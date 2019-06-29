<template>
    <div class="Mask user scale_0 scale_1">
        <div class="userBox clear">
            <!-- 个人中心左侧菜单 -->
            <div class="userBoxMeun">
                <div class="userBoxMeun_list" v-show="showaddBankCardReturn!=4">
                    <ul>
                        <h6 class="userBoxMeun_title">用户中心</h6>
                        <li v-on:click="LoLthisMe(0)" :class="{LoL_thisMe:0===userMum}"><a><i class="iconfont icon-jibenxinxi"></i><span>基本信息</span></a></li>
                        <li v-on:click="LoLthisMe(1)" :class="{LoL_thisMe:1===userMum}"><a><i class="iconfont icon-wodexiaoxi"></i><span>我的消息</span></a></li>
                        <li v-on:click="LoLthisMe(2)" :class="{LoL_thisMe:2===userMum}"><a><i class="iconfont icon-xiugaimima"></i><span>修改密码</span></a></li>
                        <li v-on:click="LoLthisMe(3)" :class="{LoL_thisMe:3===userMum}"><a><i class="iconfont icon-card"></i><span>银行卡信息</span></a></li>
                        <li v-on:click="LoLthisMe(4)" :class="{LoL_thisMe:4===userMum}"><a><i class="iconfont icon-chongzhi1"></i><span>充值</span></a></li>
                        <li v-on:click="LoLthisMe(5)" :class="{LoL_thisMe:5===userMum}"><a><i class="iconfont icon-tixian"></i><span>提款</span></a></li>
                        <li v-on:click="LoLthisMe(6)" :class="{LoL_thisMe:6===userMum}"><a><i class="iconfont icon-zhuanzhang1"></i><span>转账</span></a></li>
                        <li v-on:click="LoLthisMe(12)" :class="{LoL_thisMe:12===userMum}"><a><i class="iconfont icon-baobiao"></i><span>个人报表</span></a></li>
                        <li v-on:click="LoLthisMe(13)" :class="{LoL_thisMe:13===userMum}"><a><i class="iconfont icon-yijianfankui"></i><span>意见反馈</span></a></li>
                        <h6 class="userBoxMeun_title">交易明细</h6>
                        <li v-on:click="LoLthisMe(7)" :class="{LoL_thisMe:7===userMum}"><a><i class="iconfont icon-touzhujilu"></i><span>投注记录</span></a></li>
                        <li v-on:click="LoLthisMe(8)" :class="{LoL_thisMe:8===userMum}"><a><i class="iconfont icon-zhangdanmingxi"></i><span>账户明细</span></a></li>
                        <li v-on:click="LoLthisMe(9)" :class="{LoL_thisMe:9===userMum}"><a><i class="iconfont icon-chongzhimingxi"></i><span>充值记录</span></a></li>
                        <li v-on:click="LoLthisMe(10)" :class="{LoL_thisMe:10===userMum}"><a><i class="iconfont icon-jilu"></i><span>提款记录</span></a></li>
                        <li v-on:click="LoLthisMe(11)" :class="{LoL_thisMe:11===userMum}"><a><i class="iconfont icon-zhuanzhang"></i><span>转账记录</span></a></li>
                        <h6 class="userBoxMeun_title">代理中心</h6>
                        <li v-on:click="LoLthisMe(14)" :class="{LoL_thisMe:14===userMum}"><a><i class="iconfont icon-yhgl"></i><span>用户管理</span></a></li>
                        <li v-on:click="LoLthisMe(15)" :class="{LoL_thisMe:15===userMum}"><a><i class="iconfont icon-tuanduibaobiao"></i><span>团队报表</span></a></li>
                        <li v-on:click="LoLthisMe(16)" :class="{LoL_thisMe:16===userMum}"><a><i class="iconfont icon-yongjinbaobiao"></i><span>佣金报表</span></a></li>
                        <li v-on:click="LoLthisMe(17)" :class="{LoL_thisMe:17===userMum}"><a><i class="iconfont icon-tuiguang"></i><span>推广管理</span></a></li>
                    </ul>
                </div>
                <!-- 添加银行卡菜单 -->
                <div class="addBankCardMeun" v-show="showaddBankCardReturn==4">
                    <h6 class="userBoxMeun_title addBankCardReturn" v-on:click="addBankCardReturn"><i class="iconfont icon-jiantou"></i>返回</h6>
                    <ul>
                        <li>
                            <dl class="userBoxMeun_list_dl">
                                <dd v-for="(d,i) in RechargeList" :key="i" v-on:click="rechargeSerial(d)"><a href="javascript:void(0)">{{ d.title }}</a></dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <!-- <button id="dropOutBtn">登出</button> -->
            </div>
            <div class="userContant">
                <p class="userContantTitle">
                    <button class="user_close" v-on:click="userClose">关闭&nbsp;<i class="iconfont icon-guanbi"></i></button>
                </p>
                <div class="user_con">
                    <!-- 此处引入个人中心各个子组件 -->
                    <userInfo v-if="userMum==0"></userInfo>
                    <myMesseag v-else-if="userMum==1"></myMesseag>
                    <changePassword v-else-if="userMum==2"></changePassword>
                    <bankCard v-else-if="userMum==3"></bankCard>
                    <Recharge v-else-if="userMum==4" v-bind:getBankID="typeData"></Recharge>
                    <withdrawal v-else-if="userMum==5"></withdrawal>
                    <Transfer v-else-if="userMum==6"></Transfer>
                    <bettingRecord v-else-if="userMum==7"></bettingRecord>
                    <accountDetails v-else-if="userMum==8"></accountDetails>
                    <rechargeRecord v-else-if="userMum==9"></rechargeRecord>
                    <withdrawalRecord v-else-if="userMum==10"></withdrawalRecord>
                    <transferRecord v-else-if="userMum==11"></transferRecord>
                    <personalReport v-else-if="userMum==12"></personalReport>
                    <Feedback v-else-if="userMum==13"></Feedback>
                    <userManagement v-else-if="userMum==14"></userManagement>
                    <teamReport v-else-if="userMum==15"></teamReport>
                    <brokerageReport v-else-if="userMum==16"></brokerageReport>
                    <mypromotions v-else-if="userMum==17"></mypromotions>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import accountDetails from '@/components/user/accountDetails'
import bankCard from '@/components/user/bankCard'
import userInfo from '@/components/user/userInfo'
import myMesseag from '@/components/user/myMesseag'
import changePassword from '@/components/user/changePassword'
import Recharge from '@/components/user/Recharge'
import withdrawal from '@/components/user/withdrawal'
import Transfer from '@/components/user/Transfer'
import bettingRecord from '@/components/user/bettingRecord'
import rechargeRecord from '@/components/user/rechargeRecord'
import withdrawalRecord from '@/components/user/withdrawalRecord'
import transferRecord from '@/components/user/transferRecord'
import personalReport from '@/components/user/personalReport'
import Feedback from '@/components/user/Feedback'
import userManagement from '@/components/user/userManagement'
import teamReport from '@/components/user/teamReport'
import brokerageReport from '@/components/user/brokerageReport'
import mypromotions from '@/components/user/mypromotions'
export default {
    name: 'user',
    data () {
        return {
            userMum:this.$store.state.clickHeadId,
            showaddBankCardReturn:null,
            RechargeList:null,
            typeData:null,
        }
    },
    // html加载完成之前,执行,执行顺序：父组件-子组件
    created(){},
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{
        'accountDetails':accountDetails,
        'bankCard':bankCard,
        'userInfo':userInfo,
        'myMesseag':myMesseag,
        'changePassword':changePassword,
        'Recharge':Recharge,
        'withdrawal':withdrawal,
        'Transfer':Transfer,
        'bettingRecord':bettingRecord,
        'rechargeRecord':rechargeRecord,
        'withdrawalRecord':withdrawalRecord,
        'transferRecord':transferRecord,
        'personalReport':personalReport,
        'Feedback':Feedback,
        'userManagement':userManagement,
        'teamReport':teamReport,
        'brokerageReport':brokerageReport,
        'mypromotions':mypromotions
    },
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{
        
    },
    // 事件方法执行
    methods:{
        userClose:function(){
            $('.user').removeClass('scale_1');
            this.$emit('changeUserMask',this.$store.state.AppUserStatus = false); // 个人中心的显示与否
        },
        LoLthisMe:function(id){
            if(id==4){
                this.showaddBankCardReturn = id;
            }
            this.userMum = id;
            console.log(this.userMum)
        },
        addBankCardReturn:function(){
            this.showaddBankCardReturn = -1;
            this.userMum = 3;
        },
        rechargeSerial:function(d){
            this.typeData = d;
        },
        // 获取所有充值方式
        getRechargeWays:function(){
            if(this.$store.state.clickHeadId==4){
                this.showaddBankCardReturn = 4;
            }
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/get_recharge_ways',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.RechargeList = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    mounted(){
        this.getRechargeWays();
    }
}
    // $('.Details_xiala').on('click',function(){
    //     $(this).siblings('.user_988_list_body_tow_box').show();
    // });
    // $('.addBankCardReturn').on('click',function(){
    //     $('.addBankCardMeun').animate({'left':'-100%'},function(){
    //         $(this).hide();
    //     })
    // })
    
</script>
<style scoped>
.icon-jibenxinxi{font-size: 21px;left: -1px;}
.icon-yijianfankui{font-size: 21px;}
.icon-tixian{font-size: 24px;left: -3px;}
.icon-zhuanzhang1{font-size: 20px;left: -1px;}
.icon-chongzhi1{font-size: 22px;left: -2px;}
.icon-baobiao{font-size: 20px;}
.icon-card{font-size: 23px;left: -2px;}
.icon-xiugaimima{font-size: 22px;left: -2px;}
.icon-touzhujilu{font-size: 20px;}
.icon-zhangdanmingxi{left: 2px;}
.icon-chongzhimingxi{font-size: 25px;left: -3px;}
.icon-jilu{font-size: 18px;left: 1px;}
.icon-zhuanzhang{font-size: 19px;left: 1px;}
.icon-tuiguang{font-size: 21px;}
.icon-yongjinbaobiao{font-size: 20px;left: -2px;}
</style>


