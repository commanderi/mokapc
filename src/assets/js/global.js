// 该js文件全局通用

// 验证手机号
function isPhone(s){
    if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(s))){
        return false; 
    }else{
        return true;
    }
};
export{
    isPhone
}
//校验登录名：只能输入4-11个以字母开头、可带数字、“_”、“.”的字串
function isRegisterUserName(s){
    var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){3,10}$/;
    if (!patrn.exec(s)){
        return false
    }else{
        return true
    }
};
export{
    isRegisterUserName
}
// 获取今天的日期
function thisDay(){
    var now = new Date();
    if(now.getMonth()+1 < 10){
        return now.getFullYear()+"-" + '0'+(now.getMonth()+1) + "-" + now.getDate();
    }else{
        return now.getFullYear()+"-" + (now.getMonth()+1) + "-" + now.getDate();
    }
};
export{
    thisDay
}
// 整合时间
function formatTime(number,format){
    var formateArr  = ['Y','M','D','h','m','s'];
    var returnArr   = [];
    var date = new Date(number * 1000);
    returnArr.push(date.getFullYear());
    returnArr.push(formatNumber(date.getMonth() + 1));
    returnArr.push(formatNumber(date.getDate()));
    returnArr.push(formatNumber(date.getHours()));
    returnArr.push(formatNumber(date.getMinutes()));
    returnArr.push(formatNumber(date.getSeconds()));
    for (var i in returnArr){
        format = format.replace(formateArr[i], returnArr[i]);
    }
    return format;
};
export{
    formatTime
}
//数据转化  
function formatNumber(n){  
    n = n.toString();
    return n[1] ? n : '0' + n;
};
//判断字符是否为空的方法
function isEmpty(v){
    switch (typeof v) {
        case 'undefined':
            return false;
        case 'string':
            if (v.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return false;
            break;
        case 'boolean':
            if (!v) return false;
            break;
        case 'number':
            if (0 === v || isNaN(v)) return false;
            break;
        case 'object':
            if (null === v || v.length === 0) return false;
            for (var i in v) {
                return true;
            }
            return false;
        }
    return true;
};
export{
    isEmpty
}
//校验密码：只能输入6-15个字母、数字、下划线  
function isPasswd(s){
    var patrn=/^(\w){6,15}$/;
    if(!patrn.exec(s)){
        return false
    }else{
        return true
    }
};
export{
    isPasswd
}
// 提示信息 
function msg(text,time=1000) {
    $('.msg').remove();
    if(text=='') return;
    var lf_html = '<div class="msg" style="width:100%;height:100%;position:fixed;top:0;left:0;z-index:99999"><div style="width:auto;height:auto;text-align:center;background:rgba(0,0,0,0.7);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);-o-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-moz-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);color:#fff;padding:20px 30px;border-radius:4px;">' + text + '</div></div>';
    $('body').append(lf_html);
    setTimeout(function(){
        $('body .msg').animate({ 'opacity': '0' }, 900, function () {
            $('body .msg').remove();
        });
    },time)
};
