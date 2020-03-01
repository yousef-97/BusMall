'use strict';





var itemName = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun',
'unicorn','usb','water-can','wine-glass'];

var data = [];

var theContener = document.getElementById('theImgs');
var leftImg = document.getElementById('leftImg');
var centerImg = document.getElementById('centerImg');
var rightImg = document.getElementById('rightImg');



//the Objects
function Item(name){
    this.name = name;
    this.filePath = `imgs/assets/${this.name}.jpg`;
    data.push(this); //to put each object in arr so each index has aname and file path
    // console.log(this.filepath);
}
for(var i = 0 ; i < itemName.length;i++){
    new Item(itemName[i]);
}
// console.log(data); i use it to check that (whate if i put data.push(this before all properites))
var shownArr=[];
function theRandomImg(){
    while(true){
        var f = getRandomNum(0, itemName.length-1);
        var s = getRandomNum(0, itemName.length-1);
        var t = getRandomNum(0, itemName.length-1);
        if(f!== s && s!==t){
            var randomLeft = data[f];
            var randomCenter = data[s];
            var randomRight = data[t];
            leftImg.setAttribute('src',randomLeft.filePath);
            leftImg.setAttribute('alt',randomLeft.name);

            centerImg.setAttribute('src',randomCenter.filePath);
            centerImg.setAttribute('alt',randomCenter.name);

            rightImg.setAttribute('src',randomRight.filePath);
            rightImg.setAttribute('alt',randomRight.name);
            break;
        }
    }
    shownArr.push(f,s,t);//for counting the how many the iten appear
    console.log(shownArr);
}
theRandomImg();

var pickedArr = [];
// The Event
theContener.addEventListener('click',function(event){
    switch (true) {
        case event.target.id === 'leftImg':
            theRandomImg();
            break;
        
        case event.target.id === 'centerImg':
            theRandomImg();
            break;
         
        case  event.target.id === 'rightImg':
            theRandomImg();
            break;       
        
        default:
            break;
    }
    if(event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'rightImg'){
        theRandomImg();
    }
})







//helper function
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
