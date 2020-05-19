var baseurl = 'https://zekaio.cn/2020/food_wish/api/';

window.onload = function() {
	var x1 = new XMLHttpRequest();	//提交用户名
	x1.open('post',baseurl + 'set_open_id', false);
	x1.withCredentials = true;
	x1.setRequestHeader('Content-Type','application/json');
	x1.send(JSON.stringify({'openid':'lotteryer1'}));

	var x2 = new XMLHttpRequest();
	x2.open('get',baseurl + 'info');
	x2.withCredentials = true;
	// x2.onreadystatechange = function() {
	// 	console.log(x2.readyState);
	// 	if(x2.readyState == 4) {
	// 		alert('成功');
	// 		console.log(x2.respenseText);
	// 	}
	// }
	x2.onload = () => {
		console.log(JSON.parse(x2.respenseText));
	};
	x2.send();
}

