import '../../assets/css/style.css';
import { interval, share, Subject } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');

// const subject = new Subject();
// const sequenceConnectable$ = interval(1000).pipe(
// 	// publish(), // multicast + subject
// 	// refCount(),
// 	share(), // publish + refCount
// 	// multicast(subject)
// ); // as ConnectableObservable<any>;
// // sequenceConnectable$.connect();
// const sub = sequenceConnectable$.subscribe((v) => {
// 	terminalLog(`Sub 1=> ${v}`);
// });
//
// setTimeout(() => {
// 	sub.unsubscribe();
// }, 3000);
//
// setTimeout(() => {
// 	sequenceConnectable$.subscribe((v) => {
// 		terminalLog(`Sub 2=> ${v}`);
// 	});
// }, 5000);

/**
 * ConnectableObservable, refCount, publish,publishReplay, publishLast, publishBehaviour, multicast,
 */

/**
 * connectable, connect, share, shareReplay
 */

// const sequence$ = connectable(interval(1000), {
// 	connector: () => new Subject(),
// });
// sequence$.connect();

const sequence$ = interval(1000).pipe(
	share({
		connector: () => new Subject(),
		resetOnRefCountZero: true,
	}),
);
const sub = sequence$.subscribe((v) => {
	terminalLog(`Sub 1=> ${v}`);
});
setTimeout(() => {
	sub.unsubscribe();
}, 3000);

setTimeout(() => {
	sequence$.subscribe((v) => {
		terminalLog(`Sub 2=> ${v}`);
	});
}, 5000);
