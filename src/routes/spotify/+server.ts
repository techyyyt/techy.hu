import { json } from '@sveltejs/kit';
import {
	SPOTIFY_CLIENT_ID,
	SPOTIFY_CLIENT_SECRET,
	SPOTIFY_REFRESH_TOKEN
} from '$env/static/private';

async function getAccessToken() {
	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: 'Basic ' + btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: SPOTIFY_REFRESH_TOKEN
		})
	});

	return res.json();
}

export async function GET() {
	try {
		// get a fresh access token
		const { access_token } = await getAccessToken();

		// 1. check currently playing
		let res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
			headers: { Authorization: `Bearer ${access_token}` }
		});

		if (res.status === 200) {
			const song = await res.json();
			if (song?.is_playing) {
				return json({
					isPlaying: true,
					title: song.item.name,
					artist: song.item.artists.map((a: { name: string }) => a.name).join(', '),
					albumImageUrl: song.item.album.images[0].url,
					url: song.item.external_urls.spotify
				});
			}
		}

		// 2. fallback: last played
		res = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
			headers: { Authorization: `Bearer ${access_token}` }
		});

		if (res.status === 200) {
			const data = await res.json();
			const lastSong = data.items[0].track;
			return json({
				isPlaying: false,
				title: lastSong.name,
				artist: lastSong.artists.map((a: { name: string }) => a.name).join(', '),
				albumImageUrl: lastSong.album.images[0].url,
				url: lastSong.external_urls.spotify
			});
		}

		return json({ isPlaying: false });
	} catch (err) {
		console.error(err);
		return json({ isPlaying: false });
	}
}
