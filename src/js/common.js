jQuery(function($) {

	$('.sidebar-btn').on('click', function() {

		if ( $(window).width() > 992 ) {
			$(this).toggleClass('active');
			$('#sidebar').toggleClass('open');
			$('#header').toggleClass('sidebar-open');
			$('.sidebar-footer .btn').slideToggle(100);
			$('.sidebar-logo img').slideToggle(100);
		}else{
			$(this).toggleClass('active');
			$('#sidebar').toggleClass('open');
			$('.sidebar-footer .btn').slideToggle(100);
			$('.sidebar-logo img').slideToggle(100);
		}

	});

});