<template>
    <!-- 账户明细 -->
    <div class="accountDetails">
        <div class="accountDetailsContant">
            <p class="user_h">账户明细</p>
            <div class="rechargeRecord_timeBox">
                <label>日期：</label>
                <button id="previousDayBtn" v-on:click="selectDate(1)"><i class="iconfont icon-previous"></i>前一天</button>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM-dd" v-model="time">
                </div>
                <template v-if="time==me">
                    <button id="nextDayBtn" disabled="disabled" style="cursor:not-allowed" v-on:click="selectDate(2)">后一天<i class="iconfont icon-next"></i></button>
                </template>
                <template v-else>
                    <button id="nextDayBtn" v-on:click="selectDate(2)">后一天<i class="iconfont icon-next"></i></button>
                </template>
                <span class="rechargeRecord_selectQueryTyle_box">
                    <label>交易类型:</label>
                    <select name="" id="rechargeRecord_selectQueryTyle" v-on:change="getseldata($event)">
                        <option value="">全部</option>
                        <option value="1">充值</option>
                        <option value="2">派彩</option>
                        <option value="3">佣金</option>
                        <option value="4">优惠</option>
                        <option value="5">投注</option>
                        <option value="6">反水</option>
                        <option value="9">撤单</option>
                        <option value="10">转入</option>
                        <option value="11">转出</option>
                        <option value="12">提现</option>
                        <option value="7">取消派彩</option>
                        <option value="8">取消优惠</option>
                        <option value="13">取消提现</option>
                    </select>
                </span>
            </div>
            <table id="lf_user_recording_table">
                <thead class="lf_user_recording_table_h">
                    <ul>
                        <li>交易时间</li>
                        <li>订单号</li>
                        <li>交易类型</li>
                        <!-- <li>交易项目</li> -->
                        <li>交易金额</li>
                        <li>帐户余额</li>
                    </ul>
                </thead>
                <tbody class="lf_user_recording_table_body">
                    <template v-if="listData!=null">
                        <ul>
                            <li v-for="(d,i) in listData.data" :key="i" class="clear">
                                <span>{{ d.create_at }}</span>
                                <span>{{ d.order_no }}</span>
                                <span>{{ d.name }}</span>
                                <!-- <span>{{ d.name }}</span> -->
                                <span>￥{{ d.money }}</span>
                                <span>￥{{ d.balance }}</span>
                            </li>
                        </ul>
                    </template>
                </tbody>
            </table>
        </div>
        <div id="demo7"></div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {isEmpty} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'accountDetails',
    data () {
        return {
            userId:null,
            userToken:null,
            time:thisDay(),
            me:thisDay(),
            listData:null,
            exp:'',
            laypage:null,
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
        selectDate:function(n){
            let a;
            if(n==1){
                a = (Date.parse(this.time)/1000) - 86400;
            }else{
                a = (Date.parse(this.time)/1000) + 86400;
            }
            this.time = formatTime(a,'Y-M-D');
            this.getAccountDetail();
        },
        // 账户明细
        getAccountDetail:function(page=1){
            var me = this;
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/account_detail',
                data: {'token':this.userToken,'uid':this.userId,'date':this.time,'exp':this.exp,'junior_id':'','page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.getAccountDetail));
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
        getseldata:function(obj){
            this.exp = obj.target.value;
            this.getAccountDetail();
        },
        // 分页函数
        Pagination:function(total,per,current,fn){
            this.laypage.render({
                elem: 'demo7',
                count: total, //总条数
                limit: per, //每页条数
                curr: current, //起始页
                theme: '#f20320',
                layout: ['count', 'prev', 'page', 'next'],
                jump: function(obj,first){
                    if(!first){
                        return fn(obj.curr);
                    }
                }
            });
        }
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

            }
        };
        layui.use(['laydate','laypage'], function(){
            let laydate = layui.laydate;
            me.laypage = layui.laypage;
            laydate.render({
                elem: '#test1',
                range: false,
                position: 'fixed',
                theme: '#f20320',
                max: thisDay(),
                value: thisDay(),
                done: function(value,date){
                    me.time = value;
                    me.getAccountDetail();
                }
            })
        });
        this.getAccountDetail();
    },
}
</script>
<style scoped>
#demo7{background-color: #fff;padding: 0 10px;}
</style>
