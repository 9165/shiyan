window.onload = function() {
	logIn();
	$('.frame').css('height',window.innerHeight+'px');
	document.getElementById('wish_content').select();
}

var wishPaper = 0;
var wishContent = '';
var wishName = '';
var wishPhone = '';
var wishWechat = '';

function selectPaper(num) {
	wishPaper = num;
	$('.btn_paper').html('');
	$('#btn_paper'+num).html('✔');
}

function collectData() {	//除了信纸之外的信息收集，外加判断
	wishContent = document.getElementById('wish_content').value;
	wishName = document.getElementById('wish_name').value;
	wishPhone = document.getElementById('wish_phone').value;
	wishWechat = document.getElementById('wish_wechat').value;

	var alertWord='';

	if(wishContent == '') {alertWord+='信的内容不得为空！\n'}
	if(wishName == '') {alertWord+='署名不得为空！\n'}
	if(wishPhone == '' && wishWechat == '') {alertWord+='手机号和微信号至少填写一项！\n'}
	if(wishPhone!='') {
		if(!(/^1\d{10}$/.test(wishPhone))){
        alertWord+='若填写手机号，则手机号必须为1开头、11位！\n';
    	}
	}
	if(alertWord!='') {
		alert(alertWord);
	}
	else {
		printData();
	}
}

function printData() {	//将信息重新打一遍供检查
	goTo('p3');
}