window.onload = function (){
 //获取dom
    var play = document.getElementById('play');//播放
    var audio = document.getElementById('audio');//播放
    var stop = document.getElementById('stop');//停止
    var next = document.getElementById('next');//下一曲
    var prev = document.getElementById('prev');//上一曲
    var playerList = document.querySelectorAll('#playerList li');//音乐列表
    var presentTime = document.getElementById('presentTime')//当前时间
    var totalTime = document.getElementById('totalTime')//总时间
    var curProgrees = document.getElementById('curProgrees')//进度条
    
    console.log(stop);
//绑定事件
    play.addEventListener('click',playFn);
    stop.addEventListener('click',stopFn);
    next.addEventListener('click',nextFn);
    prev.addEventListener('click',prevFn);
//定义一个标杆
  var flag = true;
//设置播放函数
function playFn(){
    if(flag){
       play.className='play2';//改变播放按钮
       audio.play();//播放音乐
       play.title='暂停';//改变文字
       flag=false;//改变标杆属性
       time();//调用时间函数
    }else{
        play.className='play1';
        audio.pause();
        play.title="播放";
        flag=true;
    }
   
}
//设置停止函数
function stopFn(){
    flag=false;
    playFn();
   
}
//定义一个数组来存放音乐
var musicarr=['./video/1.mp3','./video/2.mp3','./video/3.mp3']
//定义一个变量
var num=0
//设置下一曲函数
function nextFn(){
    num++;
    if(num===musicarr.length){
        num=0;
    }
    audio.src=musicarr[num];
    flag=true;
    playFn();
    //调用音乐列表切换函数
    changmusiclist();
}

//音乐切换列表函数
function changmusiclist(){
 for(let i=0;i<playerList.length;i++){
    playerList[i].className='';
    playerList[num].className='active';
    
 }
}
//设置上一曲函数
function prevFn(){
    num--;
    if(num<0){
        num=musicarr.length-1;
    }
    audio.src=musicarr[num];
    flag=true;
    playFn();
    changmusiclist();
}
//设置时间函数
function time(){
    var timer = setInterval(function(){
        //获取当前时间
        var currentTime = audio.currentTime;
        //获取总时间
        var allTime = audio.duration;
        //渲染dom
        presentTime.innerHTML=formatime(currentTime)
        totalTime.innerHTML=formatime(allTime)
        //console.log(currentTime,allTime)
        Progrees(currentTime,allTime);
    })
}

//设置时间格式化函数
function formatime(time){
    var min = Math.floor(time/60);
    var min = min<10?'0'+min:min;
    var second = Math.floor(time%60);
    var second = second<10?'0'+second:second
    return min+':'+second

}

//设置进度条函数
function Progrees(currentTime,allTime){
    var Progrees =(currentTime/allTime) *550;
    curProgrees.style.width = Progrees+'px'
    if(currentTime===allTime){
        nextFn()
    }
}
//设置点击音乐列表播放函数
for(let i=0;i<playerList.length;i++){
    playerList[i].addEventListener('click',function(){
       num=i;
       audio.src=musicarr[num];
       flag=true;
       playFn();
       changmusiclist()
    })
}






}
