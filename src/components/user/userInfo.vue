<template>
    <!-- 基本信息 -->
    <div class="userInfo">
        <div class="userMsg clear">
            <div class="profile_accountNames_1DRO4">
                <span class="profile_accountUserProfile">{{ usermobile }}</span>
                <span class="profile_accountName">{{ usermobile }}</span>
            </div>
            <div class="profile_checkinColumn">
                <span class="profile_checkinIndicate">已签到<strong class="profile_checkinIndicateNumber">{{ signday }}</strong>天</span>
                <button class="profile_checkinBtn" v-on:click="checkIn">
                    <i>{{ usercheckIn==0 ? '今日未签到' : '今日已签到' }}</i>
                    <i class="iconfont icon-qiandao lf_qiandao"></i>
                    <i class="iconfont icon-zan lf_zan"></i>
                </button>
            </div>
        </div>
        <p class="user_h">基本信息</p>
        <div class="userinfo_inputBox">
            <p>真实姓名</p>
            <template v-if="usertruename==null || usertruename==''">
                <input type="text" placeholder="尚未绑定真实姓名" class="binnickname" v-model="usertruename">
            </template>
            <template v-else>
                <input type="text" class="binnickname" v-model="usertruename">
            </template>
        </div>
        <!-- <div class="userinfo_inputBox">
            <p>昵称</p>
            <template v-if="usernickname==null || usernickname==''">
                <input type="text" placeholder="尚未绑定昵称" class="binnickname" v-model="usernickname">
            </template>
            <template v-else>
                <input type="text" class="binnickname" v-model="usernickname">
            </template>
        </div> -->
        <div class="userinfo_inputBox">
            <p>手机号码</p>
            <template v-if="usertel==null || usertel==''">
                <input type="text" max="11" min="0" maxlength="11" placeholder="尚未绑定手机号码" class="binnickname" v-model="usertel">
            </template>
            <template v-else>
                <input type="text" max="11" min="0" maxlength="11" class="binnickname" v-model="usertel">
            </template>
        </div>
        <p class="usercao_btn_p">
            <!-- <button class="binBtn binCancelBtn">取消</button> -->
            <button class="binBtn infobinBtn" v-on:click="changeUserInfo">{{ usertruename!=null || usertel!=null ? '更新基本信息' : '绑定基本信息' }}</button>
        </p>
        <div class="LoginHistory">
            <p class="user_h">登录历史</p>
            <div class="LoginHistoryList_Box">
                <div class="LoginHistoryList_title clear">
                    <div>登录时间</div>
                    <div>登录地点</div>
                </div>
                <div class="LoginHistoryList">
                    <ul>
                        <li class="clear" v-for="(d,i) in loginLogdata" :key="i"><div>{{ new Date(parseInt(d.create_at) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') }}</div><div>{{ d.ip_address }}</div></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {isPhone} from '../../assets/js/global.js'
import {isEmpty} from '../../assets/js/global.js'
// import {isPasswd} from '../../assets/js/global.js'
// import {isRegisterUserName} from '../../assets/js/global.js'
export default {
    name: 'userInfo',
    data () {
        return {
            userId:null,
            userToken:null,
            usercheckIn:null, //是否签到
            signday:0, //签到天数
            usermobile:null, // 用户名
            usertel:null,
            // usernickname:null,
            usertruename:null,
            loginLogdata:null,
            // constantObj:{},
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
        // 获取个人资料
        getMyInfo:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/get_personal_info',
                data: {'token':this.userToken,'uid':this.userId}
                
            })
            .then(res => {
                console.log(res.data)
                if(res.data.ret==200){
                    this.usermobile = res.data.data.mobile;
                    this.usertel = res.data.data.tel;
                    this.signday = res.data.data.sign_day;
                    this.usercheckIn = res.data.data.is_sign_today;
                    this.usertruename = res.data.data.true_name;
                    // this.usernickname = res.data.data.nickname;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 获取个人登录历史
        getLoginLog:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/login_log',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.loginLogdata = res.data.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 签到
        checkIn:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'personal/sign_in',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.usercheckIn = res.data.msg;
                    this.getMyInfo();
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        // 修改用户信息
        changeUserInfo:function(){
            if(!isEmpty(this.usertruename)){
                layer.msg('请输入你的真实姓名');
                return
            }else if(!isPhone(this.usertel)){
                layer.msg('请输入你的手机号码');
                return
            }else{
                this.$http({
                    method: 'post',
                    url: this.$store.state.postUrl+'personal/edit_personal',
                    data: {'token':this.userToken,'uid':this.userId,'true_name':this.usertruename,'tel':this.usertel}
                })
                .then(res => {
                    if(res.data.ret==200){
                        layer.msg(res.data.msg);
                    }else{
                        layer.msg(res.data.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            }
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
                this.getMyInfo();
                this.getLoginLog();
            }
        }
    },
}
</script>

