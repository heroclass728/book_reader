var option = {
	reader : '#BookReader',
	onePage: '.onepg',
	twoPage: '.twopg',
	isResponsive: false,
}

$(document).ready(function(){
	 var isReader = ($(option.reader)[0]) ? true : false; //check weather the reader is load or not
	 detectBWidth(isReader);
	 if($(window).innerWidth() < 480) {
	 	zoomPage();
	 	enableMobileSearch();
	 }
	 $(window).resize(function() {
	 	detectBWidth(isReader);
	 });
});

function detectBWidth(elem) {
	if(elem && $(window).innerWidth() < 480) {
		$(option.onePage).trigger('click');
	} else {
		$(option.twoPage).trigger('click');
	}
}

function enableMobileSearch() {
	var searchBtn = $('.search_book');
	var isEnable = false;
	searchBtn.on("click",function() {
		if(isEnable) {
			isEnable = false;
			$('.BRtoolbarSection').removeClass('active');
		} else {
			isEnable = true;
			$('.BRtoolbarSection').addClass('active');
		}
	});
}

/**
   * Element.requestFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!Element.prototype.requestFullscreen) {
	Element.prototype.requestFullscreen = Element.prototype.mozRequestFullscreen || Element.prototype.webkitRequestFullscreen || Element.prototype.msRequestFullscreen;
}

/**
 * document.exitFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.exitFullscreen) {
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

/**
 * document.fullscreenElement polyfill
 * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.fullscreenElement) {

	Object.defineProperty(document, 'fullscreenElement', {
		get: function() {
			return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
		}
	});

	Object.defineProperty(document, 'fullscreenEnabled', {
		get: function() {
			return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
		}
	});
}

// override our fullscreen functionality
BookReader.prototype.enterFullscreen = function() {
	this.isFullscreenActive = true;
	document.documentElement.requestFullscreen();
}

BookReader.prototype.exitFullScreen = function() {
	this.isFullscreenActive = false;
	document.exitFullscreen();
}


//zoom feature


function zoomPage() {
	var init = false,
	timeout,
	lastTap = 0,
	elem = document.getElementById('BookReader');
	elem.addEventListener('touchend', function(event) {
	    var currentTime = new Date().getTime();
	    var tapLength = currentTime - lastTap;
	    clearTimeout(timeout);
	    if (tapLength < 500 && tapLength > 0) {
	        if(init) {
		    	init = false;
		    	$('.zoom_out').trigger('click');
		    } else {
		    	init = true;
		    	$('.zoom_in').trigger('click');
		    }
	    }
	    lastTap = currentTime;
	});
}







// var ResizeBookReader;
// var $IABookReaderWrapper = $('#IABookReaderWrapper');
// var $IABookReaderMessageWrapper = $('#IABookReaderMessageWrapper');
// var $BookReader = $('#BookReader');
// var $ReaderWrapper = $('.BRpageview');
// ResizeBookReader = function() {
// 	$BookReader.css({
// 	  	height: $IABookReaderWrapper.innerHeight() - $IABookReaderMessageWrapper.outerHeight()
// 	});
// 	window.br.resize();
// 	$ReaderWrapper.css({
// 		width: $IABookReaderWrapper.innerWidth()
// 	});
// };
// ResizeBookReader();
// $(window).resize(throttle(function() {
// 	ResizeBookReader();
// }));
// $(document).bind('IABookReader:ResizeBookReader', ResizeBookReader);
