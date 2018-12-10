export {scrollValue , getElementTop}; 
//封装scroll值
function scrollValue(){
    if(window.pageYOffset != null){
        return {
            left:window.pageXOffset,
            top:window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {
        //检测是否声明DTD头部,CSS1Compat 已声明,BackCompat 未声明 
        //没有声明<!DOCTYPE html> 是怪异模式的浏览器
        return {
            left:document.documentElement.scrollLeft,
            top:document.documentElement.scrollTop
        }
    }
    return { //剩下的就是怪异模式的
        left:document.body.scrollLeft,
        top:document.body.scrollTop
    }
}

//获取obj到顶部距离
function getElementTop(obj){ 
    var imgTop = 0;
    while(obj){
        imgTop +=obj.offsetTop;
        obj = obj.offsetParent;
    }
    return imgTop;
}