
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
    if(!me.userArr[y]){
        me.userArr[y] = [];
    }
};
export{
    multipleSelect
}