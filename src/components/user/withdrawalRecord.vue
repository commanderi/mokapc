<template>
    <!-- 提款记录 -->
    <div class="withdrawalRecord">
        <div class="withdrawalRecordContant">
            <p class="user_h">提款记录</p>
            <table id="lf_user_recording_table">
                <ul class="lf_user_recording_table_ulti clear">
                    <li>交易时间</li>
                    <li>收支单号</li>
                    <li>交易状态</li>
                    <li>交易金额</li>
                </ul>
                <ul class="lf_user_recording_table_c clear">
                <template v-if="listData!=null">
                    <li v-for="(d,i) in listData.data" :key="i">
                        <span>{{ d.create_at }}</span>
                        <span>{{ d.order_no }}</span>
                        <template v-if="d.status==1">
                            <span>审核中</span>
                        </template>
                        <template v-else-if="d.status==2">
                            <span>成功</span>
                        </template>
                        <template v-else-if="d.status==3">
                            <span>失败</span>
                        </template>
                        <span>￥{{ d.money }}</span>
                    </li>
                </template>
                </ul>
            </table>
        </div>
        <div id="demo7"></div>
    </div>
</template>
<script>
export default {
    name: 'withdrawalRecord',
    data () {
        return {
            userToken:null,
            userId:null,
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
        // 获取提现记录
        getWithdrawRecord:function(page=1){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/withdraw_record',
                data: {'token':this.userToken,'uid':this.userId,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.getWithdrawRecord));
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
                this.getWithdrawRecord();
            }
        };
        layui.use('laypage', function(){
            me.laypage = layui.laypage;
        });
    },
}
</script>
<style scoped>
#demo7{background-color: #fff;padding: 0 10px;}
</style>