import {
	combineLatest,
	debounceTime,
	EMPTY,
	fromEvent,
	map,
	Observable,
	of,
	pluck,
	switchMap,
	withLatestFrom,
} from 'rxjs';
import { userService } from './user.service';
import { terminalLog } from '../../../utils/log-in-terminal';

export class FormComponent {
	private valueSequence$: Observable<string>;

	private input: HTMLInputElement;

	private saveButton: HTMLButtonElement;

	public constructor(public fromContainer: HTMLFormElement) {
		this.input = fromContainer.querySelector('input') as HTMLInputElement;
		this.saveButton = fromContainer.querySelector('button') as HTMLButtonElement;

		this.valueSequence$ = combineLatest([
			fromEvent(this.input, 'input').pipe(pluck('target', 'value')),
			userService.uniqueNameSequence$,
		]).pipe(
			debounceTime(300),
			switchMap(([text, names]: [any, string[]]) => {
				const isNotValid = names.find((name: string) => name === text);
				if (isNotValid) {
					this.input.classList.add('error');
					this.saveButton.disabled = true;
					return EMPTY;
				}
				this.input.classList.remove('error');
				this.saveButton.disabled = false;
				return of(text);
			}),
		);

		fromEvent(this.saveButton, 'click')
			.pipe(
				withLatestFrom(this.valueSequence$),
				map(([, value]) => value),
			)
			.subscribe((v: any) => {
				terminalLog(`Can save ${v}`);
			});
	}
}
