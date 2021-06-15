'use strict';

(function(w,d) {
// document.addEventListener('DOMContentLoaded', () => {

	// Открытие сайдбара
	d.querySelector('.sidebar-btn').addEventListener("click", function(el) {
		this.parentNode.classList.toggle('active');
	})
	d.querySelector('.sidebar .help').addEventListener("click", function(el) {
		d.querySelector('.grid').classList.toggle('active');
	})
	d.querySelector('.sidebar .invite').addEventListener("click", function(el) {
		d.querySelector('img.screenshot').classList.toggle('active');
	})

	function calcSizes() {
		d.querySelectorAll('.size').forEach(function(el){
			el.innerText = "size: "+el.parentNode.offsetWidth+"x"+el.parentNode.offsetHeight;
		});
	}

	calcSizes();
	w.addEventListener("resize", calcSizes, false);


// });
}) (window, document);