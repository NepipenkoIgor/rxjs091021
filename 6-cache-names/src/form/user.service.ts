import { ajax, AjaxResponse } from 'rxjs/ajax';
import { concatAll, map, pluck, shareReplay, switchMap, tap, timer, toArray } from 'rxjs';

export interface IUser {
	profileName: string;
	firstName: string;
	surname: string;
	country: string;
}

export class UserService {
	private newName = '';

	public uniqueNameSequence$ = timer(0, 16000).pipe(
		switchMap(() => {
			return ajax<IUser[]>({
				url: 'http://learn.javascript.ru/courses/groups/api/participants?key=7vr4hi',
				crossDomain: true,
			}).pipe(
				pluck<AjaxResponse<IUser[]>, 'response'>('response'),
				concatAll(),
				pluck<IUser, 'profileName'>('profileName'),
				toArray(),
				map((names) => {
					if (!this.newName) {
						return names;
					}
					return [...names, this.newName];
				}),
				tap(() => {
					this.newName = 'inepipenko';
				}),
				// share({
				// 	connector: () => new ReplaySubject(),
				// 	resetOnRefCountZero: false,
				// 	resetOnComplete: false,
				// }),
			);
		}),
		shareReplay(),
	);

	// public uniqueNameSequence$ = ajax<IUser[]>({
	// 	url: 'http://learn.javascript.ru/courses/groups/api/participants?key=7vr4hi',
	// 	crossDomain: true,
	// }).pipe(
	// 	pluck<AjaxResponse<IUser[]>, 'response'>('response'),
	// 	concatAll(),
	// 	pluck<IUser, 'profileName'>('profileName'),
	// 	toArray(),
	// 	shareReplay(),
	// 	// share({
	// 	// 	connector: () => new ReplaySubject(),
	// 	// 	resetOnRefCountZero: false,
	// 	// 	resetOnComplete: false,
	// 	// }),
	// );
}

export const userService = new UserService();
