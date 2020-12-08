jQuery(function($) {

	$('.sidebar-btn').on('click', function() {
		$(this).toggleClass('active');
		$('#sidebar').toggleClass('open');
		$('#header').toggleClass('sidebar-open');
	});

});