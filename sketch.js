const heuristic = (a, b) => dist(a.i, a.j, b.i, b.j) 
const removeFromArray = (arr, ele) => {
  for(var i = arr.length - 1; i>=0; i--) {
    if (arr[i] == ele) {
      arr.splice(i, 1);
    }
  }
}

var cols = 20;
var rows = 20;

var openSet = [];
var closedSet = [];

var start;
var end;
var w, h;

var grid = new Array(cols);
class Spot {
  constructor(i ,j) {
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbours = [];
    this.previous = undefined;
    this.wall = false;
    if(random(1) < 0.25 ) {
      this.wall = true
    }
  }
  show = (color) => {
    fill(color);
    if (this.wall) {
      fill(0);
    }
    stroke(0)
    rect(this.i * w,this.j * h, w - 1, h - 1);
  }

  addNeighbours = (grid) => {
    var i = this.i;
    var j = this.j;
    if (i < cols - 1) {
      this.neighbours.push(grid[i + 1][j ]);
    }
    if (i < 0) {
      this.neighbours.push(grid[i - 1][j ]);
    }
    if (j < rows - 1) {
      this.neighbours.push(grid[i][j + 1 ]);
    }
    if (j > 0) {
      this.neighbours.push(grid[i][j - 1 ]);
    }

    if (j > 0 && i > 0) {
      this.neighbours.push(grid[i - 1][j - 1 ]);
    }
    if (j > 0 && i < cols - 1) {
      this.neighbours.push(grid[i + 1][j - 1 ]);
    }
    if (i > 0 && j < rows - 1) {
      this.neighbours.push(grid[i - 1][j + 1 ]);
    }
    if (j < rows - 1 && i < cols - 1) {
      this.neighbours.push(grid[i + 1][j + 1 ]);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  frameRate(10)

  w = width / cols;
  h = height / rows;
  // Making a 2D Array
  for (let i = 0; i < cols; i++) {
    grid[i] = new Array(rows)
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i ,j); 
    }
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbours(grid);
    }
  }
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  start.wall = false
   end.wall = false;

  openSet.push(start);
}
function draw() {

  background(255);
  if (openSet.length > 0) {
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];


    if (current === end) {
      noLoop()
      console.log("DONE");
    }
    
    removeFromArray(openSet, current)
    closedSet.push(current);

    var neighbors = current.neighbours;

    for (var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];

        // Valid next spot?
        if (!this.closedSet.includes(neighbor) && !neighbor.wall) {
            // Is this a better path than before?
            var tempG = current.g + 1

            // Is this a better path than before?
            if (!this.openSet.includes(neighbor)) {
                this.openSet.push(neighbor);
            } else if (tempG >= neighbor.g) {
                // No, it's not a better path
                continue;
            }

            neighbor.g = tempG;
            neighbor.h = heuristic(neighbor, end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
        }

          } 

    //Solution possible
  } else {
    //no solution
    console.log("no solution");
    noLoop()
    return;
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show(color(255)) 
    }
  }
  

  for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(0,255,0))
  }

  for (var i = 0; i <openSet.length; i++) {
    openSet[i].show(color(0,0,255))
  }
  //Show path
  var path = [];
  
  
    var temp = current;
    path.push(temp);
    while(temp.previous) {
      path.push(temp.previous)
      temp = temp.previous;
    }  




  for (var i = 0; i < path.length; i++) {
     path[i].show(color(0,90,90))
   }
   
// }
}


console.log(openSet, "openSet");
console.log(closedSet, "closedSet");

console.log(grid);