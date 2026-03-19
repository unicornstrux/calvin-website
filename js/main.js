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
  		YOUTUBE BG
  	--------------------*/
	$('#video-bg').YTPlayer({
		fitToBackground: true,
		videoId: 'YJNdx5Ses7s'//Set Your Youtube Video ID
	});


	/*------------------
  		MOUSE PARALLAX
  	--------------------*/
	$('#background-1').mouseParallax({
		moveFactor: 2
	});


	/*------------------
  		PROGRESS BAR
  	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});




	/*------------------
  		REVIEW CAROUSEL
  	--------------------*/
	$('#review-carousel').owlCarousel({
		dots: false,
		nav: true,
		loop: true,
		margin:30,
		smartSpeed: 700,
		items:1,
		autoplay:true,
		navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
	});


	/*------------------
		MAGNIDIC POPUP
	--------------------*/
	$('.default-popup').magnificPopup({
		type: 'image',
		removalDelay: 400,
		zoom:{enabled: true, duration: 300}
	});

	$('.content-popup').magnificPopup({
		type: 'inline',
		removalDelay: 400
	});

	$('.video-popup').magnificPopup({
		type: 'iframe',
		autoplay : true
	});


	/*------------------
		WOW JS
	--------------------*/
	new WOW().init();


	/*------------------
		CONTACT FORM
	--------------------*/
	$('#contact-form').on('submit', function() {
		var send_btn = $('#send-form'),
			form = $(this),
			formdata = $(this).serialize(),
			chack = $('#form-chack');
			send_btn.text('Wait...');

		function reset_form(){
		 	$("#name").val('');
			$("#email").val('');
			$("#massage").val('');
		}

		$.ajax({
			url:  $(form).attr('action'),
			type: 'POST',
			data: formdata,
			success : function(text){
				if (text == "success"){
					send_btn.addClass('done');
					send_btn.text('Success');
					setTimeout(function() {
						reset_form();
						send_btn.removeClass('done');
						send_btn.text('Send Massage');
					}, 3000);
				}
				else {
					reset_form();
					send_btn.addClass('error');
					send_btn.text('Error');
					setTimeout(function() {
						send_btn.removeClass('error');
						send_btn.text('Send Massage');
					}, 5000);
				}
			}
		});
		return false;
	});

})(jQuery);