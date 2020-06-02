function dialog(obj, callback) {
	this.type = obj.type; //对话框的类型 默认alter
	this.title = obj.title; //对话框的标题
	this.message = obj.message; //对话框的显示信息
	this.placeholder = obj.placeholder; //编辑框显示的文字-prompt
	this.callback = callback; //回调函数
	this.duration = obj.duration;
	this.dragState = obj.drag;
	
	this.confirmState = null;
	this.promptMas = null;
	
	this.judge();
	
	// this.box = document.getElementsByClassName('dialog_box')[0];
	this.box = $('.dialog_box')
	this.posX = null;
	this.posY = null;
	this.posX2 = null;
	this.posY2 = null;
	this.drag();
}

// 添加
// dialog.prototype.add = function(){

// }
dialog.prototype.drag = function() {
	if(this.dragState){
		
		this.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
			this.clickEvent =this.device? "touchstart":"mousedown";
			this.moveEvent = this.device? "touchmove" : "mousemove";
			this.endEvent = this.device? "touchend" : "mouseup";
		
		//添加鼠标点击或手机点击事件
		var that = this;
		
		this.box.on(this.clickEvent,function(){
			//获取鼠标点击或手指点击式的视口坐标
			console.log(this)
			that.posX2 = (that.device ? event.touches[0].clientX : event.clientX) -$(this).position().left;
			that.posY2 =(that.device ? event.touches[0].clientY : event.clientY) -$(this).position().top;
			
			
			that.posY = (that.device ? event.touches[0].clientY: event.clientY) - that.posY2;
			that.isMouseDown = true; //鼠标按下	
		})
		this.box.on(this.moveEvent,function(){
			if (!that.isMouseDown) {
					return false;
				} else {
					// 调用canvas画线，将鼠标移动时坐标作为lineTo()参数传入。注意上一次点击时的坐标点作为画线的起始坐标
					that.posX = (that.device ? event.touches[0].clientX : event.clientX)
					that.posY = (that.device ? event.touches[0].clientY: event.clientY)
					
					$(this).css('left',that.posX+'px')
					$(this).css('top',that.posY+'px')
					
					
				}
		})
		this.box.on(this.endEvent,function(){
				that.isMouseDown = false; //鼠标未按下
		})
		// this.box.addEventListener(this.clickEvent, function(evt) {
		// 	var event = evt || window.event;
		// 	//获取鼠标点击或手指点击式的视口坐标
		// 	console.log(this)
		// 	that.posX2 = (that.device ? event.touches[0].clientX : event.clientX) -$(this).position().left;
		// 	that.posY2 =(that.device ? event.touches[0].clientY : event.clientY) -$(this).position().top;
			
			
		// 	that.posY = (that.device ? event.touches[0].clientY: event.clientY) - that.posY2;
		// 	that.isMouseDown = true; //鼠标按下
		// });
		// this.box.addEventListener(this.moveEvent, function(evt) {
		// 	if (!that.isMouseDown) {
		// 		return false;
		// 	} else {
		// 		var event = evt || window.event;
		// 		// 调用canvas画线，将鼠标移动时坐标作为lineTo()参数传入。注意上一次点击时的坐标点作为画线的起始坐标
		// 		that.posX = (that.device ? event.touches[0].clientX : event.clientX)
		// 		that.posY = (that.device ? event.touches[0].clientY: event.clientY)
				
		// 		$(this).css('left',that.posX+'px')
		// 		$(this).css('top',that.posY+'px')
				
				
		// 	}
		// })
		// this.box.addEventListener(this.endEvent, function(evt) {
		// 	that.isMouseDown = false; //鼠标未按下
			
		// })
	}
	
}
dialog.prototype.judge = function() {
	switch (this.type) {
		// 消息对话框
		case 'alter':

			var node = $(
				'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_buttons"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">确定</span></div></div></div>'
			)

			node.find('.dialog_popup_title').text(this.title)
			node.find('.dialog_popup_text').text(this.message)

			$('body').append(node);

			$('#confirm').on('click', function() {
				$('.dialog_container').remove()
			})

			break;

			// 确认对话框
		case 'confirm':
			var node = $(
				'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div></div><div class="dialog_popup_buttons"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">是</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">否</span></div></div></div>'
			)

			node.find('.dialog_popup_title').text(this.title)
			node.find('.dialog_popup_text').text(this.message)

			$('body').append(node);

			var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_buttons')[0]
			var that = this

			dialog_popup_buttons.addEventListener('click', function() {
				var target = event.target || event.srcElement;
				target = $(target)

				if (target.hasClass('dialog_popup_confirm')) {
					that.confirmState = true;
				} else {
					that.confirmState = false;
				}
				$('.dialog_container').remove()
				that.callback()
			})

			break;

			// 输入对话框
		case 'prompt':
			var node = $(
				'<div class="dialog_container"><div class="dialog_backdrop"></div><div class="dialog_box"><div class="dialog_inner"><div class="dialog_popup_title">提示</div><div class="dialog_popup_text">欢迎使用dialog</div><div class="dialog_popup_input"><input type="text" id="dialog_input" autofocus="" placeholder="性能好"></div></div><div class="dialog_popup_buttons"><span class="dialog_popup_buttons dialog_popup_confirm weight" id="confirm">确定</span><span class="dialog_popup_buttons dialog_popup_deny" id="deny">取消</span></div></div></div>'
			)

			node.find('.dialog_popup_title').text(this.title)
			node.find('.dialog_popup_text').text(this.message)

			$('body').append(node);
			
			var dialog_popup_buttons = document.getElementsByClassName('dialog_popup_buttons')[0]
			var that = this
			
			dialog_popup_buttons.addEventListener('click', function() {
				var target = event.target || event.srcElement;
				target = $(target)

				if (target.hasClass('dialog_popup_confirm')) {
					that.confirmState = true;
					that.promptMas = $('#dialog_input').val();
				} else {
					that.confirmState = false;
				}
				$('.dialog_container').remove()
				that.callback()
				// console.log(that.confirmState)
			})

			break;
			
			// 自动消失对话框
			case 'toast':
			
				var node =$('<div class="dialog_container"><div class="dialog_toast">欢迎使用dialog</div></div>')
			
				node.find('.dialog_toast').text(this.message)
			
				$('body').append(node);
				
				console.log(this.duration)
					
				if(typeof obj.duration == 'number' || obj.duration == 'slow' ||obj.duration == 'fast' || obj.duration == 'normal'){
				}else{
					obj.duration =10000
				}
				$('.dialog_container').animate({opacity:'0'},obj.duration)
				
				break;

	}


}
