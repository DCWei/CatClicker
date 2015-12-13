var model = {
	catsList: [
		{
			picture: "images/cat.jpg",
			name: "Cindy",
			clickNum: 0
		},
		{
			picture: "images/cat2.jpg",
			name: "Max",
			clickNum: 0
		}
	],
	getAllObjs: function() {
		return this.catsList;
	},
	selectObj: function(idx) {
		return this.catsList[idx];
	},
	incrementClickNum: function(idx) {
		this.catsList[idx].clickNum++;
	},
	setCurrentId: function(idx) {
		this.currentItemId = idx;
	},
	getCurrentId: function() {
		return this.currentItemId;
	},
	init: function() {
		this.currentItemId = 0;
	}
};

var control = {
	init: function() {
		model.init();
		viewMenu.init();
		viewMain.init();
	},
	getAllObjs: function() {
		return model.getAllObjs();
	},
	selectObj: function(idx) {
		return model.selectObj(idx);
	},
	addClickNum: function(idx) {
		model.incrementClickNum(idx);
		viewMain.render(idx);
	},
	setCurrentId: function(idx) {
		model.setCurrentId(idx);
	},
	getCurrentId: function() {
		return model.getCurrentId();
	}

}

var viewMain = {
	render: function(idx) {
		var item = control.selectObj(idx);
		control.setCurrentId(idx);

		this.clear();
		this.$catHeader.append('<h1>' + item.name + '</h1>');
		this.$catImage.append('<img id="catPic" src="' + item.picture + '" alt="' + item.name + '" />');
		//this.$catImage.find('#catPic').attr('data-id',idx.toString());
		this.$catImage.find('#catPic').click(function(e){
			control.addClickNum(control.getCurrentId());
		});
		this.$catClickNum.append('<h3>Number of clicks: ' + item.clickNum + '</h3>');
	},
	clear: function() {
		this.$catHeader.html('');
		this.$catImage.html('');
		this.$catClickNum.html('');
	},
	init: function() {
		this.$catHeader = $('#catHeader');
		this.$catImage = $('#catImage');
		this.$catClickNum = $('#catClickNum');
		this.render(control.getCurrentId());
	}
}

var viewMenu = {
	render: function() {
		var list = control.getAllObjs();
		for(i=0;i<list.length;i++)
		{
			var item = list[i];
			var htmlStr = this.listItemTemplate;
			htmlStr = htmlStr.replace(/{{id}}/g, i);
			htmlStr = htmlStr.replace(/{{name}}/g, item.name);
			this.$menuList.append(htmlStr);
			this.$menuList.find('li:last-of-type div').click(function(e){
				viewMain.render($(this).parent('li').data('id'));
			});
		}
	},
	init: function() {
		this.listItemTemplate = $('script[data-template="cat-list-item"]').html();
		this.$menuList = $('.cat-list');
		viewMenu.render();
	}
}

control.init();