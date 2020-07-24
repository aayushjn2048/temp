export default function astar(grid, startNode, finishNode) {
  var temp = [];
  for (let i = 0; i < grid.length; i++) {
    let rewer = [];
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].isWall === true) rewer.push(1);
      else rewer.push(0);
    }
    temp.push(rewer);
  }
  console.log(temp);
  var openList = [];
  var closedList = [];
  openList.push(startNode);
  console.log(openList);
  while (openList.length > 0) {
    var lowIndex = 0;
    for (let i = 0; i < openList.length; i++) {
      if (openList[i].f < openList[lowIndex].f) {
        lowIndex = i;
      }
      var currentNode = openList[lowIndex];
    }

    if (
      currentNode.pos.r === finishNode.pos.r &&
      currentNode.pos.c === finishNode.pos.c
    ) {
      var curr = currentNode;
      var ret = [];
      while (curr.previousNode) {
        ret.push(curr);
        curr = curr.previousNode;
      }
      return [closedList, ret.reverse()];
    }
    //console.log("Ye while safe hai");
    openList = removeByAttr(openList, "pos", currentNode.pos);
    closedList.push(currentNode);
    var neighbors = hikachu(grid, currentNode);

    for (let i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      var flagclosed = 0;
      var flagopen = 0;
      for (let i = 0; i < closedList.length; i++) {
        if (
          closedList[i].pos.r === neighbor.pos.r &&
          closedList[i].pos.c === neighbor.pos.c
        ) {
          flagclosed = 1;
          break;
        }
      }
      if (flagclosed === 1 || neighbor.isWall) {
        continue;
      }
      for (let i = 0; i < openList.length; i++) {
        if (
          openList[i].pos.r === neighbor.pos.r &&
          openList[i].pos.c === neighbor.pos.c
        ) {
          flagopen = 1;
          break;
        }
      }
      //console.log("code working fine");
      var gScore = currentNode.g + 1;
      var gScoreIsBest = false;
      if (flagopen === 0) {
        gScoreIsBest = true;
        neighbor.h = heuristic(neighbor.pos, finishNode.pos);
        openList.push(neighbor);
      } else if (gScore < neighbor.g) {
        gScoreIsBest = true;
      }

      if (gScoreIsBest) {
        neighbor.previousNode = currentNode;
        neighbor.g = gScore;
        neighbor.f = neighbor.g + neighbor.h;
      }
    }
  }
  //console.log("Bahar aa chuka hun");
  return [];
}

function heuristic(pos0, pos1) {
  var d1 = Math.abs(pos1.r - pos0.r);
  var d2 = Math.abs(pos1.c - pos0.c);
  return d1 + d2;
}

function hikachu(grid, node) {
  var ret = [];
  var x = node.pos.r;
  var y = node.pos.c;

  if (grid[x - 1] && grid[x - 1][y]) {
    ret.push(grid[x - 1][y]);
  }
  if (grid[x + 1] && grid[x + 1][y]) {
    ret.push(grid[x + 1][y]);
  }
  if (grid[x][y - 1] && grid[x][y - 1]) {
    ret.push(grid[x][y - 1]);
  }
  if (grid[x][y + 1] && grid[x][y + 1]) {
    ret.push(grid[x][y + 1]);
  }
  return ret;
}

function removeByAttr(arr, attr, value) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty(attr) &&
      arguments.length > 2 &&
      arr[i][attr] === value
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
}
