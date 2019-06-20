<template>
    <!-- 优惠活动 -->
    <div class="Promotions">
        <app-nav></app-nav>
		<div class="Promotions_con">
			<div class="Promotions_con_box">
                <template v-if="listData!=null">
                    <div class="me_fathar" v-for="(d,i) in listData" :key="i">
                        <div class="Promotions_con_box_title" :style="{backgroundImage:'url('+d.img_url+')'}" v-on:click="getActiveDetail(d.id)"></div>
                        <template v-if="fontData!==null">
                            <div class="Promotions_con_box_text" v-if="d.id==fontData.id">
                                <p>{{ fontData.title }}</p>
                                <span v-html="fontData.content"></span>
                            </div>
                        </template>
                    </div>
                </template>
			</div>
		</div>
        <!-- 全局底部 -->
        <app-footer></app-footer>
	</div>
</template>
<script>
export default {
    name: 'promotions',
    data () {
        return {
            userId:null,
            userToken:null,
            listData:null,
            fontData:null,
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
        // 获取优惠活动
        getFavourableActivity:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_favourable_activity',
                data: {}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                }else{
                    layer.msg(res.data.msg,{time:1200});
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取优惠活动详情
        getActiveDetail:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/active_detail',
                data: {'active_id':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.fontData = res.data.data;
                }else{
                    layer.msg(res.data.msg,{time:1200});
                }
            })
            .catch(err => {
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

            }
        };
        this.getFavourableActivity();
    }
}
</script>
<style scoped>
#nav{margin: 0 auto;}
footer{margin-top: 30px;}
</style>

