<script>
export let currentRoute;


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';


import MsgCard from 'components/elements/MsgCard.svelte';
import Loading from 'components/elements/Loading.svelte';


import ReceiveForm from 'components/forms/views/receive/ReceiveForm.svelte';


import { Navigate, navigateTo } from 'svelte-router-spa';



const api_url = 'http://127.0.0.1:8000/api/v1';



async function checkPacket() {

	const url = `${api_url}/_resources/validate-contract/${currentRoute.namedParams.slug}`;

	const resp = await fetch(url, {
		method: 'GET',
	});

	const result = await resp.json();

	if (!resp.ok) {
		throw new Error('Invalid link!');
	}

	return result;

}


let promise = checkPacket();

</script>


<style>

</style>


{#await promise}

loading ... :)

{:then}


<section class="section">
	
	<div class="container">

		<ReceiveForm slug={currentRoute.namedParams.slug} />

	</div>

</section>


{:catch error}

error ... invalid link!

{/await}



<!-- Hcaptcha :) -->




