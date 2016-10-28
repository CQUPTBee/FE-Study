var EventUtil = {
	addHandler: function(element, type, handler){
		if(element.addEventListener){
			element.addEventListener(type, handler, false);//除IE之外的浏览器支持DOM2级
		} else if(element.attachEvent){
			element.attachEvent("on"+type, handler);//IE
		} else {
			element["on"+type] = handler;//DOM0 级
		}
	},
	getEvent: function(event){
		return event ? event : window.event;
	},
	getTarget: function(event){
		return event.target || event.srcElement;
	},
	preventDefault: function(event){
		if(event.preventDefault){
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},

	removeHandler: function(element, type, handler){
		if(element.removeEventListener){
			element.removeEventListener(type, handler, false);//除IE之外的浏览器支持DOM2级
		} else if(element.detachEvent){
			element.detachEvent("on"+type, handler);//IE
		} else {
			element["on"+type] = null;//DOM0 级
		}
	},
	stopPropagation: function(event){
		if(event.stopPropagation){
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};

//調用方法
//var handler = function(){};
//EventUtil.addHandler(btn, "click", handler)
