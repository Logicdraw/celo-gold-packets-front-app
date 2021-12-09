<script>
export let currentRoute;

import MsgCard from 'components/elements/MsgCard.svelte';
import Loading from 'components/elements/Loading.svelte';


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';

import { Route } from 'svelte-router-spa';
import { onMount } from 'svelte';
// Route

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;


async function enable() {

	let web3Modal = new Web3Modal({
		cacheProvider: false,
		providerOptions: {
			walletconnect: {
				package: WalletConnectProvider,
				options: {
					rpc: {
						44787: "https://alfajores-forno.celo-testnet.org",
						42220: "https://forno.celo.org",
					},	
				}
			}
		},
		disableInjectedProvider: true,
		// disableInjectedsetBrowserProvider: false,
		disableInjectedsetBrowserProvider: true,
	});
	
	const provider = await web3Modal.connect();
	defaultChainStore.setProvider(provider);

}


// or connect phone number ... :)

// store :)

</script>


<style>

</style>



{#if $connected}

<Route {current_route} />

{:else}

{#if $web3.version}

<MsgCard msg_text={'Connect using your Valora wallet!'} msg_type={'error'} msg_show={true} msg_forever={true} />

<!-- Connect your valora wallet button ... -->
<div class="buttons">
	<button class="button is-link is-light" on:click="{enable}">connect your Valora wallet</button>
</div>

{:else}

<MsgCard msg_text={'Error!'} msg_type={'error'} msg_show={true} msg_forever={true} />

{/if}

{/if}

