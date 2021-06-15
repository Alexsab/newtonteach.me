'use strict';

(function(w,d) {
// document.addEventListener('DOMContentLoaded', () => {

	// Открытие сайдбара
	d.querySelector('.sidebar-btn').addEventListener("click", function(el) {
		this.parentNode.classList.toggle('active');
	})

// });
}) (window, document);