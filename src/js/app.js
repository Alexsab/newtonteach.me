'use strict';

	$('#welcome-slider').slick({
		arrows: false,
		dots: true,
		appendDots: $('#new-dots'),
		speed: 200
	});

(function(w,d) {

	// Открытие сайдбара
	d.querySelector('.sidebar-btn').addEventListener("click", function(el) {
		this.parentNode.classList.toggle('active');
	})

	d.querySelectorAll('.showEl').forEach(function(el) {
		el.addEventListener("click", function(elel) {
			el.classList.toggle('active');
			var what = el.dataset.el;
			switch(what) {
				case "grid":
					d.querySelector('.grid').classList.toggle('active');
					d.querySelector('.blocks').classList.toggle('active');
					break;
				default:
					active("."+what);
			}
		});
	});
	function active(selector) {
		d.querySelectorAll(selector).forEach(function(el) {
			el.classList.toggle('active');
		})
	}
	function calcSizes() {
		d.querySelectorAll('.size').forEach(function(el){
			el.innerText = "size: "+el.parentNode.offsetWidth+"x"+el.parentNode.offsetHeight;
		});
	}

	calcSizes();
	w.addEventListener("resize", calcSizes, false);


}) (window, document);