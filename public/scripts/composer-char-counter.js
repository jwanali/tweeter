let counter = 0;
$(document).ready(function() {
  // --- our code goes here ---
  $('.new-tweet form #tweet-text').on('input', function(e) {
   let value = $(this).val();
   counter = 140 - (value.length);
   console.log(counter);
   $('.new-tweet form .counter').val(counter);
   if (counter <= 0) {
    $('.new-tweet form .counter').css("color","red");
  } else {
    $('.new-tweet form .counter').css("color","#545149")
    }
  });
});
