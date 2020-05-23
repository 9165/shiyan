window.onload = function() {
	getInfo();
	x2.onload = () => {
		setInfo();
		if(!info['has_username']) {
			goTo('p3');
			document.getElementById('square_name').select();
		}
		if(parseInt(info.post)==0) {
			$('#btn_make_post').css('filter','grayscale(100%)').attr('onclick','newAlert("好像发帖次数不够了呢qwq！！")');
		}
	};
	getFeed(true);
}
var x12 = new XMLHttpRequest() //设置愿望广场昵称 - post - wish_square
var x13 = new XMLHttpRequest() //获取帖子 - get - wish_square
var x14 = new XMLHttpRequest() //发帖 - post - wish_square

var squareName;
var feedSource;
var lastPostId = 0;

function nameValidity() {
	squareName = document.getElementById('square_name').value;
	if(squareName.replace(/ /g, "")!='') {
		sendSquareName();
	}
	else {
		newAlert('不能留空或只含空格~');
	}
}

function sendSquareName() {
	x12.open('post',baseurl + '/info', false);
	x12.withCredentials = true;
	x12.setRequestHeader('Content-Type','application/json');
	x12.onload = () => {
		if(x12.status !== 200) {
			newAlert('设置昵称请求出错，状态码为'+x12.status+'，出错信息为'+JSON.parse(x12.responseText).message);
		}
		else {
			newAlert('设置成功');
			goTo('p1');
		}
	}
	x12.onerror = () => {
		newAlert('设置昵称请求出错，网络异常');
	}
	x12.send(JSON.stringify({'username':squareName}));
}

function getFeed(isFirst) {
	if(isFirst) {
		x13.open('get',baseurl + '/playground/square');
	}
	else {
		x13.open('get',baseurl + '/playground/square?offset=' +lastPostId);
	}
	x13.withCredentials = true;
	x13.onload = () => {
		feedSource = JSON.parse(x13.responseText).posts;
		printFeed();
	};
	x13.onerror = () => {	//检测网络异常
		newAlert('获取帖子请求出错，网络异常');
	}
	x13.send();
}

var curLastNum = 0;

function printFeed() {
	if(lastPostId == 1) {
		newAlert('已经到底了~');
		return false;
	}
	lastPostId = feedSource[feedSource.length-1]['id'];
	var newFeed = '';
	for(c=0;c<=feedSource.length-1;c++) {
		curLastNum = document.getElementsByClassName('post_preview').length;
		var imgCode = '';
		if(feedSource[c]['pics'].length!=0) {
			for(d=0; d<=feedSource[c]['pics'].length-1; d++) {
				imgCode  += '<img src="'+feedSource[c]['pics'][d]+'" class="post_preview_image" onclick="imgZoomIn(this)"/>';
			}
		}

		newFeed +=
		'<div id="post'+(curLastNum+c)+'" class="post_preview"><div class="post_preview_user"></div><div class="post_preview_text"></div>'
		+imgCode
		+'</div>';
	}
	document.getElementById('post_content_frame').innerHTML += newFeed;
	for(i=0; i<=feedSource.length-1; i++) {
		$('#post'+(document.getElementsByClassName('post_preview').length-feedSource.length+i)+' .post_preview_user').text(feedSource[i]['name']);
		$('#post'+(document.getElementsByClassName('post_preview').length-feedSource.length+i)+' .post_preview_text').text(feedSource[i]['content']);
	}
}

function imgZoomIn(img) {
	$('#img_zoom_frame').fadeIn();
	$('#img_zoom_frame').css('display','flex');
	$('#img_zoom').attr('src',$(img).attr('src'));
}

function sendPost() {
	var postText = document.getElementById('post_edit_text').value;
	if(postText.replace(/ /g, "")!='') {
	}
	else{
		newAlert('许一个空的愿望也许有很高的哲学境界，但是一般人不能理解~');
		return false;
	}
	x14.open('post',baseurl + '/playground/square', false);
	x14.withCredentials = true;
	x14.setRequestHeader('Content-Type','application/json');
	x14.onload = () => {
		if(x14.status !== 200) {
			newAlert('发帖请求出错，状态码为'+x14.status+'，出错信息为'+JSON.parse(x14.responseText).message);
		}
		else {
			newAlert('发送成功');
			getFeed(false);
			goTo('p1');
		}
	}
	x14.onerror = () => {
		newAlert('设置昵称请求出错，网络异常');
	}
	x14.send(JSON.stringify({"content":postText}));
}