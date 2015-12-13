var catsList = [
	{
		"picture": "images/cat.jpg",
		"name": "Cindy",
		"clickNum": 0
	},
	{
		"picture": "images/cat2.jpg",
		"name": "Max",
		"clickNum": 0
	}
];

function renderMainWindow(catObj) {
	console.log(catObj);
	$('#catHeader').html('<h1>' + catObj.name + '</h1>');
	$('#catImage').html('<img id="catPic" src="' + catObj.picture + '" alt="' + catObj.name + '" />');
	$('#catClickNum').html('<h3>Number of clicks: ' + catObj.clickNum + '</h3>');
	$('#catPic').click((function(cat_item){
		return function() {
			cat_item.clickNum++;
			$('#catClickNum').html('<h3>Number of clicks: ' + cat_item.clickNum + '</h3>');
		};
	})(catObj));
}

function renderLeftMenu() {
	for(i = 0; i < catsList.length ; i++)
	{
		var $cat_list = $('.cat-list');
		$cat_list.append('<li><div>' + catsList[i].name + '</div></li>');
		$('.cat-list li:last-child div').click((function(index){
			return function(){
				renderMainWindow(catsList[index]);
			};
		})(i));
	}
}

renderLeftMenu();