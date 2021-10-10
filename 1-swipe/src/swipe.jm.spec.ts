import { zip } from 'rxjs';
import { hot } from 'jasmine-marbles';
import { getX, swipe } from './swipe';

function createTouchEvent(clientX: number) {
	return new TouchEvent('event', {
		changedTouches: [new Touch({ clientX, identifier: 1, target: new EventTarget() })],
	});
}

describe('Swipe Tests', () => {
	it('getX should', () => {
		const sequence$ = hot('-a--b----c--|', {
			a: createTouchEvent(2),
			b: createTouchEvent(10),
			c: createTouchEvent(5),
		});
		const expected$ = hot('       -a--b----c--|', {
			a: 2,
			b: 10,
			c: 5,
		});
		expect(getX(sequence$)).toBeObservable(expected$);
	});
	it('swipe should', () => {
		const sequence1$ = hot('    -a----b------|', {
			a: createTouchEvent(2),
			b: createTouchEvent(33),
		});
		const sequence2$ = hot('    ---a-----b-----c---|', {
			a: createTouchEvent(10),
			b: createTouchEvent(23),
		});
		const expectedMarble = hot('---a-----b---|', {
			a: -8,
			b: 10,
		});
		expect(swipe(zip(getX(sequence1$), getX(sequence2$)))).toBeObservable(expectedMarble);
	});
});
