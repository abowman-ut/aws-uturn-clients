<script>
	import { onMount } from 'svelte';
	
	let users = [];
	let loading = false;
	let newUser = { name: '', email: '' };
	let message = '';

	// Load users on component mount
	onMount(async () => {
		await loadUsers();
	});

	async function loadUsers() {
		loading = true;
		try {
			const response = await fetch('/api/users');
			const data = await response.json();
			
			if (data.success) {
				users = data.users || [];
			} else {
				message = `Error loading users: ${data.error}`;
			}
		} catch (error) {
			message = `Error: ${error.message}`;
		}
		loading = false;
	}

	async function createUser() {
		if (!newUser.name || !newUser.email) {
			message = 'Please fill in both name and email';
			return;
		}

		loading = true;
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newUser)
			});
			
			const data = await response.json();
			
			if (data.success) {
				message = 'User created successfully!';
				newUser = { name: '', email: '' };
				await loadUsers(); // Reload users
			} else {
				message = `Error creating user: ${data.error}`;
			}
		} catch (error) {
			message = `Error: ${error.message}`;
		}
		loading = false;
	}

	async function deleteUser(userId) {
		if (!confirm('Are you sure you want to delete this user?')) {
			return;
		}

		loading = true;
		try {
			const response = await fetch(`/api/users/${userId}`, {
				method: 'DELETE'
			});
			
			const data = await response.json();
			
			if (data.success) {
				message = 'User deleted successfully!';
				await loadUsers(); // Reload users
			} else {
				message = `Error deleting user: ${data.error}`;
			}
		} catch (error) {
			message = `Error: ${error.message}`;
		}
		loading = false;
	}
</script>

<div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-10">
			<div class="card">
				<div class="card-header">
					<h1 class="card-title mb-0">
						<i class="bi bi-heart-fill text-danger me-2"></i>
						AWS U-Turn Clients
					</h1>
				</div>
				<div class="card-body">
					<p class="card-text">
						Welcome to your SvelteKit application with DynamoDB integration.
					</p>
					
					{#if message}
						<div class="alert alert-info" role="alert">
							<i class="bi bi-info-circle me-2"></i>
							{message}
						</div>
					{/if}

					<!-- Add User Form -->
					<div class="card mb-4">
						<div class="card-header">
							<h5 class="mb-0">
								<i class="bi bi-person-plus me-2"></i>Add New User
							</h5>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-md-6">
									<label for="userName" class="form-label">Name</label>
									<input 
										type="text" 
										class="form-control" 
										id="userName"
										bind:value={newUser.name}
										placeholder="Enter user name"
									>
								</div>
								<div class="col-md-6">
									<label for="userEmail" class="form-label">Email</label>
									<input 
										type="email" 
										class="form-control" 
										id="userEmail"
										bind:value={newUser.email}
										placeholder="Enter user email"
									>
								</div>
							</div>
							<div class="mt-3">
								<button 
									type="button" 
									class="btn btn-primary"
									on:click={createUser}
									disabled={loading}
								>
									{#if loading}
										<span class="spinner-border spinner-border-sm me-2" role="status"></span>
									{:else}
										<i class="bi bi-plus-circle me-1"></i>
									{/if}
									Add User
								</button>
							</div>
						</div>
					</div>

					<!-- Users List -->
					<div class="card">
						<div class="card-header d-flex justify-content-between align-items-center">
							<h5 class="mb-0">
								<i class="bi bi-people me-2"></i>Users ({users.length})
							</h5>
							<button 
								type="button" 
								class="btn btn-outline-primary btn-sm"
								on:click={loadUsers}
								disabled={loading}
							>
								<i class="bi bi-arrow-clockwise me-1"></i>Refresh
							</button>
						</div>
						<div class="card-body">
							{#if loading}
								<div class="text-center">
									<div class="spinner-border" role="status">
										<span class="visually-hidden">Loading...</span>
									</div>
								</div>
							{:else if users.length === 0}
								<div class="text-center text-muted">
									<i class="bi bi-inbox fs-1"></i>
									<p class="mt-2">No users found. Add a user above to get started!</p>
								</div>
							{:else}
								<div class="table-responsive">
									<table class="table table-striped">
										<thead>
											<tr>
												<th>Name</th>
												<th>Email</th>
												<th>Created</th>
												<th>Actions</th>
											</tr>
										</thead>
										<tbody>
											{#each users as user (user.id)}
												<tr>
													<td>{user.name}</td>
													<td>{user.email}</td>
													<td>{new Date(user.createdAt).toLocaleDateString()}</td>
													<td>
														<button 
															type="button" 
															class="btn btn-danger btn-sm"
															on:click={() => deleteUser(user.id)}
															disabled={loading}
														>
															<i class="bi bi-trash"></i>
														</button>
													</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							{/if}
						</div>
					</div>

					<div class="mt-4">
						<h5>Features</h5>
						<div class="row">
							<div class="col-md-4">
								<div class="alert alert-success" role="alert">
									<i class="bi bi-check-circle me-2"></i>
									SvelteKit Framework
								</div>
							</div>
							<div class="col-md-4">
								<div class="alert alert-info" role="alert">
									<i class="bi bi-info-circle me-2"></i>
									Bootstrap UI Components
								</div>
							</div>
							<div class="col-md-4">
								<div class="alert alert-warning" role="alert">
									<i class="bi bi-database me-2"></i>
									DynamoDB Integration
								</div>
							</div>
						</div>
						
						<div class="mt-3">
							<a href="https://svelte.dev/docs/kit" class="btn btn-primary me-2" target="_blank">
								<i class="bi bi-book me-1"></i>SvelteKit Docs
							</a>
							<a href="https://getbootstrap.com/docs/5.3/" class="btn btn-outline-secondary me-2" target="_blank">
								<i class="bi bi-bootstrap me-1"></i>Bootstrap Docs
							</a>
							<a href="https://docs.aws.amazon.com/dynamodb/" class="btn btn-outline-warning" target="_blank">
								<i class="bi bi-cloud me-1"></i>DynamoDB Docs
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
