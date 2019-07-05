<template>
    <!-- 充值 -->
    <div class="Recharge">
        <template v-if="getBankID!=null || getBankID!=undefined">
            <!-- 线上跳转支付 -->
            <div class="RechargeCantant" style="min-height: 110px" v-if="getBankID.is_online==1">
                <p class="user_h">{{ getBankID.title }}</p>
                <div class="bankCard_input_box" style="min-height: 110px">
                    <h6>存款金额</h6>
                    <input type="text" class="Recharge_bankCardName" v-model="moneyNum" placeholder="请填写充值金额" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
            </div>
            <div v-else>
                <!-- 银行卡支付 -->
                <div class="RechargeCantant" v-if="getBankID.type==3">
                    <p class="user_h">{{ getBankID.title }}</p>
                    <div class="bankCard_input_box">
                        <h6>银行卡类型</h6>
                        <i class="iconfont icon-zu Recharge_icon_type"></i>
                        <span>储蓄卡</span>
                    </div>
                    <div class="bankCard_input_box">
                        <h6>存款银行</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="getBankID.k_bank" placeholder="存款卡号" readonly unselectable="on" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>平台存款卡号</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="getBankID.k_card_number" placeholder="存款卡号" readonly unselectable="on" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>平台存款人姓名</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="getBankID.k_name" placeholder="存款卡号" readonly unselectable="on" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>存款金额</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="moneyNum" placeholder="请填写存款金额" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>存款人姓名(必填)</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="trueName" placeholder="请输入中文、英文的存款人姓名">
                    </div>
                </div>
                <!-- 支付宝扫码支付 -->
                <div class="RechargeCantant" style="min-height: 110px" v-else-if="getBankID.type==2">
                    <p class="user_h">{{ getBankID.title }}</p>
                    <div class="c_qrCode"><img :src="getBankID.qrcode"></div>
                    <div class="bankCard_input_box" style="min-height: 110px">
                        <h6>存款金额</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="moneyNum" placeholder="请填写扫码的充值金额" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>存款人姓名(必填)</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="trueName" placeholder="请输入中文、英文的存款人姓名">
                    </div>
                </div>
                <!-- 微信扫码支付 -->
                <div class="RechargeCantant" style="min-height: 110px" v-else-if="getBankID.type==1">
                    <p class="user_h">{{ getBankID.title }}</p>
                    <div class="c_qrCode"><img :src="getBankID.qrcode"></div>
                    <div class="bankCard_input_box" style="min-height: 110px">
                        <h6>存款金额</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="moneyNum" placeholder="请填写扫码的充值金额" pattern="^[0-9]\w{1,5}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    </div>
                    <div class="bankCard_input_box">
                        <h6>存款人姓名(必填)</h6>
                        <input type="text" class="Recharge_bankCardName" v-model="trueName" placeholder="请输入中文、英文的存款人姓名">
                    </div>
                </div>
            </div>
            <template v-if="getBankID.is_online==1">
                <!-- <b class="Recharge_tip">备注：尊敬的用户，充值的最小金额为<b>100元</b></p> -->
                <p class="Recharge_tip">{{ getBankID.instructions }}</p>
                <p class="Recharge_Im_p"><button id="submitRecharge_btn" v-on:click="beforeRecharge">提交申请</button></p>
            </template>
            <template v-else>
                <!-- <p class="Recharge_tip" v-if="getBankID.type==3">备注：尊敬的用户，为了更快的通过充值审核，请务必如实填写充值金额与姓名</p> -->
                <!-- <p class="Recharge_tip" v-else>备注：尊敬的用户，为了更快的通过充值审核，请务必如实填写<b>扫码充值</b>金额</p> -->
                <p class="Recharge_tip">{{ getBankID.instructions }}</p>
                <p class="Recharge_Im_p"><button id="submitRecharge_btn" v-on:click="do_charge">提交申请</button></p>
            </template>
        </template>
        <template v-else>
            <div class="RechargeCantant" style="min-height: 110px">
                <div class="bankCard_input_box" style="min-height: 110px">
                    <p class="Recharge_tip" style="font-size:25px">请选择充值方式</p>
                </div>
            </div>
        </template>
        <!-- 线上支付跳转 -->
        <template v-if="oData!==null">
            <form :action="oData.tjurl" method="post">
                <input type="hidden" v-for="(d,i) in oData.native" :key="i" :name="i" :value="d">
                <input type="submit" value="" id="InitiatePayment" style="display:none">
            </form>
        </template>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'Recharge',
    props:['getBankID'],
    data () {
        return {
            userId:null,
            userToken:null,
            trueName:'',
            moneyNum:null,
            oData:null,
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
        beforeRecharge:function(){
            if(!isEmpty(this.moneyNum)){
                layer.msg('请输入充值金额');
            }else{
                layer.open({type:3});
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'money/before_recharge',
                    data: {'token':this.userToken,'uid':this.userId,'money':this.moneyNum,'recharge_id':this.getBankID.id}
                })
                .then(res => {
                    if(res.data.ret==200){
                        this.oData = res.data.data;
                        setTimeout(() => {
                            $('#InitiatePayment').click();
                        }, 200);
                    }else{
                        layer.msg(res.data.msg);
                    }
                    layer.closeAll('loading');
                })
                .catch(err => {
                    console.log(err);
                    layer.closeAll('loading');
                })
            }
        },
        do_charge:function(){
            if(!isEmpty(this.moneyNum)){
                layer.msg('请输入充值金额');
            }else if(!isEmpty(this.trueName)){
                layer.msg('请输入真实姓名');
            }else{
                layer.open({type:3});
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'money/do_charge',
                    data: {'token':this.userToken,'uid':this.userId,'money':this.moneyNum,'recharge_id':this.getBankID.id,'name':this.trueName}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.data);
                    }else{
                        layer.msg(res.data.msg);
                    }
                    layer.closeAll('loading');
                })
                .catch(err => {
                    console.log(err);
                    layer.closeAll('loading');
                })
            }
        },
    },
    // html加载完成之后执行
    mounted(){
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
                
            }
        }
    },
}
</script>
<style scoped>
.c_qrCode{width: 200px;height: 200px;margin: 10px auto;background-color: #fff;padding: 8px;}
.c_qrCode>img{width: 100%;height: 100%;}
</style>

