<template>
    <!-- 用户管理 -->
    <div class="UserManagement">
        <div class="UserManagementCantant" v-show="createMember==0">
            <div class="user_h">我的用户列表
                <!-- <button class="downloadUserList"><i class="iconfont icon-xiazai"></i>下载列表</button> -->
            </div>
            <button class="readyCreateNewUser_btn" v-on:click="returnTop(0)"><i class="iconfont icon-jiahao"></i>创建新用户</button>
            <div class="UserManagement_table_box">
                <table id="UserManagement_table">
                    <ul class="UserManagement_table_ulti">
                        <li>用户名</li>
                        <li>最后登录日期</li>
                        <li>返点</li>
                        <li>团队人数</li>
                        <li>团队余额</li>
                        <li>个人余额</li>
                        <li>个人投注</li>
                        <li>个人充值</li>
                        <li>存款次数</li>
                        <li>个人提款</li>
                        <li>操作</li>
                    </ul>
                    <tbody class="UserManagement_table_tbody">
                    <template v-if="listData!=null">
                    <ul class="UserManagement_table_tbody_ul">
                        <li v-for="(d,i) in listData" :key="i" class="clear">
                            <span>{{ d.mobile }}</span>
                            <span>{{ d.last }}</span>
                            <span>{{ d.base }}</span>
                            <span>{{ d.team_number }}</span>
                            <span>{{ d.team_balance }}</span>
                            <span>{{ d.personal_balance }}</span>
                            <span>{{ d.personal_betting }}</span>
                            <span>{{ d.personal_recharge }}</span>
                            <span>{{ d.personal_recharge_times }}</span>
                            <span>{{ d.personal_withdraw }}</span>
                            <span class="UserManagement_caozuo">
                                <i class="iconfont icon-more-op"></i>
                                <ul class="UserManagement_caozuo_ul">
                                    <li><button v-on:click="operating(d.id,d.mobile,2)">个人报表</button></li>
                                    <li><button v-on:click="operating(d.id,d.mobile,3)">下级</button></li>
                                    <li><button v-on:click="operating(d.id,d.mobile,4)">转账</button></li>
                                </ul>
                            </span>
                        </li>
                    </ul>
                    </template>
                    </tbody>
                </table>
                <div id="demo7"></div>
            </div>
        </div>
        <!-- 创建新用户 -->
        <div class="CreateNewUser_box" v-show="createMember==1">
            <p class="user_h">
                <a class="myuserlist" v-on:click="returnTop(1)">我的用户列表</a>
                <i class="iconfont icon-next CreateNewUser_icon"></i>
                <span>创建新用户</span>
            </p>
            <div class="CreateNewUser_box_con">
                <div class="bankCard_input_box">
                    <h6>用户名</h6>
                    <input type="text" class="bankCardName" v-model="username" placeholder="用户名(4-11位字母和数字, 至少含有一个字母)" max="11" min="4" maxlength="11" pattern="^[a-z|A-Z|0-9]\w{1,12}$" onkeyup="value=value.replace(/[^0-9|a-z|A-Z]/g,'')" onpaste="value=value.replace(/[^0-9|a-z|A-Z]/g,'')" oncontextmenu="value=value.replace(/[^0-9|a-z|A-Z]/g,'')">
                </div>
                <div class="bankCard_input_box">
                    <h6>默认密码<span class="modifyPwd_tip center"><i class="iconfont icon-zhuyi"></i>用户登录后需自行修改</span></h6>
                    <input type="text" class="bankCardName" v-model="pwd" max="6" min="1" maxlength="6" pattern="^[0-9]\w{1,7}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
                <div class="bankCard_input_box clear">
                    <div class="setUserRebate">
                        <p class="setUserRebate_title">彩票返点 (赔率%)</p>
                        <template v-if="sliderValue!=null || BackRebatesList!==null">
                            <span class="setUserRebate_number">
                                <template v-for="s in BackRebatesList">
                                    <template v-if="s.percent==sliderValue+'%'">
                                        {{ mebase = s.base }}
                                    </template>
                                </template>
                                ({{ sliderValue }}%)
                            </span>
                        </template>
                        <div class="ratioCtrl_Slider setUserRebate_la" data-before='' data-after=''>
                            <div id="setUserRebate_number" class="demo-slider">
                                <div class="layui-slider ">
                                    <div class="layui-slider-bar"></div>
                                    <div class="layui-slider-wrap">
                                        <div class="layui-slider-wrap-btn"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="setUserRebate">
                        <p class="setUserRebate_title">工资返点</p>
                        <template v-if="sliderValue2!=null || wageList!==null">
                            <span class="setUserRebate_number">
                                <template v-for="s in wageList">
                                    <template v-if="s.percent==sliderValue2+'%'">
                                        {{ mebase = s.base }}
                                    </template>
                                </template>
                                ({{ sliderValue2 }}%)
                            </span>
                        </template>
                        <div class="ratioCtrl_Slider2 setUserRebate_la" data-before='' data-after=''>
                            <div id="setUserRebate_number2" class="demo-slider">
                                <div class="layui-slider ">
                                    <div class="layui-slider-bar"></div>
                                    <div class="layui-slider-wrap">
                                        <div class="layui-slider-wrap-btn"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p class="CreateNewUser_bottom_p">
                    <button class="cancelCreateNewUser_btn" v-on:click="returnTop">取消</button>
                    <button class="CreateNewUser_btn" v-on:click="newMember">创建新用户</button>
                </p>
            </div>
        </div>
        <!-- 下级账户详情 -->
        <div class="CreateNewUser_box" v-show="createMember==2">
            <p class="user_h">
                <a class="myuserlist" v-on:click="returnTop(1)">我的用户列表</a>
                <i class="iconfont icon-next CreateNewUser_icon"></i>
                <span>{{ bottomName }}</span>
            </p>
            <div class="rechargeRecord_timeBox">
                <label>日期：</label>
                <button id="previousDayBtn" v-on:click="selectDate(1)"><i class="iconfont icon-previous"></i>前一天</button>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" id="test1" placeholder="yyyy-MM-dd" v-model="time">
                </div>
                <template v-if="time==me">
                    <button id="nextDayBtn" disabled="disabled" style="cursor:not-allowed" v-on:click="selectDate(2)">后一天<i class="iconfont icon-next"></i></button>
                </template>
                <template v-else>
                    <button id="nextDayBtn" v-on:click="selectDate(2)">后一天<i class="iconfont icon-next"></i></button>
                </template>
                <span class="rechargeRecord_selectQueryTyle_box">
                    <label>交易类型:</label>
                    <select name="" id="rechargeRecord_selectQueryTyle" v-on:change="getseldata($event)">
                        <option value="">全部</option>
                        <option value="1">充值</option>
                        <option value="2">派彩</option>
                        <option value="3">佣金</option>
                        <option value="4">优惠</option>
                        <option value="5">投注</option>
                        <option value="6">反水</option>
                        <option value="9">撤单</option>
                        <option value="10">转入</option>
                        <option value="11">转出</option>
                        <option value="12">提现</option>
                        <option value="7">取消派彩</option>
                        <option value="8">取消优惠</option>
                        <option value="13">取消提现</option>
                    </select>
                </span>
            </div>
            <div class="UserManagement_table_box">
                <table id="lf_user_recording_table">
                    <thead class="lf_user_recording_table_h">
                        <ul>
                            <li>交易时间</li>
                            <li>订单号</li>
                            <li>交易类型</li>
                            <li>交易金额</li>
                            <li>帐户余额</li>
                        </ul>
                    </thead>
                    <tbody class="lf_user_recording_table_body">
                        <template v-if="meListData!=null">
                            <ul>
                                <li v-for="(d,i) in meListData.data" :key="i" class="clear">
                                    <span>{{ d.create_at }}</span>
                                    <span>{{ d.order_no }}</span>
                                    <span>{{ d.name }}</span>
                                    <span>￥{{ d.money }}</span>
                                    <span>￥{{ d.balance }}</span>
                                </li>
                            </ul>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 下级报表 -->
        <div class="CreateNewUser_box" v-show="createMember==3">
            <p class="user_h">
                <a class="myuserlist" v-on:click="returnTop(1)">我的用户列表</a>
                <i class="iconfont icon-next CreateNewUser_icon"></i>
                <span>{{ bottomName }}</span>
            </p>
            <div class="UserManagement_table_box" style="margin-top:10px;">
                <table id="UserManagement_table">
                    <ul class="UserManagement_table_ulti">
                        <li style="width:10%">昵称</li>
                        <li style="width:10%">余额</li>
                        <li style="width:10%">返点</li>
                        <li style="width:10%">团队人数</li>
                        <li style="width:10%">团队余额</li>
                        <li style="width:10%">个人余额</li>
                        <li style="width:10%">个人投注</li>
                        <li style="width:10%">个人充值</li>
                        <li style="width:10%">存款次数</li>
                        <li style="width:10%">个人提款</li>
                    </ul>
                    <tbody class="UserManagement_table_tbody">
                    <template v-if="meListData!=null">
                    <ul class="UserManagement_table_tbody_ul">
                        <li v-for="(d,i) in meListData" :key="i" class="clear">
                            <span style="width:10%">{{ d.mobile }}</span>
                            <span style="width:10%">{{ d.money }}</span>
                            <span style="width:10%">{{ d.base }}</span>
                            <span style="width:10%">{{ d.team_number }}</span>
                            <span style="width:10%">{{ d.team_balance }}</span>
                            <span style="width:10%">{{ d.personal_balance }}</span>
                            <span style="width:10%">{{ d.personal_betting }}</span>
                            <span style="width:10%">{{ d.personal_recharge }}</span>
                            <span style="width:10%">{{ d.personal_recharge_times }}</span>
                            <span style="width:10%">{{ d.personal_withdraw }}</span>
                        </li>
                    </ul>
                    </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- 给下级转账 -->
        <div class="CreateNewUser_box" v-show="createMember==4">
            <p class="user_h">
                <a class="myuserlist" v-on:click="returnTop(1)">我的用户列表</a>
                <i class="iconfont icon-next CreateNewUser_icon"></i>
                <span>{{ bottomName }}</span>
            </p>
            <div class="CreateNewUser_box_con">
                <div class="bankCard_input_box">
                    <h6>转账给：<b style="color:red;font-size:22px">{{bottomName}}</b></h6>
                    <input type="text" class="bankCardName" v-model="money" placeholder="请输入转账金额" maxlength="9" pattern="^[0-9]\w{1,9}$" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
                <p class="CreateNewUser_bottom_p">
                    <button class="cancelCreateNewUser_btn" v-on:click="returnTop(1)">取消</button>
                    <button class="CreateNewUser_btn" v-on:click="transfertoLower">确认转账</button>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import {isEmpty} from '../../assets/js/global.js'
import {isRegisterUserName} from '../../assets/js/global.js'
import {thisDay} from '../../assets/js/global.js'
import {formatTime} from '../../assets/js/global.js'
export default {
    name: 'UserManagement',
    data () {
        return {
            userToken:null,
            userId:null,
            listData:null,
            memberData:null,
            createMember:0,
            showOrhide:1,
            username:null,
            pwd:123456,
            mebase:null,
            meListData:null,
            BackRebatesList:null,
            wageList:null,
            sliderValue:null, //滑动的值
            sliderValue2:null,
            bottomVip:'', //下级会员
            bottomName:'',
            exp:'',
            time:thisDay(),
            me:thisDay(),
            laypage:null,
            money:null,
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
        selectDate:function(n){
            let a;
            if(n==1){
                a = (Date.parse(this.time)/1000) - 86400;
            }else{
                a = (Date.parse(this.time)/1000) + 86400;
            }
            this.time = formatTime(a,'Y-M-D');
            this.getAccountDetail();
        },
        // 获取我的下级会员
        getMyJunior:function(page=1){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'agent/get_my_junior',
                data: {'token':this.userToken,'uid':this.userId,'junior_id':this.bottomVip,'page':page}
            })
            .then(res => {
                if(res.data.ret==200){
                    if(this.bottomVip==''){
                        this.listData = res.data.data;
                    }else{
                        this.meListData = res.data.data;
                    }
                    this.Pagination(res.data.data.total,res.data.data.per_page,res.data.data.current_page,eval(this.getMyJunior));
                }else{
                    this.listData = '';
                    this.meListData = '';
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
        },
        operating:function(id,name,num){
            this.bottomVip = id;
            this.bottomName = name;
            this.createMember = num;
            if(num==2){
                this.getAccountDetail();
            }else if(num==3){
                this.getMyJunior();
            }
        },
        // 给下级转账
        transfertoLower:function(){
            if(this.money==null||this.money<=0){
                layer.msg('转账金额必须大于0');
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'money/transfer_to_lower',
                    data: {'token':this.userToken,'uid':this.userId,'lower_uid':this.bottomVip,'money':this.money}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                        this.returnTop(1);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        // 添加下级会员
        newMember:function(){
            if(!isEmpty(this.username)){
                layer.msg('用户名不能为空');
                return
            }else if(!isRegisterUserName(this.username)){
                layer.msg('请正确设置用户名');
                return
            }else if(!isEmpty(this.pwd)){
                layer.msg('密码不能为空');
                return
            }else if(!isEmpty(this.mebase)){
                layer.msg('请设置彩票返点基数');
                return
            }else if(!isEmpty(this.sliderValue2)){
                layer.msg('请设置工资返点基数');
                return
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'agent/new_member',
                    data: {'token':this.userToken,'uid':this.userId,'mobile':this.username,'password':this.pwd,'base':this.mebase,'wage_percent':this.sliderValue2/100}
                })
                .then(res => {
                    if(res.data.ret==200){
                        this.memberData = res.data.data;
                        layer.msg(res.data.msg);
                        this.returnTop(1);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
        },
        // 下级账户明细
        getAccountDetail:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'money/account_detail',
                data: {'token':this.userToken,'uid':this.userId,'date':this.time,'exp':this.exp,'junior_id':this.bottomVip}
            })
            .then(res => {
                if(res.data.ret==200){
                    if(res.data.data.data.length>=1){
                        this.meListData = res.data.data;
                    }else{
                        layer.msg('暂无数据');                        
                    }
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
            
        },
        getseldata:function(obj){
            this.exp = obj.target.value;
            this.getAccountDetail();
        },
        returnTop:function(n){
            this.createMember = !n;
            this.listData = '';
            this.meListData = '';
            this.bottomVip = '';
            this.money = null;
            if(n==1){
                this.getMyJunior();
            }
        },
        qiehuan:function(n){
            this.showOrhide = n;
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
                this.getMyJunior();
            }
        };
        layui.use(['laydate','laypage'], function(){
            var laydate = layui.laydate;
            me.laypage = layui.laypage;
            laydate.render({
                elem: '#test1',
                range: false,
                position: 'fixed',
                theme: '#f20320',
                max: thisDay(),
                value: thisDay(),
                done: function(value,date){
                    me.time = value;
                    me.getAccountDetail();
                }
            });
        });
        
        // 下级会员返点列表
        this.$http({method: 'post',url: this.$store.state.postUrl+'agent/get_back_rebates',data: {'token':this.userToken,'uid':this.userId}})
        .then(res => {
            if(res.data.ret==200){
                this.BackRebatesList = res.data.data;
                const num = this.BackRebatesList.length-1;
                layui.use('slider', function(){
                    var slider = layui.slider;
                    slider.render({
                        elem: '#setUserRebate_number',
                        theme: '#f10320',
                        min: 0,
                        max: num,
                        tips: false,
                        change: function(value){
                            me.sliderValue = Number(me.BackRebatesList[num].percent.replace(/%/,''))+value/10;
                            $('.ratioCtrl_Slider').attr({'data-before':me.BackRebatesList[num].percent.replace(/%/,''),'data-after': me.sliderValue});
                        }
                    });
                });
            }else{
                layer.msg(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
        // 下级会员工资返点列表
        this.$http({method: 'post',url: this.$store.state.postUrl+'agent/get_wage_rebates',data: {'token':this.userToken,'uid':this.userId}})
        .then(res => {
            if(res.data.ret==200){
                this.wageList = res.data.data;
                const num = this.wageList.length-1;
                layui.use('slider', function(){
                    var slider2 = layui.slider;
                    slider2.render({
                        elem: '#setUserRebate_number2',
                        theme: '#f10320',
                        min: 0,
                        max: num,
                        tips: false,
                        change: function(value){
                            let tem = Number(me.wageList[num].percent.replace(/%/,''))+value/10;
                            me.sliderValue2 = tem.toFixed(1);
                            $('.ratioCtrl_Slider2').attr({'data-before':Math.round(me.wageList[num].percent.replace(/%/,'')*100)/100,'data-after': me.sliderValue2});
                        }
                    });
                });
            }else{
                layer.msg(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        })
    },
}
</script>
<style scoped>
#demo7{background-color: #fff;padding: 0 10px;}
.UserManagement_table_tbody{width: 100%;height: auto;min-height: 200px;display: block;}
.addlist{width: 100%;height: auto;}
</style>