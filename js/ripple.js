/**
 * 
 */
;
(function($, window, document, undefined){
	var defaults = {
			duration : 750,
			color : 'rgba(255, 255, 255, 0.5)',
			timingFunction : 'linear'
		};
	function Ripple(element, options){
		this.element = $(element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}
	Ripple.prototype = {
		init : function() {
			this._createRippleLayer(this.options);

		},
		_createRippleLayer : function(options) {
			this.element.css({
				overflow : 'hidden'
			});
			this.ripple = document.createElement('span');
			$(this.ripple).attr('class', 'ripple');
			maxlength = Math.max(this.element.outerWidth(), this.element.outerHeight());
			$(this.ripple).css({
				height : maxlength,
				width : maxlength
			});
			this.element.append(this.ripple);
			this.element.bind('click', this, this.activeRipple);

		},
		activeRipple : function(event) {
			event.stopPropagation();
			var self = event.data;
			var rippleWidth = self.ripple.style.width;
			var rippleHeight = self.ripple.style.height;
			var x = event.pageX - $(this).offset().left
					- rippleWidth.substr(0, rippleWidth.length - 2) / 2;
			var y = event.pageY - $(this).offset().top
					- rippleHeight.substr(0, rippleHeight.length - 2) / 2;
			$(self.ripple).css({
				top : y + "px",
				left : x + "px",
				background : self.options.color,
				animationDuration : self.options.duration / 1000 + 's',
				animationTimingFunction : self.options.timingFunction
			});
			$(self.ripple).addClass('ripple-active');
			setTimeout(function() {
				$(self.ripple).removeClass('ripple-active');
			}, self.options.duration);
		}

	}
	$.fn.ripple = function(options) {
		new Ripple(this,options);
	};
	
	

})(window.jQuery, window, document);;