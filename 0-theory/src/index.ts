import '../../assets/css/style.css';
import { terminalLog } from '../../utils/log-in-terminal';
import { exhaustMap, fromEvent, pluck } from 'rxjs';
import { ajax } from 'rxjs/ajax';

terminalLog('Теория');
// const sequence$ = interval(1000).pipe(switchMap((v) => of(v * 2)));

const inputEl = document.querySelector('input') as HTMLInputElement;

const sequence$ = fromEvent(inputEl, 'input').pipe(
	pluck('target', 'value'),
	exhaustMap((text) => {
		return ajax({
			url: `http://learn.javascript.ru/courses/groups/api/participants?key=7vr4hi&text=${text}`,
			method: 'GET',
			crossDomain: true,
		});
	}),
	// mergeAll(),
	// map + mergeAll = mergeMap
	// map + switchAll = switchMap
	// map + concatAll = concatMap  mergeMap(1)
	// map + exhaustAll = exhaustMap  mergeMap(1)
);

sequence$.subscribe((v: any) => {
	console.log(v);
	// v.subscribe((v1) => {
	// 	terminalLog(v1);
	// });
});
