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
var contenerOfLists = document.getElementById('contenerOfLists');



//to store the names of photos
var theName = [];
var shown = [];
var pickedImg = [];


//the Objects
function Item(name){
    this.name = name.split('.')[0];
    theName.push(this.name);
    // console.log(this.name);
    this.filePath = `imgs/assets/${name}`;
    this.picks = 0;
    this.appear = 0;
    data.push(this); //to put each object in arr so each index has aname and file path
    // console.log(this.filepath);
}
for(var i = 0 ; i < itemName.length;i++){
    new Item(itemName[i]);
}
// console.log(data); i use it to check that (whate if i put data.push(this before all properites))

var shownArr = [];
var randomLeft;
var randomCenter
var randomRight

//function to random images
function theRandomImg(){
    
    while(true){
        var firstItem = getRandomNum(0, itemName.length);
        var secondItem = getRandomNum(0, itemName.length);
        var thidItem = getRandomNum(0, itemName.length);
        if(firstItem!== secondItem && secondItem!==thidItem && firstItem !==thidItem){
            randomLeft = data[firstItem];
            randomCenter = data[secondItem];
            randomRight = data[thidItem];

            randomLeft.appear++;
            randomCenter.appear++;
            randomRight.appear++;
           
            

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
    // console.log(shownArr);
}
//calling to show the images
theRandomImg();


// The Event click
var pickedArr = [];
function clickEvent(event){

    totalClicks++;
    switch (true) {
        case event.target.id === 'leftImg':
            pickedArr.push(event.target.alt);
            randomLeft.picks++;
            theRandomImg();
            break;
        
        case event.target.id === 'centerImg':
            pickedArr.push(event.target.alt);
            randomCenter.picks++;
            theRandomImg();
            break;
         
        case  event.target.id === 'rightImg':
            pickedArr.push(event.target.alt);
            randomRight.picks++;
            // console.log(randomRight.picks)
            theRandomImg();
            break;       
    }
    // console.log(totalClicks);
    

    /////to remove eventlistener
    if(totalClicks === 25){
        // console.log(shownArr);
        // console.log(pickedArr);

        theContener.removeEventListener('click',clickEvent)
        for (i = 0; i<itemName.length;i++){
            var creating = document.createElement('li');
            contenerOfLists.appendChild(creating);
            creating.textContent = `${data[i].name} is appear ${data[i].appear} and has ${data[i].picks}picks`;
            
            shown.push(data[i].appear);
            pickedImg.push(data[i].picks);
        }
        leftImg.remove();
        centerImg.remove();
        rightImg.remove();

    
      }

}

theContener.addEventListener('click',clickEvent)



//helper function
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

