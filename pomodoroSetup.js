function optimize(){
  
  var w_width = $(window).width();
  var w_height = $(window).height();
  var leftSide = (w_width - 600) / 2;
  var topSide = (w_height - $(".pomodoro").height()) / 2;
  
  if(w_width < 320)  
    w_width = 320;
  else if(w_width > 768){
    $('.pomodoro').css('margin-left', leftSide);
  }else if(w_width <= 768)
    $('.pomodoro').css('margin-left', "1%");
  
  
  $('main .row').css('width', w_width).css('height', w_height);
  $(".pomodoro").css('top', topSide);
}

$(document).ready(function(){
  optimize();
  var time1 = ["30 min", "1 hr","1:30 hr", "2 hr", "2:30 hr", "3 hr", "3:30 hr", "4 hr"];
  var time1Min = [30,60,90,120,150,180,210,240];
  var handle1 = $( ".session #custom_handle" );
  $(".session #slider").slider({
		  min: 0,
	  	max: 7,
	    create: function() {
	        handle1.text("30 min");
	     },
	    slide: function( event, ui ) {
	        handle1.text(time1[ui.value]);
	    },
	    stop: function( event, ui ) {
        
        if($('.pomodoro').data('state') === 1){
          
          $('.stop').text('Begin').removeClass().addClass('begin');
          clearInterval(interval);
          $('span').text("00:00");
        }
        sessionTime = time1Min[ui.value];
      }
    });
  
  var time2 = ["5 min", "10 min","15 min", "20 min", "25 min", "30 min", "35 min", "40 min", "45 min", "50 min", "55 min", "1 hr"];
  var time2Min = [5,10,15,20,25,30,35,40,45,50,55,60];
  var handle2 = $( ".break #custom_handle" );
  $(".break #slider").slider({
		  min: 0,
	  	max: 11,
	    create: function() {
	        handle2.text("5 min");
	     },
	    slide: function( event, ui ) {
	        handle2.text(time2[ui.value]);
	    },
	    stop: function( event, ui ) {
        
          if($('.pomodoro').data('state') === 2){

            $('.stop').text('Begin').removeClass().addClass('begin');
            clearInterval(interval);
            $('span').text("00:00");
          }
          breakTime = time2Min[ui.value];
      }
    });
});

$(window).resize(function(){
  
  optimize();
});