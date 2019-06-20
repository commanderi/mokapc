<template>
    <!-- 大转盘 -->
    <div class="turntable">
        <div class="turntable_head">
            <span><router-link to="/">返回首页</router-link></span>
            <span v-on:click="muenClick(1)">更多规则</span>
            <span v-on:click="muenClick(0)">我的红包</span>
            <b>我的抽奖次数：{{ playNumber }}</b>
        </div>
        <img class="turntable_topimg" src="../assets/img/5684.png">
        <div class="turntable_con">
            <div class="BigEheel_con">
                <div class="RotaryTable">
                    <template v-if="list!==null">
                        <span v-for="(d,i) in list" :key="i">{{ d.name }}</span>
                    </template>
                </div>
                <i class="Pointer" v-on:click="Pointer"></i>
            </div>
        </div>
        <div class="Mask scale_0">
            <div class="turntable_mask">
                <p class="turntable_mask_title">我的红包<button class="popup-closeBtn center" v-on:click="close(0)"></button></p>
                <div class="turntable_mask_title_p">
                    <template v-if="redList!==null">
                        <span>红包总额&nbsp;： {{ redList.data.total_money }}元</span>
                        <span>红包个数&nbsp;： {{ redList.data.total_number }}</span>
                    </template>
                </div>
                <div class="turntable_mask_con">
                    <table width="100%">
                        <thead class="turntable_mask_thead">
                            <th width="33%">时间</th>
                            <th>红包类型</th>
                            <th>金额</th>
                        </thead>
                        <tbody class="turntable_mask_tbody">
                            <template v-if="redList!==null">
                                <tr v-for="(d,i) in redList.data.data.data" :key="i">
                                    <td width="33%">{{ d.create_at }}</td>
                                    <td>{{ d.type }}</td>
                                    <td>￥{{ d.money }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="Mask scale_0">
            <div class="turntable_mask turntable_mask-g">
                <p class="turntable_mask_title">活动规则<button class="popup-closeBtn center" v-on:click="close(1)"></button></p>
                <div class="turntable_mask_con turntable_mask_con-g">
                    <img src="../assets/img/51513.jpg">
                </div>
            </div>
        </div>
        <!-- 全局底部 -->
        <app-footer></app-footer>
    </div>
</template>
<script>
import '../assets/js/jquery.rotate.js'
export default {
    name: 'turntable',
    data () {
        return {
            userId:null,
            userToken:null,
            list:null,
            redList:null,
            playNumber:null,//抽奖的次数
            isture:null,//是否正在抽奖
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
        muenClick:function(n){
            if(n==0){
                this.getMyRed();
            }
            $('.Mask').eq(n).addClass('scale_1');
        },
        close:function(n){
            $('.Mask').eq(n).removeClass('scale_1');
        },
        Pointer:function(){
            if(this.list==null){
                layer.msg('未获取到奖品数据,请刷新重试');
                return
            }else if(this.playNumber==0 || this.playNumber==null){
                layer.msg('你未满足抽奖条件或抽奖次数已用完');
                return
            }else{
                if(this.isture===true){
                    this.doRobRed();
                    this.getRobTimes();
                }else{
                    layer.msg('正在抽奖,请稍等');
                }
            }
        },
        clickfun:function(num,name) {
            switch (num) {
                case 1:
                    this.rotateFun(333, name);
                break;
                case 2:
                    this.rotateFun(280, name);
                break;
                case 3:
                    this.rotateFun(230, name);
                break;
                case 4:
                    this.rotateFun(180, name);
                break;
                case 5:
                    this.rotateFun(127, name);
                break;
                case 6:
                    this.rotateFun(78, name);
                break;
                case 7:
                    this.rotateFun(25, name);
                break;
            }
        },
        rotateFun:function(angle, text) {
            this.isture = false;
            let me = this;
            $('.RotaryTable').rotate({
                duration: 5000,
                animateTo: angle + 3600,
                callback: function () {
                    layer.msg('恭喜您,获得了'+text+',奖品已发放至您的账户');
                    me.isture = true;
                    setTimeout(() => {
                        $(this).rotate({angle:0});                        
                    }, 1000);
                }
            });
        },
        // 获取奖品
        doRobRed:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/do_rob_red',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.clickfun(res.data.data.id,res.data.data.name);
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取抽奖的次数
        getRobTimes:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/get_rob_times',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.isture = true;
                    this.playNumber = res.data.data.rob_number;
                }else{
                    this.isture = false;
                    this.playNumber = 0;
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取转盘列表
        getRedList:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/get_red_list',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.list = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取转盘记录
        getMyRed:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/get_my_red',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.redList = res.data;
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
        this.getRedList();
        this.getRobTimes();
        layui.use('layer', function(){
            var layer = layui.layer;
        });
    }
}
</script>
<style scoped>
footer{margin-top: 30px;}
</style>

