import '../../assets/css/style.css';
import { observeOn, queueScheduler, Subject, take } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

// console.log('start');
// // setTimeout(() => console.log('time1'));
// // setTimeout(() => console.log('time2'));
// // Promise.resolve().then(() => console.log('promise1'));
// // Promise.resolve().then(() => console.log('promise2'));
// of(1, 2, 3, 4, asapScheduler).subscribe((v) => {
// 	console.log(v);
// });
// console.log('end');

/*
   ----------time1-------time2--------------
   start
   end

   promise1
   promise2
 */

// const sequence1$ = scheduled([1, 2], asapScheduler);
// const sequence2$ = of(10);
//
// const sequence$ = combineLatest([sequence1$, sequence2$]).pipe(map(([x, y]) => x + y));

// console.log('start');
// const sequence$ = of(1, 2, 3, 4, 5).pipe(
// 	// subscribeOn(asapScheduler),
// 	tap((v) => {
// 		console.log(`tap 1===> ${v}`);
// 	}),
// 	observeOn(asapScheduler),
// 	tap((v) => {
// 		console.log(`tap 2===> ${v}`);
// 	}),
// );
// sequence$.subscribe((v) => {
// 	console.log('Sub => ', v);
// });
// console.log('end');

const signal = new Subject<number>();
let count = 0;
const someCalc = (_count: number) => console.log('do some calc');

console.log('start');
signal.pipe(take(1600), observeOn(queueScheduler)).subscribe(() => {
	someCalc(count);
	signal.next(count++);
});
signal.next(count++);
console.log('end');
