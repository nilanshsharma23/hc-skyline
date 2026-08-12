import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const clubName = url.searchParams.get('club_name');

	const res = await fetch(`https://clubapi.hackclub.com/ships?club_name=${clubName}`);
	const data = await res.json();
	return json(data);
};
