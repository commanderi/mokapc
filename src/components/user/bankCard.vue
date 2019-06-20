<template>
    <!-- 银行卡信息 -->
    <div class="bankCard">
        
        <!-- 完善提款信息 -->
        <!-- <div class="perfectBankCardCantant" v-if="moneyPwd==0">
            <p class="user_h">完善提款信息</p>
            <div class="perfectBankCardCantant_tip">
                <i class="iconfont icon-anquanzhongxin"></i><span>尊敬的用户，为了保障您的资金安全，请您绑定您的姓名和设置取款密码。<b>如果姓名与开户名不一致，将无法取款</b></span>
            </div>
            <div class="bankCard_input_box">
                <h6>真实姓名</h6>
                <input type="text" class="bankCardName usernameTrue" placeholder="请输入中文、英文的真实姓名" v-model="usertruename">
            </div>
            <div class="bankCard_input_box">
                <h6>提现密码</h6>
                <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" type="password" v-model="pwd1" class="bankCardName cashPassword" placeholder="请设置4位提现密码" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <div class="bankCard_input_box">
                <h6>确认提现密码</h6>
                <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" type="password" v-model="pwd2" class="bankCardName confirmCashPassword" placeholder="请再次确认提现密码" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <p class="addBankCardBtn_p"><button class="addBankCardBtn" v-on:click="withdrawPwd">确认提交</button></p>
        </div> -->
        <!-- 添加银行卡 -->
        <div class="addBankCardCantant" v-if="bankcard==null">
            <p class="user_h">银行卡信息</p>
            <div class="bankCard_input_box">
                <h6>银行卡开户姓名</h6>
                <input type="text" class="bankCardName" placeholder="请输入中文、英文的银行卡开户姓名" v-model="usertruename">
            </div>
            <div class="bankCard_input_box">
                <h6>银行卡号</h6>
                <input type="text" class="bankCardName" placeholder="请输入16-19位银行卡号" v-model="u_bankcard" max="19" min="16" maxlength="19" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <div class="bankCard_input_box">
                <h6>开户银行</h6>
                <input type="text" class="bankCardName" placeholder="请输入开户银行" v-model="bank">
            </div>
            <div class="bankCard_input_box">
                <h6>开户支行地址</h6>
                <input type="text" class="bankCardName" placeholder="请输入省市区（县）" v-model="branchbank">
            </div>
            <div class="bankCard_input_box">
                <h6>提现密码</h6>
                <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" type="password" v-model="pwd1" class="bankCardName cashPassword" placeholder="请设置4位提现密码" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <div class="bankCard_input_box">
                <h6>确认提现密码</h6>
                <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" type="password" v-model="pwd2" class="bankCardName confirmCashPassword" placeholder="请再次确认提现密码" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
            </div>
            <p class="addBankCardBtn_p"><button class="addBankCardBtn" v-on:click="bindBankCard">添加银行卡</button></p>
        </div>
        <!-- 已绑定的银行卡信息 -->
        <div class="bankCardCantant" v-else-if="usertruename!=null && branchbank!=null && bank!=null && bankcard!==null">
            <p class="user_h">银行卡信息</p>
            <div class="bankCard_input_box">
                <h6>银行卡开户姓名</h6>
                <input type="text" class="bankCardName" readonly unselectable="on" v-model="usertruename">
            </div>
            <div class="bankCard_input_box">
                <h6>银行卡号</h6>
                <input type="text" class="bankCardName" readonly unselectable="on" v-model="bankcard">
            </div>
            <div class="bankCard_input_box">
                <h6>开户银行</h6>
                <input type="text" class="bankCardName" readonly unselectable="on" v-model="bank">
            </div>
            <div class="bankCard_input_box">
                <h6>开户支行地址</h6>
                <input type="text" class="bankCardName" readonly unselectable="on" v-model="branchbank">
            </div>
        </div>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'bankCard',
    data () {
        return {
            userId:null,
            userToken:null,
            usertruename:null,
            bankcard:'',
            branchbank:null,
            bank:null,
            moneyPwd:null,
            u_bankcard:null,
            pwd1:null,
            pwd2:null,
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
        // 获取个人资料
        getMyInfo:function(){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_personal_info',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.bank = res.data.data.bank;
                    this.bankcard = res.data.data.bank_card;
                    this.branchbank = res.data.data.branch_bank;
                    this.usertruename = res.data.data.true_name;
                    this.moneyPwd = res.data.data.money_password;
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
        // 绑定银行卡
        bindBankCard:function(){
            if(!isEmpty(this.usertruename)){
                layer.msg('请输入你的真实姓名');
                return
            }else if(!isEmpty(this.u_bankcard)){
                layer.msg('请输入你的银行卡号');
                return
            }else if(!isEmpty(this.bank)){
                layer.msg('请输入开户银行');
                return
            }else if(!isEmpty(this.branchbank)){
                layer.msg('请输入开户支行地址');
                return
            }else if(!isEmpty(this.pwd1) || !isEmpty(this.pwd1)){
                layer.msg('提现密码不能为空');
                return
            }else if(this.pwd1!==this.pwd2){
                layer.msg('提现密码不一致');
                return
            }else{
                layer.open({type:3});
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'personal/bang_card',
                    data: {'token':this.userToken,'uid':this.userId,'bank':this.bank,'bank_card':this.u_bankcard,'branch_bank':this.branchbank,'true_name':this.usertruename,'money_password':this.pwd2}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        this.getMyInfo();
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
                this.getMyInfo();
            }
        }
    },
}
</script>
