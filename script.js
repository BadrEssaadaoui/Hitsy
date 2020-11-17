index=0,c=0;
var audio;
$.get("scrap.php",(data)=>{
     res=JSON.parse(data);
    $("header").after("<div id='wrapper'></div>")
    cid=0;
    for(let i of res.data){
        $("#wrapper").append(
            `
            <div class="container" id="${cid}" onclick="playSong(${cid})">
                <div class="song">${i.song}</div>
                <div class="singer">${i.artist}</div>
            </div>
        
        `)
        cid++;
    }
})



// ------------------------events------------------------------------------
$(document).ready(()=>{
    // ----------------------------------------
    $("#search2").submit((e)=>{
        e.preventDefault();
        $("#wrapper").remove();
        let singer=$("#search1").val();
        $.get("scrap.php",{singer:`${singer}`},(data)=>{
            $("header").after("<div id='wrapper'></div>")
            res=JSON.parse(data);
            console.log(res);
            window
           cid=0;
           for(let i of res.data){
               $("#wrapper").append(
                   `
                   <div class="container" id="${cid}" onclick="playSong(${cid})">
                       <div class="song">${i.song}</div>
                       <div class="singer">${i.artist}</div>
                   </div>
               
               `)
               cid++;
           }
       })
    })
    // -------------------------------------
    $("footer").hide();
    audio=new Audio();
    audio.preload="metadata";


    $("#forward").click(()=>{
        forward();
        styling(index,c);
    })
    $("#backward").click(()=>{
        backward();
        styling(index,c);
    })
    $(document).on('click',".play",()=>{
        audio.play();
        $(".play").removeClass('play').addClass('pause').html('<i class="fa fa-pause"  aria-hidden="true"></i>');
    })
    $(document).on('click',".pause",()=>{
        audio.pause();
       
        $(".pause").removeClass('pause').addClass('play').html('<i class="fa fa-play"  aria-hidden="true"></i>');
    })

    audio.onloadedmetadata=()=>{
        $("#duration").text(formatTime(audio.duration));
        $("#behind,#infront").click(function(e){
        x=Math.floor(e.pageX - $(this).offset().left);
        $("#infront").css("width",x+"px");
            audio.currentTime = x*audio.duration/300;
    });
        setInterval(()=>{
        $("#currentTime").text(formatTime(audio.currentTime));
        x=(audio.currentTime*300)/audio.duration;
        $("#infront").css("width",x+"px")
        },1000);  
    audio.onended=()=>{
        forward();
        styling(index,c);
    }
}
})
// --------------------------functions-----------------------------------------------
function playSong(cid){
   let link=res.data[cid].url;
   audio.src=(link);
   c=index; 
   index=cid;
   $("footer").show();
    $(".play").click();
    audio.play();
    styling(cid,c);
    
    
}

function styling(i,c){
    if(c==i){
        $(`#${i}`).children(".song").css("color","rgb(0,191,255)");
    }else{
    $(`#${i}`).children(".song").css("color","rgb(0,191,255)");
    $(`#${c}`).children(".song").css("color","black");
    location.href =`#${i}`;  
    }
    
}
function isPlaying(audio) { return !audio.paused; }

function formatTime(sec){
    s=Math.floor(sec%60);
    m=Math.floor(sec/60);
    if(s.toString().length==1 && m.toString().length==1){
        return "0"+m+":"+"0"+s;
    }else if(s.toString().length==1 && m.toString().length==2){
        return m+":"+"0"+s;
    }else if(s.toString().length==2 && m.toString().length==1){
        return "0"+m+":"+s;
    }else{
        return m+":"+s;
    }
}
function forward(){
    c=index;
    if(index<res.data.length-1 && index>=0){
        index++; 
        audio.src=res.data[index].url;
    }else if(index >= res.data.length-1 ){
        index=0;
        audio.src=res.data[index].url;
    }
    $(".play").click();
    audio.play();
}
function backward(){
    c=index;
    if(index<res.length && index>0){
        index--;
        audio.src=res.data[index].url;
    }else if(index==0){
        index=res.data.length-1;
        audio.src=res.data[index].url;
    }
    $(".play").click();
    audio.play();
        
}

// ------------------------------------------------------------------
