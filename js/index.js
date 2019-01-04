/**
 * Created by Administrator on 2019/1/4 0004.
 */
window.addEventListener('DOMContentLoaded',function () {
    var headerLiNodes=document.querySelectorAll('.list li');
    var smallNode=document.querySelector('.small');
    var headerDownNodes=document.querySelectorAll('.down');
    var headerUlNode=document.querySelector('.contentMain');
    var contentNode=document.querySelector('#content');
    var contentHeight=contentNode.offsetHeight;
    var nowIndex=0;

    headerHandle();
    function headerHandle() {
        //初始化时小箭头来到第一个li下面
        smallNode.style.left=headerLiNodes[0].getBoundingClientRect().left+headerLiNodes[0].offsetWidth/2-
            smallNode.offsetWidth/2+'px';
        headerDownNodes[0].style.width='100%';
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index=i;
            headerLiNodes[i].onclick=function () {
                nowIndex = this.index;
                move(this.index);
            }


        }
    }


    function move(nowIndex) {
        smallNode.style.left=headerLiNodes[nowIndex].getBoundingClientRect().left+headerLiNodes[nowIndex].offsetWidth/2-
            smallNode.offsetWidth/2+'px';
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='0px';

        }
        headerDownNodes[nowIndex].style.width='100%';

        headerUlNode.style.top=-nowIndex*contentHeight+'px';
    }
    //滚轮事件
    document.onmousewheel=wheel;
    document.addEventListener('DOMMouseScroll',wheel);
    function wheel(event) {
        event = event || window.event;

        var flag = '';
        if (event.wheelDelta) {
            //ie/chrome
            if (event.wheelDelta > 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        } else if (event.detail) {
            //firefox
            if (event.detail < 0) {
                flag = 'up';
            } else {
                flag = 'down'
            }
        }

        switch (flag) {
            case 'up' :
                if(nowIndex>0){
                    nowIndex--;
                   move(nowIndex);
                }

                console.log('up');
                break;
            case 'down' :
                console.log('down');
                if(nowIndex<4){
                    nowIndex++;
                    move(nowIndex);
                }
                break;
        }

        //禁止默认行为
        event.preventDefault && event.preventDefault();
        return false;
    }
})