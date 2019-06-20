<template>
    <!-- 转账记录 -->
    <div class="transferRecord">
        <div class="transferRecordContant">
            <p class="user_h">转账记录</p>
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
                        <li v-on:click="selectGema(21)" :class="fuckMe==21 ? 'fuckMe' : ''">真人AG</li>
                        <li v-on:click="selectGema(27)" :class="fuckMe==27 ? 'fuckMe' : ''">沙巴体育</li>
                        <li v-on:click="selectGema(35)" :class="fuckMe==35 ? 'fuckMe' : ''">开元围棋</li>
                        <li v-on:click="selectGema(36)" :class="fuckMe==36 ? 'fuckMe' : ''">JDB电子</li>
                        <li v-on:click="selectGema(37)" :class="fuckMe==37 ? 'fuckMe' : ''">传奇电子</li>
                    </ul>
                </div>
                <table id="user_988_table_ordinary">
                    <ul class="user_988_table_ordinary_ti">
                        <li>订单编号</li>
                        <li>创建时间</li>
                        <li>转账类型</li>
                        <li>转账金额</li>
                        <li>游戏平台</li>
                        <li>转账状态</li>
                    </ul>
                    <ul class="user_988_table_ordinary_c">
                        <template v-if="listData!=null">
                        <li v-for="(d,i) in listData.data.data" :key="i">
                            <span>{{ d.order_no }}</span>
                            <span>{{ d.create_at }}</span>
                            <span>{{ d.game_type }}</span>
                            <span>￥{{ d.money }}</span>
                            <span>{{ d.game_name}}</span>
                            <span>{{ d.game_status }}</span>
                        </li>
                        </template>
                    </ul>
                </table>
            </div>
        </div>
        <div id="demo7"></div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'transferRecord',
    data () {
        return {
            userId:null,
            userToken:null,
            startTime:null,
            endTime:null,
            thismeRed:86400,
            fuckMe:21,
            listData:null,
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
            this.transferDetail();
            document.getElementById('test6').value = null;
        },
        selectGema:function(n){
            this.fuckMe = n;
            this.transferDetail();
        },
        transferDetail:function(page=1){
            layer.open({type:3});
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/transfer_detail',
                data: {'token':this.userToken,'uid':this.userId,'cate':this.fuckMe,'start_time':this.startTime,'end_time':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.transferDetail));
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
                this.transferDetail();
            }
        };
        layui.use(['laydate','laypage'], function(){
            var laydate = layui.laydate;
            me.laypage = layui.laypage;
            laydate.render({
                elem: '#test6',
                range: true,
                position: 'fixed',
                theme: '#f20320',
                max: thisDay(),
                done: function(value,date,endDate){
                    if(value==null||value==''){
                        document.getElementById('test6').value = null;
                        me.startTime = null;
                        me.endTime = null;
                        me.transferDetail();
                    }else{
                        me.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        me.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        me.transferDetail();
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