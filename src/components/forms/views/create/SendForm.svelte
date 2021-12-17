<script>

import { allChainsData, makeChainStore, defaultChainStore, web3, selectedAccount, connected, chainId, chainData } from 'svelte-web3';


import { contract_abi, contract_bytecode } from 'utils/_index.js';



import { createForm } from 'svelte-forms-lib';
import * as yup from 'yup';



const api_url = 'http://127.0.0.1:8000/api/v1';


let loading = false;

let packet_sending = false
let packet_sent = false;
let packet_sending_error = false;

let link = '';


const {
	form,
	errors,
	state,
	// handleBlur,
	handleChange,
	handleSubmit,
	setField,
} = createForm({
	initialValues: {
		celo_value_amount: '',
		recipients_amount: '',
		message: '',
	},
	validationSchema: yup.object().shape({
		celo_value_amount: yup
			.number('Invalid!')
			.min(0.2)
			.required('Invalid!'),
		recipients_amount: yup
			.number('Invalid!')
			.integer('Invalid!')
			.required('Invalid!'),
		message: yup
			.string('Invalid!')
			.max(128)
			.required('Invalid!'),
	}),
	onSubmit: values => {


		loading = true;

		// let body_data = JSON.stringify(values);
		let body_data = values;

		packet_sending = true;

		// alert(body_data);

		submitForm(body_data).then(data => {

			console.log(data);
			verifyContract(data).then(data => {
				console.log(data);
				link = data;
				packet_sent = true;
				return;
			});

			// link = data.slug;

			// alert(link);
			// return data;

		}).catch(error => {


			packet_sending_error = true;

			console.log(error);
			// alert('ERROR!');

		}).finally(() => {

			packet_sending = false;
			// loading = false;

		});
		
	}
});



async function submitForm(body_data) {

	let balance = await $web3.eth.getBalance($selectedAccount);

	console.log(Number($web3.utils.toWei(body_data['celo_value_amount'], 'ether')));


	if (Number($web3.utils.toWei(body_data['celo_value_amount'], 'ether')) > Number(balance)) {
		alert('Error! You are trying to send more celo than is in your balance! Try again!');
		throw new Error('Error! You are trying to send more celo than is in your balance! Try again!');
	}



	let contract_instance = new $web3.eth.Contract(
		contract_abi,
	);

	console.log(contract_abi);

	console.log(contract_bytecode);

	console.log(parseInt(body_data['recipients_amount']));

	console.log(body_data['message']);

	console.log(typeof parseInt(body_data['recipients_amount']));

	console.log(typeof body_data['message']);


	let contract_address_x;

	let nonce;

	await $web3.eth.getTransactionCount($selectedAccount).then(data => {
		nonce = data;
	}).catch(error => {
		throw new Error('Error!')
	});


	await contract_instance.deploy({
		data: contract_bytecode,
		arguments: [
			parseInt(body_data['recipients_amount']),
			body_data['message'],
		],
	}).send({
		gasPrice: $web3.eth.gas_price,
		nonce: nonce,
		gasLimit: $web3.utils.toHex('1000000'),
		from: $selectedAccount,
		value: $web3.utils.toHex($web3.utils.toWei(String(body_data['celo_value_amount']), 'ether')),
	}, function(error, transactionHash) {
		console.log(error);
		console.log(transactionHash);
	}).on('error', function(error) {
		console.log(error);
	}).on('transactionHash', function(transactionHash) {
		console.log(transactionHash);
	}).on('receipt', function(receipt) {
		console.log(receipt);
		console.log(receipt.contractAddress); // contains the new contract address
	}).on('confirmation', function(confirmationNumber, receipt) {
		// console.log(transactionHash);
	}).then(function(newContractInstance) {
		// newContractInstance.options.address

		console.log(newContractInstance.options.address); // instance with the new contract address
		contract_address_x = newContractInstance.options.address;
		// return newContractInstance.options.address;

	});

	return contract_address_x;

}


async function verifyContract(contract_address) {

	// ...
	// --
	const url = `${api_url}/_resources/verify-contract`; 

	const resp = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			contract_address: contract_address,
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	});

	const result = await resp.json();

	if (!resp.ok) {
		alert('Error!');
		throw new Error('Error!');
	}

	return result;

}



</script>


<style>

</style>


<!-- ... -->
<form on:submit={handleSubmit}>

	{#if !packet_sent}

	{#if packet_sending}

	creating packet ... :)

	{:else}

	<div class="field">

		<div class="control">

			<label>Amount</label>

			<input placeholder="Celo Packet Amount" class="input" type="text" id="celo_value_amount" name="celo_value_amount" on:change={handleChange} bind:value={$form.celo_value_amount}>

			{#if $errors.celo_value_amount}
				<!-- {$errors.celo_value_amount} -->
				Invalid Value!
			{/if}

		</div>

	</div>

	<div class="field">

		<div class="control">

			<label>Number of Recipients</label>

			<input placeholder="Total Recipients" class="input" type="number" id="recipients_amount" name="recipients_amount" on:change={handleChange} bind:value={$form.recipients_amount}>

			{#if $errors.recipients_amount}
				<!-- {$errors.recipients_amount} -->
				Invalid Value!
			{/if}

		</div>

	</div>


	<div class="field">

		<div class="control">

			<label>Description</label>

			<input placeholder="Message" class="input" type="text" id="message" name="message" on:change={handleChange} bind:value={$form.message}>

			{#if $errors.message}
				<!-- {$errors.message} -->
				Invalid Value!
			{/if}

		</div>

	</div>


	<!-- <div class="field">

		<div class="control">

			<label>Password</label>

			<input placeholder="Password" class="input" type="password">

		</div>

	</div> -->

	<br>

	<div class="field is-grouped">

		<div class="control">

			<button  class="button is-link is-fullwidth">
				<span>Create Packet</span>
				<i class="fas fa-circle-notch fa-spin" class:is-hidden={!loading} style="margin-left: 1rem; display: block;"></i>
			</button>

		</div>

	</div>

	{/if}

	{:else}

	<div class="field">

		<div class="control">

			<label>Link:</label>

			<input type="" name="" class="input" readonly value="https://celo-gold-packets-front-app.vercel.app/receive/{link}">

			<!-- <input type="" name="" class="input" readonly value="https://ismach-celo-front-web.vercel.app/dashboard/packet/{link}"> -->


		</div>

	</div>

	<br>
	<br>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-whatsapp" style="margin-right: 1rem;"></i>
				<span>Share to Whatsapp</span>
			</div>

		</div>

	</div>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-twitter" style="margin-right: 1rem;"></i>
				<span>Share to Twitter</span>
			</div>

		</div>

	</div>


	<div class="field">

		<div class="control">

			<div class="button is-white">
				<i class="fab fa-facebook" style="margin-right: 1rem;"></i>
				<span>Share to Facebook</span>
			</div>

		</div>

	</div>


	<div class="field is-grouped">

		<div class="control">

			<div class="button is-blue">
				<span>Copy Link</span>
			</div>

		</div>

	</div>


	{/if}

	
</form>

