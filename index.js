window.onload = function() {
	logIn();
	//检测许愿助愿次数，0次则把图标变灰
	x2.onload = () => {
		setInfo();
		if(parseInt(info.wish)==0) {
			$('#btn_wish').css('filter','grayscale(100%)').attr('onclick','alert("好像许愿次数不够了呢qwq！！")');
		}
		if(parseInt(info.help)==0) {
			$('#btn_help_wish').css('filter','grayscale(100%)').attr('onclick','alert("好像助愿次数不够了呢qwq！！")');
		}
	}
}

