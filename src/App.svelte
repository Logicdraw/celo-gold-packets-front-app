<script>
import { Router } from 'svelte-router-spa';
import { routes } from './router';


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';

import { onMount } from 'svelte';


// $: metamaskConnected = window.ethereum ? window.ethereum.isConnected() : false;

// console.log(metamaskConnected);

</script>


<style>
	
main {
	min-height: calc(100vh - var(--navbar-height));
	margin-top: var(--navbar-height);
}

</style>



<main>
	<Router {routes} />
</main>




