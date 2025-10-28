<script>
	import { onMount } from 'svelte';
	import { getConnectionStatus } from '$lib/dynamodb.js';
	
	let connectionStatus = {
		status: 'loading',
		message: 'Checking connection...',
		region: '',
		timestamp: ''
	};
	
	let isLoading = true;
	
	onMount(async () => {
		try {
			const status = await getConnectionStatus();
			connectionStatus = status;
		} catch (error) {
			connectionStatus = {
				status: 'error',
				message: `Error: ${error.message}`,
				region: '',
				timestamp: new Date().toISOString()
			};
		} finally {
			isLoading = false;
		}
	});
	
	const getStatusIcon = (status) => {
		switch (status) {
			case 'connected':
				return 'bi-check-circle-fill text-success';
			case 'error':
				return 'bi-x-circle-fill text-danger';
			case 'loading':
				return 'bi-hourglass-split text-warning';
			default:
				return 'bi-question-circle text-secondary';
		}
	};
	
	const getStatusBadge = (status) => {
		switch (status) {
			case 'connected':
				return 'badge bg-success';
			case 'error':
				return 'badge bg-danger';
			case 'loading':
				return 'badge bg-warning';
			default:
				return 'badge bg-secondary';
		}
	};
</script>

<div class="card">
	<div class="card-header d-flex justify-content-between align-items-center">
		<h5 class="mb-0">
			<i class="bi bi-database me-2"></i>
			DynamoDB Connection Status
		</h5>
		<span class={getStatusBadge(connectionStatus.status)}>
			{connectionStatus.status.toUpperCase()}
		</span>
	</div>
	<div class="card-body">
		<div class="d-flex align-items-center mb-3">
			<i class={getStatusIcon(connectionStatus.status)} style="font-size: 1.5rem;"></i>
			<div class="ms-3">
				<p class="mb-1 fw-bold">{connectionStatus.message}</p>
				{#if connectionStatus.region}
					<small class="text-muted">Region: {connectionStatus.region}</small>
				{/if}
			</div>
		</div>
		
		{#if connectionStatus.timestamp}
			<div class="mt-3">
				<small class="text-muted">
					<i class="bi bi-clock me-1"></i>
					Last checked: {new Date(connectionStatus.timestamp).toLocaleString()}
				</small>
			</div>
		{/if}
		
		{#if isLoading}
			<div class="mt-3">
				<div class="spinner-border spinner-border-sm text-primary" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
				<span class="ms-2">Testing connection...</span>
			</div>
		{/if}
	</div>
</div>
