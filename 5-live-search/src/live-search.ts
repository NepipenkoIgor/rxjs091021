import {
	bufferCount,
	concatAll,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	Observable,
	reduce,
	switchMap,
	tap,
} from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

export interface IResult {
	name: string;
	description: string;
	owner: {
		avatar_url: string;
	};
}

export function requestRepo$(
	source$: Observable<AjaxResponse<{ items: IResult[] }>>,
	cardFn: (item: IResult) => string,
	rowFn: (htmlStr: string[]) => string,
) {
	return source$.pipe(
		map((res: AjaxResponse<{ items: IResult[] }>) => res.response.items),
		concatAll(),
		map(cardFn),
		bufferCount(3),
		reduce((resultHtmlStr: string, htmlStr: string[]) => {
			return `${resultHtmlStr}${rowFn(htmlStr)}`;
		}, ''),
		map((html: string) => html.trim().replace(/\s+(<)/g, '<')),
	);
}

export function liveSearch$(
	source$: Observable<InputEvent>,
	requestFn: (text: string) => Observable<string>,
	preloadFn: (text: string) => void = (_text: string) => {},
) {
	return source$.pipe(
		debounceTime(300),
		// pluck('target', 'value')
		map((e: InputEvent) => {
			return (e.target as HTMLInputElement).value.trim();
		}),
		filter((text: string) => text.length > 3),
		distinctUntilChanged(),
		tap(preloadFn),
		switchMap(requestFn),
	);
}
