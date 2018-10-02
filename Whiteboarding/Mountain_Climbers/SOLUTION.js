function mountainClimbers(array){
  let steps = null;
  //our measures of highest and lowest
  let min = Infinity;
  let max = -Infinity;
  //coordinates of row/column
  let lowestPoint = []
  let highestPoint = []
  
  //find the Largest and Smallest values
  const findMinMax = (array) => {
    for(var i=0;i<array.length;i++){
      for(var j=0;j<array[i].length;j++){
        if(array[i][j] < min){
          min = array[i][j]
          lowestPoint = [i, j]
        }
        if(array[i][j] > max){
          max = array[i][j]
          highestPoint = [i, j]
        }
      }
    }
  }
  
  //Helper function to check to see if a row/column actually exists before stepping there
  const doesItExist = (row, column) => {
    if(row >= array.length || row < 0){
      return false
    }
    if(array.length > 0){
      if(column >= array[0].length || column < 0){
        return false
      }
    }
    return true
  }
  
  //This will be our recursive function
  const climb = (row, column, count, path) =>{
    //Check to see if we made it to the top
    if(row === highestPoint[0] && column === highestPoint[1]){
      if(count < steps || steps === null){
        steps = count
        return
      }
    }
    //Check Left
    if(doesItExist(row, column-1)){
      if(array[row][column] <= array[row][column-1] && path.indexOf(JSON.stringify([row, column-1])) === -1){
        climb(row, column-1, count+1, path.concat(JSON.stringify([row, column-1])))
      }
    }
    //Check Right
    if(doesItExist(row, column+1)){
      if(array[row][column] <= array[row][column+1] && path.indexOf(JSON.stringify([row, column+1])) === -1){
        climb(row, column+1, count+1, path.concat(JSON.stringify([row, column+1])))
      }
    }
    //Check Up
    if(doesItExist(row-1, column))
      if(array[row][column] <= array[row-1][column] && path.indexOf(JSON.stringify([row-1, column])) === -1){
        climb(row-1, column, count+1, path.concat(JSON.stringify([row-1, column])))
      }
    //Check Down
    if(doesItExist(row+1, column))
      if(array[row][column] <= array[row+1][column] && path.indexOf(JSON.stringify([row+1, column])) === -1){
        climb(row+1, column, count+1, path.concat(JSON.stringify([row+1, column])))
      }
  }

  //OUR FUNCTION CALLS START HERE
  findMinMax(array)
  if(min === max){
    //if the array has all the same numbers return 0
    return 0
  } else{
    //Calling our recursive function to find shortest number of steps
    climb(lowestPoint[0], lowestPoint[1], 0, [JSON.stringify(lowestPoint)])
  }
  return steps
}