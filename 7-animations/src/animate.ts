import { animationFrameScheduler, defer, interval, map, takeWhile, tap } from 'rxjs';

const animationFn = (percentage: number) => {
	return Math.sin(-13 * (percentage + 1) * Math.PI * 2) * 2 ** (-10 * percentage) + 1;
};

function elapsed(scheduler = animationFrameScheduler) {
	return defer(() => {
		const start = scheduler.now();
		return interval(0, scheduler).pipe(map(() => scheduler.now() - start));
	});
}

function duration(ms: number, scheduler = animationFrameScheduler) {
	return elapsed(scheduler).pipe(
		map((time) => time / ms),
		takeWhile((percentage) => percentage <= 1),
	);
}

function distance(px: number) {
	return (percentage: number) => percentage * px;
}

export function animationDown(element: HTMLElement, ms: number, px: number) {
	return duration(ms).pipe(
		map(animationFn),
		map(distance(px)),
		tap((frame) => {
			element.style.transform = `translate3d(0,${frame}px,0`;
		}),
	);
}
