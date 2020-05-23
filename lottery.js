var illuData;	//图鉴收集情况数据：Array数组，八个食物的收集进度0-3（按id排序，第一个是id=0的）

var x4 = new XMLHttpRequest();	//抽奖请求


window.onload = function() {
	getInfo();
	//检测抽奖次数，0次则把图标变灰
	x2.onload = () => {
		setInfo();
		if(parseInt(info.lottery)==0) {
			$('#lottery_btn').css('filter','grayscale(100%)').attr('onclick','alert("好像抽奖次数不够了呢qwq！！")');
		}
		getIlluData(true);
	}
}

// 获取图鉴收集情况
var x5 = new XMLHttpRequest();
function getIlluData(check) {
	x5.open('get',baseurl + '/playground/lottery');
	x5.withCredentials = true;

	x5.onload = () => {
		illuData = JSON.parse(x5.responseText)['progress'];
		printIlluPreview();
		if(check) {
			var isCompleted = true;
			for(h=0; h<=illuData.length-1; h++) {
				if(illuData[h]!=3) {
					isCompleted = false;
				}
			}
			if(isCompleted) {
				alert('你已经集齐了所有碎片~');
				$('#p2 .back_btn').attr('onclick',"window.open('index.html','_self')");
				goTo('p2');
			}			
		}
	};
	x5.onerror = () => {	//检测网络异常
		alert('获取图鉴收集情况请求出错，网络异常');
	}
	x5.send();
}


//导入图鉴预览
function printIlluPreview() {	
	var pine = '<img src="img/lottery/piece.png" class="pine">';
	document.getElementById('illu_preview_frame').innerHTML='';
	for(a=0; a<=food.length-1; a++) {
		var pineNum = illuData[a];
		var pineContent = '';
		if(pineNum==0) {
			pineContent = '还没收集到碎片哦~';
		}
		else {
			for(b=0; b<=pineNum-1; b++) {
				pineContent += pine;
			}
		}
		document.getElementById('illu_preview_frame').innerHTML += 
		'<div id="illu_preview'
+a
+'" class="illu_preview"><div class="illu_preview_left"><div class="illu_image" style="background-image: url(img/lottery/lottery_chr/nr'
+a
+'.png)"></div><p id="illu_preview_name'
+a
+'">'
+food[a]['name']
+'</p><span id="illu_collect'
+a
+'">收集进程:'
+pineContent
+'</span></div><div class="btn_illu_more" onclick="printIlluDetail('
+a
+')"></div></div>';
	}
}

//导入图鉴详情
function printIlluDetail(num) {
	document.getElementById('lottery_more_name').innerHTML = food[num]['name'];
	document.getElementById('lottery_more_image').style.backgroundImage = 'url(img/lottery/lottery_chr/nr'+num+'.png)';
	document.getElementById('lottery_more_bi').innerHTML = food[num]['bi'];

	document.getElementById('btn_lh').style.display = 'none';
	document.getElementById('lottery_more_di').style.display = 'block';
	document.getElementById('lottery_more_lock').style.display = 'block';

	if(illuData[num]<3) {
		document.getElementById('lottery_more_di').style.display = 'none';
	}
	else {
		document.getElementById('lottery_more_di').innerHTML = food[num]['di'];
		document.getElementById('lottery_more_lock').style.display = 'none';
		document.getElementById('btn_lh').style.display = 'block';
		$('#btn_lh').attr('onclick','showLh('+num+')');
	}
	
	goTo('p3');
}

//抽奖
function lottery() {
	x4.open('post',baseurl + '/playground/lottery', false);
	x4.withCredentials = true;

	x4.onload = () => {
		if(x4.status !== 200) {
			var err = '';
			if(x4.status == 406) {
				err = '抽奖次数为0';
			}
			else if(x4.status == 409) {
				err = '图鉴已经集齐了~'
			}
			alert('抽奖请求出错，状态码为'+x4.status+'，出错信息为'+err);
		}
		else {
			showLotteryChr(JSON.parse(x4.responseText)['section']);
		}
	}
	x4.onerror = () => {
		alert('抽奖请求出错，网络异常');
	}
	x4.send();
}

//抽奖显示拟人图
function showLotteryChr(num) {
	$('#lottery_chr_img').css('background-image','url(img/lottery/lottery_chr/nr'+num+'.png)');
	$('#lottery_chr_name').html(food[num]['name']);
	$('#lottery_chr_frame').fadeIn();
	$('#scale_div').fadeIn(2000);
	$('.lottery_chance_num').html($('.lottery_chance_num').html() - 1);
}


//展示立绘
function showLh(num) {
	$('#lh_img').css('background-image','url(img/lottery/lottery_chr/lh'+num+'.png)');
	$('#lh_frame').fadeIn();
}


//bi - brief introduction; di - detail introduction
var food = [
{
	id:0,
	name:'麻辣烫',
	bi:'<p>麻辣烫是起源于四川百、流传多年的地方特色小吃，也叫串串香。其最主要的特点就是无可不烫，无味不有。最初，在阴湿多雾的川蜀地区，长年劳作的船工和纤夫，垒成灶台，支起瓦罐，就地取材，拔些野菜，放入花椒、辣椒等调料，涮烫食之。既可果腹，又可驱寒祛湿版。后来，这种涮烫食品的习俗得以沿袭，逐渐发展成为我们在大街小巷经常看到的麻辣烫。</p>',
	di:'<p>《当我往麻辣烫里放食材的时候，我在想些什么？》</p><p>1.丸子必须要一样来一个，每一种口味都要尝到！</p><p>2.没有豆腐串的麻辣烫就没有灵魂！</p><p>3.相同的食材一般夹二或四个才能让我感到完美~</p><p>4.难得吃一次麻辣烫，吃菜做什么？</p><p>5.“要辣吗？”“不要。”将不辣注意贯彻到底！</p><p>6.欢迎补充______________</p>'
},

{
	id:1,
	name:'肠粉',
	bi:'<p>肠粉源于广东罗定，是广东著名的传统特色小吃之一。肠粉搭配的食料十分丰富，生蚝、猪肉、鸡蛋、香菇、青菜等，都能随意搭配。关于肠粉，最值得一提的是它名字的来源。相传乾隆皇帝游江南时，受了吃客大臣纪晓岚的蛊惑，专门到罗定州吃龙龛[kān]糍[cí]。当吃到这种“够爽、够嫩、够滑”的龙龛糍时，他赞不绝口，并乘兴说：“这糍并不算是糍吧，反而有点像猪肠子，不如就叫肠粉吧。”皇帝金口一开，“肠粉”的名号便在广东流传开来，家喻户晓。</p>',
	di:'<p>某不知名外省同学来到二饭三楼打卡广府美食——肠粉。奈何不太清楚具体吃法，于是小心翼翼地把每一样调料都放了一点点，结果吃起来根本没什么味道。最后，室友笑着帮她放了一大勺酱油，硬是吃出了四川人加辣山西人加醋的豪爽劲。</p>'
},

{
	id:2,
	name:'鸡扒饭',
	bi:'<p>鸡扒饭是我们的日常美食之一。上好鸡腿肉做成的鸡扒结合喷香的米饭，淋上以胡椒粉、酱油、料酒调配好的汤汁，共同构成了这一碗美味的鸡扒饭。鸡扒饭可以帮助我们补充大量蛋白质，但对于这类热量偏高的食物也不宜过多食用哦。</p>',
	di:'<p>“老细，嚟一份咖喱鸡扒饭加杯柠檬茶，点解鸡扒饭又升价佐，钱包顶唔顺噶。” 即使心里抱怨，可是还是期待着端上来的那一碟热气腾腾口感酥脆的鸡扒，期待着嘎吱一口咬开酥脆外皮后肉香四溢的汁水充盈口腔的惊喜。</p><p>对于充实粉丝来说，价格无法成为撼动鸡扒饭在他们心中的首选地位。</p>'
},

{
	id:3,
	name:'手抓饼',
	bi:'<p>手抓饼是从葱抓饼演变而来，起源于中国台湾地区。新鲜出炉后的手抓饼，千层百叠，层如薄纸，用手抓之，面丝千连，其外层金黄酥脆，内层柔软白嫩，一股葱油与面筋的香味扑鼻而来，让每位食客来不及等待，抓起就吃。</p>',
	di:'<p>有一段时间，想要健康生活，多吃蔬菜。买手抓饼的时候搭配了青瓜海草和胡萝卜，走出世博，看着小伙伴手里的培根肉松火腿肠手抓饼，真想让自己手里的全素面皮回炉重造。</p><p>后来又有一段时间，吃手抓饼时总是只加煎蛋，希望可以模仿隔壁的煎饼，然而看到别人的煎饼加火腿片和鸡扒之后，想起手机里的余额：“这我真是模仿不起……”</p>'
},

{
	id:4,
	name:'酸菜鱼',
	bi:'<p>酸菜鱼属四川菜系，以其特有的调味和独特的烹调技法而著称。以鲜草鱼为主料，配以四川泡菜煮制而成。此菜虽为四川民间家常菜，但流传甚广。酸菜鱼凭借着酸香鲜美的汤汁，嫩黄爽滑的鱼片，走出四川，走向全国，成为了五湖四海的“座上宾”。</p>',
	di:'<p>每次在二饭三楼路过酸菜鱼的档口，“帅哥，要不要来一份酸菜鱼？”“美女，要来吃酸菜鱼吗？”都会让人回忆起商店老板“勾引”小朋友坐摇摇车的情景：“小帅哥，小美女，快来玩呀～”</p><p>可是嘴上这么调侃着，每次阿叔一叫，也就乖乖走过去，滴了卡，拿了号码牌，取个盘子开始等。从阿姨手中接过淋着花椒、辣椒碎的热油的大盆鱼，用颤巍巍的双手将努力平衡了一路的餐盘往桌上一放，随后独霸一份酸菜鱼的快乐绝对能和小时候坐摇摇车媲美。</p>'
},

{
	id:5,
	name:'鱼粉',
	bi:'<p>鱼粉是湖南衡阳地方名小吃，一道鱼粉，三个部分可谓是无懈可击。鱼粉鱼肉肉质细腻，由于先稍作煎炸，肉质还有一点焦香味。米粉在鱼汤的浸泡下吸收了鱼肉的鲜味，鲜美滑爽、柔糯细腻，过喉都舍不得咽下。而鱼粉的灵魂——鱼汤，颜色乳白如玉，配上翠绿的葱花，少许鲜艳的红椒段，简直就是一件盆景，色香味俱全！</p>',
	di:'<p>看似朴实无华的鱼粉，实则精通十八般武艺，酸甜苦辣咸，鲫草巴沙鱼，味道原料九九相乘，便能得出碎肉粉、三鲜粉、酸辣粉等八十一般口味！一口下肚直教人惊呼:好粉！吃完还想吃，吃了只想天天吃。口味这么丰富，总有一种啱你心水！</p>'
},

{
	id:6,
	name:'流沙包',
	bi:'<p>流沙包是广东地区传统名点，也是粤式茶楼中常见的一款点心。将胡萝卜汁揉成的面团包裹着咸蛋黄流沙馅，送入蒸笼中蒸熟。一口咬下，金沙流淌，口感绵甜，麦香浓郁，不知俘获了多少男女老少的心。同时，流沙包也有着很高的营养价值，无愧于是口感和营养俱佳的美味。</p>',
	di:'<p>吃早餐的时候，爱玩谐音梗朋友说：“你知道流沙包的故事吗？从前有个女孩，她的男友叫阿沙。一天，阿沙要前赴战场，女孩想为他做一笼他最爱的奶黄包践行。和以往不同，她用了贵许多的牛油来做馅。阿沙咬一口包子，流动的馅迫不及待地往口中涌去。他忽然泣不成声，觉得这次的包子比任何一次奶黄包都好吃。女孩走上前拥抱他：阿沙，哪怕我留不住你，但我挽留的心意就在这流（留）沙包里，满溢出来。”</p><p>“诶？那奶黄包用的是什么油？”“猪油。”</p><p>“哇，涨姿势了！”“重点错了吧喂！”</p>'
},

{
	id:7,
	name:'蛋包饭',
	bi:'<p>蛋包饭是日本一种比较普通且很受青睐的主食，由蛋皮包裹炒饭而成的菜肴。一般是将鸡蛋煎成厚薄均匀的蛋皮，再放上炒好的炒饭、韩式辣椒酱、番茄酱、色拉油和其他各种材料包好制成。</p>',
	di:'<p>蛋包饭其饭，腼腆害羞，外表平平无奇，朴实无华，但却极具内涵，拥有独具一格的魅力，像极了窝工的polo衫理工男。常常出没于人来人往的二饭一，喜欢和与鱼排姐姐约会。身价平易近人，性价比极高，是不可多得的不知道吃啥时完全不会踩坑的品质选择。</p>'
}

];