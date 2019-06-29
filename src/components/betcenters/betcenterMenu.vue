<template>
    <div class="betcenterMenu">
        <div class="menuItem" @click="allLottery">
            <button class="subMenuItem subMenuItemAll clear">
                <img class="menuBtnIcon" src="../../assets/img/15704.png">
                <span class="cai_font">全部彩种</span>
            </button>
        </div>
        <!-- 热门游戏 -->
        <div class="menuItem">
            <button class="subMenuItem subMenuItemParent clear" @click="clickMenuParent($event)" @click.stop>
                <img class="menuBtnIcon" src="../../assets/img/15705.png">
                <span class="cai_font">热门游戏</span>
                <i class="iconfont icon-xiala lf_jian"></i>
            </button>
            <div class="subMenus subMenus_1">
                <template v-for="(item,index) in catesData">
                <button class="subMenuItem subMenuItemChild clear" v-if="item.is_hot==1" :dataNum="item.id" v-on:click="getSpecifiOddsc(item.id,item.cate_img,item.name)" :key="index">
                    <img class="menuBtnIcon" :src="item.cate_img">
                    <span class="cai_font">{{ item.name }}</span>
                </button>
                </template>
            </div>
        </div>
        <!-- PK10 -->
        <div class="menuItem">
            <button class="subMenuItem subMenuItemParent clear" @click="clickMenuParent($event)" @click.stop>
                <img class="menuBtnIcon" src="../../assets/img/20190325162822.png">
                <span class="cai_font">PK10</span>
                <i class="iconfont icon-xiala lf_jian"></i>
            </button>
            <div class="subMenus subMenus_2">
                <template v-for="(item,index) in catesData">
                <button class="subMenuItem subMenuItemChild clear" v-if="item.kind=='PK10'" :dataNum="item.id" v-on:click="getSpecifiOddsc(item.id,item.cate_img,item.name)" :key="index">
                    <img class="menuBtnIcon" :src="item.cate_img">
                    <span class="cai_font">{{ item.name }}</span>
                </button>
                </template>
            </div>
        </div>
        <!-- 时时彩 -->
        <div class="menuItem">
            <button class="subMenuItem subMenuItemParent clear" @click="clickMenuParent($event)" @click.stop>
                <img class="menuBtnIcon" src="../../assets/img/20190325162814.png">
                <span class="cai_font">时时彩</span>
                <i class="iconfont icon-xiala lf_jian"></i>
            </button>
            <div class="subMenus subMenus_3">
                <template  v-for="(item,index) in catesData">
                <button class="subMenuItem subMenuItemChild clear" v-if="item.kind=='SSC'" :dataNum="item.id" v-on:click="getSpecifiOddsc(item.id,item.cate_img,item.name)" :key="index">
                    <img class="menuBtnIcon" :src="item.cate_img">
                    <span class="cai_font">{{ item.name }}</span>
                </button>
                </template>
            </div>
        </div>
        <div class="menuItem">
            <router-link to="/gameRules">
                <button class="subMenuItem subMenuItemOther clear">
                    <img class="menuBtnIcon" src="../../assets/img/15700.png">
                    <span class="cai_font">玩法说明</span>
                </button>
            </router-link>
        </div>
        <div class="menuItem">
            <router-link to="/promotions">
                <button class="subMenuItem subMenuItemOther clear">
                    <img class="menuBtnIcon" src="../../assets/img/15702.png">
                    <span class="cai_font">优惠活动</span>
                </button>
            </router-link>
        </div>
        <div class="menuItem">
            <router-link to="/lotteryInformation">
                <button class="subMenuItem subMenuItemOther clear" >
                    <img class="menuBtnIcon" src="../../assets/img/15701.png">
                    <span class="cai_font">开奖公告</span>
                </button>
            </router-link>
        </div>
        <!-- <div class="menuItem">
            <button class="subMenuItem subMenuItemOther clear">
                <img class="menuBtnIcon" src="../../assets/img/15703.png">
                <span class="cai_font">走势图表</span>
            </button>
        </div> -->
    </div>
</template>
<script>
export default {
    name:'betcenterMenu',
    data(){
        return {
            catesData:null, // 左侧菜单所有彩种的数据
            userToken:null,
            userId:null,
        }
    },
    methods:{
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
                        // 下面是将彩种数据与当前id传递到betcenterContent组件
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
        // 全部彩种
        allLottery:function(){
            this.$emit("controlHot",true);
        },
        // 主彩种点击事件
        clickMenuParent:function(e){
            let len = $(e.currentTarget).parents('.menuItem').siblings();
            for(var i=0;i<len.length;i++){
                if($(len).eq(i).children('.subMenus').is('.subMenus_x')){
                    $(len).eq(i).children('.subMenus').removeClass('subMenus_x')
                }
            }
            if($(e.currentTarget).next('.subMenus').is('.subMenus_x')){
                $(e.currentTarget).next('.subMenus').removeClass('subMenus_x');
            }else{
                $(e.currentTarget).next('.subMenus').addClass('subMenus_x');
            }
        }
    },
    mounted(){
        getuserIdToken:{
            this.userId = localStorage.getItem('userId');
            this.userToken = localStorage.getItem('userToken');
            if(this.userId==null || this.userId==undefined){
                layer.msg('没有获取到您的用户id,请重新登录重试',function(){
                    window.location.href = 'http://www.vs04o.cn';
                });
                return
            }else if(this.userToken==null || this.userToken==undefined){
                layer.msg('没有获取到您的用户token,请重新登录重试',function(){
                    window.location.href = 'http://www.vs04o.cn';
                });
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
    .menuItem{position: relative;width: 100%;height: auto;transition: color .25s cubic-bezier(.4,0,.2,1);}
    .subMenuItem{width: 100%;height: 52px;display: block;font-size: inherit;background-color: #b60000;color: #fff;overflow: hidden;padding: 0 1rem;text-align: left;transition: padding .2s cubic-bezier(.4,0,.2,1);border: none;cursor: pointer;transition: 0.2s; -o-transition: 0.2s; -ms-transition: 0.2s; -moz-transition: 0.2s; -webkit-transition: 0.2s;}
    .subMenuItem:hover{color: #feb505;}
    .subMenuItem:before{background-color: hsla(0,0%,100%,.25);content: "";height: 1px;left: 1rem;position: absolute;right: 1rem;width: auto;}
    .menuBtnIcon{width: 26px;height: 26px;margin: 13px 8px;float: left;}
    .cai_font{line-height: 52px;display: block;padding-left: 10px;float: left;font-family: initial;}
    .lf_jian{display: block;position: absolute;right: 1rem;top: 14.5px;bottom: 14px;font-size: 1.25rem;transition-duration: .25s;transition-timing-function: cubic-bezier(.4,0,.2,1);}
    .subMenuItemAll{background-color: #f20320;}
    .subMenuItemAll:before{background-color: none;content: "";height: 0px;left: 1rem;position: absolute;right: 1rem;width: auto;}
    .subMenuItemOther{background-color: #f20320;}
    .subMenuItemOther:hover{background-color: #b60000;}
    .subMenus{width: 100%;height: 0px;overflow: hidden;transition: height 500ms;}
    .subMenus_x{height: auto;max-height: 1000px;}
    .subMenuItemChild{background-color: #f20320;color: #fff;}
    .subMenuItemChild:before{background-color: none;content: "";height: 0px;left: 1rem;position: absolute;right: 1rem;width: auto;}
    .subMenuItemChild:hover{background-color: #b60000;color: #feb505;border-left: 4px solid #ff584b;}
    /* .subMenus_1{height: 624px;}
    .subMenus_2{height: 260px;}
    .subMenus_3{height: 156px;}
    .subMenus_4{height: 104px;}
    .subMenus_5{height: 104px;} */
</style>

