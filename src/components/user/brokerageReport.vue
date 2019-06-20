<template>
    <!-- 佣金报表 -->
    <div class="brokerageReport">
        <div class="brokerageReportContant">
            <p class="user_h">佣金报表</p>
            <div class="personalReport_selectTimeBox">
                <label>快捷选时：</label>
                <button class="preciseTime_btn" title="今天0:0:0-23:59:59" v-on:click="selectTime(86400)" :class="{preciseTime_btn_hover:thismeRed==86400}">今天</button>
                <button class="preciseTime_btn" title="昨天0:0:0-23:59:59" v-on:click="selectTime(86400*2)" :class="{preciseTime_btn_hover:thismeRed==86400*2}">昨天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推7天" v-on:click="selectTime(86400*7)" :class="{preciseTime_btn_hover:thismeRed==86400*7}">7天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推15天" v-on:click="selectTime(86400*15)" :class="{preciseTime_btn_hover:thismeRed==86400*15}">15天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推30天" v-on:click="selectTime(86400*30)" :class="{preciseTime_btn_hover:thismeRed==86400*30}">30天</button>
                <button class="preciseTime_btn" title="查询上个月30天" v-on:click="selectTime(-1)" :class="{preciseTime_btn_hover:thismeRed==-1}">上月</button>
                <span class="layui-input-inline personalReport_selectTimes">
                    <input type="text" class="layui-input" id="test8" placeholder="按时间段查询">
                </span>
            </div>
            <div id="lf_user_recording_table">
                <ul class="lf_user_recording_table_ul">
                    <li class="clear">
                        <span>交易时间</span>
                        <span>期号</span>
                        <span>交易状态</span>
                        <span>投注数</span>
                        <span>投注金额</span>
                        <span>佣金</span>
                    </li>
                </ul>
                <ul class="hou_jia">
                    <template v-if="listData!=null">
                    <li v-for="(d,i) in listData.data.data" :key="i">
                        <span>{{ d.create_at }}</span>
                        <span>{{ d.stage }}</span>
                        <span>已发</span>
                        <span>{{ d.betting_number }}</span>
                        <span>￥{{ d.betting_money }}</span>
                        <span>￥{{ d.money }}</span>
                    </li>
                    </template>
                </ul>
            </div>
            <template v-if="listData!==null">
                <p class="brokerageReport_p">总结：<span>投注总金额：<b>{{ listData.total_betting }}</b>元</span><span>获得总佣金：<b>{{ listData.total_yj_money }}</b>元</span></p>
            </template>
        </div>
        <div id="demo7"></div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {isEmpty} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'brokerageReport',
    data () {
        return {
            userId:null,
            userToken:null,
            listData:null,
            startTime:null,
            endTime:null,
            thismeRed:86400,
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
        selectTime:function(time){
            this.thismeRed = time;
            let str = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
            if(time==86400*2){
                this.startTime = ((Date.parse(str)/1000)+86399) - time+1;
                this.endTime = ((Date.parse(str)/1000)+86399) - (time-86400);
            }else if(time === -1){
                this.startTime = ((Date.parse(str)/1000)+86400) - (86400*60);
                this.endTime = ((Date.parse(str)/1000)+86399) - (86400*30);
            }else{
                this.startTime = ((Date.parse(str)/1000)+86399) - time+1;
                this.endTime = (Date.parse(str)/1000)+86399;
            }
            this.startTime = formatTime(this.startTime,'Y-M-D h:m:s');
            this.endTime = formatTime(this.endTime,'Y-M-D h:m:s');
            this.getAgentMoney();
            document.getElementById('test8').value = null;
        },
        // 获取代理佣金
        getAgentMoney:function(page=1){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/get_agent_money',
                data: {'token':this.userToken,'uid':this.userId,'start':this.startTime,'end':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.Pagination(res.data.data.data.total,res.data.data.data.per_page,res.data.data.data.current_page,eval(this.getAgentMoney));
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
                let str = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
                this.startTime = formatTime((Date.parse(str)/1000),'Y-M-D h:m:s');
                this.endTime = formatTime((Date.parse(str)/1000)+86399,'Y-M-D h:m:s');
                this.getAgentMoney();
            }
        };
        layui.use(['laydate','laypage'], function(){
            var laydate = layui.laydate;
            me.laypage = layui.laypage;
            laydate.render({
                elem: '#test8',
                range: true,
                position: 'fixed',
                theme: '#f20320',
                max: thisDay(),
                done: function(value,date,endDate){
                    if(value==null||value==''){
                        document.getElementById('test8').value = null;
                        me.startTime = null;
                        me.endTime = null;
                        me.getAgentMoney();
                    }else{
                        me.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        me.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        me.getAgentMoney();
                        me.thismeRed = null;
                    }
                }
            });
        });
    },
}
</script>
<style scoped>
#demo7{background-color: #fff;padding: 0 10px;}
</style>