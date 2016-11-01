/*
 *  jquery-boilerplate - v4.1.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;( function( $, window, document, undefined ) {

	"use strict";

		// undefined is used here as the undefined global variable in ECMAScript 3 is
		// mutable (ie. it can be changed by someone else). undefined isn't really being
		// passed in so we can ensure the value of it is truly undefined. In ES5, undefined
		// can no longer be modified.

		// window and document are passed through as local variables rather than global
		// as this (slightly) quickens the resolution process and can be more efficiently
		// minified (especially when both are regularly referenced in your plugin).

		// Create the defaults once
		var pluginName = "easySlider",
			defaults = {
				slideSpeed: 500,
				paginationSpacing: "15px",
				paginationDiameter: "12px",
				paginationPositionFromBottom: "20px",
				controlsClass: ".controls",
				slidesClass: ".slides",
				paginationClass: ".pagination"
			};

		// The actual plugin constructor
		function Plugin (element, options) {
			this.element = element;

			// jQuery has an extend method which merges the contents of two or
			// more objects, storing the result in the first object. The first object
			// is generally empty as we don't want to alter the default options for
			// future instances of the plugin
			this.settings = $.extend({}, defaults, options);
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		// Avoid Plugin.prototype conflicts
		$.extend( Plugin.prototype, {
			init: function() {

				// Place initialization logic here
				// You already have access to the DOM element and
				// the options via the instance, e.g. this.element
				// and this.settings
				// you can add more functions like the one below and
				// call them like the example below
				this.setProperties();
				this.positionPagination();
				this.slideParameters.setCurrentSlideNumber.call(this, 1);
				this.events.clickRight.call(this);
				this.events.clickLeft.call(this);
				this.events.clickPage.call(this);
			},						
			events: {
				clickRight: function() {
							var _this = this;
							$(this.settings.controlsClass+" "+"li:last-child").click(
								function() {
									if (_this.slideParameters.getCurrentSlideNumber.call(_this) === _this.slideParameters.getNumberOfSlides.call(_this)) {
										//go to first slide, when slideshow has reached max distance
										$(_this.settings.slidesClass).animate({right: "0%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, 1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									} else {
										//go to next slide
										$(_this.settings.slidesClass).animate({right: "+=100%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getCurrentSlideNumber.call(_this)+1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									}
								});
				},
				clickLeft: 	function() {
							var _this = this;
							$(this.settings.controlsClass + " " + "li:first-child").click(	
								function() {
									if (_this.slideParameters.getCurrentSlideNumber.call(_this) === 1) {
										//go to first slide, when slideshow has reached max distance
										$(_this.settings.slidesClass).animate({right: (_this.slideParameters.getMaxSlidePercentage.call(_this)-100).toString()+"%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getNumberOfSlides.call(_this));
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									} else {
										//go to next slide
										$(_this.settings.slidesClass).animate({right: "-=100%"}, _this.settings.slideSpeed);
										_this.slideParameters.setCurrentSlideNumber.call(_this, _this.slideParameters.getCurrentSlideNumber.call(_this)-1);
										_this.paginate(_this.slideParameters.getCurrentSlideNumber.call(_this));
									}
								});
				},
				clickPage: function() {
							var _this = this;
							$(this.settings.paginationClass + " " + "li").click(
								function() {
									var currentSlideNumber = $(this).index()+1;
									$(_this.settings.slidesClass).animate({right: ((currentSlideNumber-1)*100).toString()+"%"}, 500);
									_this.paginate(currentSlideNumber);
								});
				}
			},
			paginate: function(currentSlideNumber) {
				var i;
				var total = this.slideParameters.getNumberOfSlides.call(this);
				for (i=1; i<=total; i++) {
					$(this._defaults.paginationClass + " " + "li:nth-child"+ "(" + i.toString() + ")").removeClass("active");
				}
				$(this._defaults.paginationClass + " " + "li:nth-child"+ "(" + currentSlideNumber.toString() + ")").addClass("active");
				this.slideParameters.setCurrentSlideNumber.call(this, currentSlideNumber);
			},
			positionPagination: function() {
				var numberOfSlides = this.slideParameters.getNumberOfSlides.call(this);
				var marginLeft = -(numberOfSlides*(this.convertStringToInteger(this.settings.paginationDiameter)) + (numberOfSlides-1)*(this.convertStringToInteger(this.settings.paginationSpacing)))/2;
				
				$(this.settings.paginationClass).css("margin-left", marginLeft);
			},
			slideParameters: {
				setCurrentSlideNumber: function(currentSlideNumber) {
					this.currentSlideNumber = currentSlideNumber;
				},
				getCurrentSlideNumber: function() {
					return this.currentSlideNumber;
				},
				getNumberOfSlides: function() {
					return $(this._defaults.slidesClass).children().length;
				},
				getSlideWidth: function() {
					return $(this._defaults.slidesClass + " " + "li").width();
				},
				getMaxSlideDistance: function() {
					return ((this.getNumberOfSlides()-1)*this.getSlideWidth());
				},
				getMaxSlidePercentage: function() {
					return this.slideParameters.getNumberOfSlides.call(this)*100;
				},
			},
			convertStringToInteger: function(string) {
				return parseInt((string).replace(/[^0-9.]/g, ""));
			},
			setProperties: function() {
				$("#slider").css({
					"position": "relative",
					"overflow": "hidden"
					});
				$(this.settings.slidesClass).css({
					"position": "relative",
					"width": this.slideParameters.getMaxSlidePercentage.call(this).toString()+"%"
					});
				$(this.settings.controlsClass).css({
					"cursor": "pointer"
					});
				$(this.settings.controlsClass+" "+"li").css({
					"position": "absolute"
					});
				$(this.settings.slidesClass+" "+"li").css({
					"width": 100/this.slideParameters.getNumberOfSlides.call(this).toString()+"%",
					"float": "left"
					});
				$(this.settings.paginationClass).css({
					"position": "relative",
					"left": "50%",
					"bottom": this.settings.paginationPositionFromBottom
					});
				$(this.settings.paginationClass+" "+"li").css({
					"margin-right": this.settings.paginationSpacing,
					"float": "left",
					"cursor": "pointer",
					"width": this.settings.paginationDiameter,
					"height": this.settings.paginationDiameter,
					"border-radius": "9999px"
					});
			}
		});

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
