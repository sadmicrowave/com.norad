/* 
   CounterUp
   ========================================================================== */
    jQuery(document).ready(function( $ ) {
      $('.counter').counterUp({
        time: 500
      });
    });

/*
   MixitUp
   ========================================================================== */
    $(function(){
      $('#portfolio').mixItUp();
    });

/*
   Touch Owl Carousel
   ========================================================================== */
    $(".touch-slider").owlCarousel({
        navigation: false,
        pagination: true,
        slideSpeed: 1000,
        stopOnHover: true,
        autoPlay: true,
        items: 1,
        itemsDesktopSmall: [1024, 1],
        itemsTablet: [600, 1],
        itemsMobile: [479, 1]
    });
    $('.touch-slider').find('.owl-prev').html('<i class="fa fa-chevron-left"></i>');
    $('.touch-slider').find('.owl-next').html('<i class="fa fa-chevron-right"></i>');

/* 
   Sticky Nav
   ========================================================================== */
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.header-top-area').addClass('menu-bg');
        } else {
            $('.header-top-area').removeClass('menu-bg');
        }
    });

/* 
   VIDEO POP-UP
   ========================================================================== */
    $('.video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

/* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });
    $('.back-to-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

/* 
   One Page Navigation & wow js
   ========================================================================== */
  jQuery(function($) {
      //Initiat WOW JS
      new WOW().init();

      // one page navigation 
      $('.main-navigation').onePageNav({
              currentClass: 'active'
      });    
  });

  jQuery(document).ready(function() {
     
      $('body').scrollspy({
          target: '.navbar-collapse',
          offset: 195
      });

      $(window).on('scroll', function() {
          if ($(window).scrollTop() > 200) {
              $('.fixed-top').addClass('menu-bg');
          } else {
              $('.fixed-top').removeClass('menu-bg');
          }
      });

  });

  /* Nivo Lightbox
  ========================================================*/
  jQuery(document).ready(function( $ ) {    
     $('.lightbox').nivoLightbox({
      effect: 'fadeScale',
      keyboardNav: true,
    });

  });

  /* stellar js
  ========================================================*/
  $(function(){
    $.stellar({
      horizontalScrolling: false,
      verticalOffset: 40,
      responsive: true
    });
  });

/* 
   Page Loader
   ========================================================================== */
   $(window).load(function() {
    "use strict";
    $('#loader').fadeOut();
   });
   
   
   
   
   
   
   
/*
	Hero Login Slider
   ========================================================================== */
   
   jQuery(document).ready(function( $ ) {
	    var slidesWrapper = $('.cd-hero-slider')
	    	,slidesNumber = slidesWrapper.children('li').length
	    	;
		
		$("#sign-up-btn").on('click', function(){
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, 1);
		});
		$(".sign-in-lnk").on('click', function(){
			nextSlide(slidesWrapper.find('.selected'), slidesWrapper, 2);
		});
   					
		$("#sign-up-back-1").on('click', function(){
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, 0);
		});
		$("#sign-up-back-2").on('click', function(){
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, 1);
		});
		
		$("#sign-in-back").on('click', function(){
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, 1);
		});

		$("#sign-in-back").on('click', function(){
			prevSlide(slidesWrapper.find('.selected'), slidesWrapper, 1);
		});

   
	   function nextSlide(visibleSlide, container, n){
			visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				visibleSlide.removeClass('is-moving');
			});
	
			container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
		}
		
		function prevSlide(visibleSlide, container, n){
		visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			visibleSlide.removeClass('is-moving');
		});

		container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
	}

   });

   
   