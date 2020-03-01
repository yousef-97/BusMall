'use strict';





var itemName = ['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg',
'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png','tauntaun.jpg',
'unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];

var data = [];
var totalClicks = 0;


var theContener = document.getElementById('theImgs');
var leftImg = document.getElementById('leftImg');
var centerImg = document.getElementById('centerImg');
var rightImg = document.getElementById('rightImg');

var theName = [];

//the Objects
function Item(name){
    this.name = name.substr(0,name.length-4);
    theName.push(this.name);
    // console.log(this.name);
    this.filePath = `imgs/assets/${name}`;
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
        if(f!== s && s!==t && f !==t){
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
    shownArr.push(randomLeft.name,randomCenter.name,randomRight.name);//for counting the how many the iten appear
    console.log(shownArr);
}
theRandomImg();

var pickedArr = [];
// The Event
var c = 0;
theContener.addEventListener('click',function(event){
    totalClicks++;
    switch (true) {
        case event.target.id === 'leftImg':
            pickedArr.push(event.target.alt);
            theRandomImg();
            break;
        
        case event.target.id === 'centerImg':
            pickedArr.push(event.target.alt);
            theRandomImg();
            break;
         
        case  event.target.id === 'rightImg':
            pickedArr.push(event.target.alt);
            theRandomImg();
            break;       
    }
    console.log(totalClicks);
    
    if(totalClicks === 25){
        //remove event listener
        leftImg.remove();
        centerImg.remove();
        rightImg.remove();
        // console.log(shownArr);
        // console.log('finished');
        shownArr.sort();
        pickedArr.sort();
        shownArr.splice(shownArr.length-3,3);
        // console.log(pickedArr);
        // console.log(shownArr);
        // for(var n = 0;n<12;n++){
            document.write(`this item is appear ${iterations(shownArr)} and picked ${iterations(pickedArr)} times`)
        // }
      }
    // console.log(pickedArr);
    
    // console.log(event.target);
    
    // if(event.target.id === 'leftImg' || event.target.id === 'centerImg' || event.target.id === 'rightImg'){
    //     theRandomImg();
    // }
})
var theFinalArr = [];
function iterations(arr){
    
    for (var i = 0;i<itemName.length-1;i++){
        var c =0;
        while (arr.includes(theName[i])){
            if (arr.length === 0){break;}
            c++;
            // console.log(c);
            
            var index = arr.indexOf(theName[i]);
            if (index > -1) {
                arr.splice(index, 1);
                // console.log(arr);
                
            }

        }
        theFinalArr.push(c);
        console.log(theFinalArr);
        if (arr.length === 0){break;}
        
    }
    return theFinalArr;
}

iterations(shownArr);
iterations(pickedArr);





//helper function
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

