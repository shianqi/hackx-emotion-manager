window.onload = function(){
    startCam();
};
function removeClass(){
    $(".face-wrapper").children().removeAttr('class');
}
//伤心
function f1(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case1");
}
//有点难过
function f2(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case2");
}

//平常
function f3(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case3");
}
//有点高兴
function f4(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case4");
}
//非常高兴
function f5(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case5");
}
//惊讶
function f6(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case6");
}

//恐惧
function f7(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case7");
}

//生气
function f8(){
    var face =  $(".face-wrapper").children();
    removeClass();
    $(face).addClass("case8");
}


function startCam(){
    var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var canvasContext = canvas.getContext('2d');

    navigator.getUserMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
        function gotStream(stream) {


            //获取视频数据
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        }

        function error(message) {
            console.log(message);
        }

        function start() {
            this.disabled = true;
            navigator.getUserMedia( {
                    audio: true,
                    video: {
                        mandatory: {
                            maxWidth: 320,
                            maxHeight: 240
                        }
                    }
                },
                gotStream,
                error);
        }



        function takePhoto() {
            canvasContext.drawImage(video, 0, 0, 320, 240);
            var element = document.createElement("img");
            element.src = canvas.toDataURL();
            //获取照片信息
            console.log(element.src);
            document.getElementById("stack").appendChild(element);
        }

        //上传图片文件
        function post() {
            canvasContext.drawImage(video, 0, 0, 320, 240);
            var element = document.createElement("img");
            element.src = canvas.toDataURL();

            var pic = {data:element.src};

            var params = {
                // Request parameters
            };


            $.ajax({
                url: "http://10.181.41.137:8080/re_pic.php",
                type: "POST",
                // Request body
                data: pic,
            })
                .done(function(data) {
                    alert("success");
                })
                .fail(function() {
                    alert("error");
                });
        }

        document.getElementById("startButton").addEventListener('click', start);
        document.getElementById("photoButton").addEventListener('click', takePhoto);
        document.getElementById("post").addEventListener('click', post);

        start();
    } else {
        document.getElementById("startButton").disabled = true;
        document.getElementById("photoButton").disabled = true;

        alert("Sorry, you can't capture video from your webcam in this web browser. Try the latest desktop version of Firefox, Chrome or Opera.");
    }
}