import { map } from 'rxjs/operators';
import { QueueData } from './queues.service';
import { Observable } from 'rxjs';

export function convertQueueList(observable: Observable<any>): Observable<QueueData[]> {
	return observable
		.pipe(
			map(changes =>
				// convert from object of objects to array of objects
				changes
					.map(c => ({
						key: c.payload.key,
						...c.payload.val()
					}) as QueueData)
					// sort in time order, first should be last added
					.sort((a, b) => {
						const aTime = Number(new Date(a.createdAt));
						const bTime = Number(new Date(b.createdAt));

						return bTime - aTime;
					})
			)
		);
}
