import { json } from '@sveltejs/kit';
import { UserService } from '$lib/database/services.js';

const userService = new UserService();

// GET /api/users - Get all users
export async function GET() {
	try {
		const result = await userService.getAllUsers();
		
		if (result.success) {
			return json({ success: true, users: result.data });
		} else {
			return json({ success: false, error: result.error }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}
}

// POST /api/users - Create a new user
export async function POST({ request }) {
	try {
		const userData = await request.json();
		
		// Basic validation
		if (!userData.email || !userData.name) {
			return json({ 
				success: false, 
				error: 'Email and name are required' 
			}, { status: 400 });
		}

		const result = await userService.createUser(userData);
		
		if (result.success) {
			return json({ success: true, user: result.data }, { status: 201 });
		} else {
			return json({ success: false, error: result.error }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
