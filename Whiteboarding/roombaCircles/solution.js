let roombaCircles = (str) => {
	let x = 0, y = 0; direction = "N";
	const lMap = {"N": "W", "W": "S", "S": "E", "E": "N"},
		rMap = {"N": "E", "E": "S", "S": "W", "W": "N"},
		mapToUse = {"L": lMap, "R": rMap},
		gMap = {
			"N": () => y++,
			"E": () => x++,
			"S": () => y--,
			"W": () => x--
		};
	// execute given instructions 4 times to determine if circle exists
	for ( var times = 0; times < 4; times++ ) {
		for ( var i = 0; i < str.length; i++ ) {
			if ( str[i] === 'G' ) {
				// update x or y position
				gMap[direction]();
			} else {
				// update direction
				direction = mapToUse[str[i]][direction];
			}
		}
	}
	return x === 0 && y === 0 && direction === "N";
}

console.log(roombaCircles('GGR') === true);
console.log(roombaCircles('GLL') === true);
console.log(roombaCircles('GRGL') === false);
