import { validateRedirectUrl } from '$lib/functions/urls';
import { logout } from '$lib/remote/auth.remote';
import { redirect } from '@sveltejs/kit';
import { validateRedirectUrl } from '$lib/functions/urls';

export const actions = {
	default: async ({ url }) => {
		await logout();

		let next = url.searchParams.get('next') ?? '/';
<<<<<<< HEAD
		try {
			next = validateRedirectUrl(next, url.origin);
		} catch {
			next = '/';
		}
=======
		next = validateRedirectUrl(next, url.origin);
>>>>>>> b53647156e38c5570846351e03e07b17cdaf8bf1

		if (next.startsWith('/admin')) {
			next = '/';
		}
		throw redirect(303, next);
	}
};
