import { userService } from './service';
import { terminalLog } from '../../utils/log-in-terminal';

export class Component1 {
	public constructor() {
		userService.getData().subscribe((v: any) => {
			terminalLog(`Component1 => ${v}`);
		});
	}
}
