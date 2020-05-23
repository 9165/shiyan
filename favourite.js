window.onload = function() {
	getInfo();
	getMyWish();
	getMyHelpWish();
}

var x6 = new XMLHttpRequest(); //获取我的许愿 - get - favourite
var x7 = new XMLHttpRequest(); //确认愿望完成 - post - favourite
var x8 = new XMLHttpRequest(); //获取我的助愿 - get - favourite
var x9 = new XMLHttpRequest(); //已实现放弃助愿 - post - favourite

var myWish;
var myHelpWish; 

function getMyWish() {
	x6.open('get',baseurl + '/collection/player/wish');
	x6.withCredentials = true;

	x6.onload = () => {
		myWish = JSON.parse(x6.responseText).wishes;
		printMyWish();
	};
	x6.onerror = () => {	//检测网络异常
		alert('获取许愿记录出错，网络异常');
	}
	x6.send();
}

function printMyWish() {
	if(myWish.length != 0) {
		document.getElementById('fav_wish_main').innerHTML='';
		for(e=0; e<=myWish.length-1; e++) {
			document.getElementById('fav_wish_main').innerHTML+='<div id="fav_wish'+e+'" class="detail"><div class="fav_content" style="float: left;"></div><div class="wishDetail btnActive" style="float: right;"><span style="position: relative; top: calc(50% - 65px)">确认<br/>实现</span></div></div>';
			$('#fav_wish'+e).css('display','block');
			$('#fav_wish'+e+' .wishDetail').attr('onclick','confirmFinish('+e+','+myWish[e]['id']+')');
			$('#fav_wish'+e+' .fav_content').text(myWish[e]['content']);
		}
	}
}

function getMyHelpWish() {
	x8.open('get',baseurl + '/collection/others/wish');
	x8.withCredentials = true;

	x8.onload = () => {
		myHelpWish = JSON.parse(x8.responseText).wishes;
		printMyHelpWish();
	};
	x8.onerror = () => {	//检测网络异常
		alert('获取助愿记录出错，网络异常');
	}
	x8.send();
}

function printMyHelpWish() {
	document.getElementById('fav_help_wish_main').innerHTML='';
	if(myHelpWish.length != 0) {
		for(f=0; f<=myHelpWish.length-1; f++) {
			document.getElementById('fav_help_wish_main').innerHTML+='<div id="fav_help_wish'+f+'" class="detail"><div class="fav_content" style="float: left;"></div><div class="wishDetail btn btnActive" style="float: right;">详情</div></div>';
			$('#fav_help_wish'+f+' .fav_content').text(myHelpWish[f]['content']);
			$('#fav_help_wish'+f+' .wishDetail').attr('onclick','printHelpWishDetail('+f+');');
		}
	}
}

function printHelpWishDetail(num) {
	$('.fav_wish_name').text(myHelpWish[num]['name']);
	if(myHelpWish[num]['tel'] == '10000000000') {
		$('.fav_wish_phone').text('保密');
	}
	else {
		$('.fav_wish_phone').text(myHelpWish[num]['tel']);
	}
	if(myHelpWish[num]['wechat'] == 'null') {
		$('.fav_wish_wechat').text('保密');
	}
	else {
		$('.fav_wish_wechat').text(myHelpWish[num]['wechat']);
	}

	$('.fav_content2').text(myHelpWish[num]['content']);

	$('#btn_finish_help_wish').attr('onclick','fogHelpWish('+num+','+myHelpWish[num]['id']+',1)');
	$('#btn_giveup_help_wish').attr('onclick','fogHelpWish('+num+','+myHelpWish[num]['id']+',0)');
	$('#fav_help_wish_chr').attr('src','img/wish/paper/paper'+myHelpWish[num]['paper']+'.png')
	goTo('p3');
}

function fogHelpWish(num,id,fog) {	//fog - finish or give up
	if(fog==1) {
		var cf = confirm('确定ta的愿望被实现了吗？不要辜负另一端的ta哦~');
		if(cf==true) {}
		else{
			return false;
		}
	}
	else if(fog==0) {
		var cf = confirm('真的确定取消吗？');
		if(cf==true) {}
		else{
			return false;
		}
	}
	
	x9.open('post',baseurl + '/collection/others/wish', false);
	x9.withCredentials = true;
	x9.setRequestHeader('Content-Type','application/json');
	x9.onload = () => {
		if(x9.status !== 200) {
			var errMessage;
			switch(x9.status) {
			     case 404:
			        errMessage='愿望不存在';
			        break;
			     case 406:
			        errMessage='愿望不是当前用户领取的';
			        break;
			     case 409:
			        errMessage='愿望未被领取或已确认实现';
			        break;
			} 
			alert('提交助愿结果请求出错，状态码为'+x9.status+'，出错信息为'+errMessage);
		}
		else{
			if(fog==1) {
				alert('确认实现成功\n\\撒花\/\\撒花\/');
			}
			else{
				alert('确认放弃成功。不要灰心，继续帮助其他愿望吧');
			}
			$('#fav_help_wish'+num).css('display','none');
			goTo('p1');
		}
	}
	x9.onerror = () => {
		alert('完成或放弃助愿请求出错，网络异常');
	}
	x9.send(JSON.stringify({'id':id,'status':fog}));
}
	
function confirmFinish(num,id) {
	var cf2 = confirm('确定你的愿望实现了吗？');
	if(cf2==true) {}
	else{
		return false;
	}

	x7.open('post',baseurl + '/collection/player/wish', false);
	x7.withCredentials = true;
	x7.setRequestHeader('Content-Type','application/json');
	x7.onload = () => {
		if(x7.status !== 200) {
			var errMessage;
			switch(x7.status) {
			     case 404:
			        errMessage='愿望不存在';
			        break;
			     case 406:
			        errMessage='愿望不是当前用户许的';
			        break;
			     case 409:
			        errMessage='要先等到助愿者先确认实现愿望后才能正式结案~';
			        break;
			} 
			alert('提交许愿结果请求出错，状态码为'+x7.status+'，出错信息为'+errMessage);
		}
		else{
			alert('恭喜愿望实现啦~');
			$('#fav_wish'+num).css('display','none');
		}
	}
	x7.onerror = () => {
		alert('确认愿望实现请求出错，网络异常');
	}
	x7.send(JSON.stringify({'id':id}));
}
