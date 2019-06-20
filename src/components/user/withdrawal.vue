<template>
    <!-- 提款 -->
    <div class="withdrawal">
        <div class="withdrawalContant">
            <p class="user_h">账户提现</p>
            <template v-if="Ymoney<10">
                <p class="withdrawal_tip">尊敬的用户，最低提现金额是<strong>10</strong>元，您目前的余额是<strong>{{ Ymoney }}</strong>元不足以提现哦, 不便之处敬请原谅</p>
            </template>
            <template v-else>
                <template v-if="Ubetting!=0">
                    <p class="withdrawal_tip">尊敬的用户，您目前的已投注金额是<strong>{{ Ybetting }}</strong>元，还需投注<strong>{{ Ubetting }}</strong>元，才能提现哦</p>
                </template>
            </template>
            <div class="withdrawalContant_top">
                <div class="withdrawalContant_top_child">
                    <div class="bankCard_input_box">
                        <h6>可提取余额</h6>
                        <input type="text" class="bankCardName" v-model="Ymoney" readonly unselectable="on">
                    </div>
                </div>
                <div class="withdrawalContant_top_child">
                    <div class="bankCard_input_box">
                        <h6>已达投注量</h6>
                        <input type="text" class="bankCardName" v-model="Ybetting" readonly unselectable="on">
                    </div>
                </div>
                <div class="withdrawalContant_top_child">
                    <div class="bankCard_input_box">
                        <h6>还需投注</h6>
                        <input type="text" class="bankCardName" v-model="Ubetting" readonly unselectable="on">
                    </div>
                </div>
            </div>
            <div class="bankCard_input_box">
                <h6>开户银行</h6>
                <input type="text" class="bankCardName" v-model="bank" readonly unselectable="on">
            </div>
            <div class="bankCard_input_box">
                <h6>银行卡号</h6>
                <input type="text" class="bankCardName" v-model="bankCar" readonly unselectable="on">
            </div>
            <div class="bankCard_input_box">
                <h6>提款金额</h6>
                <input type="text" class="bankCardName" v-model="withdrawalMoney" autocomplete="no" onkeyup="value=value.replace(/[^0-9]/g,'.')" onpaste="value=value.replace(/[^0-9]/g,'.')" oncontextmenu="value=value.replace(/[^0-9]/g,'.')"> 
            </div>
            <div class="bankCard_input_box">
                <h6>提现密码</h6>
                <input class="bankCardName WPwd" v-model="WPwd" max="4" min="1" maxlength="4" autocomplete="no" pattern="^[0-9]\w{1,5}$" placeholder="----" type="password" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <p class="CreateNewUser_bottom_p">
                <button class="cancelCreateNewUser_btn" v-on:click="resetData">重置</button>
                <template v-if="Ubetting!=0 || Ymoney<10">
                    <button class="CreateNewUser_btn unavailable" disabled="disabled">提交确认</button>
                </template>
                <template v-else>
                    <button class="CreateNewUser_btn" v-on:click="doWithdrawals">提交确认</button>
                </template>
            </p>
        </div>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'withdrawal',
    data () {
        return {
            userId:null,
            userToken:null,
            Ymoney:null,
            Ybetting:null,
            Ubetting:null,
            bank:null,
            bankCar:null,
            withdrawalMoney:null,
            WPwd:null,
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
        // 提款之前获取数据
        getWithdrawData:function(){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/get_withdraw_data',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    // console.log(res.data)
                    this.bankCar = res.data.data.bank_card;
                    this.bank = res.data.data.bank;
                    this.Ymoney = res.data.data.money;
                    this.Ybetting = res.data.data.has_betting_money; //已经投注金额
                    this.Ubetting = res.data.data.fact_betting_money //还需投注金额
                }else{
                    layer.msg(res.data.msg);
                }
                layer.closeAll('loading');
            })
            .catch(err => {
                console.log(err);
                layer.closeAll('loading');
            })
        },
        doWithdrawals:function(){
            if(!isEmpty(this.withdrawalMoney)){
                layer.msg('请输入提现金额');
                return
            }else{
                try {
                    if(this.withdrawalMoney.toString().split('.')[1].length>1){
                        layer.msg('最小单位为角,分不可提现');
                        return
                    }else if(!isEmpty(this.WPwd)){
                        layer.msg('请输入提现密码');
                        return
                    }else{
                        this.fromdo_withdrawals();
                    }
                } catch (error) {
                    if(!isEmpty(this.WPwd)){
                        layer.msg('请输入提现密码');
                        return
                    }else{
                        this.fromdo_withdrawals();
                    }
                }
            }
        },
        fromdo_withdrawals:function(){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/do_withdrawals',
                data: {'token':this.userToken,'uid':this.userId,'money':this.withdrawalMoney,'money_password':this.WPwd}
            })
            .then(res => {
                if(res.data.ret==200){
                    layer.msg(res.data.msg);
                }else{
                    layer.msg(res.data.msg);
                }
                this.resetData();
                this.getWithdrawData();
                layer.closeAll('loading');
            })
            .catch(err => {
                console.log(err);
                layer.closeAll('loading');
            })
        },
        resetData:function(){
            this.withdrawalMoney = null;
            this.WPwd = null;
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
                this.getWithdrawData();
            }
        }
    },
}
</script>
<style scoped>
.unavailable{cursor: not-allowed;color: #fff;background: #9a9a9a;border:1px solid #9a9a9a;}
</style>
