import 'bootstrap';
import '../../assets/css/style.css';
import './styles.css';
import { fromEvent, tap } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { IResult, liveSearch$, requestRepo$ } from './live-search';

const inputEl = document.querySelector('#search') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;

export function createCard({ name, description, owner: { avatar_url } }: IResult): string {
	return `
				     <div class="col-sm-6 col-md-4">
				        <div class="card">  
				            <img class="card-img-top" src=${avatar_url} alt=${name}>
				            <div class="card-body">
				               <h5 class="card-title">${name}</h5>
				               <p class="card-text">${description}</p>
                            </div>
                        </div>
                     </div>
					`;
}

export function createRow(htmlStr: string[]): string {
	return `<div class="row">${htmlStr.join(' ')}</div>`;
}

liveSearch$(
	fromEvent<InputEvent>(inputEl, 'input'),
	(text: string) =>
		requestRepo$(
			ajax<{ items: IResult[] }>({
				url: `https://api.github.com/search/repositories?q=${text}`,
				method: 'GET',
				crossDomain: true,
			}),
			createCard,
			createRow,
		).pipe(
			tap(() => {
				console.log('....loaded');
			}),
		),
	(_text: string) => {
		console.log('....load');
	},
).subscribe((htmlStr: string) => {
	container.innerHTML = htmlStr;
});
