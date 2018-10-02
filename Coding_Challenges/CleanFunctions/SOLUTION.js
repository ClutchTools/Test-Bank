function randomChanceError(x){
  var i;
  if(typeof x !== "number"){
    i = Math.round(Math.random() * 100)
  } else{ 
    i = x
  }
  if(i % 2 === 0){
    return i;
  } else{
    throw new Error('Randomly throw error!')
  }
}

function cleanseFunction(fn){
  return () => {
  try{
    return fn()
    } catch(err){
    return err.message
  }
 }
}

var cleanFunction = cleanseFunction(randomChanceError)


for (var i=0; i < 10; i++) {
  console.log(cleanFunction())
}