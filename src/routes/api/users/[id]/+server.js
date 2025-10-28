import { json } from '@sveltejs/kit';
import { UserService } from '$lib/database/services.js';

const userService = new UserService();

// GET /api/users/[id] - Get user by ID
export async function GET({ params }) {
	try {
		const result = await userService.getUserById(params.id);
		
		if (result.success) {
			if (result.data) {
				return json({ success: true, user: result.data });
			} else {
				return json({ success: false, error: 'User not found' }, { status: 404 });
			}
		} else {
			return json({ success: false, error: result.error }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}
}

// PUT /api/users/[id] - Update user
export async function PUT({ params, request }) {
	try {
		const updateData = await request.json();
		const result = await userService.updateUser(params.id, updateData);
		
		if (result.success) {
			return json({ success: true, user: result.data });
		} else {
			return json({ success: false, error: result.error }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}
}

// DELETE /api/users/[id] - Delete user
export async function DELETE({ params }) {
	try {
		const result = await userService.deleteUser(params.id);
		
		if (result.success) {
			return json({ success: true, message: 'User deleted successfully' });
		} else {
			return json({ success: false, error: result.error }, { status: 500 });
		}
	} catch (error) {
		return json({ success: false, error: error.message }, { status: 500 });
	}
}
