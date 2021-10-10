import { ReplaySubject } from 'rxjs';

class UserService {
	private dataSequence$ = new ReplaySubject();

	public sendData(data: any) {
		this.dataSequence$.next(data);
	}

	public getData() {
		return this.dataSequence$.asObservable();
	}
}

export const userService = new UserService();
