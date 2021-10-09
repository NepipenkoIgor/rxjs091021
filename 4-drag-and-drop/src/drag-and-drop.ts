import { concatMap, fromEvent, map, Observable, takeUntil } from 'rxjs';

export const box = document.querySelector('.draggable') as HTMLDivElement;
const mousedown$ = fromEvent<MouseEvent>(box, 'mousedown');
const mousemove$ = fromEvent<MouseEvent>(document, 'mousemove');
const mouseup$ = fromEvent<MouseEvent>(box, 'mouseup');

export function drag(
	source1$: Observable<MouseEvent>,
	source2$: Observable<MouseEvent>,
	source3$: Observable<MouseEvent>,
) {
	return source1$.pipe(
		concatMap((start: MouseEvent) => {
			start.preventDefault();
			console.log('Drag Start');
			return source2$.pipe(
				map((move: MouseEvent) => {
					move.preventDefault();
					return {
						left: move.clientX - start.offsetX,
						top: move.clientY - start.offsetY,
					};
				}),
				takeUntil(source3$),
			);
		}),
	);
}

export const drag$ = drag(mousedown$, mousemove$, mouseup$);
