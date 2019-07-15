// 单选
function singleSelect(e,y,x,me){
    if(me.userArr[y].indexOf(x) === -1){
        me.userArr[y].push(x);
    }else{
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
    }
    switch (me.NavTwo_index) {
        case 91:case 92:
            let nums = 0;
            for (let i = 0; i < 5; i++) {nums += me.userArr[i].length};
            me.bettingInfo.bettingNumber = nums;
        break;
        case 93:
            me.bettingInfo.bettingNumber = me.userArr[y].length;
        break;
        case 94:case 97:case 100:case 102:
            me.bettingInfo.bettingNumber = qian2_3_4_5(me.NavTwo_index,me.userArr);
        break;
        case 96:
            me.bettingInfo.bettingNumber = qianerhz(96,me.userArr);
        break;
        case 99:
            me.bettingInfo.bettingNumber = qianerhz(99,me.userArr);
        break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArr)
};
export{
    singleSelect
}
// 单选(汉字)
function singleSelectChinese(e,y,x,me){
    if(me.userArr[y].indexOf(x) === -1){
        me.userArr[y].push(x);
        me.userArrChinese[y].push(e.target.innerText);
    }else{
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
        me.userArrChinese[y].splice($.inArray(e.target.innerText,me.userArrChinese[y]),1);
    }
    me.bettingInfo.bettingNumber = me.userArrChinese[0].length;
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
};
export{
    singleSelectChinese
}
// 多选
function multipleSelect(e,y,x,me){
    me.userArr[y] = [];
    if(x!=5){
        me.DesignationArr[y].num = x;
        for (let i = 0; i < 10; i++) {
            if(x==0){
                me.userArr[y].push(i+1);
            }else if(x==1 && i>4){
                me.userArr[y].push(i+1);
            }else if(x==2 && i<5){
                me.userArr[y].push(i+1);
            }else if(x==3 && i%2!=0){
                me.userArr[y].push(i);
            }else if(x==4 && i%2==0){
                me.userArr[y].push(i+2);
            }
        }
    }else{
        me.DesignationArr[y].num = null;
    }
    switch (me.NavTwo_index) {
        case 91:case 92:
            let nums = 0;
            for (let i = 0; i < 5; i++) {nums += me.userArr[i].length};
            me.bettingInfo.bettingNumber = nums;
        break;
        case 93:
            me.bettingInfo.bettingNumber = me.userArr[y].length;
        break;
        case 94:case 97:case 100:case 102:
            me.bettingInfo.bettingNumber = qian2_3_4_5(me.NavTwo_index,me.userArr);
        break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArr)
};
export{
    multipleSelect
}
// 处理单式文本域输入值
function getTextareaData(m){
    const me = m.$data;
    switch (me.NavTwo_index) {
        case 95:
            me.userArr = [[],[]];            
        break;
        case 98:
            me.userArr = [[],[],[],[]];            
        break;
        case 101:
            me.userArr = [[],[],[],[]];            
        break;
        case 103:
            me.userArr = [[],[],[],[],[]];            
        break;
        default:
            me.userArr = [];
        break;
    }
    let arr = me.textareaData.split(' ');
    try {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length/2; j++) {
                me.userArr[i][j] = arr[i].slice(j*2,(j*2)+2);
                if(!Number(me.userArr[i][j])){
                    layer.msg('请输入阿拉伯数字或正整数',{time:1600});
                    return
                }
            }
        }
    } catch (error) {
        layer.msg('选择的号码不合法',{time:950});
        return
    }
    me.userArr = spliceBetNumberArr(me.userArr,5);
    // console.log(me.userArr)
    switch (me.NavTwo_index) {
        case 95:
            if(me.userArr.length!=2){
                layer.msg('选择的号码不合法',{time:950});
                return
            }
        break;
        case 98:
            if(me.userArr.length!=3){
                layer.msg('选择的号码不合法',{time:950});
                return
            }
        break;
        case 101:
            if(me.userArr.length!=4){
                layer.msg('选择的号码不合法',{time:950});
                return
            }
        break;
        case 103:
            if(me.userArr.length!=5){
                layer.msg('选择的号码不合法',{time:950});
                return
            }
        break;
        default:
        break;
    }
    me.bettingInfo.bettingNumber = qian2_3_4_5(me.NavTwo_index,me.userArr);
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    AssemblyData(m,2);
};
export{
    getTextareaData
}
// 组装数据,并将号码添加到底部
function AssemblyData(m,num){
    const me = m.$data;
    let xuanzheData = [];
    let successData = null;
    // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率
    let list = {number:null,odd_play:null,note:null,money:null,one_money:null,rate:null,multiple:null,name:null};
    for (let i = 0; i < me.userArr.length; i++) {
        if(me.userArr[i]!=undefined||me.userArr[i]!=null){
            xuanzheData[i] = me.userArr[i];
        }
    }
    switch (me.NavTwo_index) {
        case 91:case 92:
            
        break;
        default:
            spliceBetNumberArr(xuanzheData,5);
        break;
    }
    successData = (xuanzheData.join('|')).replace(/,/g,' ');
    list = {
        number:successData,
        odd_play:me.NavTwoData.odd_play,
        odd_id:me.NavTwo_index,
        note:me.bettingInfo.bettingNumber,
        money:me.bettingInfo.allMoney,
        one_money:me.bettingInfo.singleMoney,
        rate:me.bettingInfo.rate,
        multiple:me.bettingInfo.setMultipleNumber,
        name:me.NavOneData.name+'-'+me.NavTwoData.rule,
    };
    if(num==1){
        me.myObj.push(list);
    }else{
        me.myJson.push(list);
    }
    m.clearUserArr();
};
export{
    AssemblyData
}
// 前2、3、4、5复式
function qian2_3_4_5(id,datasel){
    var nums = 0, tmp_nums = 1;
    switch (id) {
        case 102:case 103:
            if (datasel[0].length > 0 && datasel[1].length > 0 && datasel[2].length > 0 && datasel[3].length > 0 && datasel[4].length > 0) {
                for (var i = 0; i < datasel[0].length; i++) {
                    for (var j = 0; j < datasel[1].length; j++) {
                        for (var k = 0; k < datasel[2].length; k++) {
                            for (var l = 0; l < datasel[3].length; l++) {
                                for (var m = 0; m < datasel[4].length; m++) {
                                    if (_numberCheck_NoRepeat([datasel[0][i], datasel[1][j], datasel[2][k], datasel[3][l], datasel[4][m]])) {
                                        nums++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        break;
        case 100:case 101:
            if (datasel[0].length > 0 && datasel[1].length > 0 && datasel[2].length > 0 && datasel[3].length > 0) {
                for (var i = 0; i < datasel[0].length; i++) {
                    for (var j = 0; j < datasel[1].length; j++) {
                        for (var k = 0; k < datasel[2].length; k++) {
                            for (var l = 0; l < datasel[3].length; l++) {
                                if (_numberCheck_NoRepeat([datasel[0][i], datasel[1][j], datasel[2][k], datasel[3][l]])) {
                                    nums++;
                                }
                            }
                        }
                    }
                }
            }
        break;
        case 97:case 98:
            if (datasel[0].length > 0 && datasel[1].length > 0 && datasel[2].length > 0) {
                for (var i = 0; i < datasel[0].length; i++) {
                    for (var j = 0; j < datasel[1].length; j++) {
                        for (var k = 0; k < datasel[2].length; k++) {
                            if (_numberCheck_NoRepeat([datasel[0][i], datasel[1][j], datasel[2][k]])) {
                                nums++;
                            }
                        }
                    }
                }
            }
        break;
        case 94:case 95:
            if (datasel[0].length > 0 && datasel[1].length > 0) {
                for (var i = 0; i < datasel[0].length; i++) {
                    for (var j = 0; j < datasel[1].length; j++) {
                        if (_numberCheck_NoRepeat([datasel[0][i], datasel[1][j]])) {
                            nums++;
                        }
                    }
                }
            }
        break;
    }
    return nums;
}
// 前二、前三和值
function qianerhz(id,datasel){
    let maxplace = 1,nums = 0,tmp_nums = 1;
    let cc = {3: 2,4: 2,5: 4,6: 4,7: 6,8: 6,9: 8,10: 8,11: 10,12: 8,13: 8,14: 6,15: 6,16: 4,17: 4,18: 2,19: 2};
    if(id==99){
        cc = {6: 6,7: 6,8: 12,9: 18,10: 24,11: 30,12: 42,13: 48,14: 54,15: 60,16: 60,17: 60,18: 60,19: 54,20: 48,21: 42,22: 30,23: 24,24: 18,25: 12,26: 6,27: 6};
    }
    for (var i = 0; i < datasel[0].length; i++) {
        nums += cc[parseInt(datasel[0][i], 10)];
    }
    if (datasel.length == maxplace) {
        for (var i = 0; i < maxplace; i++) {
            if (datasel[i].length == 0) {
                tmp_nums = 0;
                break;
            }
            tmp_nums *= datasel[i].length;
        }
        nums += tmp_nums;
    }
    return nums;
}
// 删除二维数组为空的数组(arr:数组,num:循环次数)
function spliceBetNumberArr(arr, num) {
    for (let i = 0; i < num; i++) {
        for (let w = 0; w < arr.length; w++) {
            if(arr[w]!=null||arr[w]!=undefined){
                if (arr[w].length <= 0) {
                    arr.splice(w, 1);
                }
            }
        }
    }
    return arr
};
// 检查号码是否不重复
var _numberCheck_NoRepeat = function(array) {
    var oldLength = array.length;
    var newLength = ArrayUtils.uniquelize(array).length;
    return oldLength == newLength;
};
var ArrayUtils = function () {
    // 判断是否存在
    var inArray = function (e, data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] == e) return true;
        }
        return false;
    };
    // 数组去重复
    var uniquelize = function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            if (!inArray(data[i], array)) {
                array.push(data[i]);
            }
        }
        return array;
    };
    return {
        uniquelize: uniquelize,
    }
}();