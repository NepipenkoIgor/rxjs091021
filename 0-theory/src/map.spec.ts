import { TestScheduler } from 'rxjs/testing';
import { map } from './map';

describe('RxJS tests', () => {
	let testScheduler: TestScheduler;
	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});
	it('map should work', () => {
		testScheduler.run((helpers) => {
			const { cold, expectObservable } = helpers;
			const sequence = cold('-a--b--c---|', { a: 2, b: 10, c: 5 });
			const expectedMarble = '-d--e--g---|';
			expectObservable(sequence.pipe(map((x) => x ** 2))).toBe(expectedMarble, {
				d: 4,
				e: 100,
				g: 25,
			});
		});
	});
});
