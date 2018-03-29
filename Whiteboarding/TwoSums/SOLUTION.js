var twoSums = (array, target) => {
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
