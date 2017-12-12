function pomodoroTime(option) {
  var elapsed = 0;
  var percent = 0;
  var total = 0;
  var state = $('.pomodoro').data('state');
  
  if(state === 1)
    total = sessionTime * 60;
  else
    total = breakTime * 60;
  
	interval = setInterval(function(){
    
    if(elapsed <= total){
      var percent = (elapsed / total) * 100;
      var secondsR = elapsed % 60;
      var minutes = Math.floor(elapsed / 60);

      if(secondsR < 10 && minutes < 10)
        $("span").text("0"+minutes+":0"+secondsR);
      else if(secondsR > 9 && minutes < 10)
        $("span").text("0"+minutes+":"+secondsR);
      else if(secondsR < 10 && minutes > 9)
        $("span").text(minutes+":0"+secondsR);
      else
        $("span").text(minutes+":"+secondsR);

      if(option === 1){
        $('.timer-bar').css({background: "linear-gradient(to top, #1CB5E0 "+percent+"%,#2c3e50 "+percent+"%,#2c3e50 100%)"});
      }else if(option === 2){

        $('.timer-bar').css({background: "linear-gradient(#4AC29A "+percent+"%,#1CB5E0 "+percent+"%,#1CB5E0 100%)"});
      }else{ 
        $('.timer-bar').css({background: "linear-gradient(to top, #1CB5E0 "+percent+"%,#4AC29A "+percent+"%,#4AC29A 100%)"});
      }
      elapsed++;
    }else{
      playSound();
      clearInterval(interval);
      $("span").text("DONE!");
      if(state === 1){
        
        $('.pomodoro').data('state', 2);
        pomodoroTime(2);
      }else if(state === 2){
        
        $('.pomodoro').data('state', 1);
        pomodoroTime(3);
      }
    }
	}, 1000);
}

function playSound(){   
    var audio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    audio.play();
}

$(document).on('click', '.begin', function(){
  
  $('.pomodoro').data('state', 1);
  pomodoroTime(1);
  $(this).text("Stop").removeClass().addClass('stop');
  
});

$(document).on('click', '.stop', function(){
  
  clearInterval(interval);
  $('.pomodoro').data('state', 0);
  $(this).text("Begin").removeClass().addClass('begin');
  $('span').text('00:00');
  sessionTime = 30;
  breakTime = 5;
  $('.timer-bar').css('background', '#2c3e50');
  
});