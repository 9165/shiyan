window.onload = function() {
	logIn();
	x2.onload = () => {
		setInfo();
		if(!info['has_username']) {
			goTo('p3');
			document.getElementById('square_name').select();
		}
		if(parseInt(info.post)==0) {
			$('#btn_make_post').css('filter','grayscale(100%)').attr('onclick','alert("好像发帖次数不够了呢qwq！！")');
		}
	};
	getFeed();
}
var x12 = new XMLHttpRequest() //设置愿望广场昵称 - post - wish_square
var x13 = new XMLHttpRequest() //获取帖子 - get - wish_square
var x14 = new XMLHttpRequest() //发帖 - post - wish_square

var squareName;
var feedSource;

function nameValidity() {
	squareName = document.getElementById('square_name').value;
	if(squareName.replace(/ /g, "")!='') {
		sendSquareName();
	}
	else {
		alert('不能留空或只含空格~');
	}
}

function sendSquareName() {
	x12.open('post',baseurl + '/info', false);
	x12.withCredentials = true;
	x12.setRequestHeader('Content-Type','application/json');
	x12.onload = () => {
		if(x12.status !== 200) {
			alert('设置昵称请求出错，状态码为'+x12.status+'，出错信息为'+JSON.parse(x12.responseText).message);
		}
		else {
			alert('设置成功');
			goTo('p1');
		}
	}
	x12.onerror = () => {
		alert('设置昵称请求出错，网络异常');
	}
	x12.send(JSON.stringify({'username':squareName}));
}

function getFeed() {
	x13.open('get',baseurl + '/playground/square');
	x13.withCredentials = true;
	x13.onload = () => {
		feedSource = JSON.parse(x13.responseText).posts;
		printFeed();
	};
	x13.onerror = () => {	//检测网络异常
		alert('获取帖子请求出错，网络异常');
	}
	x13.send(JSON.stringify());
}

function printFeed() {
	for(c=0;c<=feedSource.length-1;c++) {
		var imgCode = '';
		if(feedSource[c]['pics'].length!=0) {
			for(d=0; d<=feedSource[c]['pics'].length-1; d++) {
				imgCode  += '<img src="'+feedSource[c]['pics'][d]+'" class="post_preview_image" onclick="imgZoomIn(this)"/>';
			}
		}
		document.getElementById('post_content_frame').innerHTML +=
		'<div class="post_preview"><div class="post_preview_user">'
		+ feedSource[c]['name']
		+'</div><div class="post_preview_text">'
		+ feedSource[c]['content']
		+'</div>'
		+imgCode
		+'</div>';
	}
}

function imgZoomIn(img) {
	$('#img_zoom_frame').fadeIn();
	$('#img_zoom_frame').css('display','flex');
	$('#img_zoom').attr('src',$(img).attr('src'));
}