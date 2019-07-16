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
            <!-- 主体左边 -->
            <div class="betcenterContent_Nav_Subnavs_body_left">
                <!-- 定位胆 -->
                <div class="selectLotteryTicketNum"  v-if="NavOne_index==0">
                    <template v-if="NavTwo_index==91||NavTwo_index==92">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 5" :key="index">
                            <div class="weishu">{{ NavTwo_index==91 ? titleArr[index] : titleArr[index+5] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 前一 -->
                <div class="selectLotteryTicketNum"  v-else-if="NavOne_index==1">
                    <template v-if="NavTwo_index==93">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 前二 -->
                <div class="selectLotteryTicketNum"  v-else-if="NavOne_index==2">
                    <template v-if="NavTwo_index==94">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 2" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="NavTwo_index==95">
                        <div class="selectLotteryTicketNum_box">
                            <div class="danshi">
                                <textarea class="dantext" v-on:input="ontextareaData($event)" v-model="textareaData" cols="" rows=""></textarea>
                            </div>
                        </div>
                    </template>
                    <template v-if="NavTwo_index==96">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 19" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)" v-if="list>2">{{ list }}</button>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 前三 -->
                <div class="selectLotteryTicketNum"  v-else-if="NavOne_index==3">
                    <template v-if="NavTwo_index==97">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 3" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="NavTwo_index==98">
                        <div class="selectLotteryTicketNum_box">
                            <div class="danshi">
                                <textarea class="dantext" v-on:input="ontextareaData($event)" v-model="textareaData" cols="" rows=""></textarea>
                            </div>
                        </div>
                    </template>
                    <template v-if="NavTwo_index==99">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 27" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)" v-if="list>5">{{ list }}</button>
                                </template>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 前四 -->
                <div class="selectLotteryTicketNum" v-else-if="NavOne_index==4">
                    <template v-if="NavTwo_index==100">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 4" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="selectLotteryTicketNum_box">
                            <div class="danshi">
                                <textarea class="dantext" v-on:input="ontextareaData($event)" v-model="textareaData" cols="" rows=""></textarea>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 前五 -->
                <div class="selectLotteryTicketNum" v-else-if="NavOne_index==5">
                    <template v-if="NavTwo_index==102">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 5" :key="index">
                            <div class="weishu">{{ titleArr[index] }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in 10" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list>9 ? list : '0'+list }}</button>
                                </template>
                            </div>
                            <div class="filterNumber_box">
                                <button v-for="(m,j) in footerArr" :key="j" :class="{'filterNumber_box_button':DesignationArr[index].num==j}" v-on:click="multipleSelectFn($event,index,j)">{{ m }}</button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="selectLotteryTicketNum_box">
                            <div class="danshi">
                                <textarea class="dantext" v-on:input="ontextareaData($event)" v-model="textareaData" cols="" rows=""></textarea>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 大小单双、龙虎 -->
                <div class="selectLotteryTicketNum" v-else-if="NavOne_index==6||NavOne_index==7">
                    <template v-if="NavTwo_index==104||NavTwo_index==105||NavTwo_index==106||NavTwo_index==107||NavTwo_index==108||NavTwo_index==109||NavTwo_index==110|NavTwo_index==111||NavTwo_index==112||NavTwo_index==113">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ NavTwoData.rule }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in ['大','小']" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list }}</button>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-else-if="NavTwo_index==124||NavTwo_index==125||NavTwo_index==126||NavTwo_index==127||NavTwo_index==128">
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ NavTwoData.rule }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in ['龙','虎']" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list }}</button>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="selectLotteryTicketNum_box" v-for="(k,index) in 1" :key="index">
                            <div class="weishu">{{ NavTwoData.rule }}</div>
                            <div class="selectLotteryTicketNum_box_number">
                                <template v-if="userArr[index]!=undefined">
                                    <button v-for="(list,i) in ['双','单']" :key="i" :class="{'filterNumber_box_button':userArr[index].indexOf(list)>-1}" v-on:click="singleSelectFn($event,index,list)">{{ list }}</button>
                                </template>
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
                        <button :class="['cao_btn',bettingInfo.bettingNumber>0 || textareaData!=''?'':'cao_disabled']" v-on:click="addNumberBtn($event)">添加</button>
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
import '@/assets/js/pk10.js'
import { singleSelect,multipleSelect,AssemblyData,singleSelectChinese,getTextareaData } from '@/assets/js/pk10.js'
export default {
    name:'PK10',
    data(){
        return {
            NavOne_index:0,
            NavTwo_index:91,
            NavOneData:this.$store.state.specificTypeData[0],//默认一级菜单数据
            NavTwoData:this.$store.state.specificTypeData[0].play_rule[0].odds[0],//默认二级菜单数据
            moneyType:['元','角','分','厘'],
            setMoneyNumber_index:0,
            titleArr:['第一名','第二名','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
            footerArr:['全','大','小','单','双','清'],
            userArr:[[],[],[],[],[]],
            userArrChinese:[],
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
            if(jw>1920){
                jc.style.left = document.getElementsByClassName('betcenter')[0].offsetWidth-jc.offsetWidth+'px';
                $('.betcenter,.header_top_logIn').css('max-width','1500px');
                $('.header_top_logIn_con').css('margin-right','0%');
            }else{
                jc.style.left = ((jw-jc.offsetWidth)/2)+(jm/2)+'px';
            }
        },
        // 该事件将被兄弟组件触发
        bortherMethods:function(a){
            this.clearUserArr();
            this.clearmyJson();
            this.NavOne_index = 0;
            this.NavTwo_index = 91;
            clearInterval(this.lastTimeFn);
            clearInterval(this.timeFn);
        },
        // 监听单注金额input
        ononeMoney(e){
            // 总金额=单注金额x注数x投注倍数
            this.bettingInfo.singleMoney = this.oneMoney;
            this.bettingInfo.allMoney = (this.bettingInfo.singleMoney*this.bettingInfo.bettingNumber)*this.bettingInfo.setMultipleNumber;
        },
        // 监听倍数input
        onsetMultipleNumber(e){
            // 总金额=单注金额x注数x投注倍数
            this.bettingInfo.allMoney = (this.bettingInfo.singleMoney*this.bettingInfo.bettingNumber)*this.bettingInfo.setMultipleNumber;
        },
        // 添加号码
        addNumberBtn:function(){
            if(this.textareaData){
                getTextareaData(this);
            }else{
                AssemblyData(this,2);
            }
        },
        // 监听单式文本域
        ontextareaData:function(e){
            // console.log(e.data);
        },
        // 立即投注
        bettingBtn_direct:function(){
            AssemblyData(this,1);
            this.nowBetting();
        },
        // 确认投注
        bettingBtn_confirm:function(){
            this.yesBetting();
        },
        // 单选
        singleSelectFn(e,y,x){
            switch (this.NavTwo_index) {
                // 玩法是汉字的情况
                case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:
                case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:case 123:
                case 124:case 125:case 126:case 127:case 128:
                    singleSelectChinese(e,y,x,this.$data);
                break;
                default:
                    singleSelect(e,y,x,this.$data);
                break;
            }
        },
        // 多选
        multipleSelectFn(e,y,x){
            switch (this.NavTwo_index) {
                case 6:
                    this.clearUserArr();
                    this.userArrChinese = [[],[]];
                break;
                default:
                    multipleSelect(e,y,x,this.$data);
                break;
            }
        },
        // 点击一级菜单选择的数据
        selectOneNav:function(i,data){
            this.NavOne_index = i;
            this.NavTwo_index = data.play_rule[0].odds[0].id;
            this.bettingInfo.rate = data.play_rule[0].odds[0].rate;
            this.NavOneData = data;
            this.NavTwoData = data.play_rule[0].odds[0];
            this.clearUserArr();
            // console.log('NavOneData',data);
        },
        // 点击二级菜单选择的数据
        selectTwoNav:function(i,data){
            this.NavTwo_index = i;
            this.bettingInfo.rate = data.rate;
            this.NavTwoData = data;
            this.clearUserArr();
            // console.log('NavTwoData',data);
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
            this.userArrChinese = [[],[]];
            for (let i = 0; i < 5; i++) {
                this.DesignationArr[i].num = null;
            }
        },
        clearmyJson:function(){
            this.myJson = [];
        },
        // 确认投注
        yesBetting:function(){
            if(localStorage.getItem('loginStatus')=='true'){
                // 选择了多个之后，并已经添加到底部，开始投注
                let userToken = localStorage.getItem('userToken');
                let uid = localStorage.getItem('userId');
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'lottery/betting',
                    data:{'cate':this.$store.state.specificTypeID[0],'list':JSON.stringify(this.myJson),'uid':uid,'token':userToken}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.alert(res.data.msg,{title: '投注提示',icon: 1,skin: 'layer-ext-moon'});
                        this.clearmyJson();
                    }else{
                        layer.alert(res.data.msg,{title: '投注提示',icon: 2,skin: 'layer-ext-moon'});
                    }
                })
                .catch(err => {
                    layer.alert('投注出错,请重试:'+err,{title: '投注提示',icon: 2,skin: 'layer-ext-moon'});
                })
            }else{
                layer.alert('未登录，无法投注',{title: '提示',icon: 2,skin: 'layer-ext-moon'});
            }
        },
        // 立即投注
        nowBetting:function(){
            if(localStorage.getItem('loginStatus')=='true'){
                let userToken = localStorage.getItem('userToken');
                let uid = localStorage.getItem('userId');
                if(this.myObj==null||this.myObj==''){
                    layer.alert('选择的数据不能为空',{title: '提示',icon: 2,skin: 'layer-ext-moon'});
                    return
                }else{
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'lottery/betting',
                        data:{'cate':this.$store.state.specificTypeID[0],'list':JSON.stringify(this.myObj),'uid':uid,'token':userToken}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            layer.alert(res.data.msg,{title: '投注提示',icon: 1,skin: 'layer-ext-moon'});
                            this.clearUserArr();
                            this.myObj = [];
                        }else{
                            layer.alert(res.data.msg,{title: '投注提示',icon: 2,skin: 'layer-ext-moon'});
                        }
                    })
                    .catch(err => {
                        layer.alert('投注出错,请重试:'+err,{title: '投注提示',icon: 2,skin: 'layer-ext-moon'});
                    })
                }
            }else{
                layer.alert('未登录，无法投注',{title: '提示',icon: 2,skin: 'layer-ext-moon'});
            }
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
                layer.msg('获取最近10期开奖结果出错:'+err);
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
                layer.msg('获取当前期数倒计时出错:'+err);
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
                            switch (Number(this.$store.state.specificTypeID[0])) {
                                case 3: //北京pk10
                                    this.forTime = 20000;
                                break;
                                case 4: //幸运飞艇
                                    this.forTime = 10000;
                                break;
                            }
                            clearInterval(this.lastTimeFn);
                            this.getLastOneNumber();
                        }
                    })
                    .catch(err => {
                        layer.msg('获取上一期开奖号码出错:'+err);
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
/* .betcenterContent_Nav_Subnavs_two:last-child{margin: 0px 15px 12px 8px;} */
</style>

