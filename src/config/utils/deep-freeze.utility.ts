export const deepFreeze = <T = unknown>(object: T): T => {
	Object.freeze(object);
	if (object === undefined) {
		return object;
	}

	Object.getOwnPropertyNames(object).forEach((prop) => {
		if (
			object[prop] !== null &&
			(typeof object[prop] === 'object' || typeof object[prop] === 'function') &&
			!Object.isFrozen(object[prop])
		) {
			deepFreeze(object[prop]);
		}
	});

	return object;
};
