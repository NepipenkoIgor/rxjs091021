import 'bootstrap';
import '../../assets/css/style.css';
import { FormComponent } from './form';

const form1 = document.querySelector('.first-form') as HTMLFormElement;
const form2 = document.querySelector('.second-form') as HTMLFormElement;

form2.hidden = true;

// eslint-disable-next-line no-new
new FormComponent(form1);

setTimeout(() => {
	form2.hidden = false;
	// eslint-disable-next-line no-new
	new FormComponent(form2);
}, 5000);
