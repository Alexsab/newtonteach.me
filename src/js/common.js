document.addEventListener('DOMContentLoaded', () => {

	if ($('div').is('.header__bottom')) {
		$('main').addClass('maxi-top');
	}

	$('.sidebar-btn').on('click', function() {

		if ( $(window).width() > 992 ) {
			$(this).toggleClass('active');
			$('#sidebar').toggleClass('open');
			$('#header').toggleClass('sidebar-open');
			$('main').toggleClass('sidebar-open');
			$('.sidebar-footer .btn').slideToggle(100);
			$('.sidebar-logo img').slideToggle(100);
			$('.slider-section').slick('setPosition');
		}else{
			$(this).toggleClass('active');
			$('#sidebar').toggleClass('open');
			$('.sidebar-footer .btn').slideToggle(100);
			$('.sidebar-logo img').slideToggle(100);
		}

	});

	let arrow = '<svg viewBox="0 0 24 24" id="arrow-back"><path d="M17 20.333L15.35 22 6 12l9.35-10L17 3.667 9.3 12z"></path></svg>';

	$('.slider-section').each(function() {
		$(this).slick({
			speed: 600,
			useCSS: true,
			cssEase: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
			rows: 0,
			slidesToShow: 3,
			slidesToScroll: 3,
			infinite: false,
			arrows: true,
			prevArrow: '<button class="slick-prev slick-arrow" aria-label="Prev" type="button">'+arrow+'</button>',
			nextArrow: '<button class="slick-next slick-arrow" aria-label="Next" type="button">'+arrow+'</button>',
			adaptiveHeight: true,
			responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 655,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			]
		});
	});

});

window.onload = function () {
	var scr = $(".history__block");
	scr.mousedown(function () {
		$(this).css('cursor', 'grabbing');
		var startX = this.scrollLeft + event.pageX;
		var startY = this.scrollTop + event.pageY;
		scr.mousemove(function () {
			this.scrollLeft = startX - event.pageX;
			this.scrollTop = startY - event.pageY;
			return false;
		});
	});

	$(window).mouseup(function () {
		scr.off("mousemove").css('cursor', 'grab');
	});
}