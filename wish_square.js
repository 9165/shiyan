function getJsApi() {
  let formdata = new FormData();
  formdata.append("url", location.href.split("#")[0]);
  fetch("https://hemc.100steps.net/2017/wechat/Home/Public/getJsApi", {
    method: "POST",
    body: formdata,
    credentials: "include",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("get js sdk config success");
      wx.config({
        appId: res.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
        timestamp: res.timestamp,
        nonceStr: res.nonceStr,
        signature: res.signature,
        jsApiList: ["chooseImage", "uploadImage"],
        debug: false,
      });
    });
}
getJsApi();

var that = this;
var img_count = 0;
function chooseImage() {
  // for (let i = 1; i < 3; i++) {
  //   console.log(i);
  //   let img = that.document.getElementById("post_img" + i);
  //   console.log(img.src);
  //   if(img.src == window.location.href){
  // 	  console.log('yes')
  //   }
  //   if (img.src == undefined) {
  //     img = that.document.getElementById("post_img" + (i + 1));
  //   }
  //   // img.src = res.localIds[i-1];
  //   img.src = "./square/1.jpg";
  //   img.parentNode.style.display = "inline";
  // }

  if (img_count == 2) {
    newAlert("图片最多只能选两张");
    return;
  }
  wx.chooseImage({
    count: 2 - that.img_count,
    sizeType: ["original", "compressed"],
    sourceType: ["album", "camera"],
    success: function (res) {
      for (let i = 1; i < res.localIds.length + 1; i++) {
        let img = that.document.getElementById("post_img" + i);
        if (img.src != that.location.href) {
          img = that.document.getElementById("post_img" + (i + 1));
        }
        img.src = res.localIds[i - 1];
        img.dataset.localId = res.localIds[i - 1];
        img.parentNode.style.display = "inline";
        that.img_count++;
      }
    },
  });
}

function del_img(t) {
  t.parentNode.style.display = "none";
  img_count--;
  t.parentNode.children[0].src = "";
  t.parentNode.children[0].dataset.localId = undefined;
}

window.onload = function () {
  x2.onload = () => {
    setInfo();
    if (!info["has_username"]) {
      goTo("p3");
      document.getElementById("square_name").select();
    }
    if (parseInt(info.post) == 0) {
      $("#btn_make_post")
        .css("filter", "grayscale(100%)")
        .attr("onclick", 'newAlert("好像发帖次数不够了呢qwq！！")');
    }
  };
  getInfo();
  getFeed(true);

  $("#post_content_frame").on("scroll", function () {
    var scrollHeight = this.scrollHeight;
    var scrollTop = this.scrollTop;
    var clientHeight = this.clientHeight;

    // 注意：下面这种写法是无效的：
    // var clientHeight = $('要监听的对象').clientHeight;

    if (scrollTop == 0) {
      refresh();
    }

    // if(clientHeight == scrollHeight){
    // alert('下拉到底了');
    // }

    // $('#post_content_frame').on('scroll',function(){
    //   		if ($('#post_content_frame').scrollTop() >= (1000-200)) {
    //       		alert('滚动到底部了');
    //   		}
    // });
  });

  $(".frame").css("height", window.innerHeight + "px");
};
var x12 = new XMLHttpRequest(); //设置愿望广场昵称 - post - wish_square
var x13 = new XMLHttpRequest(); //获取帖子 - get - wish_square
var x14 = new XMLHttpRequest(); //发帖 - post - wish_square

var squareName;
var feedSource;
var lastPostId = 0;

function nameValidity() {
  squareName = document.getElementById("square_name").value;
  if (squareName.replace(/ /g, "") != "") {
    sendSquareName();
  } else {
    newAlert("不能留空或只含空格~");
  }
}

function sendSquareName() {
  x12.open("post", baseurl + "/info", false);
  x12.withCredentials = true;
  x12.setRequestHeader("Content-Type", "application/json");
  x12.onload = () => {
    if (x12.status !== 200) {
      newAlert(JSON.parse(x12.responseText).message);
    } else {
      newAlert("设置成功");
      goTo("p1");
    }
  };
  x12.onerror = () => {
    newAlert("设置昵称请求出错，网络异常");
  };
  x12.send(JSON.stringify({ username: squareName }));
}

function getFeed(isFirst) {
  if (isFirst) {
    x13.open("get", baseurl + "/playground/square");
  } else {
    x13.open("get", baseurl + "/playground/square?offset=" + lastPostId);
  }
  x13.withCredentials = true;
  x13.onload = () => {
    feedSource = JSON.parse(x13.responseText).posts;
    printFeed(isFirst);
  };
  x13.onerror = () => {
    //检测网络异常
    newAlert("获取帖子请求出错，网络异常");
  };
  x13.send();
}

var curLastNum = 0;

function printFeed(isFirst) {
  if (lastPostId == 1) {
    newAlert("已经到底了~");
    return false;
  }
  lastPostId = feedSource[feedSource.length - 1]["id"];
  var newFeed = "";
  for (c = 0; c <= feedSource.length - 1; c++) {
    curLastNum = document.getElementsByClassName("post_preview").length;
    var imgCode = "";
    if (feedSource[c]["pics"].length != 0) {
      for (d = 0; d <= feedSource[c]["pics"].length - 1; d++) {
        imgCode +=
          '<img src="' +
          feedSource[c]["pics"][d] +
          '" class="post_preview_image" onclick="imgZoomIn(this)"/>';
      }
    }

    newFeed +=
      '<div id="post' +
      (curLastNum + c) +
      '" class="post_preview"><div class="post_preview_user"></div><div class="post_preview_text"></div>' +
      imgCode +
      "</div>";
  }
  document.getElementById("post_content_frame").innerHTML += newFeed;
  for (i = 0; i <= feedSource.length - 1; i++) {
    $(
      "#post" +
        (document.getElementsByClassName("post_preview").length -
          feedSource.length +
          i) +
        " .post_preview_user"
    ).text(feedSource[i]["name"]);
    $(
      "#post" +
        (document.getElementsByClassName("post_preview").length -
          feedSource.length +
          i) +
        " .post_preview_text"
    ).text(feedSource[i]["content"]);
  }

  if (isFirst) {
    $("#post_content_frame").scrollTop(1); //这样上拉有效果
  }
}

function imgZoomIn(img) {
  $("#img_zoom_frame").fadeIn();
  $("#img_zoom_frame").css("display", "flex");
  $("#img_zoom").attr("src", $(img).attr("src"));
}

function sendPost() {
  var postText = document.getElementById("post_edit_text").value;
  if (postText.replace(/ /g, "") != "") {
  } else {
    newAlert("许一个空的愿望也许有很高的哲学境界，但是一般人不能理解~");
    return false;
  }
  x14.open("post", baseurl + "/playground/square", false);
  x14.withCredentials = true;
  x14.setRequestHeader("Content-Type", "application/json");
  x14.onload = () => {
    if (x14.status !== 200) {
      if (x14.status == 500) {
        newAlert("服务器出错");
      } else {
        newAlert(JSON.parse(x14.responseText).message);
      }
      //   newAlert(
      //     "发帖请求出错，状态码为" +
      //       x14.status +
      //       "，出错信息为" +
      //       JSON.parse(x14.responseText).message
      //   );
    } else {
      newAlert("发送成功");
      getFeed(false);
      refresh();
      goTo("p1");
	}
	del_all();
	
  };
  x14.onerror = () => {
    newAlert("设置昵称请求出错，网络异常");
  };
  if (img_serverIds.length) {
    x14.send(JSON.stringify({ content: postText, pics_id: img_serverIds }));
  } else {
    x14.send(JSON.stringify({ content: postText }));
  }
}

function refresh() {
  $(".refresh").css("animation", "freedom_dive 1 0.5s");
  setTimeout(function () {
    $(".refresh").css("animation", "none");
  }, 500);

  lastPostId = 0;
  $("#post_content_frame").empty();
  getFeed(true);
}

var img_list = [];
var img_serverIds = [];
function uploadImage(succ_func) {
  console.log("upload img");
  //   let img_list = [];
  for (let i = 1; i < 3; i++) {
    let img = document.getElementById("post_img" + i);
    if (img.src != window.location.href) {
      img_list.push(img.dataset.localId);
    }
  }
  if (img_list.length) {
    console.log("in show img");
    let count = 0;
    for (let i = 0; i < img_list.length; i++) {
      wx.uploadImage({
        localId: that.img_list[i], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          that.img_serverIds.push(res.serverId); // 返回图片的服务器端ID
          count++;
          if (count == that.img_list.length) {
            succ_func();
          }
        },
      });
    }
  } else {
    succ_func();
  }
}

function sendWrapper() {
  uploadImage(sendPost);
}

function del_all() {
  document.getElementById("post_img_wrapper1").style.display = "none";
  document.getElementById("post_img_wrapper2").style.display = "none";
  document.getElementById("post_img1").src = "";
  document.getElementById("post_img2").src = "";
  img_list = [];
  img_serverIds = [];
  img_count =0;
  document.getElementById('post_edit_text').value = "";
}
