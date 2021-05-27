// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

import 'bootstrap';
import {alert} from 'bootstrap/js/dist/alert';
// import {Alert} from 'bootstrap'

// // Import vendor jQuery plugin example (not module)
// require('~/app/libs/mmenu/dist/mmenu.js')

document.addEventListener('DOMContentLoaded', () => {

	// Выбор тарифа подписки - страница subscriptions.html
	const optionCardItems = document.querySelectorAll('.option-card-item');

	if (optionCardItems.length > 0) {
		optionCardItems.forEach((item)=>{
			item.addEventListener('click', (e)=>{
				optionCardItems.forEach((el)=>{
				el.classList.remove('bought');
				})
				item.classList.add('bought');
			})
		})
	}

	// Открытие сайдбара
	const aside = document.querySelector('.sidebar');

	function sidebarToggle(){
		aside.classList.toggle('active');
	}
	window.sidebarToggle = sidebarToggle;

	// Кастомная ссылка загрузки выбора файла
	function uploadFile(){
		let form = document.querySelector('.update-user-information');
		form.querySelector('input[type="file"]').click();
	}

	window.uploadFile = uploadFile;

	// Прокрутка Story как ВК

	// window.onload = function () {
	// 	var scr = document.querySelector(".story-block");
	// 	scr.mousedown(function () {
	// 		$(this).css('cursor', 'grabbing');
	// 		var startX = this.scrollLeft + event.pageX;
	// 		var startY = this.scrollTop + event.pageY;
	// 		scr.mousemove(function () {
	// 			this.scrollLeft = startX - event.pageX;
	// 			this.scrollTop = startY - event.pageY;
	// 			return false;
	// 		});
	// 	});

	// 	$(window).mouseup(function () {
	// 		scr.off("mousemove").css('cursor', 'grab');
	// 	});
	// } 

})
