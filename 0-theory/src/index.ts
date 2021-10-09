import '../../assets/css/style.css';
import { Observable, Subscriber } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');
// const countSequence = new Promise((res) => {
//     let count = 0;
//     setInterval(() => {
//         res(++count);
//     }, 1000)
// })
//
// countSequence.then((c) => console.log(c));
// countSequence.then((c) => console.log(c));
// countSequence.then((c) => console.log(c));
// countSequence.then((c) => console.log(c));
// countSequence.then((c) => console.log(c));

// const countSequence = function* iteratorFn() {
//     let count = 1;
//     while (true) {
//         yield count++;
//     }
// }();
//
// console.log(countSequence.next().value);
// console.log(countSequence.next().value);
// console.log(countSequence.next().value);
// console.log(countSequence.next().value);
// console.log(countSequence.next().value);
// console.log(countSequence.next().value);
// let count = 1;
//
//
//
// const sequence$ = new Observable((subscriber: Subscriber<any>) => {
//     console.log('New Observable');
//     const intervalId = setInterval(() => {
//         // console.log('interval')
//         // if(count % 3 === 0) {
//         //     subscriber.complete();
//         // }
//         subscriber.next(++count);
//     }, 1000)
//     return () => {
//         clearInterval(intervalId);
//         console.log('unsubscribe');
//     }
// })
// const sequence$ = fromEvent<MouseEvent>(document, 'click');
// console.log(sequence$);
// const socket: WebSocket = new WebSocket('wss://echo.websocket.org');
const inputEl = document.querySelector('input') as HTMLInputElement;
const sequence$ = new Observable((subscriber: Subscriber<any>) => {
	function listener(e: Event) {
		subscriber.next((e.target as HTMLInputElement).value);
	}
	inputEl.addEventListener('input', listener);
	return () => {
		console.log('unsubscribe');
		inputEl.removeEventListener('message', listener);
	};
});

// function main() {
//     console.log('Opened');
//     let count = 0;
//
//     setInterval(() => {
//         socket.send((count++).toString());
//     }, 2000)
// }
//
// socket.addEventListener('open', main)

sequence$.subscribe((v) => {
	terminalLog(`Sub1: ${v}`);
});

setTimeout(() => {
	sequence$.subscribe((v) => {
		terminalLog(`Sub2: ${v}`);
	});
}, 5000);
