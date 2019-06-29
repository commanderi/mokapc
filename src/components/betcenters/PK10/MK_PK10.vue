<template>
    <div class="betcenterContent">
        <!-- 页面顶部 -->
        <div class="betcenterContent_header">
            <div class="betcenterContent_headerr_infos">
                <img class="betcenterContent_headerr_infos_icon" v-if="specificTypeID!=null" :src="specificTypeID[1]">
                <div class="betcenterContent_header_infosContent">
                    <p class="betcenterContent_header_infosContent_p" v-if="specificTypeID!=null">{{ specificTypeID[2] }}</p>
                    <div class="betcenterContent_headerLinks">
                        <router-link class="betcenterContent_headerLinks_a" to="/lotteryInformation"><i class="iconfont icon-lishi"></i>历史开奖</router-link>
                    </div>
                </div>
            </div>
            <div class="betcenterContent_header_time">
                <p class="betcenterContent_header_time_p" v-if="data.thisOpenTottery!=null">距<strong>{{ data.thisOpenTottery.next_stage }}</strong>期封盘，还有</p>
                <span>
                    <div class="countDownContainer">
                        <div class="countDownContainer_con countDownContainer_con_1">{{ time.hour }}</div>
                        <i class="iconfont icon-weibiaoti9 lf_weibiaoti9 center"></i>
                        <div class="countDownContainer_con countDownContainer_con_2">{{ time.minute }}</div>
                        <i class="iconfont icon-weibiaoti9 lf_weibiaoti9 center"></i>
                        <div class="countDownContainer_con countDownContainer_con_3">{{ time.second }}</div>
                    </div>
                </span>
            </div>
            <div class="PublicityNumberBox">
                <template v-if="data.lastOneNumber!=undefined || data.lastOneNumber!=null">
                    <p class="betcenterContent_header_time_p" v-if="data.lastOneNumber[0]!=null">第<strong>{{ data.lastOneNumber[0].stage }}</strong>期开奖号码</p>
                    <p class="betcenterContent_header_time_p" v-else>正在等待第<strong>{{ Number(data.thisOpenTottery.next_stage)-1 }}</strong>期开奖......</p>
                </template>
                <div>
                    <template v-if="data.lastOneNumber!=undefined || data.lastOneNumber!=null">
                        <template v-if="data.lastOneNumber[0]!=undefined">
                            <span class="lottery__highlight_y" v-for="(item,index) in data.lastOneNumber[0].number" :key="index">{{ data.lastOneNumber[0].number[index] }}</span>
                            <b class="gameHistory_number_k3_font_top">{{ data.lastOneNumber[0].detail[0] }} | {{ data.lastOneNumber[0].detail[1] }}</b>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <!-- 页面一级菜单 -->
        <div class="betcenterContent_Nav">
            <div class="betcenterContent_Nav_bar"></div>
            <div class="betcenterContent_Nav_list">
                <ul>
                    <template v-for="(item,index) in specificTypeData">
                        <li :key="index" :class="{ 'my_click':index==NavOne_index }" v-on:click="selectOneNav(index,item)">{{ item.name }}</li>
                    </template>
                </ul>
            </div>
        </div>
        <!-- 页面二级菜单 -->
        <div class="betcenterContent_Nav_Subnavs" v-if="specificTypeData!=undefined">
            <div class="betcenterContent_Nav_Subnavs_two" v-for="(item,index) in specificTypeData[NavOne_index].play_rule" :key="index">
                <b>{{ item.title }}:</b>
                <template v-for="(d,j) in item.odds">
                    <button :key="j" :class="{'im_lucky':d.id==NavTwo_index}" v-on:click="selectTwoNav(d.id,d)">{{ d.rule }}</button>
                </template>
            </div>
        </div>
        <div class="betcenterContent_Nav_Subnavs_body">
            
        </div>
    </div>
</template>
<script>
import '@/assets/js/pk10.js'
import { singleSelect,multipleSelect } from '@/assets/js/pk10.js'
export default {
    name:'PK10',
    data(){
        return {
            NavOne_index:0,
            NavTwo_index:1,
            NavOneData:this.$store.state.specificTypeData[0],//默认一级菜单数据
            NavTwoData:this.$store.state.specificTypeData[0].play_rule[0].odds[0],//默认二级菜单数据
            moneyType:['元','角','分','厘'],
            setMoneyNumber_index:0,
            titleArr:['万位','千位','百位','十位','个位'],
            footerArr:['全','大','小','单','双','清'],
            userArr:[[],[],[],[],[]],
            userArrChinese:[[],[]],
            rxArr:[], //任选
            userArrLen:0,
            // 获取的数据
            data:{
                lastOpenNumber:null, //近十期开奖号码数据
                thisOpenTottery:null, //当前期数数据
                lastOneNumber:null, //上一期开奖号码数据
            },
            time:{
                hour:0,
                minute:0,
                second:0,
                totalSecond:0, //总秒数
            },
            // 投注信息
            bettingInfo:{
                number:'',
                allMoney:0, //总金额
                singleMoney:2, //单注金额
                bettingNumber:0, //注数
                setMultipleNumber:1, //投注倍数
                rate:this.$store.state.specificTypeData[0].play_rule[0].odds[0].rate, //默认赔率
            },
            myJson:[], //确认投注的数据
            myObj:[], //立即投注的数据
            oneMoney:2,//可操作单注金额
            timeFn:null,
            lastTimeFn:null,
            forTime:3000,
            textareaData:'', //单式文本域
            DesignationArr:[
                {'num':null},
                {'num':null},
                {'num':null},
                {'num':null},
                {'num':null},
            ],
        }
    },
    components:{
        // 注册子组件
    },
    watch:{
        specificTypeID(){
            clearInterval(this.lastTimeFn);
            clearInterval(this.timeFn);
            this.getNextTotteryTime();
        },
    },
    computed:{
        // 选择的左侧大彩种
        specificTypeID(){
            return this.$store.state.specificTypeID;
        },
        // 选择的左侧大彩种数据
        specificTypeData(){
            return this.$store.state.specificTypeData;
        },
    },
    methods:{
        myresize:function(){
            let jw = document.body.offsetWidth;
            let jm = document.getElementsByClassName('betcenterMenu')[0].offsetWidth;
            let jc = document.getElementsByClassName('betcenterContent')[0];
            jc.style.left = ((jw-jc.offsetWidth)/2)+(jm/2)+'px';
        },
        // 点击一级菜单选择的数据
        selectOneNav:function(i,data){
            this.NavOne_index = i;
            this.NavTwo_index = data.play_rule[0].odds[0].id;
            this.bettingInfo.rate = data.play_rule[0].odds[0].rate;
            this.NavOneData = data;
            this.NavTwoData = data.play_rule[0].odds[0];
            // this.clearUserArr();
            console.log('NavOneData',data);
        },
        // 点击二级菜单选择的数据
        selectTwoNav:function(i,data){
            this.NavTwo_index = i;
            this.bettingInfo.rate = data.rate;
            this.NavTwoData = data;
            // this.clearUserArr();
            console.log('NavTwoData',data);
        },

        // 获取最近10期的开奖结果
        getRecentTotteryData:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_last_open_number',
                data: {'cate':this.$store.state.specificTypeID[0]}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.data.lastOpenNumber = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log('获取最近10期开奖结果出错:'+err);
            })
        },
        // 获取当前期数倒计时时间，并调用倒计时开始计时
        getNextTotteryTime:function(){
            this.data.thisOpenTottery = '';
            this.data.lastOneNumber = '';
            clearInterval(this.timeFn);
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_next_time_stage',
                data: {'cate':this.$store.state.specificTypeID[0]}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.data.thisOpenTottery = res.data.data;
                    this.calculatingTime();
                    this.getRecentTotteryData();
                    this.getLastOneNumber();
                    layer.closeAll('loading');
                }else{
                    layer.msg(res.data.msg);
                }
                layer.closeAll('loading');
            })
            .catch(err => {
                console.log('获取当前期数倒计时出错:'+err);
                layer.closeAll('loading');
            })
        },
        // 获取上一期开奖号码
        getLastOneNumber:function(){
            let qi = Number(this.data.thisOpenTottery.next_stage)-1;
            this.lastTimeFn = setInterval(() => {
                if(this.data.lastOneNumber.length>0){
                    clearInterval(this.lastTimeFn);
                }else{
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'lottery/get_last_one_number',
                        data: {'cate':this.$store.state.specificTypeID[0],'stage':qi}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            this.data.lastOneNumber = res.data.data;
                        }else{
                            // console.log('未获取到上一期开奖号码');
                            switch (Number(this.$store.state.specificTypeID[0])) {
                                case 5: //重庆时时彩
                                    this.forTime = 20000;
                                break;
                            }
                            clearInterval(this.lastTimeFn);
                            this.getLastOneNumber();
                        }
                    })
                    .catch(err => {
                        console.log('获取上一期开奖号码出错:'+err);
                    })
                }
            }, this.forTime);
        },
        // 倒计时
        calculatingTime:function(){
            this.time.totalSecond = this.data.thisOpenTottery.open_time;
            this.timeFn = setInterval(() => {
                if(this.time.totalSecond>=0){
                    let hour = Math.floor((this.time.totalSecond/3600)%24);
                    let minute = Math.floor((this.time.totalSecond/60)%60);
                    let second = Math.floor(this.time.totalSecond%60);
                    if(hour<10){hour = '0'+hour;}
                    if(minute<10){minute = '0'+minute;}
                    if(second<10){second = '0'+second;}
                    this.time.hour = hour;
                    this.time.minute = minute;
                    this.time.second = second;
                    this.time.totalSecond--;
                }else{
                    clearInterval(this.lastTimeFn);
                    clearInterval(this.timeFn);
                    this.getNextTotteryTime();
                }
                // console.log(this.hour,this.minute,this.second);
            }, 1000);
        },
    },
    mounted(){
        this.myresize();
        this.getNextTotteryTime();
    },
}
</script>
<style scoped>
.betcenterContent_Nav_Subnavs_two{width: auto;margin: 12px 15px 12px 8px;}
.betcenterContent_Nav_Subnavs_two>button{background-color: #fff;color: #2f2f2f;cursor: pointer;border-radius: 4px;border: 1px solid #dddddd;padding: 4px 12px;margin-right:5px;}
.dantext{width: 98%;height: auto;min-height: 230px;max-height: 500px;resize:none;padding: 10px 1%;font-size: 20px;}
.rxteshu{min-height: 178px;}
.danshirx{min-height: 203px;}
</style>

