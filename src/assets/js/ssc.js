
// 监听单式文本域输入
function getTextareaData(e,me){
    console.log(me.textareaData);
};
export{
    getTextareaData
}
// 单选
function singleSelect(e,y,x,me){
    if(!me.userArr[y]){
        me.userArr[y] = [];
    }
    if(me.userArr[y].indexOf(x) === -1){
        e.currentTarget.className = 'filterNumber_box_button';
        me.userArr[y].push(x);
    }else{
        e.currentTarget.className = '';
        me.userArr[y].splice($.inArray(x,me.userArr[y]),1);
    }
    console.log(me.userArr)
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
    console.log(me.userArr)
};
export{
    multipleSelect
}