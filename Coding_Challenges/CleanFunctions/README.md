## Prompt 

Given the following code snippet below, please finish the cleanseFunction so that it doesn't break the for loop and so that in the for loop it console logs either the random number or the error message.

```
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
/*YOUR CODE HERE*/
}

var cleanFunction = cleanseFunction(randomChanceError)


for (var i=0; i < 10; i++) {
  console.log(cleanFunction())
}
```
