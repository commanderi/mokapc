<template>
    <!-- 游戏规则 -->
    <div class="main">
        <div class="con">
            <!-- 顶部的登录状态 -->
            <app-head ref="loginMaskChuan"></app-head>
            <!-- 主导航 -->
            <app-nav></app-nav>
            <div class="gameRules clear">
                <div class="gameRules_left">
                    <ul>
                        <!-- im_Selected -->
                        <template v-if="catesData!==null">
                            <li v-for="(d,i) in catesData" :key="i" v-on:click="lolme(d)" :class="{im_Selected:thisMe==d.id}">{{ d.name }}</li>
                        </template>
                    </ul>
                </div>
                <div class="gameRules_right">
                    <!-- <section>
                        <p class="gameRules_Titie"><span>幸运飞艇</span><span>游戏规则</span></p>
                        <p class="gameRules_TitieNav">
                            <span>快捷导航：</span>
                            <a v-on:click="tiao(9)">冠亚和值</a>
                            <a v-on:click="tiao(8)">大小单双</a>
                            <a v-on:click="tiao(4)">前三</a>
                            <a v-on:click="tiao(3)">前二</a>
                            <a v-on:click="tiao(2)">前一</a>
                            <a v-on:click="tiao(5)">后一</a>
                            <a v-on:click="tiao(6)">后二</a>
                            <a v-on:click="tiao(7)">后三</a>
                            <a v-on:click="tiao(1)">定位胆</a>
                        </p>
                        <p class="gameRules_Titie_jianjie">一、简介</p>
                        <p class="gameRules_Titie_jianjiefont">幸运飞艇是马耳他共和国瓦莱塔福利联合委员会独家发行的一款高频彩，其源于F1赛艇的彩票游戏，游戏由十架飞艇作为开奖号码，按照艇号到达终点的先后依次排名1-10，第一架到达终点的飞艇为冠军，第二架到达终点的飞艇为亚军，以此类推，直到第十架到达终点的飞艇为第十名，这10个位置和对应的艇号组成当期中奖号码（如下图）。</p>
                        <div class="gameRules_img"><img src="../assets/img/pk10.png"></div>
                        <p class="gameRules_Titie_jianjie">二、购彩方式</p>
                        <p class="gameRules_Titie_jianjiefont">1) 用户可通过本站投注，对选定的号码进行投注，或返点投注，返点越高投注赔率则越低。单注金额1元。</p>
                        <p class="gameRules_Titie_jianjiefont">2) 用户可选择机选号码投注和自选号码投注。机选号码投注是指对投注机随机产生号码进行投注，自选号码投注是指将用户选定的号码输入投注机进行投注。</p>
                        <p class="gameRules_Titie_jianjiefont">3) 追号：追号指将一注或一组号码进行两期或两期以上的投注。追号可分为连续追号和间隔追号，连续追号指追号的期数是连续的，间隔追号指追号的期数不连续。</p>
                        <p class="gameRules_Titie_jianjie">三、开奖及返奖</p>
                        <p class="gameRules_Titie_jianjiefont">1）开奖</p>
                        <table class="metable">
                            <thead>
                                <tr class="meheader">
                                    <th>彩种名称</th>
                                    <th>开奖时间</th>
                                    <th>每日期数</th>
                                    <th>开奖频率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan="2">幸运飞艇</td>
                                    <td>13:09～24:00(北京时间)</td>
                                    <td>001～131</td>
                                    <td rowspan="2">每5分钟</td>
                                </tr>
                                <tr>
                                    <td>00:05-04:04(北京时间)</td>
                                    <td>132～180</td>
                                </tr>
                            </tbody>
                        </table>
                        <p class="gameRules_Titie_jianjiefont">2）返奖：奖金自动返还至用户在本站账户中，可继续投注或提款，永无弃奖。</p>
                        <p class="gameRules_Titie_jianjie">四、玩法说明</p>
                        <div class="gameRulescon" id="comeon1">
                            <p>1、定位胆</p>
                            <p>从第一名（冠军）到第十名任意位置上选1个艇号组成1注，所选投注组合与相同位置上的开奖号码一致，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">01</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon2">
                            <p>2、前一</p>
                            <p>从第一名（冠军）位置上选1个艇号组成1注，所选投注组合与相同位置上的开奖号码相同，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">01</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon3">
                            <p>3、前二</p>
                            <p>从第一名（冠军）、第二名（亚军）位置上各选1个艇号组成1注，所选投注组合与相同位置上的开奖号码全部相同，且顺序一致，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">01 02</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon4">
                            <p>4、前三</p>
                            <p>从第一名（冠军）、第二名（亚军）和第三名（季军）位置上各选1个艇号组成1注，所选投注组合与相同位置上的开奖号码全部相同，且顺序一致，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">01 02 03</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon5">
                            <p>5、后一</p>
                            <p>从第十名位置上选1个艇号组成1注，所选投注组合与相同位置上的开奖号码相同，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">10</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon6">
                            <p>6、后二</p>
                            <p>从第九名、第十名位置上各选1个艇号组成1注，所选投注组合与相同位置上的开奖号码全部相同，且顺序一致，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">09 10</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon7">
                            <p>7、后三</p>
                            <p>从第八名、第九名和第十名位置上各选1个艇号组成1注，所选投注组合与相同位置上的开奖号码全部相同，且顺序一致，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">08 09 10</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon8">
                            <p>8、大小单双</p>
                            <p>大：06～10，小：01～05；单：01,03,05,07,09，双：02,04,06,08,10。</p>
                            <p><1>  第一名、第二名、第三名、第四名、第五名</p>
                            <p>从“大、小、单、双”中选择1个组成1注，对第一名（冠军）位置的“大、小、单、双”型态进行购买，所选型态与相同位置的开奖号码的型态一致，视为中奖。</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>&emsp;&emsp;选号：<span class="mered">小</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p><br>
                            <p><2>  第六名、第七名、第八名、第九名、第十名</p>
                            <p>从“大、小、单、双”中选择1个组成1注，对第一名（冠军）位置的“大、小、单、双”型态进行购买，所选型态与相同位置的开奖号码的型态一致，视为中奖。</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>&emsp;&emsp;选号：<span class="mered">大</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p><br>
                            <p><3>  冠亚和</p>
                            <p>冠亚和大：12～19，冠亚和小：3～11；冠亚和单：3,5,7,9,11,13,15,17,19，冠亚和双：4,6,8,10,12,14,16,18。</p>
                            <p>冠亚和-大单：13,15,17,19；冠亚和-大双：12,14,16,18；</p>
                            <p>冠亚和-小双：4,6,8,10；冠亚和-小单：3,5,7,9,11。</p>
                            <p>从“大、小、单、双、大单、大双、小单、小双”中选择1个组成1注，对和值位置的“大、小、单、双、大单、大双、小单、小双”型态进行购买，所选型态与开奖号码相同位置的号码相加的和值的型态一致，视为中奖。</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>&emsp;&emsp;选号：<span class="mered">小单</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                        <div class="gameRulescon" id="comeon9">
                            <p>9、冠亚和值</p>
                            <p>从3～19中选1个和值号码组成1注，所选和值号码与开奖号码的第一（冠军）位艇号、第二（亚军）位艇号相加的和值相同，视为中奖。例：</p>
                            <p>位置：第一名</p>
                            <p>开奖号码：<span class="mered">01 02 03 04 05 06 07 08 09 10</span></p>
                            <p>投注号码：<span class="mered">03</span></p>
                            <p>&emsp;&emsp;状态：<span class="mered">中奖</span></p>
                        </div>
                    </section> -->
                    <template v-if="fontData!=null">
                        <div v-html="fontData.play_rule">
                            {{ fontData.play_rule }}
                        </div>
                    </template>
                </div>
            </div>
            <!-- 全局底部 -->
            <app-footer></app-footer>
            <!-- 注册遮罩 -->
            <registered-mask></registered-mask>
            <!-- 登录遮罩 -->
            <login-mask v-on:priceChange='priceChange'></login-mask>
            <!-- 用户中心 -->
            <user v-if="this.$store.state.AppUserStatus"></user>
        </div>
    </div>
</template>
<script>
import registeredMask from './registered_mask'
import logInMask from './logIn_mask'
import user from './user'
export default {
    name: 'gameRules',
    data () {
        return {
            Registeredmask:false,
            logInmask:false,
            userStatus:this.$store.state.AppUserStatus,
            catesData:null,
            thisMe:null,
            itemData:null,
            fontData:null,
        }
    },
    // html加载完成之前执行,执行顺序：父组件-子组件
    created(){},
    // computed是计算属性，也就是依赖其它的属性计算所得出最后的值
    computed:{},
    // components是声明组件
    components:{
        'registered-mask':registeredMask,
        'login-mask':logInMask,
        'user':user
    },
    // watch是去监听一个值的变化，然后执行相对应的函数
    watch:{},
    // 事件方法执行
    methods:{
        priceChange:function(){
            this.$refs.loginMaskChuan.showAndhide();
        },
        lolme:function(data){
            this.thisMe = data.id;
            this.get_play_rule(data.id);
        },
        tiao:function(n){
            $('html,body').animate({scrollTop: $('#comeon'+n).offset().top}, 800)
        },
        get_lottery_odds:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'lottery/get_lottery_odds',
                data: {'cate':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.itemData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        get_play_rule:function(id){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_play_rule',
                data: {'cate':id}
            })
            .then(res => {
                if(res.data.ret==200){
                    console.log(res.data.data);
                    this.fontData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    // html加载完成之后执行
    mounted(){
        layui.use('layer', function(){
            var layer = layui.layer;
        });
        // 获取全部彩种
        getCates:{
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'index/get_cates',
                data: {}
            })
            .then(res => {
                if(res.data.ret==200){
                    this.catesData = res.data.data;
                }else{
                    layer.msg(res.data.msg);
                }
            })
            .catch(err => {
                console.log(err);
            })
        };
        this.get_play_rule(3);
    }
}
</script>
<style scoped>
.metable{width: 100%;height: auto;border: 1px solid #ccc;}
.metable>thead>tr{border-bottom: 1px solid #ccc;line-height: 35px;background-color: #e2efd9;font-weight: 100;color: #444;}
.metable>tbody>tr{line-height: 30px;text-align: center}
/* .metable>tbody>tr>td:first-child{border-left: 1px solid #ccc;border-right: 1px solid #ccc;} */
/* .metable>tbody>tr>td:last-child{border-right: 1px solid #ccc;border-left: 1px solid #ccc;} */
.mered{color: #f20320}
.gameRulescon>p{color: #444;font-size: 12px;font-family: "SimSun";font-weight: 300;line-height: 1.7;margin: 5px 0;}
.gameRulescon>p:nth-of-type(1){font-family: "SimSun";font-size: 13px;color: #444444;padding: 10px 0;font-weight: bold;}
.gameRulescon{margin-top: 20px}


</style>

