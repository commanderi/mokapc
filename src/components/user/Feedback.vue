<template>
    <!-- 意见反馈 -->
    <div class="Feedback">
        <div class="FeedbackCantant">
            <p class="user_h">我要反馈</p>
            <div class="FeedbackCantant_title clear">
                <div><span>标题：</span></div>
                <div><input type="text" maxlength="25" placeholder="请输入25字以内的标题" class="Feedback_input" v-model="textTitle"></div>
            </div>
            <div class="FeedbackCantant_con clear">
                <div><span>内容：</span></div>
                <div><textarea maxlength="120" id="Feedback_textarea" cols="30" rows="7" placeholder="请输入120字以内的反馈内容" v-model="text"></textarea></div>
            </div>
            <p class="Feedback_btn_box">
                <button class="submit_Feedback_btn" v-on:click="feedBack">提交</button>
                <button class="cancel_Feedback_btn" v-on:click="clearText">取消</button>
            </p>
        </div>
        <div class="FeedbackCantant_botton">
            <div class="user_h">历史反馈
                <span class="layui-input-inline FeedbackCantant_time">
                    <input type="text" class="layui-input" id="test6" placeholder="请选择查询时间段">
                </span>
                <!-- 意见反馈状态筛选 -->
                <!-- <span class="msgStatus">
                    <template v-if="thismeRed==1">
                        <b>未回复<i class="iconfont icon-xiala"></i></b>
                    </template>
                    <template v-else-if="thismeRed==2">
                        <b>已回复<i class="iconfont icon-xiala"></i></b>
                    </template>
                    <template v-else>
                        <b>全部<i class="iconfont icon-xiala"></i></b>
                    </template>
                    <ul class="msgStatus_ul">
                        <li v-on:click="clickMe(2)" :class="{lokeMe:thismeRed==2}">已回复</li>
                        <li v-on:click="clickMe(1)" :class="{lokeMe:thismeRed==1}">未回复</li>
                        <li v-on:click="clickMe(0)" :class="{lokeMe:thismeRed==0}">全部</li>
                    </ul>
                </span> -->
            </div>
            <div class="FeedbackList_box">
                <div class="FeedbackList_box_head clear">
                    <ul>
                        <li>标题</li>
                        <li>状态</li>
                        <li>信息变动时间</li>
                        <li>内容</li>
                    </ul>
                </div>
                <div class="FeedbackList">
                    <ul>
                    <template v-if="listData!=null">
                        <li class="clear" v-for="(d,i) in listData.data" :key="i">
                            <span>{{ d.title }}</span>
                            <span>{{ d.reply=='' ? '未回复' : '已回复' }}</span>
                            <span>{{ d.create_at }}</span>
                            <span>{{ d.content }}</span>
                        </li>
                    </template>
                    </ul>
                </div>
            </div>
            <div id="demo7"></div>
        </div>
    </div>
</template>
<script>
import {thisDay} from '../../assets/js/global.js'
import {isEmpty} from '../../assets/js/global.js'
export default {
    name: 'Feedback',
    data () {
        return {
            userId:null,
            userToken:null,
            startTime:null,
            endTime:null,
            listData:null,
            meTo:0,
            thismeRed:0,
            text:null,
            textTitle:null,
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
        clickMe:function(i){
            this.thismeRed = i;
        },
        clearText(){
            this.text = null;
            this.textTitle = null;
            document.getElementById('test6').value = null;
        },
        // 意见反馈
        feedBack:function(){
            if(!isEmpty(this.textTitle)){
                layer.msg('标题不能为空');
                return
            }else if(!isEmpty(this.text)){
                layer.msg('反馈内容不能为空');
                return
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'personal/feed_back',
                    data: {'token':this.userToken,'uid':this.userId,'title':this.textTitle,'content':this.text}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        this.clearText();
                        this.getFeedBackData();
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        // 获取意见反馈数据
        getFeedBackData:function(page=1){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_feed_back_list',
                data: {'token':this.userToken,'uid':this.userId,'start':this.startTime,'end':this.endTime,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.getFeedBackData));
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 分页函数
        Pagination:function(total,per,current,fn){
            let my = this;
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
                this.getFeedBackData();
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
                        me.getFeedBackData();
                    }else{
                        me.startTime = date.year+'-'+date.month+'-'+date.date+' '+'00:00:00';
                        me.endTime = endDate.year+'-'+endDate.month+'-'+endDate.date+' '+'23:59:59';
                        me.getFeedBackData();
                    }
                }
            });
        });
    },
}
</script>
<style scoped>
.msgStatus{height: 30px;}
.FeedbackList {height: 135px;max-height: 150px;}
#demo7{background-color: #fff;}
</style>


