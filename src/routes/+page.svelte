<script>
    let { data } = $props();
</script>

<div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-8">
			<div class="card">
				<div class="card-header">
					<div class="d-flex justify-content-between align-items-center">
						<h1 class="card-title mb-0">
							<i class="bi bi-heart-fill text-danger me-2"></i>
							AWS Uturn Clients
						</h1>
						{#if import.meta.env.DEV}
							<span class="badge bg-warning text-dark">
								<i class="bi bi-code-slash me-1"></i>
								DEV
							</span>
						{/if}
					</div>
				</div>
				<div class="card-body">
					<p class="card-text">
						Welcome to your SvelteKit application with Bootstrap integration and DynamoDB connectivity.
					</p>
					
					<div class="mt-4">
						<h5>Features</h5>
						<div class="row">
							<div class="col-md-6">
								<div class="alert alert-info" role="alert">
									<i class="bi bi-info-circle me-2"></i>
									SvelteKit Framework
								</div>
							</div>
							<div class="col-md-6">
								<div class="alert alert-info" role="alert">
									<i class="bi bi-info-circle me-2"></i>
									Bootstrap UI Components
								</div>
							</div>
							<div class="col-md-6">
								<div class="alert {data.dbStatus.status === 'success' ? 'alert-success' : 'alert-danger'}" role="alert">
									<i class="{data.dbStatus.status === 'success' ? 'bi bi-check-circle' : 'bi bi-x-circle'} me-2"></i>
									DynamoDB: {data.dbStatus.status === 'success' ? 'Connected' : 'Not connected'}
								</div>
							</div>
						</div>
						
						<div class="mt-3">
							<a href="https://svelte.dev/docs/kit" class="btn btn-outline-secondary me-2" target="_blank">
								<i class="bi bi-book me-1"></i> SvelteKit Docs
							</a>
							<a href="https://getbootstrap.com/docs/5.3/" class="btn btn-outline-secondary" target="_blank">
								<i class="bi bi-bootstrap me-1"></i> Bootstrap Docs
							</a>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>
