
//Version 1 (Constant Time)
const twoSums = (array, target) => {
  var obj = {}
  for(var i=0;i<array.length;i++){
    if(obj[array[i]]){
      return [array[i], obj[array[i]]]
    } else{
      obj[target-array[i]] = array[i]
    }
  }
  return false
}

//Version2 (Constant Space and Constant Time)
const twoSums = (array, target) =>{
  let A = 0
  let B;
  if(Array.isArray(array) && array.length > 0){
    B = array.length-1
  }else{
    B = 0
  }
  while(A !== B)
  if(array[A]+array[B] === target){
    return [array[A],array[B]]
  } else if(array[A]+array[B] > target){
    B -= 1
  } else if(array[A]+array[B] < target){
    A += 1
  }
  return false
}
