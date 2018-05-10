

/* Brute Force Permutation */

const child = (n, count) => {
  count = count || 0
  let result = 0
  const steps = [1,2,3]
  steps.forEach((val) => {
    count += val
    if(count < n){
    result += child(n, count)
    count -= val
    } else if(count === n){
      result += 1
    } else{
      count -= val
    }
  })
  
  return result
  
}

/* Slightly better permutation/brute force */

const child = (n, count) => {
  count = count || 0
  let result = 0
  if(count <= n-3){
    result += child(n, count+1)
    result += child(n, count+2)
    result += child(n, count+3)
  } else if(count <= n-2){
    result += child(n, count+1)
    result += child(n, count+2)
  } else if(count <= n-1){
    result += child(n, count+1)
  } else {
    result += 1
  }
  return result
  
}


/* Dyanmic Programming Solution *BEST SOLUTION* */

const child = (steps, memo = []) => {
  if (steps < 0) {
    return 0;
  } else if (steps === 0) {
    return 1;
  } else if (memo[steps]) {
    return memo[steps];
  } else {
    memo[steps] = child(steps - 1, memo) + child(steps - 2, memo) + child(steps - 3, memo);
    return memo[steps];
  }
}
