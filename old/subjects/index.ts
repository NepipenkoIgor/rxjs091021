import '../../assets/css/style.css';
import { AsyncSubject, map, Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

// new Component1();
//
// userService.sendData('Data about user');
//
// setTimeout(() => {
// 	new Component2();
// }, 2000);

// Subject = Observable + Observer

// const sequence$ = new Subject<number>();
//
// sequence$.next(1);
// sequence$.next(2);
// sequence$.next(3);
// sequence$.next(4);
//
// sequence$.subscribe((v: number) => {
// 	terminalLog(v);
// });
//
// sequence$.next(5);

// const sequence$ = new BehaviorSubject(1);

// sequence$.subscribe((v: number) => {
// 	terminalLog(`Sub1 ${v}`);
// });
// sequence$.next(1);
// sequence$.next(2);
// sequence$.next(3);
// sequence$.next(4);
//
// sequence$.subscribe((v: number) => {
// 	terminalLog(`Sub2 ${v}`);
// });
//
// sequence$.next(5);
// console.log(sequence$.value);

// const sequence$ = new ReplaySubject<number>(undefined, 1100);

// sequence$.subscribe((v: number) => {
// 	terminalLog(`Sub1 ${v}`);
// });
// setTimeout(() => {
// 	sequence$.next(1);
// }, 1000);
// setTimeout(() => {
// 	sequence$.next(2);
// }, 1700);
// setTimeout(() => {
// 	sequence$.next(3);
// 	sequence$.next(4);
// }, 2000);
//
// setTimeout(() => {
// 	sequence$.subscribe((v: number) => {
// 		terminalLog(`Sub2 ${v}`);
// 	});
// }, 3000);

// const sequence$ = new AsyncSubject<number>();
//
// sequence$.subscribe((v: number) => {
// 	terminalLog(`Sub1 ${v}`);
// });
// sequence$.next(1);
// sequence$.next(2);
// sequence$.next(3);
// sequence$.next(4);
//
// sequence$.complete();
//
// sequence$.subscribe((v: number) => {
// 	terminalLog(`Sub2 ${v}`);
// });

function getItems(url: string) {
	let subject: AsyncSubject<any>;
	return new Observable((subscriber) => {
		if (!subject) {
			subject = new AsyncSubject();
			ajax({
				url,
				crossDomain: true,
			})
				.pipe(map((res: AjaxResponse<any>) => res.response))
				.subscribe(subject);
		}
		return subject.subscribe(subscriber);
	});
}

const items$ = getItems('http://learn.javascript.ru/courses/groups/api/participants?key=7vr4hi');

items$.subscribe((v) => {
	console.log(v);
});

setTimeout(() => {
	items$.subscribe((v) => {
		console.log(v);
	});
}, 5000);
