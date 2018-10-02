/*
NOTE: There is more than likely a more optimal solution that is O(N) time complexity.
Feel free to submit a pull request with a more optomized solution.
*/

function sortCouples(row){
	let count = 0

	//helperFunciton
	const swapHelper = (value, index) => {
		let oldIndex = row.indexOf(value)
		let currentValue = row[index]
		row[index] = value
		row[oldIndex] = currentValue
		count += 1
	}
	for(var i=0;i<row.length-1;i+=2){
	  if(row[i]%2===0){
	    if(row[i+1] !== row[i]+1){
	      swapHelper(row[i]+1, i+1)
	    }
	  } else{
	    if(row[i+1] !== row[i]-1){
	      swapHelper(row[i]-1, i+1)
	    }
	    
	  }
	}
	return count
}
