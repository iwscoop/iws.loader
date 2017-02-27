/**
 * Created by ojb74 on 2017-02-21.
 */


function addImgElement(src){
    var img = document.createElement('img'); // 이미지 객체 생성
    //img.onclick = function(){document.getElementById('board').removeChild(this)}; // 이미지를 클릭하면 제거되는 onclick 함수 생성
    img.src = src;
    img.style.cursor = 'pointer'; // 커서 지정
    img.style.border = '2px solid red';
    document.getElementById('board').appendChild(img); // board DIV 에 이미지 동적 추가
}

function addCanvasElement(w, h, data){
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height= h;
    var imgData = canvas.getContext('2d').createImageData(w, h);
    imgData.data.set(data);
    canvas.getContext('2d').putImageData(imgData, 0, 0);
    canvas.style.cursor = 'pointer'; // 커서 지정
    canvas.style.border = '2px solid blue';
    
    document.getElementById('board').appendChild(canvas); // board DIV 에 이미지 동적 추가
}

// 화면 초기화
function Clear(){
    document.getElementById('board').innerHTML = '';
}

//이미지를 로드 합니다.
function LoadImage(e) {
    var input = event.target;

    var reader = new FileReader();

    reader.readAsArrayBuffer(input.files[0]);
    reader.onload = function () {

        var type = checkRadioValue("createType");
        if (type === "img") {
            binaryToImage(reader.result);
        } else if (type === "canvas") {
            binaryToCanvas(reader.result);
        }

    };
}

//img element를 생성할지 canvas element를 생성할지 여부
function checkRadioValue(objName) {
    var robj = document.getElementsByName(objName);
    for(var i=0;i<robj.length;i++){
        if(robj[i].checked == true){
            return robj[i].value;
        }
    }
}

/**
 * 이미지 파일에서 img element에 넣을수 있는 base64 스트링을 얻어 셋팅한다.
 * @param buffer : 이미지 파일의 arraybuffer
 */
function binaryToImage(buffer){
    var loader = new iws.loader(buffer);
    for(var i=0; i<loader.getCount(); i++){
        loader.getSrc(i+1, addImgElement);
    }
    loader.dispose();   //buffer 공간 재거.
}

/**
 * 이미지 파일에서 canvas element에 넣을 수 있는 바이너리를 얻어 캔바스에 셋팅한다.
 * @param buffer : 이미지 파일의 arraybuffer
 */
function binaryToCanvas(buffer){
    var loader = new iws.loader(buffer);
    for(var i=0; i<loader.getCount(); i++){
        loader.getPage(i+1, addCanvasElement);
    }
    loader.dispose();   //buffer 공간 재거.
}

window.onload = function(){
    // // 이미지파일 열기
    // $('#fileLoad').on ('change', function(e){
    //     var file = this.files[0];
    //
    //     var reader = new FileReader();
    //
    //     reader.readAsArrayBuffer(file);
    //     reader.onload = function() {
    //
    //         var type = checkRadioValue("createType");
    //         if(type === "img"){
    //             binaryToImage(reader.result);
    //         } else if(type === "canvas"){
    //             binaryToCanvas(reader.result);
    //         }
    //
    //     };
    // });
};
