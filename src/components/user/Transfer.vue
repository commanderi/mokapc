<template>
    <!-- 转账 -->
    <div class="Transfer">
        <div class="transferContant">
            <p class="user_h">转账</p>
            <div class="bankCard_input_box">
                <div class="yue">
                   <ul>
                       <li>
                           <span>平台</span>
                           <span>余额</span>
                           <span>操作</span>
                        </li>
                        <li>
                            <span>中心钱包</span>
                            <span>{{ ZXQB!==null ? ZXQB : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('ZXQB')">刷新</button></span>
                        </li>
                        <li>
                            <span>真人AG</span>
                            <span>{{ AG!==null ? AG : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('AG')">刷新</button></span>
                        </li>
                        <li>
                            <span>巴沙体育</span>
                            <span>{{ IBC!==null ? IBC : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('IBC')">刷新</button></span>
                        </li>
                        <li>
                            <span>开元棋牌</span>
                            <span>{{ KY!==null ? KY : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('KY')">刷新</button></span>
                        </li>
                        <li>
                            <span>JDB电子</span>
                            <span>{{ JDB!==null ? JDB : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('JDB')">刷新</button></span>
                        </li>
                        <li>
                            <span>传奇电子</span>
                            <span>{{ CQ!==null ? CQ : '请刷新获取' }}</span>
                            <span><button class="shuaxin" v-on:click="get_game_money('CQ')">刷新</button></span>
                        </li>
                   </ul> 
                </div>
                <h6>从</h6>
                <select id="Transfer_goOut" v-on:change="getSelValtop">
                    <option value="1">中心钱包</option>
                    <option v-if="lolme==1" value="AG">真人AG</option>
                    <option v-if="lolme==1" value="IBC">巴沙体育</option>
                    <option v-if="lolme==1" value="KY">开元棋牌</option>
                    <option v-if="lolme==1" value="JDB">JDB电子</option>
                    <option v-if="lolme==1" value="CQ">传奇电子</option>
                </select>
                <h6>转到</h6>
                <select id="Transfer_goIn" v-on:change="getSelValbottom">
                    <option value="1">中心钱包</option>
                    <option v-if="lolhe==1" value="AG">真人AG</option>
                    <option v-if="lolhe==1" value="IBC">巴沙体育</option>
                    <option v-if="lolhe==1" value="KY">开元棋牌</option>
                    <option v-if="lolhe==1" value="JDB">JDB电子</option>
                    <option v-if="lolhe==1" value="CQ">传奇电子</option>
                </select>
                <h6>转账金额</h6>
                <input type="text" placeholder="请输入转帐金额" class="Transfer_number" v-model="Mnumber" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                <button id="TransferSubmit_btn" v-on:click="transfer">提交</button>
            </div>
        </div>
        <div class="transferbottom_tip">
            <b>转账说明：</b>中心余额与各个游戏钱包是相互独立的，转帐只能够在中心余额与游戏钱包间直接互转，游戏钱包之间不能直接互转。<br>
            1：中心钱包可以转账到真人AG、巴沙体育、开元棋牌、JDB电子、传奇电子。<br>
            2：真人AG、巴沙体育、开元棋牌、JDB电子、传奇电子只能转账到中心钱包。
        </div>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'Transfer',
    data () {
        return {
            userId:null,
            userToken:null,
            topData:1,
            bottomData:1,
            Mnumber:null,
            lolme:1,
            lolhe:1,
            ZXQB:null,
            AG:null,
            IBC:null,
            KY:null,
            JDB:null,
            CQ:null,
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
        getSelValtop:function(obj){
            this.topData = obj.target.value;
            if(this.topData==1){
                this.lolhe = 1;
            }else{
                this.lolhe = 0;
                this.bottomData = 1;
            }
        },
        getSelValbottom:function(obj){
            this.bottomData = obj.target.value;
            if(this.bottomData!=1){
                this.lolme = 1;
            }
        },
        transfer:function(){
            var type = '';
            var mgame = '';
            if(this.topData===this.bottomData){
                layer.msg('不能转到相同的钱包');
            }else{
                if(!isEmpty(this.Mnumber)){
                    layer.msg('转账金额不能为空');
                }else{
                    if(this.topData==1){
                        type = 1;
                        mgame = this.bottomData;
                    }else{
                        type = 2;
                        mgame = this.topData;
                    }
                    layer.open({type:3});
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'personal/money_to_game',
                        data: {'token':this.userToken,'uid':this.userId,'type':type,'way':2,'game':mgame,'money':this.Mnumber}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            layer.msg(res.data.msg);
                        }else{
                            layer.msg(res.data.msg);
                        }
                        this.get_game_money(this.bottomData);
                        layer.closeAll('loading');
                    })
                    .catch(err => {
                        console.log(err);
                        layer.closeAll('loading');
                    })
                }
            }
        },
        // 获取第三方游戏余额
        get_game_money:function(name){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_game_money',
                data: {'token':this.userToken,'uid':this.userId,'game':name}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.ZXQB = res.data.data.money;
                    switch (name) {
                        case 'AG':
                            this.AG = res.data.data.game_money;
                        break;
                        case 'IBC':
                            this.IBC = res.data.data.game_money;
                        break;
                        case 'KY':
                            this.KY = res.data.data.game_money;
                        break;
                        case 'JDB':
                            this.JDB = res.data.data.game_money;
                        break;
                        case 'CQ':
                            this.CQ = res.data.data.game_money;
                        break;
                    }
                }else{
                    layer.msg(res.data.msg);
                }
                layer.closeAll('loading');
            })
            .catch(err => {
                layer.closeAll('loading');
                console.log(err);
            })
        },
    },
    // html加载完成之后执行
    mounted(){
        var me = this;
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
                this.get_game_money('ZXQB');
            }
        };
    },
}
</script>
<style scoped>
.yue{width: 100%;height: auto;}
.yue>ul>li{width: 100%;height: 35px;line-height: 35px;text-align: center;}
.yue>ul>li>span{width: 32%;display: inline-block;}
.yue>ul>li:nth-of-type(odd){background: #27bcf524}
.yue>ul>li:nth-of-type(1){background: #ccc}
.shuaxin{border: none;border-radius: 4px;background-color: #27bcf5;color: #fff;cursor: pointer;padding: 4px 12px;font-size: 13px;}
</style>

