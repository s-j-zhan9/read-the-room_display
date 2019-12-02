let candidateNames = [];
var candidateTotal = [];
var candidateLastTotal = [];
// var tempTotal = [];

let nameFont;
let totalFont;

// function mousePressed(){
//   tempTotal = candidateTotal; 
//   candidateLastTotal = tempTotal;

// }

function preload() {
  nameFont = loadFont('assets/BebasNeue-Regular.ttf');
  totalFont = loadFont('assets/ChakraPetch-Regular.ttf');
  lookupCandidate(); //push names into candidateNames
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  lookupCandidate(); //push names into candidateNames


  //get number of candidates
  updateLast();
  setInterval(getCanTotal, 500);


}

function updateLast() {
  setInterval(function(){ 

      for(i=0; i<candidateTotal.length; i++)
      {
        candidateLastTotal[i] = candidateTotal[i];
      }
  }, 10000);
}

function getCanTotal(){
  for (i = 0; i < candidateNames.length; i++) {
   lookupCandidateTotal(i);
  }
}

function draw() {

  background(120);
  frameRate(60);

  if (candidateTotal.length > 0) {

    //calculate where to draw names and total rating
    var sw = width / (candidateNames.length);

    hh = height / 2;
    nh = hh - 30;
    th = hh + 50;

    for (i = 0; i < candidateNames.length; i++) {
      rl = 0 + i * sw + sw / 2;
      tl = rl + 14;
      textAlign(CENTER, CENTER);
      noStroke();

      //draw rect
      fill(20 - i * 5, 60 + i * 20, 180 - i * 10);
      rect(i * sw, 0, sw, height);

      //draw name
      textFont(nameFont);
      textSize(42);
      fill(255, 255, 255, 240);
      text(candidateNames[i], rl, nh);

      //draw total w color
      textSize(34);
      textFont(totalFont);
      let x1 = tl + 16 + 14;
      let y1 = th + 13 - 2;
      let x2 = tl + 8 + 14;
      let y2 = th + 0 - 2;
      let x3 = tl + 0 + 14;
      let y3 = th + 13 - 2;
      // //draw total
      if (candidateTotal[i] > candidateLastTotal[i]) {
        //render text green
        fill(0, 255, 0, 200);
        text(candidateTotal[i], rl, th);
        triangle(x1, y1, x2, y2, x3, y3);

      } else if (candidateTotal[i] == candidateLastTotal[i]) {
        //render grey text
        fill(255, 255, 255, 120);
        text(candidateTotal[i], rl, th);

      } else if (candidateTotal[i] < candidateLastTotal[i]) {
        //render text red
        fill(255, 0, 0, 200);
        text(candidateTotal[i], rl, th);
        triangle(x1, y1-13, x2, y2+13, x3, y3-13);

      } else {
        fill(255, 255, 255, 120);
        text(candidateTotal[i], rl, th);
        // text("waiting for number", rl, th);
      }
    }
  }

}

async function lookupCandidate() {

  let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/all/';
  var response = await getNames(updatedEndpoint);
}

async function getNames(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
  candidateNames = data.candidates;
}
function lookupCandidateTotal(candidateID) {

  let updatedEndpoint = 'https://debate-room.herokuapp.com/candidate/' + candidateID + "/total";
  var response = getTotal(updatedEndpoint);
}

async function getTotal(endpoint) {
  const response = await fetch(endpoint);
  const data = await response.json();
    // console.log(data);
candidateTotal.splice(data.id, 1, data.total)
}

