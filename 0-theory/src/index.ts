import '../../assets/css/style.css';
import { filter, interval, Observable, pipe, Subscriber } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

// function doNothing(source: Observable<any>) {
// 	return source;
// }

// function toText(_source: Observable<any>) {
// 	return new Observable((subscriber) => {
// 		subscriber.next('My text');
// 		subscriber.complete();
// 	});
// }

// function double(_source: Observable<number>) {
// 	return new Observable((subscriber) => {
// 		_source.subscribe({
// 			next(v) {
// 				subscriber.next(v * 2);
// 			},
// 			error(err) {
// 				subscriber.error(err);
// 			},
// 			complete() {
// 				subscriber.complete();
// 			},
// 		});
// 	});
// }
//
// interval(1000)
// 	.pipe(doNothing, take(4), double)
// 	.subscribe({
// 		next: (v) => {
// 			terminalLog(v as any);
// 		},
// 		complete: () => {
// 			terminalLog('completed');
// 		},
// 	});

// const o$ = new Observable();
// o$.source = interval(1000);
// o$.operator = {
// 	call(subscriber: Subscriber<unknown>, source: any) {
// 		source.subscribe(subscriber);
// 	},
// };

// const o$ = interval(1000).lift({
// 	call(subscriber: Subscriber<unknown>, source: any) {
// 		source.subscribe(subscriber);
// 	},
// });

class DoubleSubscriber extends Subscriber<number> {
	public override next(value: number) {
		super.next(value * 2);
	}
}

const double = (source: Observable<number>) => {
	return source.lift({
		call(subscriber: Subscriber<unknown>, s: any) {
			s.subscribe(new DoubleSubscriber(subscriber));
		},
	});
};

// const pipe =
// 	(...fns: Function[]) =>
// 	(source: Observable<any>) =>
// 		fns.reduce((acc, fn) => fn(acc), source);

const doubleWithFilter = pipe(
	filter((v: any) => !!(v % 2)),
	double,
);

interval(1000)
	.pipe(doubleWithFilter)
	.subscribe({
		next: (v) => {
			terminalLog(v as any);
		},
		complete: () => {
			terminalLog('completed');
		},
	});
