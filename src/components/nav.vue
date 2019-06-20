<template>
    <!-- 主导航 -->
    <nav id="nav">
        <div class="SportsCompetition">
            <router-link class="nav_a" to="/">首页</router-link>
            <ul class="nav_list_ul">
                <li v-on:click="getKefu"><a>在线客服</a></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <router-link class="nav_a" to="/betcenter">购买彩票</router-link>
            <ul class="nav_list_ul">
                <li><router-link to="/betcenter">购彩投注</router-link></li>
                <li><router-link to="/gameRules">玩法说明</router-link></li>
                <li><router-link to="/MobileBetting">手机投注</router-link></li>
                <li><router-link to="/lotteryInformation">开奖信息</router-link></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <a class="nav_a">棋牌游戏</a>
            <ul class="nav_list_ul">
                <li v-on:click="Jump('ky')"><a>开元棋牌</a></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <a class="nav_a">电子竞技</a>
            <ul class="nav_list_ul">
                <li v-on:click="Jump('jdb')"><a>JDB电子</a></li>
                <li v-on:click="Jump('cq')"><a>传奇电子</a></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <a class="nav_a">真人视讯</a>
            <ul class="nav_list_ul">
                <li v-on:click="Jump('ag')"><a>真人AG</a></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <a class="nav_a">体育竞技</a>
            <ul class="nav_list_ul">
                <li v-on:click="Jump('sb')"><a>沙巴体育</a></li>
            </ul>
        </div>
        <div class="SportsCompetition">
            <router-link class="nav_a" to="/promotions">优惠活动</router-link>
            <ul class="nav_list_ul">
                <li><router-link to="/turntable">大转盘</router-link></li>
                <li><router-link to="/promotions">优惠活动</router-link></li>
            </ul>
        </div>
    </nav>
</template>
<script>
export default {
    name: '',
    data () {
        return {
            userId:null,
            userToken:null,
            listData:null,
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
        getThirdUrl:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_third_url',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.listData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        Jump:function(name){
            let act = localStorage.getItem('loginStatus');
            if(act=='false'){
                layer.msg('请先登录');
            }else if(this.listData==null){
                layer.msg('未请求到链接地址,请刷新重试');
            }else{
                switch (name) {
                    case 'sb':
                        window.location.href = this.listData.url_ibc;
                    break;
                    case 'ag':
                        window.location.href = this.listData.url_ag;
                    break;
                    case 'ky':
                        window.location.href = this.listData.url_ky;
                    break;
                    case 'jdb':
                        window.location.href = this.listData.url_jdb;
                    break;
                    case 'cq':
                        window.location.href = this.listData.url_cq;
                    break;
                }
            }
        },
        getKefu:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'login/get_kefu',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    window.open(res.data.data.kefu);
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
            
        }
    },
    // html加载完成之后执行
    mounted(){
        let dom = $('.SportsCompetition');
        $(dom).css('width',100/dom.length+'%');
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
                this.getThirdUrl();
            }
        };
        
    }
}
</script>
<style scoped>
.thisMe{color: #f20320;}
</style>

