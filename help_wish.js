window.onload = function() {
	getInfo();
}

var getWishData;
var chooseWishNum = -1;
var chooseWishId = -1;

var x10 = new XMLHttpRequest(); 
	//抽取愿望 - get - help_wish
function getHelpWish() {
	x10.open('get',baseurl + '/playground/others/wish');
	x10.withCredentials = true;

	x10.onload = () => {
		getWishData = JSON.parse(x10.responseText)['wishes'];
		printHelpWish();
	};
	x10.onerror = () => {	//检测网络异常
		alert('获取用户数据请求出错，网络异常');
	}
	x10.send();	
}

function printHelpWish() {
	$('#help_wish_content0')
		.text(getWishData[0]['content'])
		.attr('onclick','chooseHelpWish(0,'+getWishData[0]['id']+')');
	$('#help_wish_content1')
		.text(getWishData[1]['content'])
		.attr('onclick','chooseHelpWish(1,'+getWishData[1]['id']+')');
	$('#help_wish_content2')
		.text(getWishData[2]['content'])
		.attr('onclick','chooseHelpWish(2,'+getWishData[2]['id']+')');
}

function chooseHelpWish(num,id) {
	$('.help_wish_content')
		.css('background-color','transparent')
		.css('box-shadow','none');
	$('#help_wish_content'+num)
		.css('background-color','rgba(85,97,95,0.3)')
		.css('box-shadow','#4e5c59 0 0 5px 5px');
	chooseWishId = id;
	chooseWishNum = num;
}

var x11 = new XMLHttpRequest(); 
	//选择助愿 - post - help_wish

function sendHelpWish() {
	if(chooseWishNum==-1) {
		alert('我选个愿望哈，啊好……没选呢~')
	}
	else {
		x11.open('post',baseurl + '/playground/others/wish', false);
		x11.withCredentials = true;
		x11.setRequestHeader('Content-Type','application/json');
		x11.onload = () => {
			if(x11.status !== 200) {
				alert('助愿请求出错，状态码为'+x11.status+'，出错信息为'+JSON.parse(x11.responseText).message);
				return false;
			}
			else{
				printWishPerson();
			}
		}
		x11.onerror = () => {
			alert('助愿请求出错，网络异常');
		}
		x11.send(JSON.stringify({'id':chooseWishId}));
	}
}

function printWishPerson() {
	$('#help_wish_name').text(getWishData[chooseWishNum]['name']);
	if(getWishData[chooseWishNum]['tel'] == '10000000000') {
		$('#help_wish_phone').text('保密');
	}
	else {
		$('#help_wish_phone').text(getWishData[chooseWishNum]['tel']);
	}
	if(getWishData[chooseWishNum]['wechat'] == 'null') {
		$('#help_wish_wechat').text('保密');
	}
	else {
		$('#help_wish_wechat').text(getWishData[chooseWishNum]['wechat']);
	}
	$('#help_wish_chr').css('background-image','url(img/lottery/lottery_chr/nr'+getWishData[chooseWishNum]['paper']+'.png)')
	goTo('p3');
}

function toUni(text) {
	return escape(text).replace(/\%u/g,'/u');
}

function toText(uni) {
	return unescape(uni);
}