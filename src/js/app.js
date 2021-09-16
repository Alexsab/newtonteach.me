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

	$dropdown.each(function(i){
		let $this = $(this),
			$btn  = $this.find('button');

		$this.attr('data-id', i);
		// arr.push(obj);
		// console.log(arr);
		$btn.click(()=>{	
			if ($this.hasClass('is-active')) {
				closeDropdown($this);
			}else{
				$dropdown.removeClass('is-active');
				openDropdown($this);
			}
		})
	})

	// Клик по элементам выпадающего списка
	$('.new-dropdown-item').click(function(){
		let $th = $(this),
			id = $th.data('id');
			value = $th.data('value'),
			$parent = $th.closest('.new-dropdown'),
			$items = $parent.find('.new-dropdown-item'),
			$input = $parent.find('.new-dropdown-input');
		// обычный Dropdown
		if(!$parent.hasClass('new-dropdown-multi')){
			$items.removeClass('active');
			$th.addClass('active');
			$input.val(value);
			checkValueDropdown($parent);
			closeDropdown($parent);
		}else{ // Мульти Dropdown
			let arr = [];
			if ($input.val() != '') {
				arr = $input.val().split(',');				
			}

			$th.find('.new-label').toggleClass('active');
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
			}).join(',');
			// console.log(arr);
			$input.val(out);
			checkValueDropdown($parent);
		}

	})
	// При клике на любое место в документе
	$('body').click(function(e){
		if (!e.target.closest('.new-dropdown')) {
			closeDropdown($dropdown);
		}
	})
	// Нажатие на клавишу Esc
	$(document).keyup(function(e) {
		if (e.keyCode == 27) { //клавиша Esc
			closeDropdown($dropdown);
		}
	});
	// Функция открытия
	function openDropdown(el){
		el.addClass('is-active');
		el.find('.new-dropdown-list').slideDown(100);
	}
	// Функция закрытия
	function closeDropdown(el){
		el.removeClass('is-active');
		el.find('.new-dropdown-list').slideUp(100);
	}
	// Проверка, есть ли что-то в скрытом input
	function checkValueDropdown(selector){
		let inputValue = selector.find('.new-dropdown-input').val();
		if ( inputValue != '' ) {
			selector.find('.new-dropdown-value').html(inputValue.replace(',', ', '));									
			selector.addClass('is-selected');
		}else{
			selector.removeClass('is-selected');
		}
	}

	// End Dropdown

	// hashtag_choose-area --ADD--
	$('body').on('click', '.hashtag-choose-link', function(){
		let $th = $(this),
			id = $th.attr('href');
		bg = $th.data('bg');

		checkElementsInBlock($th, id);
		$.magnificPopup.open({
			items: {
				src: id,
				type: 'inline',
				fixedContentPos: true,
				preloader: false,
			}
		});

		return false;
	});

	// Устанавливаем checked, элементам в попап окне  
	function checkElementsInBlock(th, blockId){
		let elements = th.closest('.hashtag-area').find('.hashtag-element');
		let inputs = $(blockId).find('.new-label input');
		inputs.prop('checked', false);
		elements.each(function(){
			let id = $(this).data('id');
			inputs.each(function(){
				let inputId = $(this).data('id');
				if (inputId === id) {
					$(this).prop('checked', true);
				}
			});			

		});
	}

	$('.add').click(function(){
		let id = $(this).closest('.new-modal').attr('id');
		const checked = $(this).parent().prev().find('.new-label input:checked'); 

		let out = [];
		let values = [];
		let val = '';
		// console.log(checked);
		if (checked.length > 0) {
			checked.each(function(){
				let checkedId = $(this).data('id');
				let name = $(this).data('name');
				out.push(`<span class="hashtag hashtag-element rounded-pill text-white ${bg} d-inline-flex justify-content-between align-items-center small-text mx-0 me-1 lh-1 mb-2" data-id="${checkedId}">${name}<span class="ms-2 fs-6 lh-1 remove-btn">&times;</span></span>`)
				values.push(checkedId);
			})
			// console.log(out);

			val = values.map(function(item) {
				return item;
			}).join(',');
		}	

		$('a[href="#'+id+'"').prev().html(out);
		$('a[href="#'+id+'"').prev().prev().val(val);
		$.magnificPopup.close();	

		asd();

	});


	// удаление элемента
	function removeElement(btn, check = false, inputParent){
		if(check){
			let parent = btn.closest(inputParent),
				input = parent.find('input'),
				id = btn.parent().data('id'),
				values = input.val().split(',');

			values = values.filter(function(item) {
				return Number(item) !== id;
			});
			let out = values.map(function(item) {
				return item;
			}).join(',');
			input.val(out);
		}
		btn.parent().remove();
	}

	function asd(){
		$('.remove-btn').click(function(){
		removeElement($(this), true, '.hashtag-area');
	});
	}

	asd();

	// Загрузка аватарки (визуал)
	let files = [];
	$('input[type="file"]').on('change', function (event, files, label) {
		if (!event.target.files.length) {
			console.log('ERROR');
			return;
		}

		let sizeMb = event.target.files[0].size/1000000; // мегабайты

		if (sizeMb > 5) { // больше 5Мб
			console.log('ERROR SIZE');
			return;
		}

		files = Array.from(event.target.files); 
		// files[0] - работаем только с одним(первым) файлом, для мультизагрузки используем forEach

		if (!files[0].type.match('image')) {
			console.log('ERROR TYPE');
			return;
		}
		const reader = new FileReader();
		reader.onload = ev => {
			const src = ev.target.result
			$(this).next().attr('src', src);
		}
		reader.readAsDataURL(files[0]);
	});

	const isTouchDevice = () => {
		return (('ontouchstart' in window) ||
			(navigator.maxTouchPoints > 0) ||
			(navigator.msMaxTouchPoints > 0));
	}
	console.log(isTouchDevice())

	if (isTouchDevice()) {
		document.querySelector('html').classList.add('touch');
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