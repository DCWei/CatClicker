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
	},
	updateObj: function(idx,name,url,num) {
		this.catsList[idx].name = name;
		this.catsList[idx].pciture = url;
		this.catsList[idx].clickNum = num;
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
	},
	updateSettings: function(idx,name,url,num) {
		console.log(idx,name,url,num);
		model.updateObj(idx,name,url,num);
	}

}

var viewMain = {
	render: function(idx) {
		control.setCurrentId(idx);
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
	setAdminSettings: function(item) {
		$("#inputName").val(item.name);
		$("#inputUrl").val(item.picture);
		$("#inputClickNum").val(item.clickNum);
	},
	showAdminSetting: function() {
		this.$CatSettings.removeClass("inputCatSettins-disable");
		this.$CatSettings.addClass("inputCatSettins-enable");
	},
	hideAdminSetting: function() {
		this.$CatSettings.removeClass("inputCatSettins-enable");
		this.$CatSettings.addClass("inputCatSettins-disable");
	},
	init: function() {
		var idx = control.getCurrentId();
		this.$catHeader = $('#catHeader');
		this.$catImage = $('#catImage');
		this.$catClickNum = $('#catClickNum');
		this.$adminBtn = $('#adminBtn');
		this.$CatSettings = $('#CatSettings');
		this.$cancelBtn = $('#cancelBtn');
		this.$CatSettings.submit(function(e){
			var idx = control.getCurrentId();
			var name = $('#inputName').val();
			var url = $('#inputUrl').val();
			var num = $('#inputClickNum').val();
			control.updateSettings(idx, name, url, num);
			viewMain.hideAdminSetting();
			viewMain.render(idx);
			e.preventDefault();
		});
		this.$cancelBtn.click(function(e){
			var catItem = control.selectObj(control.getCurrentId());
			viewMain.setAdminSettings(catItem);
			viewMain.hideAdminSetting();
			e.preventDefault();
		});


		this.$adminBtn.click(function(e) {
			console.log(e.target);
			console.log(viewMain.$CatSettings);
			if(viewMain.$CatSettings.attr("class") === "inputCatSettins-disable")
			{
				viewMain.showAdminSetting();
				var catItem = control.selectObj(idx);
				viewMain.setAdminSettings(catItem);
			}
			else
			{
				viewMain.hideAdminSetting();
			}
		});
		this.render(idx);
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