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
                <template v-if="data.lastOneNumber!=null">
                    <p class="betcenterContent_header_time_p" v-if="data.thisOpenTottery.next_stage==undefined">第<strong>{{ Number(data.thisOpenTottery.next_stage)-1 }}</strong>期开奖号码</p>
                    <p class="betcenterContent_header_time_p" v-else>正在等待第<strong>{{ Number(data.thisOpenTottery.next_stage)-1 }}</strong>期开奖......</p>
                </template>
                <div>
                    <template>
                        <span class="lottery__highlight_y" v-for="(d,i) in data.lastOneNumber" :key="i">{{ d }}</span>
                        <!-- <b class="gameHistory_number_k3_font_top">{{ d }}</b> -->
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
            <!-- 主体左边 -->
            <div class="betcenterContent_Nav_Subnavs_body_left">
                <div class="selectLotteryTicketNum">
                    <!-- 五星 -->
                    <template v-if="NavTwo_index==1">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 5" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index] != undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(i)>-1}" v-on:click="singleSelectFn($event,index,i)">{{ i }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="NavTwo_index==2">
                        <div class="selectLotteryTicketNum_box">
                            <div class="danshi">
                                <textarea class="dantext" v-on:input="onTextareaData($event)" v-model="textareaData" cols="" rows=""></textarea>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="gameCal">
                    <span class="gameCal_title">单注金额</span>
                    <input type="text" class="j_Amount" v-on:input="ononeMoney($event)" v-model="oneMoney" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    <button v-for="(d,i) in moneyType" v-on:click="setMoneyNumber(i)" :class="['duan',setMoneyNumber_index==i ? 'duan_me' : '']" :key="i">{{ d }}</button>
                    <span class="gameCal_title">倍数</span>
                    <button class="num_jian center" v-on:click="setMultiple(0)"><i class="iconfont icon-sub lf_icon-sub"></i></button>
                    <input type="text" min="1" max="9999" class="j_Amount" v-on:input="onsetMultipleNumber($event)" v-model="bettingInfo.setMultipleNumber" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                    <button class="num_jia center" v-on:click="setMultiple(1)"><i class="iconfont icon-jiahao lf_icon-sub"></i></button>
                    <button class="cao_btn" v-on:click="setMultiple(2)">加倍</button>
                    <div class="gameCal_ctrlBtns_1fAum">
                        <button class="cao_btn cao_claler" v-on:click="clearUserArr">清除</button>
                        <button :class="['cao_btn',bettingInfo.bettingNumber>0?'':'cao_disabled']" v-on:click="addNumberBtn($event)">添加</button>
                    </div>
                </div>
                <div class="betResult">
                    <div class="betResultList_title clear">
                        <span>玩法</span>
                        <span>下注号</span>
                        <span>注数</span>
                        <span>倍数</span>
                        <span>金额</span>
                        <span><button class="allClear" v-on:click="clearmyJson">全清</button></span>
                    </div>
                    <ul class="betResultList_ul">
                        <li class="clear" v-for="(data,index) in myJson" :key="index">
                            <span>{{ data.name }}</span>
                            <span>{{ data.number }}</span>
                            <span>{{ data.note }}</span>
                            <span>{{ data.multiple }}</span>
                            <span>{{ data.money }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 主体右边 -->
            <div class="betcenterContent_Nav_Subnavs_body_right">
                <div class="gameHistory_list">
                    <div class="gameHistory_tableHeaderRow">
                        <span>期号</span>
                        <span>开奖号</span>
                    </div>
                    <div class="gameHistory_body">
                        <ul>
                            <li class="clear" v-for="(item,index) in data.lastOpenNumber" :key="index">
                                <div>{{ item.stage }}</div>
                                <div class="gameHistory_number">
                                    <span v-for="(k,j) in item.number" :key="j">{{ k }}</span>
                                    <b class="gameHistory_number_k3_font">{{ item.detail[0] }} | {{ item.detail[1] }}</b>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="gameHistory_tableFooterRow">
                        <div class="gameHistory_tableCell">
                            <button class="gameHistory_tableFooterBtn center" v-on:click="getRecentTotteryData">
                                <i class="iconfont icon-shuaxin"></i>
                                <i>刷新</i>
                            </button>
                        </div>
                        <div class="gameHistory_tableCell">
                            <button class="gameHistory_tableFooterBtn_3U5PH"><i class="iconfont icon-shangla"></i></button>
                        </div>
                        <div class="gameHistory_tableCell">
                            <router-link class="center" to="/lotteryInformation">
                                <i class="iconfont icon-fenxiang lf_fx"></i>
                                <i>更多</i>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="ratioCtrl">
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>总注数</p></div>
                        <div class="ratioCtrl_content"><p>{{ bettingInfo.bettingNumber }}</p></div>
                    </div>
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>总金额</p></div>
                        <div class="ratioCtrl_content"><p>{{ bettingInfo.allMoney }}</p>元</div>
                    </div>
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>最高赔率</p></div>
                        <div class="ratioCtrl_content"><p>{{ bettingInfo.rate }}</p></div>
                    </div>
                </div>
                <div class="betCenter_actionRow">
                    <button :class="['BettingBtn',bettingInfo.bettingNumber>0?'BettingBtn_yes':'']" v-on:click="bettingBtn_direct">立即投注</button>
                    <button :class="['BettingNullBtn',myJson.length>0?'BettingBtn_yes':'']" v-on:click="bettingBtn_confirm">确认投注</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import '@/assets/js/ssc.js'
import { singleSelect,multipleSelect,getTextareaData,addNumber } from '@/assets/js/ssc.js'
export default {
    name:'SSC',
    data(){
        return {
            NavOne_index:0,
            NavTwo_index:1,
            NavOneData:this.$store.state.specificTypeData[0].play_rule,//默认一级菜单数据
            NavTwoData:this.$store.state.specificTypeData[0].play_rule[0].odds[0],//默认二级菜单数据
            moneyType:['元','角','分','厘'],
            setMoneyNumber_index:0,
            titleArr:['万位','千位','百位','十位','个位'],
            footerArr:['全','大','小','单','双','清'],
            userArr:[[],[],[],[],[]],
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
            myObj:null, //立即投注的数据
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
        }
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
        // 该事件将被兄弟组件触发
        bortherMethods:function(a){
            // console.log(specificTypeData);
        },
        // 监听文本域
        onTextareaData(e){
            getTextareaData(e,this.$data);
        },
        // 监听单注金额input
        ononeMoney(e){
            console.log(e.data);
            let reg = /^[1-9]+[0-9]*]*$/;
            // this.bettingInfo.singleMoney = 2;
        },
        // 监听倍数input
        onsetMultipleNumber(e){
            console.log(e.data)            
        },
        // 单选
        singleSelectFn(e,y,x){
            singleSelect(e,y,x,this.$data);
        },
        // 多选
        multipleSelectFn(e,y,x){
            multipleSelect(e,y,x,this.$data);
        },
        // 点击一级菜单选择的数据
        selectOneNav:function(i,data){
            this.NavOne_index = i;
            this.NavTwo_index = data.play_rule[0].odds[0].id;
            this.bettingInfo.rate = data.play_rule[0].odds[0].rate;
            this.NavOneData = data;
            console.log('NavOneData',data);
        },
        // 点击二级菜单选择的数据
        selectTwoNav:function(i,data){
            this.NavTwo_index = i;
            this.bettingInfo.rate = data.rate;
            this.NavTwoData = data;
            console.log('NavTwoData',data);
        },
        // 设置单笔投注金额
        setMoneyNumber:function(index){
            const singleMoney = this.oneMoney;
            this.setMoneyNumber_index = index;
            switch (index) {
                case 0:
                    this.bettingInfo.singleMoney = singleMoney*1;
                break;
                case 1:
                    this.bettingInfo.singleMoney = singleMoney*0.1;
                break;
                case 2:
                    this.bettingInfo.singleMoney = singleMoney*0.01;
                break;
                case 3:
                    this.bettingInfo.singleMoney = singleMoney*0.001;
                break;
            }
            this.bettingInfo.allMoney = (this.bettingInfo.singleMoney*this.bettingInfo.bettingNumber)*this.bettingInfo.setMultipleNumber;
        },
        // 设置投注倍数
        setMultiple:function(num){
            if(num==1){
                this.bettingInfo.setMultipleNumber++;
            }else if(num==0){
                if(this.bettingInfo.setMultipleNumber<=1){
                    this.bettingInfo.setMultipleNumber = 1;
                }else{
                    this.bettingInfo.setMultipleNumber--;                    
                }
            }else{
                this.bettingInfo.setMultipleNumber = this.bettingInfo.setMultipleNumber*2;
            }
            this.bettingInfo.allMoney = (this.bettingInfo.singleMoney*this.bettingInfo.bettingNumber)*this.bettingInfo.setMultipleNumber;
        },
        // 清除选择的数据
        clearUserArr:function(){
            this.setMoneyNumber_index = 0;
            this.bettingInfo.allMoney = 0;
            this.bettingInfo.singleMoney = 2;
            this.bettingInfo.bettingNumber = 0;
            this.bettingInfo.setMultipleNumber = 1;
            this.userArr = [[],[],[],[],[]];
            this.textareaData = '';
            for (let i = 0; i < 5; i++) {
                this.DesignationArr[i].num = null;
            }
        },
        clearmyJson:function(){
            this.myJson = [];
        },
        // 添加号码
        addNumberBtn:function(){
            addNumber(this,2);
        },
        // 立即投注
        bettingBtn_direct:function(){
            addNumber(this,1);
            console.log(this.myObj);
        },
        // 确认投注
        bettingBtn_confirm:function(){
            console.log(this.myJson)
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
.dantext{width: 98%;height: auto;min-height: 230px;max-height: 500px;resize:none;padding: 10px 1%;}
</style>



