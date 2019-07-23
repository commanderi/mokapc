<template>
    <!-- 左侧面包屑 -->
    <aside v-show="downloadQrcodeStatus">
        <div class="breadCrumbs">
            <div class="breadCrumbs_shiwan">
                <a v-on:click="getKefu">
                    <span><img src="../assets/img/shiwan@2x.png" alt=""></span>
                    <b>在线客服</b>
                </a>
            </div>
            <div class="breadCrumbs_help">
                <router-link to="/help">
                    <span><img src="../assets/img/help@2x.png" alt=""></span>
                    <b>帮助中心</b>
                </router-link>
            </div>
            <div class="ios_QRcode">
                <!-- <img src="../assets/img/24cf25.png"> -->
                <img src="../assets/img/qrCode.png">
            </div>
            <p class="dow_font">扫码下载</p>
            <div class="colse" v-on:click="colsedownloadQrcode"></div>
        </div>
    </aside>
</template>

<script>
export default {
    name: 'index',
    data () {
        return {
            downloadQrcodeStatus:true
        }
    },
    methods:{
        colsedownloadQrcode:function(){
            this.downloadQrcodeStatus = false
        },
        getKefu:function(){
            this.$http({
                method: 'post',
                url: this.$store.state.postUrl+'login/get_kefu',
                data: {'token':this.userToken,'uid':this.userId}
            })
            .then(res => {
                if(res.data.ret==200){
                    window.open(res.data.data.kefu);
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
        let me = this;
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
    }
}
</script>
<style scoped>
.breadCrumbs_shiwan>a{
    cursor: pointer;
}
</style>

