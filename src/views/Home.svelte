<script>
export let currentRoute;


import { defaultChainStore, web3, connected, selectedAccount, chainId, chainData } from 'svelte-web3';


// import Web3Modal from 'components/elements/_Web3Modal.svelte';

import SendForm from 'components/forms/views/create/SendForm.svelte';


import { Navigate, navigateTo } from 'svelte-router-spa';






// $: checkAccount = $selectedAccount || '0x0000000000000000000000000000000000000000';
// $: balance = $connected ? $web3.eth.getBalance(checkAccount) : '';

let balance;


async function getBalanceNorm() {
	balance = await $web3.eth.getBalance($selectedAccount);
	console.log(balance);
	return $web3.utils.fromWei(balance, 'ether');
}


let balanceNorm = getBalanceNorm();

</script>



{#await balanceNorm}

<section class="hero">

	<div class="hero-body">

		<div class="container">

			Loading ...

		</div>

	</div>

</section>

{:then value}


<section class="section">

	<div class="container">

		<div class="card">

			<div class="card-content">

				Your balance:<br>
				{value}
				{$chainData.nativeCurrency?.symbol}

			</div>

		</div>

		<br>
		<br>

		<SendForm />

	</div>

</section>

{:catch error}

Error!

{/await}



<!-- <Navigate to='/create' styles='button is-link'>
	Create
</Navigate>



<Navigate to='/receive' styles='button is-link'>
	Receive
</Navigate>

 -->

