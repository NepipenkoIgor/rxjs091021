import { filter, fromEvent, map, merge, Observable, zip } from 'rxjs';

export function getX(source$: Observable<MouseEvent | TouchEvent>): Observable<number> {
	return source$.pipe(
		map((e: MouseEvent | TouchEvent) => {
			if (e instanceof TouchEvent) {
				return e.changedTouches[0]!.clientX;
			}
			return e.clientX;
		}),
	);
}

export function swipe(source$: Observable<[number, number]>): Observable<number> {
	return source$.pipe(
		map(([startX, endX]: [number, number]) => {
			return startX - endX;
		}),
		filter((v) => v !== 0),
	);
}

const touchStart$ = getX(
	merge(
		fromEvent<MouseEvent>(document, 'mousedown'),
		fromEvent<TouchEvent>(document, 'touchstart'),
	),
);
const touchEnd$ = getX(
	merge(fromEvent<MouseEvent>(document, 'mouseup'), fromEvent<TouchEvent>(document, 'touchend')),
);

export const swipe$: Observable<number> = swipe(zip(touchStart$, touchEnd$));
