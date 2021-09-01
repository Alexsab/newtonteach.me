'use strict';

$(function(){
	const chooseRoleLink = $('a#choose_role');

	function inputRoleCheck(){
		let check = false;
		const role = $('input[name=role]:checked').val();
		if(typeof(role) != 'undefined'){
			chooseRoleLink.removeClass('disabled');
			check = true;
		}			
		return check;
	}

	$('input[name=role]').on('change', () => {
		inputRoleCheck();
	});

	inputRoleCheck();

	chooseRoleLink.on('click', () => {
		let parent = $('.form-step.active');
		if (!inputRoleCheck()){
			return;
		}else{
			parent.removeClass('active').next().addClass('active');
		}
		return false;
	});

	$('.back-link').on('click', () => {
		let parent = $('.form-step.active');
		parent.removeClass('active').prev().addClass('active');
		return false;
	});

	$('form#sign_up').submit( function() {

		$('.form-step').removeClass('active');
		$('.success-register').addClass('active');

		return false;
	});
	


	$('#welcome-slider').slick({
		arrows: false,
		dots: true,
		appendDots: $('#new-dots'),
		speed: 200
	});

	// Преобразование img to svg
	$('img.img-svg').each(function(){
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}
			$svg = $svg.removeAttr('xmlns:a');
			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}
			$img.replaceWith($svg);
		}, 'xml');
	});

	// Dropdown

	const $dropdown = $('.new-dropdown');

	$dropdown.each(function(){
		let $this = $(this),
			$btn  = $this.find('button');
		$btn.click(()=>{	
			if ($this.hasClass('is-active')) {
				closeDropdown($this);
			}else{
				$dropdown.removeClass('is-active');
				openDropdown($this);
			}
		})
	})

	let arr = [];

	$('.new-dropdown-item').click(function(){
		let $th = $(this),
			value = $th.data('value'),
			$parent = $th.closest('.new-dropdown')
			$items = $parent.find('.new-dropdown-item'),
			$input = $parent.find('input[type="hidden"]');

		if(!$parent.hasClass('new-dropdown-multi')){
			$items.removeClass('active');
			$th.addClass('active');
			$input.val(value);
			checkValueDropdown($parent);
			closeDropdown($parent);
		}else{

			$th.toggleClass('active');
			if ($.inArray(value, arr) == -1) {
				arr.push(value);
			}else{
				arr = arr.filter(function(item) {
					return item !== value
				})
			}
			let out = arr.map(function(item) {
				return item;
			}).join(', ');
			$input.val(out);
			checkValueDropdown($parent);
		}

	})

	$('body').click(function(e){
		if (!e.target.closest('.new-dropdown')) {
			closeDropdown($dropdown);
		}
	})

	$(document).keyup(function(e) {
		if (e.keyCode == 27) { //клавиша Esc
			closeDropdown($dropdown);
		}
	});

	function openDropdown(el){
		el.addClass('is-active');
	}

	function closeDropdown(el){
		el.removeClass('is-active');
	}

	function checkValueDropdown(selector){
		let inputValue = selector.find('input[type="hidden"]').val();
		if ( inputValue != '' ) {
			selector.find('.new-dropdown-value').html(inputValue);									
			selector.addClass('is-selected');
		}else{
			selector.removeClass('is-selected');
		}
	}

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