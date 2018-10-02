const secondSmallest = (array) => {
  let min = Infinity
  let result = Infinity
  if(array.length < 2){
    return false
  }
  array.forEach((val) => {
    if(val < min){
      result = min
      min = val
    } else if(val < result){
      result = val
    }
  })
  
  return result
}