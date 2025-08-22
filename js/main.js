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
				$('body').css('background-color', '#c0c2b2ff');
			} else if ($(this).hasClass('c2')) {
				$('body').css('background-color', '#c6b5c3ff');
			} else if ($(this).hasClass('c3')) {
				$('body').css('background-color', '#e5c1a9');
			} else if ($(this).hasClass('c4')) {
				$('body').css('background-color', '#e4cca6');
			} else if ($(this).hasClass('c5')) {
				$('body').css('background-color', '#adc1ceff');
			} else if ($(this).hasClass('c6')) {
				$('body').css('background-color', '#bdd3c6');
			} else if ($(this).hasClass('c7')) {
				$('body').css('background-color', '#ffff72');
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
			$('body, .post-title, .section-title, h2.title, h1, h3, h2').css('font-family', font);

		} else {
			// reset font to default when unchecked
			$('body, .post-title, .section-title, h2.title, h1, h3, h2').css('font-family', '');
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
			if ($el.closest('#nav-aside').length && ($el.is('a') || $el.is('input') || $el.is('h2') || $el.is('span') || $el.is('.toggle-label'))) {
				return; // skip this element
			}

			// Only apply color to elements that contain text
			if ($el.children().length === 0 || $el.is('span, p, h1, h2, h3, h4, h5, h6, li, a, button')) {
				$el.css('color', `hsl(0, 0%, ${lightness}%)`);
			}
		});
	});


	// Store original sizes (excluding toggle elements)
	$('.post-title, .section-title, p, li, span, a, h1, h2.title, h3').not('.container-toggle, .container-toggle *').each(function () {
		$(this).data('original-size', parseFloat($(this).css('font-size')));
	});

	// Font Slider
	$('#textSizeSlider').on('input', function () {
		let sliderValue = $(this).val(); // 12-36 for example

		$('.post-title, .section-title, p, li, span, a, h2.title, h1, h3').not('.container-toggle, .container-toggle *').each(function () {
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
			let $elements = $('.post-title, .section-title, p, li, span, a, h2.title, h1, h3').not('.container-toggle, .container-toggle *, #nav-aside, #nav-aside *');

			// apply color based on which toggle is switched on
			if ($(this).hasClass('fc1')) {
				$elements.css('color', '#2c3e50'); // teal
			} else if ($(this).hasClass('fc2')) {
				$elements.css('color', '#f5e8c7');
			} else if ($(this).hasClass('fc3')) {
				$elements.css('color', '#1e3a5f');
			} else if ($(this).hasClass('fc4')) {
				$elements.css('color', '#0f3d3e');
			} else if ($(this).hasClass('fc5')) {
				$elements.css('color', '#4b1f3f');
			} else if ($(this).hasClass('fc6')) {
				$elements.css('color', '#4a2e1d');
			}
		} else {
			// reset ALL the same elements
			$('.post-title, .section-title, p, li, span, a, h2.title, h1, h3').not('.container-toggle, .container-toggle *')
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

	// Highlighted Reading Toggle

	let highlightReadEnabled = false;

	// Toggle switch
	$('#highlightReadToggle').on('change', function () {
		highlightReadEnabled = this.checked;
	});

	// Listen for text highlights
	$(document).on('mouseup', function () {
		if (!highlightReadEnabled) return; // do nothing if feature is off

		let selectedText = window.getSelection().toString().trim();
		if (selectedText) {
			let utterance = new SpeechSynthesisUtterance(selectedText);
			utterance.rate = 1;       // speed
			utterance.pitch = 1;      // pitch
			utterance.lang = 'en-US'; // language
			window.speechSynthesis.speak(utterance);
		}
	});


	$(document).ready(function () {
		// Initially hide the read out loud buttons
		$('#read-outloud').hide();

		// Toggle speech control buttons visibility
		$('#speechToggle').on('change', function () {
			if (this.checked) {
				$('#read-outloud').fadeIn();
			} else {
				$('#read-outloud').fadeOut();
			}
		});

		let paragraphs = $('p').toArray();
		let index = 0;
		let utterance;
		let isReading = false; // flag to control reading

		function readParagraph(i) {
			if (!isReading || i >= paragraphs.length) return;

			let text = $(paragraphs[i]).text();
			utterance = new SpeechSynthesisUtterance(text);
			utterance.rate = 1;
			utterance.pitch = 1;
			utterance.lang = 'en-US';

			utterance.onend = function () {
				if (isReading) {
					index++;
					readParagraph(index);
				}
			};

			window.speechSynthesis.speak(utterance);
		}

		$('#readAllBtn').on('click', function () {
			window.speechSynthesis.cancel(); // stop any current speech
			index = 0;
			isReading = true;
			readParagraph(index);
		});

		$('#stopAllBtn').on('click', function () {
			window.speechSynthesis.cancel(); // stop current speech
			isReading = false;              // prevent further paragraphs
		});
	});

	// jQuery: change background when color picker changes
	$('#colorPicker').on('input', function () {
		let selectedColor = $(this).val(); // gets the hex color, e.g. "#ff0000"
		$('body').css('background-color', selectedColor); // apply to background
	});

	$('#darkToggle').on('change', function () {
		if (this.checked) {
			// uncheck all other toggles first
			$('.color-toggle').not(this).prop('checked', false);

			// apply background based on which one was switched on
			$('#nav-logo-change').attr("src", "img/MY_LOGO_S_clear_white.png");
			$('body').css('background-color', '#2d2d2dff');
			let $elements = $('.post-title, .section-title, p, li, span, a, h1, h3, i, button').not('.container-toggle, .container-toggle *, #nav-aside, #nav-aside *');
			$elements.css('color', '#E5E5E5');

		} else {
			// if the same toggle is turned off -> reset to original color
			$('#nav-logo-change').attr("src", "img/MY_LOGO_S_clear.png");
			$('body').css('background-color', '');
			$('.post-title, .section-title, p, li, span, a, h1, h3, i, button').not('.container-toggle, .container-toggle *').css('color', '');
		}
	});

	$(document).ready(function () {
		// Show button after scrolling down 100px
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});

		// Scroll to top when clicked
		$('#back-to-top').click(function () {
			$('html, body').animate({ scrollTop: 0 }, 500); // 500ms animation
			return false;
		});
	});


})(jQuery);


