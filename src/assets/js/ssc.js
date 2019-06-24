
// 监听单式文本域输入
function getTextareaData(e,me){
    let xuanzheData = [];
    let successData = [];
    let arr = me.textareaData.split(' ');
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i].indexOf(arr[i]) === -1){
                successData.push(arr[i].split(''))
            }
        }
        xuanzheData.push(successData)
    }
    console.log(xuanzheData)

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
    switch (me.NavTwoData.odd_play) {
        case 1:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwoData.odd_play);
        break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArr)
};
export{
    singleSelect
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
    switch (me.NavTwoData.odd_play) {
        case 1:
            me.bettingInfo.bettingNumber = getBettingNumber(me,me.NavTwoData.odd_play);
        break;
    }
    // 总金额=单注金额x注数x投注倍数
    me.bettingInfo.allMoney = (me.bettingInfo.singleMoney*me.bettingInfo.bettingNumber)*me.bettingInfo.setMultipleNumber;
    // console.log(me.userArr)
};
export{
    multipleSelect
}
// 将号码添加到底部
function addNumber(m,num){
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
    switch (me.NavTwoData.odd_play) {
        case 25: //有选择'万千百十个'的情况
            for (let j = 0; j < this.ifarr.length; j++) {
                rr += ' '+title[this.ifarr[j]];
            }
            successData = rr+':'+successData;
        break;
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
    addNumber
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