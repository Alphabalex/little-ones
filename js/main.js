/*
Template Name: Little Ones
Author: Ingrid Kuhn
Author URI: themeforest/user/ingridk
Version: 1.0
*/

"use strict";
$(document).ready(function() {

   
		

    //	Back Top Link

    var offset = 200;
    var duration = 500;
	var backtotop = $('.back-to-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            backtotop.fadeIn(400);
        } else {
            backtotop.fadeOut(400);
        }
    });

    //Owl-carousels
   
	$("#blog-slider").owlCarousel({
        dots: true,
        loop:true,
		margin: 10,
        autoplay: false,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			1200: {
                items: 3,
            },
        }
    });
	$("#team-slider").owlCarousel({
        dots: true,
		loop:true,
		margin: 50,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			 600: {
                items: 2,
            },
			900: {
                items: 3,
            },
        }
    });
	 $("#services-slider").owlCarousel({
        dots: true,
        loop:true,
		margin: 30,
        autoplay: false,
        nav: true,
		  navText: [
            "<i class='flaticon-arrows-1'></i>",
            "<i class='flaticon-arrows'></i>"

        ],
        responsive: {
            1: {
                items: 1,
            },
			767: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        }
    });
	$("#featured-icons").owlCarousel({
        dots: true,
        loop:true,
		margin: 50,
        autoplay: true,     
        responsive: {
            1: {
                items: 1,
            },
			600: {
                items: 2,
            },
            1000: {
                items: 3,
            },
        }
    });
	$("#testimonial-slider").owlCarousel({
        loop:true,
		dots: true,
        autoplay: false,
        responsive: {
            1: {
                items: 1,
            },
			767: {
                items: 2,
            },		
        }
    });
	  


	//Dropdown nav on Hover

    if ( $(window).width() > 991) {  
	 var dropmenu = $('.dropdown-menu');
		$('.dropdown').hover(function() {
		  $(this).find( dropmenu ).stop(true, true).delay(100).fadeIn(500);
		}, function() {
		  $(this).find( dropmenu ).stop(true, true).delay(100).fadeOut(500);
		});
	}
	
	  // Magnific Popup

		$('#lightbox').magnificPopup({
			 autoFocusLast:false,
			delegate: 'a', 
			type: 'image',
			gallery: {
				enabled: true
			}
		});
			
      //Load Skrollr

	var skr0llr = skrollr.init({
		forceHeight: false,
		mobileCheck: function() {
			//hack - forces mobile version to be off
			return false;
		}
	});		

   //Smooth scroll to section
		if(window.location.hash != '' && window.location.hash != '#') {
		  let target = window.location.hash;

		  if(!$(target).length) {
			return;
		  }
		  
		  $('html, body').animate({
			scrollTop: $(target).offset().top
		  });
		}
  		
}); // end document ready


//On Click  function
	$(document).on('click',function(){
		
		//Navbar toggle
		$('.navbar .collapse').collapse('hide');
		
	})	

// Window load function

$(window).on('load', function() {

    // Page Preloader 	

    $("#preloader").slideUp("slow");

			
    //Isotope Nav Filter

    $('.category a').on('click', function() {
        $('.category .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });
		
    //Isotope 

    var $container = $('#lightbox');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false,
            layoutMode: 'masonry'
        }

    });
	$(window).smartresize(function() {
        $container.isotope({
            columnWidth: '.col-sm-3'
        });
    });


}); // end window load
