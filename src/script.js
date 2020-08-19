var strimg = null;
var hdnimg = null;
function loadStartImage(){
  var canvas = document.getElementById("cv1");
  var strfile = document.getElementById("strfile");
  strimg = new SimpleImage(strfile);
  strimg.drawTo(canvas);
}
function loadHiddenImage(){
  var canvas = document.getElementById("cv2");
  var strfile = document.getElementById("hdnfile");
  hdnimg = new SimpleImage(hdnfile);
  hdnimg.drawTo(canvas);
}
function crop(image, width, height){
    var g = new SimpleImage(width, height);
    for (var pixel of g.values()){
        g.setPixel(pixel.getX(), pixel.getY(), image.getPixel(pixel.getX(), pixel.getY()));
    }
    return g;
}

function pixelvalue(image, x, y){
    var pixel = image.getPixel(x, y);
    print(pixel.getRed());
    print(pixel.getGreen());
    print(pixel.getBlue());
}

function pixelchange(colorval){
    var val = Math.floor(colorval / 16) * 16;
    return val;
}
function chop2Hide(image){    /*Taking the most significant bits and getting the least to 0s.*/
    for (var pixel of image.values()){
        pixel.setRed(pixelchange(pixel.getRed()));
        pixel.setGreen(pixelchange(pixel.getGreen()));
        pixel.setBlue(pixelchange(pixel.getBlue()));
    }
    return image;
}


function shift(image){   /*getting the most significant bits to the last four ones.*/
    for (var pixel of image.values()){
        pixel.setRed(pixel.getRed() / 16);
        pixel.setGreen(pixel.getGreen() / 16);
        pixel.setBlue(pixel.getBlue() / 16);
    }
    return image;
}


function newpv(p, q){
    var x = p + q;
    if(x > 255){
        alert("the sum of the red/green/blue values in the two pictures is more than 255!");
    }
    return x;
}

function combine(image1, image2){
    var newimg = new SimpleImage(image1.getWidth(), image1.getHeight());
    for (var pixel of newimg.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        var px1 = image1.getPixel(x,y);
        var px2 = image2.getPixel(x,y);
        pixel.setRed(newpv(px1.getRed(), px2.getRed()));
        pixel.setGreen(newpv(px1.getGreen(), px2.getGreen()));
        pixel.setBlue(newpv(px1.getBlue(), px2.getBlue()));
    }
    return newimg;
}

function doHide(){
  var start1 = crop(strimg, strimg.getWidth(), strimg.getHeight());
  var hide1 = crop(hdnimg, strimg.getWidth(), strimg.getHeight());
  var start = chop2Hide(start1);
  var hide = shift(hide1);
  var p = combine(start, hide);
  var canvas = document.getElementById("cv3");
  p.drawTo(canvas);
}