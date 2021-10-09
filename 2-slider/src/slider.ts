import { combineLatest, fromEvent, map, Observable, startWith, tap, withLatestFrom } from 'rxjs';

interface ISliderData {
	element: HTMLElement;
	value: number;
}

const qualitySlider = $('#quality').slider();
const ratingSlider = $('#rating').slider();
const actualSlider = $('#actual').slider();

function getValue(
	source$: Observable<any>,
	initialValue: ISliderData,
	sideCb: (v: ISliderData) => void,
) {
	return source$.pipe(
		map(({ delegateTarget: { previousElementSibling }, value: { newValue } }) => {
			return {
				value: newValue,
				element: previousElementSibling,
			};
		}),
		startWith(initialValue),
		tap(sideCb),
		map(({ value }) => value),
	);
}

function redrawSlider({ element, value }: ISliderData) {
	const sliderTrack = element.querySelector('.slider-track') as HTMLElement;
	const v = value * 10;
	sliderTrack.classList.remove('bad', 'good', 'warn');
	if (v < 40) {
		sliderTrack.classList.add('bad');
		return;
	}
	if (v >= 40 && v <= 70) {
		sliderTrack.classList.add('warn');
		return;
	}
	sliderTrack.classList.add('good');
}

const quality$ = getValue(
	fromEvent(qualitySlider, 'change'),
	{
		value: 5,
		element: qualitySlider.parent().children(':first-child')[0]!,
	},
	redrawSlider,
);
const rating$ = getValue(
	fromEvent(ratingSlider, 'change'),
	{
		value: 5,
		element: ratingSlider.parent().children(':first-child')[0]!,
	},
	redrawSlider,
);

const actual$ = getValue(
	fromEvent(actualSlider, 'change'),
	{
		value: 5,
		element: actualSlider.parent().children(':first-child')[0]!,
	},
	redrawSlider,
);

export function sliderSequence$(...sources$: Observable<number>[]): Observable<number> {
	return combineLatest(sources$).pipe(
		map(([quality, rating, actual]: number[]) => {
			return Math.round(((quality! + rating! + actual!) / 3) * 10);
		}),
	);
}

const resultBtn = document.querySelector('#send-result') as HTMLButtonElement;
export const sliderResultSequence$ = fromEvent(resultBtn, 'click').pipe(
	withLatestFrom(sliderSequence$(quality$, rating$, actual$)),
	// switchMap(() => {
	// 	return sliderSequence$(quality$, rating$, actual$);
	// }),
);
