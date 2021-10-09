import '../../assets/css/style.css';
import { filter, interval, map, skip, take } from 'rxjs';
import { terminalLog } from '../../utils/log-in-terminal';

terminalLog('Теория');
//
// of(1, 2, 3, 4, 5).subscribe((v) => {
// 	terminalLog(v);
// });

// from([1, 2, 3, 4, 5]).subscribe((v) => {
// 	terminalLog(v);
// });

// range(1, 10).subscribe((v) => {
// 	terminalLog(v);
// });
// interface IUser {
// 	profileName: string;
// 	firstName: string;
// 	surname: string;
// 	photo: string;
// 	country: string;
// }

// from(
// 	fetch('http://learn.javascript.ru/courses/groups/api/participants?key=7vr4hi').then((res) =>
// 		res.json(),
// 	),
// )
// 	.pipe(
// 		concatAll(),
// 		map((user: any) => {
// 			return `${user.firstName} ${user.surname}`;
// 		}),
// 		// toArray(),
// 	)
// 	.subscribe((v: any) => {
// 		terminalLog(v);
// 	});

// const random = Math.round(Math.random() * 10);
// console.log(random);
// const sequence$ = iif(
// 	() => {
// 		return random > 5;
// 	},
// 	of('First sequence'),
// 	of('Second sequence'),
// );
// const sequence$ = defer(() => {
// 	if (random < 5) {
// 		return of('First sequence');
// 	}
// 	if (random >= 5 && random < 7) {
// 		return of('Second sequence');
// 	}
// 	return of('Third sequence');
// });
//
// sequence$.subscribe((v: any) => {
// 	terminalLog(v);
// });

// import fs from 'fs';
// import util from 'util';
// import { from, map } from 'rxjs';

// const readFileFn = bindNodeCallback(fs.readFile);
// const readFile$ = from(util.promisify(fs.readFile)(`${__dirname}/text`));
// readFileFn(`${__dirname}/text`)
// readFile$
// 	.pipe(
// 		map((buffer) => {
// 			const str = buffer.toString();
// 			const regExp = />([^<]+)</;
// 			const matches = regExp.exec(str);
// 			return matches && matches[1];
// 		}),
// 	)
// 	.subscribe((v) => {
// 		console.log(v);
// 	});

//
// fromEvent(document, 'click')

const sequence$ = interval(1000);
/**
 * sequence$  ---0---1---2---3---4---5---6---7---
 *      take(5)
 *            ---0---1---2---3---4|
 *      skip(4)
 *            -------------------4|
 *      filter((x)=>x%2 === 0)
 *            -------------------4|
 *       map((x)=>x*2)
 *            -------------------8|
 *
 */

sequence$
	.pipe(
		take(5),
		skip(4),
		filter((x) => x % 2 === 0),
		map((x) => x * 2),
	)
	.subscribe((v: any) => {
		terminalLog(v);
	});
