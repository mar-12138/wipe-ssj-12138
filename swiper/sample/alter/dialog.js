function dialog(obj) {
	this.w = obj.w
	this.h = obj.h
	this.dragState = obj.dragState

	this.box = $('.dialog_box')
	this.posX = null;
	this.posY = null;
	this.posX2 = null;
	this.posY2 = null;
	// this.dragging()
}


dialog.prototype.size = function(w, h) {
	$(".dialog_box").css({
		width: w + "px",
		height: h + "px"
	})

}
// 拖动
dialog.prototype.dragging = function() {
	var that = this
	if (this.dragState) {

		this.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		this.clickEvent = this.device ? "touchstart" : "mousedown";
		this.moveEvent = this.device ? "touchmove" : "mousemove";
		this.endEvent = this.device ? "touchend" : "mouseup";

		//添加鼠标点击或手机点击事件
		var that = this;

		$('.dialog_box').on(this.clickEvent, function() {
			//获取鼠标点击或手指点击式的视口坐标
			that.posX2 = (that.device ? event.touches[0].clientX : event.clientX) - $('.dialog_box').position().left;
			that.posY2 = (that.device ? event.touches[0].clientY : event.clientY) - $('.dialog_box').position().top;
			that.isMouseDown = true; //鼠标按下	
		})
		$('.dialog_box').on(this.moveEvent, function() {
			if (!that.isMouseDown) {
				return false;
			} else {
				// 调用canvas画线，将鼠标移动时坐标作为lineTo()参数传入。注意上一次点击时的坐标点作为画线的起始坐标
				that.posX = (that.device ? event.touches[0].clientX : event.clientX) - that.posX2
				that.posY = (that.device ? event.touches[0].clientY : event.clientY) - that.posY2
				$(this).css({
					'left': that.posX + 'px',
					'top': that.posY + 'px',
					'transform': 'none'
				})

			}
		})
		$('.dialog_box').on(this.endEvent, function() {
			that.isMouseDown = false; //鼠标未按下
		})
	}
	if (this.dragState) {
		if (this.posX != null && this.posY != null) {

			$('.dialog_box').css({
				'left': this.posX + 'px',
				'top': this.posY + 'px',
				'transform': 'none'
			})
		}
	}

}

// toast
dialog.prototype.toast = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_toast"><p class="dialog-icon"><i class=""></i></p><p class="dialog-message">欢迎使用dialog</p></div></div>'
	)
	var t1 = null

	switch (obj.icon) {
		case 'success':
			node.find('.dialog_toast .dialog-icon i').addClass("weui-icon-success weui-icon_msg")
			break;
		case 'tips':
			node.find('.dialog_toast .dialog-icon i').addClass("weui-icon-info weui-icon_msg")
			break;
		case 'warning':
			node.find('.dialog_toast .dialog-icon i').addClass("weui-icon-warn weui-icon_msg-primary")
			break;
		case 'risk':
			node.find('.dialog_toast .dialog-icon i').addClass("weui-icon-warn weui-icon_msg")
			break;
		case 'loding':
			node.find('.dialog_toast .dialog-icon i').addClass("weui-icon-waiting weui-icon_msg")
			break;
		default:
			break;

	}


	node.find('.dialog_toast .dialog-message').text(obj.message)

	$('body').append(node);

	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		obj.size(obj.w, obj.h)
	}
	// 改变宽高
	if (typeof obj.boxSizing != 'undefined') {
		console.log(obj.boxSizing)
		console.log($('.dialog_container'))
		$('.dialog_toast').css({
			'width': obj.boxSizing.w + obj.boxSizing.type,
			'height': obj.boxSizing.h + obj.boxSizing.type,

		})
	}
	// 改变位置
	if (typeof obj.position != 'undefined') {
		console.log(obj.boxSizing)
		console.log($('.dialog_container'))
		$('.dialog_toast').css({
			'top': obj.position.t + obj.position.type,
			'left': obj.position.l + obj.position.type,

		})
	}

	if (typeof obj.duration == 'number' || obj.duration == 'slow' || obj.duration == 'fast' || obj.duration == 'normal') {

	} else {
		obj.duration = 10000
	}

	switch (obj.duration) {
		case 'fast':
			obj.duration = 500
			break;

		case 'slow':
			obj.duration = 1500
			break;

		case 'normal':
			obj.duration = 1000
			break;

	}

	$('.dialog_container').animate({
		opacity: '0'
	}, obj.duration)

	clearTimeout(t1)
	t1 = setTimeout(function() {
		$('.dialog_container').remove()

	}, obj.duration)

}


// alter
dialog.prototype.alter = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_ft"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">确定</span></div></div></div>'
	)
	var config = {
		title: obj.title,
		message: obj.message,
		onOk: obj.onOk
	}



	node.find('.dialog_popup_title').text(config.title)
	node.find('.dialog_popup_text').text(config.message)
	if (config.con) {
		node.find('#confirm').text(config.con)
	}


	$('body').append(node);

	this.dragging()
	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}

	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}


	$('#confirm').on('click', function() {
		$('.dialog_container').remove()
		if (typeof obj.onOk == 'function') {
			obj.onOk()
		}
	})
}

// 确认对话框
dialog.prototype.confirm = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_ft"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">是</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">否</span></div></div></div>'
	)

	var config = {
		title: obj.title,
		message: obj.message,
		con: obj.con,
		can: obj.can,
	}


	node.find('.dialog_popup_title').text(config.title)
	node.find('.dialog_popup_text').text(config.message)
	if (config.con) {
		node.find('#confirm').text(config.con)
	}
	if (config.can) {
		node.find('#deny').text(config.can)
	}

	$('body').append(node);

	this.dragging()
	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}


	var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_ft')[0]
	var that = this

	dialog_popup_buttons.addEventListener('click', function() {
		var target = event.target || event.srcElement;
		target = $(target)

		if (target.hasClass('dialog_popup_confirm')) {
			if (typeof obj.onOk == 'function') {
				obj.onOk()
			}
		} else {
			if (typeof obj.onCancel == 'function') {
				obj.onCancel()
			}
		}
		$('.dialog_container').remove();

	})
}


// prompt
dialog.prototype.prompt = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div><div class="dialog_popup_input"><input type="text" id="dialog_input" autofocus="" placeholder="性能好"></div></div><div class="dialog_popup_ft"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">确定</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">取消</span></div></div></div>'
	)

	var config = {
		title: obj.title,
		message: obj.message,
		con: obj.con,
		can: obj.can,
	}


	node.find('.dialog_popup_title').text(config.title)
	node.find('.dialog_popup_text').text(config.message)
	if (config.con) {
		node.find('#confirm').text(config.con)
	}
	if (config.can) {
		node.find('#deny').text(config.can)
	}

	$('body').append(node);

	this.dragging()
	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}


	var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_ft')[0]
	var that = this

	dialog_popup_buttons.addEventListener('click', function() {
		var target = event.target || event.srcElement;
		target = $(target)

		if (target.hasClass('dialog_popup_confirm')) {
			if (typeof obj.onOk == 'function') {
				obj.onOk($('#dialog_input').val())
			}
		} else {
			if (typeof obj.onCancel == 'function') {
				obj.onCancel()
			}
		}
		$('.dialog_container').remove()
	})


}


// 确认对话框
dialog.prototype.modal = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_ft"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">是</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">否</span></div></div></div>'
	)

	var config = {
		title: obj.title,
		message: obj.message,
		con: obj.con,
		can: obj.can,
	}


	node.find('.dialog_popup_title').text(config.title)
	node.find('.dialog_popup_text').text(config.message)
	if (config.con) {
		node.find('#confirm').text(config.con)
	}
	if (config.can) {
		node.find('#deny').text(config.can)
	}

	$('body').append(node);

	this.dragging()
	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}


	var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_ft')[0]
	var that = this

	dialog_popup_buttons.addEventListener('click', function() {
		var target = event.target || event.srcElement;
		target = $(target)

		if (target.hasClass('dialog_popup_confirm')) {
			if (typeof obj.onOk == 'function') {
				obj.onOk()
			}
		} else {
			if (typeof obj.onCancel == 'function') {
				obj.onCancel()
			}
		}
		$('.dialog_container').remove()
	})
}



// modal
dialog.prototype.modal = function(obj) {
	var node = $(
		'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_ft"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">是</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">否</span></div></div></div>'
	)

	var config = {
		title: obj.title,
		message: obj.message,
		buttons: obj.buttons,
	}


	node.find('.dialog_popup_title').text(config.title)
	node.find('.dialog_popup_text').text(config.message)
	var str = ''

	config.buttons.forEach(function(item, index, self) {
		// console.log(item)
		if (item.className != undefined) {
			str += '<span class="dialog_popup_buttons ' + item.className + '"  data-index=' + index + '>' + item.text +
				'</span>'
		} else {
			str += '<span class="dialog_popup_buttons "  data-index=' + index + '>' + item.text + '</span>'
		}

	})


	node.find('.dialog_popup_ft').html(str)

	$('body').append(node);

	this.dragging()
	changeStyle(obj.target, obj.className)


	if (typeof obj.w == 'number') {
		this.size(obj.w, obj.h)
	}


	var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_ft')[0]
	var that = this

	$('.dialog_popup_ft span.dialog_popup_buttons ').on('click', function() {

		var num = $(this).attr('data-index')
		config.buttons[num].onClick()

		$('.dialog_container').remove()
	})






}

function changeStyle(obj, clas) {
	// console.log(
	// Array.isArray(obj)
	// )
	if (Array.isArray(obj)) {
		obj.forEach(function(v, i) {
			$(v).addClass(clas[i])
		})
	} else {
		$(obj).addClass(clas)
	}

}
