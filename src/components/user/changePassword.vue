<template>
    <!-- 修改密码 -->
    <div class="changePassword">
        <div class="changePasswordContant">
            <p class="user_h">修改登录密码</p>
            <div class="bankCard_input_box clear">
                <div class="RadioUserType clear">
                    <p class="RadioUserType_title">密码类别</p>
                    <button class="RadioUserType_btn" v-on:click="qiehuan(0)" :class="{RadioUserType_this:showOrhide==0}">
                        <i class="iconfont" v-bind:class="showOrhide==0 ? 'icon-zu' : 'icon-weixuanzhong'"></i>
                        <span>登录密码</span>
                    </button>
                    <button class="RadioUserType_btn" v-on:click="qiehuan(1)" :class="{RadioUserType_this:showOrhide==1}">
                        <i class="iconfont" v-bind:class="showOrhide==1 ? 'icon-zu' : 'icon-weixuanzhong'"></i>
                        <span>提现密码</span>
                    </button>
                </div>
            </div>
            <div v-show="showOrhide==0">
                <div class="bankCard_input_box">
                    <h6>旧密码</h6>
                    <input max="12" min="6" maxlength="12" pattern="^[A-Za-z0-9]\w{5,13}$" placeholder="请输入字母和数字组成的6-12个字符" type="password" autocomplete="no" class="bankCardName" v-model="oldPwd">
                </div>
                <div class="bankCard_input_box">
                    <h6>新密码</h6>
                    <input max="12" min="6" maxlength="12" pattern="^[A-Za-z0-9]\w{5,13}$" placeholder="请输入字母和数字组成的6-12个字符" type="password" autocomplete="no" class="bankCardName" v-model="newPwd1">
                </div>
                <div class="bankCard_input_box">
                    <h6>确认新密码</h6>
                    <input max="12" min="6" maxlength="12" pattern="^[A-Za-z0-9]\w{5,13}$" placeholder="请输入字母和数字组成的6-12个字符" type="password" autocomplete="no" class="bankCardName" v-model="newPwd2">
                </div>
            </div>
            <div v-show="showOrhide==1">
                <div class="bankCard_input_box">
                    <h6>提现密码</h6>
                    <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" placeholder="----" type="password" class="bankCardName WPwd" v-model="oldWPwd" autocomplete="no" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
                <div class="bankCard_input_box">
                    <h6>新密码</h6>
                    <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" placeholder="----" type="password" class="bankCardName WPwd" v-model="newWPwd1" autocomplete="no" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
                <div class="bankCard_input_box">
                    <h6>确认新密码</h6>
                    <input max="4" min="1" maxlength="4" pattern="^[0-9]\w{1,5}$" placeholder="----" type="password" class="bankCardName WPwd" v-model="newWPwd2" autocomplete="no" onkeyup="value=value.replace(/[^0-9]/g,'')" onpaste="value=value.replace(/[^0-9]/g,'')" oncontextmenu="value=value.replace(/[^0-9]/g,'')">
                </div>
            </div>
            <p class="CreateNewUser_bottom_p">
                <button class="cancelCreateNewUser_btn" v-on:click="resetPwd">重置</button>
                <button class="CreateNewUser_btn" v-on:click="changePassword">{{ showOrhide==0 ? '更新登录密码' : '更新提现密码' }}</button>
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'changePassword',
    data () {
        return {
            userId:null,
            userToken:null,
            showOrhide:0,
            oldPwd:null,
            newPwd1:null,
            newPwd2:null,
            oldWPwd:null,
            newWPwd1:null,
            newWPwd2:null,
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
        resetPwd:function(){
            if(this.showOrhide==0){
                this.oldPwd = null;
                this.newPwd1 = null;
                this.newPwd2 = null;
            }else{
                this.oldWPwd = null;
                this.newWPwd1 = null;
                this.newWPwd2 = null;
            }
        },
        qiehuan:function(num){
            this.showOrhide = num;
        },
        changePassword:function(){
            if(this.showOrhide===0){
                // 修改登录密码
                if(this.oldPwd=='' || this.newPwd1=='' || this.newPwd2==''){
                    layer.msg('密码不能为空');
                    return
                }else if(this.oldPwd=='' || this.oldPwd==null){
                    layer.msg('请输入输入旧密码');
                    return
                }else if(this.newPwd1=='' || this.newPwd1==null || this.newPwd2=='' || this.newPwd2==null){
                    layer.msg('密码不能为空');
                    return
                }else if(this.newPwd1!==this.newPwd2){
                    layer.msg('密码输入不一致,请重新输入');
                    this.newPwd2 = null;
                    return
                }else{
                    
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'personal/modify_login_password',
                        data: {'token':this.userToken,'uid':this.userId,'old_password':this.oldPwd,'new_password1':this.newPwd1,'new_password2':this.newPwd2}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            layer.msg(res.data.msg);
                            this.resetPwd();
                        }else{
                            layer.msg(res.data.msg);
                        }
                        layer.closeAll('loading');
                    })
                    .catch(err => {
                        console.log(err);
                        layer.closeAll('loading');
                    })
                }
            }else{
                // 修改提现密码
                if(this.oldWPwd=='' || this.newWPwd1=='' || this.newWPwd2==''){
                    layer.msg('密码不能为空');
                    return
                }else if(this.oldWPwd=='' || this.oldWPwd==null){
                    layer.msg('请输入输入旧提现密码');
                    return
                }else if(this.newWPwd1=='' || this.newWPwd1==null || this.newWPwd2=='' || this.newWPwd2==null){
                    layer.msg('密码不能为空');
                    return
                }else if(this.newWPwd1!==this.newWPwd2){
                    layer.msg('密码输入不一致,请重新输入');
                    this.newWPwd2 = null;
                    return
                }else{
                    layer.open({type:3});
                    this.$http({
                        method: 'post',
                        url: this.$store.state.postUrl+'personal/modify_money_password',
                        data: {'token':this.userToken,'uid':this.userId,'old_password':this.oldWPwd,'new_password1':this.newWPwd1,'new_password2':this.newWPwd2}
                    })
                    .then(res => {
                        if(res.data.ret==200){
                            layer.msg(res.data.msg);
                            this.resetPwd();
                        }else{
                            layer.msg(res.data.msg);
                        }
                        layer.closeAll('loading');
                    })
                    .catch(err => {
                        console.log(err);
                        layer.closeAll('loading');
                    })
                }
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
                
            }
        }
    },
}
</script>
