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
				font = 'OpenDyslexic, sans-serif';
			} else if ($(this).hasClass('f3')) {
				font = '"Comic Sans MS", cursive, sans-serif';
			}

			// apply font to body and specific classes
			$('body, .post-title, .section-title, h2.title').css('font-family', font);

		} else {
			// reset font to default when unchecked
			$('body, .post-title, .section-title, h2.title').css('font-family', '');
		}
	});

	// Contrast slider
	$('#contrastSlider').on('input', function () {
		let value = $(this).val(); // 0 - 100
		let lightness = value;     // map slider to lightness in HSL

		// Select all text elements except links/inputs inside #nav-aside and font-sample elements
		$('body, body *').not('.on text, .off text, .font-sample, .font-sample *').each(function () {
			let $el = $(this);

			// Skip links and inputs inside #nav-aside
			if ($el.closest('#nav-aside').length && ($el.is('a') || $el.is('input'))) {
				return; // skip this element
			}

			// Only apply color to elements that contain text
			if ($el.children().length === 0 || $el.is('span, p, h1, h2, h3, h4, h5, h6, li, a')) {
				$el.css('color', `hsl(0, 0%, ${lightness}%)`);
			}
		});
	});


	// Store original sizes (excluding toggle elements)
	$('.post-title, .section-title, p, li, span, a').not('.container-toggle, .container-toggle *').each(function () {
		$(this).data('original-size', parseFloat($(this).css('font-size')));
	});

	// Font Slider
	$('#textSizeSlider').on('input', function () {
		let sliderValue = $(this).val(); // 12-36 for example

		$('.post-title, .section-title, p, li, span, a, h2.title').not('.container-toggle, .container-toggle *').each(function () {
			let original = $(this).data('original-size') || 16; // fallback
			let scaleFactor = sliderValue / 16; // assume 16px is base
			$(this).css('font-size', (original * scaleFactor) + 'px');
		});
	});

	// Change font color
	$('.font-color-toggle').on('change', function () {
		if (this.checked) {
			// uncheck all other toggles first
			$('.font-color-toggle').not(this).prop('checked', false);

			// select the same elements
			let $elements = $('.post-title, .section-title, p, li, span, a, h2.title').not('.container-toggle, .container-toggle *');

			// apply color based on which toggle is switched on
			if ($(this).hasClass('fc1')) {
				$elements.css('color', '#20c8c3ff'); // teal
			} else if ($(this).hasClass('fc2')) {
				$elements.css('color', 'magenta');
			} else if ($(this).hasClass('fc3')) {
				$elements.css('color', 'pink');
			}
		} else {
			// reset ALL the same elements
			$('.post-title, .section-title, p, li, span, a, h2.title').not('.container-toggle, .container-toggle *')
				.css('color', '');
		}
	});

	// Animation control
	$(document).ready(function () {
		$(".animation-toggle").change(function () {
			if ($(this).is(":checked")) {
				// Turn animations OFF
				$("body").addClass("no-animation");
			} else {
				// Turn animations ON
				$("body").removeClass("no-animation");
			}
		});
	});

})(jQuery);
