<template>
    <!-- 左侧面包屑 -->
    <aside v-show="downloadQrcodeStatus">
        <div class="breadCrumbs">
            <div class="breadCrumbs_shiwan">
                <router-link to="/MobileBetting">
                    <span><img src="../assets/img/shiwan@2x.png" alt=""></span>
                    <b>手机投注</b>
                </router-link>
            </div>
            <div class="breadCrumbs_help">
                <router-link to="/help">
                    <span><img src="../assets/img/help@2x.png" alt=""></span>
                    <b>帮助中心</b>
                </router-link>
            </div>
            <div class="ios_QRcode">
                <img src="../assets/img/24cf25.png" alt="">
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
    }
}
</script>
