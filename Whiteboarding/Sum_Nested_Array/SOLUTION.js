 const sumNested = (array) => {
   let total = 0
   array.forEach((val) => {
     if(Array.isArray(val)){
       total += sumNested(val)
     } else{
       total += val
     }
   })
   return total
}