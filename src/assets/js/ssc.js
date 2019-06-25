
// 处理单式文本域输入值
function getTextareaData(m){
    const me = m.$data;
    let successData = [];
    let arr = me.textareaData.split(' ');
    for (let i = 0; i < arr.length; i++) {
        successData.push(arr[i].split(''));
    }
    for (let j = 0; j < successData.length; j++) {
        switch (successData[j].length) {
            case 5:
                me.userArr.push(successData[j].map(Number));
            break;
            default:
                layer.msg('选择的号码不合法');
                successData = [];
                me.userArr = [[],[],[],[],[]];
                // me.textareaData = '';
            return
        }
    }
    me.userArr = spliceBetNumberArr(me.userArr,5);
    // 调用相关玩法的算法计算注数
    switch (me.NavTwoData.id) {
        case 2:
            me.bettingInfo.bettingNumber = me.userArr.length;
        break;
    }
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    AssemblyData(m,2)
    console.log(me.userArr);
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
    switch (me.NavTwoData.id) {
        case 1:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwoData.id);
        break;
        case 3:case 4:case 5:
            // me.bettingInfo.bettingNumber = combination(me.userArr[y].length,1)
            me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=Math.floor(combination(me.userArr[y].length,me.NavTwoData.id-2));
        break;
        // case 4:
        //     me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,2);
        // break;
        // case 5:
        //     me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,3);
        // break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    console.log(me.userArr)
};
export{
    singleSelect
}
// 单选(汉字)
function singleSelectChinese(e,y,x,me){
    if(me.userArr[y].indexOf(x) === -1){
        me.userArr[y].push(x);
        me.userArrChinese.push(e.target.innerText);
    }else{
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
        me.userArrChinese.splice($.inArray(e.target.innerText,me.userArrChinese),1);
    }
    me.bettingInfo.bettingNumber = me.userArrChinese.length;
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;

    console.log(me.userArrChinese);
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
    switch (me.NavTwoData.id) {
        case 1:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwoData.id);
        break;
        case 3:case 4:case 5:
            me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,me.NavTwoData.id-2);
        break;
        // case 4:
        //     me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,2);
        // break;
        // case 5:
        //     me.userArr[y].length<1 ? me.bettingInfo.bettingNumber=0 : me.bettingInfo.bettingNumber=combination(me.userArr[y].length,3);
        // break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    console.log(me.userArr)
};
export{
    multipleSelect
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
    successData = (xuanzheData.join('|')).replace(/,/g,' ');    
    switch (me.NavTwoData.id) {
        case 25: //有选择'万千百十个'的情况
            for (let j = 0; j < this.ifarr.length; j++) {
                rr += ' '+title[this.ifarr[j]];
            }
            successData = rr+':'+successData;
        break;
        case 3:case 4:case 5:
            for (let j = 0; j < successData.length; j++) {
                successData = successData.replace('|','');                
            }
        break
        case 6:
            successData = me.userArrChinese;
        break
    }
    list = {
        number:successData,
        odd_play:me.NavTwoData.odd_play,
        odd_id:me.NavTwoData.id,
        note:me.bettingInfo.bettingNumber,
        money:me.bettingInfo.allMoney,
        one_money:me.bettingInfo.singleMoney,
        rate:me.bettingInfo.rate,
        multiple:me.bettingInfo.setMultipleNumber,
        name:me.NavOneData[me.NavOne_index].title+'-'+me.NavTwoData.rule,
    };
    if(num==1){
        me.myObj = list;
    }else{
        me.myJson.push(list);
    }
    m.clearUserArr();
};
export{
    AssemblyData
}

// 五星算法
function getBettingNumber(me,play){
    let num = [];
    if(me.userArr[0]!=null||me.userArr[0]!=undefined){
        for (let i = 0; i < me.userArr[0].length; i++) {
            if(me.userArr[1]!=null||me.userArr[1]!=undefined){
                for (let j = 0; j < me.userArr[1].length; j++) {
                    if(play==12||play==16||play==18){
                        let dusi = me.userArr[0][i];
                        let dusj = me.userArr[1][j];
                        num.push(dusi+','+dusj);
                    }else{
                        if(me.userArr[2]!=null||me.userArr[2]!=undefined){
                            for (let k = 0; k < me.userArr[2].length; k++) {
                                if(play==6||play==17||play==19){
                                    let dusi = me.userArr[0][i];
                                    let dusj = me.userArr[1][j];
                                    let dusk = me.userArr[2][k];
                                    num.push(dusi+','+dusj+','+dusk);
                                }else{
                                    if(me.userArr[3]!=null||me.userArr[3]!=undefined){
                                        for (let a = 0; a < me.userArr[3].length; a++) {
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
    return num.length;
};
// 排列组合算法
function combination(m,n){
    return factorial(m,n)/factorial(n,n);
};
function factorial(m,n){
    var num = 1;
    var count = 0;
    for(var i = m;i > 0;i--){
        if(count == n){ //当循环次数等于指定的相乘个数时，即跳出for循环
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
    return arr
};