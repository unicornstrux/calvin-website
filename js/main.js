/* ----------------------------------
	@ Shadow
	@ Version: 1.0
	@ Author: BootEx
-------------------------------------*/

'use strict';

$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
		PORTFOLIO
	--------------------*/
	$('.pf-btn').on('click', function() {
		$('.pf-btn').removeClass('active');
		$(this).addClass('active');
		var selector = $(this).data('filter');
		if (selector === '*') {
			$('.grid-item').css('display', '');
		} else {
			$('.grid-item').css('display', 'none');
			$('.grid-item' + selector).css('display', '');
		}
	});

});



(function($){
	/*------------------
  		NAVIGATION
  	--------------------*/
	var navMenu = $('.menu-list')
		navMenu.onePageNav();
	$(window).on('scroll resize',function(e) {
		if ($(this).scrollTop() > 70) {
			$('.header-section').addClass('sticky');
		}else{
			$('.header-section').removeClass('sticky');
		}
		e.preventDefault();
	});

	$('.responsive').on('click', function(event) {
		$('.menu-list').slideToggle(400);
		$('.header-section').toggleClass('bgc');
		event.preventDefault();
	});

	$('.menu-list li a').on('click', function(event) {
		if ($(window).width() < 768) {
			$('.menu-list').slideUp(400);
			$('.header-section').removeClass('bgc');
		}
	});


/*------------------
		WOW JS
	--------------------*/
	new WOW().init();

})(jQuery);