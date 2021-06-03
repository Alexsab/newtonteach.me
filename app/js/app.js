'use strict';
// // Import jQuery module (npm i jquery)
// import $ from 'jquery'
// window.jQuery = $
// window.$ = $

import 'bootstrap';
import {alert} from 'bootstrap/js/dist/alert';
//import {Circles} from 'circles';

// // Import vendor jQuery plugin example (not module)
// require('~/app/js/circles.js')

document.addEventListener('DOMContentLoaded', () => {

	// 'use strict';

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

	// Прокрутка Story

	window.onload = function () {
		
		const storyBlock = document.getElementById('story-block');

		function verScroll(startX){
			storyBlock.addEventListener('mousemove', function () {
				this.scrollLeft = startX - event.pageX;
				return false;
			});
		}

		storyBlock.addEventListener('mouseup', function () {
			this.style.cursor = 'grab';
			this.removeEventListener('mousemove', e => {}, false);
		});

		storyBlock.addEventListener('mousedown', function () {
			this.style.cursor = 'grabbing';
			var startX = this.scrollLeft + event.pageX;
			verScroll(startX);
		});
	}

	var colors = [
	['#D3B6C6', '#4B253A'], ['#FCE6A4', '#EFB917'], ['#BEE3F7', '#45AEEA'], ['#F8F9B6', '#D2D558'], ['#F4BCBF', '#D43A43']
	], circles = [];

	// for (var i = 1; i <= 5; i++) {
	// 	var child = document.getElementById('circles-' + i),
	// 	percentage = 31.42 + (i * 9.84);

	// 	circles.push(Circles.create({
	// 		id:         child.id,
	// 		value:		percentage,
	// 		radius:     60,
	// 		width:      10,
	// 		colors:     colors[i - 1]
	// 	}));
	// } 

	

});
