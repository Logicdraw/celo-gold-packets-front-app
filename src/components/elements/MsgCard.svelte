<script>
export let msg_show = true;
export let msg_text;
export let msg_type = 'success'; // error or success.
export let msg_forever = false;


function hideCard() {
	if (!msg_forever) msg_show = false;
}

</script>


<style>

.msg-card {
	margin-bottom: 2rem !important;
	height: unset !important
}

.msg-card:not(.is-forever):hover {
	cursor: pointer;
}

.msg-card.error {
	background: var(--bg-error) !important;
	border-color: var(--border-error) !important;
}

.msg-card.success {
	background: var(--bg-success) !important;
	border-color: var(--border-success) !important;
}

.card-content {
	padding: 0.75rem !important;
}

p {
	color: var(--text-dark);
}

</style>



<div class="card msg-card" class:is-forever={msg_forever} class:is-hidden={!msg_show} on:click={hideCard} class:error={msg_type === 'error'} class:success={msg_type === 'success'}>

	<div class="card-content">

		<p class="has-text-centered">
			{#if msg_text}
			{@html msg_text}
			{:else}
			{#if msg_type === 'error'}
			Error!
			{:else if msg_type === 'success'}
			Success!
			{/if}
			{/if}
		</p>

	</div>

</div>

