let hanoi = (n, start, helper, destination) => {
    if ( n > 0 ) {
        // move tower of size n - 1 from start to helper 
        hanoi(n - 1, start, destination, helper);
        // move disc from start to destination
        if ( start[0].length >= 0 ) {
            let disc = start[0].pop();
            console.log('moving disc ' + disc + ' from ' + start[1] + ' to ' + destination[1]);
            destination[0].push(disc);
        }
        // move tower of size n - 1 from helper to destination
        hanoi(n - 1, helper, start, destination);
    }
}

