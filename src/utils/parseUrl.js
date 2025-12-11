import prepareUrl from './prepareUrl';

export default rawUrl => {
	const url = new URL(rawUrl);
	const origin = url.origin + url.pathname;
	const payformId = url.searchParams.get('payformId');

	return { origin: prepareUrl(origin), payformId };
};
