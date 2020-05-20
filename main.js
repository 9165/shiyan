/*
xhr对象：
	x1：登录，提交用户名 - post - main
	x2：获取用户信息 - get - main
	x3：
	x4：抽奖请求 - post - lottery
	x5：获取图鉴收藏进度 - get - lottery
*/

window.onload = function() {
	logIn();
}	//如果有的独立js不需要写window.onload的话就执行这个，如果独立js需要写window.onload的话就执行他们的window.onload（需要包含这个window.onload的所有信息），前提是把他们的<script>引用放在下面

function goTo(page) {
	$('.frame').fadeOut();
	$('#'+page).fadeIn();
	$('#'+page).css('display','flex');
}

var baseurl = 'https://zekaio.cn/2020/food_wish/api';
var info = new Object();

var x1 = new XMLHttpRequest();	//登录，提交用户名 
var x2 = new XMLHttpRequest();	//获取用户信息

function logIn() {
	
	x1.open('post',baseurl + '/set_open_id', false);
	x1.withCredentials = true;
	x1.setRequestHeader('Content-Type','application/json');
	x1.send(JSON.stringify({'openid':'lotteryer1'}));
	x1.onload = () => {
		if(x1.status !== 200) {
			alert('登录请求出错，状态码为'+x1.status+'，出错信息为'+JSON.parse(x1.responseText).message);
		}
	}
	x1.onerror = () => {
		alert('登录请求出错，网络异常');
	}

	
	x2.open('get',baseurl + '/info');
	x2.withCredentials = true;

	x2.onload = () => {	//同理如果有的独立js不需要独立x2.onload的话就执行这个，需要的话就独立写一个
		setInfo();
	};
	x2.onerror = () => {	//检测网络异常
		alert('获取用户数据请求出错，网络异常');
	}
	x2.send();
}

function setInfo() {
	if(x2.status === 200) {
		info = JSON.parse(x2.responseText);
		//导入用户信息到上方的计数栏
		$('.wish_chance_num').html(info.wish);
		$('.help_wish_chance_num').html(info.help);
		$('.lottery_chance_num').html(info.lottery);
		$('.post_chance_num').html(info.post);
	}
	else {	//检测其他异常状态码
		alert('获取用户数据请求出错，状态码为'+x2.status+'，出错信息为'+JSON.parse(x2.responseText).message);
	}
}

function enterTo(id) {
	if(event.keyCode == 13) {
		document.getElementById(id).select();
	}
}