import { cold } from 'jasmine-marbles';
import { skipLimit } from './skip-limit';

describe('SkipLimit Tests', () => {
	it('getX should', () => {
		const sequence$ = cold('-a--b----c----d---e-|', {
			a: 1,
			b: 4,
			c: -1,
			d: -11,
			e: 11,
		});
		const expected$ = cold('---------c----d-----|', {
			c: -1,
			d: -11,
		});
		expect(sequence$.pipe(skipLimit(2, 2))).toBeObservable(expected$);
	});
});
