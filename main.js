window.onload = function() {
	logIn();
}	//如果有的独立js不需要写window.onload的话就执行这个，如果独立js需要写window.onload的话就执行他们的window.onload（需要包含这个window.onload的所有信息），前提是把他们的<script>引用放在下面

function goTo(page) {
	$('.frame').fadeOut();
	$('#'+page).fadeIn();
	$('#'+page).css('display','flex');
}

var baseurl = 'https://zekaio.cn/2020/food_wish/api/';
var info = new Object();

var x1 = new XMLHttpRequest();	//提交用户名 
var x2 = new XMLHttpRequest();	//获取用户信息

function logIn() {
	
	x1.open('post',baseurl + 'set_open_id', false);
	x1.withCredentials = true;
	x1.setRequestHeader('Content-Type','application/json');
	x1.send(JSON.stringify({'openid':'lotteryer1'}));

	
	x2.open('get',baseurl + 'info');
	x2.withCredentials = true;

	x2.onload = () => {	//同理如果有的独立js不需要独立x2.onload的话就执行这个，需要的话就独立写一个
		setInfo();
	};
	x2.send();
}

function setInfo() {
	info = JSON.parse(x2.responseText);
	//导入用户信息到上方的计数栏
	$('.wish_chance_num').html(info.wish);
	$('.help_wish_chance_num').html(info.help);
	$('.lottery_chance_num').html(info.lottery);
	$('.post_chance_num').html(info.post);
}