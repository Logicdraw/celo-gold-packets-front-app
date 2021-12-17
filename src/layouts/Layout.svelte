<script>
export let currentRoute;

import MsgCard from 'components/elements/MsgCard.svelte';
import Loading from 'components/elements/Loading.svelte';


import Navbar from 'layouts/Navbar.svelte';
// import Footer from 'layouts/Footer.svelte';



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
						// 42220: "https://forno.celo.org",
					},	
				}
			}
		},
		disableInjectedProvider: false,
		disableInjectedsetBrowserProvider: true,
		// disableInjectedsetBrowserProvider: true,
	});
	
	const provider = await web3Modal.connect();
	defaultChainStore.setProvider(provider);

}




</script>


<style>

</style>



{#if $connected}

<Route {currentRoute} />

{:else}

{#if $web3.version}

<section class="hero is-fullheight">

	<div class="hero-body">

		<div class="container">

			<div class="buttons is-centered">
				<button class="button is-link is-light" on:click="{enable}">Connect Wallet!</button>
			</div>

		</div>

	</div>

</section>


{:else}

<MsgCard msg_text={'Error!'} msg_type={'error'} msg_show={true} msg_forever={true} />

{/if}

{/if}


