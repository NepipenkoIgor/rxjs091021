import '../../assets/css/style.css';
import { swipe$ } from './swipe';
import { terminalLog } from '../../utils/log-in-terminal';

swipe$.subscribe((v) => {
	const message = v > 0 ? 'swipe left' : 'swipe right';
	terminalLog(message);
});
