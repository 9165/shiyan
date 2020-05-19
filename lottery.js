window.onload = function() {
	logIn();
	//检测抽奖次数，0次则把图标变灰
	x2.onload = () => {
		setInfo();
		if(parseInt(info.lottery)==0) {
			$('#lottery_btn').css('filter','grayscale(100%)').attr('onclick','alert("好像抽奖次数不够了呢qwq！！")');
		}
	}
}
