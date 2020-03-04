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
var randomCenter;
var randomRight;
var thecounter = 0;
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
            console.log(shownArr.length);
            if (randomLeft.name!==shownArr[shownArr.length-3]&&randomCenter.name!==shownArr[shownArr.length-2]&&randomRight.name!==shownArr[shownArr.length-1]&&
                randomLeft.name!==shownArr[shownArr.length-2]&&randomCenter.name!==shownArr[shownArr.length-1]&&randomRight.name!==shownArr[shownArr.length-3]&&
                randomLeft.name!==shownArr[shownArr.length-1]&&randomCenter.name!==shownArr[shownArr.length-3]&&randomRight.name!==shownArr[shownArr.length-2]){
                
                //i know its along i statement but my mind is stuck
                
                    // console.log(shownArr.length);
                console.log(randomLeft.name,randomCenter.name,randomRight.name);
                randomLeft.appear++;
                randomCenter.appear++;
                randomRight.appear++;
            }
            else{theRandomImg();}
           
            

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
    console.log(event.target);
    if (event.target.id ==='leftImg' ||event.target.id === 'centerImg'||event.target.id === 'rightImg'){
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
  }
  
  setItem(); // console.log(totalClicks);
    

    /////to remove eventlistener
    if(totalClicks === 25){
      
      // render();
      
      theContener.removeEventListener('click',clickEvent)
      leftImg.remove();
      centerImg.remove();
      rightImg.remove();
      theGraphs(shown,'graph1','shown');
      theGraphs(pickedImg,'graph2','picked');

    
      }

}

theContener.addEventListener('click',clickEvent)



//helper function
function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function theGraphs(theData,id,type){
    var graph = document.getElementById(id).getContext('2d');
    var myChart = new Chart(graph, {
      type: 'bar',
      data: {
        labels: theName,
        datasets: [{
          label: `# of ${type}`,
          data: theData ,
          backgroundColor: 'rgba(0, 0, 0, .6)',
          borderColor: 'rgba(133, 22, 12, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
}



function setItem(){
  var order = JSON.stringify(data);
  localStorage.setItem( 'theData', order);
}

function render(){ 
    
    for (i = 0; i<itemName.length;i++){
      
        var creating = document.createElement('li');
        contenerOfLists.appendChild(creating);
        shown.push(data[i].appear);
        pickedImg.push(data[i].picks);
        creating.textContent = `${data[i].name} is appear ${data[i].appear} and has ${data[i].picks}picks`;
        
    }
    
    
}

function getItem(){
  var getting = localStorage.getItem('theData');
  
  if (getting){
    data = JSON.parse(getting);
    
  }
  
}

getItem();
render();