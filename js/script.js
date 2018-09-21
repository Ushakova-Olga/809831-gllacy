/* Скрипт для главной страницы - модальное окно - Обратная связь */
try {
	
var popup_overlay = document.querySelector(".modal-overlay");
	
var link = document.querySelector(".relation-back-link");
var popup = document.querySelector(".modal-relation-back");
var close = popup.querySelector(".modal-close");
var form = popup.querySelector(".relation-back-form");
var client_name = popup.querySelector("[name=your-name]");
var client_email = popup.querySelector("[name=your-email]");
var client_text = popup.querySelector("[name=your-text]");
var isStorageSupport = true;
var storage = "";

try {
	storage[0] = localStorage.getItem("your-name");
	storage[1] = localStorage.getItem("your-email");
	storage[2] = localStorage.getItem("your-text");
	} catch (err) {
	isStorageSupport = false;
}
		
link.addEventListener("click", function (evt) {
evt.preventDefault();
popup.classList.add("modal-show");
popup_overlay.classList.add("modal-overlay-show");
		
if (storage[0]) {
    client_name.value = storage[0];
	  
	if (storage[1]) {
		client_email.value = storage[1];
	  
		if (storage[2]) {
			client_text.value = storage[2];
	  
			}else {
				client_text.focus();
				}
	  
		}else {
			client_email.focus();
			}
	  
    }else {
		client_name.focus();
		}
	
});
  
close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
	popup.classList.remove("modal-error");
	popup_overlay.classList.remove("modal-overlay-show");
});
  
form.addEventListener("submit", function (evt) {
    if (!client_name.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
		console.log("Нужно ввести имя");
    }else {
		if (isStorageSupport) {
			localStorage.setItem("client-name", client_name.value);
		}
    }
	
	if (!client_email.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
		console.log("Нужно ввести электронную почту");
    }else {
	if (isStorageSupport) {
		localStorage.setItem("client-email", client_email.value);
	  }
    }
	
	if (!client_text.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
		console.log("Нужно ввести текст сообщения");
    }else {
		if (isStorageSupport) {
			localStorage.setItem("client-text", client_text.value);
		}
    }
});
  
window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popup.classList.contains("modal-show")) {
			popup.classList.remove("modal-show");
			popup.classList.remove("modal-error");
			popup_overlay.classList.remove("modal-overlay-show");
		}
    }
});
}catch (err) {
/* Скрипт для страницы каталога - двойной ползунок с ценами */
var range = {
	min: 0,
	max: 700,
	step: 50
}

var form = document.querySelector('.filter-search-form')
var rangeBar = document.querySelector('.range-bar')
var leverMin = document.querySelector('.range-lever-min')
var leverMax = document.querySelector('.range-lever-max')
var scaleLength = document.querySelector('.range-scale').offsetWidth
form.price[0].step = range.step
form.price[0].step = range.step
form.price[1].max = range.max

var onValuesGetting = function () {
	var valueMin = form.price[0].value
	var valueMax = form.price[1].value
	var leverMinPos = scaleLength * valueMin / range.max + 'px' 
	var leverMaxPos = scaleLength * valueMax / range.max + 'px'
  
	form.priceOutput[0].value = valueMin
	form.priceOutput[1].value = valueMax
	form.price[0].max = valueMax
	form.price[1].min = valueMin
	rangeBar.style.left = leverMinPos
	rangeBar.style.right = 'calc(100% - ' + leverMaxPos + ')'
	leverMin.style.left = 'calc(' + leverMinPos + ' - ' + leverMin.offsetWidth / 2 + 'px)'
	leverMax.style.left = 'calc(' + leverMaxPos + ' - ' + leverMax.offsetWidth / 2 + 'px)'
}

var onLeverGrabbing = function (event) {
  event.preventDefault()
  var isEventTouch = event.type === 'touchstart'
  var eventMove = isEventTouch ? 'touchmove' : 'mousemove'
  var eventEnd = isEventTouch ? 'touchend' : 'mouseup'
  var control = event.target === leverMin ? form.price[0] : form.price[1]
  var moveStart = isEventTouch ? event.changedTouches[0].pageX : event.pageX
  var moveEnd = moveStart
  var initialValue = parseInt(control.value, 10)

  var getNewValue = function () {
    return Math.round((moveEnd - moveStart) * range.max / (range.step * scaleLength)) * range.step + initialValue
  }

  var onLeverMoving = function (event) {
    moveEnd = isEventTouch ? event.changedTouches[0].pageX : event.pageX
    control.value = getNewValue()
    onValuesGetting()
  }

  var onLeverReleasing = function (event) {
    event.preventDefault()
    document.removeEventListener(eventMove, onLeverMoving)
    document.removeEventListener(eventEnd, onLeverReleasing)
  }

  document.addEventListener(eventMove, onLeverMoving)
  document.addEventListener(eventEnd, onLeverReleasing)
}

form.addEventListener('change', onValuesGetting)
leverMin.addEventListener('mousedown', onLeverGrabbing)
leverMax.addEventListener('mousedown', onLeverGrabbing)
leverMin.addEventListener('touchstart', onLeverGrabbing)
leverMax.addEventListener('touchstart', onLeverGrabbing)

onValuesGetting()
}