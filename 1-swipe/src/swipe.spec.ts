import { TestScheduler } from 'rxjs/testing';
import { zip } from 'rxjs';
import { getX, swipe } from './swipe';

function createTouchEvent(clientX: number) {
	return new TouchEvent('event', {
		changedTouches: [new Touch({ clientX, identifier: 1, target: new EventTarget() })],
	});
}

describe('Swipe Tests', () => {
	let testScheduler: TestScheduler;
	beforeEach(() => {
		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});
	it('getX should', () => {
		testScheduler.run((helpers) => {
			const { cold, expectObservable } = helpers;
			const sequence$ = cold('-a--b----c--|', {
				a: createTouchEvent(2),
				b: createTouchEvent(10),
				c: createTouchEvent(5),
			});
			const expectedMarble = '       -a--b----c--|';
			expectObservable(getX(sequence$)).toBe(expectedMarble, {
				a: 2,
				b: 10,
				c: 5,
			});
		});
	});
	it('swipe should', () => {
		testScheduler.run((helpers) => {
			const { cold, expectObservable } = helpers;
			const sequence1$ = cold('-a----b------|', {
				a: createTouchEvent(2),
				b: createTouchEvent(33),
			});
			const sequence2$ = cold('---a-----b-----c---|', {
				a: createTouchEvent(10),
				b: createTouchEvent(23),
			});
			const expectedMarble = '       ---a-----b---|';
			expectObservable(swipe(zip(getX(sequence1$), getX(sequence2$)))).toBe(expectedMarble, {
				a: -8,
				b: 10,
			});
		});
	});
});
