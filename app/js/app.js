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

	function uploadFile(){
		let form = document.querySelector('.update-user-information');
		let input = form.querySelector('input[type="file"]');
		input.click();
	}

	window.sidebarToggle = sidebarToggle;
	window.uploadFile = uploadFile;

	// function detectWidth(){
	// 	if (window.innerWidth < 992) {
	// 		aside.classList.remove('active');
	// 	}
	// }
	// detectWidth();

	// window.addEventListener('resize', detectWidth);

	// console.log(bootstrap);

})
