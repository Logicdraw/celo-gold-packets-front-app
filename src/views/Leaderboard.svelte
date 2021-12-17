<script>
export let currentRoute;


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';

import MsgCard from 'components/elements/MsgCard.svelte';
import Loading from 'components/elements/Loading.svelte';

import Rec from 'components/elements/_Rec.svelte';



const api_url = 'http://127.0.0.1:8000/api/v1';


async function getPacketLeaderboard() {

	const url = `${api_url}/_resources/packet-leaderboard/${currentRoute.namedParams.slug}`;

	const resp = await fetch(url, {
		method: 'GET',
	});

	const result = await resp.json();

	if (!resp.ok) {
		throw new Error('Invalid link!');
	}

	return result;

}


let promise = getPacketLeaderboard();


</script>



<style>

</style>



{#await promise}

loading ...

{:then data}


<section class="section">

	<div class="container">

		{#each data as recipient}

			<Rec {recipient} />

		{/each}

	</div>

</section>


{:catch error}

error ... 

{/await}




