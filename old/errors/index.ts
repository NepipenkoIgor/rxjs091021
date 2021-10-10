import '../../assets/css/style.css';
import { catchError, EMPTY, interval, map, of, switchMap, tap, zip } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

const sequence1$ = interval(1000);
const sequence2$ = of('1', '2', '3', 4, '5', '6', '7');
const sequence$ = zip(sequence1$, sequence2$);
// sequence$
// 	.pipe(
// 		map(([, y]) => {
// 			// try {
// 			// 	return (y as any).toUpperCase();
// 			// } catch (err) {
// 			// 	return 'N';
// 			// }
// 			return (y as any).toUpperCase();
// 		}),
// 		tap(() => {
// 			console.log('before err');
// 		}),
// 		// retry(3),
// 		retryWhen((errObs) => errObs.pipe(delay(5000))),
// 		catchError((err) => {
// 			console.log(err);
// 			return EMPTY;
// 		}),
// 		tap(() => {
// 			console.log('after err');
// 		}),
// 	)

sequence$
	.pipe(
		switchMap(([, y]) => {
			return of(y).pipe(
				map((value) => {
					return (value as any).toUpperCase();
				}),
				tap(() => {
					console.log('before err');
				}),
				catchError((err) => {
					console.log(err);
					return EMPTY;
				}),
				tap(() => {
					console.log('after err');
				}),
			);
		}),
		catchError((err) => {
			console.log(err);
			return EMPTY;
		}),
	)
	.subscribe({
		next: (v) => terminalLog(v),
		error: (err) => terminalLog(err),
		complete: () => terminalLog('Completed'),
	});
