/**
 * Created by Administrator on 2019/1/4 0004.
 */
window.addEventListener('DOMContentLoaded',function () {
    var headerLiNodes = document.querySelectorAll('.list li');
    var smallNode = document.querySelector('.small');
    var headerDownNodes = document.querySelectorAll('.down');
    var headerUlNode = document.querySelector('.contentMain');
    var contentNode = document.querySelector('#content');
    var navBarNodes=document.querySelectorAll('.nav-bar li');
    var musicNode=document.querySelector('.music');
    var musicIconNode=document.querySelector('.music-icon');
    var homeNode = document.querySelector('.home');
    var contentHeight = contentNode.offsetHeight;
    var smallHalfWidth = smallNode.offsetWidth / 2;
    var nowIndex = 0;
    var wheelTimer = null;
    headerHandle();
    function headerHandle() {
        //初始化时小箭头来到第一个li下面
        smallNode.style.left = headerLiNodes[0].getBoundingClientRect().left + headerLiNodes[0].offsetWidth / 2 -
            smallHalfWidth + 'px';
        headerDownNodes[0].style.width = '100%';
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index = i;
            headerLiNodes[i].onclick = function () {
                nowIndex = this.index;
                move(this.index);
            }


        }
    }

    function move(nowIndex) {
        smallNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2 -
            smallHalfWidth + 'px';
        for (var j = 0; j < headerDownNodes.length; j++) {
            headerDownNodes[j].style.width = '0px';
            navBarNodes[j].className='';

        }
        headerDownNodes[nowIndex].style.width = '100%';

        headerUlNode.style.top = -nowIndex * contentHeight + 'px';
       //侧边导航
        navBarNodes[nowIndex].className='active';
    }

    // move(4);
    contentHandle();
    function contentHandle() {

        //滚轮事件
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll', wheel);
        function wheel(event) {
            event = event || window.event;
            clearTimeout(wheelTimer)
            wheelTimer = setTimeout(function () {
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
                        if (nowIndex > 0) {
                            nowIndex--;
                            move(nowIndex);
                        }

                        console.log('up');
                        break;
                    case 'down' :
                        console.log('down');
                        if (nowIndex < 4) {
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }

            }, 200)
            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;
        }
    }

    //浏览器窗口大小事件
    window.onresize = function () {
        //修正小箭头的位置和ul位置
        smallNode.style.left = headerLiNodes[nowIndex].getBoundingClientRect().left + headerLiNodes[nowIndex].offsetWidth / 2 -
            smallHalfWidth + 'px';
        headerUlNode.style.top = -nowIndex * contentHeight + 'px';
    }
    var homeCarouselNode = document.querySelectorAll('.home-carousel li');
    var homePoint = document.querySelectorAll('.home-point li');
    var nowIndex = 0;
    var lastIndex = 0;
    var lastTime = 0;
    var nowTime = 0;
    var timer = null;
    firstViewHandle();
    function firstViewHandle() {


        //给小圆点绑定点击事件
        for (var i = 0; i < homePoint.length; i++) {
            homePoint[i].index = i;
            homePoint[i].onclick = function () {
                nowIndex = this.index;
                nowTime = new Date();
                if (nowTime - lastTime < 2000) return;

                if (nowIndex === lastIndex) return;
                if (nowIndex > lastIndex) {
                    //点击是右边  右边加上right-show  左边加上left-hide
                    homeCarouselNode[nowIndex].className = 'common-title right-show'
                    homeCarouselNode[lastIndex].className = 'common-title left-hide'

                } else {
                    homeCarouselNode[lastIndex].className = 'common-title right-hide'
                    homeCarouselNode[nowIndex].className = 'common-title left-show'
                }
                //修改小圆点
                homePoint[lastIndex].className = '';
                this.className = 'active';
                // if(nowTime-lastIndex<2000)return;
                lastIndex = nowIndex;
                lastTime = nowTime;
            }
        }
        homeNode.onmouseenter = function () {
            clearInterval(timer);

        }
        homeNode.onmouseleave = autoPlay;
        //自动轮播
        autoPlay();
        function autoPlay() {
            clearInterval(timer);
            timer = setInterval(function () {
                nowIndex++;
                if (nowIndex >= 4) nowIndex = 0;
                homeCarouselNode[nowIndex].className = 'common-title right-show'
                homeCarouselNode[lastIndex].className = 'common-title left-hide'
                homePoint[lastIndex].className = '';
                homePoint[nowIndex].className = 'active';
                lastIndex = nowIndex;
            }, 2500)
        }
    }


    //第五屏
    teamHandle();
    function teamHandle() {
        var teamUlNode = document.querySelector('.teamPerson');
        var teamLiNodes = document.querySelectorAll('.teamPerson li');
        var width=teamLiNodes[0].offsetWidth;
        var height=teamLiNodes[0].offsetHeight;
        var canvas=null;
        for (var i = 0; i < teamLiNodes.length; i++) {
            teamLiNodes[i].index=i;
            teamLiNodes[i].onmouseenter = function () {
                for (var j = 0; j < teamLiNodes.length; j++) {
                    teamLiNodes[j].style.opacity = 0.5;
                }
                this.style.opacity = 1;

               if(!canvas){
                   //创建画布
                   canvas=document.createElement('canvas');

                 canvas.width=236;
                 canvas.height=448;
                 canvas.style.position = 'absolute';
                 canvas.style.top = '0';
                 canvas.style.left=this.index*236+'px';

                 bubble();

                   teamUlNode.appendChild(canvas);
               }
                //不管添不添加canvas，都得改变left值
                canvas.style.left=this.index*width+'px';
            }

        }
        teamUlNode.onmouseleave=function () {
            for (var j = 0; j < teamLiNodes.length; j++) {
                teamLiNodes[j].style.opacity = 1;
            }
            canvas.remove();
            canvas=null;
        }
        function bubble() {
          var ctx = canvas.getContext('2d');
          var width=canvas.width;
          var height=canvas.height;
          var arr=[];

          //生成圆
          setInterval(function () {
            var r=Math.round(Math.random()*255);
            var g=Math.round(Math.random()*255);
            var b=Math.round(Math.random()*255);
            var c_r=Math.round(Math.random()*8+2);
            var y=height-c_r;
            var x=Math.round(Math.random()*width);
            var s=Math.round(Math.random()*30+20);

            arr.push({
              r:r,
              g:g,
              b:b,
              c_r:c_r,
              y:y,
              x:x,
              deg:0,
              s:s
            })

          },50);
          setInterval(function () {
            //清除上一次画布
            ctx.clearRect(0,0,width,height);
            for (var i = 0; i <arr.length; i++) {
              var item=arr[i];
              item.deg+=4;
              //得到弧度的值
              var rad=item.deg*Math.PI/180;
              //求x和Y轴的坐标
              var x=item.x+Math.sin(rad)*item.s;
              var y=item.y-rad*item.s;
              ctx.fillStyle='rgb('+item.r+','+item.g+','+item.b+')';
              ctx.beginPath();
              ctx.arc(x,y,item.c_r,0,2*Math.PI);
              ctx.fill();

            }
          },1000/60)
        }
    }
    //侧边导航
  for (var i = 0; i < navBarNodes.length; i++) {
    navBarNodes[i].index = i;
    navBarNodes[i].onclick = function () {
      nowIndex = this.index;
      move(nowIndex);
    }
  }
// 音乐播放
  musicIconNode.onclick=function () {
    if(musicNode.paused){
        //说明音乐暂停，点击播放
      musicNode.play();
      this.style.backgroundImage='url("img/musicon.gif")';
    }else{
        musicNode.pause();
      this.style.backgroundImage='url("img/musicoff.gif")';
    }
  }
  //出入场动画
  var animationArr=[
    {
      anOut:function () {
        homeNode.style.transform='translateY(-200px)';
        homeNode.style.opacity=0;
      } ,
      anIn:function () {
        homeNode.style.transform='translateY(0)';
        homeNode.style.opacity=1;
      }
    },
  ]
  animationArr[0].anOut();
    setTimeout(function () {
      animationArr[0].anIn();
    },1500)
})
