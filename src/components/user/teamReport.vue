<template>
    <!-- 团队报表 -->
    <div class="teamReport">
        <div class="teamReportContant">
            <p class="user_h">团队报表</p>
            <div class="personalReport_selectTimeBox">
                <label>快捷选时：</label>
                <button class="preciseTime_btn" title="今天0:0:0-23:59:59" v-on:click="selectTime(86400)" :class="{preciseTime_btn_hover:thismeRed==86400}">今天</button>
                <button class="preciseTime_btn" title="昨天0:0:0-23:59:59" v-on:click="selectTime(86400*2)" :class="{preciseTime_btn_hover:thismeRed==86400*2}">昨天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推7天" v-on:click="selectTime(86400*7)" :class="{preciseTime_btn_hover:thismeRed==86400*7}">7天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推15天" v-on:click="selectTime(86400*15)" :class="{preciseTime_btn_hover:thismeRed==86400*15}">15天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推30天" v-on:click="selectTime(86400*30)" :class="{preciseTime_btn_hover:thismeRed==86400*30}">30天</button>
                <button class="preciseTime_btn" title="查询上个月30天" v-on:click="selectTime(-1)" :class="{preciseTime_btn_hover:thismeRed==-1}">上月</button>
                <span class="layui-input-inline personalReport_selectTimes">
                    <input type="text" class="layui-input" id="test9" placeholder="按时间段查询">
                </span>
            </div>
            <div class="mianbao">
                <a v-on:click="returnTop(-1)">我的下级</a><i class="iconfont icon-next"></i>
                <template v-for="(d,i) in nameArr">
                    <a :key="i" v-on:click="returnTop(i)">{{ d }}</a>
                    <template v-if="i<nameArr.length-1">
                        <i class="iconfont icon-next"></i>
                    </template>
                </template>
            </div>
            <div class="user_988_table">
                <div class="user_988_table_top_nav clear">
                    <ul>
                        <li class="fuckMe">彩票</li>
                    </ul>
                </div>
                <div class="user_988_table_box teamReportContant_table_box">
                    <ul class="user_988_list_title">
                        <li class="clear">
                            <span>用户</span>
                            <span>充值金额</span>
                            <span>提现金额</span>
                            <span>代理转入</span>
                            <span>代理转出</span>
                            <span>总投注</span>
                            <span>总中奖</span>
                            <span>总优惠</span>
                            <span>总工资</span>
                            <span>总盈亏</span>
                            <span>总佣金</span>
                            <span>上级用户名</span>
                            <span>下级报表</span>
                        </li>
                    </ul>
                    <ul class="user_988_list_body">
                        <template v-if="listData!==null">
                            <li class="clear" v-for="(d,i) in listData" :key="i">
                                <span>{{ d.mobile }}</span>
                                <span>￥{{ d.recharge_total }}</span>
                                <span>￥{{ d.withdraw_total }}</span>
                                <span>￥{{ d.transfer_in }}</span>
                                <span>￥{{ d.transfer_out }}</span>
                                <span>￥{{ d.betting_money }}</span>
                                <span>￥{{ d.winning_money }}</span>
                                <span>￥{{ d.sale_money }}</span>
                                <span>￥{{ d.back_money}}</span>
                                <span>￥{{ d.win_lose }}</span>
                                <span>￥{{ d.yj_money }}</span>
                                <span>{{ d.up_mobile }}</span>
                                <span><button id="query_personal_btn" v-on:click="toPersonal(d.mobile,d.id)">查看</button></span>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="Mask scale_0 teamReport_Mask">
                    <div class="teamReport_Mask_con">
                        <p class="userContantTitle">
                            <span class="user_close">关闭&nbsp;<i class="iconfont icon-guanbi"></i></span>
                        </p>
                        <p>个人报表(彩票)</p>
                        <p>用户 : commander0</p>
                        <p>上级代理 : -</p>
                        <p>查询日期 : 2019-03-01 ~ 2019-03-31</p>
                        <div class="user_988_table_box teamReport_Mask_con_table">
                            <ul class="user_988_list_title">
                                <li class="clear">
                                    <span>总充值</span>
                                    <span>总提现</span>
                                    <span>转入</span>
                                    <span>转出</span>
                                    <span>总投注</span>
                                    <span>有效投注金额</span>
                                    <span>总派彩</span>
                                    <span>总优惠</span>
                                    <span>返水金额</span>
                                    <span>盈利总额</span>
                                </li>
                            </ul>
                            <ul class="user_988_list_body">
                                <li class="clear">
                                    <span>￥100</span>
                                    <span>￥10</span>
                                    <span>￥10</span>
                                    <span>￥451</span>
                                    <span>￥564</span>
                                    <span>￥451</span>
                                    <span>￥784</span>
                                    <span>￥854</span>
                                    <span>￥456</span>
                                    <span>￥456</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'teamReport',
    data () {
        return {
            userToken:null,
            userId:null,
            startTime:null,
            endTime:null,
            listData:null,
            thismeRed:86400,
            nameArr:[],
            idArr:[],
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
            this.getTeamReport();
            document.getElementById('test9').value = null;
        },
        toPersonal:function(name,id){
            this.getTeamReport(id,name);
            if(this.idArr.indexOf(id)==-1){
                this.idArr.push(id);
            }
            if(this.nameArr.indexOf(name)==-1){
                this.nameArr.push(name);
            }
        },
        returnTop:function(index){
            if(index===-1){
                this.idArr = [];
                this.nameArr = [];
                this.getTeamReport();
            }else{
                if(index!=this.idArr.length-1 || index!=this.nameArr.length-1){
                    if(index==0){
                        this.getTeamReport(this.idArr[index],this.nameArr[index]);
                        this.idArr.splice(-1,1);
                        this.nameArr.splice(-1,1);
                    }else{
                        this.getTeamReport(this.idArr[index],this.nameArr[index]);
                        this.idArr.splice(-1,index+1);
                        this.nameArr.splice(-1,index+1);
                    }
                }
            }
        },
        getTeamReport:function(id='',name=''){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/get_team_report',
                data: {'token':this.userToken,'uid':this.userId,'start':this.startTime,'end':this.endTime,'junior_id':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                }else{
                    this.idArr.splice(-1,1);
                    this.nameArr.splice(-1,1);
                    layer.msg(res.data.msg);
                }
                layer.closeAll('loading');
            })
            .catch(err => {
                console.log(err);
                layer.closeAll('loading');
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
                let str = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
                this.startTime = formatTime((Date.parse(str)/1000),'Y-M-D h:m:s');
                this.endTime = formatTime((Date.parse(str)/1000)+86399,'Y-M-D h:m:s');
                this.getTeamReport();
            }
        };
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#test9',
                range: true,
                position: 'fixed',
                theme: '#27bcf5',
                max: thisDay(),
                done: function(value,date,endDate){
                    if(value==null||value==''){
                        document.getElementById('test9').value = null;
                        me.startTime = null;
                        me.endTime = null;
                        me.getTeamReport();
                    }else{
                        me.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        me.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        me.getTeamReport();
                        me.thismeRed = null;
                    }
                }
            });
        });
    },
}
</script>
<style scoped>
.user_988_list_title>li>span{width: 7.69%;}
.user_988_list_body>li>span{width: 7.69%;}
#query_personal_btn{padding: 3px 4px;font-size: 12px;}
.user_988_list_body{height: auto;max-height: 360px;overflow-y: auto;}
</style>

