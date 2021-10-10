import '../../assets/css/style.css';
import './styles.css';
import { animationDown } from './animate';
import { terminalLog } from '../../utils/log-in-terminal';

const el = document.querySelector('.animated-shape') as HTMLDivElement;

animationDown(el, 20000, 200).subscribe({
	next: (v) => {
		terminalLog(`Coord => ${v}`);
	},
	complete: () => {
		terminalLog('animation completed');
	},
});
