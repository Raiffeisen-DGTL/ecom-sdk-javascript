export default args => {
	const [arg1, arg2] = args;

	if (typeof arg1 === 'string') {
		return [arg1, arg2];
	}
	return [undefined, arg1];
};
