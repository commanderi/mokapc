
// 处理单式文本域输入值
function getTextareaData(m){
    const me = m.$data;
    me.userArr = [];
    let successData = [];
    const reg = /^[0-9]+.?[0-9]*$/;
    const arr = me.textareaData.split(' ');
    for (let i = 0; i < arr.length; i++) {
        successData.push(arr[i].split(''));
    }
    // 十万注下面这个双重循环耗时500多ms
    for (let i = 0; i < successData.length; i++) {
        me.userArr.push(successData[i].map(Number));
        for (let j = 0; j < me.userArr[i].length; j++) {
            if(!reg.test(me.userArr[i][j])){
                layer.msg('请输入阿拉伯数字或正整数',{time:1600});
                return
            }
        }
    }
    me.userArr = spliceBetNumberArr(me.userArr,5); //十万注此处耗时40s
    console.timeEnd();
    switch (me.NavTwo_index) {
        case 2:
            me.userArrLen = 5;
        break;
        case 14:case 20:case 71:
            me.userArrLen = 4;
        break;
        case 26:case 30:case 32:case 36:case 38:case 42:case 66:case 69:
            me.userArrLen = 3;
        break;
        case 44:case 48:case 50:case 54:case 63:
            me.userArrLen = 2;
        break;
    }
    for (let i = 0; i < me.userArr.length; i++) {
        if(me.userArr[i].length!==me.userArrLen){
            layer.msg('选择的号码不合法',{time:950});
            return
        }
    }
    switch (me.NavTwo_index) {
        case 63: //任选2单式
            if(me.rxArr.length==3){
                me.bettingInfo.bettingNumber = (me.userArr.length*3);
            }else if(me.rxArr.length==4){
                me.bettingInfo.bettingNumber = (me.userArr.length*6);
            }else if(me.rxArr.length==5){
                me.bettingInfo.bettingNumber = (me.userArr.length*10);
            }else{
                me.bettingInfo.bettingNumber = me.userArr.length;
            }
        break;
        case 66:case 69: //任选3单式、混合组选
            if(me.rxArr.length==4){
                me.bettingInfo.bettingNumber = (me.userArr.length*4);
            }else if(me.rxArr.length==5){
                me.bettingInfo.bettingNumber = (me.userArr.length*10);
            }else{
                me.bettingInfo.bettingNumber = me.userArr.length;
            }
        break;
        case 71: //任选4单式
            if(me.rxArr.length==5){
                me.bettingInfo.bettingNumber = (me.userArr.length*5);
            }else{
                me.bettingInfo.bettingNumber = me.userArr.length;
            }
        break;
        default:
            me.bettingInfo.bettingNumber = me.userArr.length;
        break;
    }
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    AssemblyData(m,2);
};
export{
    getTextareaData
}
// 单选
function singleSelect(e,y,x,me){
    if(me.userArr[y].indexOf(x) === -1){
        me.userArr[y].push(x);
    }else{
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
    }
    // 调用相关玩法的算法计算注数
    switch (me.NavTwo_index) {
        case 1:case 13:case 19:case 25:case 31:case 37:case 43:case 49:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwo_index);
        break;
        case 3:case 4:case 5:case 7:
            me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=Math.floor(combination(me.userArr[y].length,me.NavTwo_index-2));
        break;
        case 11:case 12: // 组选10、组选5
            me.bettingInfo.bettingNumber = getBettingNumber10_15(me,me.NavTwo_index);
        break;
        case 8:case 9:case 10: // 组选60、组选30、组选20
            me.bettingInfo.bettingNumber = zu60_30_20(me);
        break;
        case 15:case 21:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,4));
        break;
        case 17:case 23:case 47:case 53:case 57:case 59:case 61:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,2));
        break;
        case 16:case 22:case 18:case 24:
            me.bettingInfo.bettingNumber = zu12_4(me);
        break;
        case 27:case 33:case 39:
            me.bettingInfo.bettingNumber = zhixuanhezhi(me);
        break;
        case 28:case 34:case 40:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,2))*2;
        break;
        case 29:case 35:case 41:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,3));
        break;
        case 45:case 51:
            me.bettingInfo.bettingNumber = zhixuanhezhi(me);
        break;
        case 55:
            let nums = 0;
            for (let i = 0; i < 5; i++) {nums += me.userArr[i].length};
            me.bettingInfo.bettingNumber = nums;
        break;
        case 56:case 58:case 60:case 77:case 78:case 79:case 80:
            me.bettingInfo.bettingNumber = me.userArr[0].length;
        break;
        case 62:case 65:case 70:
            me.bettingInfo.bettingNumber = renxuan2_3_4fs(me);
        break;
        case 64:
            me.bettingInfo.bettingNumber = renxuan2zx(me);
        break;
        case 67:case 68:
            me.bettingInfo.bettingNumber = rxz3z6(me);
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
    var nums = 0, tmp_nums = 1,maxplace = 0;
    switch (me.NavTwo_index) {
        case 46:case 52:
            maxplace = 2;
            if (me.userArrChinese.length == maxplace) {
                for (var i = 0; i < maxplace; i++) {
                    if (me.userArrChinese[i].length == 0) {
                        tmp_nums = 0;
                        break;
                    }
                    tmp_nums *= me.userArrChinese[i].length;
                }
                nums += tmp_nums;
            }
            me.bettingInfo.bettingNumber = nums;
        break;
        default:
            me.bettingInfo.bettingNumber = me.userArrChinese[0].length;            
        break;
    }
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArrChinese);
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
                me.userArr[y].push(i);
            }else if(x==1 && i>4){
                me.userArr[y].push(i);
            }else if(x==2 && i<5){
                me.userArr[y].push(i);
            }else if(x==3 && i%2!=0){
                me.userArr[y].push(i);
            }else if(x==4 && i%2==0){
                me.userArr[y].push(i);
            }
        }
    }else{
        me.DesignationArr[y].num = null;
    }
    // 调用相关玩法的算法计算注数
    switch (me.NavTwo_index) {
        case 1:case 13:case 19:case 25:case 31:case 37:case 43:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwo_index);
        break;
        case 3:case 4:case 5:case 7:
            me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,me.NavTwo_index-2);
        break;
        case 11:case 12: // 组选10、组选5
            me.bettingInfo.bettingNumber = getBettingNumber10_15(me,me.NavTwo_index);
        break;
        case 8:case 9:case 10: // 组选60、组选30、组选20
            me.bettingInfo.bettingNumber = zu60_30_20(me);
        break;
        case 15:case 21:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,4));
        break;
        case 17:case 23:case 47:case 53:case 57:case 59:case 61:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,2));
        break;
        case 16:case 22:case 18:case 24:
            me.bettingInfo.bettingNumber = zu12_4(me);
        break;
        case 28:case 34:case 40:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,2))*2;
        break;
        case 29:case 35:case 41:
            me.bettingInfo.bettingNumber = Math.floor(combination(me.userArr[y].length,3));
        break;
        case 55:
            let nums = 0;
            for (let i = 0; i < 5; i++) {nums += me.userArr[i].length};
            me.bettingInfo.bettingNumber = nums;
        break;
        case 56:case 58:case 60:case 77:case 78:case 79:case 80:
            me.bettingInfo.bettingNumber = me.userArr[y].length;
        break;
        case 62:case 65:case 70:
            me.bettingInfo.bettingNumber = renxuan2_3_4fs(me);
        break;
        case 64:
            me.bettingInfo.bettingNumber = renxuan2zx(me);
        break;
        case 67:case 68:
            me.bettingInfo.bettingNumber = rxz3z6(me);
        break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArr)
};
export{
    multipleSelect
}
// 任选万千百十个选择
function selectClass(e,index,me){
    if(me.rxArr.indexOf(index) === -1){
        me.rxArr.push(index);
    }else{
        me.rxArr.splice($.inArray(index,me.rxArr),1);
    }
    switch (me.NavTwo_index) {
        case 64: //任选2
            me.bettingInfo.bettingNumber = renxuan2zx(me);
        break;
        case 67:case 68: //任选3组三组六
            me.bettingInfo.bettingNumber = rxz3z6(me);
        break;
        case 63: //任选2单式
            if(me.rxArr.length<2){
                me.rxArr.push(index);
                layer.msg('至少选择两个',{time:800});
            }
        break;
        case 66:case 69: //任选3单式、混合组选
            if(me.rxArr.length<3){
                me.rxArr.push(index);
                layer.msg('至少选择三个',{time:800});
            }
        break;
        case 71: //任选4单式
            if(me.rxArr.length<4){
                me.rxArr.push(index);
                layer.msg('至少选择四个',{time:800});
            }
        break;
    };
    me.rxArr.sort();
    // console.log(me.rxArr);
};
export{
    selectClass
}
// 组装数据,并将号码添加到底部
function AssemblyData(m,num){
    const me = m.$data;
    let xuanzheData = [];
    let successData = null;
    let title = ['W','Q','B','S','G',];
    let rr = '';
    // number:投注号码,odd_play:玩法,note:注数,money:投注总额,one_money:单注投注金额,rate:投注赔率
    let list = {number:null,odd_play:null,note:null,money:null,one_money:null,rate:null,multiple:null,name:null};
    for (let i = 0; i < me.userArr.length; i++) {
        if(me.userArr[i]!=undefined||me.userArr[i]!=null){
            xuanzheData[i] = me.userArr[i];
        }
    }
    switch (me.NavTwo_index) {
        case 1:case 55:case 62:case 65:case 70:
            
        break;
        default:
            spliceBetNumberArr(xuanzheData,5);
        break;
    }
    successData = (xuanzheData.join('|')).replace(/,/g,' '); //将近800ms
    switch (me.NavTwo_index) {
        case 63:case 64:case 66:case 67:case 68:case 69:case 71: //有选择'万千百十个'的情况
            for (let j = 0; j < me.rxArr.length; j++) {
                rr += ' '+title[me.rxArr[j]];
            }
            successData = rr+':'+successData;
        break;
        case 3:case 4:case 5:case 7:case 15:case 17:case 21:case 23:case 28:case 29:case 34:case 35:case 40:
        case 41:case 47:case 53:case 56:case 57:case 58:case 59:case 60:case 61:case 77:case 78:case 79:case 80: //单排数字
            for (let j = 0; j < successData.length; j++) {
                successData = successData.replace('|','');
            }
        break
        case 46:case 52: //两排汉字
            let arr = me.userArrChinese[0]+'|'+me.userArrChinese[1];
            successData = arr.replace(/,/g,' ');
        break;
        case 6:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90: //单排汉字
            spliceBetNumberArr(me.userArrChinese,2);
            successData = (me.userArrChinese[0].join(' ')).replace(/,/g,' ');
        break
    }
    // console.log(successData)
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
    // console.log(me.NavTwoData)
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
// 任选二组选
function renxuan2zx(me){
    var maxplace = 1;
    var nums = 0;
    if (me.rxArr.length > 1) {
        var place = 0;
        for (var i = 0; i < me.rxArr.length; i++) {
            if (me.rxArr[i]!='' || me.rxArr[i]!=null) {
                place++;
            }
        }
        var newsel = me.userArr[0];
        var m = 2;
        if (place >= m) {
            var h = ArrayUtils.ComNum(place, m);
            if (h > 0) {
                for (var i = 0; i < maxplace; i++) {
                    var s = newsel.length;
                    if (s > 1) {
                        nums += s * (s - 1) / 2;
                    }
                }
                nums *= h;
            }
        }
    }
    return nums;
};
export{
    renxuan2zx
}
// 组选10、组选5
function getBettingNumber10_15(me,id){
    let num = [];
    if(me.userArr[0]!=null||me.userArr[0]!=undefined){
        for (let i = 0; i < me.userArr[0].length; i++) {
            if(me.userArr[1]!=null||me.userArr[1]!=undefined){
                for (let j = 0; j < me.userArr[1].length; j++) {
                    if(id==11||id==12){ //组选10、组选5
                        let dusi = me.userArr[0][i];
                        let dusj = me.userArr[1][j];
                        if(dusi!=dusj){
                            num.push(dusi+','+dusj);
                        }
                    }
                }
            }
        }
    }
    return num.length;
};
// 任选3组三组六
function rxz3z6(me){
    let nums = 0,maxplace = 1;
    if(me.NavTwo_index==67){
        if (me.rxArr.length > 1) {
            let place = 0;
            for (let i = 0; i < me.rxArr.length; i++) {
                if (me.rxArr[i]!='' || me.rxArr[i]!=null) {
                    place++;
                }
            }
            let newsel = me.userArr[0];
            let m = 3;
            // 任选3必须大于选了3位以上才能组成组合
            if (place >= m) {
                let h = ArrayUtils.ComNum(place, m);
                if (h > 0) {// 组合数必须大于0
                    for (let i = 0; i < maxplace; i++) {
                        let s = newsel.length;
                        // 组三必须选两位或者以上
                        if (s > 1) {
                            nums += s * (s - 1);
                        }
                    }
                    nums *= h;
                }
            }
        }
    }else if(me.NavTwo_index==68){
        if (me.rxArr.length > 1) {
            let place = 0;
            for (let i = 0; i < me.rxArr.length; i++) {
                if (me.rxArr[i]!='' || me.rxArr[i]!=null) {
                    place++;
                }
            }
            let newsel = me.userArr[0];
            let m = 3;
            // 任选3必须大于选了3位以上才能组成组合
            if (place >= m) {
                let h = ArrayUtils.ComNum(place, m);
                if (h > 0) {// 组合数必须大于0
                    for (let i = 0; i < maxplace; i++) {
                        let s = newsel.length;
                        // 组六必须选三位或者以上
                        if (s > 2) {
                            nums += s * (s - 1) * (s - 2) / 6;
                        }
                    }
                    nums *= h;
                }
            }
        }
    }
    return nums;
};
// 组选60、组选30、组选20
function zu60_30_20(me){
    var nums = 0, tmp_nums = 1;
    var minchosen = [];
    if (me.NavTwo_index == 8) {
        minchosen = [1, 3];
    }
    if (me.NavTwo_index == 9) {
        minchosen = [2, 1];
    }
    if (me.NavTwo_index == 10) {
        minchosen = [1, 2];
    }
    if (me.userArr[0].length >= minchosen[0] && me.userArr[1].length >= minchosen[1]) {
        var h = ArrayUtils.intersect(me.userArr[0], me.userArr[1]).length;
        tmp_nums = ArrayUtils.ComNum(me.userArr[0].length, minchosen[0]) * ArrayUtils.ComNum(me.userArr[1].length, minchosen[1]);
        if (h > 0) {
            if (me.NavTwo_index == 8) {
                tmp_nums -= ArrayUtils.ComNum(h, 1) * ArrayUtils.ComNum(me.userArr[1].length - 1, 2);
            }
            if (me.NavTwo_index == 9) {
                tmp_nums -= ArrayUtils.ComNum(h, 2) * ArrayUtils.ComNum(2, 1);
                if (me.userArr[0].length - h > 0) {
                    tmp_nums -= ArrayUtils.ComNum(h, 1) * ArrayUtils.ComNum(me.userArr[0].length - h, 1);
                }
            }
            if (me.NavTwo_index == 10) {
                tmp_nums -= ArrayUtils.ComNum(h, 1) * ArrayUtils.ComNum(me.userArr[1].length - 1, 1);
            }
        }
        nums += tmp_nums;
    }
    return nums;
};
// 组选12、组选4
function zu12_4(me){
    var nums = 0, tmp_nums = 1;
    var minchosen = [];
    if (me.NavTwo_index == 16 || me.NavTwo_index == 22) {
        minchosen = [1, 2];
    }
    if (me.NavTwo_index == 18 || me.NavTwo_index == 24) {
        minchosen = [1, 1];
    }
    if (me.userArr[0].length >= minchosen[0] && me.userArr[1].length >= minchosen[1]) {
        var h = ArrayUtils.intersect(me.userArr[0], me.userArr[1]).length;
        tmp_nums = ArrayUtils.ComNum(me.userArr[0].length, minchosen[0]) * ArrayUtils.ComNum(me.userArr[1].length, minchosen[1]);
        if (h > 0) {
            if (me.NavTwo_index == 16 || me.NavTwo_index == 22) {
                tmp_nums -= ArrayUtils.ComNum(h, 1) * ArrayUtils.ComNum(me.userArr[1].length - 1, 1);
            }
            if (me.NavTwo_index == 18 || me.NavTwo_index == 24) {
                tmp_nums -= ArrayUtils.ComNum(h, 1);
            }
        }
        nums += tmp_nums;
    }
    return nums;
}
// 后三、中三、前三、后二、前二直选和值
function zhixuanhezhi(me){
    var nums = 0;
    var cc = {0: 1,1: 3,2: 6,3: 10,4: 15,5: 21,6: 28,7: 36,8: 45,9: 55,10: 63,11: 69,12: 73,13: 75,14: 75,15: 73,16: 69,17: 63,18: 55,19: 45,20: 36,21: 28,22: 21,23: 15,24: 10,25: 6,26: 3,27: 1};
    if (me.NavTwo_index == 45 || me.NavTwo_index == 51) {
        cc = {0: 1,1: 2,2: 3,3: 4,4: 5,5: 6,6: 7,7: 8,8: 9,9: 10,10: 9,11: 8,12: 7,13: 6,14: 5,15: 4,16: 3,17: 2,18: 1};
    }
    for (var i = 0; i < me.userArr[0].length; i++) {
        nums += cc[parseInt(me.userArr[0][i], 10)];
    }
    return nums;
}
// 任选2、3、4复式
function renxuan2_3_4fs(me){
    var nums = 0, tmp_nums = 1,minplace = 0;
    if (me.NavTwo_index == 62) {
        minplace = 2;
    }
    if (me.NavTwo_index == 65) {
        minplace = 3;
    }
    if (me.NavTwo_index == 70) {
        minplace = 4;
    }
    var newsel = [];
    for (var i = 0; i < me.userArr.length; i++) {
        if (me.userArr[i].length != 0) {
            newsel.push(me.userArr[i]);
        }
    }
    // 最少位数
    if (newsel.length >= minplace) {
        var l = ArrayUtils.ComNum(newsel.length, minplace);
        for (var i = 0; i < l; i++) {
            tmp_nums = 1;
            var data = ArrayUtils.ComVal(newsel, minplace, i);
            for (var j = 0; j < data.length; j++) {
                tmp_nums *= data[j].length;
            }
            nums += tmp_nums;
        }
    }
    return nums;
}
// 五星算法
function getBettingNumber(me,id){
    let num = [];
    if(me.userArr[0]!=null||me.userArr[0]!=undefined){
        for (let i = 0; i < me.userArr[0].length; i++) {
            if(me.userArr[1]!=null||me.userArr[1]!=undefined){
                for (let j = 0; j < me.userArr[1].length; j++) {
                    if(id==43||id==49){ //二星
                        let dusi = me.userArr[0][i];
                        let dusj = me.userArr[1][j];
                        num.push(dusi+','+dusj);
                    }else{
                        if(me.userArr[2]!=null||me.userArr[2]!=undefined){
                            for (let k = 0; k < me.userArr[2].length; k++) {
                                if(id==25||id==31||id==37){ //三星
                                    let dusi = me.userArr[0][i];
                                    let dusj = me.userArr[1][j];
                                    let dusk = me.userArr[2][k];
                                    num.push(dusi+','+dusj+','+dusk);
                                }else{
                                    if(me.userArr[3]!=null||me.userArr[3]!=undefined){
                                        for (let a = 0; a < me.userArr[3].length; a++) {
                                            if(id==13||id==19){ //四星
                                                let dusi = me.userArr[0][i];
                                                let dusj = me.userArr[1][j];
                                                let dusk = me.userArr[2][k];
                                                let dusa = me.userArr[3][a];
                                                num.push(dusi+','+dusj+','+dusk+','+dusa);
                                            }else{ //五星
                                                if(me.userArr[4]!=null||me.userArr[4]!=undefined){
                                                    for (let b = 0; b < me.userArr[4].length; b++) {
                                                        let dusi = me.userArr[0][i];
                                                        let dusj = me.userArr[1][j];
                                                        let dusk = me.userArr[2][k];
                                                        let dusa = me.userArr[3][a];
                                                        let dusb = me.userArr[4][b];
                                                        num.push(dusi+','+dusj+','+dusk+','+dusa+','+dusb);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return num.length;
};
// 排列组合
function combination(m,n){
    return factorial(m,n)/factorial(n,n);
};
function factorial(m,n){
    var num = 1;
    var count = 0;
    for(var i = m;i > 0;i--){
        if(count == n){
            break;
        }
        num = num * i;
        count++;
    }
    return num;
};
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
    // console.timeEnd();
    return arr
};
// 数组工具类
var ArrayUtils = function () {
    // 组合数
    var ComNum = function (n, m) {
        m = parseInt(m);
        n = parseInt(n);
        if (m < 0 || n < 0) {
            return 0;
        }
        if (m == 0 || n == 0) {
            return 1;
        }
        if (m > n) {
            return 0;
        }
        if (m > n / 2.0) {
            m = n - m;
        }
        var result = 0.0;
        for (var i = n; i >= (n - m + 1); i--) {
            result += Math.log(i);
        }
        for (var i = m; i >= 1; i--) {
            result -= Math.log(i);
        }
        result = Math.exp(result);
        return Math.round(result);
    };
    // 组合值
    var ComVal = function (source, m, x) {
        var n = source.length;
        var list = [];
        var start = 0;
        while (m > 0) {
            if (m == 1) {
                list.push(source[start + x]);
                break;
            }
            for (var i = 0; i <= n - m; i++) {
                var cnm = ComNum(n - 1 - i, m - 1);
                if (x <= cnm - 1) {
                    list.push(source[start + i]);
                    start = start + (i + 1);
                    n = n - (i + 1);
                    m--;
                    break;
                } else {
                    x = x - cnm;
                }
            }
        }
        return list;
    };
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
    //求两个集合的并集
    var union = function (a, b) {
        return uniquelize(a.concat(b));
    };
    //求两个集合的差集
    var minus = function (a, b) {
        var array = [];
        var ua = uniquelize(a);
        for (var i = 0; i < ua.length; i++) {
            if (!inArray(ua[i], b)) {
                array.push(ua[i]);
            }
        }
        return array;
    };
    //求两个集合的交集
    var intersect = function (a, b) {
        var array = [];
        var ua = uniquelize(a);
        for (var i = 0; i < ua.length; i++) {
            if (inArray(ua[i], b)) {
                array.push(ua[i]);
            }
        }
        return array;
    };
    //求两个集合的补集
    var complement = function (a, b) {
        return minus(union(a, b), intersect(a, b));
    };
    // 去除重复，最快速方法，会排序
    var unique = function (data) {
        data.sort();
        var re = [data[0]];
        for (var i = 1; i < data.length; i++) {
            if (data[i] !== re[re.length - 1]) {
                re.push(data[i]);
            }
        }
        return re;
    };
    // 根据下标删除
    var remove = function (data, idx) {
        if (data.length > idx) {
            data.splice(idx, 1);
        }
        return data;
    };
    return {
        ComNum: ComNum,
        ComVal: ComVal,
        unique: unique,
        uniquelize: uniquelize,
        intersect: intersect,
        complement: complement,
        remove: remove
    }
}();