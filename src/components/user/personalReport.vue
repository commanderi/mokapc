<template>
    <!-- 个人报表 -->
    <div class="personalReport">
        <div class="personalReportContant">
            <p class="user_h">个人报表</p>
            <div class="personalReport_selectTimeBox">
                <label>快捷选时：</label>
                <button class="preciseTime_btn" title="今天0:0:0-23:59:59" v-on:click="selectTime(86400)" :class="{preciseTime_btn_hover:thismeRed==86400}">今天</button>
                <button class="preciseTime_btn" title="昨天0:0:0-23:59:59" v-on:click="selectTime(86400*2)" :class="{preciseTime_btn_hover:thismeRed==86400*2}">昨天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推7天" v-on:click="selectTime(86400*7)" :class="{preciseTime_btn_hover:thismeRed==86400*7}">7天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推15天" v-on:click="selectTime(86400*15)" :class="{preciseTime_btn_hover:thismeRed==86400*15}">15天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推30天" v-on:click="selectTime(86400*30)" :class="{preciseTime_btn_hover:thismeRed==86400*30}">30天</button>
                <button class="preciseTime_btn" title="查询上个月30天" v-on:click="selectTime(-1)" :class="{preciseTime_btn_hover:thismeRed==-1}">上月</button>
                <span class="layui-input-inline personalReport_selectTimes">
                    <input type="text" class="layui-input" id="test6" placeholder="按时间段查询">
                </span>
            </div>
            <div class="user_988_table">
                <div class="user_988_table_top_nav clear">
                    <ul>
                        <li class="fuckMe">彩票</li>
                    </ul>
                </div>
                <div class="user_988_table_box">
                    <ul class="user_988_list_title">
                        <li class="clear">
                            <!-- <span>操作</span> -->
                            <span>游戏</span>
                            <span>总充值</span>
                            <span>转入</span>
                            <span>转出</span>
                            <span>总投注</span>
                            <span class="text_no">有效投注金额</span>
                            <span>总派彩</span>
                            <span>总优惠</span>
                            <span>返点金额</span>
                            <span>总佣金</span>
                            <span>总提现</span>
                            <span>盈利总额</span>
                        </li>
                    </ul>
                    <ul class="user_988_list_body">
                        <template v-if="listData!=null">
                            <li class="clear">
                                <!-- <span class="Details_xiala">详情<i class="iconfont icon-xiala"></i></span> -->
                                <span>彩票</span>
                                <span>{{ listData.recharge_total }}</span>
                                <span>{{ listData.transfer_in }}</span>
                                <span>{{ listData.transfer_out }}</span>
                                <span>{{ listData.betting_money }}</span>
                                <span>{{ listData.betting_money }}</span>
                                <span>{{ listData.winning_money }}</span>
                                <span>{{ listData.sale_money }}</span>
                                <span>{{ listData.back_money }}</span>
                                <span>{{ listData.yj_money }}</span>
                                <span>{{ listData.withdraw_total }}</span>
                                <span>{{ listData.win_lose }}</span>
                                <div class="user_988_list_body_tow_box" style="display:none">
                                    <ul class="user_988_list_title_tow">
                                        <li class="clear">
                                            <span>日期</span>
                                            <span>总充值</span>
                                            <span>总提现</span>
                                            <span>转入</span>
                                            <span>转出</span>
                                            <span>总投注</span>
                                            <span>有效投注金额</span>
                                            <span>总派彩</span>
                                            <span>总优惠</span>
                                            <span>返点金额</span>
                                            <span>总佣金</span>
                                            <span>盈利总额</span>
                                        </li>
                                    </ul>
                                    <ul class="user_988_list_body_tow">
                                        <li class="clear">
                                            <span>2019-03-30</span>
                                            <span>￥120</span>
                                            <span>￥180</span>
                                            <span>￥100</span>
                                            <span>￥10</span>
                                            <span>￥10</span>
                                            <span>￥451</span>
                                            <span>￥564</span>
                                            <span>￥451</span>
                                            <span>￥784</span>
                                            <span>￥854</span>
                                            <span>￥456</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'personalReport',
    data () {
        return {
            userId:null,
            userToken:null,
            listData:null,
            startTime:null,
            endTime:null,
            thismeRed:86400,
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
            this.getPersonalReport();
            document.getElementById('test6').value = null;
        },
        // 获取个人报表数据
        getPersonalReport:function(){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_personal_report',
                data: {'token':this.userToken,'uid':this.userId,'start':this.startTime,'end':this.endTime}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
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
    },
    // html加载完成之后执行
    mounted(){
        let au = this;
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
                this.getPersonalReport();
            }
        };
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            laydate.render({
                elem: '#test6',
                range: true,
                position: 'fixed',
                theme: '#f20320',
                max: thisDay(),
                done: function(value,date,endDate){
                    if(value==null||value==''){
                        document.getElementById('test6').value = null;
                        au.startTime = null;
                        au.endTime = null;
                        au.getPersonalReport();
                    }else{
                        au.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        au.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        au.getPersonalReport();
                        au.thismeRed = null;
                    }
                }
            });
        });
    },
}
</script>
<style scoped>
/* .user_988_list_title li span{width: 92px;} */
/* .user_988_list_body li span {width: 92px;} */
.personalReportContant{min-height: 100px;}
.user_988_table_box{min-height: 120px;}
.user_988_list_body li{background-color: #f1f1f1;}
</style>

