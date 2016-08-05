/**
 * 
 */
;
(function($) {
	var options;
	var methods = {
		init : function(settings) {
			options = $.extend(true, {}, $.fn.ripple.defaults, settings);
			this._createRippleLayer(options);

		},
		_createRippleLayer : function(options) {
			element.css({
				overflow : 'hidden'
			});
			var ripple = document.createElement('span');
			$(ripple).attr('class', 'ripple');
			maxlength = Math.max(element.outerWidth(), element.outerHeight());
			$(ripple).css({
				height : maxlength,
				width : maxlength
			});
			element.append(ripple);
			element.bind('click', ripple, methods.activeRipple);

		},
		activeRipple : function(event) {
			event.stopPropagation();
			var ripple = event.data;
			var rippleWidth = ripple.style.width;
			var rippleHeight = ripple.style.height;
			var x = event.pageX - $(this).offset().left
					- rippleWidth.substr(0, rippleWidth.length - 2) / 2;
			var y = event.pageY - $(this).offset().top
					- rippleHeight.substr(0, rippleHeight.length - 2) / 2;
			$(ripple).css({
				top : y + "px",
				left : x + "px",
				background : $(this).attr('data-rpcolor'),
				animationDuration : options.duration / 1000 + 's',
				animationTimingFunction : options.timingFunction
			});
			$(ripple).addClass('ripple-active');
			setTimeout(function() {
				$(ripple).removeClass('ripple-active');
			}, options.duration);
		}

	}
	$.fn.ripple = function(settings) {
		element = this;
		methods.init(settings);
	};
	
	$.fn.ripple.defaults = {
		duration : 750,
		color : 'rgba(255, 255, 255, 0.5)',
		timingFunction : 'linear'
	};

})(jQuery);