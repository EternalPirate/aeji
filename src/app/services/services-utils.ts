import { IQueueItem } from './queues.service';

export function convertQueueList(queuesObj: { [key: string]: IQueueItem }): IQueueItem[] {
	return Object.keys(queuesObj).map(itemKey => {
		return {
			key: itemKey,
			...queuesObj[itemKey]
		};
	});
}

export function convertQueues(queuesObj: { [key: string]: IQueueItem }): { queueLen: number; key: string }[] {
	return Object.keys(queuesObj).map(itemKey => {
		return {
			key: itemKey,
			queueLen: Object.keys(queuesObj[itemKey]).length
		};
	});
}

export function getQueryStringParams(url): any {
	const params = {};
	const parser = document.createElement('a');
	parser.href = url;
	const query = parser.search.substring(1);
	const vars = query.split('&');
	for (const key of vars) {
		const pair = key.split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
}
