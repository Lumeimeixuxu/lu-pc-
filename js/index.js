/**
 * Created by Administrator on 2019/1/4 0004.
 */
window.addEventListener('DOMContentLoaded',function () {
    var headerLiNodes=document.querySelectorAll('.list li');
    var smallNode=document.querySelector('.small');
    var headerDownNodes=document.querySelectorAll('.down');
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
                smallNode.style.left=this.getBoundingClientRect().left+this.offsetWidth/2-
                    smallNode.offsetWidth/2+'px';
                for (var j = 0; j < headerDownNodes.length; j++) {
                    headerDownNodes[j].style.width='0px';

                }
                headerDownNodes[this.index].style.width='100%';
            }


        }
    }
})