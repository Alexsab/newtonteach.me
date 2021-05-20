// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	function sidebarToggle(){

		// const sideBtn = document.querySelector('.sidebar-btn');
		const aside   = document.querySelector('.sidebar');

		aside.classList.toggle('active');

	}

	window.sidebarToggle = sidebarToggle;
	// sidebarToggle();

})
