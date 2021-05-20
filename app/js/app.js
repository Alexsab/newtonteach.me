// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

import bootstrap from 'bootstrap'

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	const aside = document.querySelector('.sidebar');

	function sidebarToggle(){
		aside.classList.toggle('active');
	}

	window.sidebarToggle = sidebarToggle;
	// sidebarToggle();

	function detectWidth(){
		if (window.innerWidth < 992) {
			aside.classList.remove('active');
		}else{
			aside.classList.add('active');
		}
	}
	detectWidth();

	window.addEventListener('resize', detectWidth);

	console.log(bootstrap);

})
