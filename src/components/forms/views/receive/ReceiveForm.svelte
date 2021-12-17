<script>
export let slug;


import { allChainsData, makeChainStore, defaultChainStore, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3';

// import { contract_abi, contract_bytecode } from 'utils/_index.js';
// 

const api_url = 'http://127.0.0.1:8000/api/v1';


import { createForm } from 'svelte-forms-lib';
import * as yup from 'yup';


import { Navigate, navigateTo } from 'svelte-router-spa';


let loading = false;


const {
	form,
	errors,
	state,
	// ...
	handleChange,
	handleSubmit,
	setField,
} = createForm({
	initialValues: {
		address: $selectedAccount,
	},
	validationSchema: yup.object().shape({
		address: yup
			.string()
			.required('Required!')
	}),
	onSubmit: values => {

		loading = true;

		let body_data = values;

		submitForm(body_data).then(data => {

			// alert(`Success: ${data.txn}`);
			navigateTo(`/leaderboard/${slug}`);

		}).catch(error => {

			alert('Error! Try again!');

		}).finally(() => {

			loading = false;

		});

	}
});


async function submitForm(body_data) {

	const url = `${api_url}/_resources/accept-packet/${slug}`;

	const resp = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body_data),
		headers: {
			'Content-Type': 'application/json',
		}
	});

	const result = await resp.json();

	if (!resp.ok) {
		throw new Error('Error!');
	}

	return result;

}



</script>



<style>

</style>


<!-- ... -->
<form on:submit={handleSubmit}>

	<!-- <div class="field">

		<div class="control">

			<label>You</label>

			<input type="" name="" class="input" readonly >

			<input type="" name="" class="input" readonly value="https://ismach-celo-front-web.vercel.app/dashboard/packet/{link}">


		</div>

	</div> -->

	{#if loading}

	loading ...

	{:else}

	<div class="field is-grouped">

		<div class="control">

			<button  class="button is-link is-fullwidth">
				<span>Receive Packet!</span>
				<i class="fas fa-circle-notch fa-spin" class:is-hidden={!loading} style="margin-left: 1rem; display: block;"></i>
			</button>

		</div>

	</div>

	{/if}

	
</form>


<!-- hcaptcha... -->




