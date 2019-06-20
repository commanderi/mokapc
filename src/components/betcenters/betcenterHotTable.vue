<template>
    <section class="betcenter_lf">
        <div class="Popular"><span class="Popular_font">热门彩种</span></div>
        <div class="index_table">
            <ul class="index_table_ul">
                <template v-for='(item,index) in catesData'>
                <li :key='index' v-if="item.is_hot==1">
                    <span class="index_table_ul_li_left">
                        <img :src="item.cate_img">
                    </span>
                    <div class="index_table_ul_li_right">
                        <p class="index_table_ul_li_right_title">{{ item.name }}</p>
                        <div class="index_table_ul_li_right_con">
                            <p class="lf_number"></p>
                            <p>&nbsp;</p>
                            <p class="time_bottom">&nbsp;{{ item.detail }}</p>
                        </div>
                        <div class="index_table_ul_li_right_bottom" v-if="item.is_open==1">
                            <a @click="getSpecifiOddsc(item.id,item.cate_img,item.name)">马上下注</a>
                            <router-link to="/lotteryInformation">更多开奖</router-link>
                        </div>
                        <div class="index_table_ul_li_right_bottom" v-else>
                            <a @click="getSpecifiOddsc(item.id,item.cate_img,item.name)">马上下注</a>
                            <router-link to="/lotteryInformation">更多开奖</router-link>
                        </div>
                    </div>
                </li>
                </template>
            </ul>
        </div>
        <div class="Popular"><span class="Popular_font">全部彩种</span></div>
        <div class="index_table">
            <ul class="index_table_ul">
                <li v-for='(item,index) in catesData' :key='index' class="me_betcenter">
                    <span class="index_table_ul_li_left">
                        <img :src="item.cate_img">
                    </span>
                    <div class="index_table_ul_li_right">
                        <p class="index_table_ul_li_right_title">{{ item.name }}</p>
                        <div class="index_table_ul_li_right_con">
                            <!-- <p class="lf_number"></p> -->
                            <!-- <p>&nbsp;</p> -->
                            <p class="time_bottom">&nbsp;{{ item.detail }}</p>
                        </div>
                        <div class="index_table_ul_li_right_bottom" v-if="item.is_open==1">
                            <a @click="getSpecifiOddsc(item.id,item.cate_img,item.name)">马上下注</a>
                            <router-link to="/lotteryInformation">更多开奖</router-link>
                        </div>
                        <div class="index_table_ul_li_right_bottom" v-else>
                            <a @click="getSpecifiOddsc(item.id,item.cate_img,item.name)">马上下注</a>
                            <router-link to="/lotteryInformation">更多开奖</router-link>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
    name:'betcenterHotTable',
    data(){
        return {
            catesData:null,
            userToken:null,
            userId:null,
        }
    },
    components:{
        // 注册子组件
    },
    watch:{

    },
    // 事件方法执行
    methods:{
        priceChange:function(e){
            console.log(this.priceChange);
        },
        // 获取指定彩种的赔率
        getSpecifiOddsc:function(id,url,name){
            var indexNum = null;
            for(var i=0;i<localStorage.length;i++){
                if(localStorage.key(i)==id){
                    indexNum = localStorage.key(i);
                }
            }
            this.$emit('transferTofather', true, id)
            if(indexNum!=null){
                this.$store.state.specificTypeID = [id,url,name];
                this.$store.state.specificTypeData = JSON.parse(localStorage.getItem(indexNum));
                this.$emit("controlHot",false);
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'lottery/get_lottery_odds',
                    data: {'token':this.userToken,'uid':this.userId,'cate':id}
                })
                .then(res => {
                    if(res.data.ret==200){
                        this.$store.state.specificTypeID = [id,url,name];
                        this.$store.state.specificTypeData = res.data.data;
                        localStorage.setItem('getLotteryOddsTime',new Date().getTime())
                        localStorage.setItem(id,JSON.stringify(res.data.data))
                        this.$emit("controlHot",false);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log('获取彩种赔率出错:'+err);
                })
            }
        },
        // 获取全部彩种
        getCates:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_cates',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    // 将全部彩种数据缓存到store中，以便其他页面使用，并减少http请求
                    this.$store.state.getCates = res.data.data;
                    localStorage.setItem('getCatesTime',new Date().getTime())
                    localStorage.setItem('getCates',JSON.stringify(res.data.data)); // 同时在localStorage中存一份，以防刷新页面导致store中数据丢失
                    this.catesData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
    },
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

            }
        };
        if(this.$store.state.getCates==null){
            if(JSON.parse(localStorage.getItem('getCates'))){
                this.catesData = JSON.parse(localStorage.getItem('getCates'));
            }else{
                this.getCates()
            }
        }else{
            this.catesData = this.$store.state.getCates;
        }
    }
}
</script>
<style scoped>
.betcenter_lf{width: 75%;margin-left: 18%;}
.Popular{width: 100%;margin: 0 auto;}
.me_betcenter{width: 24%;}
.index_table_ul_li_right_bottom>a:nth-of-type(2){margin-left: 6px;}
</style>

