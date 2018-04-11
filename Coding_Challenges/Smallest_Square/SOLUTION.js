//Brute Force Solution

const smallestSquare = (x, y, k) => {
  xys = x.map((p, j) => [p, y[j]])
  var areas = []
  var buildKPointList = function(list, points){
    if (list.length === k) return areas.push(calcSq(list))
    for (var i = 0; i < points.length; i++){   
      buildKPointList(
        list.concat([points[i]]),
        points.slice(0, i).concat(points.slice(i+1))
      )
    }
  }
  buildKPointList([], xys)
  return Math.min(...areas)
}

calcSq = (list) => {
  const xs = list.map(tuple => tuple[0]),
        ys = list.map(tuple => tuple[1]),
        maxX = Math.max(...xs),
        minX = Math.min(...xs),
        maxY = Math.max(...ys),
        minY = Math.min(...ys),
        xlen = Math.abs(maxX - minX),
        ylen = Math.abs(maxY - minY),
        sqrt = Math.max(xlen, ylen) + 2
  return sqrt * sqrt
}

//K-Nearest Neighbor Solution


const findSmallestSquare = function(x, y, k){
	var small = null
	var gr = new graph(k)
	x.forEach((val, key) => {
		gr.addNode([val, y[key]])
	})
	gr.findNeighbors()
	gr.allNodes.forEach((val) => {
		if(small){
			if(small > val.sqr){
				small = val.sqr
			}
		} else{
			small = val.sqr
		}
	})
	return small
}

const graph = function(k) {
	this.k = k
	this.allNodes = []
};


graph.prototype.addNode = function(array){
	var obj = {}
	obj.x = array[0]
	obj.y = array[1]
	obj.neighbors = []
	obj.sqr = null
	this.allNodes.push(obj)
}

graph.prototype.findSquare = function(node){
    var xl = node.neighbors[1][1].x
    var xs = node.neighbors[1][1].x
    var yl = node.neighbors[1][1].y
    var ys = node.neighbors[1][1].y
	console.log('what does a node look like', node)
	node.neighbors.forEach((val) => {
	  console.log('what is val', val[1])
		if(val[1].x > xl){
			xl = val[1].x
		}
		if(val[1].x < xs){
			xs = val[1].x
		}
		if(val[1].y > yl){
			yl = val[1].y
		}
		if(val[1].y < ys){
			ys = val[1].y 
		}
	})
	console.log('here are our points!!!!', xl, xs, yl, ys)
	xl += 1
	xs -= 1
	yl += 1
	ys -= 1
	var x = xl - xs
	var y = yl - ys
	if(x > y){
	  node.sqr = x*x
	} else{
	  node.sqr = y*y
	}
}

graph.prototype.findNeighbors = function(){
	this.allNodes.forEach((val) => {
		var neighbors = []
		this.allNodes.forEach((nay) => {
	    var x = val.x - nay.x
	    var y = val.y - nay.y
		var z = Math.sqrt(Math.pow(x, 2)+Math.pow(y, 2))
        if(neighbors.length < this.k){
            neighbors.push([z, nay])
        } else if(neighbors.length === this.k){
            for(var j=0;j<neighbors.length;j++){
                if(z<neighbors[j][0]){
                    neighbors.splice(j,1,[z, nay])
                    j = neighbors.length
                }
            }
        }
		})
		val.neighbors = neighbors
		this.findSquare(val)
	})
}

// Jonathan Yuen [3:38 PM]
let x = [0, 2, 2];
let y = [0, 7, 2];
let k = 2;

// ans should be 16

var result = findSmallestSquare(x, y, k)
console.log(result)