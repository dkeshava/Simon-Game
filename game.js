//alert("hii");
var gamepattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
})
function nextSequence(){
    userClickedPattern=[];
    level+=1;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamepattern.push(randomChosenColour);
    $("#" +randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkans(userClickedPattern.length-1);
})
function playSound(name){
    var audio = new Audio('sounds/'+ name+'.mp3');
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}
function checkans(currentlvl){
    if(gamepattern[currentlvl]===userClickedPattern[currentlvl]){
        console.log("success!!");
        if(gamepattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },100);
        }
    }
    else {//console.log("wrong@")
        playSound("wrong");
        $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startover();
    }
}
function startover(){
    level=0;
    gamepattern=[];
    started=false;
}