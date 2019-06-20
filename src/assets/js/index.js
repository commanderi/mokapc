// 该js文件index页面专用
var username = $('.username'),
    userpassword = $('.userpassword'),
    userpasswordS = $('.userpasswordS'),
    securityCodeNumber = $('.securityCodeNumber'),
    userTel = $('.userTel'),
    regInvitationCode = $('.regInvitationCode');
    logIn_input_userName = $('.logIn_input').eq(0);
    logIn_input_userPwd = $('.logIn_input').eq(1);
    logIn_input_userCode = $('.logIn_input').eq(2);
$('.go_login').on('click',function(){
    $('.registered_mask').removeClass('scale_1').siblings('.logIn_mask').addClass('scale_1');
});
$('.lf_zuce').on('click',function(){
    $('.logIn_mask').removeClass('scale_1').siblings('.registered_mask').addClass('scale_1');
});
$('.header_logIn').on('click',function(){
    $('.logIn_mask').addClass('scale_1');
});
$('.registered_close').on('click',function(){
    $('.registered_mask,.logIn_mask').removeClass('scale_1');
    $('.registered_con_p>input,.logIn_input').val('');
    $(username,userpassword,userpasswordS,securityCodeNumber,userTel,regInvitationCode).removeClass('registered_input_error');
});
$('.enrollment').on('click',function(){
    $('.registered_mask').addClass('scale_1');
});
$('.announcement_close').on('click',function(){
    $('.announcement').removeClass('scale_1');
    $('.registered_con_p>input,.logIn_input').val('');
});
$('.announcement_con_left ul li').on('click',function(){
    var num = $(this).index();
    if(!$(this).hasClass('clickMe')){
        $(this).addClass('clickMe').siblings('li').removeClass('clickMe');
        var y = $('.announcement_con_right').children('div');
        for(var i=0;i<y.length;i++){
            if(num==i){
                $('.announcement_con_right').children('div').eq(i).addClass('im_show').siblings('div').removeClass('im_show');
            }
        }
    }
});
$('.colse').click(function(){
    $('aside').hide();
})
$('.protocol_btn').click(function(){
    if($(this).attr('data-act')==1){
        $(this).removeClass('protocol_yes').attr('data-act','0');
        var t = $('.registeredBtn').attr('disabled')
        console.log(t)
    }else{
        $(this).addClass('protocol_yes').attr('data-act','1');
    }
})