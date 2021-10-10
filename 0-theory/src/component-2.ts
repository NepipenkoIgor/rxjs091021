import { userService } from './service';
import { terminalLog } from '../../utils/log-in-terminal';

// class UnSubscriber {
// 	public controll$ = new Subject();
//
// 	public ngOnDestroy() {
// 		this.controll$.next(null);
// 		this.controll$.complete();
// 	}
// }

export class Component2 {
	public constructor() {
		userService
			.getData()
			// .pipe(takeUntil(this.controll$))
			.subscribe((v: any) => {
				terminalLog(`Component2 => ${v}`);
			});
		userService.sendData('New data about user');
	}
}
