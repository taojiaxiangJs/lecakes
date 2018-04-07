/**
 * Created by lx on 2017/6/27.
 */
var mySwiper = new Swiper ('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
})
var city=document.getElementById('city');
var cityinner=document.getElementsByClassName('city-selector')[0];

city.onclick=function(){
    cityinner.style.display='block';
    cityinner.style.position='fixed';
    cityinner.style.zIndex=999;
}
cityinner.onclick=function(){
    cityinner.style.display='none';
}