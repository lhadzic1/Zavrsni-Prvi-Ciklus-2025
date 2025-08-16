(function ($) {
	"use strict"

	// Mobile dropdown
	$('.has-dropdown>a').on('click', function () {
		$(this).parent().toggleClass('active');
	});

	// Aside Nav
	$(document).click(function (event) {
		if (!$(event.target).closest($('#nav-aside')).length) {
			if ($('#nav-aside').hasClass('active')) {
				$('#nav-aside').removeClass('active');
				$('#nav').removeClass('shadow-active');
			} else {
				if ($(event.target).closest('.aside-btn').length) {
					$('#nav-aside').addClass('active');
					$('#nav').addClass('shadow-active');
				}
			}
		}
	});

	$('.nav-aside-close').on('click', function () {
		$('#nav-aside').removeClass('active');
		$('#nav').removeClass('shadow-active');
	});


	$('.search-btn').on('click', function () {
		$('#nav-search').toggleClass('active');
	});

	$('.search-close').on('click', function () {
		$('#nav-search').removeClass('active');
	});

	// Parallax Background
	$.stellar({
		responsive: true
	});

	// Change background color
	$('.color-toggle').on('change', function () {
		if (this.checked) {
			// uncheck all other toggles first
			$('.color-toggle').not(this).prop('checked', false);

			// apply background based on which one was switched on
			if ($(this).hasClass('c1')) {
				$('body').css('background-color', '#ffffff');
			} else if ($(this).hasClass('c2')) {
				$('body').css('background-color', 'black');
			} else if ($(this).hasClass('c3')) {
				$('body').css('background-color', 'lightpink');
			}
		} else {
			// if the same toggle is turned off -> reset to original color
			$('body').css('background-color', '');
		}
	});

	// Change font 
	$('.font-toggle').on('change', function () {
		if (this.checked) {
			// uncheck all other font toggles
			$('.font-toggle').not(this).prop('checked', false);

			// determine the font
			let font = '';
			if ($(this).hasClass('f1')) {
				font = 'Arial, sans-serif';
			} else if ($(this).hasClass('f2')) {
				font = '"Times New Roman", serif';
			} else if ($(this).hasClass('f3')) {
				font = '"Comic Sans MS", cursive, sans-serif';
			}

			// apply font to body and specific classes
			$('body, .post-title, .section-title').css('font-family', font);

		} else {
			// reset font to default when unchecked
			$('body, .post-title, .section-title').css('font-family', '');
		}
	});


})(jQuery);
