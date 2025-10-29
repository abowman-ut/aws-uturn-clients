<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</svelte:head>

<!-- Development Environment Banner -->
{#if import.meta.env.DEV}
	<div class="alert alert-warning alert-dismissible fade show mb-0" role="alert" style="border-radius: 0;">
		<div class="container">
			<div class="d-flex align-items-center">
				<i class="bi bi-code-slash me-2"></i>
				<strong>Development Mode</strong>
				<span class="ms-2">Working locally</span>
				<button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		</div>
	</div>
{/if}

{@render children?.()}
