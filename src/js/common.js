jQuery(function($) {

	$('.sidebar-btn').on('click', function() {
		$(this).toggleClass('active');
		$('#sidebar').toggleClass('open');
		$('#header').toggleClass('sidebar-open');
		$('.sidebar-footer .btn').slideToggle(100);
		$('.sidebar-logo img').slideToggle(100);
	});

});