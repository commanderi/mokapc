<template>
    <div class="main">
        <div class="con">
            <!-- 顶部的登录状态 -->
            <app-head ref="loginMaskChuan"></app-head>
            <!-- 主导航 -->
            <app-nav></app-nav>
        </div>
        <section>
            <div class="help_con_title">
                <router-link to="/">首页</router-link>
                <i>></i>
                <a>帮助中心</a>
            </div>
            <div class="help_con clear">
                <div class="help_con_left">
                    <ul>
                        <li v-on:click="qie(0,'新手指南')" :id="lookme==0 ? 'thisColor' : ''">新手指南</li>
                        <li v-on:click="qie(1,'充值购彩')" :id="lookme==1 ? 'thisColor' : ''">充值购彩</li>
                        <li v-on:click="qie(2,'兑奖提款')" :id="lookme==2 ? 'thisColor' : ''">兑奖提款</li>
                        <li v-on:click="qie(3,'其他问题')" :id="lookme==3 ? 'thisColor' : ''">其他问题</li>
                    </ul>
                </div>
                <div class="help_con_right">
                    <div class="layui-col-md12">
                        <div class="layui-card">
                            <div class="layui-card-header">{{ headText }}</div>
                            <div class="layui-card-body">
                                <div class="layui-collapse" v-show="lookme==0" lay-accordion="0">
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">1. 如何注册成为会员</h2>
                                        <div class="layui-colla-content">
                                            · 用户进入彩票网站首页，在首页右侧点击"注册"，进入用户注册页面。 <br>
                                            · 在注册页面阅读并同意《彩票网络服务协议》。 <br>
                                            · 在注册页面填写相关信息并提交。 <br>
                                            · 系统返回成功信息，恭喜注册成功。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">2. 在彩票网站注册要收费吗</h2>
                                        <div class="layui-colla-content">
                                            · 注册新用户是免费的，不收取任何费用。<br>
                                            · 新会员下载APP实名注册，并绑定提款银行卡，可领取28元彩金，盈利到100元即可提款，不充值也可赚钱。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">3. 如何进行账户充值</h2>
                                        <div class="layui-colla-content">
                                            本站提供多种便捷的充值方式供您选择，包括：微信扫码支付、微信转账支付、支付宝扫码支付、支付宝转账支付、第三方在线支付，通过微信、支付宝、网银/手机银行转账支付。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">4. 实名注册后绑定银行卡</h2>
                                        <div class="layui-colla-content">
                                            为了不影响您的充值、投注和提款，注册后须在用户中心绑定银行卡，提交用户真实姓名，设置提款密码。
                                        </div>
                                    </div>
                                </div>
                                <div class="layui-collapse" v-show="lookme==1" lay-accordion="1">
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">1. 什么是标准投注</h2>
                                        <div class="layui-colla-content">
                                            标准投注包括单式投注和复式投注
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">2. 什么是单式投注</h2>
                                        <div class="layui-colla-content">
                                            单式投注即用户选择一注号码进行投注。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">3. 什么是复式投注</h2>
                                        <div class="layui-colla-content">
                                            复式投注即用户将两注以上号码的组合方式作为一组投注号码同时投注
                                        </div>
                                    </div>
                                </div>
                                <div class="layui-collapse" v-show="lookme==2" lay-accordion="2">
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">1. 提款金额有没有限制</h2>
                                        <div class="layui-colla-content">
                                            本站单笔单次提款最低金额为10元起，无最高提款额度限制。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">2. 提款次数有没有限制</h2>
                                        <div class="layui-colla-content">
                                            本站符合申请出款规则即可提款，次数无上限。单笔提款10元起，金额无上限。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">3. 提款不成功怎么办</h2>
                                        <div class="layui-colla-content">
                                            · 提款申请未成功：<br>
                                            1、提款金额大于账户实有金额。<br>
                                            2、提款时填写的提款密码与用账户信息设置的提款密码不一致。<br>
                                            3、银行卡信息不符合规定格式。<br>
                                            · 申请提款成功，但款项没有到达指定账户：<br>
                                            1、银行卡卡号填写错误，与用户姓名不符，银行退单。<br>
                                            一旦发生上述现象，请及时联系24小时在线客服或QQ客服，由客服人员协助您完成提款。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">4. 使用网上银行安全吗</h2>
                                        <div class="layui-colla-content">
                                            用户在本站充值时选择任一银行卡支付通道后立即进入银行网关，银行卡资料全部在银行网关加密页面上填写，资料提交过程全部采用国际通用的SSL或SET及数字证书进行加密传输，安全性由银行全面提供支持和保护，各银行网上支付系统对网上支付的安全提供保障。
                                        </div>
                                    </div>
                                </div>
                                <div class="layui-collapse" v-show="lookme==3" lay-accordion="3">
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">1. 如何保障账号安全</h2>
                                        <div class="layui-colla-content">
                                            . 首次获得平台账户之后，请修改初始登录密码并设定账户提款密码，同时绑定您需要用来充值或者提款的银行账号信息；<br>
                                            . 妥善保管您的登录密码和提款密码，平时切勿相信他人以任何理由索要平台账户的登录密码及提款密码以及密保信息， 定期对电脑进行安全检查，避免电脑中病毒和木马导致账户被盗；<br>
                                            . 用户输入密码错误超过5次，平台处于对用户账号的安全考虑将临时冻结，需联系客服或上级处理；
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">2. 网上投注如何保障彩民利益</h2>
                                        <div class="layui-colla-content">
                                            · 自动返奖："自动兑奖，自动返奖"，所有奖金均由网站系统自动开兑并自动返还到用户的账户中。<br>
                                            · 公开查询：用户可以查询自己的投注记录、中奖记录以及资金明细记录，一切做到有据可查，数据公开。<br>
                                            · 数据安全：投注数据及相关资料时时备份，网络系统独立设置、隔离并安装有大型硬、软防火墙，安全级别高，确保数据绝对安全。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">3. 网上投注优势是什么</h2>
                                        <div class="layui-colla-content">
                                            · 安全便捷：安全、方便、快捷，足不出户，轻松购彩。<br>
                                            · 永无弃奖：大奖人工通知并自动返还，小奖自动返还。<br>
                                            · 随时随地：无地域限制，除开奖时间外24小时投注。<br>
                                            · 信息服务：提供全方位、多样化的彩票信息服务。
                                        </div>
                                    </div>
                                    <div class="layui-colla-item">
                                        <h2 class="layui-colla-title">4. 如何查看是否中奖</h2>
                                        <div class="layui-colla-content">
                                            登录后，点击首页右下角的【我的】，点击投注记录，然后勾选"奖金派送"，即可查看中奖记录。
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <user v-if="this.$store.state.AppUserStatus"></user>
        <!-- 全局底部 -->
        <app-footer></app-footer>
        <!-- 登录 -->
        <login-mask v-on:priceChange='priceChange'></login-mask>
        <!-- 注册 -->
        <registered-mask></registered-mask>
    </div>
</template>
<script>
import logInMask from './logIn_mask'
import registeredMask from './registered_mask'
import user from './user'
export default{
    name:'help',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            lookme:0,
            headText:'新手指南',
        }
    },
    // html加载完成之前,执行,执行顺序：父组件-子组件
    created(){},
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{
        // 注册子组件
       'registered-mask':registeredMask,
       'login-mask':logInMask,
       'user':user
    },
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        qie:function(num,text){
            this.lookme = num;
            this.headText = text;
        },
    },
    mounted(){
        layui.use('element', function(){
            var element = layui.element;
        });
    }
}

</script>