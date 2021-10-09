import '../../assets/css/style.css';
import './styles.css';
import { box, drag$ } from './drag-and-drop';

drag$.subscribe((pos) => {
	box.style.left = `${pos.left}px`;
	box.style.top = `${pos.top}px`;
});
