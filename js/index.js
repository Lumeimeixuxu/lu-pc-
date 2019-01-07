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
    var smallHalfWidth=smallNode.offsetWidth/2;
    var nowIndex=0;
    var wheelTimer=null;
    headerHandle();
    function headerHandle() {
        //初始化时小箭头来到第一个li下面
        smallNode.style.left=headerLiNodes[0].getBoundingClientRect().left+headerLiNodes[0].offsetWidth/2-
            smallHalfWidth+'px';
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
            smallHalfWidth+'px';
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width='0px';

        }
        headerDownNodes[nowIndex].style.width='100%';

        headerUlNode.style.top=-nowIndex*contentHeight+'px';
    }
    move(4);
    contentHandle();
    function contentHandle() {

        //滚轮事件
        document.onmousewheel=wheel;
        document.addEventListener('DOMMouseScroll',wheel);
        function wheel(event) {
            event = event || window.event;
            clearTimeout(wheelTimer)
            wheelTimer=setTimeout(function () {
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

            },200)
            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }
    //浏览器窗口大小事件
    window.onresize=function () {
       //修正小箭头的位置和ul位置
        smallNode.style.left=headerLiNodes[nowIndex].getBoundingClientRect().left+headerLiNodes[nowIndex].offsetWidth/2-
            smallHalfWidth+'px';
        headerUlNode.style.top=-nowIndex*contentHeight+'px';
    }
    var homeCarouselNode=document.querySelectorAll('.home-carousel li');
    var homePoint=document.querySelectorAll('.home-point li');
    var homeNode=document.querySelector('.home');
    var nowIndex=0;
    var lastIndex=0;
    var lastTime=0;
    var nowTime=0;
    var timer=null;
    firstViewHandle();
   function firstViewHandle() {


       //给小圆点绑定点击事件
       for (var i = 0; i < homePoint.length; i++) {
           homePoint[i].index=i;
           homePoint[i].onclick=function () {
               nowIndex=this.index;
               nowTime=new Date();
               if(nowTime-lastTime<2000) return;

               if(nowIndex===lastIndex) return;
               if(nowIndex>lastIndex){
                   //点击是右边  右边加上right-show  左边加上left-hide
                   homeCarouselNode[nowIndex].className='common-title right-show'
                   homeCarouselNode[lastIndex].className='common-title left-hide'

               }else{
                   homeCarouselNode[lastIndex].className='common-title right-hide'
                   homeCarouselNode[nowIndex].className='common-title left-show'
               }
               //修改小圆点
               homePoint[lastIndex].className='';
               this.className='active';
               // if(nowTime-lastIndex<2000)return;
               lastIndex = nowIndex;
               lastTime=nowTime;
           }
       }
       homeNode.onmouseenter=function () {
           clearInterval(timer);

       }
       homeNode.onmouseleave=autoPlay;
       //自动轮播
       autoPlay();
      function autoPlay() {
          clearInterval(timer);
          timer=setInterval(function () {
              nowIndex++;
              if(nowIndex>=4) nowIndex=0;
              homeCarouselNode[nowIndex].className='common-title right-show'
              homeCarouselNode[lastIndex].className='common-title left-hide'
              homePoint[lastIndex].className='';
              homePoint[nowIndex].className='active';
              lastIndex=nowIndex;
          },2500)
      }
   }
})