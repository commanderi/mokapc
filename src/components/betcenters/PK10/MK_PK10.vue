<template>
    <div class="betcenterContent">
        <!-- 页面顶部 -->
        <div class="betcenterContent_header">
            <div class="betcenterContent_headerr_infos">
                <img class="betcenterContent_headerr_infos_icon" :src="this.$store.state.specificTypeID[1]">
                <div class="betcenterContent_header_infosContent">
                    <p class="betcenterContent_header_infosContent_p">{{ this.$store.state.specificTypeID[2] }}</p>
                    <div class="betcenterContent_headerLinks">
                        <router-link class="betcenterContent_headerLinks_a" to="/lotteryInformation"><i class="iconfont icon-lishi"></i>历史开奖</router-link>
                    </div>
                </div>
            </div>
            <div class="betcenterContent_header_time">
                <p class="betcenterContent_header_time_p">距<strong>{{ nextOpen.next_stage }}</strong>期封盘，还有</p>
                <span>
                    <div class="countDownContainer">
                        <div class="countDownContainer_con countDownContainer_con_1">{{ hour }}</div>
                        <i class="iconfont icon-weibiaoti9 lf_weibiaoti9 center"></i>
                        <div class="countDownContainer_con countDownContainer_con_2">{{ minute }}</div>
                        <i class="iconfont icon-weibiaoti9 lf_weibiaoti9 center"></i>
                        <div class="countDownContainer_con countDownContainer_con_3">{{ second }}</div>
                    </div>
                </span>
            </div>
            <div class="PublicityNumberBox">
                <!-- 此处代码勿删 -->
                <template v-if="get_last_one_number!=undefined || get_last_one_number!=null">
                    <p class="betcenterContent_header_time_p">第<strong>{{ get_last_one_number[0].stage }}</strong>期开奖号码</p>
                </template>
                <template v-else>
                    <p class="betcenterContent_header_time_p">正在等待第<strong>{{ Number(nextOpen.next_stage)-1 }}</strong>期开奖......</p>
                </template>
                <div>
                <template v-if="get_last_one_number!=undefined || get_last_one_number!=null">
                    <span class="lottery__highlight_y" v-for="(item,index) in get_last_one_number[0].number" :key="index">{{ get_last_one_number[0].number[index] }}</span>
                </template>
                </div>
            </div>
        </div>
        <!-- 页面一级导航 -->
        <div class="betcenterContent_Nav">
            <div class="betcenterContent_Nav_bar"></div>
            <div class="betcenterContent_Nav_list">
                <ul>
                <!-- 选中的class=my_click -->
                <template v-for="(item,index) in specificTypeData">
                    <li :key="index" :data-index="item.odd_pan" v-bind:class="{ my_click:index==Navlistcurrent }" v-on:click="selectTopNav(item.odd_pan,item.name,$event,index,item.play_rule[0].odds[0].odd_play,item.play_rule[0].odds[0].rule,item.play_rule[0].odds[0].rate)" >{{ item.name }}</li>
                </template>
                </ul>
            </div>
        </div>
        <!-- 页面二级导航 -->
        <div class="betcenterContent_Nav_Subnavs">
            <ul>
                <!-- 选中的class=im_lucky -->
                <template v-for="(item,index) in specificTypeData[this.clickNumber-1].play_rule">
                <template v-if="item.odds[0].rate!=undefined">
                    <li :key="index" :data-index-child="item.odd_pan" v-bind:class="{im_lucky:index==current}" v-on:click="NavSubnavsAddClass(index,item.title,item.odds[0].odd_play,item.odds[0].title,item.odds[0].rate)">{{ item.title }}</li>
                </template>
                </template>
            </ul>
        </div>
        <!-- 页面主体 -->
        <div class="betcenterContent_Nav_Subnavs_body">
            <div class="betcenterContent_Nav_Subnavs_body_left">
                <!-- 北京pk10 -->
                <div class="selectLotteryTicketNum">
                    <template v-for="item in allprins" >
                        <!-- 定位胆 -->
                        <template v-if="item.odd_play==1">
                            <div class="selectLotteryTicketNum_box" v-for="k in 10">
                                <div class="weishu">{{ lotteryNumberTitle[k-1] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                        <!-- 前一 -->
                        <template v-else-if="item.odd_play==2">
                            <div class="selectLotteryTicketNum_box" v-for="k in 1">
                                <div class="weishu">{{ lotteryNumberTitle[k-1] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                        <!-- 前二 -->
                        <template v-else-if="item.odd_play==3">
                            <div class="selectLotteryTicketNum_box" v-for="k in 2">
                                <div class="weishu">{{ lotteryNumberTitle[k-1] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <template v-for="(me,index) in myarr">
                                        <template v-if="index==5">
                                            <button :key="index" class="available" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                        <template v-else>
                                            <button :key="index" disabled='disabled' class="unavailable" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <!-- 前三 -->
                        <template v-else-if="item.odd_play==4">
                            <div class="selectLotteryTicketNum_box" v-for="k in 3">
                                <div class="weishu">{{ lotteryNumberTitle[k-1] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <template v-for="(me,index) in myarr">
                                        <template v-if="index==5">
                                            <button :key="index" class="available" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                        <template v-else>
                                            <button :key="index" disabled='disabled' class="unavailable" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <!-- 后一 -->
                        <template v-else-if="item.odd_play==5">
                            <div class="selectLotteryTicketNum_box" v-for="k in 1">
                                <div class="weishu">{{ lotteryNumberTitle[k+8] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                        <!-- 后二 -->
                        <template v-else-if="item.odd_play==6">
                            <div class="selectLotteryTicketNum_box" v-for="k in 2">
                                <div class="weishu">{{ lotteryNumberTitle[k+7] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <template v-for="(me,index) in myarr">
                                        <template v-if="index==5">
                                            <button :key="index" class="available" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                        <template v-else>
                                            <button :key="index" disabled='disabled' class="unavailable" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <!-- 后三 -->
                        <template v-else-if="item.odd_play==7">
                            <div class="selectLotteryTicketNum_box" v-for="k in 3">
                                <div class="weishu">{{ lotteryNumberTitle[k+6] }}</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button v-for="(list,i) in 10" :key="i" v-on:click="singleSelect(k,list,$event,item.odd_play)">{{ list<=9 ? '0'+list : list }}</button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <template v-for="(me,index) in myarr">
                                        <template v-if="index==5">
                                            <button :key="index" class="available" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                        <template v-else>
                                            <button :key="index" disabled='disabled' class="unavailable" v-on:click="fastSelect(k,index+1,$event,item.odd_play)">{{ me }}</button>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </template>
                        <!-- 第1、2、3、4、5名 -->
                        <template v-else-if="item.odd_play==8 || item.odd_play==9 || item.odd_play==10 || item.odd_play==11 || item.odd_play==12">
                            <div class="selectLotteryTicketNum_box" v-for="k in 1">
                                <div class="weishu" v-if="item.odd_play==8">第一名</div>
                                <div class="weishu" v-if="item.odd_play==9">第二名</div>
                                <div class="weishu" v-if="item.odd_play==10">第三名</div>
                                <div class="weishu" v-if="item.odd_play==11">第四名</div>
                                <div class="weishu" v-if="item.odd_play==12">第五名</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button class="liewai" v-for="(list,index) in item.odds" :key="index" v-on:click="singleSelect(k,list,$event,item.odd_play,list)">{{list.rule}}<span>{{ list.rate }}</span></button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event,item.odd_play,item.odds)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                        <!-- 冠亚和值 -->
                        <template v-else-if="item.odd_play==13">
                            <div class="selectLotteryTicketNum_box" v-for="k in 1">
                                <div class="weishu" v-if="k==1">和值</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button class="liewai" v-for="(list,index) in item.odds" :key="index" v-on:click="singleSelect(k,list,$event,item.odd_play,list)">{{list.rule}}<span>{{ list.rate }}</span></button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event,item.odd_play,item.odds)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                        <!-- 冠亚和 -->
                        <template v-else-if="item.odd_play==14">
                            <div class="selectLotteryTicketNum_box" v-for="k in 1">
                                <div class="weishu" v-if="k==1">和值</div>
                                <div class="selectLotteryTicketNum_box_number">
                                    <button class="liewai" v-for="(list,index) in item.odds" :key="index" v-on:click="singleSelect(k,list,$event,item.odd_play,list)">{{list.rule}}<span>{{ list.rate }}</span></button>
                                </div>
                                <div class="filterNumber_box">
                                    <!-- 选中的class:filterNumber_box_button -->
                                    <button v-for="(me,index) in myarr" :key="index" v-on:click="fastSelect(k,index+1,$event,item.odd_play,item.odds)">{{ me }}</button>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
                <div class="gameCal">
                    
                    <span class="gameCal_title">金额</span>
                    <!-- <input type="text" class="j_Amount" v-model="money" v-on:input="checkingData($event,1)" v-on:blur="MeautoMultiple(1)"> -->
                    <input type="text" class="j_Amount" v-on:input="MeautoMultiple(0)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" v-model="money">
                    <button class="duan" v-on:click="setMoney(1)" v-bind:class="{duan_me:1==toumoney}">元</button>
                    <button class="duan" v-on:click="setMoney(2)" v-bind:class="{duan_me:2==toumoney}">角</button>
                    <button class="duan" v-on:click="setMoney(3)" v-bind:class="{duan_me:3==toumoney}">分</button>
                    <span class="gameCal_title">倍数</span>
                    <button class="num_jian center" v-on:click="setMultiple(0)"><i class="iconfont icon-sub lf_icon-sub"></i></button>
                    <!-- <input type="text" min="1" max="9999" class="j_Amount" v-model="multipleNumber" v-on:input="checkingData($event,2)" v-on:blur="MeautoMultiple(2)"> -->
                    <input type="text" min="1" max="9999" class="j_Amount" v-on:input="MeautoMultiple(1)" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')" v-model="multipleNumber">
                    <button class="num_jia center" v-on:click="setMultiple(1)"><i class="iconfont icon-jiahao lf_icon-sub"></i></button>
                    <div class="gameCal_ctrlBtns_1fAum">
                        <button class="cao_btn cao_claler" v-on:click="clearuserArr">清除</button>
                        <button class="cao_btn" v-on:click="setMultiple(2)">加倍</button>
                        <button class="cao_btn cao_disabled" id="addNumber" disabled v-on:click="addNumber($event)">添加</button>
                        <!-- <button class="cao_btn cao_disabled" disabled>随机</button> -->
                    </div>
                </div>
                <div class="betResult">
                    <div class="betResultList_title clear">
                        <span>玩法</span>
                        <span>下注号</span>
                        <span>注数</span>
                        <span>倍数</span>
                        <span>金额</span>
                        <span><button class="allClear" v-on:click="clearList">全清</button></span>
                    </div>
                    <ul class="betResultList_ul">
                        <li class="clear" v-for="(item,index) in yesBettingData" :key="index">
                            <span>{{ item.odd_title }}</span>
                            <span>{{ item.number }}</span>
                            <span>{{ item.note }}</span>
                            <span>{{ item.multiple }}</span>
                            <span>{{ item.money }}</span>
                            <!-- <span class="caozuo_bi"><i class="iconfont icon-bi"></i></span> -->
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
                            <li class="clear" v-for="(item,index) in lastOpenNumber" :key="index">
                                <div>{{ item.stage }}</div>
                                <div class="gameHistory_number">
                                    <span v-for="k in item.number">{{ k }}</span>
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
                            <!-- <button class="gameHistory_tableFooterBtn_3U5PH"><i class="iconfont icon-shangla"></i></button> -->
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
                        <div class="ratioCtrl_content"><p>{{ BettingNumber }}</p></div>
                    </div>
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>总金额</p></div>
                        <div class="ratioCtrl_content"><p>{{ CalculationMoney }}</p>元</div>
                    </div>
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>最高奖金</p></div>
                        <div class="ratioCtrl_content"><p>{{ highestBonus }}</p>元</div>
                    </div>
                    <div class="ratioCtrl_paragraph">
                        <div class="ratioCtrl_label"><p>最高赔率</p></div>
                        <div class="ratioCtrl_content"><p>{{ highestOdds }}</p></div>
                    </div>
                </div>
                <div class="betCenter_actionRow">
                    <!-- BettingBtn_yes -->
                    <button class="BettingBtn" disabled v-on:click="nowBetting">立即投注</button>
                    <button class="BettingNullBtn" disabled v-on:click="yesBetting">确认投注</button>
                    <!-- <button class="BettingNullBtn" disabled>无投注项</button> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name:'hf-bjpk10',
    data(){
        return {
            lotteryNumberTitle:['冠军','亚军','季军','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
            myarr:['全','大','小','奇','偶','清'],
            nextOpen:'',
            qishu:null,// 倒计时的封盘期数
            allTime:null,// 当前倒计时总时间
            hour:null, // 倒计时时
            minute:null,// 倒计时分
            second:null,// 倒计时秒
            lastOpenNumber:null,
            get_last_one_number:null,// 上一期的开奖号码与期数
            nowOryes:false,
            berforeClick:null,
            userArr:[],
            clickNumber:1,
            Navlistcurrent:0,
            current:0,
            toumoney:1, // 默认投注的样式
            CalculationMoney:0, //计算后的投注总金额
            money:2, // 默认投注金额(2元)
            highestOdds:0, // 最高赔率
            highestBonus:0, // 最高奖金
            multipleNumber:1, // 默认倍数
            BettingNumber:0, // 总注数
            selectTopNavName:null, // 一级菜单name
            selectTopNavNumber:null, // 一级菜单name代号
            NavSubnavsAddClassName:null, // 二级菜单name
            NavSubnavsAddClassNumber:null, // 二级菜单name代号
            myObj:[], // 这是一个中转数据的变量
            yesBettingData:null, // 这是一个承载添加到底部数据的变量
            meTime:null,
            forTime:2000,
        }
    },
    components:{
        // 注册子组件
    },
    computed:{
        specificTypeData(){
            return this.$store.state.specificTypeData;
        },
        specificTypeID(){
            return this.$store.state.specificTypeID;
        },
        allprins(){
            return this.specificTypeData[this.clickNumber-1].play_rule;
        },
    },
    
    methods:{
        // 该事件将被兄弟组件触发
        bortherMethods:function(a){
            this.clearuserArr();
            this.Navlistcurrent = 0;
            this.current = 0;
        },
        // 对选择的号码进行计算
        suan:function(){
            if(this.toumoney==1 || this.toumoney==2 || this.toumoney==3){
                let x = (this.BettingNumber*this.money) * this.multipleNumber;
                this.CalculationMoney = this.changeTwoDecimal_f(x);
                let y = (this.highestOdds*this.money) * this.multipleNumber;;
                this.highestBonus = this.changeTwoDecimal_f(y);
            }else{
                let x = (this.BettingNumber*this.money) * this.multipleNumber;
                this.CalculationMoney = this.changeTwoDecimal_f(x)
            }
        },
        // 获取用户总共选择了多少注
        getBettingNumber:function(data){
            let num = 0;
            if(data==null || data==undefined){
                for (let i = 0; i < this.userArr.length; i++) {
                    if(this.userArr[i]!=null||this.userArr[i]!=undefined){
                        for (let j = 0; j < this.userArr[i].length; j++) {
                            if(this.userArr[i][j]!=null||this.userArr[i][j]!=undefined){
                                num+=1;
                            }
                        }
                    }
                }
                this.BettingNumber = num;
            }else{
                this.BettingNumber = data;
            }
        },
        // 判断是否可以投注
        checkCondition:function(status){
            if(status==0){
                // console.log('无法提交')
                $('#addNumber').addClass('cao_disabled').attr('disabled',true);
                $('.BettingBtn,.BettingNullBtn').removeClass('BettingBtn_yes').attr('disabled',true);
            }else if(status==1){
                // console.log('确认投注亮')
                $('#addNumber').removeClass('cao_disabled').attr('disabled',false);
                $('.BettingNullBtn').addClass('BettingBtn_yes').attr('disabled',false);
            }else if(status==2){
                // console.log('立即投注亮');
                $('#addNumber').removeClass('cao_disabled').attr('disabled',false);
                $('.BettingBtn').addClass('BettingBtn_yes').attr('disabled',false);
            }else if(status==3){
                // console.log('确认投注亮,添加按钮不亮')
                $('#addNumber').addClass('cao_disabled').attr('disabled',true);
                $('.BettingNullBtn').addClass('BettingBtn_yes').attr('disabled',false);
            }
        },
        
        // 单个选择
        singleSelect:function(y,x,e,play,data){
            // console.clear();
            let num = [];
            if($(e.target).is('.filterNumber_box_button')){
                $(e.target).removeClass('filterNumber_box_button');
                for (let i = 0; i < this.userArr[y-1].length; i++) {
                    if(play==8||play==9||play==10||play==11||play==12||play==13||play==14){
                        if(this.userArr[y-1][i]==data.rule){
                            this.userArr[y-1].splice($.inArray(data.rule,this.userArr[y-1]),1);
                        }
                    }else{
                        if(this.userArr[y-1][i]==x){
                            this.userArr[y-1].splice($.inArray(x,this.userArr[y-1]),1);
                        }
                    }
                }
                if(this.BettingNumber==1){
                    this.checkCondition(0)
                }
            }else{
                $(e.target).addClass('filterNumber_box_button');
                if(!this.userArr[y-1]){
                    this.userArr[y-1] = [];
                }
                if(!this.userArr[y-1][x-1]){
                    if(play==8||play==9||play==10||play==11||play==12||play==13||play==14){
                        this.userArr[y-1].push(data.rule);
                    }else{
                        this.userArr[y-1].push(x);
                    }
                }else{
                    this.userArr[y-1].push(x);
                }
                this.checkCondition(2)
            }
            // this.$store.commit('userArrChange',this.userArr);
            if(play==3 || play==6){
                if(this.userArr[0]!=null||this.userArr[0]!=undefined){
                    for (let i = 0; i < this.userArr[0].length; i++) {
                        if(this.userArr[1]!=null||this.userArr[1]!=undefined){
                            for (let j = 0; j < this.userArr[1].length; j++) {
                                let dusi = this.userArr[0][i];
                                let dusj = this.userArr[1][j];
                                if(dusi!=dusj){
                                    num.push(dusi+','+dusj);
                                }
                            }
                        }
                    }
                }
                this.getBettingNumber(num.length);
            }else if(play==4 || play==7){
                if(this.userArr[0]!=null||this.userArr[0]!=undefined){
                    for (let i = 0; i < this.userArr[0].length; i++) {
                        if(this.userArr[1]!=null||this.userArr[1]!=undefined){
                            for (let j = 0; j < this.userArr[1].length; j++) {
                                if(this.userArr[2]!=null||this.userArr[2]!=undefined){
                                    for (let k = 0; k < this.userArr[2].length; k++) {
                                        let dusi = this.userArr[0][i];
                                        let dusj = this.userArr[1][j];
                                        let dusk = this.userArr[2][k];
                                        if(dusi!=dusj && dusi!=dusk && dusj!=dusk){
                                            num.push(dusi+','+dusj+','+dusk);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                this.getBettingNumber(num.length);
            }else{
                this.getBettingNumber();
            }
            console.log(play)
            console.log(this.userArr);
            this.suan();
        },
        // 快速选择
        fastSelect:function(y,index,e,play,data){
            var len = $(e.target).parents('.selectLotteryTicketNum_box').children('.selectLotteryTicketNum_box_number').children('button').removeClass('filterNumber_box_button');
            $(e.target).addClass('filterNumber_box_button').siblings('button').removeClass('filterNumber_box_button');
            this.userArr[y-1] = [];
            if(index<6){
                if(play==8||play==9||play==10||play==11||play==12||play==14||play==13){
                    for (let j = 0; j < data.length; j++) {
                        if(play!==13){
                            if(data[j].rule.search('大') != -1 && index==2){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(data[j].rule.search('小') != -1 && index==3){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(data[j].rule.search('单') != -1 && index==4){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(data[j].rule.search('双') != -1 && index==5){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }
                        }else{
                            if(index==2 && j>8){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(index==3 && j<9){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(index==4 && j%2==0){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }else if(index==5 && j%2!==0){
                                $(len).eq(j).addClass('filterNumber_box_button');
                                this.userArr[y-1].push(data[j].rule);
                            }
                        }
                        if(index==1){
                            $(len).eq(j-1).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(data[j].rule);
                        }
                    }
                }else{
                    for(let i=0;i<len.length;i++){
                        if(index==1 && i<=10){
                            $(len).eq(i-1).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(i+1);
                        }
                        if(index==2 && i>4){
                            $(len).eq(i).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(i+1);
                        }
                        if(index==3 && i<5){
                            $(len).eq(i).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(i+1);
                        }
                        if(index==4 && i%2!=0){
                            $(len).eq(i-1).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(i);
                        }
                        if(index==5 && i%2==0){
                            $(len).eq(i-1).addClass('filterNumber_box_button');
                            this.userArr[y-1].push(i+2);
                        }
                    }
                }
                this.checkCondition(2);
            }else{
                len;
                $(e.target).removeClass('filterNumber_box_button');
                delete this.userArr[y-1];
                this.checkCondition(0)
            }
            console.log(this.userArr);
            this.getBettingNumber();
            this.suan();
        },
        // 强制保留两位小数点函数
        changeTwoDecimal_f:function(x){
            var f_x = parseFloat(x);
            if (isNaN(f_x)){
                console.log('function:changeTwoDecimal->parameter error');
                return false;
            }
            f_x = Math.round(f_x*100)/100;
                var s_x = f_x.toString();
                var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0){
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2){
                s_x += '0';
            }
            return s_x;
        },
        // 一级菜单点击
        selectTopNav:function(num,name,e,index,odd_play,title,odds){
            this.Navlistcurrent = index;
            this.current = 0;
            this.selectTopNavName = name;
            this.selectTopNavNumber = odd_play
            this.NavSubnavsAddClassName = title;
            this.NavSubnavsAddClassNumber = odd_play
            this.clickNumber = num;
            this.highestOdds = odds;
            this.clearuserArr();
            this.suan();
        },
        // 二级菜单点击
        NavSubnavsAddClass:function(index,name,odd_play,title,odds){
            this.current = index;
            this.NavSubnavsAddClassName = title;
            this.NavSubnavsAddClassNumber = odd_play
            this.highestOdds = odds;
            this.clearuserArr();
            this.suan();
        },
        // 清除选择的数据以及计算出的数据
        clearuserArr:function(){
            this.userArr = [];
            this.multipleNumber = 1;
            this.BettingNumber = 0;
            this.CalculationMoney = 0;
            this.toumoney = 1;
            this.money = 2;
            this.checkCondition(0);
            $('.selectLotteryTicketNum_box').find('button').removeClass('filterNumber_box_button');
            // console.clear();
        },
        // 清除全部数据
        clearList:function(){
            this.myObj = [];
            this.yesBettingData = null;
            this.clearuserArr();
            this.checkCondition(0);
            // console.clear();
        },
        // 重新组装数据
        assemblyData:function(){
            // this.getBettingNumber();
            this.suan();
            let xuanzheData = [];
            // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率
            let list = {number:null,odd_play:null,note:null,money:null,one_money:null,rate:null,multiple:null};
            for (let i = 0; i < this.userArr.length; i++) {
                if(this.userArr[i]!=undefined||this.userArr[i]!=null){
                    xuanzheData[i] = this.userArr[i];
                }
            }
            if(this.selectTopNavNumber==1 && xuanzheData.length-1<9){
                xuanzheData[10] = null;
            }
            let tem = null;
            let successData = null;
            switch (this.selectTopNavNumber) {
                case 2:case 5:case 8:case 9:case 10:case 11:case 12:case 13:case 14:
                    tem = xuanzheData.join('');
                    successData = tem.replace(/,/g,' ');
                    break;
                default:
                    tem = xuanzheData.join('|');
                    successData = tem.replace(/,/g,' ');
                    break;
            }
            list = {
                number:successData, //选择的号码
                odd_play:this.NavSubnavsAddClassNumber, //玩法代号
                note:this.BettingNumber, // 注数
                money:this.CalculationMoney, //总投注金额 
                one_money:this.money, //单笔金额
                rate:this.highestOdds, //投注赔率
                multiple:this.multipleNumber, //倍数
                odd_title:this.NavSubnavsAddClassName
            }
            this.myObj.push(list);
        },
        // 添加选择的号码到底部，准备投注
        addNumber:function(){
            this.assemblyData();
            this.clearuserArr();
            this.yesBettingData = this.myObj;
            this.checkCondition(3);
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
                    data:{'cate':this.$store.state.specificTypeID[0],'list':JSON.stringify(this.yesBettingData),'uid':uid,'token':userToken}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        // 投注成功之后将选择的数据、样式清空
                        this.clearList();
                        this.checkCondition(0);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    layer.msg('投注出错,请重试:'+err);
                })
                // console.clear();
            }else{
                layer.msg('未登录，无法投注');
            }
        },
        // 立即投注
        nowBetting:function(){
            if(localStorage.getItem('loginStatus')=='true'){
                // 选择了之后不要添加到底部，直接投注
                this.assemblyData()
                let nowBettingData = this.myObj;
                let userToken = localStorage.getItem('userToken');
                let uid = localStorage.getItem('userId');
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'lottery/betting',
                    data:{'cate':this.$store.state.specificTypeID[0],'list':JSON.stringify(nowBettingData),'uid':uid,'token':userToken}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        // 投注成功之后将选择的数据、样式清空
                        this.myObj = [];
                        this.clearuserArr();
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log('投注出错,请重试:'+err);
                })
                nowBettingData = null;
                this.clearuserArr();
                this.clearList();
                // console.clear();
            }else{
                layer.msg('未登录，无法投注');
            }
        },
        // 设置投注倍数(+、-、加倍)
        setMultiple:function(num){
            if(num==1){
                if(this.multipleNumber>=9999){
                    this.multipleNumber = 9999;
                }else{
                    this.multipleNumber = Number(this.multipleNumber)+1;
                }
            }else if(num==2){
                if(Number(this.multipleNumber)*2>=9999){
                    this.multipleNumber = 9999;
                }else{
                    this.multipleNumber = Number(this.multipleNumber)*2;
                }
            }else{
                if(this.multipleNumber<=1){
                    this.multipleNumber = 1;
                }else{
                    this.multipleNumber = Number(this.multipleNumber)-1;
                }
            }
            this.suan();
        },
        // 检查两个input输入的数据
        checkingData:function(e,num){
            if(num==1){// 金额输入框
                
            }else if(num==2){// 倍数输入框
                
            }
            console.log(e.data)
        },
        // 金额与倍数输入框的input事件
        MeautoMultiple:function(sta){
            if(sta==0){
                if(this.money==null||this.money==undefined||this.money==''){
                    if(this.toumoney==1){
                        this.money = this.money/1;
                    }else if(this.toumoney==2){
                        this.money = this.money/10;
                    }else if(this.toumoney==3){
                        this.money = this.money/100;
                    }
                }
            }else if(sta==1){
                if(this.multipleNumber==null||this.multipleNumber==undefined||this.multipleNumber==''){
                    this.multipleNumber = 1;
                }
            }
            this.suan();
        },
        // 切换元角分
        setMoney:function(num){
            this.toumoney = num;
            this.money = 2;
            if(this.toumoney==1){
                this.money = this.money/1;
            }else if(this.toumoney==2){
                this.money = this.money/10;
            }else if(this.toumoney==3){
                this.money = this.money/100;
            }
            if(this.BettingNumber>0){
                this.getBettingNumber();
                this.suan();
            }else{
                layer.msg('请选择号码')
            }
        },
        // 获取最近10期的开奖结果
        getRecentTotteryData:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_last_open_number',
                data: {'cate':this.$store.state.specificTypeID[0]} // 此处需要传入当前奖项的id
            })
            .then(res => {
                if(res.data.ret==200){
                    this.lastOpenNumber = res.data.data;
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
            this.nextOpen = '';
            this.get_last_one_number = null;
            clearInterval(this.time);
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_next_time_stage',
                data: {'cate':this.$store.state.specificTypeID[0]}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.nextOpen = res.data.data;
                    this.calculatingTime();
                    this.getRecentTotteryData();
                    this.getLastOneNumber();
                    layer.closeAll('loading');
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log('获取当前期数倒计时出错:'+err);
            })
        },
        // 获取上一期开奖号码
        getLastOneNumber:function(){
            let qi = Number(this.nextOpen.next_stage)-1;
            this.meTime = setInterval(() => {
                if(this.get_last_one_number!=null){
                    clearInterval(this.meTime);
                }else{
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'lottery/get_last_one_number',
                        data: {'cate':this.$store.state.specificTypeID[0],'stage':qi}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            this.get_last_one_number = res.data.data;
                        }else{
                            console.log('未获取到上一期开奖号码');
                            switch (Number(this.$store.state.specificTypeID[0])) {
                                case 3:case 4: //北京PK10 幸运飞艇
                                    this.forTime = 20000;
                                break;
                            }
                            clearInterval(this.meTime);
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
            this.allTime = this.nextOpen.open_time;
            this.time = setInterval(() => {
                if(this.allTime>=0){
                    let hour = Math.floor((this.allTime/3600)%24);
                    let minute = Math.floor((this.allTime/60)%60);
                    let second = Math.floor(this.allTime%60);
                    if(hour<10){hour = '0'+hour;}
                    if(minute<10){minute = '0'+minute;}
                    if(second<10){second = '0'+second;}
                    this.hour = hour;
                    this.minute = minute;
                    this.second = second;
                    this.allTime--
                }else{
                    clearInterval(this.meTime);
                    clearInterval(this.time);
                    this.getNextTotteryTime();
                }
                // console.log(this.hour,this.minute,this.second);
            }, 1000);
        },
    },
    mounted(){
        clearInterval(this.meTime);
        clearInterval(this.time);
        this.getNextTotteryTime(); //获取当前期数、时间，并开始倒计时
        this.highestOdds = this.allprins[0].odds[0].rate;
        this.highestBonus = this.allprins[0].odds[0].rate * this.money;
        this.selectTopNavName = this.specificTypeData[0].name;
        this.NavSubnavsAddClassNumber = this.specificTypeData[0].play_rule[0].odd_play;
        this.NavSubnavsAddClassName = this.specificTypeData[0].play_rule[0].title;
        // console.clear();
    },
    watch:{
        specificTypeID(){
            clearInterval(this.meTime);
            clearInterval(this.time);
            // this.forTime = 3000;
            switch (Number(this.$store.state.specificTypeID[0])) {
                case 3:case 4: //北京PK10 幸运飞艇
                    this.forTime = 20000;
                break;
            }
            this.getNextTotteryTime(); //获取当前期数、时间，并开始倒计时
            // console.clear();
        }
    },
}
</script>
<style scoped>
.ratioCtrl_content>p{font-size: 18px;}
.unavailable{cursor: not-allowed;}
.available{cursor: pointer;}
</style>



