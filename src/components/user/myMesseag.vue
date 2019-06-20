<template>
    <!-- 我的消息 -->
    <div class="myMesseag">
        <div class="myMesseagCantant">
            <p class="user_h">我的消息</p>
            <div class="myMesseag_head clear">
                <div class="messageType_box">
                    <span>{{ msgFont==null ? '全部消息' : msgFont}}</span>
                    <i class="iconfont icon-xiala"></i>
                    <ul class="messageType_box_list">
                        <li v-for="(m,i) in fontArr" :key="i" v-on:click="getMyMessage(i,m)" :class="{meRed:thismeRed==i}">{{ m }}</li>
                    </ul>
                </div>
                <div>消息内容</div>
            </div>
            <div class="myMesseag_list">
                <ul>
                    <li class="web_clear" v-for="(item,i) in listdata" :key="i">
                        <template v-show="item.type==i">
                            <div>{{ item.title }}</div>
                            <div>
                                <p class="messageTitle"><b>{{ item.title }}</b></p>
                                <div class="messagelist_con">{{ item.content }}</div>
                                <!-- <span class="MoreMsg">更多...</span> -->
                            </div>
                            <i class="message_a">{{ item.create_at }}</i>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'myMessage',
    data () {
        return {
            userId:null,
            userToken:null,
            listdata:null,
            thismeRed:0,
            msgFont:null,
            fontArr:['全部消息','普通消息','优惠消息','出入款消息']
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
        getMyMessage:function(num=0,font){
            this.thismeRed = num;
            this.msgFont = font;
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_my_message',
                data: {'token':this.userToken,'uid':this.userId,'type':num}
            })
            .then(res => {
                if(res.data.ret==200){
                    // console.log(res.data);
                    this.listdata = res.data.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
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
                this.getMyMessage();
            }
        }
    },
}
</script>

