import '../../assets/css/style.css';
import { fromEvent, map, take } from 'rxjs';
import { skipLimit } from './skip-limit';
import { terminalLog } from '../../utils/log-in-terminal';

/**
 *   ---0---1---2---3---4---5---6---7---8---
 * skipLimit(4, 3)
 *   -------------------4---5---6-----------
 */

fromEvent<MouseEvent>(document, 'click')
	.pipe(
		map((e) => e.clientX),
		take(5),
		skipLimit(4, 3),
	)
	.subscribe({
		next: (v: any) => {
			terminalLog(v);
		},
		complete: () => {
			terminalLog('completed');
		},
	});
