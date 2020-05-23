/*
xhr对象：
	x1：登录，提交用户名 - post - main
	x2：获取用户信息 - get - main
	x3：许愿请求 - post - wish
	x4：抽奖请求 - post - lottery
	x5：获取图鉴收藏进度 - get - lottery
	x6：获取我的许愿 - get - favourite
	x7：确认愿望完成 - post - favourite
	x8：获取我的助愿 - get - favourite
	x9：已实现放弃助愿 - post - favourite
	x10：抽取愿望 - get - help_wish
	x11：选择助愿 - post - help_wish
	x12：设置愿望广场昵称 - post - wish_square
	x13：获取帖子 - get - wish_square
	x14：发帖 - post - wish_square
*/

// var user = 'lotteryer6';


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
	var user = prompt('输入一个名字，若之前未输入过则视为新注册\n这个框每进一次首页弹一次\n默认为lotteryer1抽奖100次\n按取消会出错','lotteryer1');
	x1.open('post',baseurl + '/set_open_id', false);
	x1.withCredentials = true;
	x1.setRequestHeader('Content-Type','application/json');
	x1.onload = () => {
		if(x1.status !== 200) {
			if(x1.status == 500) {
				newAlert(500);
			}
			else {
				newAlert('登录请求出错，状态码为'+x1.status+'，出错信息为'+JSON.parse(x1.responseText).message);
			}
		}
		else {
			getInfo();
		}
	}
	x1.onerror = () => {
		newAlert('登录请求出错，网络异常');
	}
	x1.send(JSON.stringify({'openid':user}));
}

function getInfo() {
	x2.open('get',baseurl + '/info');
	x2.withCredentials = true;

	x2.onload = () => {	//同理如果有的独立js不需要独立x2.onload的话就执行这个，需要的话就独立写一个
		setInfo();
	};
	x2.onerror = () => {	//检测网络异常
		newAlert('获取用户数据请求出错，网络异常');
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
		switch(x2.status){
			case 401:
				window.location.href="https://hemc.100steps.net/2017/wechat/Home/Index/index?state=" + encodeURIComponent(window.location.href);
			break;

			default:
				newAlert('获取用户数据请求出错，状态码为'+x2.status+'，出错信息为'+JSON.parse(x2.responseText).message);
		}
		
	}
}

function enterTo(id) {
	if(event.keyCode == 13) {
		document.getElementById(id).select();
	}
}

function newAlert(text) {
	var newSpace = document.createTextNode(text);
	var newAlertFrame = document.createElement('div');
	newAlertFrame.setAttribute('class','new_alert');
	newAlertFrame.setAttribute('onclick','$(this).fadeOut("slow").remove();');
	newAlertFrame.appendChild(newSpace);
	document.getElementsByTagName('body')[0].appendChild(newAlertFrame);
	$('.new_alert').fadeIn('fast');
}