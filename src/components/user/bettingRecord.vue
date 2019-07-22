<template>
    <!-- 投注记录 -->
    <div class="bettingRecord">
        <div class="bettingRecordContant">
            <p class="user_h">投注记录</p>
            <div class="personalReport_selectTimeBox">
                <label>快捷选时：</label>
                <button class="preciseTime_btn" title="今天0:0:0-23:59:59" v-on:click="selectTime(86400)" :class="{preciseTime_btn_hover:thismeRed==86400}">今天</button>
                <button class="preciseTime_btn" title="昨天0:0:0-昨天23:59:59" v-on:click="selectTime(86400*2)" :class="{preciseTime_btn_hover:thismeRed==86400*2}">昨天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推7天" v-on:click="selectTime(86400*7)" :class="{preciseTime_btn_hover:thismeRed==86400*7}">7天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推15天" v-on:click="selectTime(86400*15)" :class="{preciseTime_btn_hover:thismeRed==86400*15}">15天</button>
                <button class="preciseTime_btn" title="从今天23:59:59开始,向后推30天" v-on:click="selectTime(86400*30)" :class="{preciseTime_btn_hover:thismeRed==86400*30}">30天</button>
                <button class="preciseTime_btn" title="查询上个月30天" v-on:click="selectTime(-1)" :class="{preciseTime_btn_hover:thismeRed==-1}">上月</button>
                <span class="layui-input-inline personalReport_selectTimes">
                    <input type="text" class="layui-input" id="test8" placeholder="按时间段查询">
                </span>
            </div>
            <div class="LotteryStatus_box">
                <label>开奖状态：</label>
                <select id="LotteryStatus_select" v-on:change="getSelVal">
                    <option v-for="(d,i) in selectArr" :key="i" :value="i">{{ d }}</option>
                </select>
                <label class="chaxiaji">查询下级：</label>
                <span class="bao">
                    <input class="xiaxiajiinput" type="text" v-model="mobile" v-on:input="onmobile" placeholder="此处为空时,查询自己的记录">
                    <i class="iconfont icon-guanbi qing" v-show="mobile" v-on:click="clearmobile"></i>
                </span>
                <button v-on:click="chaxun" :class="['cxBtn ',mobile==''?'cxBtn_no':'cxBtn_yes']" :disabled='disabled'>查询</button>
            </div>
            <div class="user_988_table">
                <div class="user_988_table_top_nav clear">
                    <ul>
                        <li v-on:click="getBettingRecord()" :class="fuckMe==0 ? 'fuckMe' : ''">彩票</li>
                        <li v-on:click="get_ag_betting_detail()" :class="fuckMe==1 ? 'fuckMe' : ''">真人AG</li>
                        <li v-on:click="get_ibc_betting_detail()" :class="fuckMe==2 ? 'fuckMe' : ''">沙巴体育</li>
                        <li v-on:click="get_ky_betting_detail()" :class="fuckMe==3 ? 'fuckMe' : ''">开元围棋</li>
                        <li v-on:click="get_jdb_betting_detail()" :class="fuckMe==4 ? 'fuckMe' : ''">JDB电子</li>
                        <li v-on:click="get_cq_betting_detail()" :class="fuckMe==5 ? 'fuckMe' : ''">传奇电子</li>
                    </ul>
                </div>
                <table id="user_988_table_ordinary" v-show="fuckMe==0">
                    <thead class="bettingRecord_thead">
                        <ul class="clear" style="width:100%">
                            <li>期号</li>
                            <li>投注时间</li>
                            <li>彩种</li>
                            <li>注数</li>
                            <li>订单状态</li>
                            <li>投注总额</li>
                            <li>开奖状态</li>
                            <li>中奖金额</li>
                        </ul>
                    </thead>
                    <tbody class="bettingRecord_tbody">
                        <ul>
                            <template v-if="listData!=null">
                                <li v-for="(d,i) in listData.data" :key="i" class="clear">
                                    <span>{{ d.stage }}</span>
                                    <span class="text_no">{{ d.create_at }}</span>
                                    <span class="then" v-on:click="getMsg(d.id)">{{ d.name }}</span>
                                    <span>{{ d.note }}</span>
                                    <span>{{ d.is_c==0 ? '正常' : '已取消' }}</span>
                                    <span>{{ d.money }}</span>
                                    <template v-if="d.state==1">
                                        <template v-if="d.code==1">
                                            <span class="mezhongjiang">中奖</span>
                                            <span class="mezhongjiang">{{ d.z_money }}</span>
                                        </template>
                                        <template v-else-if="d.code==0">
                                            <span class="nozhongjiang">未中奖</span>
                                            <span class="nozhongjiang">0</span>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <span>未开奖</span>
                                        <span>-</span>
                                    </template>
                                </li>
                            </template>
                        </ul>
                    </tbody>
                </table>
                <table id="user_988_table_ordinary" v-show="fuckMe!=0">
                    <thead class="bettingRecord_thead">
                        <ul class="clear" style="width:100%">
                            <li style="width:16.66%">用户名</li>
                            <li style="width:16.66%">游戏名称</li>
                            <li style="width:16.66%">投注金额</li>
                            <li style="width:16.66%">有效投注金额</li>
                            <li style="width:16.66%">派彩金额</li>
                            <li style="width:16.66%">盈亏</li>
                        </ul>
                    </thead>
                    <tbody class="bettingRecord_tbody">
                        <ul>
                            <template v-if="listDataA!=null">
                                <li v-for="(d,i) in listDataA.data" :key="i" class="clear">
                                    <span style="width:16.66%">{{ d.username }}</span>
                                    <span style="width:16.66%">{{ d.gameCode }}</span>
                                    <span style="width:16.66%">￥{{ d.betAmount }}</span>
                                    <span style="width:16.66%">￥{{ d.validBetAmount }}</span>
                                    <span style="width:16.66%">￥{{ d.winAmount}}</span>
                                    <span style="width:16.66%">￥{{ d.netPnl }}</span>
                                </li>
                            </template>
                        </ul>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="Mask scale_0 bettingRecordDetailed">
            <div class="bettingRecordDetailed_con">
                <div class="bettingRecordDetailed_con_c">
                    <p class="userContantTitle"><button v-on:click="guan" class="user_close" style="line-height: 30px">关闭&nbsp;<i class="iconfont icon-guanbi"></i></button></p>
                    <div class="bettingRecordDetailed_con_c_top">
                        <template v-if="xData!=null">
                            <span><img :src="xData.cate_img"></span>
                            <span>{{ xData.cate_name }}</span>
                            <span>第{{ xData.stage }}期</span>
                            <template v-if="xData.open_number==null||xData.open_number==''">
                                <span>未开奖</span>
                                <button class="cancelOrder" v-on:click="cancelOrder(xData.id)">{{ xData.is_c==1 ? '已取消' : '取消订单' }}</button>
                            </template>
                            <template v-else>
                                <span>开奖号:{{ xData.open_number }}</span>
                            </template>
                        </template>
                    </div>
                    <div class="bettingRecordDetailed_con_c_bottom">
                        <template v-if="xData!=null">
                        <p class="myp">
                            <span class="bettingRecordDetailed_con_c_bottom_ti">投注金额<input class="ko_input" readOnly="false" type="text" v-model="xData.money"></span>
                            <span class="bettingRecordDetailed_con_c_bottom_ti">状&ensp;&ensp;&ensp;&ensp;态<input class="ko_input" readOnly="false" type="text" :value="xData.is_c==1 ? '已取消' : '未取消'"></span>
                        </p>
                        <p class="myp">
                            <span class="bettingRecordDetailed_con_c_bottom_ti">下注时间<input class="ko_input" readOnly="false" type="text" v-model="xData.create_at"></span>
                            <span class="bettingRecordDetailed_con_c_bottom_ti">本注单号<input class="ko_input" readOnly="false" type="text" v-model="xData.order_no"></span>
                        </p>
                        <p class="myp">
                            <span class="bettingRecordDetailed_con_c_bottom_ti">倍&ensp;&ensp;&ensp;&ensp;数<input class="ko_input" readOnly="false" type="text" value="1"></span>
                            <span class="bettingRecordDetailed_con_c_bottom_ti">返&ensp;&ensp;&ensp;&ensp;水<input class="ko_input" readOnly="false" type="text" value="0"></span>
                        </p>
                        </template>
                    </div>
                    <div class="bettingRecordDetailed_con_c_list">
                        <ul class="bettingRecordDetailed_con_c_list_title clear">
                            <li>游戏玩法</li>
                            <li>下注号码</li>
                            <li>单注金额</li>
                            <li>注数</li>
                            <li>投注额</li>
                            <li>中奖金额</li>
                        </ul>
                        <ul class="bettingRecordDetailed_con_c_list_con">
                            <template v-if="xData!=null">
                                <li class="clear">
                                    <span>{{ xData.play_name }}</span>
                                    <span class="text_no">{{ xData.number }}</span>
                                    <span>{{ xData.one_money }}元</span>
                                    <span>{{ xData.note }}</span>
                                    <span>{{ xData.money }}</span>
                                    <template v-if="xData.state==1">
                                        <!-- <span>{{ xData.code==1 ? '已中奖' : '未中奖' }}</span> -->
                                        <span>{{ xData.z_money }}</span>
                                    </template>
                                    <template v-else>
                                        <span>未开奖</span>
                                    </template>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="demo7"></div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {isEmpty} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'bettingRecord',
    data () {
        return {
            userId:null,
            userToken:null,
            startTime:null,
            endTime:null,
            serechType:0,
            thismeRed:86400,
            listData:null,
            fuckMe:0,
            listDataA:null,
            selectArr:['全部','已中奖','未中奖','已取消','待开奖'],
            xData:null,
            laypage:null,
            mobile:'', //要查询的下级用户名
            disabled:true,
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
        guan:function(){
            $('.bettingRecordDetailed').removeClass('scale_1');
        },
        getSelVal:function(obj){
            this.serechType = obj.target.value;
            this.getBettingRecord();
        },
        clearmobile:function(){
            this.mobile = '';
            this.disabled = true;
        },
        onmobile:function(){
            if(this.mobile==null||this.mobile==''){
                this.disabled = true;
            }else{
                this.disabled = false;
            }
        },
        // 取消订单
        cancelOrder:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/cancel_order',
                data: {'token':this.userToken,'uid':this.userId,'id':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    layer.msg(res.data.msg);
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
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
            this.getBettingRecord();
            document.getElementById('test8').value = null;
        },
        // 获取详细信息
        getMsg:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/betting_record_detail',
                data: {'token':this.userToken,'uid':this.userId,'id':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.xData = res.data.data;
                    $('.bettingRecordDetailed').addClass('scale_1');
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        chaxun:function(){
            if(this.mobile==null||this.mobile==''){
                layer.msg('请输入下级用户名');
            }else{
                this.getBettingRecord();
            }
        },
        // 获取投注记录
        getBettingRecord:function(page=1){
            layer.open({type:3});
            this.fuckMe = 0;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/betting_record',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'type':this.serechType,'page':page,'mobile':this.mobile}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.getBettingRecord));
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
        // 获取AG游戏记录
        get_ag_betting_detail:function(page=1){
            layer.open({type:3});
            this.fuckMe = 1;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_ag_betting_detail',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listDataA = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.get_ag_betting_detail));
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
        // 获取沙巴体育游戏记录
        get_ibc_betting_detail:function(page=1){
            layer.open({type:3});
            this.fuckMe = 2;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_ibc_betting_detail',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listDataA = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.get_ibc_betting_detail));
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
        // 获取开元棋牌游戏记录
        get_ky_betting_detail:function(page=1){
            layer.open({type:3});
            this.fuckMe = 3;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_ky_betting_detail',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listDataA = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.get_ky_betting_detail));
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
        // 获取JDB电子游戏记录
        get_jdb_betting_detail:function(page=1){
            layer.open({type:3});
            this.fuckMe = 4;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_jdb_betting_detail',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listDataA = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.get_jdb_betting_detail));
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
        // 获取传奇电子游戏记录
        get_cq_betting_detail:function(page=1){
            layer.open({type:3});
            this.fuckMe = 5;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_cq_betting_detail',
                data: {'token':this.userToken,'uid':this.userId,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listDataA = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.get_cq_betting_detail));
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
                this.getBettingRecord();
            }
        };
        layui.use(['laydate','laypage'], function(){
            let laydate = layui.laydate;
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
                        me.getBettingRecord();
                    }else{
                        me.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        me.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        me.getBettingRecord();
                        me.thismeRed = null;
                    }
                }
            })
        });
    },
}
</script>
<style scoped> 
#demo7{background-color: #fff;padding: 0 15px;}
#LotteryStatus_select>option{text-align: center;margin: 5px 0;}
.bettingRecord_tbody{width: 100%;max-height: 400px;overflow-y: auto;display: block;}
.then{cursor: pointer;}
#test8{height: 31px;}
</style>

