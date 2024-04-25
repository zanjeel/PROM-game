const directionOffset = ({ left, right, forward, back }) => {
	let directionOffset = 0;

	if (forward) {
		if (left) {
			directionOffset = Math.PI / 4;
		} else if (right) {
			directionOffset = -Math.PI / 4;
		}
	} else if (back) {
		if (left) {
			directionOffset = Math.PI / 4 + Math.PI / 2;
		} else if (right) {
			directionOffset = -Math.PI / 4 - Math.PI / 2;
		} else {
			directionOffset = Math.PI;
		}
	} else if (left) {
		directionOffset = Math.PI / 2;
	} else if (right) {
		directionOffset = -Math.PI / 2;
	}
    
	return directionOffset;
};

export default directionOffset;
